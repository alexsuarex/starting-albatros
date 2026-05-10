'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyCardProps {
  children: ReactNode;
  index: number;
  totalCards: number;
  className?: string;
}

export function StickyCard({
  children,
  index,
  totalCards,
  className = '',
}: StickyCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh]">
      <motion.div
        className={`sticky top-24 md:top-32 origin-top ${className}`}
        style={{
          scale,
          top: `calc(6rem + ${index * 28}px)`,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
