'use client'
// app/admin/page.tsx
//
// Panel de administración de la plataforma — solo visible para miembros
// de "Albatros Dev". Lista todos los negocios con sus miembros, canales y
// conteos. El botón "Nuevo negocio" reusa la pantalla /signup existente.
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

declare global {
    interface Window {
        FB?: {
            init: (config: { appId: string; cookie?: boolean; xfbml?: boolean; version: string }) => void
            login: (
                callback: (response: { authResponse?: { code?: string; accessToken?: string }; status: string }) => void,
                options: { config_id: string; response_type?: string; override_default_response_type?: boolean }
            ) => void
        }
        fbAsyncInit?: () => void
    }
}

type PageOption = {
    id: string
    name: string
    category: string | null
    access_token: string
}

type Channel = {
    channel: 'whatsapp' | 'facebook'
    status: 'active' | 'disabled' | 'pending'
    phone_display: string | null
    phone_number_id: string | null
    page_id: string | null
    connected_at: string
}

type Member = {
    user_id: string
    role: string
    created_at: string
    email: string | null
}

type BusinessSettings = {
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

type AdminBusiness = {
    id: string
    name: string
    slug: string
    plan: string
    active: boolean
    created_at: string
    is_platform: boolean
    settings: BusinessSettings | null
    channels: Channel[]
    members: Member[]
    counts: {
        conversations: number
        appointments: number
    }
}

const DEFAULT_SETTINGS: BusinessSettings = {
    bot_name: 'Asistente',
    business_description: '',
    offerings: '',
    qualifying_questions: '',
    tone_instructions: '',
    welcome_message: null,
    escalation_msg_es: 'Un momento, te conecto con un humano 🙌',
    escalation_msg_en: 'One moment, connecting you with a human 🙌',
    default_language: 'es',
    notify_phone: null,
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

function FacebookIcon({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    )
}

function ChannelBadge({ ch }: { ch: Channel }) {
    const statusColor = ch.status === 'active'
        ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
        : ch.status === 'disabled'
            ? 'text-zinc-400 border-zinc-200 bg-zinc-50'
            : 'text-amber-600 border-amber-200 bg-amber-50'

    return (
        <div className={`text-xs font-mono px-2 py-1 rounded-full border flex items-center gap-1.5 ${statusColor}`}>
            {ch.channel === 'whatsapp' ? <WhatsAppIcon /> : <FacebookIcon />}
            {ch.channel === 'whatsapp' ? (ch.phone_display || 'WhatsApp') : 'Facebook'}
            <span className="text-zinc-400">·</span>
            <span>{ch.status}</span>
        </div>
    )
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

function BotPreviewRow({ label, value }: { label: string; value: string | null }) {
    const empty = !value || value.trim() === ''
    return (
        <div>
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide mb-1">{label}</p>
            {empty ? (
                <p className="text-xs font-mono text-zinc-300">—</p>
            ) : (
                <p className="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">{value}</p>
            )}
        </div>
    )
}

function BotField({
    label,
    hint,
    value,
    onChange,
    rows = 1,
    placeholder,
}: {
    label: string
    hint?: string
    value: string
    onChange: (v: string) => void
    rows?: number
    placeholder?: string
}) {
    return (
        <div>
            <div className="flex items-baseline justify-between mb-1">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-wide">{label}</label>
                {hint && <span className="text-[11px] font-mono text-zinc-300">{hint}</span>}
            </div>
            {rows === 1 ? (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-400"
                />
            ) : (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-400 leading-relaxed resize-y"
                />
            )}
        </div>
    )
}

export default function AdminPage() {
    const [businesses, setBusinesses] = useState<AdminBusiness[]>([])
    const [selected, setSelected] = useState<AdminBusiness | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // ─── Estado del flujo de conexión a Facebook ─────────────────────────────
    const [fbSdkReady, setFbSdkReady] = useState(false)
    const [fbConnecting, setFbConnecting] = useState(false)
    const [fbPageOptions, setFbPageOptions] = useState<PageOption[] | null>(null)
    const [fbConnectError, setFbConnectError] = useState('')

    // ─── Estado del editor de bot/prompt ─────────────────────────────────────
    const [editingBot, setEditingBot] = useState<AdminBusiness | null>(null)
    const [botDraft, setBotDraft] = useState<BusinessSettings>(DEFAULT_SETTINGS)
    const [botSaving, setBotSaving] = useState(false)
    const [botSaveError, setBotSaveError] = useState('')

    const router = useRouter()
    const supabase = createClient()

    const metaAppId = process.env.NEXT_PUBLIC_META_APP_ID
    const metaFbConfigId = process.env.NEXT_PUBLIC_META_FB_CONFIG_ID
    const facebookConfigured = !!metaAppId && !!metaFbConfigId

    // ─── Inicializar el SDK cuando carga ──────────────────────────────────────
    useEffect(() => {
        if (!facebookConfigured) return
        window.fbAsyncInit = function () {
            window.FB?.init({
                appId: metaAppId!,
                cookie: true,
                xfbml: false,
                version: 'v25.0',
            })
            setFbSdkReady(true)
        }
    }, [facebookConfigured, metaAppId])

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                router.push('/login')
                return
            }
            loadBusinesses()
        })
    }, [])

    async function loadBusinesses() {
        setLoading(true)
        const res = await fetch('/api/admin/businesses')
        if (res.status === 403) {
            router.push('/dashboard')
            return
        }
        if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            setError(data.error || 'No se pudo cargar la lista')
            setLoading(false)
            return
        }
        const data = await res.json()
        setBusinesses(data.businesses)
        setLoading(false)
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    // ─── Flujo de conexión a Facebook ────────────────────────────────────────
    function startFacebookConnect(business: AdminBusiness) {
        if (!facebookConfigured) {
            setFbConnectError('Falta NEXT_PUBLIC_META_APP_ID o NEXT_PUBLIC_META_FB_CONFIG_ID')
            return
        }
        if (!fbSdkReady || !window.FB) {
            setFbConnectError('El SDK de Facebook todavía no carga. Reintenta en unos segundos.')
            return
        }

        setFbConnectError('')
        setFbConnecting(true)

        window.FB.login(
            (response) => {
                // El SDK rechaza callbacks async — empujamos el trabajo asíncrono
                // a una IIFE para no bloquear el callback del SDK.
                void (async () => {
                    const code = response.authResponse?.code
                    if (!code) {
                        setFbConnecting(false)
                        if (response.status !== 'unknown') {
                            setFbConnectError('El usuario canceló o no se obtuvo código')
                        }
                        return
                    }

                    try {
                        const res = await fetch(`/api/admin/businesses/${business.id}/connect-facebook`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ mode: 'list', code }),
                        })
                        const data = await res.json()
                        if (!res.ok) {
                            setFbConnectError(data.error || 'No se pudieron obtener las páginas')
                            setFbConnecting(false)
                            return
                        }

                        const pages = (data.pages || []) as PageOption[]
                        if (pages.length === 0) {
                            setFbConnectError('La cuenta autorizada no tiene páginas administrables')
                            setFbConnecting(false)
                            return
                        }
                        if (pages.length === 1) {
                            await savePage(business.id, pages[0])
                            return
                        }
                        setFbPageOptions(pages)
                        setFbConnecting(false)
                    } catch (e: any) {
                        setFbConnectError(e?.message || 'Error de red')
                        setFbConnecting(false)
                    }
                })()
            },
            {
                config_id: metaFbConfigId!,
                response_type: 'code',
                override_default_response_type: true,
            }
        )
    }

    async function savePage(businessId: string, page: PageOption) {
        setFbConnecting(true)
        try {
            const res = await fetch(`/api/admin/businesses/${businessId}/connect-facebook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'save',
                    pageId: page.id,
                    pageAccessToken: page.access_token,
                    pageName: page.name,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                setFbConnectError(data.error || 'No se pudo guardar la conexión')
                setFbConnecting(false)
                return
            }
            setFbPageOptions(null)
            setFbConnecting(false)
            await loadBusinesses()
            // Refrescar el negocio seleccionado con los datos nuevos
            const refreshed = await fetch('/api/admin/businesses').then(r => r.json())
            const updated = refreshed.businesses?.find((b: AdminBusiness) => b.id === businessId)
            if (updated) setSelected(updated)
        } catch (e: any) {
            setFbConnectError(e?.message || 'Error de red')
            setFbConnecting(false)
        }
    }

    // ─── Editor de bot/prompt ────────────────────────────────────────────────
    function openBotEditor(business: AdminBusiness) {
        setBotDraft(business.settings || DEFAULT_SETTINGS)
        setBotSaveError('')
        setEditingBot(business)
    }

    async function saveBot() {
        if (!editingBot) return
        if (botDraft.bot_name.trim() === '') {
            setBotSaveError('El nombre del bot no puede estar vacío')
            return
        }
        setBotSaving(true)
        setBotSaveError('')
        try {
            const res = await fetch(`/api/admin/businesses/${editingBot.id}/settings`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bot_name: botDraft.bot_name.trim(),
                    business_description: botDraft.business_description,
                    offerings: botDraft.offerings,
                    qualifying_questions: botDraft.qualifying_questions,
                    tone_instructions: botDraft.tone_instructions,
                    welcome_message: botDraft.welcome_message ?? '',
                    escalation_msg_es: botDraft.escalation_msg_es,
                    escalation_msg_en: botDraft.escalation_msg_en,
                    default_language: botDraft.default_language,
                    notify_phone: botDraft.notify_phone ?? '',
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                setBotSaveError(data.error || 'No se pudo guardar')
                setBotSaving(false)
                return
            }
            const updatedSettings: BusinessSettings = data.settings || botDraft
            setBusinesses(prev => prev.map(b => b.id === editingBot.id ? { ...b, settings: updatedSettings } : b))
            setSelected(prev => prev && prev.id === editingBot.id ? { ...prev, settings: updatedSettings } : prev)
            setEditingBot(null)
            setBotSaving(false)
        } catch (e: any) {
            setBotSaveError(e?.message || 'Error de red')
            setBotSaving(false)
        }
    }

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden">

            {/* Top nav */}
            <div className="h-14 border-b border-zinc-200 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="font-display text-base font-semibold text-zinc-900">Albatros Dev</span>
                    <span className="font-mono text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">admin</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-mono"
                    >
                        ← Dashboard
                    </button>
                    <button
                        onClick={() => router.push('/signup')}
                        className="text-xs bg-zinc-900 text-white px-3 py-1.5 rounded-full font-mono hover:bg-zinc-700 transition-colors"
                    >
                        + Nuevo negocio
                    </button>
                    <button onClick={handleLogout} className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-mono">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">

                {/* Lista de negocios */}
                <div className="w-80 border-r border-zinc-200 flex flex-col flex-shrink-0">
                    <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wide">Negocios</p>
                        <span className="text-xs font-mono text-zinc-400">{businesses.length}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading && (
                            <div className="p-6 text-center text-xs text-zinc-400 font-mono">Cargando...</div>
                        )}
                        {error && (
                            <div className="p-6 text-center text-xs text-red-500 font-mono">{error}</div>
                        )}
                        {!loading && businesses.length === 0 && !error && (
                            <div className="p-6 text-center text-xs text-zinc-400 font-mono">Sin negocios</div>
                        )}
                        {businesses.map(biz => (
                            <button
                                key={biz.id}
                                onClick={() => setSelected(biz)}
                                className={`w-full text-left p-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                                    selected?.id === biz.id ? 'bg-zinc-50' : ''
                                }`}
                            >
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="font-medium text-sm text-zinc-900 truncate">{biz.name}</span>
                                        {biz.is_platform && (
                                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-white flex-shrink-0">
                                                plataforma
                                            </span>
                                        )}
                                    </div>
                                    {!biz.active && (
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-50 text-red-500 border border-red-200 flex-shrink-0">
                                            inactivo
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-zinc-400 font-mono truncate">{biz.slug}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                                        {biz.plan}
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-300">
                                        {biz.counts.conversations} conv · {biz.counts.appointments} citas
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Panel de detalle */}
                {!selected ? (
                    <div className="flex-1 flex items-center justify-center text-zinc-300">
                        <div className="text-center">
                            <p className="font-display text-2xl mb-2">Administración</p>
                            <p className="text-sm font-mono">Selecciona un negocio</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-2xl">

                            {/* Encabezado */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="font-display text-2xl font-semibold text-zinc-900">{selected.name}</h1>
                                    {selected.is_platform && (
                                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-white">plataforma</span>
                                    )}
                                    {!selected.active && (
                                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-50 text-red-500 border border-red-200">inactivo</span>
                                    )}
                                </div>
                                <p className="text-sm text-zinc-400 font-mono">
                                    {selected.slug} · plan {selected.plan} · alta {formatDate(selected.created_at)}
                                </p>
                            </div>

                            {/* Métricas */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className="border border-zinc-200 rounded-xl p-4">
                                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-wide mb-1">Conversaciones</p>
                                    <p className="font-display text-2xl font-semibold text-zinc-900">{selected.counts.conversations}</p>
                                </div>
                                <div className="border border-zinc-200 rounded-xl p-4">
                                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-wide mb-1">Citas</p>
                                    <p className="font-display text-2xl font-semibold text-zinc-900">{selected.counts.appointments}</p>
                                </div>
                            </div>

                            {/* Canales */}
                            <section className="mb-8">
                                <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-3">Canales conectados</h2>
                                {selected.channels.length === 0 ? (
                                    <p className="text-sm text-zinc-400 font-mono mb-3">Sin canales conectados</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selected.channels.map((ch, i) => (
                                            <ChannelBadge key={i} ch={ch} />
                                        ))}
                                    </div>
                                )}

                                {/* Botones de conexión */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {!selected.channels.some(c => c.channel === 'facebook' && c.status === 'active') && (
                                        <button
                                            onClick={() => startFacebookConnect(selected)}
                                            disabled={fbConnecting || !facebookConfigured}
                                            className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#1877F2] text-white hover:bg-[#1463cf] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                            title={!facebookConfigured ? 'Faltan env vars NEXT_PUBLIC_META_APP_ID / NEXT_PUBLIC_META_FB_CONFIG_ID' : ''}
                                        >
                                            <FacebookIcon size={12} />
                                            {fbConnecting ? 'Conectando...' : 'Conectar Facebook'}
                                        </button>
                                    )}
                                    {!selected.channels.some(c => c.channel === 'whatsapp' && c.status === 'active') && (
                                        <button
                                            disabled
                                            className="text-xs font-mono px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-400 cursor-not-allowed flex items-center gap-1.5"
                                            title="Próximamente"
                                        >
                                            <WhatsAppIcon size={12} />
                                            Conectar WhatsApp (pronto)
                                        </button>
                                    )}
                                </div>

                                {fbConnectError && (
                                    <p className="text-xs text-red-500 font-mono mt-2">{fbConnectError}</p>
                                )}
                                {!facebookConfigured && (
                                    <p className="text-xs text-amber-600 font-mono mt-2">
                                        Conexión a Facebook deshabilitada: configura <code>NEXT_PUBLIC_META_APP_ID</code> y <code>NEXT_PUBLIC_META_FB_CONFIG_ID</code> en .env.local
                                    </p>
                                )}
                            </section>

                            {/* Miembros */}
                            <section className="mb-8">
                                <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-3">
                                    Miembros · {selected.members.length}
                                </h2>
                                {selected.members.length === 0 ? (
                                    <p className="text-sm text-zinc-400 font-mono">Sin miembros</p>
                                ) : (
                                    <div className="border border-zinc-200 rounded-xl divide-y divide-zinc-100">
                                        {selected.members.map(m => (
                                            <div key={m.user_id} className="px-4 py-3 flex items-center justify-between">
                                                <div className="min-w-0">
                                                    <p className="text-sm text-zinc-900 truncate">{m.email || '(sin email)'}</p>
                                                    <p className="text-xs text-zinc-400 font-mono truncate">{m.user_id}</p>
                                                </div>
                                                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 flex-shrink-0 ml-3">
                                                    {m.role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Bot */}
                            <section className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wide">Bot</h2>
                                    <button
                                        onClick={() => openBotEditor(selected)}
                                        className="text-xs font-mono px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
                                    >
                                        Editar
                                    </button>
                                </div>
                                <div className="border border-zinc-200 rounded-xl px-4 py-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400 font-mono">Nombre</span>
                                        <span className="text-zinc-900">{selected.settings?.bot_name || DEFAULT_SETTINGS.bot_name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400 font-mono">Idioma por defecto</span>
                                        <span className="text-zinc-900 font-mono uppercase">{selected.settings?.default_language || DEFAULT_SETTINGS.default_language}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400 font-mono">Notificación a</span>
                                        <span className="text-zinc-900 font-mono">{selected.settings?.notify_phone || '—'}</span>
                                    </div>
                                </div>
                                {selected.settings && (
                                    <div className="mt-3 border border-zinc-200 rounded-xl px-4 py-3 space-y-3">
                                        <BotPreviewRow label="Descripción del negocio" value={selected.settings.business_description} />
                                        <BotPreviewRow label="Oferta / Servicios" value={selected.settings.offerings} />
                                        <BotPreviewRow label="Preguntas calificadoras" value={selected.settings.qualifying_questions} />
                                        <BotPreviewRow label="Instrucciones de tono" value={selected.settings.tone_instructions} />
                                        <BotPreviewRow label="Mensaje de bienvenida" value={selected.settings.welcome_message} />
                                        <BotPreviewRow label="Escalación (ES)" value={selected.settings.escalation_msg_es} />
                                        <BotPreviewRow label="Escalación (EN)" value={selected.settings.escalation_msg_en} />
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                )}
            </div>

            {/* Facebook JS SDK — solo se carga si está configurado */}
            {facebookConfigured && (
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                />
            )}

            {/* Modal de edición del bot/prompt */}
            {editingBot && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-6">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                        <div className="px-6 pt-6 pb-3 border-b border-zinc-100 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-display text-lg font-semibold text-zinc-900">
                                    Editar bot de {editingBot.name}
                                </h3>
                                <p className="text-xs text-zinc-400 font-mono mt-1">
                                    Estos campos se inyectan en el system prompt del modelo.
                                </p>
                            </div>
                            <button
                                onClick={() => { setEditingBot(null); setBotSaveError('') }}
                                disabled={botSaving}
                                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-mono disabled:opacity-50"
                            >
                                Cerrar
                            </button>
                        </div>

                        <div className="px-6 py-5 overflow-y-auto space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <BotField
                                    label="Nombre del bot"
                                    hint="ej: Albi, Claudia"
                                    value={botDraft.bot_name}
                                    onChange={v => setBotDraft({ ...botDraft, bot_name: v })}
                                    placeholder="Asistente"
                                />
                                <div>
                                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-wide mb-1 block">Idioma por defecto</label>
                                    <select
                                        value={botDraft.default_language}
                                        onChange={e => setBotDraft({ ...botDraft, default_language: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 bg-white"
                                    >
                                        <option value="es">Español</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>

                            <BotField
                                label="Descripción del negocio"
                                hint="qué hace, dónde está, a quién atiende"
                                value={botDraft.business_description}
                                onChange={v => setBotDraft({ ...botDraft, business_description: v })}
                                rows={4}
                                placeholder="Somos un gimnasio especializado en entrenamiento funcional ubicado en La Paz, BCS..."
                            />

                            <BotField
                                label="Oferta / Servicios"
                                hint="paquetes, precios, horarios"
                                value={botDraft.offerings}
                                onChange={v => setBotDraft({ ...botDraft, offerings: v })}
                                rows={4}
                                placeholder="Ofrecemos: Membresía mensual $X, Clases sueltas $Y, Pase semanal $Z..."
                            />

                            <BotField
                                label="Preguntas calificadoras"
                                hint="qué debe averiguar el bot antes de agendar"
                                value={botDraft.qualifying_questions}
                                onChange={v => setBotDraft({ ...botDraft, qualifying_questions: v })}
                                rows={4}
                                placeholder="Pregunta nombre, qué objetivo busca (bajar peso, ganar masa, etc.), si ya entrenó antes..."
                            />

                            <BotField
                                label="Instrucciones de tono"
                                hint="cómo debe hablar el bot"
                                value={botDraft.tone_instructions}
                                onChange={v => setBotDraft({ ...botDraft, tone_instructions: v })}
                                rows={3}
                                placeholder="Habla cercano y motivador, sin abusar de emojis. Tutea al cliente. Respuestas cortas."
                            />

                            <BotField
                                label="Mensaje de bienvenida (opcional)"
                                hint="se envía al primer mensaje del lead"
                                value={botDraft.welcome_message ?? ''}
                                onChange={v => setBotDraft({ ...botDraft, welcome_message: v })}
                                rows={2}
                                placeholder="¡Hola! Soy Albi, asistente del gimnasio. ¿En qué te puedo ayudar?"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <BotField
                                    label="Escalación (ES)"
                                    hint="cuando pasa a humano"
                                    value={botDraft.escalation_msg_es}
                                    onChange={v => setBotDraft({ ...botDraft, escalation_msg_es: v })}
                                    rows={3}
                                />
                                <BotField
                                    label="Escalación (EN)"
                                    hint="cuando pasa a humano"
                                    value={botDraft.escalation_msg_en}
                                    onChange={v => setBotDraft({ ...botDraft, escalation_msg_en: v })}
                                    rows={3}
                                />
                            </div>

                            <BotField
                                label="Teléfono de notificación"
                                hint="opcional, con código de país"
                                value={botDraft.notify_phone ?? ''}
                                onChange={v => setBotDraft({ ...botDraft, notify_phone: v })}
                                placeholder="526121234567"
                            />
                        </div>

                        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                            {botSaveError ? (
                                <p className="text-xs text-red-500 font-mono">{botSaveError}</p>
                            ) : <span />}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { setEditingBot(null); setBotSaveError('') }}
                                    disabled={botSaving}
                                    className="text-xs font-mono px-3 py-1.5 rounded-full text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={saveBot}
                                    disabled={botSaving}
                                    className="text-xs font-mono px-4 py-1.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 transition-colors disabled:opacity-50"
                                >
                                    {botSaving ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de selección de página (cuando el usuario autorizó >1 página) */}
            {fbPageOptions && selected && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-6">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h3 className="font-display text-lg font-semibold text-zinc-900 mb-1">
                            Elige una página
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono mb-5">
                            Estas son las páginas que autorizaste. Selecciona cuál conectar a {selected.name}.
                        </p>
                        <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
                            {fbPageOptions.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => savePage(selected.id, p)}
                                    disabled={fbConnecting}
                                    className="w-full text-left border border-zinc-200 hover:border-zinc-400 rounded-xl px-4 py-3 transition-colors disabled:opacity-50"
                                >
                                    <p className="text-sm font-medium text-zinc-900">{p.name}</p>
                                    <p className="text-xs text-zinc-400 font-mono">
                                        {p.category || 'Página'} · {p.id}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => { setFbPageOptions(null); setFbConnectError('') }}
                            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-mono"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
