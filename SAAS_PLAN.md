# Plan: Albatros IA — Plataforma SaaS Multi-Tenant de Chatbots con IA

> **Documento de planificación estratégica y técnica**
> Creado: 2026-05-23
> Autor: Alejandro Suárez Hernández
> Base de código actual: `albatros-dev` (Next.js 16 + Supabase + Groq + Meta APIs)

---

## Concepto

Convertir el chatbot Albi (actualmente exclusivo de Albatros) en una **plataforma SaaS** donde cualquier negocio puede contratar su propio asistente IA personalizado, conectado a sus canales de WhatsApp y/o Facebook Messenger, con memoria, prompt especializado y dashboard propio.

**Problema que resuelve:** Los negocios pequeños y medianos no tienen recursos para desarrollar un chatbot IA propio, pero sí necesitan responder rápido a sus clientes 24/7 en WhatsApp y Facebook.

**Propuesta de valor:** En menos de 24 horas, un negocio tiene su propio asistente IA activo, respondiendo en sus canales, con su personalidad y conocimiento de su negocio.

---

## Modelo de Negocio

### Planes sugeridos

| Plan | Precio/mes | Canales | Conversaciones | Extras |
|------|-----------|---------|----------------|--------|
| **Starter** | $49 USD | 1 (WA o FB) | 500/mes | Dashboard básico |
| **Pro** | $99 USD | 2 (WA + FB) | 2,000/mes | Dashboard cliente + soporte |
| **Agency** | $299 USD | Ilimitados | 10,000/mes | White label + onboarding dedicado |

### Flujo de ingresos
- Suscripciones mensuales recurrentes (MRR)
- Onboarding fee opcional ($99–$299 por setup inicial)
- Add-ons: conversaciones extra, integraciones adicionales (CRM, email, etc.)

---

## Arquitectura Técnica

### Stack actual (base)
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (App Router)
- **Base de datos:** Supabase (PostgreSQL + Realtime)
- **IA:** Groq SDK — modelo `llama-3.3-70b-versatile`
- **Mensajería:** Meta Graph API v21.0 (WhatsApp Business + Messenger)
- **Auth:** Supabase Auth
- **Deploy:** Vercel

### Diferencia clave: Mono-tenant vs Multi-tenant

```
HOY (mono-tenant):
  Albatros → 1 prompt → 1 WhatsApp → 1 Facebook → 1 dashboard

FUTURO (multi-tenant):
  Business A (Restaurante)  → prompt A → WA propio → FB propia → dashboard A
  Business B (Inmobiliaria) → prompt B → WA propio → FB propia → dashboard B
  Business C (Clínica)      → prompt C → WA propio →     —      → dashboard C
         ↑
  Todo bajo una sola plataforma Albatros
```

---

## Base de Datos — Cambios necesarios en Supabase

### Tablas nuevas

```sql
-- Negocios (clientes de la plataforma)
CREATE TABLE businesses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,  -- para subdominios: slug.albatrosia.com
  owner_email TEXT NOT NULL,
  plan        TEXT NOT NULL DEFAULT 'starter',  -- starter | pro | agency
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Configuración del asistente IA por negocio
CREATE TABLE business_settings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id      UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  system_prompt    TEXT NOT NULL,    -- El "cerebro" personalizado del bot
  bot_name         TEXT NOT NULL DEFAULT 'Asistente',
  welcome_message  TEXT,
  language         TEXT NOT NULL DEFAULT 'es',
  escalation_msg_es TEXT,
  escalation_msg_en TEXT,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Canales conectados por negocio (WA, FB, etc.)
CREATE TABLE business_channels (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  channel      TEXT NOT NULL,   -- 'whatsapp' | 'facebook'
  page_token   TEXT,            -- Facebook Page Access Token
  phone_id     TEXT,            -- WhatsApp Phone ID
  waba_id      TEXT,            -- WhatsApp Business Account ID
  page_id      TEXT,            -- Facebook Page ID
  phone_number TEXT,            -- Número visible del WA
  active       BOOLEAN NOT NULL DEFAULT true,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Tablas existentes — modificaciones

```sql
-- Agregar business_id a conversaciones
ALTER TABLE alb_conversations
  ADD COLUMN business_id UUID REFERENCES businesses(id);

-- Agregar business_id a mensajes (opcional, o se obtiene via JOIN)
-- No es estrictamente necesario si ya está en alb_conversations
```

---

## Flujo de Meta API para SaaS

### Problema actual
Con la arquitectura actual, solo una página de Facebook y un número de WhatsApp están conectados (los de Albatros).

### Solución para SaaS

**Para Facebook Messenger:**
- Usar **Facebook Login for Business** (OAuth)
- El cliente hace clic en "Conectar mi página de Facebook"
- Meta muestra una pantalla de autorización
- El cliente aprueba y Albatros recibe su `PAGE_ACCESS_TOKEN` automáticamente
- Se guarda en `business_channels` y empieza a funcionar

**Para WhatsApp Business:**
- Cada cliente necesita su propio número en Meta Business
- Usar la API de **Embedded Signup** de WhatsApp
- El cliente conecta su cuenta WABA en un formulario dentro de la plataforma
- Se obtiene `PHONE_ID` y `WABA_ID` automáticamente

**Webhook único para todos los clientes:**
```
/api/webhook/whatsapp  → detecta el phone_id → busca el business → usa su prompt
/api/webhook/facebook  → detecta el page_id  → busca el business → usa su prompt
```

```typescript
// Lógica multi-tenant en el webhook
const business = await supabase
  .from('business_channels')
  .select('*, businesses(*, business_settings(*))')
  .eq('phone_id', phoneId)  // o page_id para Facebook
  .eq('active', true)
  .single()

