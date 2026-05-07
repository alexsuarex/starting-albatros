"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// ─── WhatsApp links ───────────────────────────────────────────────────────────
const WA = {
  general:
    "https://wa.me/15556291595?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+Albatros+Dev",
  presencia:
    "https://wa.me/15556291595?text=Hola%2C+me+interesa+el+paquete+Presencia+de+Albatros+Dev",
  negocioActivo:
    "https://wa.me/15556291595?text=Hola%2C+me+interesa+el+paquete+Negocio+Activo+de+Albatros+Dev",
  turismoPro:
    "https://wa.me/15556291595?text=Hola%2C+me+interesa+el+paquete+Turismo+Pro+de+Albatros+Dev",
};

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
            Servicios
          </a>
          <a href="#precios" className="hover:text-zinc-900 transition-colors">
            Precios
          </a>
          <a href="#faq" className="hover:text-zinc-900 transition-colors">
            FAQ
          </a>
        </div>

        <a
          href={WA.general}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-zinc-900 text-white text-sm px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
        >
          <WhatsAppIcon size={16} />
          Hablar con Albi
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-16 px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-20">
        <div>
          <p className="font-mono-custom text-xs text-zinc-400 mb-6 tracking-widest uppercase">
            v0.1-beta · La Paz, BCS
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-zinc-900 mb-6">
            Todavía en
            <br />
            blanco y negro.
            <br />
            <span className="text-zinc-400">Pronto, a color.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed mb-8 max-w-md">
            Somos Albatros Dev — la agencia digital de La Paz que construye la
            presencia online de negocios locales. Sitio web, Google Maps y
            atención con IA las 24 horas.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#precios"
              className="bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Ver paquetes
            </a>
            <a
              href={WA.general}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-200 text-zinc-700 px-6 py-3 rounded-full text-sm font-medium hover:border-zinc-400 transition-colors"
            >
              <WhatsAppIcon size={16} />
              Hablar con Albi
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/hero-mockup.png"
            alt="Presencia digital para tu negocio"
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
  const puntos = [
    {
      num: "01",
      title: "Sin presencia online",
      desc: "Un turista te busca en Google a las 11pm. No te encuentra. Reserva con tu competencia.",
    },
    {
      num: "02",
      title: "WhatsApp saturado",
      desc: "Respondes cuando puedes. Cuando puedes ya es tarde. El cliente ya se fue.",
    },
    {
      num: "03",
      title: "Google Maps abandonado",
      desc: "Tu ficha desactualizada, sin fotos, con horario incorrecto. Primera impresión: mala.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-16 fade-in">
          ¿Cuántos clientes perdiste
          <br />
          hoy por no contestar WhatsApp?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {puntos.map((p) => (
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
  const servicios = [
    {
      num: "01",
      title: "Sitio web que vende",
      items: [
        "Sitio React moderno y rápido",
        "Sistema de reservaciones online",
        "Integración de pagos (Stripe / MercadoPago)",
        "Responsive, SSL, dominio incluido",
      ],
    },
    {
      num: "02",
      title: "Google Maps + SEO local",
      items: [
        "Ficha Google Business optimizada",
        "Palabras clave para tu ciudad y giro",
        "Fotos, horarios, reseñas gestionadas",
        "Reporte mensual de visibilidad",
      ],
    },
    {
      num: "03",
      title: "Atención con IA 24/7",
      items: [
        "Chatbot en WhatsApp que responde solo",
        "Conoce tus servicios, precios y horarios",
        "Captura leads mientras duermes",
        "Escala a humano cuando es necesario",
      ],
    },
  ];

  return (
    <section id="servicios" className="py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          Tres problemas.
        </h2>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-400 mb-16 fade-in">
          Tres soluciones.
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {servicios.map((s) => (
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
  const paquetes = [
    {
      name: "Presencia",
      setup: "$250",
      monthly: "$60",
      waLink: WA.presencia,
      featured: false,
      features: [
        { label: "Sitio web React (5 secciones)", included: true },
        { label: "Dominio + SSL incluido", included: true },
        { label: "Google Maps optimizado", included: true },
        { label: "SEO local básico", included: true },
        { label: "Chatbot WhatsApp con IA", included: false },
        { label: "Sistema de reservaciones", included: false },
        { label: "Integración de pagos", included: false },
      ],
    },
    {
      name: "Negocio Activo",
      setup: "$450",
      monthly: "$120",
      waLink: WA.negocioActivo,
      featured: true,
      features: [
        { label: "Sitio web React (5 secciones)", included: true },
        { label: "Dominio + SSL incluido", included: true },
        { label: "Google Maps optimizado", included: true },
        { label: "SEO local básico", included: true },
        { label: "Chatbot WhatsApp con IA", included: true },
        { label: "Sistema de reservaciones", included: false },
        { label: "Integración de pagos", included: false },
      ],
    },
    {
      name: "Turismo Pro",
      setup: "$700",
      monthly: "$180",
      waLink: WA.turismoPro,
      featured: false,
      features: [
        { label: "Sitio web React (5 secciones)", included: true },
        { label: "Dominio + SSL incluido", included: true },
        { label: "Google Maps optimizado", included: true },
        { label: "SEO local básico", included: true },
        { label: "Chatbot WhatsApp con IA", included: true },
        { label: "Sistema de reservaciones", included: true },
        { label: "Integración de pagos", included: true },
      ],
    },
  ];

  return (
    <section id="precios" className="py-24 px-6 bg-zinc-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-3 fade-in">
          Precios de fundador.
        </h2>
        <p className="text-zinc-500 mb-16 fade-in">
          Solo para los primeros 5 clientes beta. Después suben.
        </p>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {paquetes.map((p) => (
            <div
              key={p.name}
              className={`fade-in relative bg-white rounded-lg p-8 flex flex-col ${p.featured
                ? "border-2 border-zinc-900 shadow-lg"
                : "border border-zinc-200"
                }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-mono-custom px-3 py-1 rounded-full whitespace-nowrap">
                  Recomendado
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-zinc-900 mb-1">
                {p.name}
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-semibold text-zinc-900">
                  {p.setup} USD
                </span>
                <span className="text-zinc-400 text-sm ml-1">setup</span>
                <div className="text-zinc-500 text-sm mt-1">
                  + {p.monthly} USD / mes
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
                href={p.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-colors ${p.featured
                  ? "bg-zinc-900 text-white hover:bg-zinc-700"
                  : "border border-zinc-200 text-zinc-700 hover:border-zinc-400"
                  }`}
              >
                <WhatsAppIcon size={16} />
                Quiero este paquete
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400 font-mono-custom mt-8 fade-in">
          * Precios en USD. Precio beta disponible para los primeros 5 clientes.
          Sujeto a cambio al lanzamiento oficial.
        </p>
      </div>
    </section>
  );
}

// ─── Demo Albi ────────────────────────────────────────────────────────────────
function DemoAlbi() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          Tu futuro mejor empleado,
          <br />
          trabajando ahora mismo.
        </h2>
        <p className="text-zinc-500 text-lg mb-10 fade-in">
          Escríbele a Albi por WhatsApp. Te responderá al instante, en español o
          inglés. Así de natural y rápida será la atención para tus clientes.
        </p>
        <a
          href={WA.general}
          target="_blank"
          rel="noopener noreferrer"
          className="fade-in inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-zinc-700 transition-colors"
        >
          <WhatsAppIcon size={20} />
          Hablar con Albi ahora
        </a>
        <p className="font-mono-custom text-xs text-zinc-400 mt-4 fade-in">
          responde en segundos · disponible 24/7 · bilingüe
        </p>
      </div>
    </section>
  );
}

// ─── Sobre nosotros ───────────────────────────────────────────────────────────
function Sobre() {
  const stats = [
    { num: "80+", label: "propiedades gestionadas con tecnología propia" },
    { num: "3", label: "servicios especializados para negocios locales" },
    { num: "24/7", label: "disponibilidad del chatbot una vez activo" },
    { num: "La Paz → Los Cabos → México", label: "ruta de expansión" },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 fade-in">
          Construido en La Paz,
          <br />
          para La Paz.
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mb-16 leading-relaxed fade-in">
          Somos una agencia digital local. Conocemos el mercado turístico de
          Baja California Sur, entendemos los negocios de aquí y construimos
          soluciones que funcionan en este contexto. No somos una empresa de
          CDMX o del norte que llegó a vender. Somos de aquí.
        </p>
        <div className="grid grid-cols-2 gap-6 stagger">
          {stats.map((s) => (
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
  const faqs = [
    {
      q: "¿Cuánto tiempo tarda en estar listo mi sitio?",
      a: "Entre 5 y 14 días dependiendo del paquete. Presencia en 5–7 días, Turismo Pro en 10–14 días.",
    },
    {
      q: "¿Necesito saber de tecnología para usar esto?",
      a: "No. Nosotros configuramos todo. Tú solo apruebas el resultado y usas el producto final.",
    },
    {
      q: "¿El chatbot puede atender en inglés a turistas?",
      a: "Sí. Albi detecta el idioma del cliente y responde en español o inglés automáticamente.",
    },
    {
      q: "¿Qué pasa si quiero cancelar el servicio mensual?",
      a: "Puedes cancelar en cualquier momento con 15 días de aviso. El sitio web sigue siendo tuyo.",
    },
    {
      q: "¿Los precios son en pesos o dólares?",
      a: "En dólares USD. Aceptamos transferencia, tarjeta o pago en efectivo en La Paz.",
    },
    {
      q: "¿Qué es el precio beta?",
      a: "Es el precio de lanzamiento para nuestros primeros 5 clientes. Una vez completados los lugares, los precios suben al precio regular.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-16 fade-in">
          Preguntas frecuentes
        </h2>
        <Accordion className="fade-in">
          {faqs.map((f, i) => (
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
  return (
    <section className="py-24 px-6 bg-zinc-50 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-zinc-900 mb-4 fade-in">
          Tu negocio puede responder
          <br />
          WhatsApp aunque estés
          <br />
          en la playa.
        </h2>
        <p className="text-zinc-500 mb-10 fade-in">
          Quedan lugares disponibles en la beta. Escríbenos hoy.
        </p>
        <a
          href={WA.general}
          target="_blank"
          rel="noopener noreferrer"
          className="fade-in inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-zinc-700 transition-colors"
        >
          <WhatsAppIcon size={20} />
          Hablar con Albi por WhatsApp
        </a>
        <p className="font-mono-custom text-xs text-zinc-400 mt-4 fade-in">
          Sin compromiso. Te respondemos en minutos.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-base font-semibold text-zinc-900">
              Albatros Dev
            </span>
            <span className="font-mono-custom text-xs text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
              beta
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono-custom">
            © 2026 Albatros Dev · La Paz, Baja California Sur, México
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a href="#servicios" className="hover:text-zinc-900 transition-colors">
            Servicios
          </a>
          <a href="#precios" className="hover:text-zinc-900 transition-colors">
            Precios
          </a>
          <a href="/privacy-policy" className="hover:text-zinc-900 transition-colors">
            Privacidad
          </a>
          <a href="/terms" className="hover:text-zinc-900 transition-colors">
            Términos
          </a>
          <a href="/login" className="hover:text-zinc-900 transition-colors">
            Login
          </a>
          <a
            href={WA.general}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 transition-colors"
          >
            WhatsApp
          </a>
        </div>
        <p className="font-mono-custom text-xs text-zinc-300">
          Hecho en La Paz con mucho café ☕ y buen internet ⚡️
        </p>
      </div>
    </footer>
  );
}

// ─── Botón flotante WhatsApp (mobile) ─────────────────────────────────────────
function FloatingWA() {
  return (
    <a
      href={WA.general}
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

  return (
    <>
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
    </>
  );
}
