'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { IconAppWindow, IconLayoutBoardSplit, IconTextSize } from '@tabler/icons-react';

export function DayDesign() {
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

  // --- Phase 1: Diseño Premium (0 to 0.3) ---
  const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.22, 0.3], [1, 1, 1, 0]);
  const text1Typewriter = useTransform(smoothProgress, [0, 0.12], [0, 1]);
  const text1Y = useTransform(smoothProgress, [0.22, 0.3], [0, -40]);
  const img1Scale = useTransform(smoothProgress, [0, 0.22, 0.32], [1, 1.1, 1.2]);
  const img1Opacity = useTransform(smoothProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const img1Blur = useTransform(smoothProgress, [0.22, 0.32], [0, 10]);

  // --- Phase 2: Código Escalonable (0.33 to 0.63) ---
  const text2Opacity = useTransform(smoothProgress, [0.3, 0.35, 0.58, 0.64], [0, 1, 1, 0]);
  const text2Typewriter = useTransform(smoothProgress, [0.33, 0.42], [0, 1]);
  const text2Y = useTransform(smoothProgress, [0.3, 0.35, 0.58, 0.64], [40, 0, 0, -40]);
  const img2Scale = useTransform(smoothProgress, [0.28, 0.35, 0.58, 0.66], [0.85, 1, 1, 1.15]);
  const img2Opacity = useTransform(smoothProgress, [0.3, 0.35, 0.58, 0.66], [0, 1, 1, 0]);
  const img2Blur = useTransform(smoothProgress, [0.58, 0.66], [0, 10]);

  // --- Phase 3: Neuromarketing Visual (0.66 to 1.0) ---
  const text3Opacity = useTransform(smoothProgress, [0.63, 0.68, 0.92, 1], [0, 1, 1, 0]);
  const text3Typewriter = useTransform(smoothProgress, [0.66, 0.74], [0, 1]);
  const text3Y = useTransform(smoothProgress, [0.63, 0.68, 0.92, 1], [40, 0, 0, -40]);
  const img3Scale = useTransform(smoothProgress, [0.61, 0.68, 0.92, 1], [0.85, 1, 1, 1.15]);
  const img3Opacity = useTransform(smoothProgress, [0.63, 0.68, 0.92, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="day-2-3-design" className="relative h-[400vh] bg-[#050505]">
      
      <div className="sticky top-0 w-full pt-10 md:pt-20 z-50 pointer-events-none flex justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Día 2-3 · Diseño y Estructura</span>
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="relative h-[250px] flex flex-col justify-center">
            {/* Texto 1: Diseño */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text1Opacity, y: text1Y }}>
              <AnimatedText customProgress={text1Typewriter} text="Arquitectura Glass." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Interfaces inmersivas que proyectan autoridad inmediata y posicionan tu marca en el sector high-ticket.
              </p>
              <div className="mt-8 flex items-center gap-3 text-cyan-400">
                <IconAppWindow size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">UI Premium</span>
              </div>
            </motion.div>

            {/* Texto 2: Código */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text2Opacity, y: text2Y }}>
              <AnimatedText customProgress={text2Typewriter} text="Código Escalonable." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Desarrollo nativo con tecnologías modernas. Infraestructura limpia, segura y lista para el tráfico masivo.
              </p>
              <div className="mt-8 flex items-center gap-3 text-emerald-400">
                <IconLayoutBoardSplit size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Stack Moderno</span>
              </div>
            </motion.div>

            {/* Texto 3: Conversión */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text3Opacity, y: text3Y }}>
              <AnimatedText customProgress={text3Typewriter} text="Neuromarketing Visual." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Ubicamos los CTAs en los puntos exactos de fricción visual para guiar al usuario hacia la conversión inevitable.
              </p>
              <div className="mt-8 flex items-center gap-3 text-purple-400">
                <IconTextSize size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Ingeniería de Conversión</span>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            {/* Visual 1 */}
            <motion.div className="absolute w-full flex items-center justify-center" style={{ scale: img1Scale, opacity: img1Opacity, filter: useMotionTemplate`blur(${img1Blur}px)`, zIndex: 10 }}>
              <div role="img" aria-label="Mockup de interfaz Glassmorphism premium diseñada por Albatros dev" className="relative w-full max-w-md aspect-[4/3] rounded-[3rem] overflow-hidden bg-[#050505] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 flex items-center justify-center">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-500 rounded-full blur-[70px] opacity-30" />
                <div className="relative w-[85%] h-[75%] rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl p-10">
                  <div className="flex gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  <div className="space-y-5">
                    <div className="w-full h-12 rounded-2xl bg-gradient-to-r from-white/10 to-transparent border border-white/10" />
                    <div className="w-3/4 h-4 rounded-lg bg-white/5" />
                    <div className="w-1/2 h-4 rounded-lg bg-white/5" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual 2 */}
            <motion.div className="absolute w-full flex items-center justify-center" style={{ scale: img2Scale, opacity: img2Opacity, filter: useMotionTemplate`blur(${img2Blur}px)`, zIndex: 20 }}>
              <div role="img" aria-label="Ejemplo de código TypeScript escalable y moderno" className="w-full max-w-md aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 bg-[#0d1117] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col font-mono text-[11px]">
                <div className="h-12 bg-[#161b22] border-b border-white/5 flex items-center px-8 gap-6 text-white/30">
                  <span className="text-white/70 border-b-2 border-emerald-400 pb-3 translate-y-[1px] font-bold">Hero.tsx</span>
                  <span className="pb-3">layout.tsx</span>
                </div>
                <div className="p-10 leading-relaxed text-white/60 text-left">
                  <p><span className="text-pink-400">import</span> <span className="text-white">{'{'} motion {'}'}</span> <span className="text-pink-400">from</span> <span className="text-emerald-300">'framer-motion'</span>;</p>
                  <p className="mt-4"><span className="text-pink-400">export function</span> <span className="text-blue-400">Hero</span>() {'{'}</p>
                  <p className="pl-5 mt-2"><span className="text-pink-400">return</span> (</p>
                  <p className="pl-10 text-blue-300">&lt;motion.div&gt;</p>
                  <p className="pl-15 text-gray-500">&lt;PremiumUI /&gt;</p>
                  <p className="pl-10 text-blue-300">&lt;/motion.div&gt;</p>
                  <p className="pl-5">);</p>
                  <p>{'}'}</p>
                </div>
              </div>
            </motion.div>

            {/* Visual 3 */}
            <motion.div className="absolute w-full flex items-center justify-center" style={{ scale: img3Scale, opacity: img3Opacity, zIndex: 30 }}>
              <div role="img" aria-label="Gráfica de optimización de conversión y neuromarketing" className="w-full max-w-md aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col p-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
                <div className="relative z-10">
                  <h4 className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black mb-3">Conversion Rate</h4>
                  <p className="text-4xl font-display text-white font-black mb-8">12.4% <span className="text-emerald-400 text-sm ml-4 font-bold italic">↑ +4.2%</span></p>
                  <div className="h-40 flex items-end gap-3 mb-10">
                    {[30, 45, 35, 65, 55, 90, 75, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-purple-500/30 to-purple-400 rounded-t-xl shadow-[0_0_20px_rgba(168,85,247,0.2)]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="w-full py-4 rounded-2xl bg-white text-black font-black text-[11px] flex justify-center items-center gap-3 uppercase tracking-[0.2em] shadow-xl">
                    Optimizar Conversión <span>→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
