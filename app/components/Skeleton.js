import styles from './Skeleton.module.css';

export function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.cardSkeleton} aria-label="Loading fragrance">
      <Skeleton className={styles.imageSkeleton} />
      <Skeleton className={styles.badgeSkeleton} />
      <Skeleton className={styles.titleSkeleton} />
      <Skeleton className={styles.notesSkeleton} />
      <div className={styles.footerSkeleton}>
        <Skeleton className={styles.priceSkeleton} />
        <Skeleton className={styles.btnSkeleton} />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={styles.gridSkeleton} role="status" aria-label="Loading fragrance catalog">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className={`container ${styles.detailSkeleton}`} role="status" aria-label="Loading fragrance details">
      <Skeleton className={styles.breadcrumbSkeleton} />
      <div className={styles.detailGrid}>
        <div>
          <Skeleton className={styles.detailHeroImg} />
          <div className={styles.detailThumbRow}>
            <Skeleton className={styles.detailThumb} />
            <Skeleton className={styles.detailThumb} />
            <Skeleton className={styles.detailThumb} />
          </div>
        </div>
        <div className={styles.detailInfo}>
          <Skeleton className={styles.badgeSkeleton} />
          <Skeleton className={styles.largeTitleSkeleton} />
          <Skeleton className={styles.taglineSkeleton} />
          <Skeleton className={styles.priceSkeleton} style={{ width: 120, height: 28 }} />
          <Skeleton className={styles.descBlockSkeleton} />
          <div className={styles.sizePillsRow}>
            <Skeleton className={styles.sizePillSkeleton} />
            <Skeleton className={styles.sizePillSkeleton} />
            <Skeleton className={styles.sizePillSkeleton} />
          </div>
          <div className={styles.ctaRowSkeleton}>
            <Skeleton className={styles.ctaBtnSkeleton} />
            <Skeleton className={styles.ctaBtnSkeleton} />
          </div>
        </div>
      </div>
    </div>
  );
}
