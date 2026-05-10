'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  startOpacity?: number;
  customProgress?: MotionValue<number>;
}

export function AnimatedText({
  text,
  className = '',
  startOpacity = 0.15,
  customProgress,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.4'], // Fallback offset that completes sooner
  });

  const activeProgress = customProgress || scrollYProgress;

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`relative ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const totalChars = text.replace(/ /g, '').length;
            const charsBefore = text
              .split(' ')
              .slice(0, wordIndex)
              .join('')
              .length + charIndex;
            const start = charsBefore / totalChars;
            const end = start + 1 / totalChars;

            return (
              <AnimatedChar
                key={`${wordIndex}-${charIndex}`}
                char={char}
                progress={activeProgress}
                range={[start, end]}
                startOpacity={startOpacity}
              />
            );
          })}
        </span>
      ))}
    </p>
  );
}

function AnimatedChar({
  char,
  progress,
  range,
  startOpacity,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  startOpacity: number;
}) {
  const opacity = useTransform(progress, range, [startOpacity, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
}
