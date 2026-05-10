'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { IconWorld, IconMapPin, IconBrandWhatsapp } from '@tabler/icons-react';

export function DayDelivery() {
  const deliverables = [
    { icon: IconWorld, label: 'Sitio web terminado', desc: 'React, responsive, rápido, con tu marca' },
    { icon: IconMapPin, label: 'Google Maps optimizado', desc: 'Verificado, con reseñas y SEO local' },
    { icon: IconBrandWhatsapp, label: 'WhatsApp con Albi', desc: 'Chatbot IA entrenado para tu negocio' },
  ];

  return (
    <section id="day-7-delivery" className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #253D52 0%, #3A5568 50%, #5A7A8A 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FAFAF7] animate-day-pulse" />
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Día 7 · Entrega</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white mb-4">
            Día 7. Tu negocio ahora vende solo.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-white/50 text-lg max-w-xl mb-16">Todo converge. Sitio web, Google Maps y chatbot IA — los tres activos funcionando al mismo tiempo.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <FadeIn key={d.label} delay={0.3 + i * 0.1} y={30}>
              <div className="relative p-8 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.08] transition-all duration-400 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <d.icon size={28} strokeWidth={1.25} className="text-white" />
                </div>
                <h3 className="font-display text-xl font-medium text-white mb-2">{d.label}</h3>
                <p className="text-white/40 text-sm">{d.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
