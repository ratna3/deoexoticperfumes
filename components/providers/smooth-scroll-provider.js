'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { frame, cancelFrame } from 'motion/react';
import { useDeviceProfile } from './device-provider';

const LenisContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const { reducedMotion, lowPower } = useDeviceProfile();
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Disable smooth scroll for users preferring reduced motion or running on low power
    if (reducedMotion || lowPower) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
        if (typeof window !== 'undefined') window.__lenis = null;
      }
      return;
    }

    // Initialize Lenis with autoRaf: false
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential decay
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      autoRaf: false, // Driven strictly by Motion's frame ticker
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    if (typeof window !== 'undefined') window.__lenis = lenis;

    // Drive Lenis from Motion's frame ticker
    const updateRaf = (data) => {
      // data.timestamp is passed by Motion's frame loop
      lenis.raf(data.timestamp || performance.now());
    };

    frame.update(updateRaf, true);

    return () => {
      cancelFrame(updateRaf);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      if (typeof window !== 'undefined') window.__lenis = null;
    };
  }, [reducedMotion, lowPower]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
