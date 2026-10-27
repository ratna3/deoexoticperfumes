import { ProductGridSkeleton } from '../components/Skeleton';
import styles from './shop.module.css';

export default function ShopLoading() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className="container">
          <div style={{ height: 44, width: '40%', background: 'var(--color-surface)', borderRadius: 6, marginBottom: 16 }} />
          <div style={{ height: 20, width: '70%', background: 'var(--color-surface)', borderRadius: 4 }} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    </div>
  );
}
