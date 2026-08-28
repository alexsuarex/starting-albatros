"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CURRENCIES,
  Currency,
  Language,
  PRICING_BY_CURRENCY,
  translations,
  WA_LINKS,
} from "@/lib/translations";

type PlanKey = "whatsappIA" | "multicanalIA" | "negocioAutonomoIA";
type Channel = "WhatsApp" | "Messenger" | "Instagram";

const planKeys: PlanKey[] = ["whatsappIA", "multicanalIA", "negocioAutonomoIA"];
const channels: Channel[] = ["WhatsApp", "Messenger", "Instagram"];

const copy = {
  es: {
    nav: [["Producto", "#producto"], ["Cómo funciona", "#como-funciona"], ["Planes", "#planes"], ["Preguntas", "#preguntas"]],
    login: "Iniciar sesión",
    demo: "Agenda una demo",
    heroTitle: "Convierte conversaciones en clientes.",
    heroBody: "Albatros responde, califica prospectos y agenda citas en WhatsApp y Messenger, incluso cuando tú no estás.",
    how: "Ver cómo funciona",
    channels: "Canales conectados",
    inbox: "Bandeja compartida",
    all: "Todas",
    unread: "No leídas",
    active: "IA activa",
    online: "En línea",
    type: "Escribe un mensaje…",
    journeyTitle: "Del primer mensaje a la cita, sin cambiar de pantalla.",
    journeyBody: "Albi entiende la intención, responde con la información de tu negocio y deja cada oportunidad lista para avanzar.",
    stages: [
      ["Responde", "Usa tus servicios, precios y horarios."],
      ["Califica", "Organiza cada prospecto y avisa a tu equipo."],
      ["Agenda", "Confirma el horario y crea la cita."],
    ],
    connectedTitle: "Una sola conversación. Todo tu negocio conectado.",
    connected: [
      ["Bandeja compartida", "Tu equipo ve el mismo contexto y sabe qué sigue."],
      ["IA activa 24/7", "Responde al instante con información real de tu negocio."],
      ["Seguimiento automático", "Mantiene viva cada oportunidad sin perseguir pendientes."],
      ["Escala a tu equipo", "Entrega la conversación cuando hace falta una persona."],
    ],
    process: "Conocer el proceso",
    plansTitle: "Elige cómo quieres empezar.",
    planIntro: "Empieza por un canal o conecta toda tu atención, agenda y seguimiento.",
    currency: "Moneda",
    includes: "Incluye",
    choose: "Elegir plan",
    month: "mes",
    setup: "configuración",
    recommended: "Recomendado",
    faqTitle: "Antes de empezar",
    faqIntro: "Respuestas claras para tomar una decisión sin letra pequeña.",
    clientsEyebrow: "Opiniones de clientes",
    clientsTitle: "Lo que opinan nuestros clientes.",
    clientsIntro: "Algunos negocios cuentan cómo Albatros les ayuda a responder más rápido, organizar citas y dar un seguimiento más consistente.",
    clients: [
      {
        status: "Ventas y citas automatizadas",
        name: "Satélite Car Audio",
        meta: "Audio automotriz · Rastreo satelital",
        story: "Con Albatros automatizamos la atención y las ventas sin perder el trato cercano. Los agentes orientan sobre equipos, instalaciones, reparaciones y rastreo, y agendan citas para dar seguimiento a cada solicitud.",
        link: "satelitecaraudio.wixsite.com",
        href: "https://satelitecaraudio.wixsite.com/misitio",
        logo: "/satelite-car-audio-logo.avif",
      },
      {
        status: "Agenda médica 24/7",
        name: "Vital Health Clinic",
        meta: "Clínica de especialidades · Servicios médicos",
        story: "Con Albatros, nuestros pacientes pueden solicitar información y agendar citas desde redes sociales a cualquier hora. Respondemos con mayor rapidez y mantenemos la agenda organizada desde el primer mensaje.",
        link: "Facebook · Vital Health Clinic",
        href: "https://www.facebook.com/vitalhealthlapazbcs",
        logo: "/vital-health-clinic-logo.jpg",
      },
      {
        status: "Agente IA activo",
        name: "MAS Persianas",
        meta: "Marcos Suarez Lopez · Propietario",
        story: "Albatros transformó la forma en que atendemos a nuestros clientes. El agente de IA responde por WhatsApp y Messenger de manera rápida y clara, incluso cuando estamos ocupados.",
        link: "Facebook · MAS Persianas",
        href: "https://www.facebook.com/MASpersianasbcs",
        logo: "/mas-persianas-logo.jpg",
      },
      {
        status: "Citas y atención más eficiente",
        name: "Lic. Sergio Santana",
        meta: "Abogado laboral · Despacho jurídico",
        story: "Albatros nos ayuda a atender cada consulta desde el primer contacto, recopilar los datos clave y organizar las citas sin dejar solicitudes pendientes. Así hemos aumentado nuestra capacidad de respuesta y ofrecemos una atención más ágil, ordenada y consistente.",
        link: "Página web por agregar",
        href: "",
        logo: "/sergio-santana-abogado-laboral.jpeg",
      },
    ],
    visitClient: "Abrir página",
    websitePending: "Sitio del cliente",
    finalTitle: "Tu próximo cliente ya está escribiendo.",
    finalBody: "Albatros puede responderle hoy.",
    try: "Probar a Albi",
    product: "Producto",
    resources: "Recursos",
    legal: "Legal",
    footerText: "Agentes de IA para convertir mensajes en oportunidades.",
    mobileMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  en: {
    nav: [["Product", "#producto"], ["How it works", "#como-funciona"], ["Plans", "#planes"], ["Questions", "#preguntas"]],
    login: "Log in",
    demo: "Book a demo",
    heroTitle: "Turn conversations into customers.",
    heroBody: "Albatros replies, qualifies leads, and books appointments on WhatsApp and Messenger, even when you are away.",
    how: "See how it works",
    channels: "Connected channels",
    inbox: "Shared inbox",
    all: "All",
    unread: "Unread",
    active: "AI active",
    online: "Online",
    type: "Write a message…",
    journeyTitle: "From first message to booked appointment, in one place.",
    journeyBody: "Albi understands intent, replies with your business information, and gets every opportunity ready to move forward.",
    stages: [
      ["Reply", "Uses your services, pricing, and opening hours."],
      ["Qualify", "Organizes each lead and alerts your team."],
      ["Book", "Confirms the time and creates the appointment."],
    ],
    connectedTitle: "One conversation. Your whole business connected.",
    connected: [
      ["Shared inbox", "Your team sees the same context and knows what comes next."],
      ["AI active 24/7", "Replies instantly with real information from your business."],
      ["Automatic follow-up", "Keeps every opportunity moving without chasing tasks."],
      ["Handoff to your team", "Transfers the conversation when a person is needed."],
    ],
    process: "Explore the process",
    plansTitle: "Choose how you want to start.",
    planIntro: "Start with one channel or connect service, booking, and follow-up.",
    currency: "Currency",
    includes: "Includes",
    choose: "Choose plan",
    month: "month",
    setup: "setup",
    recommended: "Recommended",
    faqTitle: "Before you start",
    faqIntro: "Straight answers to help you decide without fine print.",
    clientsEyebrow: "Client feedback",
    clientsTitle: "What our clients say.",
    clientsIntro: "Business owners share how Albatros helps them reply faster, organize appointments, and provide more consistent follow-up.",
    clients: [
      {
        status: "Automated sales and appointments",
        name: "Satélite Car Audio",
        meta: "Car audio · Satellite tracking",
        story: "With Albatros, we automated service and sales without losing a personal connection. AI agents guide customers through equipment, installation, repair, and tracking options, then book appointments for consistent follow-up.",
        link: "satelitecaraudio.wixsite.com",
        href: "https://satelitecaraudio.wixsite.com/misitio",
        logo: "/satelite-car-audio-logo.avif",
      },
      {
        status: "24/7 medical scheduling",
        name: "Vital Health Clinic",
        meta: "Specialty clinic · Medical services",
        story: "With Albatros, our patients can request information and book appointments through social media at any time. We reply faster and keep our schedule organized from the first message.",
        link: "Facebook · Vital Health Clinic",
        href: "https://www.facebook.com/vitalhealthlapazbcs",
        logo: "/vital-health-clinic-logo.jpg",
      },
      {
        status: "AI agent active",
        name: "MAS Persianas",
        meta: "Marcos Suarez Lopez · Owner",
        story: "Albatros transformed the way we serve customers. The AI agent answers questions on WhatsApp and Messenger quickly and clearly, even when we are busy.",
        link: "Facebook · MAS Persianas",
        href: "https://www.facebook.com/MASpersianasbcs",
        logo: "/mas-persianas-logo.jpg",
      },
      {
        status: "More efficient service and scheduling",
        name: "Sergio Santana, Esq.",
        meta: "Labor attorney · Law office",
        story: "Albatros helps us handle every inquiry from the first contact, collect key details, and organize appointments without leaving requests behind. We have increased our response capacity while providing faster, more organized, and consistent service.",
        link: "Website to be added",
        href: "",
        logo: "/sergio-santana-abogado-laboral.jpeg",
      },
    ],
    visitClient: "Open page",
    websitePending: "Client website",
    finalTitle: "Your next customer is already messaging.",
    finalBody: "Albatros can answer today.",
    try: "Try Albi",
    product: "Product",
    resources: "Resources",
    legal: "Legal",
    footerText: "AI agents that turn messages into opportunities.",
    mobileMenu: "Open menu",
    closeMenu: "Close menu",
  },
} as const;

const conversationByChannel: Record<Channel, { person: string; initial: string; reply: string }> = {
  WhatsApp: {
    person: "María Castillo",
    initial: "Hola, ¿tienen disponibilidad este sábado?",
    reply: "Sí, tenemos horarios disponibles. ¿Te gustaría agendar una cita?",
  },
  Messenger: {
    person: "Jorge Pérez",
    initial: "¿Cuál plan me recomiendan para mi negocio?",
    reply: "Puedo ayudarte. ¿Cuántas personas atienden tus mensajes hoy?",
  },
  Instagram: {
    person: "Ana Domínguez",
    initial: "Vi sus servicios. ¿Me comparten precios?",
    reply: "Claro. Te muestro las opciones que mejor se ajustan a lo que necesitas.",
  },
};

function BrandMark() {
  return (
    <svg className="fusion-mark" viewBox="0 0 48 32" aria-hidden="true">
      <path d="M2 18.5C14.8 6.4 28.4 4.3 46 4c-9 4.4-15.3 8.3-20.2 13C16.7 14.1 9.6 15.1 2 18.5Z" />
      <path d="M8 27c8.5-6.4 17.8-8.5 31.3-7.8-7.1 1.8-12.7 4.5-17 8.2C17.3 25.3 12.7 25.2 8 27Z" opacity=".58" />
    </svg>
  );
}

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5" /></svg>;
}

