import type { MetadataRoute } from 'next';
import { courseModules } from '@/data/modules';
import { glossaryTerms } from '@/data/glossary';
import { faqItems } from '@/data/faqs';
import { blogPosts } from '@/data/blog';
import { toolsData } from '@/data/toolsData';

const SITE = 'https://firstsalesociety.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use explicit dates rather than new Date() — Google ignores lastModified when
  // every page shows the current build timestamp, treating it as noise.
  // Update CONTENT_DATE whenever significant content changes are deployed.
  const CONTENT_DATE = new Date('2026-06-28');
  const TOOL_DATE = new Date('2026-06-01');
  const COURSE_DATE = new Date('2026-06-01');
  const GLOSSARY_DATE = new Date('2026-05-01');
  const FAQ_DATE = new Date('2026-05-01');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: CONTENT_DATE, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/tools`, lastModified: TOOL_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/toolkit`, lastModified: CONTENT_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/swipe-files`, lastModified: CONTENT_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/ai-ad-lab`, lastModified: CONTENT_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`, lastModified: FAQ_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/glossary`, lastModified: GLOSSARY_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/blog`, lastModified: CONTENT_DATE, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/about`, lastModified: CONTENT_DATE, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // The flagship calculator has its own static route, not in toolsData.
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/tools/break-even-roas-calculator`, lastModified: TOOL_DATE, changeFrequency: 'monthly', priority: 0.8 },
    ...toolsData.map((t) => ({
      url: `${SITE}/tools/${t.slug}`,
      lastModified: TOOL_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];

  const coursePages: MetadataRoute.Sitemap = courseModules.map((m) => ({
    url: `${SITE}/course/${m.slug}`,
    lastModified: COURSE_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((g) => ({
    url: `${SITE}/glossary/${g.slug}`,
    lastModified: GLOSSARY_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const faqPages: MetadataRoute.Sitemap = faqItems.map((f) => ({
    url: `${SITE}/faq/${f.slug}`,
    lastModified: FAQ_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${SITE}/blog/${b.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...coursePages, ...glossaryPages, ...faqPages, ...blogPages];
}
