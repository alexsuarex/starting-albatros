// app/api/admin/businesses/route.ts
//
// Devuelve TODOS los negocios de la plataforma (con miembros, canales y
// conteos) — solo para miembros de "Albatros Dev". El dashboard nunca llama
// directo a Supabase para esto porque RLS limita lo que el usuario ve a
// SUS propios negocios; el panel de admin necesita ver todos, así que pasa
// por aquí con service_role.
import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isPlatformMember, PLATFORM_SLUG } from '@/lib/platform-auth'

type ChannelRow = {
    business_id: string
    channel: 'whatsapp' | 'facebook'
    status: 'active' | 'disabled' | 'pending'
    phone_display: string | null
    phone_number_id: string | null
    page_id: string | null
    connected_at: string
}

type MemberRow = {
    business_id: string
    user_id: string
    role: string
    created_at: string
}

type SettingsRow = {
    business_id: string
    bot_name: string
    business_description: string
    offerings: string
    qualifying_questions: string
    tone_instructions: string
    welcome_message: string | null
    escalation_msg_es: string
    escalation_msg_en: string
    default_language: string
    notify_phone: string | null
}

type BusinessRow = {
    id: string
    name: string
    slug: string
    plan: string
    active: boolean
    created_at: string
}

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const service = createServiceClient()
    if (!(await isPlatformMember(service, user.id))) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // ─── Negocios ────────────────────────────────────────────────────────────
    const { data: businessesRaw, error: bizError } = await service
        .from('alb_businesses')
        .select('id, name, slug, plan, active, created_at')
        .order('created_at', { ascending: true })

    if (bizError || !businessesRaw) {
        return NextResponse.json({ error: bizError?.message || 'Could not load businesses' }, { status: 500 })
    }
    const businesses = businessesRaw as BusinessRow[]

    // ─── Settings (uno por negocio) ──────────────────────────────────────────
    const { data: settings } = await service
        .from('alb_business_settings')
        .select('business_id, bot_name, business_description, offerings, qualifying_questions, tone_instructions, welcome_message, escalation_msg_es, escalation_msg_en, default_language, notify_phone')

    const settingsByBiz = new Map<string, SettingsRow>(
        ((settings || []) as SettingsRow[]).map(s => [s.business_id, s])
    )

    // ─── Canales ─────────────────────────────────────────────────────────────
    const { data: channels } = await service
        .from('alb_business_channels')
        .select('business_id, channel, status, phone_display, phone_number_id, page_id, connected_at')
        .order('connected_at', { ascending: true })

    const channelsByBiz = new Map<string, ChannelRow[]>()
    for (const c of (channels || []) as ChannelRow[]) {
        const arr = channelsByBiz.get(c.business_id) || []
        arr.push(c)
        channelsByBiz.set(c.business_id, arr)
    }

    // ─── Miembros (necesitamos emails — los pedimos al Auth API) ─────────────
    const { data: members } = await service
        .from('alb_business_members')
        .select('business_id, user_id, role, created_at')
        .order('created_at', { ascending: true })

    // listUsers solo trae primera página (default 50) — suficiente para Fase 1
    const { data: usersPage } = await service.auth.admin.listUsers({ perPage: 200 })
    const emailByUserId = new Map<string, string>()
    for (const u of usersPage?.users || []) {
        if (u.email) emailByUserId.set(u.id, u.email)
    }

    const membersByBiz = new Map<string, Array<MemberRow & { email: string | null }>>()
    for (const m of (members || []) as MemberRow[]) {
        const arr = membersByBiz.get(m.business_id) || []
        arr.push({ ...m, email: emailByUserId.get(m.user_id) || null })
        membersByBiz.set(m.business_id, arr)
    }

    // ─── Conteos (conversaciones y citas por negocio) ────────────────────────
    const conversationCounts = new Map<string, number>()
    const appointmentCounts = new Map<string, number>()

    await Promise.all(businesses.map(async (b) => {
        const [{ count: convCount }, { count: apptCount }] = await Promise.all([
            service.from('alb_conversations').select('id', { count: 'exact', head: true }).eq('business_id', b.id),
            service.from('alb_appointments').select('id', { count: 'exact', head: true }).eq('business_id', b.id),
        ])
        conversationCounts.set(b.id, convCount || 0)
        appointmentCounts.set(b.id, apptCount || 0)
    }))

    const result = businesses.map(b => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        plan: b.plan,
        active: b.active,
        created_at: b.created_at,
        is_platform: b.slug === PLATFORM_SLUG,
        settings: settingsByBiz.get(b.id) || null,
        channels: channelsByBiz.get(b.id) || [],
        members: membersByBiz.get(b.id) || [],
        counts: {
            conversations: conversationCounts.get(b.id) || 0,
            appointments: appointmentCounts.get(b.id) || 0,
        },
    }))

    return NextResponse.json({ businesses: result })
}
