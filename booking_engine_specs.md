# Especificación Técnica: Booking Engine Conversacional (Supabase + Next.js)

Esta guía detalla la implementación técnica del **Agendamiento Conversacional 100% Nativo en WhatsApp/Messenger**. Mediante este sistema, **Albi** atiende al usuario y, al detectar sus datos en el chat, genera una etiqueta oculta especial. Tu servidor de Next.js intercepta esta etiqueta, registra la cita en Supabase y le entrega un mensaje de confirmación totalmente limpio al usuario.

---

## 💾 1. Modelo de Datos (Esquema SQL para Supabase)

Ejecuta este script en el **SQL Editor** de tu consola de Supabase. El esquema es óptimo para registrar citas asociadas a conversaciones activas.

```sql
-- TABLA DE CITAS (alb_appointments)
-- Almacena todas las reservas generadas directamente desde los chats de WhatsApp o Messenger.
CREATE TABLE IF NOT EXISTS alb_appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID, -- ID del negocio piloto (NULL para Albatros IA)
  conversation_id UUID REFERENCES alb_conversations(id) ON DELETE SET NULL, -- Vinculado al chat activo
  client_name     TEXT NOT NULL,
  client_phone    TEXT NOT NULL,
  client_email    TEXT,
  appointment_date DATE NOT NULL, -- Fecha en formato YYYY-MM-DD
  appointment_time TIME NOT NULL, -- Hora en formato HH:MM
  status          TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled' | 'completed' | 'cancelled'
  notes           TEXT, -- Notas adicionales (ej: "Confirmado por Albi por chat")
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Evitar citas duplicadas a la misma hora en el mismo negocio (Race Conditions)
  CONSTRAINT unique_business_appointment UNIQUE (business_id, appointment_date, appointment_time),
  CONSTRAINT valid_appointment_status CHECK (status IN ('scheduled', 'completed', 'cancelled'))
);

-- Habilitar RLS
ALTER TABLE alb_appointments ENABLE ROW LEVEL SECURITY;
-- Permitir control total a administradores y llamadas desde el servidor
CREATE POLICY "Admin control total citas" ON alb_appointments FOR ALL USING (auth.role() = 'authenticated' OR true);
```

---

## ⚙️ 2. Lógica del Parser Conversacional (Next.js / TypeScript)

Cuando Albi (el modelo Groq) responda, colocará al final de su mensaje una etiqueta como esta (oculta para el cliente final):
`[CREATE_BOOKING: date=2026-06-05, time=10:00, name=Juan Pérez, email=juan@gmail.com, phone=526121234567]`

Crea un archivo de utilidad en tu proyecto (ej: `src/lib/booking-parser.ts`) para interceptar y registrar esta reserva antes de enviar el mensaje a WhatsApp/Messenger:

```typescript
import { createClient } from '@supabase/supabase-js';

interface BookingParams {
  date: string;
  time: string;
  name: string;
  email?: string;
  phone: string;
}

/**
 * Procesa la respuesta de Albi, detecta si hay una petición de reserva,
 * la inserta en Supabase, y remueve la etiqueta técnica de la respuesta final del cliente.
 * 
 * @param assistantMessage El mensaje de texto crudo generado por Groq/Albi
 * @param conversationId El ID de la conversación en Supabase
 * @returns El mensaje limpio que debe enviarse a WhatsApp/Messenger
 */
export async function processConversationalBooking(
  assistantMessage: string,
  conversationId: string
): Promise<string> {
  // Expresión regular para detectar la etiqueta de reserva y sus argumentos
  const bookingRegex = /\[CREATE_BOOKING:\s*([^\]]+)\]/;
  const match = assistantMessage.match(bookingRegex);

  if (!match) {
    // Si no hay etiqueta de reserva, devolvemos el mensaje sin alterar
    return assistantMessage;
  }

  const rawParams = match[1]; // Contiene: "date=2026-06-05, time=10:00, name=Juan..."
  const params: Partial<BookingParams> = {};

  // Extraer las variables individuales
  rawParams.split(',').forEach((param) => {
    const [key, val] = param.split('=').map((s) => s.trim());
    if (key && val) {
      params[key as keyof BookingParams] = val;
    }
  });

  const { date, time, name, email, phone } = params;

  if (date && time && name && phone) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // Usar service role para asegurar la inserción
      );

      // 1. Insertar la reserva en Supabase
      const { error } = await supabase
        .from('alb_appointments')
        .insert([{
          conversation_id: conversationId,
          client_name: name,
          client_phone: phone,
          client_email: email || null,
          appointment_date: date,
          appointment_time: time,
          notes: 'Agendado automáticamente por Albi en el chat de Meta Ads',
          status: 'scheduled'
        }]);

      if (error) {
        // Si hay error (ej: horario duplicado), podemos manejarlo
        console.error('[Supabase Booking Error]:', error);
        
        // Retornamos el mensaje original removiendo la etiqueta técnica para que no se imprima,
        // pero se recomienda que Albi maneje el error en el siguiente turno.
        return assistantMessage.replace(bookingRegex, '').trim();
      }

      console.log(`[Conversational Booking Success]: Cita registrada para ${name} el ${date} a las ${time}`);

    } catch (err) {
      console.error('[Process Conversational Booking Error]:', err);
    }
  }

  // 2. Eliminar la etiqueta técnica del mensaje para que el usuario reciba solo el texto limpio
  return assistantMessage.replace(bookingRegex, '').trim();
}
```

---

## 🔗 3. Integración en tu Webhook de WhatsApp / Messenger

En tu archivo del webhook de WhatsApp (ej: `src/app/api/webhook/whatsapp/route.ts`), integra la función justo después de obtener la respuesta del modelo de IA de Groq y antes de llamar a la Meta Graph API para enviar el mensaje:

```typescript
// ... Lógica donde obtienes la respuesta de Groq ...
const responseFromGroq = await callGroqAPI(messages); // La respuesta de Albi

// Procesar agendamiento conversacional en base de datos
const cleanMessageToSend = await processConversationalBooking(
  responseFromGroq,
  conversation.id // ID de alb_conversations
);

// Enviar el mensaje limpio a Meta
await sendWhatsAppMessage(phoneId, fromNumber, cleanMessageToSend);
```

---

## 📈 4. Ventajas de esta reconfiguración técnica
1.  **Cero caídas por redirección:** Al no sacar al usuario de WhatsApp, no dependemos de si la página web carga lento o si el navegador del móvil del cliente falla.
2.  **Conversión Inmediata:** La tasa de abandono disminuye a casi 0% una vez que el cliente provee sus datos, ya que no tiene que volver a escribir nada en un formulario.
3.  **Memoria del Contexto:** Albi sabe interpretar fechas relativas (ej: *"el próximo viernes"*) basándose en la fecha actual que le inyectamos en el prompt, y calcula la fecha exacta en formato `YYYY-MM-DD` para registrarla.
