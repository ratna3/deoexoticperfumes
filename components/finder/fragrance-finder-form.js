'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ATTARS, FRAGRANCE_NODES, PACKAGING_TIERS, BASE_ATTAR_PRICE } from '@/lib/data/scents';
import { DiffusionText } from '@/components/ui/diffusion-text';
import { ScrollEncryptedText } from '@/components/ui/scroll-encrypted-text';
import { formatPrice } from '@/app/data/products';
import { EASINGS, SPRINGS } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';
import { useCart } from '@/app/context/CartContext';

export function FragranceFinderForm() {
  const { addItem, setIsCartOpen } = useCart();
  const { reducedMotion, motionScale } = useDeviceProfile();

  const [activeNode, setActiveNode] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttars, setSelectedAttars] = useState([]);
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_TIERS[1]); // Default to Wooden Gift Box
  const [displayLimit, setDisplayLimit] = useState(12);
  const [justAdded, setJustAdded] = useState(false);

  // Filter attars based on active node and search text
  const filteredAttars = useMemo(() => {
    return ATTARS.filter((attar) => {
      const matchesNode =
        activeNode === 'All' ||
        attar.nodes.some((n) => n.toLowerCase() === activeNode.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        attar.name.toLowerCase().includes(query) ||
        attar.category.toLowerCase().includes(query) ||
        attar.nodes.some((n) => n.toLowerCase().includes(query));

      return matchesNode && matchesSearch;
    });
  }, [activeNode, searchQuery]);

  const toggleAttar = (attar) => {
    setSelectedAttars((prev) => {
      const exists = prev.some((item) => item.id === attar.id);
      if (exists) {
        return prev.filter((item) => item.id !== attar.id);
      }
      return [...prev, attar];
    });
  };

  // Pricing tally
  const attarsSubtotal = selectedAttars.length * BASE_ATTAR_PRICE;
  const packagingPrice = selectedPackaging ? selectedPackaging.price : 0;
  const grandTotal = attarsSubtotal + packagingPrice;

  // Add customized order payload into Cart
  const handleAddBundleToCart = () => {
    if (selectedAttars.length === 0) return;

    const bundleItem = {
      id: `curated-attar-coffret-${Date.now()}`,
      name: `Bespoke Attar Coffret (${selectedAttars.length} Fragrances)`,
      category: 'Curated Sets',
      price: grandTotal,
      image: selectedPackaging.image || '/images/exotic-box.png',
      badge: 'Bespoke Blend',
      quantity: 1,
      isCustomBundle: true,
      packagingTier: selectedPackaging.name,
      curatedAttars: selectedAttars.map((a) => a.name),
      notes: {
        top: selectedAttars.map((a) => a.notes.top).slice(0, 3).join(', '),
        heart: selectedAttars.map((a) => a.notes.heart).slice(0, 3).join(', '),
        base: selectedAttars.map((a) => a.notes.base).slice(0, 3).join(', '),
      },
    };

    addItem(bundleItem, 1);
    setIsCartOpen(true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section className="section" id="attar-finder" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: 'var(--text-xs)',
              color: 'var(--accent)',
              display: 'inline-block',
              marginBottom: '8px',
            }}
          >
            Artisan Atelier Service
          </span>
          <DiffusionText as="h2" style={{ fontSize: 'var(--text-3xl)', marginBottom: '16px' }}>
            Curate Your Bespoke Attar Set
          </DiffusionText>
          <ScrollEncryptedText
            text="Explore over 100 hydro-distilled Indian attars. Filter by olfactory notes, pick your preferred fragrances at ₹999 each, and select your heirloom presentation box."
            style={{ color: 'var(--ink-soft)', margin: '0 auto' }}
          />
        </div>

        {/* Node Filter Bar */}
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            {/* Fragrance Node Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
              role="tablist"
              aria-label="Fragrance note filter pills"
            >
              {FRAGRANCE_NODES.map((node) => {
                const isActive = activeNode === node;
                return (
                  <motion.button
                    key={node}
                    type="button"
                    onClick={() => {
                      setActiveNode(node);
                      setDisplayLimit(12);
                    }}
                    whileTap={!reducedMotion ? { scale: 0.95 } : undefined}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                      background: isActive ? 'var(--accent-soft)' : 'var(--ground-raised)',
                      color: isActive ? 'var(--accent)' : 'var(--ink)',
                      transition: 'border-color 160ms, background 160ms',
                    }}
                  >
                    {node}
                  </motion.button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <input
              type="search"
              placeholder="Search by perfume or note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{
                maxWidth: '260px',
                padding: '8px 14px',
                fontSize: 'var(--text-sm)',
                borderRadius: 'var(--radius-sm)',
              }}
              aria-label="Search within attar catalog"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
            <span>
              Showing {filteredAttars.length} attar formulations ({activeNode} notes)
            </span>
            <span>₹999 per individual attar flacon</span>
          </div>
        </div>

        {/* Attar Selection Grid */}
        <motion.div
          layout
          transition={SPRINGS.layout}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {filteredAttars.slice(0, displayLimit).map((attar) => {
            const isSelected = selectedAttars.some((item) => item.id === attar.id);

            return (
              <motion.div
                key={attar.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRINGS.layout}
                whileTap={!reducedMotion ? { scale: 0.97 } : undefined}
                onClick={() => toggleAttar(attar)}
                style={{
                  position: 'relative',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--ground-subtle)' : 'var(--ground-raised)',
                  border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  boxShadow: isSelected ? '0 0 16px rgba(196, 132, 29, 0.2)' : 'none',
                  transition: 'background 200ms ease, border-color 200ms ease',
                }}
              >
                {/* Scent Flacon Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    background: 'var(--ground-field)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={attar.image}
                    alt={attar.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: 'cover' }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(196, 132, 29, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>

                {/* Attar Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>
                      {attar.category}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>•</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--ink-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {attar.nodes.join(', ')}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      marginBottom: '6px',
                      lineHeight: 1.25,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {attar.name}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500 }}>
                      {formatPrice(BASE_ATTAR_PRICE)}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: isSelected ? 'var(--accent)' : 'transparent',
                        color: isSelected ? 'var(--ground)' : 'var(--ink-soft)',
                        border: isSelected ? 'none' : '1px solid var(--border)',
                        fontWeight: 500,
                      }}
                    >
                      {isSelected ? 'Selected ✓' : '+ Select'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More Button if catalog exceeds displayLimit */}
        {filteredAttars.length > displayLimit && (
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDisplayLimit((prev) => prev + 12)}
            >
              Discover More Formulations ({filteredAttars.length - displayLimit} remaining)
            </button>
          </div>
        )}

        {/* Stage 2: Packaging Selection Stage (Slides in when attars are selected) */}
        <AnimatePresence>
          {selectedAttars.length > 0 && (
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, y: 20 }}
              transition={SPRINGS.sheet}
              style={{
                background: 'var(--ground-raised)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-xl)',
                marginBottom: '32px',
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Step 2 of 2
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    color: 'var(--ink)',
                    marginTop: '4px',
                  }}
                >
                  Select Artisanal Packaging Tier
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
                  Every attar is cushioned in crystal flacons. Choose how your curation arrives.
                </p>
              </div>

              {/* Packaging Options */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                {PACKAGING_TIERS.map((tier) => {
                  const isChosen = selectedPackaging?.id === tier.id;

                  return (
                    <motion.div
                      key={tier.id}
                      whileTap={!reducedMotion ? { scale: 0.98 } : undefined}
                      onClick={() => setSelectedPackaging(tier)}
                      style={{
                        position: 'relative',
                        padding: '20px',
                        borderRadius: 'var(--radius-md)',
                        background: isChosen ? 'var(--ground-subtle)' : 'var(--ground-field)',
                        border: isChosen ? '2px solid var(--accent)' : '1px solid var(--border)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        transition: 'border-color 160ms ease',
                      }}
                    >
                      {tier.recommended && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: 'var(--accent)',
                            color: 'var(--ground)',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            padding: '3px 8px',
                            borderRadius: '2px',
                            textTransform: 'uppercase',
                          }}
                        >
                          Connoisseur Choice
                        </span>
                      )}

                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '140px',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          background: 'var(--ground)',
                        }}
                      >
                        <Image
                          src={tier.image}
                          alt={tier.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
                          {tier.name}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                          {tier.tagline}
                        </p>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent)' }}>
                          +{formatPrice(tier.price)}
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            color: isChosen ? 'var(--accent)' : 'var(--ink-muted)',
                            fontWeight: isChosen ? 600 : 400,
                          }}
                        >
                          {isChosen ? '● Selected Tier' : '○ Select This Packaging'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Tally Bar & Cart Action */}
        <div
          style={{
            position: 'sticky',
            bottom: '24px',
            zIndex: 40,
            background: 'rgba(20, 20, 20, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Your Curated Formulation Order
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)' }}>
                {selectedAttars.length} {selectedAttars.length === 1 ? 'Attar' : 'Attars'} Selected
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>
                {selectedPackaging ? `+ ${selectedPackaging.name}` : ''}
              </span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)' }}>
              ({selectedAttars.length} × ₹999) + ₹{packagingPrice} packaging
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                Total Order Value
              </span>
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--accent)' }}>
                {formatPrice(grandTotal)}
              </span>
            </div>

            <button
              type="button"
              className={`btn btn-primary ${justAdded ? 'btn-ghost' : ''}`}
              disabled={selectedAttars.length === 0}
              onClick={handleAddBundleToCart}
              id="curated-order-add-to-cart"
              style={{
                padding: '14px 28px',
                opacity: selectedAttars.length === 0 ? 0.5 : 1,
                cursor: selectedAttars.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {justAdded
                ? 'Added to Royal Vault ✓'
                : selectedAttars.length === 0
                ? 'Select At Least 1 Attar'
                : `Add Curated Set • ${formatPrice(grandTotal)}`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
