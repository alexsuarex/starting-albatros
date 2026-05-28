'use client'
export const dynamic = 'force-dynamic'
// app/dashboard/page.tsx
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────
type Channel = 'whatsapp' | 'facebook'
type View = 'inbox' | 'agenda'

type Conversation = {
    id: string
    phone: string
    name: string | null
    business_name: string | null
    business_type: string | null
    package_interest: string | null
    status: 'bot' | 'human' | 'closed'
    unread: boolean
    updated_at: string
    channel: Channel
}

type Message = {
    id: string
    conversation_id: string
    role: 'user' | 'bot' | 'human'
    content: string
    created_at: string
}

type Appointment = {
    id: string
    conversation_id: string | null
    client_name: string
    client_phone: string
    client_email: string | null
    appointment_date: string
    appointment_time: string
    status: 'scheduled' | 'completed' | 'cancelled'
    notes: string | null
    created_at: string
    alb_conversations?: { id: string; phone: string; channel: Channel } | null
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

function FacebookIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        bot: 'bg-zinc-100 text-zinc-500',
        human: 'bg-amber-50 text-amber-600 border border-amber-200',
        closed: 'bg-zinc-100 text-zinc-400',
    }
    const labels: Record<string, string> = {
        bot: 'Bot activo',
        human: 'Necesita atención',
        closed: 'Cerrado',
    }
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${styles[status] || styles.bot}`}>
            {labels[status] || status}
        </span>
    )
}

// ─── Package badge ────────────────────────────────────────────────────────────
function PackageBadge({ pkg }: { pkg: string | null }) {
    if (!pkg) return null
    return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-900 text-white font-mono">
            {pkg}
        </span>
    )
}

// ─── Appointment status badge ─────────────────────────────────────────────────
function ApptStatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        scheduled: 'bg-amber-50 text-amber-600 border border-amber-200',
        completed: 'bg-zinc-100 text-zinc-500',
        cancelled: 'bg-red-50 text-red-400',
    }
    const labels: Record<string, string> = {
        scheduled: 'Agendada',
        completed: 'Completada',
        cancelled: 'Cancelada',
    }
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${styles[status] || ''}`}>
            {labels[status] || status}
        </span>
    )
}

