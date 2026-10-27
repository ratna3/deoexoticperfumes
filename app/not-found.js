import Link from 'next/link';

export const metadata = {
  title: 'Fragrance Not Found (404) | Deo Exotic Attar & Perfume',
  description: 'The requested fragrance flacon or page could not be located in our perfume vault. Explore our handcrafted collection.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 60px',
      textAlign: 'center',
      background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.08) 0%, rgba(12, 11, 10, 1) 70%)',
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '48px 32px',
        background: 'rgba(22, 20, 18, 0.8)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      }}>
        <span style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent, #d4af37)',
          marginBottom: '16px',
        }}>
          Lost In Scent — 404
        </span>

        <h1 style={{
          fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 400,
          color: '#f5f0eb',
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}>
          Fragrance Vault Unopened
        </h1>

        <p style={{
          color: '#a89f91',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}>
          The page or rare flacon you are seeking appears to have evaporated from our catalogue or moved to our private reserve.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginBottom: '36px',
        }}>
          <Link href="/shop" className="btn btn-primary" style={{ minWidth: '180px' }}>
            Browse All Fragrances
          </Link>
          <Link href="/" className="btn btn-ghost" style={{ minWidth: '140px' }}>
            Return Home
          </Link>
        </div>

        <div style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.15)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '0.9rem',
        }}>
          <Link href="/collections" style={{ color: '#d4af37', textDecoration: 'none' }}>
            Collections
          </Link>
          <span style={{ color: '#4a4237' }}>•</span>
          <Link href="/about" style={{ color: '#d4af37', textDecoration: 'none' }}>
            The Craft
          </Link>
          <span style={{ color: '#4a4237' }}>•</span>
          <Link href="/contact" style={{ color: '#d4af37', textDecoration: 'none' }}>
            Atelier Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}
