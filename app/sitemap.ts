import { MetadataRoute } from 'next';
import { courseModules } from '@/data/modules';
import { glossaryTerms } from '@/data/glossary';
import { faqItems } from '@/data/faqs';

const BASE_URL = 'https://firstsalesociety.com';
const LAST_MODIFIED = new Date('2026-06-01');

// Priority tiers based on research report Part 5 "Tool Pages Strategy" and
// Part 3 keyword master list. Higher priority = faster crawl frequency.
// Tier 1 (1.0): Homepage + ROAS calculator (fastest-to-rank pages, per report)
// Tier 2 (0.95): Glossary index + FAQ index (featured snippet / PAA targets)
// Tier 3 (0.9): High-traffic module pages + swipe files + toolkit
// Tier 4 (0.85): Individual glossary terms (definition snippet targets)
// Tier 5 (0.8): Individual FAQ pages (long-tail PAA targets)
// Tier 6 (0.7): AI ad lab, tools directory, blog scaffold

const HIGH_VALUE_MODULE_SLUGS = new Set([
  'validate-the-product',     // "how to validate a dropshipping product" 900/mo
  'kill-or-scale',            // "when to kill a dropshipping ad" 150/mo
  'legal-tax-business',       // "do I need an LLC" 1,800/mo — high commercial intent
  'set-up-your-campaign',     // "CBO campaign dropshipping" 200/mo
  'build-shopify-store',      // "how to build a Shopify dropshipping store" 2,600/mo
  'pick-your-niche',          // "dropshipping niche selection" 3,000/mo
  'find-winning-products',    // "how to find winning products" 2,200/mo
  'scale-your-ads',           // "how to scale Meta ads" 2,200/mo
  'image-ads',                // "dropshipping ad creative" 2,000/mo
  'video-ads',                // "AI video ads" 500/mo
]);

const HIGH_VALUE_GLOSSARY_SLUGS = new Set([
  'roas',           // "what is ROAS" 3,500/mo
  'cpm',            // "what is CPM in advertising" 5,200/mo
  'cpa',            // "what is CPA marketing" 2,900/mo
  '3pl',            // "what is a 3PL" 2,100/mo
  'vsl',            // "what is a VSL" 1,300/mo
  'advertorial-bridge-page', // "what is an advertorial" 1,100/mo
  'cac',            // "what is customer acquisition cost" 800/mo
  'ltv',            // "what is LTV customer" 720/mo
  'cogs',           // "what is COGS ecommerce" 600/mo
  'cvr',            // "what is CVR ecommerce" 400/mo
  'creative-fatigue',        // "what is creative fatigue Facebook ads" 300/mo
  'break-even-roas',         // "what is break even ROAS" 250/mo
  'surf-scaling',            // emerging term, unique to FSS content
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    // Tier 1 — fastest-to-rank, highest search volume pages
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly', lastModified: LAST_MODIFIED },
    {
      url: `${BASE_URL}/tools/break-even-roas-calculator`,
      priority: 1.0,
      changeFrequency: 'weekly',
      lastModified: LAST_MODIFIED,
    },
    // Tier 2 — featured snippet / PAA targets
    { url: `${BASE_URL}/glossary`, priority: 0.95, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/faq`, priority: 0.95, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    // Tier 3 — resource hub pages
    { url: `${BASE_URL}/toolkit`, priority: 0.85, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/swipe-files`, priority: 0.85, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/tools`, priority: 0.8, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/ai-ad-lab`, priority: 0.75, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'weekly', lastModified: LAST_MODIFIED },
  ];

  const modulePages: MetadataRoute.Sitemap = courseModules.map((m) => ({
    url: `${BASE_URL}/course/${m.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: HIGH_VALUE_MODULE_SLUGS.has(m.slug) ? 0.95 : m.phase >= 1 && m.phase <= 6 ? 0.88 : 0.82,
  }));

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${BASE_URL}/glossary/${t.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: HIGH_VALUE_GLOSSARY_SLUGS.has(t.slug) ? 0.9 : 0.8,
  }));

  const faqPages: MetadataRoute.Sitemap = faqItems.map((f) => ({
    url: `${BASE_URL}/faq/${f.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...corePages, ...modulePages, ...glossaryPages, ...faqPages];
}
