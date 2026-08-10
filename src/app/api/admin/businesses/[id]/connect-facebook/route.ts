// app/api/admin/businesses/[id]/connect-facebook/route.ts
//
// Conecta una página de Facebook a un negocio. Usa el flujo Facebook Login
// for Business (Tech Provider mode). Tiene dos modos:
//
//   mode: 'list'   → recibe el `code` del SDK, lo intercambia por user token,
//                    lista las páginas autorizadas y las devuelve al frontend
//                    para que el admin elija cuál conectar.
//
//   mode: 'save'   → recibe la página seleccionada, guarda el page_access_token
//                    (que es permanente) en alb_business_channels y suscribe la
//                    app al webhook de la página.
//
// El access token de página NUNCA se devuelve al cliente en el modo 'save'.
import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isPlatformMember } from '@/lib/platform-auth'
import { getErrorMessage } from '@/lib/error-message'

const GRAPH_VERSION = 'v25.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

type FacebookPage = {
    id: string
    name: string
    access_token: string
    category?: string
}

type ConnectFacebookBody = {
    mode?: 'list' | 'save'
    code?: unknown
    pageId?: unknown
    pageAccessToken?: unknown
    pageName?: unknown
}

async function exchangeCodeForUserToken(code: string): Promise<string> {
    const appId = process.env.NEXT_PUBLIC_META_APP_ID
    const appSecret = process.env.META_APP_SECRET
    if (!appId || !appSecret) {
        throw new Error('META_APP_ID / META_APP_SECRET no configurados')
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

async function listPagesForUser(userToken: string): Promise<FacebookPage[]> {
    const url = new URL(`${GRAPH_BASE}/me/accounts`)
    url.searchParams.set('access_token', userToken)
    url.searchParams.set('fields', 'id,name,access_token,category')

    const res = await fetch(url.toString())
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data?.error?.message || 'No se pudieron listar las páginas')
    }
    return (data.data || []) as FacebookPage[]
}

async function subscribePageToApp(pageId: string, pageAccessToken: string): Promise<void> {
    // Suscribir la página a los webhooks de Messenger para empezar a recibir mensajes
    const url = `${GRAPH_BASE}/${pageId}/subscribed_apps`
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            subscribed_fields: 'messages,messaging_postbacks,message_deliveries,message_reads',
            access_token: pageAccessToken,
        }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
        throw new Error(data?.error?.message || 'No se pudo suscribir la página al webhook')
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

    // Validar que el negocio existe
    const { data: business } = await service
        .from('alb_businesses')
        .select('id, name')
        .eq('id', businessId)
        .maybeSingle()
    if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    let body: ConnectFacebookBody
    try {
        body = await req.json() as ConnectFacebookBody
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // ─── Modo 'list': intercambiar code y devolver páginas ──────────────────
    if (body.mode === 'list') {
        if (typeof body.code !== 'string' || !body.code) {
            return NextResponse.json({ error: 'code required' }, { status: 400 })
        }
        try {
            const userToken = await exchangeCodeForUserToken(body.code)
            const pages = await listPagesForUser(userToken)
            // Devolvemos solo lo que el frontend necesita (incluyendo el token —
            // el admin que abrió este flow es quien acaba de autorizarlo, no es
            // exfiltración hacia un tercero)
            return NextResponse.json({
                pages: pages.map(p => ({
                    id: p.id,
                    name: p.name,
                    category: p.category || null,
                    access_token: p.access_token,
                })),
            })
        } catch (error: unknown) {
            return NextResponse.json({ error: getErrorMessage(error, 'Token exchange failed') }, { status: 400 })
        }
    }

    // ─── Modo 'save': guardar la página seleccionada ────────────────────────
    if (body.mode === 'save') {
        const { pageId, pageAccessToken, pageName } = body
        if (
            typeof pageId !== 'string' || !pageId ||
            typeof pageAccessToken !== 'string' || !pageAccessToken ||
            typeof pageName !== 'string' || !pageName
        ) {
            return NextResponse.json({ error: 'pageId, pageAccessToken, pageName required' }, { status: 400 })
        }

        // Verificar que esta página no esté ya conectada a OTRO negocio
        const { data: existing } = await service
            .from('alb_business_channels')
            .select('id, business_id')
            .eq('channel', 'facebook')
            .eq('page_id', pageId)
            .maybeSingle()

        if (existing && existing.business_id !== businessId) {
            return NextResponse.json({
                error: 'Esta página ya está conectada a otro negocio',
            }, { status: 409 })
        }

        try {
            await subscribePageToApp(pageId, pageAccessToken)
        } catch (error: unknown) {
            return NextResponse.json({ error: `No se pudo suscribir el webhook: ${getErrorMessage(error, 'Error desconocido')}` }, { status: 400 })
        }

        // Upsert del canal — si ya existía para este negocio, lo refrescamos
        if (existing) {
            const { error: updateError } = await service
                .from('alb_business_channels')
                .update({
                    access_token: pageAccessToken,
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
                    channel: 'facebook',
                    status: 'active',
                    page_id: pageId,
                    access_token: pageAccessToken,
                })
            if (insertError) {
                return NextResponse.json({ error: insertError.message }, { status: 500 })
            }
        }

        return NextResponse.json({ success: true, pageName, pageId })
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
}
