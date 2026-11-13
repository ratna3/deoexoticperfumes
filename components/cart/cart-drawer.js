'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/app/context/CartContext';
import { useLenis } from '@/components/providers/smooth-scroll-provider';
import { useDeviceProfile } from '@/components/providers/device-provider';
import { formatPrice } from '@/app/data/products';
import { SPRINGS, EASINGS } from '@/lib/motion/tokens';
import { RollingTally } from './rolling-tally';

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  const lenis = useLenis();
  const { reducedMotion } = useDeviceProfile();
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');

  const freeShippingThreshold = 1499;
  const isFreeShipping = totalPrice >= freeShippingThreshold || items.length === 0;
  const amountNeeded = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(100, Math.round((totalPrice / freeShippingThreshold) * 100));

  // Lock scroll via Lenis and body when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';

      // Auto-focus close button for a11y focus management
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 100);
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isCartOpen, lenis]);

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'EXOTIC10') {
      const disc = Math.round(totalPrice * 0.1);
      setDiscount(disc);
      setPromoApplied({ code: 'EXOTIC10', label: '10% Royal Welcome Discount', discount: disc });
      setPromoError('');
    } else if (clean === 'ROYALOUD') {
      const disc = Math.min(500, totalPrice);
      setDiscount(disc);
      setPromoApplied({ code: 'ROYALOUD', label: '₹500 Privilege Voucher', discount: disc });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "EXOTIC10" for 10% off.');
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          className="cart-drawer-root"
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', justifyContent: 'flex-end' }}
        >
          {/* Warm-tinted, desaturated, heavily blurred scrim backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASINGS.diffuse }}
            onClick={() => setIsCartOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(12, 10, 8, 0.72)',
              backdropFilter: 'blur(24px) saturate(0.8) sepia(0.12)',
              WebkitBackdropFilter: 'blur(24px) saturate(0.8) sepia(0.12)',
            }}
          />

          {/* Slide-in Sheet */}
          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Fragrance Vault Shopping Bag"
            initial={reducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reducedMotion ? { opacity: 1 } : { x: '0%' }}
            exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={SPRINGS.sheet}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              height: '100%',
              background: 'var(--ground-raised)',
              borderLeft: '1px solid var(--border)',
              boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  Your Fragrance Vault
                </h2>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                  {totalItems} {totalItems === 1 ? 'creation' : 'creations'} reserved
                </span>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart drawer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--ground-field)',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div
              style={{
                padding: '12px 24px',
                background: 'var(--ground-subtle)',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ink)' }}>
                  {isFreeShipping ? (
                    <span>✨ <strong>Unlocked:</strong> Complimentary Express Delivery</span>
                  ) : (
                    <span>Add <strong>{formatPrice(amountNeeded)}</strong> for Complimentary Delivery</span>
                  )}
                </span>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{progressPercent}%</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  background: 'var(--ground-field)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={SPRINGS.layout}
                  style={{ height: '100%', background: 'var(--accent)' }}
                />
              </div>
            </div>

            {/* Items List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', margin: 'auto 0', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏺</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: '8px' }}>
                    Your Vault is Currently Empty
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: '24px' }}>
                    Discover our pure hydro-distilled attars, rare reserve perfumes, and custom curations.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/shop');
                    }}
                  >
                    Explore All Fragrances
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
                      transition={SPRINGS.layout}
                      style={{
                        padding: '16px',
                        background: 'var(--ground-field)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'flex-start',
                        position: 'relative',
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          position: 'relative',
                          width: '72px',
                          height: '72px',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: 'var(--ground)',
                        }}
                      >
                        <Image
                          src={item.image || '/images/Royal-bottle.png'}
                          alt={item.name}
                          fill
                          sizes="72px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {/* Item Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 500,
                              color: 'var(--ink)',
                              lineHeight: 1.3,
                              marginRight: '12px',
                            }}
                          >
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            style={{
                              color: 'var(--ink-muted)',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              padding: '2px 4px',
                              lineHeight: 1,
                            }}
                          >
                            ✕
                          </button>
                        </div>

                        {item.packagingTier && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '2px' }}>
                            Box: {item.packagingTier}
                          </div>
                        )}

                        {item.curatedAttars && (
                          <div
                            style={{
                              fontSize: '0.7rem',
                              color: 'var(--ink-muted)',
                              marginTop: '4px',
                              lineHeight: 1.3,
                            }}
                          >
                            Included: {item.curatedAttars.slice(0, 3).join(', ')}
                            {item.curatedAttars.length > 3 ? ` +${item.curatedAttars.length - 3} more` : ''}
                          </div>
                        )}

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '12px',
                          }}
                        >
                          {/* Quantity selector */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius-sm)',
                              background: 'var(--ground-raised)',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              style={{ padding: '4px 10px', fontSize: '0.9rem', color: 'var(--ink)' }}
                            >
                              -
                            </button>
                            <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 500 }}>
                              <RollingTally value={item.quantity} prefix="" />
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              style={{ padding: '4px 10px', fontSize: '0.9rem', color: 'var(--ink)' }}
                            >
                              +
                            </button>
                          </div>

                          {/* Price with Rolling Tally */}
                          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent)' }}>
                            <RollingTally value={item.price * item.quantity} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div
                style={{
                  padding: '20px 24px',
                  borderTop: '1px solid var(--border)',
                  background: 'var(--ground-field)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Privilege Code (e.g. EXOTIC10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="input"
                    style={{
                      padding: '8px 12px',
                      fontSize: 'var(--text-xs)',
                      textTransform: 'uppercase',
                      flex: 1,
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: 'var(--text-xs)' }}
                  >
                    Apply
                  </button>
                </form>

                {promoError && (
                  <span style={{ fontSize: '0.75rem', color: '#e63946' }}>{promoError}</span>
                )}
                {promoApplied && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: 'var(--accent)',
                    }}
                  >
                    <span>{promoApplied.label}</span>
                    <span>-{formatPrice(promoApplied.discount)}</span>
                  </div>
                )}

                {/* Subtotal and Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
                    Total Order Value
                  </span>
                  <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--accent)' }}>
                    <RollingTally value={finalTotal} />
                  </span>
                </div>

                {/* Checkout & View Cart Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/checkout');
                    }}
                    id="drawer-proceed-checkout"
                    style={{ width: '100%' }}
                  >
                    Proceed to Royal Checkout • {formatPrice(finalTotal)}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/cart');
                    }}
                    id="drawer-view-full-vault"
                    style={{ width: '100%', fontSize: 'var(--text-xs)', textAlign: 'center' }}
                  >
                    View Full Fragrance Vault Details
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
