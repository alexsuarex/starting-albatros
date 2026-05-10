'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { IconMapPin, IconSearch, IconBolt } from '@tabler/icons-react';

export function DaySEO() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // RESTORING CINEMATIC TUNNEL EFFECT
  // Phase 1: 0 to 0.3
  // Phase 2: 0.33 to 0.63
  // Phase 3: 0.66 to 1.0

  // --- Phase 1: Dominio Local (0 to 0.3) ---
  const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [1, 1, 1, 0]);
  const text1Typewriter = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const text1Y = useTransform(smoothProgress, [0.25, 0.3], [0, -60]);
  const img1Scale = useTransform(smoothProgress, [0, 0.3, 0.33], [1, 1.4, 1.6]);
  const img1Opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const img1Blur = useTransform(smoothProgress, [0.2, 0.3], [0, 8]);

  // --- Phase 2: Intención de Búsqueda (0.33 to 0.63) ---
  const text2Opacity = useTransform(smoothProgress, [0.31, 0.36, 0.6, 0.64], [0, 1, 1, 0]);
  const text2Typewriter = useTransform(smoothProgress, [0.33, 0.45], [0, 1]);
  const text2Y = useTransform(smoothProgress, [0.31, 0.36, 0.6, 0.64], [60, 0, 0, -60]);
  const img2Scale = useTransform(smoothProgress, [0.25, 0.33, 0.55, 0.64], [0.6, 1, 1, 1.4]);
  const img2Opacity = useTransform(smoothProgress, [0.28, 0.33, 0.58, 0.64], [0, 1, 1, 0]);
  const img2Blur = useTransform(smoothProgress, [0.58, 0.64], [0, 8]);

  // --- Phase 3: SEO Técnico Puro (0.66 to 1.0) ---
  const text3Opacity = useTransform(smoothProgress, [0.64, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const text3Typewriter = useTransform(smoothProgress, [0.66, 0.78], [0, 1]);
  const text3Y = useTransform(smoothProgress, [0.64, 0.7, 0.9, 1], [60, 0, 0, -60]);
  const img3Scale = useTransform(smoothProgress, [0.55, 0.66, 0.85, 1], [0.6, 1, 1, 1.4]);
  const img3Opacity = useTransform(smoothProgress, [0.62, 0.66, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="day-4-5-seo" className="relative h-[400vh] bg-[#050505]">
      
      <div className="sticky top-0 w-full pt-10 md:pt-20 z-50 pointer-events-none flex justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Día 4-5 · Visibilidad Orgánica</span>
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="relative h-[250px] flex flex-col justify-center">
            {/* Texto 1: Local */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text1Opacity, y: text1Y }}>
              <AnimatedText customProgress={text1Typewriter} text="Dominio Local." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Optimizamos tu perfil para monopolizar las búsquedas locales. Aseguramos que tu marca sea la única opción visible en Google Maps.
              </p>
              <div className="mt-8 flex items-center gap-3 text-orange-400">
                <IconMapPin size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Autoridad Geográfica</span>
              </div>
            </motion.div>

            {/* Texto 2: Intención */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text2Opacity, y: text2Y }}>
              <AnimatedText customProgress={text2Typewriter} text="Keywords de Poder." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Analizamos los términos exactos con los que tu competencia está facturando y posicionamos tu web para capturar esa demanda.
              </p>
              <div className="mt-8 flex items-center gap-3 text-yellow-400">
                <IconSearch size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Keywords High-Ticket</span>
              </div>
            </motion.div>

            {/* Texto 3: Técnico */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text3Opacity, y: text3Y }}>
              <AnimatedText customProgress={text3Typewriter} text="SEO Técnico Puro." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Arquitectura impecable e inyección de microdatos estructurados para que los algoritmos te indexen antes que al resto.
              </p>
              <div className="mt-8 flex items-center gap-3 text-red-400">
                <IconBolt size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Estructura Algorítmica</span>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            {/* Visual 1 */}
            <motion.div className="absolute w-full flex items-center justify-center" style={{ scale: img1Scale, opacity: img1Opacity, filter: useMotionTemplate`blur(${img1Blur}px)`, zIndex: 10 }}>
              <div role="img" aria-label="Visualización de dominio en Google Maps y posicionamiento local" className="relative w-full max-w-md aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-4 border-orange-400 flex items-center justify-center text-orange-400 shadow-[0_0_50px_rgba(251,146,60,0.5)] backdrop-blur-xl mb-6 relative">
                    <IconMapPin size={48} strokeWidth={2.5} />
                    <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-40" />
                  </div>
                  <div className="bg-black/60 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/10 flex flex-col items-center shadow-2xl">
                    <span className="text-white font-display text-xl font-bold tracking-tight">Tu Negocio Local</span>
                    <div className="flex gap-1.5 mt-2 text-orange-400 text-xs">★★★★★</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual 2 */}
            <motion.div className="absolute w-full flex items-center justify-center" style={{ scale: img2Scale, opacity: img2Opacity, filter: useMotionTemplate`blur(${img2Blur}px)`, zIndex: 20 }}>
              <div role="img" aria-label="Simulación de búsqueda en Google con resultados optimizados por Albatros dev" className="w-full max-w-md aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col p-10 md:p-12">
                <div className="h-14 w-full rounded-full border border-white/10 bg-white/5 flex items-center px-8 gap-5 mb-10">
                  <IconSearch className="text-yellow-400 w-6 h-6" />
                  <span className="text-white/60 text-sm font-mono tracking-tight">servicios premium cerca de mi|</span>
                </div>
                <div className="p-8 rounded-[2.5rem] border border-yellow-500/30 bg-yellow-500/5">
                  <div className="text-[10px] text-white/30 mb-2 font-bold tracking-[0.2em] uppercase">tu-dominio.com</div>
                  <div className="text-yellow-400 font-display text-2xl font-bold mb-4 tracking-tight">Servicios de Élite</div>
                  <div className="w-full h-3 bg-white/5 rounded-full mt-4" />
                  <div className="w-2/3 h-3 bg-white/5 rounded-full mt-3" />
                </div>
              </div>
            </motion.div>

            {/* Visual 3 */}
            <motion.div className="absolute w-full flex items-center justify-center" style={{ scale: img3Scale, opacity: img3Opacity, zIndex: 30 }}>
              <div role="img" aria-label="Panel de métricas de SEO técnico mostrando puntuación perfecta" className="w-full max-w-md aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col p-12 font-mono">
                <div className="flex justify-between items-center mb-10">
                  <div className="text-red-400 text-[10px] font-black flex items-center gap-3 tracking-[0.3em] uppercase italic">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    SCANNER_ACTIVE
                  </div>
                </div>
                <div className="flex justify-around items-center mb-12">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-400 text-2xl font-black italic shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        100
                      </div>
                      <span className="text-[10px] text-white/40 tracking-[0.2em] font-bold uppercase">SEO</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-[10px] text-white/40 flex flex-col gap-3 shadow-inner">
                  <div className="flex justify-between items-center"><span className="text-white/60">{'LCP 1.1s'}</span> <span className="text-emerald-400 font-black tracking-widest">EXCELLENT</span></div>
                  <div className="flex justify-between items-center"><span className="text-white/60">{'Schema Markup'}</span> <span className="text-emerald-400 font-black tracking-widest">VALID</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
