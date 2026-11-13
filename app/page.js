import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from './components/ProductCard';
import { RevealWrapper } from './components/RevealWrapper';
import { DiffusionText } from '@/components/ui/diffusion-text';
import { ScrollEncryptedText } from '@/components/ui/scroll-encrypted-text';
import { ParallaxGrid } from '@/components/ui/parallax-grid';
import { FragranceFinderForm } from '@/components/finder/fragrance-finder-form';
import { getDbProducts } from './lib/db';
import styles from './page.module.css';

export const metadata = {
  title: 'Handcrafted Luxury Attars & Exotic Perfumes',
  description: 'Experience pure, alcohol-free Indian attars, rare oud perfumes, and natural dhoop cones hydro-distilled in traditional copper degs by Deo Exotic.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Deo Exotic Attar & Perfume — Handcrafted Luxury Fragrances',
    description: 'Handcrafted attars, rare oud flacons, and artisan dhoop cones distilled through centuries-old Indian tradition.',
    url: 'https://deoexoticperfumes.vercel.app',
    images: [
      {
        url: '/images/Treasure-box.png',
        width: 1200,
        height: 630,
        alt: 'Deo Exotic Handcrafted Luxury Fragrances and Crystal Flacons',
      },
    ],
  },
};

export default async function Home() {
  const allProducts = await getDbProducts();
  const featured = allProducts.filter((p) => p.featured || p.badge === 'Bestseller');
  const remaining = allProducts.filter((p) => !featured.some((f) => f.id === p.id));

  return (
    <RevealWrapper>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBackground}>
          <Image
            src="/images/Treasure-box.png"
            alt="Handcrafted luxury velvet-lined treasure chest containing crystal flacons of pure attar oil"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`${styles.heroContent} container`}>
          <div className={styles.heroText}>
            <DiffusionText as="h1" className={styles.heroTitle} delay={0.1}>
              The Art of Pure Fragrance
            </DiffusionText>
            <ScrollEncryptedText
              text="Handcrafted attars and exotic perfumes distilled through centuries-old tradition. Every drop, a legacy."
              className={styles.heroSub}
              delay={0.3}
            />
            <div className={`${styles.heroActions} reveal reveal-delay-2`}>
              <Link href="/shop" className="btn btn-primary" id="hero-explore-collection">
                Explore the Collection
              </Link>
              <Link href="/about" className="btn btn-ghost" id="hero-our-story">
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
              { number: '100%', label: 'Pure & Natural', desc: 'Zero alcohol, zero chemical additives. Only nature\'s most noble botanicals.' },
              { number: '500+', label: 'Years of Tradition', desc: 'Ancient deg-bhapka copper hydro-distillation preserved across generations.' },
              { number: '40+', label: 'Exotic Formulations', desc: 'Each flacon cured in aged kupis with rare resins sourced from Kannauj and beyond.' },
            ].map((v, i) => (
              <div key={i} className={`${styles.valueItem} reveal reveal-delay-${i + 1}`}>
                <span className={styles.valueNumber}>{v.number}</span>
                <DiffusionText as="h3" className={styles.valueLabel} blurLevel="body">
                  {v.label}
                </DiffusionText>
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
            <DiffusionText as="h2" className={styles.sectionTitle}>
              Our Master Distillations
            </DiffusionText>
            <Link href="/shop" className="btn btn-ghost">View All Fragrances</Link>
          </div>

          <ParallaxGrid className={styles.productGrid} amplitude={25}>
            {featured.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </ParallaxGrid>
        </div>
      </section>

      {/* ── Custom Interactive Fragrance Finder & Packaging Form ── */}
      <FragranceFinderForm />

      {/* ── The Craft Split Section ──────────────────── */}
      <section className={`${styles.craft} section`} id="the-craft">
        <div className={`${styles.craftInner} container`}>
          <div className={`${styles.craftImage} reveal`}>
            <Image
              src="/images/exotic-box.png"
              alt="Artisan coffret gift box containing five rare perfume flacons by Deo Exotic"
              width={600}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.craftText}>
            <DiffusionText as="h2" className={styles.craftTitle}>
              Distilled by Hand, Worn with Pride
            </DiffusionText>
            <ScrollEncryptedText
              text="Each attar in our collection is distilled using the traditional deg-bhapka method — a centuries-old technique where flowers, herbs, and woods are slow-cooked in copper stills over sandalwood oil. No alcohol. No shortcuts. Just the pure essence of nature, concentrated into a single, precious drop."
              className={styles.craftDesc}
              delay={0.15}
            />
            <ScrollEncryptedText
              text="Our artisans in Kannauj — the perfume capital of India — carry forward a tradition that dates back to the Mughal era. Every bottle is a testament to patience: some blends take over three days to distill."
              className={styles.craftDesc}
              delay={0.25}
            />
            <Link href="/about" className="btn btn-secondary reveal reveal-delay-3" id="home-discover-heritage">
              Discover Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* ── More Products ────────────────────────────── */}
      <section className="section" id="more-products">
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <DiffusionText as="h2" className={styles.sectionTitle}>
              Complete Vault Collection
            </DiffusionText>
            <Link href="/collections" className="btn btn-ghost">Explore Curations</Link>
          </div>

          <ParallaxGrid className={styles.productGrid} amplitude={25}>
            {(remaining.length > 0 ? remaining : allProducts).slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </ParallaxGrid>
        </div>
      </section>

      {/* ── Newsletter / Atelier Concierge ─────────────────────────── */}
      <section className={`${styles.cta} section`} id="newsletter">
        <div className="container">
          <div className={`${styles.ctaInner} reveal`}>
            <DiffusionText as="h2" className={styles.ctaTitle}>
              Join the Deo Exotic Circle
            </DiffusionText>
            <ScrollEncryptedText
              text="Receive private invitations to limited seasonal distillations, rare reserve flacons, and bespoke perfume advice."
              className={styles.ctaDesc}
            />
            <form
              className={styles.ctaForm}
              action={`mailto:deoexoticattalko@gmail.com`}
              method="GET"
            >
              <input
                type="email"
                name="body"
                placeholder="Enter your email for private reserves"
                className="input"
                required
                id="newsletter-email"
                aria-label="Email address for fragrance newsletter"
              />
              <button type="submit" className="btn btn-primary" id="newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </RevealWrapper>
  );
}
