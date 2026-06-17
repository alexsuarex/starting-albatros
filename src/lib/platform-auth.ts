// lib/platform-auth.ts
//
// Centraliza el chequeo de "este usuario pertenece a Albatros Dev y por lo
// tanto puede administrar la plataforma". Se usa desde el API de admin y
// desde el dashboard para mostrar/ocultar el botón.
import type { SupabaseClient } from '@supabase/supabase-js'

export const PLATFORM_SLUG = 'albatros-dev'

export async function isPlatformMember(
    service: SupabaseClient,
    userId: string
): Promise<boolean> {
    const { data: platform } = await service
        .from('alb_businesses')
        .select('id')
        .eq('slug', PLATFORM_SLUG)
        .maybeSingle()

    if (!platform) return false

    const { data: membership } = await service
        .from('alb_business_members')
        .select('id')
        .eq('business_id', platform.id)
        .eq('user_id', userId)
        .maybeSingle()

    return !!membership
}