// ─── Date helpers ──────────────────────────────────────────────────────────────
function getLocalDateStr(offsetDays = 0): string {
    const d = new Date()
    d.setDate(d.getDate() + offsetDays)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatAgendaDate(dateStr: string): string {
    if (dateStr === getLocalDateStr()) return 'Hoy'
    if (dateStr === getLocalDateStr(1)) return 'Mañana'
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
    // ── Inbox state ───────────────────────────────────────────────────────────
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selected, setSelected] = useState<Conversation | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [reply, setReply] = useState('')
    const [sending, setSending] = useState(false)
    const [filter, setFilter] = useState<'all' | 'human' | 'bot' | 'closed'>('all')
    const [channelTab, setChannelTab] = useState<Channel>('whatsapp')

    // ── Agenda state ──────────────────────────────────────────────────────────
    const [view, setView] = useState<View>('inbox')
    const [agendaDate, setAgendaDate] = useState<string>(() => getLocalDateStr())
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
    const [todayApptCount, setTodayApptCount] = useState(0)

    const [user, setUser] = useState<any>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const supabase = createClient()

    // ─── Auth check ──────────────────────────────────────────────────────────
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) router.push('/login')
            else setUser(data.user)
        })
    }, [])

    // ─── Cargar conversaciones ────────────────────────────────────────────────
    useEffect(() => {
        if (!user) return
        loadConversations()

        const sub = supabase
            .channel('alb_conversations_sub')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'alb_conversations' }, () => {
                loadConversations()
            })
            .subscribe()

        return () => { supabase.removeChannel(sub) }
    }, [user])

    async function loadConversations() {
        const { data } = await supabase
            .from('alb_conversations')
            .select('*')
            .order('updated_at', { ascending: false })
        setConversations((data || []).map(c => ({ ...c, channel: (c.channel || 'whatsapp') as Channel })))
    }

    // ─── Cargar mensajes de conversación seleccionada ─────────────────────────
    useEffect(() => {
        if (!selected) return
        loadMessages()

        supabase.from('alb_conversations').update({ unread: false }).eq('id', selected.id)

        const sub = supabase
            .channel(`messages-${selected.id}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'alb_messages',
                filter: `conversation_id=eq.${selected.id}`,
            }, (payload) => {
                setMessages(prev => [...prev, payload.new as Message])
                setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
            })
            .subscribe()

        return () => { supabase.removeChannel(sub) }
    }, [selected?.id])

    async function loadMessages() {
        const { data } = await supabase
            .from('alb_messages')
            .select('*')
            .eq('conversation_id', selected!.id)
            .order('created_at', { ascending: true })
        setMessages(data || [])
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }

    // ─── Contador de citas de hoy (para badge en botón Agenda) ───────────────
    useEffect(() => {
        if (!user) return
        supabase
            .from('alb_appointments')
            .select('id', { count: 'exact', head: true })
            .eq('appointment_date', getLocalDateStr())
            .eq('status', 'scheduled')
            .then(({ count }) => setTodayApptCount(count || 0))
    }, [user])

    // ─── Cargar citas ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!user || view !== 'agenda') return
        loadAppointments()

        const sub = supabase
            .channel('alb_appointments_sub')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'alb_appointments' }, () => {
                loadAppointments()
            })
            .subscribe()

        return () => { supabase.removeChannel(sub) }
    }, [user, view, agendaDate])

    async function loadAppointments() {
        const { data } = await supabase
            .from('alb_appointments')
            .select('*, alb_conversations(id, phone, channel)')
            .eq('appointment_date', agendaDate)
            .order('appointment_time', { ascending: true })
        setAppointments(data || [])
    }

    async function updateApptStatus(id: string, status: 'completed' | 'cancelled') {
        await supabase.from('alb_appointments').update({ status }).eq('id', id)
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
        if (selectedAppt?.id === id) setSelectedAppt(prev => prev ? { ...prev, status } : null)
        if (status === 'completed' || status === 'cancelled') {
            setTodayApptCount(prev => Math.max(0, prev - 1))
        }
    }

    function shiftDay(delta: number) {
        const d = new Date(agendaDate + 'T00:00:00')
        d.setDate(d.getDate() + delta)
        const next = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        setAgendaDate(next)
        setSelectedAppt(null)
    }

    function openConversation(appt: Appointment) {
        const conv = appt.alb_conversations
        if (!conv) return
        const target = conversations.find(c => c.id === conv.id)
        if (target) {
            setView('inbox')
            setChannelTab(conv.channel)
            setSelected(target)
        }
    }

    // ─── Enviar respuesta manual ──────────────────────────────────────────────
    async function handleSend() {
        if (!reply.trim() || !selected || sending) return
        setSending(true)

        await supabase.from('alb_messages').insert({
            conversation_id: selected.id,
            role: 'human',
            content: reply.trim(),
        })

        const apiPath = selected.channel === 'facebook'
            ? '/api/send-message/facebook'
            : '/api/send-message'

        await fetch(apiPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: selected.phone, message: reply.trim() }),
        })

        setReply('')
        setSending(false)
    }

    // ─── Cambiar status ───────────────────────────────────────────────────────
    async function changeStatus(status: 'bot' | 'human' | 'closed') {
        if (!selected) return
        await supabase.from('alb_conversations').update({ status }).eq('id', selected.id)
        setSelected({ ...selected, status })
        loadConversations()
    }

    // ─── Logout ───────────────────────────────────────────────────────────────
    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const filtered = conversations.filter(c =>
        c.channel === channelTab &&
        (filter === 'all' || c.status === filter)
    )

    const waAlerts = conversations.filter(c => c.channel === 'whatsapp' && c.status === 'human' && c.unread).length
    const fbAlerts = conversations.filter(c => c.channel === 'facebook' && c.status === 'human' && c.unread).length

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden">

            {/* Top nav */}
            <div className="h-14 border-b border-zinc-200 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="font-display text-base font-semibold text-zinc-900">Albatros Dev</span>
                    <span className="font-mono text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">dashboard</span>
                    {(waAlerts + fbAlerts) > 0 && (
                        <span className="bg-amber-500 text-white text-xs font-mono w-5 h-5 rounded-full flex items-center justify-center">
                            {waAlerts + fbAlerts}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setView(view === 'agenda' ? 'inbox' : 'agenda')}
                        className={`text-xs font-mono px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                            view === 'agenda'
                                ? 'bg-zinc-900 text-white'
                                : 'text-zinc-400 hover:text-zinc-900 border border-zinc-200'
                        }`}
                    >
                        {view === 'agenda' ? '← Mensajes' : 'Agenda'}
                        {todayApptCount > 0 && view !== 'agenda' && (
                            <span className="bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                                {todayApptCount}
                            </span>
                        )}
                    </button>
                    <button onClick={handleLogout} className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-mono">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {view === 'agenda' ? (

                // ─── Vista Agenda ─────────────────────────────────────────────
                <div className="flex flex-1 overflow-hidden">

                    {/* Lista de citas */}
                    <div className="w-72 border-r border-zinc-200 flex flex-col flex-shrink-0">

                        {/* Navegación de fecha */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
                            <button
                                onClick={() => shiftDay(-1)}
                                className="text-zinc-400 hover:text-zinc-900 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100"
                            >
                                ←
                            </button>
                            <div className="text-center">
                                <p className="text-sm font-medium text-zinc-900 font-mono">{formatAgendaDate(agendaDate)}</p>
                                <p className="text-xs text-zinc-400 font-mono">{agendaDate}</p>
                            </div>
                            <button
                                onClick={() => shiftDay(1)}
                                className="text-zinc-400 hover:text-zinc-900 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100"
                            >
                                →
                            </button>
                        </div>

                        {/* Citas del día */}
                        <div className="flex-1 overflow-y-auto">
                            {appointments.length === 0 ? (
                                <div className="p-6 text-center text-xs text-zinc-400 font-mono">
                                    Sin citas este día
                                </div>
                            ) : (
                                appointments.map(appt => (
                                    <button
                                        key={appt.id}
                                        onClick={() => setSelectedAppt(appt)}
                                        className={`w-full text-left px-4 py-3 border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                                            selectedAppt?.id === appt.id ? 'bg-zinc-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-mono text-sm font-semibold text-zinc-900">
                                                {appt.appointment_time.substring(0, 5)}
                                            </span>
                                            <ApptStatusBadge status={appt.status} />
                                        </div>
                                        <p className="text-sm text-zinc-700 truncate">{appt.client_name}</p>
                                        <p className="text-xs text-zinc-400 font-mono truncate">{appt.client_phone}</p>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Detalle de cita */}
                    {!selectedAppt ? (
                        <div className="flex-1 flex items-center justify-center text-zinc-300">
                            <div className="text-center">
                                <p className="font-display text-2xl mb-2">Agenda</p>
                                <p className="text-sm font-mono">Selecciona una cita</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="max-w-md">

                                {/* Hora y estado */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="font-mono text-4xl font-semibold text-zinc-900">
                                        {selectedAppt.appointment_time.substring(0, 5)}
                                    </span>
                                    <ApptStatusBadge status={selectedAppt.status} />
                                </div>

                                {/* Datos del lead */}
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <p className="text-xs text-zinc-400 font-mono mb-0.5">Nombre</p>
                                        <p className="text-sm font-medium text-zinc-900">{selectedAppt.client_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-400 font-mono mb-0.5">Teléfono</p>
                                        <p className="text-sm text-zinc-700 font-mono">{selectedAppt.client_phone}</p>
                                    </div>
                                    {selectedAppt.client_email && (
                                        <div>
                                            <p className="text-xs text-zinc-400 font-mono mb-0.5">Email</p>
                                            <p className="text-sm text-zinc-700 font-mono">{selectedAppt.client_email}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs text-zinc-400 font-mono mb-0.5">Canal</p>
                                        <div className="flex items-center gap-1.5 text-sm text-zinc-700">
                                            {selectedAppt.alb_conversations?.channel === 'facebook'
                                                ? <><FacebookIcon size={12} /> Facebook Messenger</>
                                                : <><WhatsAppIcon size={12} /> WhatsApp</>
                                            }
                                        </div>
                                    </div>
                                    {selectedAppt.notes && (
                                        <div>
                                            <p className="text-xs text-zinc-400 font-mono mb-0.5">Nota</p>
                                            <p className="text-sm text-zinc-500">{selectedAppt.notes}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Acciones */}
                                {selectedAppt.status === 'scheduled' && (
                                    <div className="flex gap-2 mb-5">
                                        <button
                                            onClick={() => updateApptStatus(selectedAppt.id, 'completed')}
                                            className="text-xs bg-zinc-900 text-white px-4 py-2 rounded-full font-mono hover:bg-zinc-700 transition-colors"
                                        >
                                            Marcar completada
                                        </button>
                                        <button
                                            onClick={() => updateApptStatus(selectedAppt.id, 'cancelled')}
                                            className="text-xs border border-zinc-200 text-zinc-400 px-4 py-2 rounded-full font-mono hover:border-zinc-400 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}

                                {selectedAppt.alb_conversations && (
                                    <button
                                        onClick={() => openConversation(selectedAppt)}
                                        className="text-xs text-zinc-400 hover:text-zinc-900 font-mono transition-colors underline"
                                    >
                                        Ver conversación →
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            ) : (

                // ─── Vista Inbox ──────────────────────────────────────────────
                <div className="flex flex-1 overflow-hidden">

                    {/* Sidebar */}
                    <div className="w-80 border-r border-zinc-200 flex flex-col flex-shrink-0">

                        {/* Channel tabs */}
                        <div className="flex border-b border-zinc-200">
                            <button
                                onClick={() => { setChannelTab('whatsapp'); setSelected(null) }}
                                className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-3 font-mono transition-colors border-b-2 -mb-px ${
                                    channelTab === 'whatsapp'
                                        ? 'border-zinc-900 text-zinc-900'
                                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                                }`}
                            >
                                <WhatsAppIcon size={11} />
                                WhatsApp
                                {waAlerts > 0 && (
                                    <span className="bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                                        {waAlerts}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => { setChannelTab('facebook'); setSelected(null) }}
                                className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-3 font-mono transition-colors border-b-2 -mb-px ${
                                    channelTab === 'facebook'
                                        ? 'border-[#1877F2] text-[#1877F2]'
                                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                                }`}
                            >
                                <FacebookIcon size={11} />
                                Facebook
                                {fbAlerts > 0 && (
                                    <span className="bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                                        {fbAlerts}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Status filters */}
                        <div className="p-3 border-b border-zinc-100 flex gap-1">
                            {(['all', 'human', 'bot', 'closed'] as const).map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`text-xs px-2.5 py-1 rounded-full font-mono transition-colors ${
                                        filter === f
                                            ? 'bg-zinc-900 text-white'
                                            : 'text-zinc-400 hover:text-zinc-900'
                                    }`}
                                >
                                    {f === 'all' ? 'Todos' : f === 'human' ? '⚡ Humano' : f === 'bot' ? 'Bot' : 'Cerrados'}
                                </button>
                            ))}
                        </div>

                        {/* Conversation list */}
                        <div className="flex-1 overflow-y-auto">
                            {filtered.length === 0 && (
                                <div className="p-6 text-center text-xs text-zinc-400 font-mono">
                                    Sin conversaciones
                                </div>
                            )}
                            {filtered.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelected(conv)}
                                    className={`w-full text-left p-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                                        selected?.id === conv.id ? 'bg-zinc-50' : ''
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {conv.unread && conv.status === 'human' && (
                                                <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                                            )}
                                            <span className="font-medium text-sm text-zinc-900 truncate">
                                                {conv.name || (conv.channel === 'facebook' ? 'Usuario de Facebook' : conv.phone)}
                                            </span>
                                        </div>
                                        <StatusBadge status={conv.status} />
                                    </div>
                                    {conv.business_name && (
                                        <p className="text-xs text-zinc-500 truncate mb-1">{conv.business_name}</p>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <PackageBadge pkg={conv.package_interest} />
                                        <span className="text-xs text-zinc-300 font-mono ml-auto">
                                            {new Date(conv.updated_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Panel de conversación */}
                    {!selected ? (
                        <div className="flex-1 flex items-center justify-center text-zinc-300">
                            <div className="text-center">
                                <p className="font-display text-2xl mb-2">Albi Dashboard</p>
                                <p className="text-sm font-mono">Selecciona una conversación</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col overflow-hidden">

                            {/* Header de la conversación */}
                            <div className="h-14 border-b border-zinc-200 flex items-center justify-between px-4 flex-shrink-0">
                                <div>
                                    <p className="font-medium text-sm text-zinc-900">
                                        {selected.name || (selected.channel === 'facebook' ? 'Usuario de Facebook' : selected.phone)}
                                    </p>
                                    <p className="text-xs text-zinc-400 font-mono">
                                        {selected.channel === 'facebook' ? 'Facebook Messenger' : selected.phone}
                                        {selected.business_name && ` · ${selected.business_name}`}
                                        {selected.business_type && ` · ${selected.business_type}`}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PackageBadge pkg={selected.package_interest} />
                                    <StatusBadge status={selected.status} />
                                    {selected.status === 'human' && (
                                        <button
                                            onClick={() => changeStatus('bot')}
                                            className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-600 px-3 py-1.5 rounded-full font-mono transition-colors"
                                        >
                                            Devolver al bot
                                        </button>
                                    )}
                                    {selected.status !== 'closed' && (
                                        <button
                                            onClick={() => changeStatus('closed')}
                                            className="text-xs border border-zinc-200 hover:border-zinc-400 text-zinc-400 px-3 py-1.5 rounded-full font-mono transition-colors"
                                        >
                                            Cerrar
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Mensajes */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50">
                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                                msg.role === 'user'
                                                    ? 'bg-white border border-zinc-200 text-zinc-900 rounded-tl-sm'
                                                    : msg.role === 'bot'
                                                        ? 'bg-zinc-900 text-white rounded-tr-sm'
                                                        : 'bg-zinc-700 text-white rounded-tr-sm'
                                            }`}
                                        >
                                            {msg.role !== 'user' && (
                                                <p className={`text-xs mb-1 font-mono ${msg.role === 'bot' ? 'text-zinc-400' : 'text-zinc-300'}`}>
                                                    {msg.role === 'bot' ? 'Albi' : 'Alex'}
                                                </p>
                                            )}
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                            <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input de respuesta */}
                            <div className="border-t border-zinc-200 p-4 flex-shrink-0 bg-white">
                                {selected.status === 'closed' ? (
                                    <div className="text-center text-xs text-zinc-400 font-mono py-2">
                                        Conversación cerrada
                                        <button onClick={() => changeStatus('human')} className="ml-2 text-zinc-600 underline">
                                            Reabrir
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-end">
                                        <textarea
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault()
                                                    handleSend()
                                                }
                                            }}
                                            placeholder={
                                                selected.status === 'bot'
                                                    ? 'El bot está respondiendo. Escribe para tomar control...'
                                                    : 'Escribe tu respuesta... (Enter para enviar)'
                                            }
                                            rows={2}
                                            className="flex-1 border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!reply.trim() || sending}
                                            className="bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                                        >
                                            {sending ? '...' : 'Enviar'}
                                        </button>
                                    </div>
                                )}
                                {selected.status === 'bot' && reply.trim() && (
                                    <p className="text-xs text-amber-600 font-mono mt-1.5">
                                        ⚡ Al enviar, tomarás control de esta conversación
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
