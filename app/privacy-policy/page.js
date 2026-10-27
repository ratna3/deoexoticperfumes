import { Breadcrumbs } from '../components/Breadcrumbs';
import styles from './privacy.module.css';

export const metadata = {
  title: 'Privacy Policy | Deo Exotic Attar & Perfume',
  description: 'Read the privacy policy of Deo Exotic Attar & Perfume. Understand how we protect your personal information, order data, and privacy.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Deo Exotic Attar & Perfume',
    description: 'Our commitment to protecting your privacy, order data, and confidentiality.',
    url: 'https://deoexoticperfumes.vercel.app/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' },
  ];

  return (
    <div className={styles.privacyPage}>
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        <header className={styles.header}>
          <h1 className={styles.title}>Privacy & Confidentiality Policy</h1>
          <p className={styles.updated}>Last Updated: October 2026</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Atelier Commitment</h2>
            <p>
              At Deo Exotic Attar & Perfume, safeguarding your trust and personal privacy is as foundational
              as the ancient craft of hydro-distillation itself. This Privacy Policy details the types of personal
              information collected through our online boutique, how that data is safeguarded, and how you retain complete
              authority over your records.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information We Collect</h2>
            <p>We only collect information essential to providing you with bespoke fragrances and impeccable service:</p>
            <ul>
              <li><strong>Contact Information:</strong> Full name, email address, telephone number, and postal shipping address when placing orders or requesting consultations.</li>
              <li><strong>Order & Delivery Records:</strong> Items selected, custom flacon engravings or sizing preferences, gift notes, and transaction identifiers.</li>
              <li><strong>Technical & Analytical Insights:</strong> Anonymized browser information, device specifications, and page interactions captured through privacy-respecting cookies to optimize boutique loading times.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Payment Data Security</h2>
            <p>
              We do not store, view, or retain your credit card numbers, debit credentials, or UPI PINs. All financial
              transactions are routed through RBI-compliant, bank-grade encrypted payment gateways with TLS 1.3 encryption.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Usage of Information</h2>
            <p>Collected details are strictly deployed for:</p>
            <ul>
              <li>Dispatching handcrafted flacons to your doorstep via insured air express carriers.</li>
              <li>Responding to olfactory consultations and formulation queries submitted to our concierge.</li>
              <li>Preventing unauthorized activity and fraudulent orders.</li>
              <li>Delivering dispatch tracking updates via SMS or email.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Third-Party Sharing</h2>
            <p>
              We never sell, lease, or monetize your contact details to third-party advertisers. Disclosures are limited solely to:
            </p>
            <ul>
              <li>Authorized logistics partners (such as BlueDart, Delhivery, or Indian Postal Express) strictly for doorstep flacon transit.</li>
              <li>Legal authorities only when compelled by valid legal subpoenas under Indian jurisdiction.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Cookies & Google Analytics</h2>
            <p>
              Our website employs first-party analytical scripts (including Google Analytics) to assess navigation patterns,
              identify missing pages, and enhance loading speed across mobile devices. You may disable cookies in your browser settings at any time without impacting your ability to browse our catalogue.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Your Rights & Atelier Contact</h2>
            <p>
              You have the right to request a copy of the personal information we hold, request corrections, or ask for complete deletion of your customer account records from our system.
            </p>
            <div className={styles.contactBox}>
              <p>For any inquiries regarding this policy or your data rights, contact our Data Privacy Officer directly:</p>
              <p style={{ marginTop: '8px' }}>
                <strong>Email:</strong> <a href="mailto:deoexoticattalko@gmail.com">deoexoticattalko@gmail.com</a><br />
                <strong>Atelier:</strong> Deo Exotic Attar & Perfume, Kannauj & Lucknow, Uttar Pradesh, India
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