const systemPrompt = business.businesses.business_settings[0].system_prompt
// Usar el prompt de ESE negocio en Groq
```

---

## Estructura del Dashboard

### Dashboard del cliente (cada negocio)
- Ver sus conversaciones (WA + FB en pestañas)
- Responder manualmente
- Ver métricas básicas (mensajes, conversiones, escalaciones)
- Editar su prompt / personalidad del bot
- Conectar/desconectar canales

### Panel de administración (Albatros / tú)
- Ver todos los negocios activos
- Métricas globales (MRR, conversaciones totales, etc.)
- Gestionar planes y pagos
- Crear/suspender cuentas

---

## Roadmap de Desarrollo

### AHORA — Fase 0 (Completado ✅ 2026-05-25)
- [x] Chatbot Albi en WhatsApp
- [x] Dashboard con conversaciones WA + FB
- [x] Albi respondiendo en Facebook Messenger (Development mode, solo admins)
- [ ] `pages_messaging` Advanced Access aprobado por Meta (App Review pendiente)

> **Decisión 2026-05-25**: El SaaS multi-tenant NO se construye aún.
> La prioridad es usar Albatros internamente para conseguir clientes.
> Los negocios piloto se conectan manualmente (el equipo de Albatros lo hace por ellos).
> El flujo de auto-conexión con OAuth (Bloque 2) se construirá cuando haya varios clientes reales que atender.

### Fase 1 — Multi-tenant básico (Mes 1-2)
- [ ] Agregar tabla `businesses` y `business_settings`
- [ ] Agregar `business_id` a conversaciones y mensajes
- [ ] UI para crear un negocio y configurar su prompt
- [ ] Webhook multi-tenant (detectar negocio por channel ID)
- [ ] Primer cliente piloto (precio especial o gratis)

### Fase 2 — Conexión self-service (Mes 3-4)
- [ ] Facebook Login for Business (OAuth para conectar páginas)
- [ ] WhatsApp Embedded Signup
- [ ] Dashboard independiente por cliente (login propio)
- [ ] Billing con Stripe (suscripciones + planes)
- [ ] Límites por plan (contador de conversaciones)

### Fase 3 — Producto completo (Mes 5-6)
- [ ] Landing page de ventas (albatrosia.com)
- [ ] Onboarding automático (registro → conectar canal → listo)
- [ ] App Review de Meta para uso público (todos los usuarios)
- [ ] Métricas avanzadas por cliente
- [ ] Integraciones opcionales (CRM, email, Google Sheets)

### Fase 4 — Escala (Mes 7+)
- [ ] White label (el cliente puede renombrar el bot)
- [ ] Más canales: Instagram DM, Telegram, Web widget
- [ ] Memoria semántica (vector DB con Supabase pgvector)
- [ ] Fine-tuning o RAG con documentos del negocio

---

## Memoria Avanzada — RAG por Negocio

Para que el bot "conozca" el negocio en profundidad (catálogo, precios, políticas, FAQs):

```
Negocio sube documentos PDF/texto
        ↓
Se divide en chunks
        ↓
Se generan embeddings (OpenAI text-embedding o Groq)
        ↓
Se guardan en Supabase pgvector (tabla: business_knowledge)
        ↓
Cuando llega un mensaje, se hace similarity search
        ↓
Los chunks relevantes se inyectan en el system prompt
        ↓
El bot responde con conocimiento real del negocio
```

```sql
-- Tabla para memoria semántica
CREATE TABLE business_knowledge (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  embedding   vector(1536),  -- pgvector
  source      TEXT,          -- nombre del documento original
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## Variables de Entorno necesarias (futuro)

```env
# Ya existentes
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GROQ_API_KEY=

# Meta (globales de la plataforma)
META_APP_ID=
META_APP_SECRET=
WHATSAPP_VERIFY_TOKEN=
FACEBOOK_VERIFY_TOKEN=

# Stripe (billing)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Por cliente → se guardan en DB, no en .env
# business_channels.page_token
# business_channels.phone_id
# etc.
```

---

## Consideraciones de Meta (importante)

- **Una sola Meta App** puede conectar múltiples páginas de Facebook via OAuth
- Para WhatsApp multi-cliente se necesita ser **BSP (Business Solution Provider)** de Meta, o cada cliente usa su propio WABA conectado via Embedded Signup
- La revisión de `pages_messaging` necesita estar aprobada para uso público
- En modo desarrollo, solo admins/testers de la app pueden usar el webhook
- **Para lanzar a clientes reales:** la app de Meta debe tener `pages_messaging` aprobado en producción

---

## Notas de contexto técnico

- Proyecto base: `albatros-dev` en Next.js 16 App Router
- Supabase URL: `https://srv902561.hstgr.cloud`
- Deploy: Vercel (producción en `albatrosia.com`)
- El sistema actual tiene: `alb_conversations`, `alb_messages` con columnas `phone`, `channel`, `status` (bot/human), `unread`, `name`, `business_name`, `business_type`, `package_interest`, `language`
- IA: Groq `llama-3.3-70b-versatile`, max_tokens: 500, temperature: 0.7
- El prompt del bot vive en `src/lib/albi-prompt.ts`

---

## Primer paso recomendado para iniciar

Al abrir esta conversación en el futuro, comenzar con:

> "Quiero empezar la Fase 1 del plan SaaS: agregar la tabla `businesses` y `business_settings` a Supabase, modificar `alb_conversations` para tener `business_id`, y actualizar los webhooks para ser multi-tenant. El código base está en `albatros-dev` con Next.js 16 + Supabase + Groq."
