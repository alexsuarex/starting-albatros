'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { CountUp } from '@/components/motion/CountUp';
import { GradientText } from '@/components/motion/GradientText';
import { IconRocket, IconTrendingUp, IconCheck, IconShieldCheck, IconArrowRight } from '@tabler/icons-react';
import { trackEvent } from '@/lib/analytics';

const plans = [
  {
    id: 'growth',
    icon: IconRocket, 
    name: 'Plan Crecimiento', 
    featured: true, 
    badge: 'Recomendado',
    price: 1890, 
    monthly: 189, 
    tagline: 'Tu mejor vendedor trabajando 24 horas.',
    delivery: '14 días',
    includes: ['Sitio web custom','SEO Local + Maps','Chatbot Albi con IA','Agendamiento Automático','Automatización n8n'],
    cta: 'Plan Crecimiento',
    waLink: 'https://wa.me/5216121670637?text=Hola%2C%20quiero%20el%20Plan%20Crecimiento',
    color: 'indigo'
  },
  {
    id: 'performance',
    icon: IconTrendingUp, 
    name: 'Plan Performance', 
    featured: false,
    price: 3490, 
    monthly: 349, 
    tagline: 'El sistema completo para escalar.',
    delivery: '21 días',
    includes: ['Web custom (10 sec)','Identidad Visual','Albi Avanzado','3 Automatizaciones n8n','Setup Ads & Email','Soporte Prioritario'],
    cta: 'Plan Performance',
    waLink: 'https://wa.me/5216121670637?text=Hola%2C%20quiero%20el%20Plan%20Performance',
    color: 'emerald'
  }
];

export function AdvancedPlans() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} id="advanced-plans" className="relative h-[250vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.4, 0.5, 1], [0.8, 0.8, 0, 0]) }}
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px]" 
          />
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.5, 0.6, 1], [0, 0, 0.8, 0.8]) }}
            className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" 
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-emerald-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">Inversión Inteligente</span>
              <AnimatedText text="Escala sin sumar empleados." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white mb-6" />
              <p className="text-white/40 text-base md:text-lg max-w-sm leading-relaxed mb-8 font-light italic">
                Tu infraestructura digital no es un gasto. Es el motor que libera tu tiempo mientras el negocio crece.
              </p>
              
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-white/50 group cursor-default">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                    <IconShieldCheck className="text-emerald-400 w-4.5 h-4.5" />
                  </div>
                  <span className="text-[13px] font-medium">Garantía de Satisfacción 100%</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 group cursor-default">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                    <IconShieldCheck className="text-emerald-400 w-4.5 h-4.5" />
                  </div>
                  <span className="text-[13px] font-medium">Soporte Técnico 24/7</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[550px] w-full flex items-center justify-center">
             {plans.map((plan, i) => (
               <StageCard key={plan.id} plan={plan} index={i} scrollYProgress={smoothProgress} />
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function StageCard({ plan, index, scrollYProgress }: { plan: any, index: number, scrollYProgress: any }) {
  // Adjusted ranges to avoid overlap and glitches
  const start = index === 0 ? 0 : 0.55; 
  const end = index === 0 ? 0.45 : 1;

  const opacity = useTransform(scrollYProgress, 
    index === 0 ? [0, 0.45, 0.55] : [0.45, 0.55, 1], 
    index === 0 ? [1, 1, 0] : [0, 1, 1]
  );

  const y = useTransform(scrollYProgress,
    index === 0 ? [0, 0.45, 0.55] : [0.45, 0.55, 1],
    index === 0 ? [0, 0, -100] : [100, 0, 0]
  );

  const scale = useTransform(scrollYProgress,
    index === 0 ? [0, 0.45, 0.55] : [0.45, 0.55, 1],
    index === 0 ? [1, 1, 0.95] : [0.95, 1, 1]
  );

  const pointerEvents = useTransform(opacity, (o: number) => o > 0.5 ? 'auto' : 'none');

  return (
    <motion.div 
      style={{ opacity, y, scale, zIndex: index === 0 ? 50 : 51, pointerEvents }}
      className="absolute w-full max-w-[380px]"
    >
      <div className={`relative p-7 md:p-9 rounded-[2.5rem] border bg-[#0A0A0A] shadow-2xl transition-all duration-500 ${plan.featured ? 'border-white/15' : 'border-white/5'}`}>
        
        {plan.featured && (
          <div className="absolute inset-0 bg-indigo-500/5 rounded-[2.5rem] blur-[30px] -z-10" />
        )}

        <div className="flex justify-between items-start mb-8">
          <div className={`w-14 h-14 rounded-2xl bg-${plan.color}-500/10 text-${plan.color}-400 border border-${plan.color}-500/20 flex items-center justify-center shadow-lg`}>
            <plan.icon size={26} strokeWidth={1.5} />
          </div>
          {plan.badge && (
            <span className="px-4 py-1.5 rounded-full bg-white/5 text-white text-[9px] font-black uppercase tracking-[0.2em] border border-white/10">
              {plan.badge}
            </span>
          )}
        </div>

        <h3 className="font-display text-3xl text-white mb-2 tracking-tight">{plan.name}</h3>
        <p className="text-white/40 text-sm mb-8 leading-relaxed font-light italic">{plan.tagline}</p>

        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm text-white/20 font-bold">$</span>
          {/* Unifying effect: High-End CountUp with Gradient and sharp rendering */}
          <span className="text-5xl font-display font-medium text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <CountUp target={plan.price} />
          </span>
          <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold ml-1">USD Setup</span>
        </div>
        
        <p className="text-emerald-400 text-[11px] font-bold mb-10 flex items-center gap-1.5 italic">
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          +$<CountUp target={plan.monthly} /> USD/mes mtto
        </p>

        <div className="space-y-3.5 mb-10">
          {plan.includes.map((item: string) => (
            <div key={item} className="flex items-start gap-3 text-white/40 group/item">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <IconCheck size={10} className="text-emerald-400" strokeWidth={3} />
              </div>
              <span className="text-[12px] font-medium group-hover/item:text-white/70 transition-colors">{item}</span>
            </div>
          ))}
        </div>

        <a 
          href={plan.waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackEvent('plan_cta_click', { plan: plan.id })}
          className={`group relative flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden ${plan.featured ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
        >
          <span className="relative z-10">{plan.cta}</span>
          <IconArrowRight size={16} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
        </a>

        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center opacity-20">
           <p className="text-[9px] uppercase tracking-[0.15em] font-bold">Entrega: {plan.delivery}</p>
           <div className="flex gap-1">
              {[1,2].map(dot => <div key={dot} className="w-1 h-1 rounded-full bg-white" />)}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
