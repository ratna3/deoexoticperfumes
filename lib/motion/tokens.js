/**
 * Olfactory Motion Tokens
 * Deo Exotic Perfumes — Luxury Olfactory Physics
 * 
 * "Diffuses (blur -> clarity), settles with weight, unfurls in layers (top -> heart -> base)"
 */

export const EASINGS = {
  // Primary entrance: exponential deceleration mimicking vapor dispersion
  diffuse: [0.16, 1, 0.3, 1],
  diffuseCss: 'cubic-bezier(0.16, 1, 0.3, 1)',

  // Heavy settle: weighted grounding mimicking dense resins and aged woods
  settle: [0.22, 1, 0.36, 1],
  settleCss: 'cubic-bezier(0.22, 1, 0.36, 1)',

  // Subtle exhale: gradual release mimicking evaporating top notes
  exhale: [0.65, 0, 0.35, 1],
  exhaleCss: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export const DURATIONS = {
  micro: 0.22,     // 220ms - buttons, toggles, tags, tactile response
  standard: 0.75,  // 750ms - cards, accordions, content sections
  hero: 1.4,       // 1400ms - hero titles, grand reveals, sheet backdrops
};

export const SPRINGS = {
  sheet: { type: 'spring', stiffness: 400, damping: 38, mass: 1 },
  layout: { type: 'spring', stiffness: 300, damping: 34, mass: 0.9 },
  press: { type: 'spring', stiffness: 600, damping: 44, mass: 0.5 },
  subtle: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 },
};

export const BLUR_LADDER = {
  display: { from: 15, to: 0 }, // Large titles (h1, h2)
  body: { from: 8, to: 0 },     // Subheadings, paragraphs, chips
};

/**
 * Calculates responsive motion scale multiplier based on viewport and device type
 * @param {number} width - Viewport width in pixels
 * @param {boolean} isTV - Whether device is a Smart TV
 * @returns {number}
 */
export function computeMotionScale(width = 1200, isTV = false) {
  if (isTV) return 0.6;
  if (width < 768) return 0.7;        // Phones
  if (width < 1024) return 0.85;      // Tablets & foldables (folded/unfolded)
  if (width > 1600) {
    const scale = Math.sqrt(1600 / width);
    return Math.max(0.6, Math.min(1.0, Number(scale.toFixed(3))));
  }
  return 1.0;                         // Standard Desktop
}

export const PYRAMID_STAGGER = {
  top: 0.04,     // Top notes: light, rapid dispersion (40ms interval)
  heart: 0.08,   // Heart notes: bloom with medium cadence (80ms interval)
  base: 0.14,    // Base notes: anchored, deliberate grounding (140ms interval)
};
