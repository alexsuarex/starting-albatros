-- ============================================================================
-- Fase 1 — Esquema multi-tenant para Albatros IA
--
-- Crea: alb_businesses, alb_business_members, alb_business_settings,
--       alb_business_channels (+ vista alb_business_channels_safe)
-- Altera: alb_conversations, alb_messages (agrega business_id, NULLABLE por ahora)
-- Habilita RLS escopada por membresía en todas las tablas multi-tenant.
--
-- NO contiene secretos. Seguro de versionar en git.
--
-- ORDEN DE EJECUCIÓN:
--   1. Este archivo (0001_multi_tenant_schema.sql)
--   2. supabase/seed_albatros.local.sql  (siembra el negocio "Albatros Dev",
--      hace backfill de business_id en filas existentes, y SOLO AHÍ se agregan
--      los NOT NULL / UNIQUE finales sobre business_id — no se pueden agregar
--      aquí porque las filas existentes todavía no tienen business_id).
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Tablas nuevas
-- ---------------------------------------------------------------------------

CREATE TABLE alb_businesses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  plan        TEXT NOT NULL DEFAULT 'starter',
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Membresía: qué usuario(s) administran qué negocio. Permite 1 o varios
-- usuarios por negocio sin tener que tocar el esquema más adelante.
CREATE TABLE alb_business_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES alb_businesses(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'owner',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business_id, user_id)
);
CREATE INDEX idx_alb_business_members_user ON alb_business_members (user_id);

-- Contenido del bot por negocio. SOLO prosa de negocio — las instrucciones
-- técnicas (contratos JSON, etiqueta de booking, detección de idioma) viven
-- fijas en código (src/lib/albi-prompt.ts), nunca aquí, para que ningún
-- negocio pueda romper esos contratos editando su configuración.
CREATE TABLE alb_business_settings (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id           UUID NOT NULL UNIQUE REFERENCES alb_businesses(id) ON DELETE CASCADE,
  bot_name              TEXT NOT NULL DEFAULT 'Asistente',
  business_description  TEXT NOT NULL DEFAULT '',
  offerings             TEXT NOT NULL DEFAULT '',
  qualifying_questions  TEXT NOT NULL DEFAULT '',
  tone_instructions     TEXT NOT NULL DEFAULT '',
  welcome_message       TEXT,
  escalation_msg_es     TEXT NOT NULL DEFAULT 'Un momento, te conecto con un humano 🙌',
  escalation_msg_en     TEXT NOT NULL DEFAULT 'One moment, connecting you with a human 🙌',
  default_language      TEXT NOT NULL DEFAULT 'es',
  notify_phone          TEXT,
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Canales conectados por negocio (hoy se insertan a mano; en Fase 2 los
-- llenará el flujo de OAuth/Embedded Signup sin cambiar este esquema).
CREATE TABLE alb_business_channels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES alb_businesses(id) ON DELETE CASCADE,
  channel         TEXT NOT NULL CHECK (channel IN ('whatsapp', 'facebook')),
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'pending')),
  phone_number_id TEXT,   -- WhatsApp: value.metadata.phone_number_id del payload de Meta
  waba_id         TEXT,
  phone_display   TEXT,
  page_id         TEXT,   -- Facebook: entry.id del payload de Meta
  access_token    TEXT NOT NULL,
  connected_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (channel, phone_number_id),
  UNIQUE (channel, page_id)
);
CREATE INDEX idx_alb_business_channels_phone ON alb_business_channels (phone_number_id);
CREATE INDEX idx_alb_business_channels_page ON alb_business_channels (page_id);

-- El dashboard SOLO debe leer de esta vista — nunca expone access_token.
CREATE VIEW alb_business_channels_safe AS
  SELECT id, business_id, channel, status, phone_number_id, waba_id, phone_display,
         page_id, connected_at, updated_at
  FROM alb_business_channels;

-- ---------------------------------------------------------------------------
-- 2. Alterar tablas existentes — agregar business_id (NULLABLE por ahora)
-- ---------------------------------------------------------------------------

ALTER TABLE alb_conversations ADD COLUMN business_id UUID REFERENCES alb_businesses(id);
ALTER TABLE alb_messages ADD COLUMN business_id UUID REFERENCES alb_businesses(id);
-- alb_appointments.business_id ya existe (nullable) desde booking_engine_specs.md — no se toca aquí.

CREATE INDEX idx_alb_conversations_business ON alb_conversations (business_id, channel, phone);
CREATE INDEX idx_alb_messages_business ON alb_messages (business_id, conversation_id);

-- ---------------------------------------------------------------------------
-- 3. RLS — patrón de membresía
-- ---------------------------------------------------------------------------

ALTER TABLE alb_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE alb_business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE alb_business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE alb_business_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE alb_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alb_messages ENABLE ROW LEVEL SECURITY;
-- alb_appointments ya tiene RLS habilitado (booking_engine_specs.md) — solo se reemplaza la policy más abajo.

-- Barrer policies abiertas (USING true) heredadas del esquema pre-multi-tenant.
-- Si quedan, sobreescriben el filtrado por membresía porque las policies de
-- mismo tipo (SELECT) se combinan con OR: una sola "true" anula el aislamiento.
DROP POLICY IF EXISTS "Authenticated users only - conversations" ON alb_conversations;
DROP POLICY IF EXISTS "Authenticated users only - messages" ON alb_messages;

CREATE POLICY "member can read own membership" ON alb_business_members
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "member can read own business" ON alb_businesses
  FOR SELECT USING (
    id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );

CREATE POLICY "member can read/update own business_settings" ON alb_business_settings
  FOR SELECT USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );
CREATE POLICY "member can update own business_settings" ON alb_business_settings
  FOR UPDATE USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );

CREATE POLICY "member can read own business_channels" ON alb_business_channels
  FOR SELECT USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );

CREATE POLICY "member can read own conversations" ON alb_conversations
  FOR SELECT USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );
CREATE POLICY "member can update own conversations" ON alb_conversations
  FOR UPDATE USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );

CREATE POLICY "member can read own messages" ON alb_messages
  FOR SELECT USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );
CREATE POLICY "member can insert own messages" ON alb_messages
  FOR INSERT WITH CHECK (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );

-- Reemplazar la policy permisiva original de alb_appointments por la real.
DROP POLICY IF EXISTS "Admin control total citas" ON alb_appointments;

CREATE POLICY "member can read own appointments" ON alb_appointments
  FOR SELECT USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );
CREATE POLICY "member can update own appointments" ON alb_appointments
  FOR UPDATE USING (
    business_id IN (SELECT business_id FROM alb_business_members WHERE user_id = auth.uid())
  );

-- Nota: los webhooks y las rutas /api/* siguen usando createServiceClient()
-- (service_role), que ignora RLS por completo — estas políticas solo afectan
-- las consultas que hace el dashboard desde el navegador con la anon key.

COMMIT;
