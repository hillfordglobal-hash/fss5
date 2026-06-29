import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import { faqItems } from '@/data/faqs';
import { glossaryTerms } from '@/data/glossary';
import { courseModules } from '@/data/modules';

export async function generateStaticParams() {
  return faqItems.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const faq = faqItems.find((f) => f.slug === slug);
  if (!faq) return {};
  return {
    title: `${faq.question} — First Sale Society`,
    description: faq.metaDescription,
    alternates: { canonical: `https://firstsalesociety.com/faq/${faq.slug}` },
    openGraph: {
      type: 'article',
      title: faq.question,
      description: faq.metaDescription,
      url: `https://firstsalesociety.com/faq/${faq.slug}`,
      siteName: 'First Sale Society',
      images: [{ url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png', width: 1200, height: 630, alt: faq.question }],
    },
    twitter: {
      card: 'summary_large_image',
      title: faq.question,
      description: faq.metaDescription,
      images: ['https://firstsalesociety.com/moduleimages/firstsalesociety.png'],
    },
  };
}

// Maps each FAQ category to its most relevant course module slug, so every
// FAQ page can link to "the relevant course module" per Task 10.1.
const categoryToModuleSlug: Record<string, string> = {
  'Dropshipping Fundamentals': 'start-here',
  'Product Research': 'find-winning-products',
  'Meta Ads': 'pick-your-ad-angles',
  Creatives: 'image-ads',
  'Store & Conversion': 'improve-your-store-page',
  'Cash Flow & Budget': 'cash-flow',
  Scaling: 'scale-your-ads',
  'Account & Compliance': 'handle-ad-account-bans',
  'Offer Engineering': 'improve-your-offer',
  'Supply Chain': 'connect-your-supplier',
  'Email & Backend': 'set-up-email-flows',
  'Reading Ad Data': 'read-your-data',
};

export default async function FAQItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const faq = faqItems.find((f) => f.slug === slug);
  if (!faq) notFound();

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://firstsalesociety.com/faq/${faq.slug}`,
    datePublished: '2026-01-01',
    dateModified: '2026-06-01',
    mainEntity: [
      {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answerText },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://firstsalesociety.com/faq' },
      { '@type': 'ListItem', position: 3, name: faq.question, item: `https://firstsalesociety.com/faq/${faq.slug}` },
    ],
  };

  const related = faqItems.filter((f) => f.category === faq.category && f.slug !== faq.slug).slice(0, 6);

  // Cross-links from relatedTools and relatedGlossary fields
  const relatedToolSlugs = faq.relatedTools ?? [];
  const relatedGlossaryTerms = (faq.relatedGlossary ?? [])
    .map((s) => glossaryTerms.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relevantModuleSlug = categoryToModuleSlug[faq.category];
  const relevantModule = relevantModuleSlug ? courseModules.find((m) => m.slug === relevantModuleSlug) : undefined;

  return (
    <>
      <SchemaMarkup schema={[faqPageSchema, breadcrumbSchema]} />
      <ModuleInteractivity />
      <AnalyticsEvents pageType="resource" />
      <div className="module-content">
        <nav aria-label="Breadcrumb" style={{ fontSize: 12.5, color: 'var(--text3)', marginBottom: 12 }}>
          <Link href="/" style={{ color: 'var(--text3)' }}>
            Home
          </Link>
          {' › '}
          <Link href="/faq" style={{ color: 'var(--text3)' }}>
            FAQ
          </Link>
          {' › '}
          <span style={{ color: 'var(--text2)' }}>{faq.category}</span>
        </nav>

        <h1>{faq.question}</h1>
        <div dangerouslySetInnerHTML={{ __html: faq.answerHTML }} />

        {relevantModule && (
          <p style={{ marginTop: 16 }}>
            <Link href={`/course/${relevantModule.slug}`}>
              Goes deeper in the curriculum: {relevantModule.title} →
            </Link>
          </p>
        )}

        {relatedToolSlugs.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3>Run the numbers</h3>
            <ul>
              {relatedToolSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={`/tools/${slug}`}>
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedGlossaryTerms.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3>Key terms</h3>
            <ul>
              {relatedGlossaryTerms.map((t) => (
                <li key={t.slug}>
                  <Link href={`/glossary/${t.slug}`}>What is {t.term}? →</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {related.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3>More on {faq.category}</h3>
            <ul>
              {related.map((f) => (
                <li key={f.id}>
                  <Link href={`/faq/${f.slug}`}>{f.question}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/faq" className="module-nav-btn">
            ← All questions
          </Link>
          <Link href="/" className="module-nav-btn primary">
            Back to the curriculum →
          </Link>
        </div>
      </div>
    </>
  );
}
