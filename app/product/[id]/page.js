import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { products, getProductById } from '../../data/products';
import { getDbProductById } from '../../lib/db';
import { ProductDetailSkeleton } from '../../components/Skeleton';
import ProductDetailClient from './ProductDetailClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deoexoticperfumes.vercel.app';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = (await getDbProductById(id)) || getProductById(id);

  if (!product) {
    return {
      title: 'Fragrance Not Found | Deo Exotic Attar & Perfume',
      description: 'The requested fragrance could not be located in our vault catalogue.',
    };
  }

  const title = `${product.name} — Handcrafted ${product.category} | Deo Exotic`;
  const description = product.tagline || product.description;
  const imageUrl = product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/product/${product.id}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1000,
          height: 1000,
          alt: `${product.name} Luxury Flacon`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = (await getDbProductById(id)) || getProductById(id);

  if (!product) {
    notFound();
  }

  const imageUrl = product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`;

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [imageUrl],
    description: product.description || product.tagline,
    sku: `DEO-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Deo Exotic Attar & Perfume',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.id}`,
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Deo Exotic',
      },
    },
    ...(product.reviews && product.reviews.length > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (
          product.reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / product.reviews.length
        ).toFixed(1),
        reviewCount: product.reviews.length,
      },
      review: product.reviews.map((rev) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: rev.author,
        },
        datePublished: rev.date || '2026-10-01',
        reviewBody: rev.comment,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: rev.rating || 5,
        },
      })),
    } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailClient product={product} />
      </Suspense>
    </>
  );
}
