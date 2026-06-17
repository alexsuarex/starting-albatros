// app/api/me/businesses/route.ts
//
// Devuelve los negocios a los que pertenece el usuario logueado. El dashboard
// lo usa para saber por qué business_id filtrar — defensa en profundidad para
// que el aislamiento entre tenants NO dependa solo de RLS.
import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

type MembershipRow = {
    business_id: string
    role: string
    alb_businesses: {
        id: string
        name: string
        slug: string
    } | null
}

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const service = createServiceClient()

    const { data: rawMemberships } = await service
        .from('alb_business_members')
        .select('business_id, role, alb_businesses(id, name, slug)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

    const memberships = (rawMemberships || []) as unknown as MembershipRow[]

    const businesses = memberships
        .filter(m => m.alb_businesses)
        .map(m => ({
            id: m.business_id,
            name: m.alb_businesses!.name,
            slug: m.alb_businesses!.slug,
            role: m.role,
        }))

    return NextResponse.json({ businesses })
}
