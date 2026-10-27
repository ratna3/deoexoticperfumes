import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';
import styles from './collections.module.css';

export const metadata = {
  title: 'Curated Fragrance Collections | Deo Exotic',
  description: 'Explore our master collections: The Imperial Oud Series, Artisanal Keepsake Coffrets, Vedic Temple Dhoop, and The Grand Shamama distillations. Pure and alcohol-free.',
  alternates: {
    canonical: '/collections',
  },
  openGraph: {
    title: 'Curated Fragrance Collections | Deo Exotic',
    description: 'Distinct chapters in the royal history of Indian and Oriental perfumery, distilled with uncompromising purity.',
    url: 'https://deoexoticperfumes.vercel.app/collections',
    images: [
      {
        url: '/images/Treasure-box.png',
        width: 1200,
        height: 630,
        alt: 'Deo Exotic Curated Fragrance Collections',
      },
    ],
  },
};

const collections = [
  {
    id: 'imperial-oud',
    title: 'The Imperial Oud Series',
    subtitle: 'Wild Agarwood • Cambodia • Assam',
    description: 'Resinous, deeply enigmatic, and revered for millenia. Our single-origin oud distillations are harvested from naturally resinous aged agarwood trees, aged in traditional leather kupis to coax sublime honeyed, animalic, and balsamic depths.',
    image: '/images/Royal-bottle.png',
    link: '/shop?category=Attar',
    tag: 'Single-Origin Distillations'
  },
  {
    id: 'keepsake-coffrets',
    title: 'Artisanal Keepsake Coffrets',
    subtitle: 'Hand-Carved Rosewood & Velvet Caskets',
    description: 'Masterpieces of North Indian decorative craftsmanship. Each chest is handcrafted by master artisans with pure brass inlay and velvet lining, housing crystal decanters filled with our most prized reserve attars.',
    image: '/images/Treasure-box.png',
    link: '/shop?category=Gift+Sets',
    tag: 'Collector Heirlooms'
  },
  {
    id: 'sacred-dhoop',
    title: 'Vedic Temple Dhoop & Incense',
    subtitle: 'Charcoal-Free • Mysore Sandalwood • Loban',
    description: 'Hand-kneaded using pure ground sandalwood, Himalayan herbs, guggal, and natural attars. Formulated according to ancient Atharva Vedic texts to purify spaces, calm the mind, and elevate daily contemplation without harsh smoke.',
    image: '/images/dhoop-cones.jpg',
    link: '/shop?category=Dhoop',
    tag: 'Pure Botanicals'
  },
  {
    id: 'exotic-blends',
    title: 'The Grand Shamama & Floral Vault',
    subtitle: 'Kannauj Copper Alembic Still Distillations',
    description: 'The crowning achievement of Indian perfumery science: Shamama Al-Amber distilled continuously over 30 days, alongside pure Ruh Gulab extracted from tens of thousands of freshly hand-plucked damask roses at daybreak.',
    image: '/images/exotic-box.png',
    link: '/shop?category=Attar',
    tag: 'Heritage Distillations'
  }
];

export default function CollectionsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Curated Collections' },
  ];

  return (
    <div className={styles.collectionsPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <span className={styles.eyebrow}>Curated Distillations</span>
          <h1 className={styles.heroTitle}>Our Olfactory Collections</h1>
          <p className={styles.heroDesc}>
            Each collection represents a distinct chapter in the royal history of Indian and Oriental perfumery, distilled with uncompromising purity.
          </p>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.collectionGrid}>
            {collections.map((col, index) => (
              <article key={col.id} className={`${styles.collectionCard} ${index % 2 === 1 ? styles.reverse : ''}`}>
                <div className={styles.imageCol}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={col.image}
                      alt={`${col.title} — ${col.subtitle}, Deo Exotic Collection`}
                      fill
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.colImg}
                    />
                    <span className={styles.colBadge}>{col.tag}</span>
                  </div>
                </div>

                <div className={styles.textCol}>
                  <span className={styles.colSub}>{col.subtitle}</span>
                  <h2 className={styles.colTitle}>{col.title}</h2>
                  <p className={styles.colText}>{col.description}</p>
                  <Link href={col.link} className="btn btn-primary" style={{ alignSelf: 'flex-start' }} id={`explore-${col.id}`}>
                    Explore Collection →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
