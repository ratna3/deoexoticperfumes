'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useCart } from '@/app/context/CartContext';
import { formatPrice } from '@/app/data/products';
import { EASINGS, SPRINGS, DURATIONS } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';
import styles from '@/app/components/ProductCard.module.css';

/**
 * ScentCard Component
 * Olfactory bottle card with scent-color aura diffusion,
 * 1.03 image scaling, and tactile touch feedback.
 */
export function ScentCard({ product, index = 0 }) {
  const { addItem, setIsCartOpen } = useCart();
  const { input, reducedMotion, motionScale } = useDeviceProfile();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const scentColor = product.scentColor || (product.category === 'Attar' ? '#c4841d' : '#8c7851');
  const isTouch = input === 'touch';

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const descriptiveAlt = `${product.name} — Handcrafted ${product.category} in luxury crystal flacon, Deo Exotic`;

  return (
    <motion.article
      className={`product-card ${styles.scentCardWrapper || ''}`}
      id={`product-${product.id}`}
      onHoverStart={() => !isTouch && setIsHovered(true)}
      onHoverEnd={() => !isTouch && setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={!reducedMotion ? { scale: 0.97, transition: SPRINGS.press } : undefined}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--ground-raised)',
        willChange: 'transform',
      }}
    >
      {/* Olfactory Scent Aura (Diffuses outward on hover/focus) */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          isHovered && !reducedMotion
            ? {
                opacity: 0.22,
                scale: 1.25,
                background: `radial-gradient(circle at center, ${scentColor} 0%, transparent 70%)`,
              }
            : {
                opacity: 0,
                scale: 0.8,
                background: `radial-gradient(circle at center, ${scentColor} 0%, transparent 70%)`,
              }
        }
        transition={{
          duration: DURATIONS.standard,
          ease: EASINGS.diffuse,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(20px)',
        }}
      />

      {/* Card Image */}
      <Link
        href={`/product/${product.id}`}
        className="product-card__image"
        aria-label={`View ${product.name}`}
        style={{ position: 'relative', display: 'block', overflow: 'hidden', zIndex: 2 }}
      >
        <motion.div
          animate={
            isHovered && !reducedMotion && !isTouch
              ? { scale: 1.03 }
              : { scale: 1.0 }
          }
          transition={{
            duration: DURATIONS.standard,
            ease: EASINGS.diffuse,
          }}
          style={{ width: '100%', height: '100%', position: 'relative', willChange: 'transform' }}
        >
          <Image
            src={product.image || '/images/Royal-bottle.png'}
            alt={descriptiveAlt}
            fill
            loading={index < 4 ? 'eager' : 'lazy'}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        {product.badge && (
          <span className="product-card__badge" style={{ zIndex: 3 }}>
            {product.badge}
          </span>
        )}
      </Link>

      {/* Body & Olfactory Notes */}
      <div className="product-card__body" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-card__category">{product.category}</span>
          {product.nodes && product.nodes.length > 0 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {product.nodes[0]}
            </span>
          )}
        </div>

        <h3 className="product-card__title">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {product.notes?.top && (
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--ink-muted)',
              margin: '4px 0 8px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Notes: {product.notes.top}
          </p>
        )}

        <div className="product-card__price">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <del>{formatPrice(product.originalPrice)}</del>
          )}
        </div>
      </div>

      {/* Tactile Actions */}
      <div
        className={styles.quickActions || 'product-card__actions'}
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 var(--space-lg) var(--space-lg)',
          display: 'flex',
          gap: 'var(--space-sm)',
        }}
      >
        <button
          type="button"
          className={`btn ${isAdded ? 'btn-ghost' : 'btn-primary'}`}
          onClick={handleAdd}
          id={`add-to-cart-${product.id}`}
          style={{
            flex: 1,
            borderColor: isAdded ? 'var(--accent)' : undefined,
            color: isAdded ? 'var(--accent)' : undefined,
          }}
          aria-live="polite"
        >
          {isAdded ? 'Added ✓' : 'Add to Bag'}
        </button>
        <Link
          href={`/product/${product.id}`}
          className="btn btn-secondary"
          style={{ padding: '14px 18px' }}
        >
          View
        </Link>
      </div>
    </motion.article>
  );
}
