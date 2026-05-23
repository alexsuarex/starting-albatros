// app/api/webhook/facebook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { ALBI_SYSTEM_PROMPT, ALBI_ESCALATION_MESSAGE_ES, ALBI_ESCALATION_MESSAGE_EN } from '@/lib/albi-prompt'

// ─── Enviar mensaje por Messenger ─────────────────────────────────────────────
async function sendMessengerMessage(psid: string, message: string) {
    const res = await fetch('https://graph.facebook.com/v21.0/me/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            recipient: { id: psid },
            messaging_type: 'RESPONSE',
            message: { text: message },
        }),
    })
    const data = await res.json()
    if (data.error) {
        console.error('Messenger API Error:', data.error)
    }
    return data
}

// ─── Notificar a Alex por WhatsApp ────────────────────────────────────────────
async function notifyAlex(psid: string, reason: string, summary: string) {
    const phoneId = process.env.WHATSAPP_PHONE_ID
    const message = `🔔 *Lead de Facebook necesita atención*\n\n👤 ID: ${psid}\n❓ Motivo: ${reason}\n📝 Resumen: ${summary}\n\n👉 Dashboard: https://albatrosia.com/dashboard`
    await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: process.env.ALEX_WHATSAPP_NUMBER,
            type: 'text',
            text: { body: message },
        }),
    })
}

// ─── Extraer JSON del response de Albi ───────────────────────────────────────
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

// ─── Webhook handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        if (body.object !== 'page') {
            return NextResponse.json({ ok: true })
        }

        const supabase = createServiceClient()

        for (const entry of body.entry || []) {
            for (const event of entry.messaging || []) {
                // Ignorar mensajes enviados por la propia página (echo)
                if (event.message?.is_echo) continue
                // Ignorar eventos sin texto (imágenes, stickers, etc.)
                if (!event.message?.text) continue

                const psid = event.sender.id as string
                const userText = event.message.text as string

                // ─── Buscar o crear conversación ──────────────────────────────
                let { data: conversation } = await supabase
                    .from('alb_conversations')
                    .select('*')
                    .eq('phone', psid)
                    .eq('channel', 'facebook')
                    .maybeSingle()

                if (!conversation) {
                    const { data: newConv } = await supabase
                        .from('alb_conversations')
                        .insert({ phone: psid, status: 'bot', unread: true, channel: 'facebook' })
                        .select()
                        .single()
                    conversation = newConv
                }

                if (!conversation) continue

                // Si está en modo humano, solo guardar y marcar como no leído
                if (conversation.status === 'human') {
                    await supabase.from('alb_messages').insert({
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

                // ─── Guardar mensaje del usuario ──────────────────────────────
                await supabase.from('alb_messages').insert({
                    conversation_id: conversation.id,
                    role: 'user',
                    content: userText,
                })

                // ─── Obtener historial ────────────────────────────────────────
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

                // ─── Llamar a Groq / Albi ─────────────────────────────────────
                const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })
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

                // ─── Actualizar datos del lead ────────────────────────────────
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

                // ─── Escalación ───────────────────────────────────────────────
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
                    await sendMessengerMessage(psid, escalationMsg)
                    await notifyAlex(psid, reason, summary)
                    continue
                }

                // ─── Respuesta normal del bot ─────────────────────────────────
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
                    await sendMessengerMessage(psid, cleanText)
                }
            }
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Facebook webhook error:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}

// Meta verifica el webhook con GET
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
