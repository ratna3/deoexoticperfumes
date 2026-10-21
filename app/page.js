'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from './components/ProductCard';
import { getFeaturedProducts, products } from './data/products';
import { useReveal } from './hooks/useReveal';
import styles from './page.module.css';

export default function Home() {
  const featured = getFeaturedProducts();
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBackground}>
          <Image
            src="/images/Treasure-box.png"
            alt="Handcrafted treasure chest with crystal attar decanters"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`${styles.heroContent} container`}>
          <div className={styles.heroText}>
            <h1 className={`${styles.heroTitle} reveal`}>
              The Art of<br />Pure Fragrance
            </h1>
            <p className={`${styles.heroSub} reveal reveal-delay-1`}>
              Handcrafted attars and exotic perfumes distilled
              through centuries-old tradition. Every drop, a legacy.
            </p>
            <div className={`${styles.heroActions} reveal reveal-delay-2`}>
              <Link href="/shop" className="btn btn-primary">
                Explore the Collection
              </Link>
              <Link href="/about" className="btn btn-ghost">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── Brand Values ─────────────────────────────── */}
      <section className={`${styles.values} section`} id="values">
        <div className="container">
          <div className={styles.valuesGrid}>
            {[
              { number: '100%', label: 'Pure & Natural', desc: 'Zero chemicals, zero synthetics. Only nature\'s finest ingredients.' },
              { number: '500+', label: 'Years of Tradition', desc: 'Ancient deg-bhapka distillation methods preserved through generations.' },
              { number: '40+', label: 'Exotic Blends', desc: 'Each fragrance crafted from rare botanicals sourced worldwide.' },
            ].map((v, i) => (
              <div key={i} className={`${styles.valueItem} reveal reveal-delay-${i + 1}`}>
                <span className={styles.valueNumber}>{v.number}</span>
                <h3 className={styles.valueLabel}>{v.label}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────── */}
      <section className="section" id="featured-products">
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <h2 className={styles.sectionTitle}>Our Finest</h2>
            <Link href="/shop" className="btn btn-ghost">View all</Link>
          </div>

          <div className={styles.productGrid}>
            {featured.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── The Craft Split Section ──────────────────── */}
      <section className={`${styles.craft} section`} id="the-craft">
        <div className={`${styles.craftInner} container`}>
          <div className={`${styles.craftImage} reveal`}>
            <Image
              src="/images/exotic-box.png"
              alt="Attar collection in handcrafted box with five ornate vials"
              width={600}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.craftText}>
            <h2 className={`${styles.craftTitle} reveal`}>
              Distilled by Hand,<br />Worn with Pride
            </h2>
            <p className={`${styles.craftDesc} reveal reveal-delay-1`}>
              Each attar in our collection is distilled using the traditional
              deg-bhapka method — a centuries-old technique where flowers, herbs, and woods
              are slow-cooked in copper stills over sandalwood oil. No alcohol. No shortcuts.
              Just the pure essence of nature, concentrated into a single, precious drop.
            </p>
            <p className={`${styles.craftDesc} reveal reveal-delay-2`}>
              Our artisans in Kannauj — the perfume capital of India — carry
              forward a tradition that dates back to the Mughal era. Every bottle is a
              testament to patience: some blends take over three days to distill.
            </p>
            <Link href="/about" className="btn btn-secondary reveal reveal-delay-3">
              Discover Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* ── More Products ────────────────────────────── */}
      <section className="section" id="more-products">
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <h2 className={styles.sectionTitle}>Complete Collection</h2>
          </div>

          <div className={styles.productGrid}>
            {products.slice(4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter / CTA ─────────────────────────── */}
      <section className={`${styles.cta} section`} id="newsletter">
        <div className="container">
          <div className={`${styles.ctaInner} reveal`}>
            <h2 className={styles.ctaTitle}>
              Join the Inner Circle
            </h2>
            <p className={styles.ctaDesc}>
              Be the first to know about new arrivals, limited editions, and exclusive offers.
            </p>
            <form
              className={styles.ctaForm}
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                if (email) {
                  window.location.href = `mailto:deoexoticattalko@gmail.com?subject=Newsletter Subscription&body=Please add me to your mailing list. My email: ${email}`;
                }
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="input"
                required
                id="newsletter-email"
              />
              <button type="submit" className="btn btn-primary" id="newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
