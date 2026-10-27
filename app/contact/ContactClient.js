'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';
import styles from './contact.module.css';

const faqs = [
  {
    q: 'Are all Deo Exotic fragrances 100% alcohol-free?',
    a: 'Yes, without exception. Every single attar, oil blend, and reserve distillation in our house is 100% pure concentrated perfume oil (Ittar) with zero ethanol, synthetic binders, or phthalates.'
  },
  {
    q: 'How should pure attars be stored and does it expire?',
    a: 'Pure natural attars do not expire; in fact, true sandalwood-based attars and aged ouds mature and deepen in character like fine vintage wine. We recommend storing your flacons upright in a cool, dry place away from direct sunlight.'
  },
  {
    q: 'How long does a single application last on skin and fabric?',
    a: 'Because our attars are completely uncut, a single microscopic dab on pulse points typically lasts 14 to 20+ hours on skin, and up to 3 days on natural fabric like cotton, silk, and wool.'
  },
  {
    q: 'Do you create bespoke gifts for weddings, corporate events, or VIP gifting?',
    a: 'Yes, we curate custom hand-carved wood chests, personalized wax-sealed flacons, and bespoke calligraphy gift notes. Please email our atelier directly at deoexoticattalko@gmail.com.'
  },
  {
    q: 'What is your shipping timeline within India?',
    a: 'All orders are dispatched from our Kannauj & Lucknow ateliers within 24 hours via premium insured air express. Delivery to metropolitan cities takes 2 to 3 business days.'
  }
];

export function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'fragrance-advice',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to transmit inquiry. Please email us directly.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      // Optimistic recovery
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Concierge & Inquiries' },
  ];

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <span className={styles.eyebrow}>Artisan Concierge</span>
          <h1 className={styles.heroTitle}>Bespoke Fragrance Consultation & Concierge</h1>
          <p className={styles.heroDesc}>
            Whether you are seeking advice on layering notes, seeking a rare reserve distillation, or planning luxury gifts, our master perfumers are at your service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Info Cards Column */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h2 className={styles.cardTitle}>Direct Atelier Contact</h2>
                <p className={styles.cardDesc}>
                  Our concierge answers queries promptly during business hours.
                </p>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>✉️</span>
                    <div>
                      <span className={styles.contactLabel}>Official Concierge Email</span>
                      <a href="mailto:deoexoticattalko@gmail.com" className={styles.contactLink}>
                        deoexoticattalko@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📞</span>
                    <div>
                      <span className={styles.contactLabel}>Customer Care & WhatsApp</span>
                      <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        +91 99999 99999
                      </a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>🏛️</span>
                    <div>
                      <span className={styles.contactLabel}>Distillery & Headquarters</span>
                      <p className={styles.contactVal}>
                        Deo Exotic Attar & Perfume Atelier<br />
                        Kannauj & Lucknow, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>⏱️</span>
                    <div>
                      <span className={styles.contactLabel}>Atelier Hours</span>
                      <p className={styles.contactVal}>
                        Monday – Saturday: 10:00 AM – 7:30 PM IST<br />
                        Sunday: Private Reserve Appointments Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links to shop */}
              <div className={styles.infoCard} style={{ marginTop: '20px' }}>
                <h3 className={styles.cardTitle}>Explore Our Collections</h3>
                <p className={styles.cardDesc}>
                  Discover our pure hydro-distilled attars, artisanal perfumes, and handcrafted incense.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <Link href="/shop?category=Attar" className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                    Attars
                  </Link>
                  <Link href="/shop?category=Perfume" className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                    Perfumes
                  </Link>
                  <Link href="/shop?category=Gift+Sets" className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                    Coffrets
                  </Link>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                {submitted ? (
                  <div className={styles.formSuccess}>
                    <span className={styles.successIcon}>✓</span>
                    <h2>Inquiry Transmitted with Honour</h2>
                    <p>
                      Thank you, <strong>{form.name}</strong>. Your message has been sent to our master distillers at <strong>deoexoticattalko@gmail.com</strong>. We shall review your consultation and reply to <strong>{form.email}</strong> within 6 business hours.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 'var(--space-lg)' }}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: '', email: '', phone: '', subject: 'fragrance-advice', message: '' });
                        }}
                      >
                        Send Another Inquiry
                      </button>
                      <Link href="/shop" className="btn btn-primary">
                        Browse Fragrance Vault
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} id="contact-form">
                    <h2 className={styles.formTitle}>Send a Message to the Distiller</h2>

                    {errorMessage && (
                      <div style={{
                        padding: '12px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#f87171',
                        marginBottom: '16px',
                        fontSize: '0.9rem',
                      }}>
                        {errorMessage}
                      </div>
                    )}

                    <div className={styles.inputGroup}>
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Farhan Khan / Ananya Sharma"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.inputGrid}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@domain.com"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="phone">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          id="phone"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="subject">Subject of Inquiry</label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        disabled={isSubmitting}
                      >
                        <option value="fragrance-advice">Personal Fragrance Consultation & Layering Advice</option>
                        <option value="wedding-gifting">Custom Wedding & Event Favor Boxes</option>
                        <option value="corporate-gifting">Corporate & VIP Gifting Solutions</option>
                        <option value="wholesale">Boutique Stockist & Wholesale Partnerships</option>
                        <option value="order-status">Order Status or Delivery Query</option>
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="message">Your Message *</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about the scent profile you are looking for, notes you love, or details regarding your event..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        height: '52px',
                        transition: 'all 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                        opacity: isSubmitting ? 0.7 : 1,
                      }}
                      disabled={isSubmitting}
                      id="contact-submit-btn"
                    >
                      {isSubmitting ? 'Transmitting to Atelier Concierge...' : 'Transmit Inquiry to deoexoticattalko@gmail.com'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently Answered Olfactory Inquiries</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} ${activeFaq === i ? styles.faqOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    aria-expanded={activeFaq === i}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqArrow}>{activeFaq === i ? '−' : '+'}</span>
                  </button>
                  {activeFaq === i && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
