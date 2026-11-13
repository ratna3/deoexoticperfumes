'use client';

import React from 'react';
import { motion } from 'motion/react';
import { EASINGS, DURATIONS, BLUR_LADDER } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';

/**
 * DiffusionText Component
 * Olfactory-inspired text reveal: diffuses from blur to clarity (blur 15px -> 0),
 * drifts slightly upward (y: 0.35em -> 0), and fades in (opacity: 0 -> 1).
 * Splits text into words and characters for fine-grained vaporous dispersion.
 */
export function DiffusionText({
  as: Component = 'h1',
  children,
  className = '',
  delay = 0,
  blurLevel = 'display', // 'display' (15px) or 'body' (8px)
  style = {},
  id,
}) {
  const { reducedMotion, motionScale } = useDeviceProfile();

  // If text is not a string (e.g. contains nested JSX like <br/>), we handle intelligently
  const isString = typeof children === 'string';

  if (reducedMotion || motionScale === 0) {
    return (
      <Component className={className} style={style} id={id}>
        {children}
      </Component>
    );
  }

  const initialBlur = blurLevel === 'display' ? BLUR_LADDER.display.from : BLUR_LADDER.body.from;
  const duration = DURATIONS.hero * Math.max(0.6, motionScale);

  // Split string into words and characters
  if (isString) {
    const words = children.split(' ');

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: 0.04,
        },
      },
    };

    const charVariants = {
      hidden: {
        opacity: 0,
        y: '0.35em',
        filter: `blur(${initialBlur}px)`,
      },
      visible: {
        opacity: 1,
        y: '0em',
        filter: 'blur(0px)',
        transition: {
          duration,
          ease: EASINGS.diffuse,
        },
      },
    };

    return (
      <Component className={className} style={style} id={id}>
        <motion.span
          className="diffusion-text-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'inline-block' }}
        >
          {words.map((word, wordIdx) => (
            <span
              key={wordIdx}
              style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}
            >
              {word.split('').map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={charVariants}
                  style={{ display: 'inline-block', willChange: 'filter, transform, opacity' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // Fallback for complex children (elements with <br /> etc)
  return (
    <Component className={className} style={style} id={id}>
      <motion.span
        initial={{
          opacity: 0,
          y: '0.35em',
          filter: `blur(${initialBlur}px)`,
        }}
        whileInView={{
          opacity: 1,
          y: '0em',
          filter: 'blur(0px)',
        }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration,
          delay,
          ease: EASINGS.diffuse,
        }}
        style={{ display: 'inline-block', willChange: 'filter, transform, opacity' }}
      >
        {children}
      </motion.span>
    </Component>
  );
}
