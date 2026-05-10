'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { GradientText } from '@/components/motion/GradientText';

// Particles generated ONLY after mount to prevent hydration errors
const DustParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number, left: string, top: string, size: string, duration: number, delay: number }>>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 1.5 + 1 + 'px',
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white blur-[0.5px]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 80, mass: 0.5 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Standard initial position
    rawMouseX.set(window.innerWidth / 2);
    rawMouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 25,
    restDelta: 0.001
  });

  const maskSize = useTransform(smoothProgress, [0, 0.4], [160, 4000]);
  const maskImageTemplate = useMotionTemplate`radial-gradient(${maskSize}px circle at ${mouseX}px ${mouseY}px, transparent 30%, rgba(0,0,0,0.85) 65%, black 100%)`;
  
  const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(smoothProgress, [0.3, 0.5], [20, 0]);
  const textScale = useTransform(smoothProgress, [0.3, 0.5], [0.98, 1]);
  const hintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  const ringX = useMotionTemplate`calc(${mouseX}px - 50%)`;
  const ringY = useMotionTemplate`calc(${mouseY}px - 50%)`;
  const ringOpacity = useTransform(smoothProgress, [0, 0.15], [0.8, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[200vh] bg-[#000000]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-start">
        
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/videos/hero_video_scrub.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          {isClient && <DustParticles />}
        </div>

        {isClient && (
          <motion.div
            className="absolute inset-0 z-10 bg-[#050505]"
            style={{
              WebkitMaskImage: maskImageTemplate,
              maskImage: maskImageTemplate,
            }}
          />
        )}

        {isClient && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center gap-1.5"
            style={{ opacity: hintOpacity }}
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
            <div className="whitespace-nowrap text-white/30 tracking-[0.2em] text-[9px] font-bold">
              EXPLORA & DESLIZA
            </div>
          </motion.div>
        )}

        {isClient && (
          <motion.div
            className="absolute pointer-events-none z-50 mix-blend-difference"
            style={{ x: mouseX, y: mouseY, opacity: hintOpacity }}
          >
            <div className="absolute w-1 h-1 bg-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_white]" />
          </motion.div>
        )}

        {isClient && (
          <motion.div
            className="absolute top-0 left-0 z-20 pointer-events-none rounded-full border border-white/5"
            style={{
              width: maskSize,
              height: maskSize,
              x: ringX,
              y: ringY,
              opacity: ringOpacity
            }}
          />
        )}

        <motion.div
          className="relative z-30 w-full px-6 md:px-16 lg:px-24 flex flex-col items-start text-left max-w-5xl"
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 mb-5 backdrop-blur-xl">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
            <span className="text-[9px] font-bold text-white/60 uppercase tracking-[0.15em]">Crecimiento Autónomo</span>
          </div>

          <h1 className="w-full text-left font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight mb-5">
            <span className="text-white">Deja de operar tu negocio.</span>
            <br />
            <GradientText className="font-display font-semibold">
              Empieza a dominarlo.
            </GradientText>
          </h1>

          <div className="w-full flex flex-col items-start text-left">
            <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-light italic">
              Ecosistemas digitales impulsados por IA que captan, convierten y escalan tus ventas de forma autónoma.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-4 relative z-50">
              <div className="relative">
                <a
                  href="#audit-form"
                  className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-[0.1em] text-[11px] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 text-black">Aplicar a Auditoría</span>
                </a>
              </div>
              
              <div className="relative">
                <a
                  href="#plans"
                  className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-black/40 text-white border border-white/10 font-black uppercase tracking-[0.1em] text-[11px] backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:border-white/20 active:scale-[0.98]"
                >
                  <span className="relative z-10 text-white">Explorar Planes</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
