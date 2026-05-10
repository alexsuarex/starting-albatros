'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';

const footerLinks = {
  services: [
    { label: 'Web Esencial', href: '#plans' },
    { label: 'Web + SEO Local', href: '#plans' },
    { label: 'Plan Crecimiento', href: '#advanced-plans' },
    { label: 'Plan Performance', href: '#advanced-plans' },
    { label: 'Auditoría gratuita', href: '#audit-form' },
  ],
  legal: [
    { label: 'Aviso de privacidad', href: '/privacy-policy' },
    { label: 'Términos y condiciones', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="relative py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      
      {/* Sutil Glow de cierre */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          
          <FadeIn delay={0} y={20}>
            <div className="col-span-2 md:col-span-1">
              <span className="font-display text-2xl font-normal text-white block mb-6 tracking-tighter">Albatros.</span>
              <p className="text-white/30 text-xs leading-relaxed max-w-[200px]">
                Código limpio. Plazos públicos. Precios honestos. La agencia para el 1% de los negocios.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Servicios</p>
              <ul className="space-y-4">
                {footerLinks.services.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/40 hover:text-white transition-colors duration-300">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Legal</p>
              <ul className="space-y-4">
                {footerLinks.legal.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/40 hover:text-white transition-colors duration-300">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Contacto</p>
              <ul className="space-y-4">
                <li>
                  <a href="https://wa.me/5216121670637" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors duration-300">WhatsApp</a>
                </li>
                <li>
                  <a href="mailto:hola@albatrosia.com" className="text-sm text-white/40 hover:text-white transition-colors duration-300">hola@albatrosia.com</a>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.5}>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              whileHover={{ 
                color: '#ffffff',
                textShadow: '0 0 12px rgba(255,255,255,0.4)',
                opacity: 0.8
              }}
              className="text-white/20 text-[10px] uppercase tracking-widest cursor-default transition-all duration-300"
            >
              © 2026 Albatros · Hecho en México con precisión técnica
            </motion.p>
            <div className="flex gap-6">
               <span className="text-white/10 text-[10px] uppercase tracking-widest">v5.1 Stable</span>
            </div>
          </div>
        </FadeIn>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Albatros', description: 'Agencia digital de desarrollo web, SEO local y automatización con IA.', url: 'https://albatrosia.com', priceRange: '$390 - $3,490 USD', telephone: '+5216121670637' }) }} />
    </footer>
  );
}
