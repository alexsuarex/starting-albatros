import { whatsappLinks } from "@/lib/constants";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Left — Copy */}
        <div>
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[#0A0A0A] mb-6">
            Todavía en
            <br />
            blanco y negro.
            <br />
            <span className="text-[#999999]">Pronto, a color.</span>
          </h1>

          <p className="text-[#555555] text-lg md:text-xl leading-relaxed max-w-lg mb-10">
            Somos Albatros Dev — la agencia digital de La Paz que construye la
            presencia online de negocios locales. Sitio web, Google Maps y
            atención con IA las 24&nbsp;horas.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#precios"
              className="inline-flex items-center justify-center bg-[#0A0A0A] text-white px-7 py-3.5 text-[15px] font-semibold hover:bg-[#1A1A1A] transition-colors duration-200"
            >
              Ver paquetes
            </a>
            <a
              href={whatsappLinks.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[#E0E0E0] text-[#0A0A0A] px-7 py-3.5 text-[15px] font-semibold hover:border-[#0A0A0A] transition-colors duration-200"
            >
              Hablar con Albi en WhatsApp
            </a>
          </div>
        </div>

        {/* Right — Albatros SVG */}
        <div className="flex justify-center md:justify-end">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-[320px] md:max-w-[380px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Minimalist albatross in flight — line art only */}
            <g stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Body */}
              <path d="M 140 210 Q 180 195 220 200 Q 260 205 280 215 Q 260 220 220 218 Q 180 215 140 210 Z" />
              {/* Left wing — extended */}
              <path d="M 160 205 Q 120 170 60 140 Q 40 132 25 135 Q 35 145 60 155 Q 100 175 150 200" />
              {/* Right wing — extended */}
              <path d="M 250 210 Q 290 175 345 150 Q 365 142 380 145 Q 370 155 345 165 Q 305 182 260 208" />
              {/* Left wing detail */}
              <path d="M 60 140 Q 80 148 100 158" />
              <path d="M 80 136 Q 95 145 110 156" />
              {/* Right wing detail */}
              <path d="M 345 150 Q 325 158 305 168" />
              <path d="M 325 146 Q 310 155 295 166" />
              {/* Head */}
              <path d="M 140 210 Q 128 206 120 202 Q 115 200 110 201" />
              {/* Beak */}
              <path d="M 110 201 Q 100 199 92 200" />
              {/* Eye dot */}
              <circle cx="118" cy="203" r="1.5" fill="#333333" />
              {/* Tail */}
              <path d="M 280 215 Q 295 218 310 225 Q 305 220 295 215" />
              {/* Subtle body curve */}
              <path d="M 170 208 Q 200 202 230 208" opacity="0.3" />
            </g>
          </svg>
        </div>
      </div>

      {/* Beta tag */}
      <div className="mt-auto pt-12">
        <p className="font-mono text-[11px] text-[#999999]">
          v0.1-beta · La Paz, BCS
        </p>
      </div>
    </section>
  );
}
