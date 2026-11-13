'use client';

import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=';

/**
 * EncryptedText (Aceternity UI convention)
 * Progressively reveals characters through a cipher shuffle animation.
 */
export function EncryptedText({
  text = '',
  interval = 40,
  characters = DEFAULT_CHARS,
  className = '',
  trigger = false,
  revealSpeed = 2,
  onComplete,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealing, setIsRevealing] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length;

    const tick = () => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration += revealSpeed;

      if (iteration <= maxIterations + 4) {
        frameRef.current = setTimeout(tick, interval);
      } else {
        setDisplayText(text);
        setIsRevealing(false);
        if (onComplete) onComplete();
      }
    };

    setIsRevealing(true);
    frameRef.current = setTimeout(tick, interval);

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [trigger, text, interval, characters, revealSpeed, onComplete]);

  return (
    <span className={`encrypted-text ${className}`}>
      {displayText}
    </span>
  );
}
