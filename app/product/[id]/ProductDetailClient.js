'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products, formatPrice } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './product.module.css';

export default function ProductDetailClient({ product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || { size: product?.size || '6ml', price: product?.price || 1999 }
  );
  const [selectedImage, setSelectedImage] = useState(product?.image || '/images/Royal-bottle.png');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('story');
  const [addedAnim, setAddedAnim] = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h2>Fragrance Not Found</h2>
          <p>The artisan fragrance you are looking for may have been archived or is temporarily out of distillation.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
            Explore All Fragrances
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = selectedSize?.price || product.price;
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      ...product,
      id: `${product.id}-${selectedSize.size}`,
      name: `${product.name} (${selectedSize.size})`,
      price: currentPrice,
      selectedSize: selectedSize.size,
    }, quantity);

    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1800);
  };

  const handleBuyNow = () => {
    addItem({
      ...product,
      id: `${product.id}-${selectedSize.size}`,
      name: `${product.name} (${selectedSize.size})`,
      price: currentPrice,
      selectedSize: selectedSize.size,
    }, quantity);
    router.push('/checkout');
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
    { label: product.name },
  ];

  return (
    <div className={styles.productPage}>
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumbs items={breadcrumbs} />

        <div className={styles.grid}>
          {/* Gallery */}
          <div className={styles.galleryWrapper}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={selectedImage}
                alt={`${product.name} — Luxury handcrafted ${product.category} flacon`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mainImage}
              />
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              <div className={styles.purityTag}>100% Pure Alcohol-Free Oil</div>
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div className={styles.thumbnails}>
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.thumbnailBtn} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                    onClick={() => setSelectedImage(img)}
                    aria-label={`View photo ${i + 1} of ${product.name}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} detailed flacon photo ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes="80px"
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className={styles.details}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline || product.description}</p>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(currentPrice)}</span>
              {product.originalPrice && (
                <del className={styles.originalPrice}>
                  {formatPrice(Math.round(currentPrice * (product.originalPrice / product.price)))}
                </del>
              )}
              <span className={styles.taxNote}>Taxes included. Complimentary shipping on all prepaid orders.</span>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.sizeSection}>
                <label className={styles.sectionLabel}>Select Flacon Size:</label>
                <div className={styles.sizeOptions}>
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      className={`${styles.sizeBtn} ${selectedSize.size === s.size ? styles.selectedSize : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      <span className={styles.sizeVol}>{s.size}</span>
                      <span className={styles.sizeLabel}>{s.label || formatPrice(s.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className={styles.actionsGroup}>
              <div className={styles.quantityPicker}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={styles.qtyBtn}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className={styles.qtyBtn}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`btn btn-primary ${styles.addToCartBtn} ${addedAnim ? styles.buttonAdded : ''}`}
                onClick={handleAddToCart}
                id="product-add-to-cart"
              >
                {addedAnim ? 'Added to Royal Bag ✓' : `Add to Bag • ${formatPrice(currentPrice * quantity)}`}
              </button>
            </div>

            <button
              type="button"
              className={`btn btn-secondary ${styles.buyNowBtn}`}
              onClick={handleBuyNow}
              id="product-buy-now"
            >
              Order with 1-Click Checkout
            </button>

            {/* Olfactory Notes Pyramid */}
            {product.notes && (
              <div className={styles.pyramidCard}>
                <h3 className={styles.pyramidTitle}>Olfactory Notes Composition</h3>
                <div className={styles.noteItem}>
                  <span className={styles.noteLabel}>Head Notes:</span>
                  <span className={styles.noteContent}>{product.notes.top}</span>
                </div>
                <div className={styles.noteItem}>
                  <span className={styles.noteLabel}>Heart Notes:</span>
                  <span className={styles.noteContent}>{product.notes.heart}</span>
                </div>
                <div className={styles.noteItem}>
                  <span className={styles.noteLabel}>Base Notes:</span>
                  <span className={styles.noteContent}>{product.notes.base}</span>
                </div>
              </div>
            )}

            {/* Highlights Grid */}
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>🏺</span>
                <span className={styles.specTitle}>Distillation</span>
                <span className={styles.specVal}>{product.distillation || 'Traditional Deg-Bhapka'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>⏳</span>
                <span className={styles.specTitle}>Longevity</span>
                <span className={styles.specVal}>{product.longevity || '14+ Hours on Skin'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>🌿</span>
                <span className={styles.specTitle}>Purity</span>
                <span className={styles.specVal}>100% Alcohol-Free Pure Oil</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>📍</span>
                <span className={styles.specTitle}>Origin</span>
                <span className={styles.specVal}>{product.origin || 'Kannauj, India'}</span>
              </div>
            </div>

            {/* Accordion / Tabs */}
            <div className={styles.tabsSection}>
              <div className={styles.tabHeaders}>
                <button
                  type="button"
                  className={`${styles.tabHeader} ${activeTab === 'story' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('story')}
                >
                  The Scent Story
                </button>
                <button
                  type="button"
                  className={`${styles.tabHeader} ${activeTab === 'ritual' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('ritual')}
                >
                  Application Ritual
                </button>
                <button
                  type="button"
                  className={`${styles.tabHeader} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Packaging & Care
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'story' && (
                  <div className={styles.tabPane}>
                    <p>{product.story || product.description}</p>
                    <p style={{ marginTop: 'var(--space-sm)', color: 'var(--ink-soft)' }}>
                      Distilled by generational Ustaads using ancient copper cauldrons sealed with river clay and wood-fired to gently coax the soul of each botanical.
                    </p>
                  </div>
                )}
                {activeTab === 'ritual' && (
                  <div className={styles.tabPane}>
                    <p><strong>The Traditional Application:</strong> Using the glass rod applicator, apply a single drop onto the inner pulse of each wrist. Gently dab against the pulse points on your neck and behind your earlobes. Do not vigorously rub; allow your skin warmth to naturally bloom the aromatic layers over several hours.</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className={styles.tabPane}>
                    <p>Every bottle is housed in an emerald or burgundy velvet protective pouch, cushioned within an embossed gift case. Keep away from direct sunlight and store upright in ambient temperature. Our pure concentrated oils mature like fine wine over decades.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials for this product */}
        {product.reviews && product.reviews.length > 0 && (
          <section className={styles.reviewsSection}>
            <h2 className={styles.reviewsHeading}>Connoisseur Experiences</h2>
            <div className={styles.reviewsGrid}>
              {product.reviews.map((rev, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.stars}>★★★★★</div>
                  <p className={styles.reviewComment}>"{rev.comment}"</p>
                  <div className={styles.reviewAuthor}>
                    <strong>{rev.author}</strong> • <span>Verified Connoisseur</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <h2>You May Also Cherish</h2>
              <Link href="/shop" className="btn btn-ghost">Explore All</Link>
            </div>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
