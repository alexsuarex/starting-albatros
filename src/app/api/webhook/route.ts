// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import Groq from 'groq-sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { getBotSystemPrompt, ALBI_ESCALATION_MESSAGE_ES, ALBI_ESCALATION_MESSAGE_EN, type BusinessContext } from '@/lib/albi-prompt'
import { processConversationalBooking } from '@/lib/booking-parser'

type BusinessSettingsRow = {
    bot_name: string
    business_description: string
    offerings: string
    qualifying_questions: string
    tone_instructions: string
    default_language: string
    escalation_msg_es: string | null
    escalation_msg_en: string | null
    notify_phone: string | null
}

type ChannelRow = {
    business_id: string
    phone_number_id: string
    access_token: string
    alb_businesses: {
        name: string
        // Supabase puede devolver el embed como array o como objeto único —
        // aceptamos ambos para no crashear según cómo lo resuelva.
        alb_business_settings: BusinessSettingsRow[] | BusinessSettingsRow | null
    } | null
}

// Defaults espejo del schema (supabase/migrations/0001_multi_tenant_schema.sql)
const FALLBACK_SETTINGS: BusinessSettingsRow = {
    bot_name: 'Asistente',
    business_description: '',
    offerings: '',
    qualifying_questions: '',
    tone_instructions: '',
    default_language: 'es',
    escalation_msg_es: 'Un momento, te conecto con un humano 🙌',
    escalation_msg_en: 'One moment, connecting you with a human 🙌',
    notify_phone: null,
}

function extractSettings(channelRow: ChannelRow): BusinessSettingsRow | null {
    const raw = channelRow.alb_businesses?.alb_business_settings
    if (!raw) return null
    if (Array.isArray(raw)) return raw[0] ?? null
    return raw
}

// ─── Validar firma X-Hub-Signature-256 ────────────────────────────────────────
function validateSignature(rawBody: string, signatureHeader: string | null): boolean {
    const appSecret = process.env.WHATSAPP_APP_SECRET
    if (!appSecret) {
        console.error('[WA] WHATSAPP_APP_SECRET no configurado — rechazando por seguridad')
        return false
    }
    if (!signatureHeader) return false

    const [scheme, receivedSig] = signatureHeader.split('=')
    if (scheme !== 'sha256' || !receivedSig) return false

    const expected = createHmac('sha256', appSecret).update(rawBody).digest('hex')

    const a = Buffer.from(receivedSig)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
}

// ─── Enviar mensaje por Meta Directo ─────────────────────────────────────────
async function sendWhatsAppMessage(to: string, message: string, phoneNumberId: string, accessToken: string) {
    // Normalizar números de México para la API de prueba de Meta
    // Meta recibe 521XXX... pero la whitelist suele tener 52XXX...
    let finalTo = to;
    if (finalTo.startsWith('521') && finalTo.length === 13) {
        finalTo = '52' + finalTo.substring(3);
    }

    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: finalTo,
            type: 'text',
            text: { body: message },
        }),
    })
    const data = await res.json();
    if (data.error) {
        console.error('Meta API Error:', data.error);
    }
    return data
}

// ─── Notificar al dueño del negocio cuando el bot escala ─────────────────────
async function notifyBusinessOwner(notifyPhone: string | null, phoneNumberId: string, accessToken: string, reason: string, summary: string) {
    if (!notifyPhone) {
        console.warn('[WA] Escalación sin notify_phone configurado — no se envía alerta')
        return
    }
    const message = `🔔 *Lead necesita atención humana*\n\n❓ Motivo: ${reason}\n📝 Resumen: ${summary}\n\n👉 Entra al dashboard para responder`
    await sendWhatsAppMessage(notifyPhone, message, phoneNumberId, accessToken)
}

// ─── Procesar respuesta de Groq ───────────────────────────────────────────────
function extractJsonData(text: string): { data?: Record<string, string>, escalate: boolean, reason: string, summary: string, cleanText: string } {
    let cleanText = text
    let data: Record<string, string> | undefined
    let escalate = false
    let reason = ''
    let summary = ''

    // Buscar JSON de escalación
    const escalateMatch = text.match(/\{"escalate":\s*true[^}]*\}/)
    if (escalateMatch) {
        try {
            const parsed = JSON.parse(escalateMatch[0])
            escalate = true
            reason = parsed.reason || ''
            summary = parsed.summary || ''
            cleanText = ''
        } catch { }
    }

    // Buscar JSON de datos del lead
    const dataMatch = text.match(/\{"data":\s*\{[^}]+\}\}/)
    if (dataMatch) {
        try {
            const parsed = JSON.parse(dataMatch[0])
            data = parsed.data
            cleanText = cleanText.replace(dataMatch[0], '').trim()
        } catch { }
    }

    return { data, escalate, reason, summary, cleanText }
}

function toBusinessContext(settings: BusinessSettingsRow): BusinessContext {
    return {
        botName: settings.bot_name,
        businessDescription: settings.business_description,
        offerings: settings.offerings,
        qualifyingQuestions: settings.qualifying_questions,
        toneInstructions: settings.tone_instructions,
        defaultLanguage: settings.default_language,
    }
}

