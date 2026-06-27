import type { MetadataRoute } from 'next';
import { courseModules } from '@/data/modules';
import { glossaryTerms } from '@/data/glossary';
import { faqItems } from '@/data/faqs';
import { blogPosts } from '@/data/blog';
import { toolsData } from '@/data/toolsData';

const SITE = 'https://firstsalesociety.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/toolkit`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/swipe-files`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/ai-ad-lab`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ];

  // The flagship calculator has its own static route, not in toolsData.
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/tools/break-even-roas-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...toolsData.map((t) => ({
      url: `${SITE}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const coursePages: MetadataRoute.Sitemap = courseModules.map((m) => ({
    url: `${SITE}/course/${m.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((g) => ({
    url: `${SITE}/glossary/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const faqPages: MetadataRoute.Sitemap = faqItems.map((f) => ({
    url: `${SITE}/faq/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${SITE}/blog/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...coursePages, ...glossaryPages, ...faqPages, ...blogPages];
}
