'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ATTARS,
  ARCHETYPES,
  PACKAGING_TIERS,
  BASE_ATTAR_PRICE,
} from '@/lib/data/scents';
import { DiffusionText } from '@/components/ui/diffusion-text';
import { ScrollEncryptedText } from '@/components/ui/scroll-encrypted-text';
import { formatPrice } from '@/app/data/products';
import { SPRINGS } from '@/lib/motion/tokens';
import { useDeviceProfile } from '@/components/providers/device-provider';
import { useCart } from '@/app/context/CartContext';

export function FragranceFinderForm() {
  const { addItem, setIsCartOpen } = useCart();
  const { reducedMotion } = useDeviceProfile();

  // Step 1: Selected Archetype (one of the 5 big options)
  const [selectedArchetypeId, setSelectedArchetypeId] = useState(null);

  // Step 2: Selected Nodes (multi-select, minimum 2 required to reveal perfumes)
  const [selectedNodes, setSelectedNodes] = useState([]);

  // Live search query within results
  const [searchQuery, setSearchQuery] = useState('');

  // Selected attars (multi-select)
  const [selectedAttars, setSelectedAttars] = useState([]);

  // Step 3: Selected packaging tier
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_TIERS[1]); // Default to Wooden Gift Box

  // Pagination for results grid
  const [displayLimit, setDisplayLimit] = useState(12);
  const [justAdded, setJustAdded] = useState(false);

  // Find currently active archetype object
  const activeArchetype = useMemo(() => {
    return ARCHETYPES.find((a) => a.id === selectedArchetypeId) || null;
  }, [selectedArchetypeId]);

  // All attars belonging to the chosen archetype
  const archetypeAttars = useMemo(() => {
    if (!activeArchetype) return [];
    return ATTARS.filter(activeArchetype.match);
  }, [activeArchetype]);

  // Extract all unique olfactory nodes present in this archetype
  const availableNodes = useMemo(() => {
    if (!activeArchetype || archetypeAttars.length === 0) return [];
    const nodeSet = new Set();
    archetypeAttars.forEach((attar) => {
      attar.nodes.forEach((n) => nodeSet.add(n));
    });
    return Array.from(nodeSet).sort();
  }, [activeArchetype, archetypeAttars]);

  // Handle archetype selection
  const handleSelectArchetype = (archetypeId) => {
    if (selectedArchetypeId === archetypeId) return;
    setSelectedArchetypeId(archetypeId);
    // Reset nodes and search when switching archetype
    setSelectedNodes([]);
    setSearchQuery('');
    setDisplayLimit(12);
  };

  // Toggle a fragrance node
  const toggleNode = (node) => {
    setSelectedNodes((prev) => {
      if (prev.includes(node)) {
        return prev.filter((n) => n !== node);
      }
      return [...prev, node];
    });
    setDisplayLimit(12);
  };

  // Clear all selected nodes
  const clearNodes = () => {
    setSelectedNodes([]);
    setDisplayLimit(12);
  };

  // Filter attars in real time once at least one node is selected.
  const matchingAttars = useMemo(() => {
    if (!activeArchetype || selectedNodes.length === 0) {
      return [];
    }

    const lowerSelected = selectedNodes.map((n) => n.toLowerCase());

    const filtered = archetypeAttars
      .map((attar) => {
        // Count how many of the selected nodes match this attar
        const matchCount = lowerSelected.filter((sel) =>
          attar.nodes.some((n) => n.toLowerCase() === sel)
        ).length;

        const isFullMatch = matchCount === selectedNodes.length;

        return {
          attar,
          matchCount,
          isFullMatch,
        };
      })
      .filter((item) => item.matchCount > 0);

    // Apply live search query if user typed anything
    const query = searchQuery.trim().toLowerCase();
    const searched = query
      ? filtered.filter(
          ({ attar }) =>
            attar.name.toLowerCase().includes(query) ||
            attar.nodes.some((n) => n.toLowerCase().includes(query))
        )
      : filtered;

    // Sort: highest matching count first, then full matches, then alphabetical
    searched.sort((a, b) => {
      if (b.matchCount !== a.matchCount) {
        return b.matchCount - a.matchCount;
      }
      return a.attar.name.localeCompare(b.attar.name);
    });

    return searched;
  }, [activeArchetype, archetypeAttars, selectedNodes, searchQuery]);

  // Toggle attar in user's bespoke set
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
      image: selectedPackaging?.image || '/images/exotic-box.png',
      badge: activeArchetype ? activeArchetype.label : 'Bespoke Blend',
      quantity: 1,
      isCustomBundle: true,
      packagingTier: selectedPackaging?.name,
      packagingTierId: selectedPackaging?.id,
      curatedAttars: selectedAttars.map((a) => a.name),
      curatedAttarIds: selectedAttars.map((a) => a.id),
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
    <section
      className="section"
      id="attar-finder"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--ground) 0%, rgba(14, 14, 14, 0.95) 50%, var(--ground) 100%)',
        paddingTop: 'var(--space-4xl)',
        paddingBottom: 'var(--space-4xl)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              fontSize: 'var(--text-xs)',
              color: 'var(--accent)',
              display: 'inline-block',
              marginBottom: '10px',
              fontWeight: 600,
            }}
          >
            Artisan Atelier Service
          </span>
          <DiffusionText as="h2" style={{ fontSize: 'var(--text-3xl)', marginBottom: '18px' }}>
            Curate Your Bespoke Attar Set
          </DiffusionText>
          <ScrollEncryptedText
            text="Step into the royal perfume atelier. Select who you are curating for, choose your sensory olfactory accords, and watch our master-distilled formulations unfurl in real time at ₹999 per flacon."
            style={{ color: 'var(--ink-soft)', margin: '0 auto', fontSize: 'var(--text-base)' }}
          />
        </div>

        {/* ── STEP 1: 5 BIG BUTTON OPTIONS (ARCHETYPES) ── */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                Step 1 • Fragrance Persona
              </span>
              <h3 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                Are You Buying For:
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '2px' }}>
                Select an option below: For Him, For Her, Signature &amp; Shared, Sacred Blooms, or Sweet Elixir
              </p>
            </div>
            {selectedArchetypeId && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)' }}>
                ✓ Selected: <strong>{activeArchetype?.label}</strong> (click any option to switch)
              </span>
            )}
          </div>

          {/* 5 Big Buttons Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '14px',
            }}
            role="radiogroup"
            aria-label="Fragrance Persona Archetypes"
          >
            {ARCHETYPES.map((arch) => {
              const isSelected = selectedArchetypeId === arch.id;

              return (
                <motion.button
                  key={arch.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectArchetype(arch.id)}
                  whileTap={!reducedMotion ? { scale: 0.97 } : undefined}
                  style={{
                    position: 'relative',
                    padding: '22px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                    background: isSelected
                      ? 'radial-gradient(ellipse at top, rgba(196, 132, 29, 0.16) 0%, var(--ground-raised) 80%)'
                      : 'var(--ground-raised)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '150px',
                    boxShadow: isSelected
                      ? '0 0 24px rgba(196, 132, 29, 0.22), inset 0 1px 0 rgba(196, 132, 29, 0.3)'
                      : 'none',
                    transition: 'border-color 200ms ease, background 200ms ease, box-shadow 200ms ease',
                  }}
                  data-nav="finder-archetype"
                >
                  {/* Top Bar with Icon and Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isSelected ? 'var(--accent)' : 'var(--ground-field)',
                        color: isSelected ? 'var(--ground)' : 'var(--accent)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'background 200ms, color 200ms',
                      }}
                    >
                      {arch.icon}
                    </span>
                    {isSelected && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          padding: '3px 8px',
                          borderRadius: '999px',
                          background: 'var(--accent)',
                          color: 'var(--ground)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Active Persona ✓
                      </span>
                    )}
                  </div>

                  {/* Persona Title & Subtitle */}
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        color: isSelected ? 'var(--accent-hover)' : 'var(--ink)',
                        marginBottom: '6px',
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {arch.label}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: isSelected ? 'var(--ink)' : 'var(--ink-muted)',
                        lineHeight: 1.4,
                        marginBottom: '8px',
                      }}
                    >
                      {arch.tagline}
                    </p>
                  </div>

                  {/* Bottom Metatag */}
                  <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--accent)' : 'var(--ink-muted)', fontWeight: 500 }}>
                      {arch.category}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── STEP 2: SHOW NODES ONLY (No Perfumes Yet!) ── */}
        <AnimatePresence mode="wait">
          {activeArchetype ? (
            <motion.div
              key={activeArchetype.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, y: -10 }}
              transition={SPRINGS.layout}
              style={{
                background: 'var(--ground-raised)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-xl)',
                marginBottom: '40px',
                position: 'relative',
              }}
            >
              {/* Header for Node Selection */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent)',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                      }}
                    >
                      Step 2 of 3 • Olfactory Accords
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>•</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)' }}>
                      Curating for <strong>{activeArchetype.label}</strong>
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      color: 'var(--ink)',
                      marginBottom: '6px',
                    }}
                  >
                    Select Your Olfactory Accords
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', maxWidth: '640px' }}>
                    Select olfactory nodes below to diffuse formulations in real time. You can select <strong>at least 2 nodes</strong> to blend multi-layered accords. Perfume names remain concealed until you select nodes.
                  </p>
                </div>

                {/* Progress Badge & Clear Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedNodes.length >= 2 ? 'var(--accent-soft)' : 'var(--ground-field)',
                      border: selectedNodes.length >= 2 ? '1px solid var(--accent)' : '1px solid var(--border)',
                      color: selectedNodes.length >= 2 ? 'var(--accent)' : 'var(--ink-muted)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {selectedNodes.length === 0
                      ? '○ 0 nodes selected'
                      : selectedNodes.length === 1
                      ? '◐ 1 node active • Real-time formulations'
                      : `● ${selectedNodes.length} nodes blended • Real-time formulations`}
                  </div>

                  {selectedNodes.length > 0 && (
                    <button
                      type="button"
                      onClick={clearNodes}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--ink-muted)',
                        fontSize: 'var(--text-xs)',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: '4px 8px',
                      }}
                    >
                      Reset nodes
                    </button>
                  )}
                </div>
              </div>

              {/* Fragrance Node Pills Array */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  paddingTop: '6px',
                }}
                role="group"
                aria-label="Fragrance accord pills"
              >
                {availableNodes.map((node) => {
                  const isNodeSelected = selectedNodes.includes(node);

                  return (
                    <motion.button
                      key={node}
                      type="button"
                      onClick={() => toggleNode(node)}
                      whileTap={!reducedMotion ? { scale: 0.94 } : undefined}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '999px',
                        fontSize: 'var(--text-xs)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: isNodeSelected
                          ? '1.5px solid var(--accent)'
                          : '1px solid var(--border)',
                        background: isNodeSelected
                          ? 'var(--accent)'
                          : 'var(--ground-field)',
                        color: isNodeSelected
                          ? 'var(--ground)'
                          : 'var(--ink)',
                        boxShadow: isNodeSelected
                          ? '0 0 16px rgba(196, 132, 29, 0.35)'
                          : 'none',
                        transition: 'background 180ms ease, border-color 180ms ease, color 180ms ease',
                      }}
                      data-nav="finder-node"
                    >
                      {isNodeSelected ? `✓ ${node}` : `+ ${node}`}
                    </motion.button>
                  );
                })}
              </div>

              {selectedNodes.length === 0 && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--ground-field)',
                    border: '1px dashed var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>✦</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)' }}>
                    No perfumes are listed yet. Select an olfactory node above, and our formulations will diffuse here in real time.
                  </span>
                </div>
              )}
            </motion.div>
          ) : (
            /* Prompt if no archetype is chosen yet */
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0 }}
              animate={reducedMotion ? {} : { opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: 'var(--ground-raised)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '40px',
              }}
            >
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px', color: 'var(--accent)' }}>
                ✦
              </span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: '8px' }}>
                Select an Olfactory Persona to Begin
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', maxWidth: '480px', margin: '0 auto' }}>
                Choose who you are buying for above (For Him, For Her, Signature &amp; Shared, Sacred Blooms, or Sweet Elixir) to reveal the fragrance nodes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 3: REAL-TIME PERFUME RESULTS (Diffuses when nodes are selected) ── */}
        <AnimatePresence mode="wait">
          {activeArchetype && selectedNodes.length >= 1 && (
            <motion.div
              key="perfume-results-container"
              initial={reducedMotion ? {} : { opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reducedMotion ? {} : { opacity: 0, y: 16, filter: 'blur(6px)' }}
              transition={SPRINGS.layout}
              style={{ marginBottom: '48px' }}
            >
              {/* Results Control Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                  marginBottom: '22px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    Step 3 of 3 • Real-Time Formulations
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--ink)' }}>
                      Diffused Formulations
                    </h3>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                      ({matchingAttars.length} matching {selectedNodes.join(' + ')})
                    </span>
                  </div>
                </div>

                {/* Live Search Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="search"
                    placeholder="Search matched perfumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                    style={{
                      width: '240px',
                      padding: '8px 14px',
                      fontSize: 'var(--text-sm)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--ground-field)',
                      border: '1px solid var(--border)',
                      color: 'var(--ink)',
                    }}
                    aria-label="Filter matching attar results"
                  />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    ₹999 per flacon
                  </span>
                </div>
              </div>

              {/* Zero search results state */}
              {matchingAttars.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    background: 'var(--ground-raised)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p style={{ color: 'var(--ink-soft)', marginBottom: '8px' }}>
                    No formulations match &ldquo;{searchQuery}&rdquo; under the selected notes.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSearchQuery('')}
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                /* Attar Formulations Grid */
                <motion.div
                  layout
                  transition={SPRINGS.layout}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {matchingAttars.slice(0, displayLimit).map(({ attar, matchCount, isFullMatch }) => {
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
                          border: isSelected
                            ? '1.5px solid var(--accent)'
                            : isFullMatch
                            ? '1px solid rgba(196, 132, 29, 0.4)'
                            : '1px solid var(--border)',
                          cursor: 'pointer',
                          display: 'flex',
                          gap: '14px',
                          alignItems: 'center',
                          boxShadow: isSelected
                            ? '0 0 20px rgba(196, 132, 29, 0.25)'
                            : 'none',
                          transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
                        }}
                        data-nav="finder-perfume"
                      >
                        {/* Flacon Thumbnail */}
                        <div
                          style={{
                            position: 'relative',
                            width: '68px',
                            height: '68px',
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
                            sizes="68px"
                            style={{ objectFit: 'cover' }}
                          />
                          {isSelected && (
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(196, 132, 29, 0.45)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                              }}
                            >
                              ✓
                            </div>
                          )}
                        </div>

                        {/* Attar Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: '0.62rem',
                                textTransform: 'uppercase',
                                color: 'var(--accent)',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                              }}
                            >
                              {attar.category}
                            </span>
                            {isFullMatch && (
                              <span
                                style={{
                                  fontSize: '0.6rem',
                                  padding: '1px 6px',
                                  borderRadius: '2px',
                                  background: 'rgba(196, 132, 29, 0.2)',
                                  color: 'var(--accent)',
                                  fontWeight: 600,
                                }}
                              >
                                {matchCount}/{selectedNodes.length} Notes Match
                              </span>
                            )}
                          </div>

                          <h4
                            style={{
                              fontSize: '0.96rem',
                              fontWeight: 500,
                              color: 'var(--ink)',
                              marginBottom: '4px',
                              lineHeight: 1.25,
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {attar.name}
                          </h4>

                          <p
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--ink-muted)',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              marginBottom: '8px',
                            }}
                          >
                            {attar.nodes.join(' • ')}
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.86rem', color: 'var(--accent)', fontWeight: 600 }}>
                              {formatPrice(BASE_ATTAR_PRICE)}
                            </span>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                background: isSelected ? 'var(--accent)' : 'transparent',
                                color: isSelected ? 'var(--ground)' : 'var(--ink-soft)',
                                border: isSelected ? 'none' : '1px solid var(--border)',
                                fontWeight: 600,
                                transition: 'background 160ms, color 160ms',
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
              )}

              {/* Load More Button if results exceed display limit */}
              {matchingAttars.length > displayLimit && (
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDisplayLimit((prev) => prev + 12)}
                  >
                    Discover More Formulations ({matchingAttars.length - displayLimit} remaining)
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 4: PACKAGING SELECTION STAGE (Slides in when attars are selected) ── */}
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
                marginBottom: '40px',
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  Presentation Tier
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    color: 'var(--ink)',
                    marginTop: '4px',
                  }}
                >
                  Select Artisanal Presentation Box
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)' }}>
                  Every attar is cushioned in crystal flacons. Choose how your bespoke curation arrives.
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
                        transition: 'border-color 160ms ease, background 160ms ease',
                      }}
                      data-nav="finder-packaging"
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
                            zIndex: 2,
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

        {/* ── STEP 5: LIVE TALLY BAR & CART ACTION ── */}
        <div
          style={{
            position: 'sticky',
            bottom: '24px',
            zIndex: 40,
            background: 'rgba(20, 20, 20, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Your Curated Formulation Order {activeArchetype ? `• ${activeArchetype.label}` : ''}
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
              data-nav="finder-add-cart"
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
