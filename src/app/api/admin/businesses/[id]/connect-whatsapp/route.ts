// app/api/admin/businesses/[id]/connect-whatsapp/route.ts
//
// Conecta un número de WhatsApp Business a un negocio mediante Embedded Signup
// (Facebook Login for Business con la plantilla "Configuración de registro
// insertado de WhatsApp con un token que caduca en 60 días").
//
// Modos:
//   mode: 'list'   → recibe el `code` del SDK, lo intercambia por user token,
//                    lista las WABAs/números autorizados y los devuelve al
//                    frontend para que el admin elija cuál conectar.
//
//   mode: 'save'   → recibe el número seleccionado, suscribe la WABA a la app
//                    en el webhook, registra el número en Cloud API y guarda
//                    el access_token (60 días) en alb_business_channels.
//
// El access_token NUNCA se devuelve al cliente en el modo 'save'.
//
// Importante: este flujo usa la app "Albatros-WSA" (NEXT_PUBLIC_META_WA_APP_ID
// + WHATSAPP_APP_SECRET), separada de la app de Facebook Messenger
// (NEXT_PUBLIC_META_APP_ID + META_APP_SECRET).
import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isPlatformMember } from '@/lib/platform-auth'
import { getErrorMessage } from '@/lib/error-message'

const GRAPH_VERSION = 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

// PIN de 6 dígitos para registrar el número en Cloud API. Es el "two-step
// verification PIN" de la WABA; al ser nuestro valor consistente podemos
// re-registrar el número sin pedírselo al cliente.
const CLOUD_API_PIN = '482931'

type PhoneNumberOption = {
    phone_number_id: string
    display_phone_number: string
    verified_name: string | null
    waba_id: string
    waba_name: string | null
}

type ConnectWhatsAppBody = {
    mode?: 'list' | 'save'
    code?: unknown
    phoneNumberId?: unknown
    wabaId?: unknown
    userToken?: unknown
    phoneDisplay?: unknown
}

async function exchangeCodeForUserToken(code: string): Promise<string> {
    const appId = process.env.NEXT_PUBLIC_META_WA_APP_ID
    const appSecret = process.env.WHATSAPP_APP_SECRET
    if (!appId || !appSecret) {
        throw new Error('NEXT_PUBLIC_META_WA_APP_ID / WHATSAPP_APP_SECRET no configurados')
    }

    const url = new URL(`${GRAPH_BASE}/oauth/access_token`)
    url.searchParams.set('client_id', appId)
    url.searchParams.set('client_secret', appSecret)
    url.searchParams.set('redirect_uri', '')
    url.searchParams.set('code', code)

    const res = await fetch(url.toString())
    const data = await res.json()
    if (!res.ok || !data.access_token) {
        throw new Error(data?.error?.message || 'No se pudo intercambiar el code')
    }
    return data.access_token as string
}

async function listPhoneNumbersForUser(userToken: string): Promise<PhoneNumberOption[]> {
    // 1. Listar Business Managers a los que el token da acceso
    const bmUrl = new URL(`${GRAPH_BASE}/me/businesses`)
    bmUrl.searchParams.set('access_token', userToken)
    bmUrl.searchParams.set('fields', 'id,name')
    const bmRes = await fetch(bmUrl.toString())
    const bmData = await bmRes.json()
    if (!bmRes.ok) {
        throw new Error(bmData?.error?.message || 'No se pudieron listar los Business Managers')
    }

    const phones: PhoneNumberOption[] = []

    // 2. Para cada BM, listar WABAs propias y sus números
    for (const bm of bmData.data || []) {
        const wabaUrl = new URL(`${GRAPH_BASE}/${bm.id}/owned_whatsapp_business_accounts`)
        wabaUrl.searchParams.set('access_token', userToken)
        wabaUrl.searchParams.set('fields', 'id,name')
        const wabaRes = await fetch(wabaUrl.toString())
        const wabaData = await wabaRes.json()
        if (!wabaRes.ok) continue

        for (const waba of wabaData.data || []) {
            const numbersUrl = new URL(`${GRAPH_BASE}/${waba.id}/phone_numbers`)
            numbersUrl.searchParams.set('access_token', userToken)
            numbersUrl.searchParams.set('fields', 'id,display_phone_number,verified_name')
            const numbersRes = await fetch(numbersUrl.toString())
            const numbersData = await numbersRes.json()
            if (!numbersRes.ok) continue

            for (const num of numbersData.data || []) {
                phones.push({
                    phone_number_id: num.id,
                    display_phone_number: num.display_phone_number,
                    verified_name: num.verified_name || null,
                    waba_id: waba.id,
                    waba_name: waba.name || null,
                })
            }
        }
    }

    return phones
}

