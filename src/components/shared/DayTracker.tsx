'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DayTrackerProps {
  activeDay: number;
}

const days = [
  { day: 0, label: 'Hoy' },
  { day: 1, label: 'Día 1' },
  { day: 2, label: 'Día 2-3' },
  { day: 3, label: 'Día 4-5' },
  { day: 4, label: 'Día 6' },
  { day: 5, label: 'Día 7' },
  { day: 6, label: 'Planes' },
  { day: 7, label: 'Auditoría' },
];

export function DayTracker({ activeDay }: DayTrackerProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-0 items-start">
      {/* Background continuous line for perfect alignment */}
      <div className="absolute left-[5px] top-4 bottom-4 w-[1px] bg-white/10 -z-10" />

      {days.map((d, i) => (
        <div key={i} className="group flex items-center gap-4 py-2 first:pt-0 last:pb-0">
          <div className="relative flex flex-col items-center justify-center w-3 h-3">
            {/* Active connection line */}
            {i > 0 && (
              <div
                className={`absolute bottom-full w-[1px] h-4 transition-colors duration-500 ${
                  i <= activeDay ? 'bg-[#BBCCD7]' : 'bg-transparent'
                }`}
              />
            )}
            
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 relative z-10 ${
                i === activeDay
                  ? 'bg-[#BBCCD7] scale-125 shadow-[0_0_10px_rgba(187,204,215,0.8)]'
                  : i < activeDay
                  ? 'bg-[#BBCCD7]/60'
                  : 'bg-white/15'
              }`}
            />
            
            {/* Pulse effect for active dot */}
            {i === activeDay && (
              <motion.div
                layoutId="day-pulse"
                className="absolute inset-0 rounded-full bg-[#BBCCD7]/20"
                animate={{ scale: [1, 2, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          <span
            className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-500 whitespace-nowrap ${
              i === activeDay
                ? 'text-[#BBCCD7] opacity-100'
                : i < activeDay
                ? 'text-white/40 opacity-100'
                : 'text-white/20 opacity-60'
            }`}
          >
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function useDayTracker() {
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const sections = [
      'hero',
      'day-1-audit',
      'day-2-3-design',
      'day-4-5-seo',
      'day-6-chatbot',
      'day-7-delivery',
      'advanced-plans',
      'audit-form',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target.id);
            if (idx !== -1) setActiveDay(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeDay;
}
