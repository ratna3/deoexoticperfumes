'use client';

import { ScentCard } from '@/components/ui/scent-card';

/**
 * ProductCard forwards to ScentCard, preserving the public interface
 * while delivering olfactory motion, scent diffusion background, and touch feedback.
 */
export function ProductCard({ product, index = 0 }) {
  return <ScentCard product={product} index={index} />;
}
