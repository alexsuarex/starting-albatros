'use client';

import { type ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className = '',
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={`
        bg-clip-text text-transparent
        bg-gradient-to-b from-[#646973] to-[#BBCCD7]
        ${animate ? 'animate-gradient-shift bg-[length:200%_200%]' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
