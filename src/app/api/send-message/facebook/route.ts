// app/api/send-message/facebook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { to, message } = await req.json()

    const res = await fetch('https://graph.facebook.com/v21.0/me/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`,
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
