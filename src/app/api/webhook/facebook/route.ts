// app/api/webhook/facebook/route.ts
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
    page_id: string
    access_token: string
    alb_businesses: {
        name: string
        alb_business_settings: BusinessSettingsRow[]
    }
}

// ─── Validar firma X-Hub-Signature-256 ────────────────────────────────────────
function validateSignature(rawBody: string, signatureHeader: string | null): boolean {
    const appSecret = process.env.META_APP_SECRET
    if (!appSecret) {
        console.error('[FB] META_APP_SECRET no configurado — rechazando por seguridad')
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

// ─── Enviar mensaje por Messenger ─────────────────────────────────────────────
async function sendMessengerMessage(psid: string, message: string, pageId: string, accessToken: string) {
    const res = await fetch(`https://graph.facebook.com/v25.0/${pageId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            recipient: { id: psid },
            messaging_type: 'RESPONSE',
            message: { text: message },
        }),
    })
    const data = await res.json()
    if (data.error) {
        console.error('[Messenger API Error]', data.error)
    }
    return data
}

// ─── Notificar al dueño del negocio (vía su propio canal de WhatsApp) ────────
async function notifyBusinessOwner(supabase: ReturnType<typeof createServiceClient>, businessId: string, notifyPhone: string | null, reason: string, summary: string) {
    if (!notifyPhone) {
        console.warn('[FB] Escalación sin notify_phone configurado — no se envía alerta')
        return
    }
    const { data: waChannel } = await supabase
        .from('alb_business_channels')
        .select('phone_number_id, access_token')
        .eq('business_id', businessId)
        .eq('channel', 'whatsapp')
        .eq('status', 'active')
        .maybeSingle()

    if (!waChannel) {
        console.warn('[FB] Negocio sin canal de WhatsApp activo — no se puede notificar la escalación de Facebook')
        return
    }

    const message = `🔔 *Lead de Facebook necesita atención*\n\n❓ Motivo: ${reason}\n📝 Resumen: ${summary}\n\n👉 Entra al dashboard para responder`
    await fetch(`https://graph.facebook.com/v25.0/${waChannel.phone_number_id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${waChannel.access_token}`,
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: notifyPhone,
            type: 'text',
            text: { body: message },
        }),
    })
}

// ─── Extraer JSON del response del bot ───────────────────────────────────────
function extractJsonData(text: string): {
    data?: Record<string, string>
    escalate: boolean
    reason: string
    summary: string
    cleanText: string
} {
    let cleanText = text
    let data: Record<string, string> | undefined
    let escalate = false
    let reason = ''
    let summary = ''

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

// ─── Procesar eventos del webhook (async, fuera del tiempo de respuesta) ──────
async function processWebhookEvents(body: any) {
    const supabase = createServiceClient()

    for (const entry of body.entry || []) {
        const pageId = entry.id as string | undefined
        if (!pageId) continue

        const { data: channelRowRaw } = await supabase
            .from('alb_business_channels')
            .select('business_id, page_id, access_token, alb_businesses(name, alb_business_settings(*))')
            .eq('channel', 'facebook')
            .eq('page_id', pageId)
            .eq('status', 'active')
            .maybeSingle()
        const channelRow = channelRowRaw as unknown as ChannelRow | null

        if (!channelRow) {
            console.warn('[FB] page_id sin negocio asociado:', pageId)
            continue
        }

        const businessId = channelRow.business_id
        const accessToken = channelRow.access_token
        const settings = channelRow.alb_businesses.alb_business_settings[0]
        const businessCtx = toBusinessContext(settings)

        for (const event of entry.messaging || []) {
            // Ignorar mensajes enviados por la propia página (echo)
            if (event.message?.is_echo) continue
            // Ignorar eventos sin texto (imágenes, stickers, etc.)
            if (!event.message?.text) continue

            const psid = event.sender.id as string
            const userText = event.message.text as string

            // ─── Buscar o crear conversación ──────────────────────────────────
            let { data: conversation } = await supabase
                .from('alb_conversations')
                .select('*')
                .eq('business_id', businessId)
                .eq('phone', psid)
                .eq('channel', 'facebook')
                .maybeSingle()

            if (!conversation) {
                const { data: newConv } = await supabase
                    .from('alb_conversations')
                    .insert({ business_id: businessId, phone: psid, status: 'bot', unread: true, channel: 'facebook' })
                    .select()
                    .single()
                conversation = newConv
            }

            if (!conversation) continue

            // Si está en modo humano, solo guardar y marcar como no leído
            if (conversation.status === 'human') {
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
                continue
            }

            // ─── Guardar mensaje del usuario ──────────────────────────────────
            await supabase.from('alb_messages').insert({
                business_id: businessId,
                conversation_id: conversation.id,
                role: 'user',
                content: userText,
            })

            // ─── Obtener los últimos 20 mensajes (orden cronológico) ──────────
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

            // ─── Llamar a Groq con el prompt de este negocio ───────────────────
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

            // ─── Actualizar datos del lead ────────────────────────────────────
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

            // ─── Escalación ───────────────────────────────────────────────────
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
                await sendMessengerMessage(psid, escalationMsg, pageId, accessToken)
                await notifyBusinessOwner(supabase, businessId, settings.notify_phone, reason, summary)
                continue
            }

            // ─── Respuesta normal del bot ─────────────────────────────────────
            if (cleanText) {
                const finalMessage = await processConversationalBooking(
                    cleanText,
                    conversation.id,
                    conversation.language || settings.default_language || 'es',
                    undefined,
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
                await sendMessengerMessage(psid, finalMessage, pageId, accessToken)
            }
        }
    }
}

// ─── Webhook handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text()
        const signature = req.headers.get('x-hub-signature-256')

        if (!validateSignature(rawBody, signature)) {
            console.warn('[FB] Firma inválida — rechazando request')
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }

        const body = JSON.parse(rawBody)

        if (body.object !== 'page') {
            return NextResponse.json({ ok: true })
        }

        await processWebhookEvents(body)

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('[FB] Error crítico:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}


// ─── Meta verifica el webhook con GET ─────────────────────────────────────────
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 })
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
