# Plan para pasar Albi (Messenger) a Producción

> **Objetivo**: que cualquier persona del mundo (no solo admins/testers) pueda escribir a la página "Albatros Dev IA" y recibir respuesta de Albi.
>
> **Estimación total**: 5-10 días (la mayoría es espera por Meta).
>
> **App**: Albatros-IA-Platform (App ID: `28182507484682893`)

---

## Estado actual (2026-05-25)

✅ Albi funciona en Messenger para el admin (Alets Fidel Suarez)
✅ Webhook estable, página suscrita, token long-lived
✅ Páginas legales existen en el sitio (`/privacy-policy`, `/terms`, `/data-deletion`)
✅ Icono de la app configurado

❌ URLs legales NO enlazadas en el Meta App dashboard
❌ Email de soporte NO configurado en la app
❌ Business Verification pendiente (revisar — quizá ya esté hecho por la app de WhatsApp si comparten Business Manager)
❌ `pages_messaging` en modo **Standard Access** — necesita **Advanced Access** para Live mode
❌ App en **Development mode**

---

## Fase 1 — Configuración de la app en Meta (30-45 min, hoy)

### 1.1 Linkear URLs legales y datos de soporte

Ir a **App Dashboard → Settings → Basic**
(`https://developers.facebook.com/apps/28182507484682893/settings/basic/`)

Llenar:
- **Privacy Policy URL**: `https://www.albatrosia.com/privacy-policy`
- **Terms of Service URL**: `https://www.albatrosia.com/terms`
- **User Data Deletion**: opción "Data Deletion Instructions URL" → `https://www.albatrosia.com/data-deletion`
- **App Domains**: agregar `albatrosia.com` y `www.albatrosia.com`
- **Contact Email**: `alex@lapazbay.com`
- **Category**: "Business and Pages" (o "Messaging" si está disponible)
- **Business Use**: marcar "Support my own business"

Clic **Save Changes**.

### 1.2 Verificar Business Manager

Ir a **App Dashboard → Settings → Advanced → Business Manager**
- Si la app ya está conectada a un Business Manager (probablemente el mismo de la app de WhatsApp), **listo, saltar 1.3**
- Si NO está conectada: conectarla al mismo Business Manager que ya usas para WhatsApp

### 1.3 Business Verification (si no está hecha)

Ir a **Meta Business Manager → Security Center**
- Si dice "Verified" o "Business verification complete" → ya está
- Si NO: iniciar verificación (subir documento del negocio). Tarda 1-3 días hábiles

> **Nota**: Si ya pasaste por esto con la app de WhatsApp (Albatros-WSA) y conectaste ambas apps al mismo Business Manager, la verification se hereda y este paso ya está hecho.

---

## Fase 2 — Preparar el screencast para App Review

Meta exige un video mostrando cómo se usa Messenger en tu producto. La calidad del video es lo que más decide la aprobación.

### 2.1 Especificaciones técnicas
- Duración: **2-4 minutos** (máx 5)
- Resolución mínima: 720p (1080p recomendado — QuickTime graba en la resolución nativa de tu pantalla)
- Formato: MP4
- Audio: opcional si usas textos en pantalla; recomendado si narras

### 2.2 Herramientas
- Grabar: **QuickTime → File → New Screen Recording**
- Editar y agregar textos/narración: **CapCut** (gratis, fácil) o **iMovie**
- Subir: directamente al uploader de Meta en el formulario del App Review

---

### 2.3 Guión — OPCIÓN A: sin narración + textos en pantalla en inglés
*(Recomendada — la más rápida de producir)*

Graba la pantalla en silencio y luego en CapCut/iMovie agrega los textos indicados encima del video.

> **Estructura general del video (~3 min)**
> Intro del producto → WhatsApp ya en producción → Demo completa en Messenger → Dashboard unificado → Cumplimiento → Políticas

---

**[ESCENA 1 — 6 segundos]**
Pantalla: `https://www.albatrosia.com`
Texto en pantalla: `Albatros Dev — Digital marketing agency (Mexico)`
Subtexto pequeño: `albatrosia.com`

---

**[ESCENA 2 — 8 segundos]**
Pantalla: `https://www.albatrosia.com`
Texto en pantalla: `Albi is our AI chatbot that captures leads on WhatsApp and Facebook Messenger — 24/7`
Subtexto pequeño: `SaaS platform — multiple businesses, each with their own AI assistant`

---

**[ESCENA 3 — 15 segundos] ← NUEVO: mostrar WhatsApp ya funcionando**
Acción: Abre WhatsApp (en el teléfono o WhatsApp Web) y muestra una conversación real ya existente con Albi respondiendo automáticamente. No hace falta iniciar una nueva — solo muestra el historial de que ya funciona en producción.
Texto en pantalla: `WhatsApp integration — already live in production`
Subtexto pequeño: `Approved via Albatros-WSA app (WhatsApp Business API)`

