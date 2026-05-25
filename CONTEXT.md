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
│   ├── dashboard/page.tsx          — Dashboard principal (conversaciones WA + FB en pestañas)
│   ├── api/
│   │   ├── webhook/
│   │   │   ├── whatsapp/route.ts   — Webhook de WhatsApp (funciona en producción)
│   │   │   └── facebook/route.ts   — Webhook de Facebook Messenger (en configuración)
│   │   └── send-message/
│   │       ├── route.ts            — Enviar mensaje manual por WhatsApp
│   │       └── facebook/route.ts   — Enviar mensaje manual por Facebook
│   └── page.tsx                    — Landing page pública
└── lib/
    ├── albi-prompt.ts              — System prompt de Albi + mensajes de escalación
    └── supabase/server.ts          — Cliente Supabase (server + service role)
```

---

## Base de datos Supabase — Tablas principales

```sql
alb_conversations (
  id, phone, name, business_name, business_type,
  package_interest, language, status (bot|human),
  unread, channel (whatsapp|facebook), updated_at, created_at
)

alb_messages (
  id, conversation_id, role (user|bot), content, created_at
)
```

**Migración ya aplicada:**
```sql
ALTER TABLE alb_conversations ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT 'whatsapp';
```

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
2. **Considerar limpiar logs de diagnóstico** en `src/app/api/webhook/facebook/route.ts` (los `console.log('[FB] ...')` y reactivar la validación X-Hub-Signature-256 real — actualmente siempre devuelve `true`).

---

## Próximos pasos del roadmap

### Inmediato
- [ ] Confirmar que Albi responde en Facebook Messenger
- [ ] Grabar video de demostración para App Review de Meta (para cuando se quiera publicar)

### Fase 1 — Multi-tenant SaaS (próxima sesión de desarrollo)
- [ ] Agregar tabla `businesses` y `business_settings` en Supabase
- [ ] Agregar `business_id` a `alb_conversations`
- [ ] Webhook multi-tenant (detectar negocio por page_id o phone_id)
- [ ] UI para crear y configurar negocios
- [ ] Primer cliente piloto

Ver detalles completos en: `SAAS_PLAN.md`

---

## Cómo iniciar una nueva sesión

Pega este archivo y di algo como:

> "Continúa el proyecto Albatros IA. El contexto completo está arriba. Quiero [lo que necesites: probar Facebook, empezar el SaaS, mejorar el dashboard, etc.]"
