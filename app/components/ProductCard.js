'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import styles from './ProductCard.module.css';

export function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [isOptimisticAdded, setIsOptimisticAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    setIsOptimisticAdded(true);
    setTimeout(() => setIsOptimisticAdded(false), 1200);
  };

  const descriptiveAlt = `${product.name} — Handcrafted ${product.category} in luxury crystal flacon, Deo Exotic`;

  return (
    <article
      className={`product-card reveal reveal-delay-${Math.min(index % 4, 3) + 1}`}
      id={`product-${product.id}`}
    >
      <Link href={`/product/${product.id}`} className="product-card__image" aria-label={`View ${product.name}`}>
        <Image
          src={product.image}
          alt={descriptiveAlt}
          fill
          loading={index < 4 ? 'eager' : 'lazy'}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
      </Link>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        {product.notes?.top && (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '4px 0 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Notes: {product.notes.top}
          </p>
        )}
        <div className="product-card__price">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <del>{formatPrice(product.originalPrice)}</del>
          )}
        </div>
      </div>

      <div className={styles.quickActions}>
        <button
          className={`btn ${isOptimisticAdded ? 'btn-ghost' : 'btn-primary'}`}
          onClick={handleAdd}
          id={`add-to-cart-${product.id}`}
          style={{
            flex: 1,
            transition: 'all 160ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            transform: isOptimisticAdded ? 'scale(0.97)' : 'scale(1)',
            borderColor: isOptimisticAdded ? 'var(--color-accent)' : undefined,
            color: isOptimisticAdded ? 'var(--color-accent)' : undefined,
          }}
          aria-live="polite"
        >
          {isOptimisticAdded ? 'Added ✓' : 'Add to Cart'}
        </button>
        <Link href={`/product/${product.id}`} className={`btn btn-secondary ${styles.viewBtn}`}>
          View
        </Link>
      </div>
    </article>
  );
}
