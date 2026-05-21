"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Language, translations, WA_LINKS } from "@/lib/translations";

// ─── Contexto de Idioma ───────────────────────────────────────────────────────
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.es;
  wa: typeof WA_LINKS.es;
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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-zinc-900">
            Albatros Dev
          </span>
          <span className="font-mono-custom text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
            beta
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
  const { t, wa } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-16 px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-20">
        <div>
          <p className="font-mono-custom text-xs text-zinc-400 mb-6 tracking-widest uppercase">
            {t.hero.kicker}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] text-zinc-900 mb-6">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#precios"
              className="bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              {t.hero.viewPackages}
            </a>
            <a
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-200 text-zinc-700 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors"
            >
              <WhatsAppIcon size={16} />
              {t.hero.talkToAlbi}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/hero-mockup.png"
            alt={t.hero.altHero}
            width={600}
            height={300}
            className="w-full max-w-lg mx-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// ─── Problema ─────────────────────────────────────────────────────────────────
function Problema() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-zinc-50 scroll-mt-16">
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
              className="fade-in relative border border-zinc-200 bg-white p-8 rounded-lg overflow-hidden"
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
    <section id="servicios" className="py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          {t.servicios.title1}
        </h2>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-400 mb-16 fade-in">
          {t.servicios.title2}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {t.servicios.puntos.map((s) => (
            <div key={s.num} className="fade-in relative p-8 border border-zinc-200 rounded-lg">
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

  const getWaLink = (name: string) => {
    if (name === "Presencia" || name === "Presence") return wa.presencia;
    if (name === "Negocio Activo" || name === "Active Business") return wa.negocioActivo;
    return wa.turismoPro;
  };

  return (
    <section id="precios" className="py-24 px-6 bg-zinc-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-3 fade-in">
          {t.precios.title}
        </h2>
        <p className="text-zinc-500 mb-16 fade-in">
          {t.precios.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {t.precios.paquetes.map((p) => (
            <div
              key={p.name}
              className={`fade-in relative bg-white rounded-lg p-8 flex flex-col ${
                p.featured
                  ? "border-2 border-zinc-900 shadow-lg"
                  : "border border-zinc-200"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-mono-custom px-3 py-1 rounded-full whitespace-nowrap">
                  {t.precios.recommended}
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-zinc-900 mb-1">
                {p.name}
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-semibold text-zinc-900">
                  {p.setup} USD
                </span>
                <span className="text-zinc-400 text-sm ml-1">{t.precios.setup}</span>
                <div className="text-zinc-500 text-sm mt-1">
                  + {p.monthly} USD / {t.precios.monthly}
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
                href={getWaLink(p.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-colors ${
                  p.featured
                    ? "bg-zinc-900 text-white hover:bg-zinc-700"
                    : "border border-zinc-200 text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <WhatsAppIcon size={16} />
                {t.precios.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400 font-mono-custom mt-8 fade-in">
          {t.precios.note}
        </p>
      </div>
    </section>
  );
}

// ─── Demo Albi ────────────────────────────────────────────────────────────────
function DemoAlbi() {
  const { t, wa } = useLanguage();

  return (
    <section className="py-24 px-6">
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
          className="fade-in inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-zinc-700 transition-colors"
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
    <section className="py-24 px-6 bg-zinc-900 text-white">
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
            <div key={s.label} className="fade-in border border-zinc-800 rounded-lg p-6">
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
    <section id="faq" className="py-24 px-6 scroll-mt-16">
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
    <section className="py-24 px-6 bg-zinc-50 text-center">
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
          className="fade-in inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-zinc-700 transition-colors"
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
    <footer className="py-16 px-6 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-base font-semibold text-zinc-900">
                Albatros Dev
              </span>
              <span className="font-mono-custom text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
                beta
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
      className="md:hidden fixed bottom-6 right-6 z-50 bg-zinc-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-700 transition-colors"
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

  useEffect(() => {
    // 1. Verificar preferencia guardada en localStorage
    const savedLang = localStorage.getItem("albi-lang") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLang(savedLang);
      return;
    }

    // 2. Si no hay preferencia, detectar el idioma del navegador
    const browserLang = navigator.language || (navigator as any).userLanguage || "es";
    if (browserLang.startsWith("en")) {
      setLang("en");
    } else {
      setLang("es");
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("albi-lang", newLang);
  };

  const t = translations[lang];
  const wa = WA_LINKS[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleLanguageChange, t, wa }}>
      <Nav />
      <main>
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
