"use client";

import { useEffect, useState } from "react";
import { whatsappLinks } from "@/lib/constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <a href="#" className="flex items-baseline">
          <span className="font-display text-xl font-bold tracking-tight text-[#0A0A0A]">
            Albatros Dev
          </span>
        </a>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#555555]">
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
            href="#contacto"
            className="hover:text-[#0A0A0A] transition-colors duration-200"
          >
            Contacto
          </a>
        </div>

        {/* CTA */}
        <a
          href={whatsappLinks.general}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 border border-[#0A0A0A] text-[#0A0A0A] px-5 py-2 text-[13px] font-semibold hover:bg-[#0A0A0A] hover:text-white transition-all duration-200"
        >
          Hablar con Albi
        </a>
      </div>
    </nav>
  );
}