function ChannelIcon({ channel }: { channel: Channel }) {
  if (channel === "WhatsApp") return <span className="fusion-channel-icon fusion-channel-whatsapp">W</span>;
  if (channel === "Messenger") return <span className="fusion-channel-icon fusion-channel-messenger">M</span>;
  return <span className="fusion-channel-icon fusion-channel-instagram">I</span>;
}

function ProductDemo({ activeChannel, setActiveChannel, lang }: { activeChannel: Channel; setActiveChannel: (channel: Channel) => void; lang: Language }) {
  const c = copy[lang];
  const conversation = conversationByChannel[activeChannel];
  return (
    <div className="fusion-product-demo" aria-label={lang === "es" ? "Demostración de la bandeja de Albatros" : "Albatros inbox demonstration"}>
      <aside className="fusion-demo-rail" aria-hidden="true"><BrandMark /><i /><i /><i /></aside>
      <div className="fusion-demo-list">
        <header><strong>{c.inbox}</strong><button type="button" aria-label={lang === "es" ? "Filtrar conversaciones" : "Filter conversations"}>⌁</button></header>
        <div className="fusion-demo-filters"><span>{c.all}</span><span>{c.unread}</span></div>
        {channels.map((channel, index) => (
          <button className={activeChannel === channel ? "is-active" : ""} type="button" onClick={() => setActiveChannel(channel)} key={channel}>
            <ChannelIcon channel={channel} />
            <span><strong>{["María Castillo", "Jorge Pérez", "Ana Domínguez"][index]}</strong><small>{channel}</small></span>
            <time>{["10:42", "10:28", "09:58"][index]}</time>
          </button>
        ))}
        <footer><i />{c.online}</footer>
      </div>
      <div className="fusion-demo-chat">
        <header>
          <span className="fusion-avatar">{conversation.person.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
          <span><strong>{conversation.person}</strong><small>{activeChannel} · <i /> {c.active}</small></span>
          <b>•••</b>
        </header>
        <div className="fusion-chat-body">
          <p className="fusion-message fusion-message-user">{conversation.initial}<time>10:42</time></p>
          <p className="fusion-message fusion-message-albi"><strong>Albi</strong>{conversation.reply}<time>10:43 ✓✓</time></p>
          <p className="fusion-message fusion-message-user">Sí, por favor.<time>10:44</time></p>
          <div className="fusion-appointment"><span>✓</span><div><strong>{lang === "es" ? "Cita confirmada" : "Appointment confirmed"}</strong><small>{lang === "es" ? "Sábado · 11:00" : "Saturday · 11:00 AM"}</small></div></div>
        </div>
        <footer><span>{c.type}</span><button type="button" aria-label={lang === "es" ? "Enviar mensaje" : "Send message"}>➜</button></footer>
      </div>
    </div>
  );
}

export function FusionLanding() {
  const [lang, setLang] = useState<Language>("es");
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [activeChannel, setActiveChannel] = useState<Channel>("WhatsApp");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeClient, setActiveClient] = useState(0);
  const clientsTrackRef = useRef<HTMLDivElement>(null);
  const c = copy[lang];
  const t = translations[lang];
  const prices = PRICING_BY_CURRENCY[currency];
  const whatsapp = WA_LINKS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const moveClients = (direction: -1 | 1) => {
    const track = clientsTrackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const visibleCards = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    const lastStart = Math.max(0, c.clients.length - visibleCards);
    const nextClient = Math.min(lastStart, Math.max(0, activeClient + direction));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollTo({ left: nextClient * step, behavior: reducedMotion ? "auto" : "smooth" });
    setActiveClient(nextClient);
  };

  const syncActiveClient = () => {
    const track = clientsTrackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const nextClient = Math.round(track.scrollLeft / step);
    setActiveClient((current) => current === nextClient ? current : nextClient);
  };

  return (
    <div className="fusion-page">
      <header className="fusion-nav-shell">
        <div className="fusion-nav">
          <a href="#inicio" className="fusion-brand" aria-label="Albatros IA"><BrandMark /><span>ALBATROS IA</span></a>
          <nav aria-label={lang === "es" ? "Navegación principal" : "Primary navigation"}>
            {c.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="fusion-nav-actions">
            <a className="fusion-login" href="/login">{c.login}</a>
            <button className="fusion-lang" type="button" onClick={() => setLang((current) => current === "es" ? "en" : "es")} aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}>{lang === "es" ? "EN" : "ES"}</button>
            <a className="fusion-button fusion-button-orange fusion-nav-cta" href={whatsapp.general} target="_blank" rel="noreferrer">{c.demo}</a>
            <button className="fusion-menu-button" type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-label={menuOpen ? c.closeMenu : c.mobileMenu}><span /><span /></button>
          </div>
        </div>
        {menuOpen ? <nav className="fusion-mobile-menu" aria-label={lang === "es" ? "Menú móvil" : "Mobile menu"}>{c.nav.map(([label, href]) => <a href={href} onClick={() => setMenuOpen(false)} key={href}>{label}</a>)}<a href="/login">{c.login}</a><a href={whatsapp.general} target="_blank" rel="noreferrer">{c.demo}</a></nav> : null}
      </header>

      <main>
        <section id="inicio" className="fusion-hero fusion-anchor">
          <div className="fusion-hero-copy">
            <h1>{c.heroTitle}</h1>
            <p>{c.heroBody}</p>
            <div className="fusion-actions">
              <a className="fusion-button fusion-button-orange" href={whatsapp.general} target="_blank" rel="noreferrer">{c.demo}<Arrow /></a>
              <a className="fusion-button fusion-button-ghost" href="#como-funciona">{c.how}<Arrow /></a>
            </div>
            <div className="fusion-channel-line"><span>{c.channels}</span>{channels.map((channel) => <button type="button" className={activeChannel === channel ? "is-active" : ""} onClick={() => setActiveChannel(channel)} key={channel}><ChannelIcon channel={channel} />{channel}</button>)}</div>
          </div>
          <ProductDemo activeChannel={activeChannel} setActiveChannel={setActiveChannel} lang={lang} />
        </section>

        <section id="como-funciona" className="fusion-journey fusion-anchor">
          <div className="fusion-section-heading"><h2>{c.journeyTitle}</h2><p>{c.journeyBody}</p></div>
          <div className="fusion-route">
            {c.stages.map(([title, description], index) => <article key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
          </div>
          <div id="producto" className="fusion-product-stage fusion-anchor">
            <ProductDemo activeChannel={activeChannel} setActiveChannel={setActiveChannel} lang={lang} />
          </div>
        </section>

        <section className="fusion-connected">
          <div className="fusion-connected-intro"><h2>{c.connectedTitle}</h2><a className="fusion-button fusion-button-orange" href="#planes">{c.process}<Arrow /></a></div>
          <div className="fusion-capability-list">
            {c.connected.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </section>

        <section id="planes" className="fusion-pricing fusion-anchor">
          <div className="fusion-pricing-heading"><div><h2>{c.plansTitle}</h2><p>{c.planIntro}</p></div><label><span>{c.currency}</span><select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>{CURRENCIES.map(({ code }) => <option value={code} key={code}>{code}</option>)}</select></label></div>
          <div className="fusion-plan-table">
            {planKeys.map((key, index) => {
              const plan = t.precios.paquetes[index];
              const price = prices.paquetes[key];
              return <article className={plan.featured ? "is-featured" : ""} key={key}>
                <header>{plan.featured ? <small>{c.recommended}</small> : <small aria-hidden="true">&nbsp;</small>}<h3>{plan.name}</h3><p><strong>{price.monthly}</strong><span>{prices.suffix} / {c.month}</span></p></header>
                <div className="fusion-plan-features"><span>{c.includes}</span><ul>{plan.features.filter(({ included }) => included).slice(0, 6).map(({ label }) => <li key={label}>✓ {label}</li>)}</ul></div>
                <footer><span>+ {price.setup} {prices.suffix} {c.setup}</span><a className={plan.featured ? "fusion-button fusion-button-orange" : "fusion-button fusion-button-outline"} href={whatsapp[key]} target="_blank" rel="noreferrer">{c.choose}<Arrow /></a></footer>
              </article>;
            })}
          </div>
        </section>

        <section id="preguntas" className="fusion-faq fusion-anchor">
          <div><h2>{c.faqTitle}</h2><p>{c.faqIntro}</p></div>
          <div className="fusion-faq-list">{t.faq.items.slice(0, 6).map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
        </section>

        <section id="clientes" className="fusion-clients fusion-anchor">
          <header className="fusion-clients-heading">
            <div><p>{c.clientsEyebrow}</p><h2>{c.clientsTitle}</h2><p>{c.clientsIntro}</p></div>
            <div className="fusion-client-controls">
              <span aria-live="polite">{String(activeClient + 1).padStart(2, "0")} / {String(c.clients.length).padStart(2, "0")}</span>
              <button className="is-previous" type="button" onClick={() => moveClients(-1)} aria-label={lang === "es" ? "Ver opinión anterior" : "View previous review"}><Arrow /></button>
              <button type="button" onClick={() => moveClients(1)} aria-label={lang === "es" ? "Ver siguiente opinión" : "View next review"}><Arrow /></button>
            </div>
          </header>
          <div className="fusion-client-ledger" ref={clientsTrackRef} onScroll={syncActiveClient} role="region" aria-label={c.clientsTitle} tabIndex={0}>
            {c.clients.map((client, index) => (
              <article className="fusion-client-story" key={client.name}>
                <div className="fusion-client-identity">
                  <span className="fusion-client-number">0{index + 1}</span>
                  <div className="fusion-client-logo">
                    <Image src={client.logo} alt="" fill sizes="(max-width: 520px) 68px, 88px" />
                  </div>
                  <div><h3>{client.name}</h3><p>{client.meta}</p></div>
                </div>
                <div className="fusion-client-result"><span>{client.status}</span><blockquote>{client.story}</blockquote></div>
                {client.href ? (
                  <a className="fusion-client-link" href={client.href} target="_blank" rel="noopener noreferrer"><span>{c.visitClient}<small>{client.link}</small></span><Arrow /></a>
                ) : (
                  <div className="fusion-client-link is-pending"><span>{c.websitePending}<small>{client.link}</small></span></div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="fusion-final">
          <BrandMark /><div><h2>{c.finalTitle}</h2><p>{c.finalBody}</p></div><a className="fusion-button fusion-button-orange" href={whatsapp.general} target="_blank" rel="noreferrer">{c.try}<Arrow /></a>
        </section>
      </main>

      <footer className="fusion-footer">
        <div className="fusion-footer-brand"><a href="#inicio" className="fusion-brand"><BrandMark /><span>ALBATROS IA</span></a><p>{c.footerText}</p></div>
        <div><strong>{c.product}</strong><a href="#producto">{c.nav[0][0]}</a><a href="#como-funciona">{c.nav[1][0]}</a><a href="#planes">{c.nav[2][0]}</a></div>
        <div><strong>{c.resources}</strong><a href="#preguntas">{c.nav[3][0]}</a><a href="mailto:hola@albatrosia.com">hola@albatrosia.com</a><a href="/login">{c.login}</a></div>
        <div><strong>{c.legal}</strong><a href="/privacy-policy">{t.footer.privacy}</a><a href="/terms">{t.footer.terms}</a><a href="/data-deletion">{t.footer.dataDeletion}</a></div>
        <p className="fusion-copyright">{t.footer.bottomLeft}</p>
      </footer>
    </div>
  );
}
