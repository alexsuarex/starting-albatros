// app/api/send-message/facebook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
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
        .select('page_id, access_token')
        .eq('business_id', conversation.business_id)
        .eq('channel', 'facebook')
        .eq('status', 'active')
        .maybeSingle()

    if (!channelRow) {
        return NextResponse.json({ error: 'No active Facebook channel for this business' }, { status: 409 })
    }

    const res = await fetch(`https://graph.facebook.com/v25.0/${channelRow.page_id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${channelRow.access_token}`,
        },
        body: JSON.stringify({
            recipient: { id: to },
            messaging_type: 'RESPONSE',
            message: { text: message },
        }),
    })

    const data = await res.json()
    return NextResponse.json(data)
}
