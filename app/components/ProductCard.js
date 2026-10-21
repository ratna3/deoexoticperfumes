'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import styles from './ProductCard.module.css';

export function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  return (
    <article
      className={`product-card reveal reveal-delay-${Math.min(index % 4, 3) + 1}`}
      id={`product-${product.id}`}
    >
      <Link href={`/product/${product.id}`} className="product-card__image">
        <Image
          src={product.image}
          alt={product.name}
          fill
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
        <div className="product-card__price">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <del>{formatPrice(product.originalPrice)}</del>
          )}
        </div>
      </div>

      <div className={styles.quickActions}>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          id={`add-to-cart-${product.id}`}
          style={{ flex: 1 }}
        >
          Add to Cart
        </button>
        <Link href={`/product/${product.id}`} className={`btn btn-secondary ${styles.viewBtn}`}>
          View
        </Link>
      </div>
    </article>
  );
}
