'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={`${styles.inner} container`}>
        {/* Brand column */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/brand-logo.png"
              alt="Deo Exotic Attar & Perfume"
              width={56}
              height={56}
            />
          </Link>
          <p className={styles.tagline}>
            Ancient artistry, modern luxury. Every drop tells a story of tradition passed through generations.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Shop</h3>
          <ul>
            <li><Link href="/shop?category=Attar">Attars</Link></li>
            <li><Link href="/shop?category=Perfume">Perfumes</Link></li>
            <li><Link href="/shop?category=Dhoop">Dhoop Cones</Link></li>
            <li><Link href="/shop?category=Gift+Sets">Gift Sets</Link></li>
            <li><Link href="/collections">Collections</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Company</h3>
          <ul>
            <li><Link href="/about">Our Story & Heritage</Link></li>
            <li><Link href="/contact">Concierge & Contact</Link></li>
            <li><Link href="/about#craft">Distillation Craft</Link></li>
            <li><Link href="/privacy-policy">Privacy & Confidentiality</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Reach Us</h3>
          <ul>
            <li>
              <a href="mailto:deoexoticattalko@gmail.com">deoexoticattalko@gmail.com</a>
            </li>
            <li>
              <a href="https://instagram.com/deoexotic" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">WhatsApp Atelier</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p>© 2026 Deo Exotic Attar & Perfume. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
            <Link href="/privacy-policy" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</Link>
            <Link href="/shop" style={{ color: 'var(--color-text-muted)' }}>Vault Catalogue</Link>
            <Link href="/sitemap.xml" style={{ color: 'var(--color-text-muted)' }}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
