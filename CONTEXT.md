# Contexto del Proyecto — Albatros IA
> Pega este archivo completo al inicio de una nueva conversación para retomar sin perder nada.

---

## ¿Qué es este proyecto?

**Albatros IA** es una plataforma de chatbot con IA llamado **Albi** que responde automáticamente mensajes de clientes en WhatsApp y Facebook Messenger. Tiene un dashboard web donde el equipo puede ver conversaciones en tiempo real y tomar control manual cuando sea necesario.

**URL de producción:** https://albatrosia.com  
**Dashboard:** https://albatrosia.com/dashboard  
**Repositorio GitHub:** https://github.com/alexsuarex/starting-albatros  
**Deploy:** Vercel (proyecto: `starting-albatros`)

---

## Stack técnico

- **Framework:** Next.js 16.2.4 (App Router, React 19, TypeScript)
- **Base de datos:** Supabase (PostgreSQL + Realtime) — `https://srv902561.hstgr.cloud`
- **IA:** Groq SDK — modelo `llama-3.3-70b-versatile`
- **Mensajería:** Meta Graph API v25.0 (WhatsApp Business + Facebook Messenger)
- **Auth:** Supabase Auth
- **Deploy:** Vercel (plan Hobby)

---

## Archivos clave del proyecto

```
src/
├── app/
│   ├── dashboard/page.tsx          — Dashboard principal (conversaciones WA + FB en pestañas, agenda)
│   ├── signup/page.tsx             — Alta interna de negocios nuevos (Fase 1, sin enlace público)
│   ├── api/
│   │   ├── webhook/
│   │   │   ├── route.ts            — Webhook de WhatsApp, multi-tenant (detecta negocio por phone_number_id)
│   │   │   └── facebook/route.ts   — Webhook de Facebook Messenger, multi-tenant (detecta negocio por page_id)
│   │   ├── send-message/
│   │   │   ├── route.ts            — Enviar mensaje manual por WhatsApp (resuelve canal/token por negocio)
│   │   │   └── facebook/route.ts   — Enviar mensaje manual por Facebook (idem)
│   │   └── signup/route.ts         — Crea negocio + usuario owner (solo invocable por miembros de Albatros Dev)
│   └── page.tsx                    — Landing page pública
├── proxy.ts                        — Protección server-side de /dashboard (Next 16: reemplaza middleware.ts)
└── lib/
    ├── albi-prompt.ts              — getBotSystemPrompt(BusinessContext) — framework fijo + contenido por negocio
    ├── booking-parser.ts           — Booking conversacional, ahora escopado por business_id
    └── supabase/server.ts          — Cliente Supabase (server + service role)
```

---

## Base de datos Supabase — multi-tenant (Fase 1, 2026-06-16)

Esquema nuevo en `supabase/migrations/0001_multi_tenant_schema.sql` (sin secretos, versionado en git)
+ `supabase/seed_albatros.local.sql` (con tokens reales, **gitignored**, correr en Supabase Studio):

```sql
alb_businesses (id, name, slug, plan, active, created_at)
alb_business_members (id, business_id, user_id, role, created_at)        -- quién administra qué negocio
alb_business_settings (id, business_id, bot_name, business_description,
  offerings, qualifying_questions, tone_instructions, welcome_message,
  escalation_msg_es, escalation_msg_en, default_language, notify_phone)  -- prompt por negocio
alb_business_channels (id, business_id, channel, status, phone_number_id,
  waba_id, phone_display, page_id, access_token, connected_at)          -- canales conectados por negocio

alb_conversations (..., business_id)   -- ahora NOT NULL + UNIQUE(business_id, channel, phone)
alb_messages (..., business_id)        -- denormalizado para RLS simple
alb_appointments (..., business_id)    -- ya existía nullable, ahora NOT NULL
```

RLS habilitado en todas las tablas multi-tenant vía `alb_business_members`. El primer negocio
sembrado es "Albatros Dev" (slug `albatros-dev`), con Alex (`alex@lapazbay.com`) como owner —
todas las conversaciones/mensajes/citas existentes quedan asociados a ese negocio.

