'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { FadeIn } from '@/components/motion/FadeIn';

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden">
      
      {/* Infinite Horizon Resplandor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-t from-indigo-500/5 via-indigo-500/2 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="text-white/80 text-[11px] font-black tracking-[0.6em] uppercase mb-10 block drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
          El momento es ahora
        </span>
        
        <AnimatedText 
          text="Domina tu mercado." 
          className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-8 mx-auto max-w-3xl" 
          startOpacity={0.05} 
        />

        <FadeIn delay={0.2}>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light italic">
            No decidas contratarnos hoy. Decide saber qué te está costando no actuar. Tu auditoría gratuita te espera.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="relative inline-block">
            <a 
              href="#audit-form" 
              className="relative inline-flex items-center px-10 py-5 rounded-full bg-white text-black text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Solicitar Auditoría Gratuita</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-6 text-white/60 text-[10px] uppercase tracking-[0.3em] font-black">
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">48 Horas de entrega</span>
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">PDF de 6 páginas</span>
            <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Cero compromiso</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
