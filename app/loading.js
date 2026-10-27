import styles from './components/Skeleton.module.css';

export default function RootLoading() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '120px 24px',
      }}
      role="status"
      aria-label="Loading Deo Exotic Fragrances"
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '2px solid rgba(212, 175, 55, 0.2)',
          borderTopColor: '#d4af37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span
        style={{
          color: 'var(--color-accent, #d4af37)',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Distilling Experience...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
