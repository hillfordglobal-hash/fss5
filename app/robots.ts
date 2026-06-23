import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/drafts/', '/unlisted/'],
    },
    sitemap: 'https://firstsalesociety.com/sitemap.xml',
  };
}
