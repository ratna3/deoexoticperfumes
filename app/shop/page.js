import { getDbProducts } from '../lib/db';
import { getCategories } from '../data/products';
import { ShopClient } from './ShopClient';

export const metadata = {
  title: 'Shop Handcrafted Fragrances & Attars | Deo Exotic',
  description: 'Explore our complete vault of pure Indian attars, exotic perfumes, rare oud flacons, natural dhoop cones, and coffret gift sets. Hand-distilled in copper degs.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop Handcrafted Fragrances & Attars | Deo Exotic',
    description: 'Centuries of Indian fragrance heritage. Browse pure attars, rare perfumes, and exotic incense.',
    url: 'https://deoexoticperfumes.vercel.app/shop',
    images: [
      {
        url: '/images/Treasure-box.png',
        width: 1200,
        height: 630,
        alt: 'Deo Exotic Handcrafted Fragrance Collection',
      },
    ],
  },
};

export default async function ShopPage({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialCategory = resolvedParams.category || 'All';

  const products = await getDbProducts();
  const categories = getCategories();

  return (
    <ShopClient
      initialProducts={products}
      categories={categories}
      initialCategory={initialCategory}
    />
  );
}