---

**[ESCENA 4 — 10 segundos]**
Acción: Abre Facebook y busca la página **"Albatros Dev IA"**. Muestra la página y haz clic en **"Send Message"**.
Texto en pantalla: `Now expanding Albi to Facebook Messenger`
Subtexto: `Same bot, same use case — different channel`

---

**[ESCENA 5 — 90 segundos] ← Conversación completa en Messenger**
Acción: Escribe los mensajes UNO por UNO y espera la respuesta de Albi antes de continuar.

Mensajes que tú escribes (como cliente):
1. `Hi, I have a restaurant in Los Cabos and I need a website`
2. *(espera respuesta)* → `My name is Carlos, Carlos Ruiz`
3. *(espera respuesta)* → `It's a seafood restaurant`
4. *(espera respuesta)* → `I want to know about the basic package`

Textos en pantalla:
- Al primer mensaje: `User sends message — Albi replies within the 24-hour messaging window`
- Al capturar nombre/datos: `Albi collects lead data: name, business type, package interest`
- Al final: `All replies are responses to user-initiated messages only — no outbound promotions`

---

**[ESCENA 6 — 20 segundos]**
Acción: Cambia a `https://www.albatrosia.com/dashboard`. Muestra **ambas pestañas** — WhatsApp y Facebook. Haz clic en la pestaña Facebook y muestra la conversación que acabas de tener.
Texto en pantalla: `Unified CRM dashboard — WhatsApp and Messenger conversations in one place`

---

**[ESCENA 7 — 10 segundos]**
Acción: En el dashboard, muestra el botón de tomar control / cambiar a modo humano.
Texto en pantalla: `Human agents can take over any conversation at any time`

---

**[ESCENA 8 — 10 segundos]**
Acción: Abre `https://www.albatrosia.com/data-deletion`
Texto en pantalla: `Users can request data deletion at any time`

---

**[ESCENA 9 — 5 segundos]**
Pantalla: `https://www.albatrosia.com/privacy-policy`
Texto en pantalla: `Privacy Policy: albatrosia.com/privacy-policy`

---

### 2.4 Guión — OPCIÓN B: narración en inglés (para leer en voz alta mientras grabas)

Si prefieres narrar, usa este texto exacto. Léelo despacio y claro — el acento no importa.

---

**[ESCENA 1 — mostrar albatrosia.com]**
> *"This is Albatros Dev, a digital marketing agency based in La Paz, Mexico. We help small and medium businesses grow their online presence."*

---

**[ESCENA 2 — seguir en albatrosia.com]**
> *"We have an AI chatbot called Albi that captures and qualifies leads automatically through messaging. Albatros Dev is a SaaS platform — each business we onboard gets their own AI assistant, trained on their specific products, services, and schedule. Albi is already live on WhatsApp, and we are now requesting the pages_messaging permission to expand Albi to Facebook Messenger."*

---

**[ESCENA 3 — mostrar WhatsApp con conversaciones reales] ← NUEVO**
> *"Here you can see Albi already running in production on WhatsApp Business API, approved and live. Customers send messages, Albi responds, and leads are captured — all within the platform's messaging policies."*

---

**[ESCENA 4 — abrir página de Facebook y clic en Send Message]**
> *"Now we show the same experience on Facebook Messenger. A potential customer visits our Facebook Page and clicks Send Message."*

---

**[ESCENA 5 — conversación completa en Messenger]**

Al escribir el primer mensaje:
> *"The user sends a message. Albi replies within the standard 24-hour messaging window. This is always a response to a user-initiated message — we never send outbound promotional messages."*

Al capturar el nombre:
> *"Albi collects the lead's name, type of business, and package interest — all through natural conversation."*

Al terminar la conversación:
> *"The full conversation stays within the 24-hour window. We do not use message tags and we do not contact users outside the standard window."*

---

**[ESCENA 6 — mostrar el dashboard con ambas pestañas]**
> *"Every conversation — from both WhatsApp and Messenger — appears in real-time in our unified CRM dashboard. Our team can monitor all channels in one place."*

---

**[ESCENA 7 — mostrar botón de control manual]**
> *"At any point, a human agent can take over the conversation by switching it to manual mode."*

---

**[ESCENA 8 — mostrar data-deletion page]**
> *"Users can request the deletion of all their data at any time through our data deletion page."*

---

**[ESCENA 9 — mostrar privacy policy]**
> *"Our full Privacy Policy is available at albatrosia.com slash privacy-policy."*

---

## Fase 3 — Submit del App Review (15-20 min)

### 3.1 Solicitar Advanced Access para `pages_messaging`

Ir a **App Dashboard → App Review → Permissions and Features**
(`https://developers.facebook.com/apps/28182507484682893/app-review/permissions/`)

Buscar **`pages_messaging`** → clic **Request Advanced Access**.

Llenar el formulario:

