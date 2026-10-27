'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      id="main-header"
    >
      <nav className={`${styles.nav} container`}>
        <Link href="/" className={styles.logo} id="nav-logo">
          <Image
            src="/images/brand-logo.png"
            alt="Deo Exotic Attar & Perfume royal emblem logo"
            width={48}
            height={48}
            priority
          />
          <span className={styles.logoText}>Deo Exotic</span>
        </Link>

        <ul className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
          <li><Link href="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
          <li><Link href="/shop" onClick={() => setMobileOpen(false)}>Shop</Link></li>
          <li><Link href="/collections" onClick={() => setMobileOpen(false)}>Collections</Link></li>
          <li><Link href="/about" onClick={() => setMobileOpen(false)}>About</Link></li>
          <li><Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link></li>
        </ul>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartBtn} id="nav-cart" aria-label="View shopping cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span key={totalItems} className={styles.cartBadge} aria-label={`${totalItems} items in cart`}>
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="nav-burger"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}
    </header>
  );
}
