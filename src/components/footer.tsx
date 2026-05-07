import { whatsappLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo */}
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-[#0A0A0A]">
              Albatros Dev
            </span>
            <span className="font-mono text-[11px] text-[#999999]">
              [beta]
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-[13px] text-[#555555]">
            <a
              href="#servicios"
              className="hover:text-[#0A0A0A] transition-colors duration-200"
            >
              Servicios
            </a>
            <a
              href="#precios"
              className="hover:text-[#0A0A0A] transition-colors duration-200"
            >
              Precios
            </a>
            <a
              href="/privacy-policy"
              className="hover:text-[#0A0A0A] transition-colors duration-200"
            >
              Privacidad
            </a>
            <a
              href="/terms"
              className="hover:text-[#0A0A0A] transition-colors duration-200"
            >
              Términos
            </a>
            <a
              href={whatsappLinks.general}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A0A0A] transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E0E0E0] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[13px] text-[#999999]">
            © {new Date().getFullYear()} Albatros Dev · La Paz, Baja California
            Sur, México
          </p>
          <p className="font-mono text-[11px] text-[#CCCCCC]">
            Hecho en La Paz 🌊
          </p>
        </div>
      </div>
    </footer>
  );
}
