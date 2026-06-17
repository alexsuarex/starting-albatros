// app/api/admin/me/route.ts
//
// Endpoint mínimo para que el dashboard pueda decidir si muestra el botón
// "Admin" en el header. Devuelve { isPlatformMember: boolean } — nada más.
import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isPlatformMember } from '@/lib/platform-auth'

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ isPlatformMember: false })

    const service = createServiceClient()
    const ok = await isPlatformMember(service, user.id)
    return NextResponse.json({ isPlatformMember: ok })
}
