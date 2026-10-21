'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '../components/ProductCard';
import { products, getCategories, getProductsByCategory } from '../data/products';
import { useReveal } from '../hooks/useReveal';
import styles from './shop.module.css';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const categories = getCategories();
  const filteredProducts = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );
  const revealRef = useReveal();

  return (
    <div className={styles.page} ref={revealRef}>
      <section className={styles.header}>
        <div className="container">
          <h1 className={`${styles.title} reveal`}>Shop Fragrances</h1>
          <p className={`${styles.subtitle} reveal reveal-delay-1`}>
            Every formulation in our vault is hydro-distilled using centuries-old methods.
            Browse our pure attars, rare perfumes, natural dhoop cones, and artisan gift sets.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div className={`${styles.filters} reveal`}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterBtn} ${activeCategory.toLowerCase() === cat.toLowerCase() ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product count */}
          <p className={styles.count}>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'fragrance' : 'fragrances'}
          </p>

          {/* Grid */}
          <div className={styles.grid}>
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className={styles.empty}>
              <p>No fragrances found in this collection category.</p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="btn btn-secondary"
                style={{ marginTop: 'var(--space-md)' }}
              >
                View All Fragrances
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '140px 0', textAlign: 'center' }}>Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
