"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Language, translations, WA_LINKS, Currency, CURRENCIES, PRICING_BY_CURRENCY } from "@/lib/translations";

// ─── Contexto de Idioma ───────────────────────────────────────────────────────
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.es;
  wa: typeof WA_LINKS.es;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
} | null>(null);

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}

// ─── Scroll animation hook ────────────────────────────────────────────────────
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");

    // First, mark elements as ready (hides them)
    els.forEach((el) => el.classList.add("fade-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Albatros SVG ─────────────────────────────────────────────────────────────
function AlbatosSVG() {
  return (
    <svg
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto opacity-60"
      aria-hidden="true"
    >
      {/* Cuerpo */}
      <path
        d="M200 110 C180 100 160 95 130 100 C100 105 70 115 40 125"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ala izquierda superior */}
      <path
        d="M200 110 C210 90 240 70 280 55 C320 40 360 38 390 42"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ala izquierda inferior */}
      <path
        d="M200 110 C215 115 250 118 290 112 C330 106 365 95 390 85"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Ala derecha superior */}
      <path
        d="M200 110 C185 90 155 72 120 60 C85 48 50 46 20 50"
        stroke="#0a0a0a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ala derecha inferior */}
      <path
        d="M200 110 C180 118 148 122 112 116 C76 110 45 98 20 88"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Cola */}
      <path
        d="M130 100 C120 108 112 115 108 125 M130 100 C122 110 118 120 120 132"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Cabeza y pico */}
      <circle cx="128" cy="97" r="7" stroke="#0a0a0a" strokeWidth="1.2" />
      <path
        d="M122 96 L108 93"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── WhatsApp icon ────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ConversationPreview({
  isEnglish,
  variant,
}: {
  isEnglish: boolean;
  variant: number;
}) {
  const conversations = isEnglish
    ? [
        { business: "Albatros · WhatsApp", status: "AI active · 24/7", incoming: "Hi, do you have availability this afternoon?", outgoing: "Yes. I can help you choose the best option. What time works for you?", followUp: "4:30 PM, please.", confirmation: "Lead registered and notified" },
        { business: "Magnolia Spa · Instagram", status: "Albatros active · 24/7", incoming: "Hi, can I book a facial for tomorrow?", outgoing: "Of course. I have availability at 4:30 and 6:00. Which time do you prefer?", followUp: "6 PM, please.", confirmation: "Appointment created in Google Calendar" },
        { business: "Unified inbox · Albatros", status: "Albatros active · 24/7", incoming: "Hi, do you have availability this afternoon?", outgoing: "Yes. I have availability at 4:30 and 6:00. Which time do you prefer?", followUp: "6 PM, please.", confirmation: "Appointment created in Google Calendar" },
      ]
    : [
        { business: "Albatros · WhatsApp", status: "IA activa · 24/7", incoming: "Hola, ¿tienen disponibilidad esta tarde?", outgoing: "Sí. Puedo ayudarte a elegir la mejor opción. ¿Qué horario prefieres?", followUp: "A las 4:30, por favor.", confirmation: "Prospecto registrado y notificado" },
        { business: "Spa Magnolia · Instagram", status: "Albatros activo · 24/7", incoming: "Hola, ¿tienen limpieza dental mañana por la tarde?", outgoing: "Sí. Tengo disponibilidad a las 4:30 y 6:00. ¿Cuál horario prefieres?", followUp: "A las 6, por favor.", confirmation: "Cita creada en Google Calendar" },
        { business: "Bandeja unificada · Albatros", status: "Albatros activo · 24/7", incoming: "Hola, ¿tienen limpieza dental mañana por la tarde?", outgoing: "Sí. Tengo disponibilidad a las 4:30 y 6:00. ¿Cuál horario prefieres?", followUp: "A las 6, por favor.", confirmation: "Cita creada en Google Calendar" },
      ];
  const copy = conversations[variant];

  return (
    <div className="conversation-preview" aria-label={copy.business}>
      <div className="conversation-header">
        <span>{copy.business}</span>
        <small>{copy.status}</small>
      </div>
      <div className="conversation-thread">
        <p className="chat-bubble chat-incoming">{copy.incoming}</p>
        <p className="chat-bubble chat-outgoing">{copy.outgoing}</p>
        <p className="chat-bubble chat-incoming chat-short">{copy.followUp}</p>
      </div>
      <div className="conversation-success">
        <span>✓</span>
        {copy.confirmation}
        <b>{isEnglish ? "now" : "ahora"}</b>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const { t, wa, lang, setLang } = useLanguage();

  useEffect(() => {
    const handler = () => {
      if (navRef.current) {
        if (window.scrollY > 10) {
          navRef.current.classList.add("border-b", "border-zinc-200");
        } else {
          navRef.current.classList.remove("border-b", "border-zinc-200");
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      ref={navRef}
      className="aurora-nav fixed top-0 left-0 right-0 z-50 transition-all duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="brand-lockup flex items-center gap-2">
          <Image src="/albatros-monogram.png" alt="" width={32} height={32} className="brand-monogram" />
          <span className="font-display text-lg font-semibold tracking-[0.08em] text-zinc-900">
            ALBATROS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
          <a href="#servicios" className="hover:text-zinc-900 transition-colors">
            {t.nav.services}
          </a>
          <a href="#precios" className="hover:text-zinc-900 transition-colors">
            {t.nav.pricing}
          </a>
          <a href="#faq" className="hover:text-zinc-900 transition-colors">
            {t.nav.faq}
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Selector de idioma premium de un solo botón */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-mono border border-zinc-200 px-2.5 py-1 rounded-full hover:bg-zinc-50 transition-colors font-medium text-zinc-600 hover:text-zinc-900"
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            {lang === "es" ? "EN 🇺🇸" : "ES 🇪🇸"}
          </button>

          <a
            href={wa.general}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-900 text-white text-sm px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <WhatsAppIcon size={16} />
            {t.nav.talkToAlbi}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { t, wa, lang } = useLanguage();
  const isEnglish = lang === "en";
  const slides = isEnglish
    ? [
        { label: "01 · Clear signal", kicker: t.hero.kicker, title1: t.hero.title1, title2: t.hero.title2, description: t.hero.description, primary: t.hero.viewPackages, accent: "blue" },
        { label: "02 · Human receptionist", kicker: "YOUR BUSINESS, ALWAYS WELL ATTENDED", title1: "A receptionist", title2: "who never keeps people waiting.", description: "While you take care of your customers, Albatros replies to messages, resolves questions, and fills your schedule in your business's voice.", primary: "See how it would serve my business", accent: "green" },
        { label: "03 · Control center", kicker: "WHATSAPP · INSTAGRAM · MESSENGER · CALENDAR", title1: "Every conversation,", title2: "under control.", description: "Centralize your channels, activate AI agents, and turn conversations into measurable opportunities from one platform.", primary: "Request a demo", accent: "orange" },
      ]
    : [
        { label: "01 · Señal clara", kicker: t.hero.kicker, title1: t.hero.title1, title2: t.hero.title2, description: t.hero.description, primary: t.hero.viewPackages, accent: "blue" },
        { label: "02 · Recepcionista humana", kicker: "TU NEGOCIO SIEMPRE BIEN ATENDIDO", title1: "Una recepcionista que", title2: "nunca deja esperando.", description: "Mientras tú atiendes a tus clientes, Albatros contesta mensajes, resuelve dudas y llena tu agenda con el tono de tu negocio.", primary: "Ver cómo atendería mi negocio", accent: "green" },
        { label: "03 · Centro de control", kicker: "WHATSAPP · INSTAGRAM · MESSENGER · CALENDAR", title1: "Cada conversación,", title2: "bajo control.", description: "Centraliza tus canales, activa agentes de IA y convierte conversaciones en oportunidades medibles desde una sola plataforma.", primary: "Solicitar una demo", accent: "orange" },
      ];
  return (
    <section
      id="hero"
      className="signal-hero min-h-screen flex flex-col justify-center pt-16 px-6 relative isolate overflow-hidden"
    >
      <span id="signal-slide-1" className="signal-carousel-target" aria-hidden="true" />
      <span id="signal-slide-2" className="signal-carousel-target" aria-hidden="true" />
      <span id="signal-slide-3" className="signal-carousel-target" aria-hidden="true" />
      <div className="signal-tabs max-w-6xl mx-auto w-full" role="tablist" aria-label={isEnglish ? "Albatros highlights" : "Características de Albatros"}>
        {slides.map((item, index) => (
          <a
            key={item.label}
            role="tab"
            aria-label={item.label}
            href={`#signal-slide-${index + 1}`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="signal-shell max-w-6xl mx-auto w-full relative z-10">
        <div className="signal-carousel-viewport">
          <div className="signal-carousel-track">
          {slides.map((slide, index) => (
          <div className={`signal-carousel-panel signal-content signal-slide-${index} signal-accent-${slide.accent} grid md:grid-cols-2 gap-10 lg:gap-16 items-center`} key={slide.label}>
          <div className="signal-copy relative z-10">
          <p className="signal-kicker font-mono-custom text-xs mb-6 tracking-widest uppercase">
            {slide.kicker}
          </p>
          <h1 className="signal-title font-sans text-4xl md:text-6xl font-semibold leading-[1.03] mb-6">
            {slide.title1}
            <br />
            <span>{slide.title2}</span>
          </h1>
          <p className="signal-description text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {slide.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#precios"
              className="cta-primary px-6 py-3 rounded-full text-sm font-medium"
            >
              {slide.primary}
            </a>
            <a
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            >
              <WhatsAppIcon size={16} />
              {t.hero.talkToAlbi}
            </a>
          </div>
          <div className="signal-checks" aria-label="Beneficios principales">
            {t.hero.pillars.map((pillar, index) => (
              <span key={pillar}>
                <b>✓</b>
                {pillar}
              </span>
            ))}
          </div>
        </div>
        <div className="signal-demo flex items-center justify-center">
          <ConversationPreview isEnglish={isEnglish} variant={index} />
        </div>
        <ul className="signal-promises" aria-label="Cómo funciona Albatros">
          <li>{lang === "en" ? "Answer real questions, not generic replies." : "Responde preguntas reales, no respuestas genéricas."}</li>
          <li>{lang === "en" ? "Capture leads and notify your team automatically." : "Captura prospectos y notifica a tu equipo automáticamente."}</li>
          <li>{lang === "en" ? "Your team takes over when human judgment is needed." : "Tu equipo entra cuando se necesita criterio humano."}</li>
        </ul>
        </div>
        ))}
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── Problema ─────────────────────────────────────────────────────────────────
function Problema() {
  const { t } = useLanguage();

  return (
    <section className="aurora-problem py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-16 fade-in">
          {t.problema.title1}
          <br />
          {t.problema.title2}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {t.problema.puntos.map((p) => (
            <div
              key={p.num}
              className="premium-card fade-in relative p-8 rounded-2xl overflow-hidden"
            >
              <span className="absolute top-4 right-4 font-mono-custom text-6xl font-bold text-zinc-100 select-none leading-none">
                {p.num}
              </span>
              <h3 className="font-display text-xl font-semibold text-zinc-900 mb-3 relative z-10">
                {p.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Servicios ────────────────────────────────────────────────────────────────
function Servicios() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="aurora-services py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          {t.servicios.title1}
        </h2>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-400 mb-16 fade-in">
          {t.servicios.title2}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {t.servicios.puntos.map((s) => (
            <div key={s.num} className="premium-card service-card fade-in relative p-8 rounded-2xl">
              <span className="absolute top-4 right-4 font-mono-custom text-6xl font-bold text-zinc-100 select-none leading-none">
                {s.num}
              </span>
              <h3 className="font-display text-xl font-semibold text-zinc-900 mb-6 relative z-10">
                {s.title}
              </h3>
              <ul className="space-y-2 relative z-10 list-none p-0 m-0">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-500">
                    <span className="text-zinc-300 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Precios ──────────────────────────────────────────────────────────────────
function Precios() {
  const { t, wa } = useLanguage();

  const pkgKeyByIdx = ["whatsappIA", "multicanalIA", "negocioAutonomoIA"] as const;
  const pkgWaByIdx = [wa.whatsappIA, wa.multicanalIA, wa.negocioAutonomoIA];

  const addonKeyByIdx = ["agendaInteligente", "sitioWebProfesional"] as const;
  const addonWaByIdx = [wa.agendaInteligente, wa.sitioWebProfesional];

  const currency: Currency = "MXN";
  const suffix = PRICING_BY_CURRENCY[currency].suffix;

  return (
    <section id="precios" className="aurora-pricing py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-3 fade-in">
          {t.precios.title}
        </h2>
        <p className="text-zinc-500 mb-16 fade-in">
          {t.precios.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {t.precios.paquetes.map((p, idx) => {
            const pkgKey = pkgKeyByIdx[idx];
            const priceInfo = PRICING_BY_CURRENCY[currency].paquetes[pkgKey];

            return (
              <div
                key={p.name}
                className={`premium-card pricing-card fade-in relative rounded-2xl p-8 flex flex-col ${
                  p.featured
                    ? "featured-card"
                    : ""
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 featured-badge text-xs font-mono-custom px-3 py-1 rounded-full whitespace-nowrap">
                    {t.precios.recommended}
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-zinc-900 mb-1">
                  {p.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-semibold text-zinc-900">
                    {priceInfo.monthly} {suffix}
                  </span>
                  <span className="text-zinc-400 text-sm ml-1">/ {t.precios.monthly}</span>
                  <div className="text-zinc-500 text-sm mt-1">
                    + {priceInfo.setup} {suffix} {t.precios.setup}
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-sm">
                      <span className={f.included ? "text-zinc-900" : "text-zinc-300"}>
                        {f.included ? "✓" : "—"}
                      </span>
                      <span className={f.included ? "text-zinc-600" : "text-zinc-300"}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={pkgWaByIdx[idx]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-colors ${
                    p.featured
                      ? "cta-primary text-white"
                      : "cta-outline"
                  }`}
                >
                  <WhatsAppIcon size={16} />
                  {t.precios.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-2xl mt-12 fade-in">
          {t.precios.bottomNote}
        </p>

        <div className="mt-20">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-zinc-900 mb-2 fade-in">
            {t.precios.addonsTitle}
          </h3>
          <p className="text-zinc-500 mb-10 fade-in">
            {t.precios.addonsSubtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-6 stagger">
            {t.precios.addons.map((a, idx) => {
              const addonKey = addonKeyByIdx[idx];
              const priceInfo = PRICING_BY_CURRENCY[currency].addons[addonKey];

              return (
                <div
                  key={a.name}
                  className="premium-card fade-in relative rounded-2xl p-8 flex flex-col"
                >
                  <h4 className="font-display text-lg font-semibold text-zinc-900 mb-1">
                    {a.name}
                  </h4>
                  <div className="mb-6">
                    {priceInfo.setup ? (
                      <>
                        <span className="text-2xl font-semibold text-zinc-900">
                          {priceInfo.setup} {suffix}
                        </span>
                        <span className="text-zinc-400 text-sm ml-1">{t.precios.setup}</span>
                        <div className="text-zinc-500 text-sm mt-1">
                          + {priceInfo.monthly} {suffix} / {t.precios.monthly}
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-semibold text-zinc-900">
                          {priceInfo.monthly} {suffix}
                        </span>
                        <span className="text-zinc-400 text-sm ml-1">/ {t.precios.monthly}</span>
                      </>
                    )}
                  </div>

                  <ul className="space-y-2 mb-8 flex-1">
                    {a.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                        <span className="text-zinc-900">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={addonWaByIdx[idx]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium border border-zinc-200 text-zinc-700 hover:border-zinc-400 transition-colors"
                  >
                    <WhatsAppIcon size={16} />
                    {t.precios.addonsCta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-mono-custom mt-12 fade-in">
          {t.precios.note.replace("USD", currency)}
        </p>
      </div>
    </section>
  );
}

// ─── Demo Albi ────────────────────────────────────────────────────────────────
function DemoAlbi() {
  const { t, wa } = useLanguage();

  return (
    <section className="aurora-demo py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          {t.demoAlbi.title1}
          <br />
          {t.demoAlbi.title2}
        </h2>
        <p className="text-zinc-500 text-lg mb-10 fade-in">
          {t.demoAlbi.desc}
        </p>
        <a
          href={wa.general}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary fade-in inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium"
        >
          <WhatsAppIcon size={20} />
          {t.demoAlbi.btn}
        </a>
        <p className="font-mono-custom text-xs text-zinc-400 mt-4 fade-in">
          {t.demoAlbi.footer}
        </p>
      </div>
    </section>
  );
}

// ─── Sobre nosotros ───────────────────────────────────────────────────────────
function Sobre() {
  const { t } = useLanguage();

  return (
    <section className="aurora-about py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 fade-in">
          {t.sobre.title1}
          <br />
          {t.sobre.title2}
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mb-16 leading-relaxed fade-in">
          {t.sobre.desc}
        </p>
        <div className="grid grid-cols-2 gap-6 stagger">
          {t.sobre.stats.map((s) => (
            <div key={s.label} className="stat-card fade-in rounded-2xl p-6">
              <div className="font-display text-2xl font-semibold text-white mb-2">
                {s.num}
              </div>
              <div className="text-zinc-500 text-sm leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="aurora-faq py-24 px-6 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-16 fade-in">
          {t.faq.title}
        </h2>
        <Accordion className="fade-in">
          {t.faq.items.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
              <AccordionTrigger className="text-left font-medium text-zinc-900 hover:text-zinc-600">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-500 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ─── CTA Final ────────────────────────────────────────────────────────────────
function CTAFinal() {
  const { t, wa } = useLanguage();

  return (
    <section className="aurora-final py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          {t.ctaFinal.title1}
          <br />
          {t.ctaFinal.title2}
          <br />
          {t.ctaFinal.title3}
        </h2>
        <p className="text-zinc-500 mb-10 fade-in">
          {t.ctaFinal.desc}
        </p>
        <a
          href={wa.general}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary fade-in inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium"
        >
          <WhatsAppIcon size={20} />
          {t.ctaFinal.btn}
        </a>
        <p className="font-mono-custom text-xs text-zinc-400 mt-4 fade-in">
          {t.ctaFinal.footer}
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t, wa } = useLanguage();

  return (
    <footer className="aurora-footer py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="brand-lockup flex items-center gap-2 mb-3">
              <Image src="/albatros-monogram.png" alt="" width={30} height={30} className="brand-monogram" />
              <span className="font-display text-base font-semibold tracking-[0.08em] text-zinc-900">
                ALBATROS
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Menú */}
          <div>
            <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">
              {t.footer.menu}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <a href="#servicios" className="hover:text-zinc-900 transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-zinc-900 transition-colors">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-zinc-900 transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-zinc-900 transition-colors">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">
              {t.footer.legal}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <a href="/privacy-policy" className="hover:text-zinc-900 transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="/google-api-disclosure" className="hover:text-zinc-900 transition-colors">
                  {t.footer.googleApiDisclosure}
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-zinc-900 transition-colors">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="/data-deletion" className="hover:text-zinc-900 transition-colors">
                  {t.footer.dataDeletion}
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-mono-custom text-xs text-zinc-400 uppercase tracking-widest mb-4">
              {t.footer.contact}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <a
                  href={wa.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@albatrosia.com"
                  className="hover:text-zinc-900 transition-colors"
                >
                  hola@albatrosia.com
                </a>
              </li>
              <li className="text-zinc-400 text-xs pt-1">{t.footer.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-mono-custom text-xs text-zinc-400">
            {t.footer.bottomLeft}
          </p>
          <p className="font-mono-custom text-xs text-zinc-300">
            {t.footer.bottomRight}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Botón flotante WhatsApp (mobile) ─────────────────────────────────────────
function FloatingWA() {
  const { wa } = useLanguage();

  return (
    <a
      href={wa.general}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp md:hidden fixed bottom-6 right-6 z-50 text-white w-14 h-14 rounded-full flex items-center justify-center"
      aria-label="Hablar con Albi por WhatsApp"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useFadeIn();
  const [lang, setLang] = useState<Language>("es");
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    // 1. Detectar e inicializar idioma
    const savedLang = localStorage.getItem("albi-lang") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language || (navigator as any).userLanguage || "es";
      if (browserLang.startsWith("en")) {
        setLang("en");
      } else {
        setLang("es");
      }
    }

    // 2. Detectar e inicializar moneda
    const savedCurrency = localStorage.getItem("albi-detected-currency") as Currency;
    if (savedCurrency === "USD" || savedCurrency === "MXN" || savedCurrency === "CLP" || savedCurrency === "COP") {
      setCurrency(savedCurrency);
      return;
    }

    // Fallback rápido por locale del navegador antes de geolocalizar por IP
    const browserLangGeo = navigator.language || (navigator as any).userLanguage || "es";
    let initialCurrency: Currency = "USD";
    if (browserLangGeo.toLowerCase().includes("-mx")) {
      initialCurrency = "MXN";
    } else if (browserLangGeo.toLowerCase().includes("-cl")) {
      initialCurrency = "CLP";
    } else if (browserLangGeo.toLowerCase().includes("-co")) {
      initialCurrency = "COP";
    }
    setCurrency(initialCurrency);

    // Geolocalización precisa por IP
    const detectIPCurrency = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const data = await res.json();
          const country = data.country_code; // ej. MX, CL, CO
          let detectedCurrency: Currency = "USD";
          if (country === "MX") {
            detectedCurrency = "MXN";
          } else if (country === "CL") {
            detectedCurrency = "CLP";
          } else if (country === "CO") {
            detectedCurrency = "COP";
          }
          setCurrency(detectedCurrency);
          localStorage.setItem("albi-detected-currency", detectedCurrency);
        }
      } catch (err) {
        console.warn("Geolocalización por IP fallida, usando fallback de locale:", err);
      }
    };
    detectIPCurrency();
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("albi-lang", newLang);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem("albi-detected-currency", newCurrency);
  };

  const t = translations[lang];
  const wa = WA_LINKS[lang];

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: handleLanguageChange,
        t,
        wa,
        currency,
        setCurrency: handleCurrencyChange,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Albatros Dev",
            url: "https://www.albatrosia.com",
            logo: "https://www.albatrosia.com/albatros.png",
            description:
              "Sitios web, optimización de presencia en Google y automatización de atención al cliente con IA.",
            email: "hola@albatrosia.com",
            areaServed: "Worldwide",
            knowsAbout: [
              "Diseño web",
              "SEO local",
              "Google Business Profile",
              "Automatización con IA",
              "Chatbots para WhatsApp",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main className="signal-page">
        <Hero />
        <Problema />
        <Servicios />
        <Precios />
        <DemoAlbi />
        <Sobre />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWA />
    </LanguageContext.Provider>
  );
}
