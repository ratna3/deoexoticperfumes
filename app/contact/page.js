'use client';

import { useState } from 'react';
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

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'fragrance-advice',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.eyebrow}>Artisan Concierge</span>
          <h1 className={styles.heroTitle}>Bespoke Fragrance Consultation & Inquiries</h1>
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
                      <span className={styles.contactLabel}>Official Email</span>
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
                    <span className={styles.contactIcon}>⏰</span>
                    <div>
                      <span className={styles.contactLabel}>Consultation Hours</span>
                      <p className={styles.contactVal}>Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purity Guarantee Badge */}
              <div className={styles.heritageCard}>
                <h3>🏺 The Deo Exotic Promise</h3>
                <p>
                  Every flacon leaves our workshop sealed under the direct supervision of our master distillers. If you are ever unsatisfied with any formulation, reach out directly to <strong>deoexoticattalko@gmail.com</strong> for a personal resolution.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                {submitted ? (
                  <div className={styles.formSuccess}>
                    <span className={styles.successIcon}>✓</span>
                    <h2>Inquiry Received with Honour</h2>
                    <p>
                      Thank you, <strong>{form.name}</strong>. Your message has been routed to our fragrance concierge. We will respond to <strong>{form.email}</strong> within 6 business hours.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', phone: '', subject: 'fragrance-advice', message: '' });
                      }}
                      style={{ marginTop: 'var(--space-lg)' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} id="contact-form">
                    <h2 className={styles.formTitle}>Send a Message to the Distiller</h2>

                    <div className={styles.inputGroup}>
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Farhan Khan / Ananya Sharma"
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
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="subject">Subject of Inquiry</label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '52px' }}>
                      Transmit Inquiry to Atelier
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className={styles.faqSection}>
            <div className={styles.centerHeading}>
              <span className={styles.eyebrow}>Knowledge & Care</span>
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} ${activeFaq === i ? styles.faqActive : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqPlus}>{activeFaq === i ? '−' : '+'}</span>
                  </button>
                  {activeFaq === i && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
