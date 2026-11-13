'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EASINGS, SPRINGS } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';

/**
 * NotesAccordion Component
 * Visualizes the fragrance pyramid in olfactory sequence:
 * 1. Head / Top Notes: fast, vaporous dispersion (micro duration)
 * 2. Heart Notes: resonant bloom (spring stagger)
 * 3. Base Notes: deep grounding (settles last with weighted inertia)
 */
export function NotesAccordion({ notes = {} }) {
  const { reducedMotion } = useDeviceProfile();
  const [openSections, setOpenSections] = useState({
    top: true,
    heart: true,
    base: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const layers = [
    {
      id: 'top',
      title: 'Head Notes (Top)',
      timing: '0 – 30 Minutes',
      aroma: notes.top || 'Kashmiri Saffron, Bergamot Zest, Sweet Cardamom',
      desc: 'The initial olfactory halo — volatile, bright botanical essences that greet the senses.',
      color: '#d4941d',
      delay: 0.05,
      transition: { duration: 0.3, ease: EASINGS.diffuse },
      icon: '✨',
    },
    {
      id: 'heart',
      title: 'Heart Notes (Core)',
      timing: '30 Minutes – 4 Hours',
      aroma: notes.heart || 'Cambodian Oud (Heartwood), Rosa Damascena, Geranium',
      desc: 'The emotional signature of the fragrance — resonant floral and spicy accords that unfurl as top notes dissipate.',
      color: '#c4841d',
      delay: 0.15,
      transition: SPRINGS.layout,
      icon: '🏺',
    },
    {
      id: 'base',
      title: 'Base Notes (Grounding)',
      timing: '4 – 24+ Hours',
      aroma: notes.base || 'Mysore Sandalwood, Rare Black Ambergris, Deer-free Natural Musk',
      desc: 'The majestic foundation — heavy, resinous oils that anchor to skin and fabric for days.',
      color: '#8c501c',
      delay: 0.28,
      transition: { duration: 0.8, ease: EASINGS.settle },
      icon: '🪵',
    },
  ];

  return (
    <div
      className="notes-accordion"
      style={{
        background: 'var(--ground-field)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        margin: 'var(--space-lg) 0',
      }}
    >
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          Olfactory Composition Pyramid
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
          Unfurls across three temporal layers from initial application to deep dry-down
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {layers.map((layer) => {
          const isOpen = openSections[layer.id];

          return (
            <div
              key={layer.id}
              style={{
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: isOpen ? 'var(--ground-raised)' : 'transparent',
                overflow: 'hidden',
                transition: 'background 200ms ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggleSection(layer.id)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{layer.icon}</span>
                  <div>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)' }}>
                      {layer.title}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      {layer.timing}
                    </span>
                  </div>
                </div>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={SPRINGS.layout}
                  style={{ color: 'var(--accent)', fontSize: '0.85rem' }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reducedMotion ? {} : { height: 0, opacity: 0 }}
                    animate={
                      reducedMotion
                        ? {}
                        : {
                            height: 'auto',
                            opacity: 1,
                            transition: layer.transition,
                          }
                    }
                    exit={
                      reducedMotion
                        ? {}
                        : {
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.2, ease: EASINGS.exhale },
                          }
                    }
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '0 16px 14px 16px',
                        borderTop: '1px solid var(--border)',
                        paddingTop: '10px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.95rem',
                          color: 'var(--ink)',
                          fontWeight: 500,
                          marginBottom: '4px',
                        }}
                      >
                        {layer.aroma}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                        {layer.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
