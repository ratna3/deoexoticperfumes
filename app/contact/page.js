import { ContactClient } from './ContactClient';

export const metadata = {
  title: 'Bespoke Fragrance Consultation & Concierge | Deo Exotic',
  description: 'Reach out to the master distillers at Deo Exotic Attar & Perfume. Inquire about rare reserve flacons, bespoke wedding favors, or personal notes layering. Email deoexoticattalko@gmail.com.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Bespoke Fragrance Consultation & Concierge | Deo Exotic',
    description: 'Direct inquiries and bespoke fragrance consultations with Deo Exotic master perfumers.',
    url: 'https://deoexoticperfumes.vercel.app/contact',
    images: [
      {
        url: '/images/Treasure-box.png',
        width: 1200,
        height: 630,
        alt: 'Deo Exotic Atelier Concierge',
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
