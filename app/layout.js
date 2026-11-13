import './globals.css';
import Script from 'next/script';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { Toast } from './components/Toast';
import { DeviceProvider } from '@/components/providers/device-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deoexoticperfumes.vercel.app';
const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-DEOEXOTIC01';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Deo Exotic Attar & Perfume — Handcrafted Luxury Fragrances',
    template: '%s | Deo Exotic Attar & Perfume',
  },
  description: 'Discover handcrafted attars, exotic perfumes, natural dhoop cones, and artisan gift sets from Deo Exotic. Centuries of Indian distillation heritage in every drop.',
  keywords: [
    'attar',
    'pure ittar',
    'exotic perfume',
    'oud fragrance',
    'bakhoor',
    'dhoop cones',
    'luxury perfume India',
    'Kannauj attar',
    'alcohol-free perfume',
    'sandalwood attar'
  ],
  authors: [{ name: 'Deo Exotic Atelier' }],
  creator: 'Deo Exotic Perfumes',
  publisher: 'Deo Exotic Perfumes',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Deo Exotic Attar & Perfume — Handcrafted Luxury Fragrances',
    description: 'Centuries of Indian distillation heritage. Pure alcohol-free attars, rare perfumes, and exotic incense.',
    url: siteUrl,
    siteName: 'Deo Exotic Attar & Perfume',
    images: [
      {
        url: '/images/Treasure-box.png',
        width: 1200,
        height: 630,
        alt: 'Deo Exotic Handcrafted Luxury Fragrances and Crystal Attar Flacons',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deo Exotic Attar & Perfume — Handcrafted Luxury Fragrances',
    description: 'Pure alcohol-free attars, rare perfumes, and exotic incense hydro-distilled in traditional copper degs.',
    images: ['/images/Treasure-box.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'gsc_verification_deo_exotic_perfumes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Deo Exotic Attar & Perfume',
    alternateName: 'Deo Exotic',
    url: siteUrl,
    logo: `${siteUrl}/images/brand-logo.png`,
    image: `${siteUrl}/images/Treasure-box.png`,
    description: 'Handcrafted luxury attars, rare perfumes, and natural dhoop cones hydro-distilled using centuries-old Indian traditions.',
    email: 'deoexoticattalko@gmail.com',
    telephone: '+91-99999-99999',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kannauj',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://instagram.com/deoexoticperfumes',
      'https://facebook.com/deoexoticperfumes',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon-logo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <DeviceProvider>
          <SmoothScrollProvider>
            <CartProvider>
              {/* Static 0.02 opacity fixed film grain overlay */}
              <div className="film-grain-overlay" aria-hidden="true" />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toast />
            </CartProvider>
          </SmoothScrollProvider>
        </DeviceProvider>
      </body>
    </html>
  );
}
