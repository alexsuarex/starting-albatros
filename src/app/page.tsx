"use client";

import { useCallback, useEffect, useRef, useState, createContext, useContext } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Language, translations, WA_LINKS, Currency, PRICING_BY_CURRENCY } from "@/lib/translations";

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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const els = document.querySelectorAll(".fade-in");
    const sections = document.querySelectorAll(".signal-page > section:not(#hero)");

    els.forEach((el) => el.classList.add("fade-ready"));
    sections.forEach((section) => section.classList.add("section-reveal-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(
              e.target.classList.contains("section-reveal-ready") ? "section-visible" : "visible",
            );
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
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
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="brand-lockup flex items-center gap-2 whitespace-nowrap">
          <Image src="/albatros-monogram.png" alt="" width={32} height={32} className="brand-monogram" />
          <span className="font-display text-base sm:text-lg font-semibold tracking-[0.08em] text-zinc-900">
            ALBATROS IA
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

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Selector de idioma premium de un solo botón */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-mono border border-zinc-200 px-2 sm:px-2.5 py-1 rounded-full hover:bg-zinc-50 transition-colors font-medium text-zinc-600 hover:text-zinc-900"
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            {lang === "es" ? "EN 🇺🇸" : "ES 🇪🇸"}
          </button>

          <a
            href={wa.general}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors whitespace-nowrap"
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
const HERO_SLIDE_INTERVAL_MS = 6000;

function Hero() {
  const { t, wa, lang } = useLanguage();
  const isEnglish = lang === "en";
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselTimerRef = useRef<number | null>(null);
  const slides = isEnglish
    ? [
        { label: "Always available", kicker: t.hero.kicker, title1: t.hero.title1, title2: t.hero.title2, description: t.hero.description, primary: t.hero.talkToAlbi, accent: "blue" },
        { label: "Personal service", kicker: "CUSTOMER SERVICE THAT SOUNDS LIKE YOUR BUSINESS", title1: "Answer every message", title2: "as if you were there.", description: "Albatros answers common questions with your information, gathers customer details, and brings your team in when human judgment is needed.", primary: "Try the AI experience", accent: "green" },
        { label: "Connected journey", kicker: "WHATSAPP · INSTAGRAM · MESSENGER · CALENDAR", title1: "From the first question", title2: "to the confirmed booking.", description: "Connect your channels, organize each lead, and let Albatros schedule the next step without making your customer wait.", primary: "Request a demonstration", accent: "orange" },
      ]
    : [
        { label: "Siempre disponible", kicker: t.hero.kicker, title1: t.hero.title1, title2: t.hero.title2, description: t.hero.description, primary: t.hero.talkToAlbi, accent: "blue" },
        { label: "Atención personal", kicker: "UNA ATENCIÓN QUE SUENA COMO TU NEGOCIO", title1: "Responde cada mensaje", title2: "como si estuvieras ahí.", description: "Albatros contesta preguntas frecuentes con tu información, reúne los datos del cliente y avisa a tu equipo cuando se necesita criterio humano.", primary: "Probar la atención con IA", accent: "green" },
        { label: "Recorrido conectado", kicker: "WHATSAPP · INSTAGRAM · MESSENGER · CALENDAR", title1: "De la primera pregunta", title2: "a la cita confirmada.", description: "Conecta tus canales, organiza cada prospecto y deja que Albatros agende el siguiente paso sin hacer esperar al cliente.", primary: "Solicitar una demostración", accent: "orange" },
      ];

  useEffect(() => {
    const syncSlideWithHash = () => {
      const match = window.location.hash.match(/^#signal-slide-([1-3])$/);
      if (match) setActiveSlide(Number(match[1]) - 1);
    };

    syncSlideWithHash();
    window.addEventListener("hashchange", syncSlideWithHash);
    return () => window.removeEventListener("hashchange", syncSlideWithHash);
  }, []);

  const scheduleNextSlide = useCallback(() => {
    if (carouselTimerRef.current !== null) {
      window.clearTimeout(carouselTimerRef.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    carouselTimerRef.current = window.setTimeout(() => {
      carouselTimerRef.current = null;
      setActiveSlide((current) => (current + 1) % slides.length);
    }, HERO_SLIDE_INTERVAL_MS);
  }, [slides.length]);

  useEffect(() => {
    scheduleNextSlide();
    return () => {
      if (carouselTimerRef.current !== null) {
        window.clearTimeout(carouselTimerRef.current);
      }
    };
  }, [activeSlide, scheduleNextSlide]);

  return (
    <section
      id="hero"
      className="signal-hero min-h-screen flex flex-col justify-center pt-16 px-6 relative isolate overflow-hidden"
    >
      <span id="signal-slide-1" className="signal-carousel-target" aria-hidden="true" />
      <span id="signal-slide-2" className="signal-carousel-target" aria-hidden="true" />
      <span id="signal-slide-3" className="signal-carousel-target" aria-hidden="true" />
      <div className="signal-shell max-w-6xl mx-auto w-full relative z-10">
        <div className="signal-carousel-viewport">
          <div
            className="signal-carousel-track"
            style={{ transform: `translateX(-${activeSlide * 33.333333}%)` }}
          >
          {slides.map((slide, index) => (
          <div
            id={`signal-panel-${index + 1}`}
            role="tabpanel"
            aria-labelledby={`signal-tab-${index + 1}`}
            aria-hidden={activeSlide !== index}
            className={`signal-carousel-panel signal-content signal-slide-${index} signal-accent-${slide.accent} grid md:grid-cols-2 gap-10 lg:gap-16 items-center`}
            key={slide.label}
          >
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
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            >
              <WhatsAppIcon size={16} />
              {slide.primary}
            </a>
            <a
              href="#precios"
              className="cta-secondary flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            >
              {t.hero.viewPackages}
            </a>
          </div>
          <div className="signal-checks" aria-label={isEnglish ? "Key benefits" : "Beneficios principales"}>
            {t.hero.pillars.map((pillar) => (
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
        <ul className="signal-promises" aria-label={isEnglish ? "How Albatros works" : "Cómo funciona Albatros"}>
          <li>{lang === "en" ? "Answer real questions, not generic replies." : "Responde preguntas reales, no respuestas genéricas."}</li>
          <li>{lang === "en" ? "Capture leads and notify your team automatically." : "Captura prospectos y notifica a tu equipo automáticamente."}</li>
          <li>{lang === "en" ? "Your team takes over when human judgment is needed." : "Tu equipo entra cuando se necesita criterio humano."}</li>
        </ul>
        </div>
        ))}
        </div>
        </div>
        <div
          className="signal-carousel-dots"
          role="tablist"
          aria-label={isEnglish ? "Albatros highlights" : "Características de Albatros"}
        >
          {slides.map((item, index) => (
            <button
              key={item.label}
              id={`signal-tab-${index + 1}`}
              type="button"
              role="tab"
              aria-label={item.label}
              aria-controls={`signal-panel-${index + 1}`}
              aria-selected={activeSlide === index}
              tabIndex={activeSlide === index ? 0 : -1}
              className={activeSlide === index ? "is-active" : undefined}
              onClick={() => {
                setActiveSlide(index);
                scheduleNextSlide();
              }}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

                event.preventDefault();
                const nextIndex = event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? slides.length - 1
                    : (index + (event.key === "ArrowRight" ? 1 : -1) + slides.length) % slides.length;

                setActiveSlide(nextIndex);
                scheduleNextSlide();
                event.currentTarget.parentElement
                  ?.querySelectorAll<HTMLButtonElement>("button")
                  [nextIndex]?.focus();
              }}
            >
              <span className="sr-only">{item.label}</span>
            </button>
          ))}
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
                          {priceInfo.monthly} {suffix}
                        </span>
                        <span className="text-zinc-400 text-sm ml-1">/ {t.precios.monthly}</span>
                        <div className="text-zinc-500 text-sm mt-1">
                          + {priceInfo.setup} {suffix} {t.precios.setup}
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
          {t.precios.note.replace("{currency}", currency)}
        </p>
      </div>
    </section>
  );
}

// ─── Demo Albi ────────────────────────────────────────────────────────────────
const successStoriesCopy = {
  es: {
    eyebrow: "Negocios que ya usan Albatros",
    title: "Así se ve la IA en el trabajo",
    description:
      "Tres negocios distintos. Una misma experiencia: responder por redes sociales, orientar a sus clientes y dar seguimiento sin dejar conversaciones pendientes.",
    photo: "Foto del negocio",
    business: "Nombre del negocio",
    quote:
      "Aquí irá el testimonio del propietario: su experiencia con Albatros, el cambio que vivió su negocio y los resultados que ha conseguido.",
    link: "Sitio web o fanpage",
    placeholder: "Espacio para caso de éxito",
    featuredStatus: "Agente IA activo",
    featuredBusiness: "MAS Persianas",
    featuredOwner: "Marcos Suarez Lopez · Propietario",
    featuredQuote:
      "Albatros transformó la forma en que atendemos a nuestros clientes. El agente de IA responde consultas por WhatsApp y Messenger de manera rápida y clara, incluso cuando estamos ocupados. Estoy muy satisfecho con el servicio y con el acompañamiento que hemos recibido.",
    featuredLink: "Visitar MAS Persianas en Facebook",
    featuredImageAlt: "Logo de MAS Persianas",
    thirdStatus: "Ventas y citas automatizadas",
    thirdBusiness: "Satélite Car Audio",
    thirdMeta: "Audio automotriz · Rastreo satelital",
    thirdQuote:
      "Con Albatros automatizamos la atención y las ventas sin perder el trato cercano con nuestros clientes. Los agentes de IA responden por WhatsApp y Messenger, orientan sobre equipos de sonido, instalaciones, reparaciones y sistemas de rastreo, y además agendan citas automáticamente para que cada solicitud reciba seguimiento.",
    thirdLink: "Visitar el sitio de Satélite Car Audio",
    thirdImageAlt: "Logo de Satélite Car Audio",
    fourthStatus: "Agenda médica 24/7",
    fourthBusiness: "Vital Health Clinic",
    fourthMeta: "Clínica de especialidades · Servicios médicos",
    fourthQuote:
      "Con Albatros, nuestros pacientes pueden solicitar información y agendar citas desde las redes sociales a cualquier hora, todos los días del año. Los agentes de IA responden con rapidez y ayudan a mantener la agenda organizada, lo que mejora la eficiencia y el tiempo de atención desde el primer mensaje.",
    fourthLink: "Visitar Vital Health Clinic en Facebook",
    fourthImageAlt: "Logo de Vital Health Clinic",
    previous: "Ver caso anterior",
    next: "Ver siguiente caso",
    hint: "Desliza para conocer más historias",
  },
  en: {
    eyebrow: "Businesses already using Albatros",
    title: "See AI at work",
    description:
      "Three different businesses. One shared experience: answering on social media, guiding customers, and following up without leaving conversations behind.",
    photo: "Business photo",
    business: "Business name",
    quote:
      "The owner's story will go here: their experience with Albatros, how their business changed, and the results they have achieved.",
    link: "Website or Facebook page",
    placeholder: "Success story space",
    featuredStatus: "AI agent active",
    featuredBusiness: "MAS Persianas",
    featuredOwner: "Marcos Suarez Lopez · Owner",
    featuredQuote:
      "Albatros transformed the way we serve our customers. The AI agent answers questions on WhatsApp and Messenger quickly and clearly, even when we are busy. I am very satisfied with the service and the support we have received.",
    featuredLink: "Visit MAS Persianas on Facebook",
    featuredImageAlt: "MAS Persianas logo",
    thirdStatus: "Automated sales and appointments",
    thirdBusiness: "Satélite Car Audio",
    thirdMeta: "Car audio · Satellite tracking",
    thirdQuote:
      "With Albatros, we automated customer service and sales while keeping a personal connection with our customers. The AI agents respond on WhatsApp and Messenger, provide guidance on audio equipment, installations, repairs, and tracking systems, and automatically schedule appointments so every request receives follow-up.",
    thirdLink: "Visit the Satélite Car Audio website",
    thirdImageAlt: "Satélite Car Audio logo",
    fourthStatus: "24/7 medical scheduling",
    fourthBusiness: "Vital Health Clinic",
    fourthMeta: "Specialty clinic · Medical services",
    fourthQuote:
      "With Albatros, our patients can request information and book appointments through social media at any time, every day of the year. The AI agents reply quickly and help keep the schedule organized, improving efficiency and response times from the first message.",
    fourthLink: "Visit Vital Health Clinic on Facebook",
    fourthImageAlt: "Vital Health Clinic logo",
    previous: "View previous story",
    next: "View next story",
    hint: "Swipe to discover more stories",
  },
} as const;

const successStorySlots = ["orange", "teal", "blue"] as const;
const SUCCESS_STORIES_AUTOPLAY_MS = 5000;

function CarouselArrow({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CasosExito() {
  const { lang } = useLanguage();
  const copy = successStoriesCopy[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lastManualScrollRef = useRef(0);
  const stories = [
    {
      status: copy.thirdStatus,
      business: copy.thirdBusiness,
      meta: copy.thirdMeta,
      quote: copy.thirdQuote,
      link: copy.thirdLink,
      imageAlt: copy.thirdImageAlt,
      imageSrc: "/satelite-car-audio-logo.avif",
      imageWidth: 1188,
      imageHeight: 400,
      href: "https://satelitecaraudio.wixsite.com/misitio",
    },
    {
      status: copy.fourthStatus,
      business: copy.fourthBusiness,
      meta: copy.fourthMeta,
      quote: copy.fourthQuote,
      link: copy.fourthLink,
      imageAlt: copy.fourthImageAlt,
      imageSrc: "/vital-health-clinic-logo.jpg",
      imageWidth: 714,
      imageHeight: 714,
      href: "https://www.facebook.com/vitalhealthlapazbcs",
    },
    {
      status: copy.featuredStatus,
      business: copy.featuredBusiness,
      meta: copy.featuredOwner,
      quote: copy.featuredQuote,
      link: copy.featuredLink,
      imageAlt: copy.featuredImageAlt,
      imageSrc: "/mas-persianas-logo.jpg",
      imageWidth: 951,
      imageHeight: 480,
      href: "https://www.facebook.com/MASpersianasbcs",
    },
  ];

  const scrollStories = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const reachedEdge = direction === 1
      ? track.scrollLeft >= maxScrollLeft - 8
      : track.scrollLeft <= 8;
    const nextPosition = reachedEdge
      ? direction === 1 ? 0 : maxScrollLeft
      : Math.min(maxScrollLeft, Math.max(0, track.scrollLeft + direction * track.clientWidth * 0.86));

    track.scrollTo({
      left: nextPosition,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, []);

  const handleManualScroll = (direction: -1 | 1) => {
    lastManualScrollRef.current = Date.now();
    scrollStories(direction);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    observer.observe(track);

    const autoplay = window.setInterval(() => {
      const recentlyUsedControls = Date.now() - lastManualScrollRef.current < SUCCESS_STORIES_AUTOPLAY_MS;
      const userIsInteracting = track.matches(":hover") || section.contains(document.activeElement);

      if (!document.hidden && isVisible && !recentlyUsedControls && !userIsInteracting) {
        scrollStories(1);
      }
    }, SUCCESS_STORIES_AUTOPLAY_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(autoplay);
    };
  }, [scrollStories]);

  return (
    <section ref={sectionRef} id="casos-exito" className="aurora-success py-8 md:py-10 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="success-stories-header fade-in">
          <div>
            <p className="success-stories-eyebrow">{copy.eyebrow}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-900">
              {copy.title}
            </h2>
            <p className="success-stories-description">{copy.description}</p>
          </div>

          <div className="success-carousel-controls" aria-label={copy.title}>
            <button type="button" onClick={() => handleManualScroll(-1)} aria-label={copy.previous}>
              <CarouselArrow direction="left" />
            </button>
            <button type="button" onClick={() => handleManualScroll(1)} aria-label={copy.next}>
              <CarouselArrow direction="right" />
            </button>
          </div>
        </header>

        <div
          ref={trackRef}
          className="success-stories-track stagger"
          role="region"
          aria-label={copy.title}
          tabIndex={0}
        >
          {successStorySlots.map((accent, index) => {
            const story = stories[index];

            return (
            <article className={`success-story-card success-story-accent-${accent} fade-in`} key={accent}>
              <div className={`success-story-photo${story ? " has-logo" : ""}`}>
                {story ? (
                  <Image
                    src={story.imageSrc}
                    alt={story.imageAlt}
                    width={story.imageWidth}
                    height={story.imageHeight}
                    sizes="(max-width: 767px) 92vw, 22rem"
                    className="success-story-logo"
                  />
                ) : (
                  <span role="img" aria-label={`${copy.photo} ${index + 1}`}>{copy.photo}</span>
                )}
              </div>

              <div className="success-story-content">
                <span className="success-story-status">
                  {story ? story.status : copy.placeholder}
                </span>
                <h3 className="font-display">
                  {story ? story.business : copy.business}
                </h3>
                {story && <p className="success-story-owner">{story.meta}</p>}
                <blockquote>{story ? story.quote : copy.quote}</blockquote>
                {story ? (
                  <a
                    href={story.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="success-story-link-placeholder"
                  >
                    <ExternalLinkGlyph />
                    {story.link}
                  </a>
                ) : (
                  <span className="success-story-link-placeholder">
                    <ExternalLinkGlyph />
                    {copy.link}
                  </span>
                )}
              </div>
            </article>
            );
          })}
        </div>

        <p className="success-stories-hint">{copy.hint}</p>
      </div>
    </section>
  );
}

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
    <footer className="aurora-footer overflow-hidden py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="brand-lockup flex items-center gap-2 mb-3">
              <Image src="/albatros-monogram.png" alt="" width={30} height={30} className="brand-monogram" />
              <span className="font-display text-base font-semibold tracking-[0.08em] text-zinc-900">
                ALBATROS IA
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
    const initializationTimer = window.setTimeout(() => {
    // 1. Detectar e inicializar idioma
    const savedLang = localStorage.getItem("albi-lang") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language || "es";
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
    const browserLangGeo = navigator.language || "es";
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
    }, 0);

    return () => window.clearTimeout(initializationTimer);
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
            name: "Albatros IA",
            url: "https://www.albatrosia.com",
            logo: "https://www.albatrosia.com/albatros.png",
            description:
              "Agentes de IA para WhatsApp y Messenger, automatización de citas, sitios web y presencia local en Google.",
            email: "hola@albatrosia.com",
            areaServed: "Worldwide",
            knowsAbout: [
              "Diseño web",
              "SEO local",
              "Google Business Profile",
              "Automatización con IA",
              "Chatbots para WhatsApp",
              "Agendamiento automático",
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
        <CasosExito />
        <DemoAlbi />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWA />
    </LanguageContext.Provider>
  );
}