**⚠️ Estado al cierre de esta sesión:** el código (webhooks, prompt, dashboard, signup) ya está
escrito y compila, pero las dos migraciones SQL **todavía no se han corrido** contra la base de
datos real — Alex las ejecuta a mano en el SQL Editor de Supabase Studio. Hasta que eso pase, no
desplegar este código (asume que `business_id` ya existe).

---

## Variables de entorno (.env.local y Vercel)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://srv902561.hstgr.cloud
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Groq (IA)
GROQ_API_KEY=gsk_... (ver Vercel env vars)

# WhatsApp (app: Albatros-WSA — en producción, funciona)
WHATSAPP_TOKEN=EAAVTs5YMlm4BR...
WHATSAPP_PHONE_ID=1056520984217523
WHATSAPP_WABA_ID=4476193322609314
WHATSAPP_VERIFY_TOKEN=albatros_secret_2024
ALEX_WHATSAPP_NUMBER=526121397356
WHATSAPP_APP_SECRET=                          ← NUEVO, FALTA AGREGAR. App Secret de Albatros-WSA
                                                 (Meta App Dashboard → Settings → Basic). Sin esto,
                                                 el webhook de WhatsApp rechaza TODO con 401 — Albi
                                                 deja de responder por completo hasta que se agregue.

# Facebook Messenger (app: Albatros-IA-Platform — en configuración)
FACEBOOK_PAGE_ACCESS_TOKEN=EAGQf11uBGo0BR...  ← Token de Albatros-IA-Platform
FACEBOOK_VERIFY_TOKEN=albatros_fb_2024
FACEBOOK_PAGE_ID=1061533237045736              ← ID de la página "Albatros Dev IA"
META_APP_SECRET=cef5b751d37158018f30b704d23d836e  ← Secret de Albatros-IA-Platform
FACEBOOK_APP_ID=28182507484682893              ← ID de Albatros-IA-Platform
```

---

## Apps de Meta configuradas

### App 1: Albatros-WSA (VIEJA — solo WhatsApp)
- **Estado:** Publicada (Live mode)
- **Uso:** WhatsApp Business API — funciona en producción
- **NO tocar:** Esta app maneja el WhatsApp de Albatros

### App 2: Albatros-IA-Platform (NUEVA — Messenger + futuro SaaS)
- **App ID:** 28182507484682893
- **App Secret:** cef5b751d37158018f30b704d23d836e
- **Estado:** Sin publicar (Development mode) ← esto es correcto para funcionar sin App Review
- **Página conectada:** Albatros Dev IA (ID: 1061533237045736)
- **Webhook configurado:** https://albatrosia.com/api/webhook/facebook
- **Verify token:** albatros_fb_2024
- **Suscripción:** messages ✅
- **subscribed_apps:** llamado con éxito ✅
- **Casos de uso:** Messenger from Meta + WhatsApp (preparado para SaaS)
- **Portfolio comercial:** Albatros IA

---

## Estado actual de cada funcionalidad

| Funcionalidad | Estado | Notas |
|---|---|---|
| Landing page (albatrosia.com) | ✅ Funcionando | |
| Dashboard web | ✅ Funcionando | Login con Supabase Auth |
| Albi en WhatsApp | ✅ Funcionando | App Albatros-WSA en producción |
| Albi en Facebook Messenger | ✅ Funcionando | App Albatros-IA-Platform en Development mode (2026-05-25) |
| Dashboard pestaña Facebook | ✅ Código listo | Mostrará conversaciones de FB |

---

## Lo que se hizo en la última sesión de trabajo

1. ✅ Creada app nueva **Albatros-IA-Platform** en Meta (Development mode)
2. ✅ Webhook configurado y verificado en la nueva app
3. ✅ Page Token generado y guardado en Vercel + .env.local
4. ✅ subscribed_apps llamado con éxito (página suscrita a la nueva app)
5. ✅ Código del webhook mejorado:
   - API v21.0 → v25.0
   - Validación X-Hub-Signature-256 agregada
   - Procesamiento síncrono (se removió `after()` que causaba problemas en Vercel)
6. ✅ SAAS_PLAN.md creado con arquitectura completa del SaaS

### Sesión 2026-05-25 — Albi respondiendo en Messenger ✅
7. ✅ Regenerado **Page Access Token** desde el panel Messenger API Settings de la app (botón "Generar"). Tipo PAGE, `expires_at: 0` (nunca expira), scopes: `pages_messaging`, `pages_manage_metadata`, `pages_show_list` granulares para page 1061533237045736.
8. ✅ Actualizado `FACEBOOK_PAGE_ACCESS_TOKEN` en `.env.local` y en Vercel production. Redeploy ejecutado.
9. 🔥 **Causa raíz del fallo encontrada**: el callback URL configurado en Meta era `https://albatrosia.com/api/webhook/facebook`, pero **Vercel devuelve HTTP 308 redirect** hacia `https://www.albatrosia.com/...`. Meta NO sigue redirects en webhooks — descartaba los eventos silenciosamente.
10. ✅ Actualizado callback URL en Meta a `https://www.albatrosia.com/api/webhook/facebook` vía `POST /{app_id}/subscriptions`. Verificación de Meta exitosa.
11. ✅ Mensaje de prueba enviado → POST 200 en logs → conversación + 2 turnos guardados en `alb_conversations` y `alb_messages`. Albi respondió en Messenger.

