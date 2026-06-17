import { createServiceClient } from '@/lib/supabase/server'

interface BookingParams {
  date: string
  time: string
  name: string
  email?: string
  phone: string
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

async function checkSlotAvailability(
  date: string,
  time: string,
  businessId: string
): Promise<{ available: boolean; nextSlot?: string }> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('alb_appointments')
    .select('appointment_time')
    .eq('business_id', businessId)
    .eq('appointment_date', date)
    .neq('status', 'cancelled')

  if (!data || data.length === 0) return { available: true }

  const requestedMin = timeToMinutes(time)

  for (const appt of data) {
    const existingMin = timeToMinutes(appt.appointment_time.substring(0, 5))
    const diff = requestedMin - existingMin
    // Block if new request falls within [E, E+30) of an existing appointment
    if (diff >= 0 && diff < 30) {
      const nextMin = existingMin + 30
      const h = Math.floor(nextMin / 60).toString().padStart(2, '0')
      const m = (nextMin % 60).toString().padStart(2, '0')
      return { available: false, nextSlot: `${h}:${m}` }
    }
  }

  return { available: true }
}

export async function processConversationalBooking(
  assistantMessage: string,
  conversationId: string,
  lang: 'es' | 'en' = 'es',
  fallbackPhone: string | undefined,
  businessId: string
): Promise<string> {
  const bookingRegex = /\[CREATE_BOOKING:\s*([^\]]+)\]/
  const match = assistantMessage.match(bookingRegex)
  if (!match) return assistantMessage

  const params: Partial<BookingParams> = {}
  match[1].split(',').forEach((segment) => {
    const eqIdx = segment.indexOf('=')
    if (eqIdx === -1) return
    const key = segment.substring(0, eqIdx).trim()
    const val = segment.substring(eqIdx + 1).trim()
    if (key && val) params[key as keyof BookingParams] = val
  })

  const { date, time, name, email } = params
  const phone = params.phone || fallbackPhone
  const cleanMessage = assistantMessage.replace(bookingRegex, '').trim()

  if (!date || !time || !name || !phone) {
    console.warn('[Booking] Faltan campos requeridos:', { date, time, name, phone })
    return cleanMessage
  }

  const { available, nextSlot } = await checkSlotAvailability(date, time, businessId)

  if (!available) {
    const notice =
      lang === 'en'
        ? `\n\n⚠️ That time slot is already taken. The next available time is ${nextSlot}. Does that work for you?`
        : `\n\n⚠️ Ese horario ya tiene una cita. La próxima disponibilidad es a las ${nextSlot}. ¿Te funciona esa hora?`
    return cleanMessage + notice
  }

  try {
    const supabase = createServiceClient()
    const { error } = await supabase.from('alb_appointments').insert([{
      business_id: businessId,
      conversation_id: conversationId,
      client_name: name,
      client_phone: phone,
      client_email: email || null,
      appointment_date: date,
      appointment_time: time,
      notes: 'Agendado automáticamente por Albi en el chat',
      status: 'scheduled',
    }])
    if (error) {
      console.error('[Booking Error]:', error.message)
    } else {
      console.log(`[Booking OK]: ${name} — ${date} ${time}`)
    }
  } catch (err) {
    console.error('[Booking Exception]:', err)
  }

  return cleanMessage
}
