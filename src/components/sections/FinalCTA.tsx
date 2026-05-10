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
        <span className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block">El momento es ahora</span>
        
        <AnimatedText 
          text="Domina tu mercado." 
          className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-8 mx-auto max-w-3xl" 
          startOpacity={0.05} 
        />

        <FadeIn delay={0.2}>
          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light italic">
            No decidas contratarnos hoy. Decide saber qué te está costando no actuar. Tu auditoría gratuita te espera.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="relative inline-block group">
            <motion.a 
              href="#audit-form" 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              className="relative inline-flex items-center px-8 py-4 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 shadow-xl group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.1)]"
            >
              {/* Glass Glint Effect */}
              <motion.div 
                initial={{ left: '-100%' }}
                whileHover={{ left: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
              />
              <span className="relative z-10">Solicitar Auditoría Gratuita</span>
            </motion.a>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-white/10 text-[9px] uppercase tracking-[0.2em] font-bold">
            <span>48 Horas de entrega</span>
            <span>PDF de 6 páginas</span>
            <span>Cero compromiso</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
