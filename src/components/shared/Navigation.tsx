'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { FadeIn } from '@/components/motion/FadeIn';

const navLinks = [
  { label: 'Cómo trabajamos', href: '#day-1-audit' },
  { label: 'Paquetes', href: '#plans' },
  { label: 'Auditoría', href: '#audit-form' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <FadeIn delay={0} y={-20} className="fixed top-0 left-0 right-0 z-[90]">
        <nav
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <span className="font-display text-lg font-medium tracking-tight text-[#FAFAF7] group-hover:text-white transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                Albatros <span className="text-white/40 font-light ml-1 text-xs">dev</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#audit-form"
                className="text-sm px-5 py-2 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300"
              >
                Pedir auditoría
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <IconMenu2 size={24} />
            </button>
          </div>
        </nav>
      </FadeIn>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-white/70 hover:text-white"
              aria-label="Cerrar menú"
            >
              <IconX size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                className="text-2xl font-display text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#audit-form"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
              className="mt-4 px-8 py-3 rounded-full bg-white text-[#0A0A0A] font-medium"
            >
              Pedir auditoría gratis
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
