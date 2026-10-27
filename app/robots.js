export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deoexoticperfumes.vercel.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
