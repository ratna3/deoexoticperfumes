/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/all-products',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/perfumes',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/attars',
        destination: '/shop?category=Attar',
        permanent: true,
      },
      {
        source: '/dhoop',
        destination: '/shop?category=Dhoop+Cones',
        permanent: true,
      },
      {
        source: '/gift-sets',
        destination: '/shop?category=Gift+Sets',
        permanent: true,
      },
      {
        source: '/policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
