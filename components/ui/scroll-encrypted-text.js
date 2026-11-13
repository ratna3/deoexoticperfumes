'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { EASINGS, DURATIONS, BLUR_LADDER } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';

/**
 * ScrollEncryptedText Component
 * Wraps EncryptedText with scroll-in-view detection and olfactory diffusion.
 * Automatically adapts decryption pacing to paragraph length.
 */
export function ScrollEncryptedText({
  text,
  as: Component = 'p',
  className = '',
  delay = 0.1,
  style = {},
  id,
}) {
  const { reducedMotion, motionScale } = useDeviceProfile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasEncrypted, setHasEncrypted] = useState(false);

  // If text is not plain string or user requested reduced motion, render clean text
  if (typeof text !== 'string' || reducedMotion || motionScale === 0) {
    return (
      <Component ref={ref} className={className} style={style} id={id}>
        {text}
      </Component>
    );
  }

  // Calculate pacing dynamically based on length
  // 50 chars -> revealSpeed: 2, interval: 25ms (~600ms total)
  // 250 chars -> revealSpeed: 6, interval: 20ms (~800ms total)
  const length = text.length;
  const revealSpeed = Math.max(2, Math.round(length / 35));
  const interval = Math.max(16, Math.min(35, Math.round(700 / (length / revealSpeed))));

  return (
    <Component ref={ref} className={className} style={style} id={id}>
      <motion.span
        initial={{
          opacity: 0,
          y: '0.25em',
          filter: `blur(${BLUR_LADDER.body.from}px)`,
        }}
        animate={isInView ? {
          opacity: 1,
          y: '0em',
          filter: 'blur(0px)',
        } : {}}
        transition={{
          duration: DURATIONS.standard * Math.max(0.6, motionScale),
          delay,
          ease: EASINGS.diffuse,
        }}
        style={{ display: 'inline-block', willChange: 'filter, transform, opacity' }}
      >
        <EncryptedText
          text={text}
          trigger={isInView}
          revealSpeed={revealSpeed}
          interval={interval}
          onComplete={() => setHasEncrypted(true)}
        />
      </motion.span>
    </Component>
  );
}
