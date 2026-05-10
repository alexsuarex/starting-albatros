'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface CursorGlowProps {
  children?: ReactNode;
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}

export function CursorGlow({
  children,
  color = '26, 43, 60',
  size = 400,
  opacity = 0.15,
  className = '',
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.innerWidth < 768) return; // skip on mobile

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
      } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at var(--glow-x) var(--glow-y), rgba(${color}, ${opacity}), transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
