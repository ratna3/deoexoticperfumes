'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EASINGS } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';

/**
 * RollingTally Component
 * Smooth vertical roll / crossfade tweening for quantities and price totals.
 */
export function RollingTally({ value, prefix = '₹', className = '', style = {} }) {
  const { reducedMotion } = useDeviceProfile();
  const formatted = typeof value === 'number' ? value.toLocaleString('en-IN') : String(value);

  if (reducedMotion) {
    return (
      <span className={className} style={{ display: 'inline-flex', ...style }}>
        {prefix}{formatted}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {prefix && <span>{prefix}</span>}
      <span style={{ display: 'inline-flex', position: 'relative' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: '60%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-60%', opacity: 0, filter: 'blur(4px)' }}
            transition={{
              duration: 0.35,
              ease: EASINGS.diffuse,
            }}
            style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