// ─── Webhook handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text()
        const signature = req.headers.get('x-hub-signature-256')

        if (!validateSignature(rawBody, signature)) {
            console.warn('[WA] Firma inválida — rechazando request')
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }

        const body = JSON.parse(rawBody)
        const supabase = createServiceClient()

        // Extraer datos del mensaje entrante de Meta
        const entry = body?.entry?.[0]
        const changes = entry?.changes?.[0]
        const value = changes?.value
        const message = value?.messages?.[0]
        const phoneNumberId = value?.metadata?.phone_number_id

        if (!message || message.type !== 'text' || !phoneNumberId) {
            return NextResponse.json({ ok: true })
        }

        const phone = message.from
        const userText = message.text.body

        // ─── Resolver a qué negocio pertenece este número de WhatsApp ─────────────
        const { data: channelRowRaw } = await supabase
            .from('alb_business_channels')
            .select('business_id, phone_number_id, access_token, alb_businesses(name, alb_business_settings(*))')
            .eq('channel', 'whatsapp')
            .eq('phone_number_id', phoneNumberId)
            .eq('status', 'active')
            .maybeSingle()
        const channelRow = channelRowRaw as unknown as ChannelRow | null

        if (!channelRow) {
            console.warn('[WA] phone_number_id sin negocio asociado:', phoneNumberId)
            return NextResponse.json({ ok: true })
        }

        const businessId = channelRow.business_id
        const accessToken = channelRow.access_token
        const resolvedSettings = extractSettings(channelRow)
        if (!resolvedSettings) {
            console.warn('[WA] Negocio sin fila en alb_business_settings — usando defaults', {
                businessId,
                phoneNumberId,
                businessName: channelRow.alb_businesses?.name,
            })
        }
        const settings = resolvedSettings ?? FALLBACK_SETTINGS
        const businessCtx = toBusinessContext(settings)

        // ─── Buscar o crear conversación ─────────────────────────────────────────
        let { data: conversation } = await supabase
            .from('alb_conversations')
            .select('*')
            .eq('business_id', businessId)
            .eq('channel', 'whatsapp')
            .eq('phone', phone)
            .maybeSingle()

        if (!conversation) {
            const { data: newConv } = await supabase
                .from('alb_conversations')
                .insert({ business_id: businessId, phone, status: 'bot', unread: true, channel: 'whatsapp' })
                .select()
                .single()
            conversation = newConv
        }

        // Si la conversación está en modo humano, no responder con bot
        if (conversation.status === 'human') {
            // Solo guardar el mensaje y marcar como no leído
            await supabase.from('alb_messages').insert({
                business_id: businessId,
                conversation_id: conversation.id,
                role: 'user',
                content: userText,
            })
            await supabase
                .from('alb_conversations')
                .update({ unread: true, updated_at: new Date().toISOString() })
                .eq('id', conversation.id)
            return NextResponse.json({ ok: true })
        }

        // ─── Guardar mensaje del usuario ─────────────────────────────────────────
        await supabase.from('alb_messages').insert({
            business_id: businessId,
            conversation_id: conversation.id,
            role: 'user',
            content: userText,
        })

        // ─── Obtener los últimos 20 mensajes (orden cronológico) ─────────────────
        const { data: history } = await supabase
            .from('alb_messages')
            .select('role, content')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: false })
            .limit(20)

        const chatHistory = (history || []).reverse().map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
        }))

        // ─── Llamar a Groq con el prompt de este negocio ──────────────────────────
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: getBotSystemPrompt(businessCtx) },
                ...chatHistory,
            ],
            max_tokens: 500,
            temperature: 0.7,
        })

        const rawResponse = completion.choices[0]?.message?.content || ''
        const { data: leadData, escalate, reason, summary, cleanText } = extractJsonData(rawResponse)

        // ─── Actualizar datos del lead si los capturó el bot ─────────────────────
        if (leadData) {
            await supabase
                .from('alb_conversations')
                .update({
                    ...(leadData.name && { name: leadData.name }),
                    ...(leadData.business_name && { business_name: leadData.business_name }),
                    ...(leadData.business_type && { business_type: leadData.business_type }),
                    ...(leadData.package_interest && { package_interest: leadData.package_interest }),
                    ...(leadData.language && { language: leadData.language }),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', conversation.id)
        }

        // ─── Manejar escalación ───────────────────────────────────────────────────
        if (escalate) {
            const lang = conversation.language || settings.default_language || 'es'
            const escalationMsg = lang === 'en'
                ? (settings.escalation_msg_en || ALBI_ESCALATION_MESSAGE_EN)
                : (settings.escalation_msg_es || ALBI_ESCALATION_MESSAGE_ES)

            await supabase.from('alb_messages').insert({
                business_id: businessId,
                conversation_id: conversation.id,
                role: 'bot',
                content: escalationMsg,
            })

            await supabase
                .from('alb_conversations')
                .update({ status: 'human', unread: true, updated_at: new Date().toISOString() })
                .eq('id', conversation.id)

            await sendWhatsAppMessage(phone, escalationMsg, phoneNumberId, accessToken)
            await notifyBusinessOwner(settings.notify_phone, phoneNumberId, accessToken, reason, summary)

            return NextResponse.json({ ok: true })
        }

        // ─── Respuesta normal del bot ─────────────────────────────────────────────
        if (cleanText) {
            const finalMessage = await processConversationalBooking(
                cleanText,
                conversation.id,
                conversation.language || settings.default_language || 'es',
                phone,
                businessId
            )

            await supabase.from('alb_messages').insert({
                business_id: businessId,
                conversation_id: conversation.id,
                role: 'bot',
                content: finalMessage,
            })

            await supabase
                .from('alb_conversations')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', conversation.id)

            await sendWhatsAppMessage(phone, finalMessage, phoneNumberId, accessToken)
        }

        return NextResponse.json({ ok: true })

    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}

// Meta verifica el webhook con GET
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 })
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
