import type { MetadataRoute } from 'next';

const SITE = 'https://firstsalesociety.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — allow everything
      {
        userAgent: '*',
        allow: '/',
      },
      // AI training crawlers — disallow (content is human-curated operator knowledge,
      // not intended for training data scraping without attribution)
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
