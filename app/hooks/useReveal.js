'use client';

import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Find all elements with class 'reveal' within the container (or the element itself)
    const targets = el.classList.contains('reveal') ? [el] : el.querySelectorAll('.reveal');
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-40px' }
    );

    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