**How will your app use this permission?**
> Albi, our AI chatbot, replies to incoming Messenger conversations on the Albatros Dev page. It captures lead information (name, business type, package interest, language) within the standard 24-hour messaging window. All replies are responses to user-initiated messages. The bot escalates to a human agent when the conversation requires it.

**Step-by-step instructions for reviewers**:
> 1. Go to facebook.com and search for "Albatros Dev IA" page
> 2. Click "Send Message" / "Enviar mensaje"
> 3. Send any message in Spanish or English (e.g., "Hi, I have a restaurant and need a website")
> 4. Observe Albi's reply within 5-10 seconds
> 5. Continue the conversation — Albi will capture lead info and offer package options
> 6. To see the human-handoff: type "I want to talk to a person" / "Quiero hablar con una persona"

**Test credentials**: no requeridos (el bot responde a cualquier visitante de la página).

**Screencast**: subir el video de la Fase 2.

### 3.2 Otros permisos a solicitar (si los necesitas)

Probablemente NO necesitas más para el use case actual, pero revisa:
- `pages_manage_metadata` — solo si quieres que la app suscriba/desuscriba páginas dinámicamente (NO necesario si solo opera con una página fija)
- `pages_show_list` — si vas a multi-tenant SaaS (ver `SAAS_PLAN.md`)

Por ahora **solo solicita `pages_messaging`** para mantener el review simple.

### 3.3 Submit

Clic **Submit for Review**. Tiempo de respuesta de Meta: **1-7 días hábiles** (típicamente 2-3).

---

## Fase 4 — Esperar y responder al review (1-7 días)

- Meta puede aprobar directo, o pedir cambios
- Si piden cambios: corregir el video o las instrucciones y re-submit (no penaliza)
- Recibes notificación por email a `alex@lapazbay.com`

**Errores comunes que rechazan reviews**:
- Video que no muestra la conversación completa
- Instrucciones que el reviewer no puede reproducir (página privada, requiere login)
- No mostrar cumplimiento de la ventana de 24h
- Privacy Policy con URL rota o sin mencionar Messenger data

---

## Fase 5 — Pasar la app a Live mode (5 min, una vez aprobado)

Ir a **App Dashboard** → toggle de la esquina superior derecha **Development → Live**.

A partir de ese momento:
- ✅ Cualquier usuario de Facebook del mundo puede escribir a la página y Albi responde
- ✅ El webhook se mantiene tal cual (no hay que reconfigurar nada)
- ✅ El Page Access Token long-lived sigue funcionando

---

## Fase 6 — Limpieza técnica (opcional pero recomendada)

Una vez en Live mode, hay deuda técnica del periodo de desarrollo que conviene cerrar:

### 6.1 Re-activar validación de firma X-Hub-Signature-256

En `src/app/api/webhook/facebook/route.ts`:
- La función `validateSignature` actualmente siempre devuelve `true` para diagnóstico
- Cambiar para que devuelva `match` real y rechace POSTs con firma inválida
- Esto previene que terceros falsifiquen eventos al webhook

### 6.2 Reducir logs de diagnóstico

Quitar los `console.log('[FB] ...')` de diagnóstico. Mantener solo errores y eventos críticos.

### 6.3 Mover a multi-tenant (opcional, ver `SAAS_PLAN.md`)

Si quieres ofrecer Albi a otros negocios como SaaS, el siguiente paso es:
- Tabla `businesses` con `page_id` por cliente
- Webhook que detecta a qué negocio pertenece el `entry.id` y usa el token correcto
- Esto es lo siguiente cuando termine el review

---

## Checklist consolidado

### Hoy (30-45 min)
- [ ] Linkear Privacy/Terms/Data Deletion en App Settings → Basic
- [ ] Agregar email de soporte
- [ ] Agregar `albatrosia.com` y `www.albatrosia.com` a App Domains
- [ ] Verificar que app y WhatsApp comparten Business Manager (heredar verification)

### Esta semana (1-2 horas)
- [ ] Grabar screencast siguiendo el guión de la Fase 2
- [ ] Editar/recortar video a 2-4 min
- [ ] Submit App Review con el video

### Esperando Meta (1-7 días)
- [ ] Responder a cualquier pedido de cambios del reviewer

### Cuando aprueben
- [ ] Toggle Development → Live
- [ ] Probar con cuenta externa que no es admin
- [ ] Re-activar validación de firma y limpiar logs (Fase 6)

---

## Referencias rápidas

- App Dashboard: https://developers.facebook.com/apps/28182507484682893/
- App Settings Basic: https://developers.facebook.com/apps/28182507484682893/settings/basic/
- App Review: https://developers.facebook.com/apps/28182507484682893/app-review/permissions/
- Messenger Platform Policies: https://developers.facebook.com/docs/messenger-platform/policy/policy-overview
- Página pública de Facebook: https://www.facebook.com/AlbatrosDevIA (verificar URL real)
