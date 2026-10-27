'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { Breadcrumbs } from '../components/Breadcrumbs';
import styles from './cart.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const freeShippingThreshold = 1499;
  const isFreeShipping = totalPrice >= freeShippingThreshold || items.length === 0;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(100, Math.round((totalPrice / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'EXOTIC10') {
      const disc = Math.round(totalPrice * 0.1);
      setDiscount(disc);
      setPromoApplied({ code: 'EXOTIC10', discount: disc, label: '10% Royal Welcome Discount' });
      setPromoError('');
    } else if (clean === 'ROYALOUD') {
      const disc = Math.min(500, totalPrice);
      setDiscount(disc);
      setPromoApplied({ code: 'ROYALOUD', discount: disc, label: '₹500 Connoisseur Privilege' });
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code. Try code "EXOTIC10" for 10% off.');
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount + (giftWrap ? 99 : 0));

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className="container">
          <div className={styles.emptyCard}>
            <div className={styles.emptyIcon}>🏺</div>
            <h1 className={styles.emptyTitle}>Your Fragrance Vault is Empty</h1>
            <p className={styles.emptyDesc}>
              You have not selected any pure attars or luxury perfumes yet. Immerse yourself in our centuries-old distillation tradition.
            </p>
            <Link href="/shop" className="btn btn-primary" id="empty-shop-now">
              Discover Fragrances
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Fragrance Vault Cart' },
  ];

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className={styles.pageTitle}>Your Fragrance Vault</h1>
        <p className={styles.pageSubtitle}>
          Review your chosen attars and reserve perfumes before bespoke packaging.
        </p>

        {/* Free Shipping Progress */}
        <div className={styles.shippingBar}>
          <div className={styles.shippingBarText}>
            {isFreeShipping ? (
              <span>✨ <strong>Unlocked:</strong> Complimentary Pan-India Express Delivery & Artisan Sample Included!</span>
            ) : (
              <span>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for Complimentary Express Shipping</span>
            )}
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className={styles.layout}>
          {/* Items Table */}
          <div className={styles.itemsColumn}>
            <div className={styles.itemsHeader}>
              <span>Fragrance</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image || '/images/Royal-bottle.png'}
                      alt={`${item.name} — Handcrafted Flacon Selection`}
                      fill
                      sizes="90px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>
                      <Link href={`/product/${item.id.split('-')[0]}`}>{item.name}</Link>
                    </h3>
                    <span className={styles.itemCategory}>{item.category}</span>
                    {item.selectedSize && <span className={styles.itemSize}>Volume: {item.selectedSize}</span>}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className={styles.removeBtn}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>

                  <div className={styles.itemPrice}>{formatPrice(item.price)}</div>

                  <div className={styles.itemQuantity}>
                    <div className={styles.qtyControls}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={styles.qtyBtn}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyCount}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.qtyBtn}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemSubtotal}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Options */}
            <div className={styles.giftBox}>
              <label className={styles.giftCheckbox}>
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                />
                <span className={styles.giftCheckboxLabel}>
                  Add Royal Velvet Keepsake Gift Wrap (+₹99) & Handwritten Scent Note
                </span>
              </label>

              {giftWrap && (
                <textarea
                  className={styles.giftNoteInput}
                  placeholder="Write your personal gift message here (we will scribe it with gold ink on handmade parchment)..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  rows={3}
                />
              )}
            </div>

            <div className={styles.actionsFooter}>
              <Link href="/shop" className="btn btn-ghost">
                ← Continue Exploring Fragrances
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className={styles.clearCartBtn}
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Order Summary Column */}
          <aside className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Bag Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {discount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Privilege Code ({promoApplied.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              {giftWrap && (
                <div className={styles.summaryRow}>
                  <span>Royal Velvet Gift Wrap</span>
                  <span>₹99</span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span>Estimated Shipping</span>
                <span>{isFreeShipping ? <strong style={{ color: '#4caf50' }}>COMPLIMENTARY</strong> : '₹150'}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.totalRow}>
                <span>Total Amount</span>
                <span className={styles.finalPrice}>{formatPrice(finalTotal)}</span>
              </div>
              <p className={styles.inclusiveText}>Includes all applicable Indian GST taxes</p>

              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                <div className={styles.promoInputWrapper}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code (e.g. EXOTIC10)"
                    className={styles.promoInput}
                  />
                  <button type="submit" className={styles.applyBtn}>
                    Apply
                  </button>
                </div>
                {promoError && <p className={styles.promoError}>{promoError}</p>}
                {promoApplied && (
                  <p className={styles.promoSuccess}>
                    ✓ Applied: {promoApplied.label} (-{formatPrice(promoApplied.discount)})
                  </p>
                )}
              </form>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className={`btn btn-primary ${styles.checkoutBtn}`}
                id="cart-checkout-button"
              >
                Proceed to Bespoke Checkout →
              </button>

              <div className={styles.reassurance}>
                <div className={styles.reassuranceItem}>
                  <span>🛡️</span>
                  <span>100% Authentic Hand-Distilled Oils</span>
                </div>
                <div className={styles.reassuranceItem}>
                  <span>📦</span>
                  <span>Insured Tamper-Proof Luxury Packaging</span>
                </div>
                <div className={styles.reassuranceItem}>
                  <span>💬</span>
                  <span>Direct Artisan Support: deoexoticattalko@gmail.com</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
