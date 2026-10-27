'use client';

import { useReveal } from '../hooks/useReveal';

export function RevealWrapper({ children, className = '', id = undefined }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
}
