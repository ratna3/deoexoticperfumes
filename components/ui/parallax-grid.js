'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useDeviceProfile } from '@/components/providers/device-provider';

/**
 * ParallaxGrid Component
 * Asymmetric parallax grid with alternating column scroll velocities.
 * Amplitude scales dynamically via device motionScale.
 * Touch & reduced motion degrade gracefully to steady layout.
 */
export function ParallaxGrid({
  children,
  className = '',
  amplitude = 40,
  style = {},
}) {
  const containerRef = useRef(null);
  const { reducedMotion, motionScale } = useDeviceProfile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Effective amplitude modulated by motionScale
  const effectiveAmp = reducedMotion ? 0 : amplitude * motionScale;

  // Odd and even column shifts
  const yEven = useTransform(scrollYProgress, [0, 1], [-effectiveAmp, effectiveAmp]);
  const yOdd = useTransform(scrollYProgress, [0, 1], [effectiveAmp * 0.7, -effectiveAmp * 0.7]);

  const items = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={`parallax-grid ${className}`} style={style}>
      {items.map((child, index) => {
        const isOdd = index % 2 === 1;
        const yOffset = isOdd ? yOdd : yEven;

        if (reducedMotion || motionScale === 0) {
          return (
            <div key={index} className="parallax-grid-item">
              {child}
            </div>
          );
        }

        return (
          <motion.div
            key={index}
            className="parallax-grid-item"
            style={{ y: yOffset, willChange: 'transform' }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
