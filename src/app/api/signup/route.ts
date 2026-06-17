// app/api/signup/route.ts
//
// Alta de un negocio nuevo en la plataforma. En Fase 1 esto es de uso
// interno: solo un miembro existente de "Albatros Dev" (hoy, Alex) puede
// invocarlo para dar de alta clientes piloto a mano. El self-registro
// público llega en Fase 2 junto con los botones de conexión OAuth.
import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isPlatformMember } from '@/lib/platform-auth'

function slugify(name: string): string {
    const base = name
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    const suffix = Math.random().toString(36).slice(2, 7)
    return `${base || 'negocio'}-${suffix}`
}

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user: requester } } = await supabase.auth.getUser()
    if (!requester) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const service = createServiceClient()

    // Solo un miembro de "Albatros Dev" puede dar de alta negocios nuevos en Fase 1.
    if (!(await isPlatformMember(service, requester.id))) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { email, password, businessName } = await req.json()
    if (!email || !password || !businessName) {
        return NextResponse.json({ error: 'email, password and businessName are required' }, { status: 400 })
    }

    const { data: createdUser, error: createUserError } = await service.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })
    if (createUserError || !createdUser.user) {
        return NextResponse.json({ error: createUserError?.message || 'Could not create user' }, { status: 400 })
    }

    const { data: business, error: businessError } = await service
        .from('alb_businesses')
        .insert({ name: businessName, slug: slugify(businessName) })
        .select()
        .single()

    if (businessError || !business) {
        await service.auth.admin.deleteUser(createdUser.user.id)
        return NextResponse.json({ error: businessError?.message || 'Could not create business' }, { status: 400 })
    }

    const { error: settingsError } = await service
        .from('alb_business_settings')
        .insert({ business_id: business.id, bot_name: 'Asistente' })

    const { error: memberError } = await service
        .from('alb_business_members')
        .insert({ business_id: business.id, user_id: createdUser.user.id, role: 'owner' })

    if (settingsError || memberError) {
        await service.from('alb_businesses').delete().eq('id', business.id)
        await service.auth.admin.deleteUser(createdUser.user.id)
        return NextResponse.json({ error: settingsError?.message || memberError?.message || 'Could not finish setup' }, { status: 400 })
    }

    return NextResponse.json({ businessId: business.id, slug: business.slug })
}
