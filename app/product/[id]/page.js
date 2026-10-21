import { Suspense } from 'react';
import { products, getProductById } from '../../data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return {
      title: 'Fragrance — Deo Exotic Attar & Perfume',
    };
  }
  return {
    title: `${product.name} — Deo Exotic Attar & Perfume`,
    description: product.tagline || product.description,
    openGraph: {
      title: `${product.name} — Deo Exotic Attar & Perfume`,
      description: product.tagline || product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: '140px 0', textAlign: 'center' }}>
          Loading Handcrafted Fragrance...
        </div>
      }
    >
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
