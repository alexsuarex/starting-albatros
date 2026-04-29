// app/api/send-message/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
    // Verificar autenticación
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { to, message } = await req.json()

    const phoneId = process.env.KAPSO_PHONE_ID;
    const res = await fetch(`https://api.kapso.ai/meta/whatsapp/v24.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.KAPSO_API_KEY}`,
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