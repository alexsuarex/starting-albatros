'use client';

import { IconZoomScan, IconLayoutGrid, IconCircleCheck } from '@tabler/icons-react';
import { FadeIn } from '@/components/motion/FadeIn';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { CursorGlow } from '@/components/motion/CursorGlow';

const steps = [
  {
    number: '01',
    icon: IconZoomScan,
    title: 'Auditoría gratis',
    description:
      'Llenas un formulario corto y en 48 horas recibes un PDF con qué te falta, qué te está costando dinero y qué camino te conviene. Si la conclusión es "no nos contrates todavía", te lo decimos.',
    floatClass: 'animate-float',
  },
  {
    number: '02',
    icon: IconLayoutGrid,
    title: 'Eliges tu plan',
    description:
      'Cuatro paquetes con precio público en esta misma página. El que se ajuste a lo que necesitas. Pagas el cincuenta por ciento y arrancamos al día siguiente.',
    floatClass: 'animate-float-delay-1',
  },
  {
    number: '03',
    icon: IconCircleCheck,
    title: 'Recibes en plazo',
    description:
      'Cinco, siete, catorce o veintiún días según el plan. Si no entregamos a tiempo, te devolvemos lo pagado. Sin discusión.',
    floatClass: 'animate-float-delay-2',
  },
];

export function HowItWorks() {
  return (
    <section
      id="day-1-audit"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      <CursorGlow className="absolute inset-0" size={500} opacity={0.1} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Day badge */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#BBCCD7] animate-day-pulse" />
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Día 1 · Auditoría</span>
          </div>
        </FadeIn>

        <AnimatedText
          text="Cómo trabajamos contigo"
          className="font-display text-[clamp(2rem,6vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#FAFAF7] mb-4"
        />

        <FadeIn delay={0.1} y={20}>
          <p className="text-white/40 text-lg max-w-xl mb-16">
            Tres pasos. Sin reuniones eternas. Sin cotizaciones que tardan semanas.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.15} y={30} className="h-full">
              <div className="relative group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-400 h-full flex flex-col">
                {/* Light halo behind icon */}
                <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-[#1A2B3C]/20 blur-xl group-hover:bg-[#1A2B3C]/30 transition-all duration-500" />

                <div className={`relative mb-6 ${step.floatClass}`}>
                  <step.icon size={32} strokeWidth={1.25} className="text-[#BBCCD7]" />
                </div>

                <span className="text-xs font-medium text-white/20 tracking-wider">{step.number}</span>
                <h3 className="font-display text-xl font-medium text-[#FAFAF7] mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
