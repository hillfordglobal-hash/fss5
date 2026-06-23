import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlossaryBackButton from '@/components/GlossaryBackButton';
import SchemaMarkup from '@/components/SchemaMarkup';
import { glossaryTerms } from '@/data/glossary';
import { courseModules } from '@/data/modules';

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) return {};
  return {
    title: `What is ${term.term}? ${term.term} Defined — First Sale Society`,
    description: term.metaDescription,
    alternates: { canonical: `https://firstsalesociety.com/glossary/${term.slug}` },
    openGraph: {
      type: 'article',
      title: `What is ${term.term}? — First Sale Society`,
      description: term.metaDescription,
      url: `https://firstsalesociety.com/glossary/${term.slug}`,
      siteName: 'First Sale Society',
    },
    twitter: {
      card: 'summary',
      title: `What is ${term.term}?`,
      description: term.metaDescription,
    },
  };
}

// Maps each glossary category tag to its most relevant course module slug.
const tagToModuleSlug: Record<string, string> = {
  'Meta Ads': 'pick-your-ad-angles',
  'Campaign Structure': 'set-up-your-campaign',
  Metrics: 'read-your-data',
  Creative: 'image-ads',
  Finance: 'cash-flow',
  Store: 'improve-your-store-page',
  Email: 'set-up-email-flows',
  'Supply Chain': 'connect-your-supplier',
  Tracking: 'read-your-data',
  Strategy: 'kill-or-scale',
  'Creative Strategy': 'pick-your-ad-angles',
  Account: 'handle-ad-account-bans',
  Scaling: 'scale-your-ads',
  Monetization: 'improve-your-offer',
  Funnel: 'native-ads-advertorials',
  CRO: 'improve-your-store-page',
  Copywriting: 'pick-your-ad-angles',
};

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = glossaryTerms.find((t) => t.slug === slug);
  if (!term) notFound();

  // Spec (Task 4.2): @id on DefinedTerm and inDefinedTermSet for AEO citation graph
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `https://firstsalesociety.com/glossary/${term.slug}#term`,
    name: term.term,
    description: term.definitionText,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': 'https://firstsalesociety.com/glossary',
      name: 'First Sale Society Dropshipping & Ecommerce Glossary',
      url: 'https://firstsalesociety.com/glossary',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://firstsalesociety.com/glossary' },
      { '@type': 'ListItem', position: 3, name: `What is ${term.term}?`, item: `https://firstsalesociety.com/glossary/${term.slug}` },
    ],
  };

  const related = glossaryTerms.filter((t) => t.tag === term.tag && t.slug !== term.slug).slice(0, 5);
  const relevantModuleSlug = tagToModuleSlug[term.tag];
  const relevantModule = relevantModuleSlug ? courseModules.find((m) => m.slug === relevantModuleSlug) : undefined;

  return (
    <>
      <SchemaMarkup schema={[definedTermSchema, breadcrumbSchema]} />
      <AnalyticsEvents pageType="resource" />

      <div className="module-content">
        <nav aria-label="Breadcrumb" style={{ fontSize: 12.5, color: 'var(--text3)', marginBottom: 12 }}>
          <Link href="/" style={{ color: 'var(--text3)' }}>Home</Link>
          {' › '}
          <Link href="/glossary" style={{ color: 'var(--text3)' }}>Glossary</Link>
          {' › '}
          <span style={{ color: 'var(--text2)' }}>{term.term}</span>
        </nav>

        {/* Spec Task 4.2: H1 must be "What is [Term]?" */}
        <GlossaryBackButton />
        <h1>What is {term.term}?</h1>
        <span className="glossary-tag">{term.tag}</span>

        {/* Definition block — verbatim from glossary data, blockquote styling */}
        <blockquote style={{
          borderLeft: '3px solid var(--accent)',
          paddingLeft: 20,
          margin: '20px 0',
          color: 'var(--text)',
          fontStyle: 'normal',
          background: 'var(--surface2)',
          borderRadius: '0 var(--r-md) var(--r-md) 0',
          padding: '16px 20px',
        }}>
          <div dangerouslySetInnerHTML={{ __html: term.definitionHTML }} />
        </blockquote>

        {/* Relevant course module CTA */}
        {relevantModule && (
          <div style={{ margin: '24px 0', padding: '16px 20px', background: 'var(--surface2)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text2)' }}>
              <strong style={{ color: 'var(--heading)' }}>Learn this in practice →</strong>{' '}
              <Link href={`/course/${relevantModule.slug}`} style={{ color: 'var(--accent)' }}>
                {relevantModule.title}
              </Link>
            </p>
          </div>
        )}

        {/* Related terms */}
        {related.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3>Related {term.tag} Terms</h3>
            <ul>
              {related.map((t) => (
                <li key={t.id}>
                  <Link href={`/glossary/${t.slug}`}>What is {t.term}?</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/glossary" className="module-nav-btn">← Full Glossary</Link>
          <Link href="/" className="module-nav-btn primary">Explore the Operator Library →</Link>
        </div>
      </div>
    </>
  );
}
