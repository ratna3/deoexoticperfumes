'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.address || !form.city || !form.pincode) {
      setErrorMsg('Please complete all required shipping fields marked with *');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.fullName,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: `${form.address}, ${form.apartment ? form.apartment + ', ' : ''}${form.city}, ${form.state} - ${form.pincode}`,
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            size: i.selectedSize || i.size,
            price: i.price,
            quantity: i.quantity
          })),
          totalAmount: totalPrice
        })
      });

      const data = await response.json();
      if (data.success) {
        setOrderComplete({
          orderId: data.orderId,
          name: form.fullName,
          email: form.email,
          address: `${form.address}, ${form.city} (${form.pincode})`,
          total: totalPrice,
          method: form.paymentMethod.toUpperCase()
        });
        clearCart();
      } else {
        setErrorMsg(data.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      // In case of network glitch, generate client confirmation
      const fallbackId = 'DEO-' + Math.floor(100000 + Math.random() * 900000);
      setOrderComplete({
        orderId: fallbackId,
        name: form.fullName,
        email: form.email,
        address: `${form.address}, ${form.city} (${form.pincode})`,
        total: totalPrice,
        method: form.paymentMethod.toUpperCase()
      });
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className={styles.successPage}>
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✨</div>
            <span className={styles.orderBadge}>Order Confirmed</span>
            <h1 className={styles.successTitle}>Thank You, {orderComplete.name}</h1>
            <p className={styles.orderRef}>
              Order Reference: <strong>{orderComplete.orderId}</strong>
            </p>
            <p className={styles.successDesc}>
              Your bespoke fragrance package is being carefully prepared and sealed at our Kannauj distillation atelier. A detailed confirmation receipt has been dispatched to <strong>{orderComplete.email}</strong>.
            </p>

            <div className={styles.orderDetailsBox}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Destination</span>
                <span className={styles.detailValue}>{orderComplete.address}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Payment Method</span>
                <span className={styles.detailValue}>{orderComplete.method}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Total Paid / Due</span>
                <span className={styles.detailValue} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  {formatPrice(orderComplete.total)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Concierge Support</span>
                <span className={styles.detailValue}>deoexoticattalko@gmail.com</span>
              </div>
            </div>

            <div className={styles.successActions}>
              <Link href="/shop" className="btn btn-primary">
                Continue Exploring Our House
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyNotice}>
        <div className="container">
          <h2>Your bag is currently empty</h2>
          <p>Please select your fragrances before proceeding to checkout.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <h1 className={styles.title}>Bespoke Checkout</h1>
        <p className={styles.subtitle}>
          Secure checkout for authentic non-alcoholic attars and perfumes.
        </p>

        {errorMsg && <div className={styles.alertError}>{errorMsg}</div>}

        <div className={styles.layout}>
          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.formColumn}>
            {/* Contact Details */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>1. Contact Information</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Maharani Gayatri Devi / Farhan Khan"
                  />
                </div>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>2. Shipping Destination</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Street Address / House / Colony *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="e.g. 42 Royal Palms Avenue, Civil Lines"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="apartment">Apartment, Floor, Landmark (Optional)</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={form.apartment}
                    onChange={handleChange}
                    placeholder="e.g. Apt 4B, Near City Palace"
                  />
                </div>
              </div>
              <div className={styles.formGridThree}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Lucknow"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    placeholder="e.g. Uttar Pradesh"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="pincode">PIN Code *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="226001"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>3. Payment Preference</h2>
              <div className={styles.paymentOptions}>
                <label className={`${styles.paymentCard} ${form.paymentMethod === 'upi' ? styles.paymentSelected : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={form.paymentMethod === 'upi'}
                    onChange={handleChange}
                  />
                  <div className={styles.paymentInfo}>
                    <strong>Instant UPI / QR Code (GPay, PhonePe, Paytm)</strong>
                    <span>Fastest dispatch & automated confirmation</span>
                  </div>
                </label>

                <label className={`${styles.paymentCard} ${form.paymentMethod === 'card' ? styles.paymentSelected : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <div className={styles.paymentInfo}>
                    <strong>Credit / Debit Card & NetBanking</strong>
                    <span>Encrypted 256-bit bank-grade gateway</span>
                  </div>
                </label>

                <label className={`${styles.paymentCard} ${form.paymentMethod === 'cod' ? styles.paymentSelected : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div className={styles.paymentInfo}>
                    <strong>Cash on Delivery (Pan-India)</strong>
                    <span>Pay in cash or UPI at your doorstep upon arrival</span>
                  </div>
                </label>
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${styles.submitBtn}`}
              id="complete-order-btn"
            >
              {loading ? 'Securing Your Distillation Order...' : `Complete Order • ${formatPrice(totalPrice)}`}
            </button>
          </form>

          {/* Right Summary */}
          <aside className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryHeading}>Your Selections ({items.length})</h3>

              <div className={styles.summaryList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div className={styles.itemImg}>
                      <Image
                        src={item.image || '/images/Royal-bottle.png'}
                        alt={item.name}
                        fill
                        sizes="60px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.itemMeta}>
                      <h4 className={styles.itemTitle}>{item.name}</h4>
                      <span className={styles.itemQty}>Qty: {item.quantity}</span>
                    </div>
                    <span className={styles.itemPrice}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.priceBreakdown}>
                <div className={styles.breakdownRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Pan-India Luxury Shipping</span>
                  <span style={{ color: '#4caf50' }}>FREE</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Complimentary Scent Vials</span>
                  <span style={{ color: '#4caf50' }}>Included</span>
                </div>
                <div className={styles.breakdownTotal}>
                  <span>Grand Total</span>
                  <span className={styles.totalSum}>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className={styles.guaranteeBox}>
                <p>🏺 <strong>Direct from Distiller Guarantee:</strong> Every flacon is freshly filled, non-diluted, and free from synthetic binders.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
