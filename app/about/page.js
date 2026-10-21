'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.eyebrow}>The House of Deo Exotic</span>
          <h1 className={styles.heroTitle}>A Symphony of Ancient Fire,<br />Water & Sacred Woods</h1>
          <p className={styles.heroLead}>
            Where centuries of royal perfumery heritage converge with uncompromising modern discernment.
          </p>
        </div>
      </section>

      {/* Origin Story Split */}
      <section className={`${styles.storySection} section`}>
        <div className="container">
          <div className={styles.splitRow}>
            <div className={styles.splitImage}>
              <div className={styles.imageCard}>
                <Image
                  src="/images/Treasure-box.png"
                  alt="Deo Exotic artisanal treasure chest"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className={styles.splitText}>
              <span className={styles.sectionTag}>Our Heritage</span>
              <h2 className={styles.sectionHeading}>Born from the Fragrance Capital of the East</h2>
              <p>
                In the historic lanes of Kannauj along the fertile banks of the Ganges, fragrance is not an industrial commodity — it is a living, breathing spiritual art form that has captivated emperors, poets, and travelers for over five hundred years.
              </p>
              <p>
                <strong>Deo Exotic Attar & Perfume</strong> was conceived to safeguard this endangered patrimony. In an era dominated by synthetic aroma chemicals, alcohol-diluted sprays, and fleeting top notes, we remain fiercely devoted to the authentic purity of concentrated natural perfume oils.
              </p>
              <p>
                Every drop we bottle is non-alcoholic, hypoallergenic, and distilled with the patience of generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Deg-Bhapka Hydrodistillation Process */}
      <section className={`${styles.craftSection} section`} id="craft">
        <div className="container">
          <div className={styles.centerHeader}>
            <span className={styles.sectionTag}>Ancestral Science</span>
            <h2 className={styles.sectionHeading}>The Sacred Deg & Bhapka Distillation</h2>
            <p className={styles.sectionSubtitle}>
              Unchanged since the Mughal era, our hydro-distillation method requires no modern electricity — only woodfire, copper, water, and human intuition.
            </p>
          </div>

          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <span className={styles.stepNum}>01</span>
              <h3 className={styles.stepTitle}>Hand-Harvested Botanicals</h3>
              <p className={styles.stepDesc}>
                Fresh Damask roses plucked before dawn while the morning dew still guards the petals; aged Cambodian agarwood resin harvested sustainably from wild groves.
              </p>
            </div>

            <div className={styles.processStep}>
              <span className={styles.stepNum}>02</span>
              <h3 className={styles.stepTitle}>The Copper Deg & Clay Seal</h3>
              <p className={styles.stepDesc}>
                Botanicals and fresh well water are loaded into handmade copper cauldrons (Degs). The lid (Sarposh) is sealed hermetically using alluvial clay mud and cotton tape.
              </p>
            </div>

            <div className={styles.processStep}>
              <span className={styles.stepNum}>03</span>
              <h3 className={styles.stepTitle}>Bamboo Chonga & Cold Tank</h3>
              <p className={styles.stepDesc}>
                Steam travels through hollow bamboo tubes (Chonga) into a copper receiver flask (Bhapka) immersed in a running cold water reservoir, cooling the vapor into oil.
              </p>
            </div>

            <div className={styles.processStep}>
              <span className={styles.stepNum}>04</span>
              <h3 className={styles.stepTitle}>Absorption & Aging in Kupis</h3>
              <p className={styles.stepDesc}>
                The steam condenses directly into pure base sandalwood oil. The resulting attar is aged inside breathable camel-leather bottles (Kupis) where excess moisture evaporates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Purity Pledge */}
      <section className={`${styles.valuesSection} section`}>
        <div className="container">
          <div className={styles.valuesCard}>
            <div className={styles.valuesGrid}>
              <div className={styles.valItem}>
                <span className={styles.valIcon}>✨</span>
                <h3>Zero Alcohol</h3>
                <p>Pure, uncut oil blends that never irritate sensitive skin or evaporate within an hour.</p>
              </div>
              <div className={styles.valItem}>
                <span className={styles.valIcon}>🌿</span>
                <h3>Ethically Sourced</h3>
                <p>Direct partnerships with smallholder sandalwood farmers and wild agarwood foresters.</p>
              </div>
              <div className={styles.valItem}>
                <span className={styles.valIcon}>🏺</span>
                <h3>Aged to Perfection</h3>
                <p>Our reserve attars mature like fine vintage cognacs, gaining warmth and honeyed nuances over years.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Experience the Legacy for Yourself</h2>
          <p className={styles.ctaText}>
            Step away from mass-manufactured fragrances. Discover your personal olfactory signature with Deo Exotic.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/shop" className="btn btn-primary">
              Explore Our Fragrances
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Bespoke Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
