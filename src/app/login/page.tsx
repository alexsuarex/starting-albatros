'use client'
// app/login/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError('Credenciales incorrectas')
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="font-display text-xl font-semibold text-zinc-900">
                            Albatros Dev
                        </span>
                        <span className="font-mono text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
                            beta
                        </span>
                    </div>
                    <p className="text-sm text-zinc-400 font-mono">Acceso equipo interno</p>
                </div>

                {/* Form */}
                <div className="bg-white border border-zinc-200 rounded-xl p-8">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
                                placeholder="alex@albatrosdev.mx"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
                                placeholder="••••••••"
                                required
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
                            {loading ? 'Entrando...' : 'Entrar al dashboard'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-300 mt-6 font-mono">
                    albatrosia.com · La Paz, BCS
                </p>
            </div>
        </div>
    )
}