---

## Pendiente por resolver

1. **Crear cuenta de revisor en Supabase** para el proceso de App Review de Meta (cuando se quiera publicar para el público general).
2. ~~Considerar limpiar logs de diagnóstico y reactivar la validación X-Hub-Signature-256 real~~ — hecho en la sesión de Fase 1 (2026-06-16): ambos webhooks ahora rechazan con 401 si la firma no es válida.
3. **Correr la migración multi-tenant** (ver siguiente sección) — el código ya está escrito pero la base de datos todavía no.
4. **Agregar `WHATSAPP_APP_SECRET`** a `.env.local` y Vercel antes de desplegar — sin esto el webhook de WhatsApp rechaza todo.
5. **Revisar el contenido sembrado de `alb_business_settings`** para Albatros Dev — es una migración manual de redacción desde `albi-prompt.ts`, vale la pena confirmar que el tono/precios quedaron exactos.

---

## Próximos pasos del roadmap

### Inmediato (para activar lo que se construyó en esta sesión)
- [ ] Correr `supabase/migrations/0001_multi_tenant_schema.sql` en el SQL Editor de Supabase Studio
- [ ] Correr `supabase/seed_albatros.local.sql` justo después (mismo SQL Editor)
- [ ] Agregar `WHATSAPP_APP_SECRET` (App Secret de Albatros-WSA) a `.env.local` y Vercel
- [ ] Desplegar el código nuevo en el mismo release que la migración
- [ ] Smoke test: WhatsApp real, Messenger real, una cita, una escalación — confirmar que el dashboard de Alex sigue mostrando todo

### Fase 1 — Multi-tenant SaaS ✅ código listo (2026-06-16), pendiente correr migración
- [x] Agregar tablas `alb_businesses`, `alb_business_members`, `alb_business_settings`, `alb_business_channels`
- [x] Agregar `business_id` a `alb_conversations`, `alb_messages`, `alb_appointments`
- [x] Webhook multi-tenant (detecta negocio por `page_id`/`phone_number_id`)
- [x] Prompt por negocio (`getBotSystemPrompt`, separa framework técnico de contenido)
- [x] RLS — el dashboard ya filtra automáticamente por negocio sin cambios de UI
- [x] `src/app/signup/page.tsx` + `/api/signup` — alta interna de negocios (sin self-registro público todavía)
- [ ] Primer cliente piloto real (usar `/signup` para darlo de alta a mano)

### Fase 2 — Conexión self-service (siguiente sesión de desarrollo)
- [ ] Botón "Conectar con Facebook" (Facebook Login for Business) para Messenger
- [ ] WhatsApp Embedded Signup (requiere crear una Configuración en el Meta App Dashboard primero)
- [ ] Self-registro público (hoy `/signup` es de uso interno)
- El esquema de `alb_business_channels` ya está listo para esto — no necesita cambios.

Ver detalles completos en: `SAAS_PLAN.md` y `/Users/alejandrosuarezhernandez/.claude/plans/elegant-coalescing-horizon.md`

---

## Cómo iniciar una nueva sesión

Pega este archivo y di algo como:

> "Continúa el proyecto Albatros IA. El contexto completo está arriba. Quiero [lo que necesites: probar Facebook, empezar el SaaS, mejorar el dashboard, etc.]"
