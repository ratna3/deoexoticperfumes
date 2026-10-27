'use client';

import { useState, useMemo, useTransition } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useReveal } from '../hooks/useReveal';
import styles from './shop.module.css';

export function ShopClient({ initialProducts = [], categories = ['All'], initialCategory = 'All' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isPending, startTransition] = useTransition();
  const revealRef = useReveal();

  const handleCategoryChange = (category) => {
    startTransition(() => {
      setActiveCategory(category);
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by category
    if (activeCategory && activeCategory !== 'All') {
      list = list.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.notes?.top?.toLowerCase().includes(q) ||
          p.notes?.heart?.toLowerCase().includes(q) ||
          p.notes?.base?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    ...(activeCategory !== 'All' ? [{ label: activeCategory }] : []),
  ];

  return (
    <div className={styles.page} ref={revealRef}>
      <section className={styles.header}>
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={`${styles.title} reveal`}>Handcrafted Fragrances & Pure Attars</h1>
          <p className={`${styles.subtitle} reveal reveal-delay-1`}>
            Every formulation in our vault is hydro-distilled using centuries-old methods.
            Browse our pure attars, rare perfumes, natural dhoop cones, and artisan gift sets.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Controls: Search and Filter */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            {/* Category filter pills */}
            <div className={`${styles.filters} reveal`} style={{ margin: 0 }}>
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                    id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      transition: 'all 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort controls */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="search"
                placeholder="Search notes (oud, rose, musk)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ padding: '8px 14px', fontSize: '0.9rem', width: '220px' }}
                aria-label="Search fragrances"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
                style={{ padding: '8px 14px', fontSize: '0.9rem', cursor: 'pointer' }}
                aria-label="Sort fragrances by"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Product count */}
          <p className={styles.count} aria-live="polite">
            Showing {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'fragrance' : 'fragrances'}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>

          {/* Grid */}
          <div className={styles.grid} style={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 160ms ease-out' }}>
            {filteredAndSortedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className={styles.empty}>
              <p>No fragrances found matching your current filter.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn btn-secondary"
                style={{ marginTop: 'var(--space-md)' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
