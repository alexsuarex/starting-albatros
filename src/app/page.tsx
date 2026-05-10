'use client';

import { useSmoothScroll } from '@/lib/smooth-scroll';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { Navigation } from '@/components/shared/Navigation';
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat';
import { DayTracker, useDayTracker } from '@/components/shared/DayTracker';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { DayDesign } from '@/components/sections/DayDesign';
import { DaySEO } from '@/components/sections/DaySEO';
import { DayChatbot } from '@/components/sections/DayChatbot';
import { BasicPlans } from '@/components/sections/BasicPlans';
import { AdvancedPlans } from '@/components/sections/AdvancedPlans';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { Guarantee } from '@/components/sections/Guarantee';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  useSmoothScroll();
  const activeDay = useDayTracker();

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <DayTracker activeDay={activeDay} />

      <main>
        {/* Día 0 — Noche total */}
        <Hero />

        {/* Día 1 — Primeras luces */}
        <HowItWorks />

        {/* Día 2-3 — Wireframe → Diseño */}
        <DayDesign />

        {/* Día 4-5 — Google Maps + SEO */}
        <DaySEO />

        {/* Día 6-7 — Chatbot Albi & Entrega */}
        <DayChatbot />





        {/* Planes básicos — Amanecer (fondo claro) */}
        <BasicPlans />

        {/* Planes avanzados — sticky cards */}
        <AdvancedPlans />

        {/* Auditoría — el segundo momento estrella */}
        <AuditCTA />

        {/* Garantía */}
        <Guarantee />

        {/* FAQ — fondo claro */}
        <FAQ />

        {/* CTA Final — sol pleno */}
        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
