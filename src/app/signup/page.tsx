'use client'
// app/signup/page.tsx
//
// Alta interna de negocios nuevos (Fase 1). Solo un miembro de "Albatros Dev"
// con sesión activa puede usar esta pantalla — no hay enlace público a ella.
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
    const [businessName, setBusinessName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessName, email, password }),
        })
        const data = await res.json()

        if (!res.ok) {
            setError(data.error || 'No se pudo crear el negocio')
            setLoading(false)
            return
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
            setError('Negocio creado, pero no se pudo iniciar sesión automáticamente. Ve a /login.')
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="font-display text-xl font-semibold text-zinc-900">
                            Albatros IA
                        </span>
                        <span className="font-mono text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
                            alta de negocio
                        </span>
                    </div>
                    <p className="text-sm text-zinc-400 font-mono">Solo equipo interno</p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Nombre del negocio
                            </label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
                                placeholder="Hamburguesas El Capi"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Email del dueño
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
                                placeholder="dueno@negocio.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Contraseña temporal
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 font-mono">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creando...' : 'Crear negocio'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
