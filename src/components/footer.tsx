import { whatsappLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="px-6 py-16 border-t border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto">

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-display text-base font-bold tracking-tight text-[#0A0A0A]">
                Albatros Dev
              </span>
              <span className="font-mono text-[11px] text-[#999999]">
                [beta]
              </span>
            </div>
            <p className="text-xs text-[#999999] leading-relaxed">
              Agencia digital en La Paz, BCS. Sitios web, Google Maps y chatbots con IA para negocios locales.
            </p>
          </div>

          {/* Menú */}
          <div>
            <p className="font-mono text-[11px] text-[#999999] uppercase tracking-widest mb-4">
              Menú
            </p>
            <ul className="space-y-2.5 text-[13px] text-[#555555]">
              <li><a href="#servicios" className="hover:text-[#0A0A0A] transition-colors duration-200">Servicios</a></li>
              <li><a href="#precios" className="hover:text-[#0A0A0A] transition-colors duration-200">Precios</a></li>
              <li><a href="#faq" className="hover:text-[#0A0A0A] transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-mono text-[11px] text-[#999999] uppercase tracking-widest mb-4">
              Legal
            </p>
            <ul className="space-y-2.5 text-[13px] text-[#555555]">
              <li><a href="/privacy-policy" className="hover:text-[#0A0A0A] transition-colors duration-200">Aviso de Privacidad</a></li>
              <li><a href="/terms" className="hover:text-[#0A0A0A] transition-colors duration-200">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-mono text-[11px] text-[#999999] uppercase tracking-widest mb-4">
              Contacto
            </p>
            <ul className="space-y-2.5 text-[13px] text-[#555555]">
              <li>
                <a
                  href={whatsappLinks.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A0A0A] transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@albatrosia.com"
                  className="hover:text-[#0A0A0A] transition-colors duration-200"
                >
                  hola@albatrosia.com
                </a>
              </li>
              <li className="text-[#CCCCCC] text-xs pt-1">La Paz, BCS, México</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E0E0E0] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[13px] text-[#999999]">
            © {new Date().getFullYear()} Albatros Dev · La Paz, Baja California Sur, México
          </p>
          <p className="font-mono text-[11px] text-[#CCCCCC]">
            Hecho en La Paz 🌊
          </p>
        </div>

      </div>
    </footer>
  );
}
