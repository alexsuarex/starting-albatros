// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { ALBI_SYSTEM_PROMPT, ALBI_ESCALATION_MESSAGE_ES, ALBI_ESCALATION_MESSAGE_EN } from '@/lib/albi-prompt'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// ─── Enviar mensaje por Meta Directo ─────────────────────────────────────────
async function sendWhatsAppMessage(to: string, message: string) {
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: to,
            type: 'text',
            text: { body: message },
        }),
    })
    const data = await res.json();
    if (data.error) {
        console.error('Meta API Error:', data.error);
    }
    return data;
}

// ─── Notificar a Alex por WhatsApp ────────────────────────────────────────────
async function notifyAlex(phone: string, reason: string, summary: string) {
    const message = `🔔 *Lead necesita atención humana*\n\n📱 Número: ${phone}\n❓ Motivo: ${reason}\n📝 Resumen: ${summary}\n\n👉 Entra al dashboard: https://albatrosia.com/dashboard`
    await sendWhatsAppMessage(process.env.ALEX_WHATSAPP_NUMBER!, message)
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

// ─── Webhook handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const supabase = createServiceClient()

        // Extraer datos del mensaje entrante de Meta
        const entry = body?.entry?.[0]
        const changes = entry?.changes?.[0]
        const value = changes?.value
        const message = value?.messages?.[0]

        if (!message || message.type !== 'text') {
            return NextResponse.json({ ok: true })
        }

        const phone = message.from
        const userText = message.text.body

        // ─── Buscar o crear conversación ─────────────────────────────────────────
        let { data: conversation } = await supabase
            .from('alb_conversations')
            .select('*')
            .eq('phone', phone)
            .single()

        if (!conversation) {
            const { data: newConv } = await supabase
                .from('alb_conversations')
                .insert({ phone, status: 'bot', unread: true })
                .select()
                .single()
            conversation = newConv
        }

        // Si la conversación está en modo humano, no responder con bot
        if (conversation.status === 'human') {
            // Solo guardar el mensaje y marcar como no leído
            await supabase.from('alb_messages').insert({
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
            conversation_id: conversation.id,
            role: 'user',
            content: userText,
        })

        // ─── Obtener historial de mensajes ────────────────────────────────────────
        const { data: history } = await supabase
            .from('alb_messages')
            .select('role, content')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: true })
            .limit(20)

        const chatHistory = (history || []).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
        }))

        // ─── Llamar a Groq con Albi ───────────────────────────────────────────────
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: ALBI_SYSTEM_PROMPT },
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
            const lang = conversation.language || 'es'
            const escalationMsg = lang === 'en' ? ALBI_ESCALATION_MESSAGE_EN : ALBI_ESCALATION_MESSAGE_ES

            await supabase.from('alb_messages').insert({
                conversation_id: conversation.id,
                role: 'bot',
                content: escalationMsg,
            })

            await supabase
                .from('alb_conversations')
                .update({ status: 'human', unread: true, updated_at: new Date().toISOString() })
                .eq('id', conversation.id)

            await sendWhatsAppMessage(phone, escalationMsg)
            await notifyAlex(phone, reason, summary)

            return NextResponse.json({ ok: true })
        }

        // ─── Respuesta normal del bot ─────────────────────────────────────────────
        if (cleanText) {
            await supabase.from('alb_messages').insert({
                conversation_id: conversation.id,
                role: 'bot',
                content: cleanText,
            })

            await supabase
                .from('alb_conversations')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', conversation.id)

            await sendWhatsAppMessage(phone, cleanText)
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
