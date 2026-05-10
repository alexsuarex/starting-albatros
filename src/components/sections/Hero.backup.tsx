'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { GradientText } from '@/components/motion/GradientText';
import { CursorGlow } from '@/components/motion/CursorGlow';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // By making the section 250vh tall and the content sticky, 
  // we have plenty of scroll distance to scrub the video timeline.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Pause video explicitly on mount to prevent any weird browser auto-play behavior
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Link scroll progress to video playback (Apple style scrubbing)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      // Small offset (0.999) to prevent jumping back to start if duration is exact
      const targetTime = latest * (videoRef.current.duration * 0.999);
      
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = targetTime;
        }
      });
    }
  });

  // Fade out and move text up quickly as the user scrolls
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  // Darken the background slightly as we scroll deep into the video to transition to next section
  const overlayOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[250vh] bg-[#0A0A0A]"
    >
      {/* Sticky container that stays in view while scrolling the 250vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            ref={videoRef}
            src="/videos/hero_video_scrub.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          {/* Gradient to darken the left side slightly for text readability, leaving the right side 100% visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent w-[60%]" />
          {/* Bottom gradient to blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent h-1/3 mt-auto" />
          
          {/* Scroll fade out overlay */}
          <motion.div 
            className="absolute inset-0 bg-[#0A0A0A] pointer-events-none" 
            style={{ opacity: overlayOpacity }} 
          />
        </div>

        <CursorGlow className="absolute inset-0 z-[2]" size={500} opacity={0.12} />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Reduced max-width and moved slightly up to avoid covering the laptop in the video */}
          <div className="max-w-2xl -mt-10">
            <FadeIn delay={0.15} y={40}>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.03em] mb-6">
                <span className="text-white/50">Las agencias normales tardan tres meses.</span>
                <br />
                <GradientText className="font-display">
                  Nosotros, siete días.
                </GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.45} y={20}>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
                Web profesional, Google Maps optimizado y automatización con IA para negocios que quieren crecer sin contratar más equipo.
              </p>
            </FadeIn>

            <div className="flex flex-wrap gap-4">
              <FadeIn delay={0.6} y={20}>
                <a
                  href="#audit-form"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAFAF7] text-[#0A0A0A] font-medium text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
                >
                  Pedir auditoría gratis
                </a>
              </FadeIn>
              <FadeIn delay={0.65} y={20}>
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 text-white/80 border border-white/10 font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
                >
                  Ver paquetes
                </a>
              </FadeIn>
            </div>

            <FadeIn delay={0.75} y={10}>
              <p className="text-white/40 text-sm mt-8">
                Auditoría entregada en 48 horas · sin compromiso · sin tarjeta
              </p>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
