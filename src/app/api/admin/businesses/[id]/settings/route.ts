// app/api/admin/businesses/[id]/settings/route.ts
//
// PATCH del contenido del bot por negocio (alb_business_settings).
// Solo miembros de "Albatros Dev" pueden modificar settings de cualquier
// negocio de la plataforma. Los campos técnicos del prompt (contratos JSON,
// etiqueta [CREATE_BOOKING:...], detección de idioma) viven fijos en
// src/lib/albi-prompt.ts y NO se exponen aquí.
import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isPlatformMember } from '@/lib/platform-auth'

const STRING_FIELDS = [
    'bot_name',
    'business_description',
    'offerings',
    'qualifying_questions',
    'tone_instructions',
    'escalation_msg_es',
    'escalation_msg_en',
    'default_language',
] as const

const NULLABLE_STRING_FIELDS = ['welcome_message', 'notify_phone'] as const

type StringField = typeof STRING_FIELDS[number]
type NullableStringField = typeof NULLABLE_STRING_FIELDS[number]

type SettingsPatch = Partial<Record<StringField, string> & Record<NullableStringField, string | null>>

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
        .select('id')
        .eq('id', businessId)
        .maybeSingle()
    if (!business) {
        return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    let body: unknown
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (!body || typeof body !== 'object') {
        return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }
    const input = body as Record<string, unknown>

    const patch: SettingsPatch = {}

    for (const field of STRING_FIELDS) {
        if (!(field in input)) continue
        const value = input[field]
        if (typeof value !== 'string') {
            return NextResponse.json({ error: `${field} must be a string` }, { status: 400 })
        }
        patch[field] = value
    }

    for (const field of NULLABLE_STRING_FIELDS) {
        if (!(field in input)) continue
        const value = input[field]
        if (value !== null && typeof value !== 'string') {
            return NextResponse.json({ error: `${field} must be a string or null` }, { status: 400 })
        }
        patch[field] = (value === '' ? null : value) as string | null
    }

    if (patch.bot_name !== undefined && patch.bot_name.trim() === '') {
        return NextResponse.json({ error: 'bot_name cannot be empty' }, { status: 400 })
    }
    if (patch.default_language !== undefined && !['es', 'en'].includes(patch.default_language)) {
        return NextResponse.json({ error: 'default_language must be "es" or "en"' }, { status: 400 })
    }

    if (Object.keys(patch).length === 0) {
        return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    // Upsert: si el negocio nunca tuvo settings, lo creamos. Si ya existe, parcheamos.
    const { data: existing } = await service
        .from('alb_business_settings')
        .select('id')
        .eq('business_id', businessId)
        .maybeSingle()

    const nowIso = new Date().toISOString()

    if (existing) {
        const { error: updateError } = await service
            .from('alb_business_settings')
            .update({ ...patch, updated_at: nowIso })
            .eq('id', existing.id)
        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 })
        }
    } else {
        const { error: insertError } = await service
            .from('alb_business_settings')
            .insert({ business_id: businessId, ...patch, updated_at: nowIso })
        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 })
        }
    }

    const { data: settings } = await service
        .from('alb_business_settings')
        .select('business_id, bot_name, business_description, offerings, qualifying_questions, tone_instructions, welcome_message, escalation_msg_es, escalation_msg_en, default_language, notify_phone')
        .eq('business_id', businessId)
        .maybeSingle()

    return NextResponse.json({ settings })
}
