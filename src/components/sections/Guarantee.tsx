'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { IconShieldLock, IconClockCheck, IconShieldCheck } from '@tabler/icons-react';

const guarantees = [
  { icon: IconClockCheck, title: 'Garantía de Plazo', body: 'Si no entregamos en la fecha pactada, te devolvemos el costo del setup completo. Sin preguntas.' },
  { icon: IconShieldCheck, title: 'Garantía de Precisión', body: 'Si en 60 días Albi no resuelve el 80% de tus dudas, reiniciamos el entrenamiento sin costo o reembolsamos.' },
];

export function Guarantee() {
  return (
    <section className="relative py-24 md:py-40 bg-[#050505] overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
          >
            <IconShieldLock size={40} strokeWidth={1.5} />
          </motion.div>
          <AnimatedText text="Tu inversión está blindada." className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-normal leading-none tracking-tight text-white mb-6" />
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
            No te ofrecemos esto por generosidad. Te lo ofrecemos porque nuestra infraestructura es a prueba de errores. Si nosotros fallamos, tú no pagas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {guarantees.map((g, i) => (
            <FadeIn key={g.title} delay={0.2 + i * 0.15} y={30}>
              <div className="group relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                  <g.icon size={24} />
                </div>
                <h3 className="font-display text-xl text-white mb-4">{g.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{g.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