async function subscribeWabaToApp(wabaId: string, userToken: string): Promise<void> {
    const res = await fetch(`${GRAPH_BASE}/${wabaId}/subscribed_apps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: userToken }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
        throw new Error(data?.error?.message || 'No se pudo suscribir la WABA al webhook')
    }
}

async function registerPhoneNumber(phoneNumberId: string, userToken: string): Promise<void> {
    const res = await fetch(`${GRAPH_BASE}/${phoneNumberId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            pin: CLOUD_API_PIN,
            access_token: userToken,
        }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
        // 133015 = ya registrado en Cloud API. Tras un onboarding fresco
        // significa que ya quedó en nuestra app — lo tratamos como éxito.
        const code = data?.error?.code
        if (code === 133015) return
        throw new Error(data?.error?.message || 'No se pudo registrar el número en Cloud API')
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const service = createServiceClient()
    if (!(await isPlatformMember(service, user.id))) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id: businessId } = await params

    const { data: business } = await service
        .from('alb_businesses')
        .select('id, name')
        .eq('id', businessId)
        .maybeSingle()
    if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    let body: ConnectWhatsAppBody
    try {
        body = await req.json() as ConnectWhatsAppBody
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // ─── Modo 'list': intercambiar code y devolver números ──────────────────
    if (body.mode === 'list') {
        if (typeof body.code !== 'string' || !body.code) {
            return NextResponse.json({ error: 'code required' }, { status: 400 })
        }
        try {
            const userToken = await exchangeCodeForUserToken(body.code)
            const phones = await listPhoneNumbersForUser(userToken)
            // Devolvemos el userToken al admin que acaba de autorizar — lo
            // necesitamos en el modo 'save' y no queremos re-intercambiar el
            // code (es de un solo uso).
            return NextResponse.json({ phones, userToken })
        } catch (error: unknown) {
            return NextResponse.json({ error: getErrorMessage(error, 'Token exchange failed') }, { status: 400 })
        }
    }

    // ─── Modo 'save': guardar el número seleccionado ────────────────────────
    if (body.mode === 'save') {
        const { phoneNumberId, wabaId, userToken, phoneDisplay } = body
        if (
            typeof phoneNumberId !== 'string' || !phoneNumberId ||
            typeof wabaId !== 'string' || !wabaId ||
            typeof userToken !== 'string' || !userToken
        ) {
            return NextResponse.json({ error: 'phoneNumberId, wabaId, userToken required' }, { status: 400 })
        }

        const { data: existing } = await service
            .from('alb_business_channels')
            .select('id, business_id')
            .eq('channel', 'whatsapp')
            .eq('phone_number_id', phoneNumberId)
            .maybeSingle()

        if (existing && existing.business_id !== businessId) {
            return NextResponse.json({
                error: 'Este número ya está conectado a otro negocio',
            }, { status: 409 })
        }

        try {
            await subscribeWabaToApp(wabaId, userToken)
            await registerPhoneNumber(phoneNumberId, userToken)
        } catch (error: unknown) {
            return NextResponse.json({ error: `Setup falló: ${getErrorMessage(error, 'Error desconocido')}` }, { status: 400 })
        }

        if (existing) {
            const { error: updateError } = await service
                .from('alb_business_channels')
                .update({
                    access_token: userToken,
                    waba_id: wabaId,
                    phone_display: typeof phoneDisplay === 'string' ? phoneDisplay : null,
                    status: 'active',
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id)
            if (updateError) {
                return NextResponse.json({ error: updateError.message }, { status: 500 })
            }
        } else {
            const { error: insertError } = await service
                .from('alb_business_channels')
                .insert({
                    business_id: businessId,
                    channel: 'whatsapp',
                    status: 'active',
                    phone_number_id: phoneNumberId,
                    waba_id: wabaId,
                    phone_display: typeof phoneDisplay === 'string' ? phoneDisplay : null,
                    access_token: userToken,
                })
            if (insertError) {
                return NextResponse.json({ error: insertError.message }, { status: 500 })
            }
        }

        return NextResponse.json({ success: true, phoneNumberId, wabaId })
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
}
