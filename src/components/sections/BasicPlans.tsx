'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { CountUp } from '@/components/motion/CountUp';
import {
  IconBrowser,
  IconMapPinSearch,
  IconCheck,
  IconBolt,
  IconShieldCheck,
  IconArrowUpRight,
  IconSparkles,
} from '@tabler/icons-react';
import { trackEvent } from '@/lib/analytics';

type Plan = {
  id: string;
  icon: typeof IconBrowser;
  name: string;
  price: number;
  priceLabel: string;
  badge?: string;
  tagline: string;
  delivery: string;
  includes: string[];
  cta: string;
  waLink: string;
  accent: string;
  accentSoft: string;
};

const plans: Plan[] = [
  {
    id: 'essential',
    icon: IconBrowser,
    name: 'Web Esencial',
    price: 390,
    priceLabel: 'pago único',
    tagline: 'Presencia digital profesional sin complicaciones.',
    delivery: '5 días',
    includes: [
      'Sitio web one-page React',
      'Diseño High-End UX/UI',
      'Optimización Mobile-First',
      'Hosting & Dominio (1 año)',
      'Botón WhatsApp Directo',
      'Google Analytics 4',
    ],
    cta: 'Quiero la Web Esencial',
    waLink: 'https://wa.me/5216121670637?text=Hola%2C%20quiero%20el%20paquete%20Web%20Esencial',
    accent: '#6366F1',
    accentSoft: 'rgba(99,102,241,0.12)',
  },
  {
    id: 'local-seo',
    icon: IconMapPinSearch,
    name: 'Web + SEO Local',
    price: 690,
    priceLabel: 'pago único',
    badge: 'Más Vendido',
    tagline: 'Domina las búsquedas locales en tu ciudad.',
    delivery: '7 días',
    includes: [
      'Todo lo de Web Esencial',
      'Optimización Google Maps',
      'Investigación de Keywords',
      'SEO Técnico On-Page',
      'Schema Markup Local',
      'Google Search Console',
    ],
    cta: 'Quiero Web + SEO Local',
    waLink: 'https://wa.me/5216121670637?text=Hola%2C%20quiero%20Web%20%2B%20SEO%20Local',
    accent: '#0A0A0A',
    accentSoft: 'rgba(10,10,10,0.08)',
  },
];

export function BasicPlans() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const headlineY = useTransform(smooth, [0, 1], [40, -40]);
  const blobYA = useTransform(smooth, [0, 1], [-60, 60]);
  const blobYB = useTransform(smooth, [0, 1], [60, -60]);

  return (
    <section
      ref={containerRef}
      id="plans"
      className="relative py-24 md:py-32 bg-white overflow-hidden rounded-t-[50px] -mt-16 z-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: blobYA }}
          className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: blobYB }}
          className="absolute bottom-[5%] left-[5%] w-[450px] h-[450px] bg-amber-50 rounded-full blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: headlineY }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-indigo-600 text-[9px] font-bold uppercase tracking-[0.4em] mb-4"
          >
            <span className="w-6 h-px bg-indigo-600/30" />
            Soluciones de Entrada
            <span className="w-6 h-px bg-indigo-600/30" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#0A0A0A] mb-5"
          >
            Visibilidad{' '}
            <span className="serif italic text-indigo-600 font-medium">instantánea.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-black/50 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto"
          >
            Sin mensualidades. Solo la mejor tecnología para que tu negocio empiece a existir donde están tus clientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center gap-8 mt-8"
          >
            {[
              { v: '100%', l: 'Propiedad' },
              { v: '$0', l: 'Mensual' },
              { v: '5★', l: 'Calidad' },
            ].map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center px-4 [&:not(:first-child)]:border-l border-black/10"
              >
                <span className="text-xl font-display text-[#0A0A0A]">
                  {s.v}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 mt-0.5">
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PlanShowcase key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/[0.02] border border-black/5">
            <IconShieldCheck size={16} className="text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
              Garantía de satisfacción
            </span>
          </div>
          <p className="text-black/20 text-[11px] font-medium italic">
            ¿Necesitas algo más grande? Mira los planes avanzados ↓
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PlanShowcase({ plan, index }: { plan: Plan; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const isFeatured = plan.id === 'local-seo';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative will-change-transform h-full"
    >
      <div
        className={`relative h-full p-7 md:p-9 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 ${
          isFeatured
            ? 'bg-[#0A0A0A] text-white shadow-2xl'
            : 'bg-[#FAFAF9] text-[#0A0A0A] border border-black/[0.04] shadow-lg'
        }`}
      >
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0.4,
            scale: hovered ? 1.1 : 1,
          }}
          className="absolute -top-24 -right-16 w-64 h-64 rounded-full blur-[60px] pointer-events-none"
          style={{
            background: isFeatured
              ? 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }}
        />

        {plan.badge && (
          <div className="absolute top-5 right-5 z-20">
            <div className="relative flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
              <IconBolt size={10} fill="currentColor" />
              {plan.badge}
            </div>
          </div>
        )}

        <div className="relative z-10 flex items-start gap-4 mb-7">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isFeatured
                ? 'bg-white/10 border border-white/15 text-white'
                : 'bg-white border border-black/5 text-indigo-600 shadow-sm'
            }`}>
            <plan.icon size={22} strokeWidth={1.5} />
          </div>
          <div className="pt-0.5">
            <h3 className={`font-display text-xl md:text-2xl mb-1 tracking-tight ${isFeatured ? 'text-white' : 'text-[#0A0A0A]'}`}>
              {plan.name}
            </h3>
            <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] ${isFeatured ? 'text-white/30' : 'text-black/35'}`}>
              <span className={`w-1 h-1 rounded-full ${isFeatured ? 'bg-indigo-400' : 'bg-indigo-500'}`} />
              Entrega en {plan.delivery}
            </div>
          </div>
        </div>

        <p className={`relative z-10 text-sm md:text-base font-light leading-relaxed mb-6 ${isFeatured ? 'text-white/50' : 'text-black/50'}`}>
          {plan.tagline}
        </p>

        <div className="relative z-10 mb-8">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isFeatured ? 'text-white/20' : 'text-black/20'}`}>USD</span>
            <span className={`text-5xl md:text-6xl font-display font-medium tracking-tighter ${isFeatured ? 'text-white' : 'text-[#0A0A0A]'}`}>
              $<CountUp target={plan.price} />
            </span>
          </div>
          <span className={`block mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] ${isFeatured ? 'text-white/20' : 'text-black/20'}`}>
            {plan.priceLabel} · sin mensualidades
          </span>
        </div>

        <div className={`relative z-10 grid grid-cols-2 gap-3 mb-8 pb-8 border-b ${isFeatured ? 'border-white/5' : 'border-black/5'}`}>
          {plan.includes.map((item, i) => (
            <div key={item} className="flex items-start gap-2">
              <div className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${isFeatured ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
                <IconCheck size={9} strokeWidth={3} className={isFeatured ? 'text-indigo-400' : 'text-indigo-600'} />
              </div>
              <span className={`text-[11px] leading-snug font-medium ${isFeatured ? 'text-white/60' : 'text-black/60'}`}>{item}</span>
            </div>
          ))}
        </div>

        <a
          href={plan.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative z-10 mt-auto flex items-center justify-between gap-3 w-full px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
            isFeatured ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#0A0A0A] text-white'
          }`}
        >
          <span className="flex items-center gap-2">{plan.cta}</span>
          <IconArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}
