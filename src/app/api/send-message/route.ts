// app/api/send-message/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    // Verificar autenticación
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { to, message, conversationId } = await req.json()
    if (!conversationId) {
        return NextResponse.json({ error: 'conversationId is required' }, { status: 400 })
    }

    const service = createServiceClient()

    const { data: conversation } = await service
        .from('alb_conversations')
        .select('business_id, channel')
        .eq('id', conversationId)
        .maybeSingle()

    if (!conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    // Verificar que el usuario autenticado pertenece a ese negocio
    const { data: membership } = await service
        .from('alb_business_members')
        .select('id')
        .eq('business_id', conversation.business_id)
        .eq('user_id', user.id)
        .maybeSingle()

    if (!membership) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: channelRow } = await service
        .from('alb_business_channels')
        .select('phone_number_id, access_token')
        .eq('business_id', conversation.business_id)
        .eq('channel', 'whatsapp')
        .eq('status', 'active')
        .maybeSingle()

    if (!channelRow) {
        return NextResponse.json({ error: 'No active WhatsApp channel for this business' }, { status: 409 })
    }

    const res = await fetch(`https://graph.facebook.com/v21.0/${channelRow.phone_number_id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${channelRow.access_token}`,
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: to,
            type: 'text',
            text: { body: message },
        }),
    })

    const data = await res.json()
    return NextResponse.json(data)
}
