'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { GradientText } from '@/components/motion/GradientText';
import { IconChevronDown } from '@tabler/icons-react';

const faqs = [
  { q: '¿Cuánto tiempo tarda en estar listo?', a: 'Depende del plan. Web Esencial en 5 días, Web + SEO en 7, Crecimiento en 14, Performance en 21. Son plazos reales, no estimaciones optimistas.' },
  { q: '¿Qué pasa si no entregan a tiempo?', a: 'Te devolvemos el 100% del setup. Sin preguntas, sin formularios, sin negociación. Está en nuestros términos.' },
  { q: '¿Los precios son en pesos o dólares?', a: 'En dólares USD. Aceptamos transferencia bancaria, tarjeta o PayPal.' },
  { q: '¿Necesito saber de tecnología?', a: 'No. Nosotros configuramos todo. Tú solo apruebas el resultado y usas el producto final.' },
  { q: '¿El chatbot puede atender en inglés?', a: 'Sí. Albi detecta el idioma del cliente y responde en español o inglés automáticamente.' },
  { q: '¿Puedo cancelar la mensualidad?', a: 'Sí. Puedes cancelar en cualquier momento. El sitio web y el dominio siguen siendo tuyos.' },
  { q: '¿Qué incluye la auditoría gratuita?', a: 'Un PDF de 6 páginas con: análisis de tu Google Maps, análisis técnico de tu web (si tienes), estado de tu WhatsApp Business, 5 problemas concretos detectados, estimación de dinero perdido, y 3 caminos posibles.' },
  { q: '¿Trabajan solo en La Paz?', a: 'No. Trabajamos con negocios de cualquier ciudad. La entrega es 100% digital.' },
  { q: '¿Qué pasa después de la entrega?', a: 'En planes con mensualidad (Crecimiento y Performance), seguimos optimizando tu presencia cada mes. En planes de pago único, te entregamos el producto y si necesitas mantenimiento, lo contratas como add-on.' },
  { q: '¿Puedo empezar con un plan básico y escalar después?', a: 'Sí. Muchos clientes empiezan con Web Esencial y cuando ven resultados, escalan a Crecimiento. El upgrade tiene precio preferencial.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-32 rounded-t-[40px] md:rounded-t-[60px] z-30" style={{ background: '#FAFAF7' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-[clamp(2rem,6vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em] mb-12">
            <GradientText>Preguntas frecuentes</GradientText>
          </h2>
        </FadeIn>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="border-b border-[#0A0A0A]/8">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left group" aria-expanded={openIndex === i}>
                  <span className="font-medium text-[#0A0A0A] text-sm md:text-base pr-4 group-hover:text-[#1A2B3C] transition-colors">{faq.q}</span>
                  <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <IconChevronDown size={18} className="text-[#9A9A9A] shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="overflow-hidden">
                      <p className="text-[#6B6B6B] text-sm leading-relaxed pb-5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
    </section>
  );
}
