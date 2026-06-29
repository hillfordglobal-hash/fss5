import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import ResourceNavBar from '@/components/ResourceNavBar';
import { glossaryTerms } from '@/data/glossary';

export const metadata: Metadata = {
  title: 'Ecommerce & Dropshipping Glossary — 49 Operational Definitions',
  description:
    'Ecommerce glossary — 49 operational definitions. ROAS, CPM, CPA, MER, CBO, AOV, surf scaling, ugly winner, and more. How operators actually use each metric, not textbook theory.',
  alternates: { canonical: 'https://firstsalesociety.com/glossary' },
  openGraph: {
    type: 'website',
    title: 'Ecommerce & Dropshipping Glossary — 49 Operational Definitions',
    description: '49 ecommerce and dropshipping terms defined operationally — ROAS, CPM, CPA, MER, CBO, AOV, surf scaling, ugly winner, and more.',
    url: 'https://firstsalesociety.com/glossary',
    siteName: 'First Sale Society',
    images: [{ url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png', width: 1200, height: 630, alt: 'First Sale Society — Ecommerce & Dropshipping Glossary' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce & Dropshipping Glossary — 49 Operational Definitions',
    description: '49 ecommerce terms defined operationally: ROAS, CPA, CPM, MER, AOV, surf scaling, ugly winner, and more. How operators use each metric.',
    images: ['https://firstsalesociety.com/moduleimages/firstsalesociety.png'],
  },
};

const categories = Array.from(new Set(glossaryTerms.map((t) => t.tag))).sort();

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://firstsalesociety.com/glossary' },
  ],
};

const definedTermSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': 'https://firstsalesociety.com/glossary',
  name: 'First Sale Society Ecommerce & Dropshipping Glossary',
  description:
    'Operational definitions of ecommerce and dropshipping terms — ROAS, CPM, CPA, MER, AOV, CAC, LTV, and more. Defined the way operators use them.',
  url: 'https://firstsalesociety.com/glossary',
  hasDefinedTerm: glossaryTerms.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.term,
    url: `https://firstsalesociety.com/glossary/${t.slug}`,
  })),
};

export default function GlossaryIndexPage() {
  return (
    <>
      <SchemaMarkup schema={[definedTermSetSchema, breadcrumbSchema]} />
      <AnalyticsEvents pageType="resource" />
      <div className="hero stage3">
        <div className="hero-eyebrow">Operator Glossary</div>
        <h1>
          Ecommerce <em>Glossary</em>
        </h1>
        <p className="hero-sub">
          Every metric and concept that matters in ecommerce and dropshipping — defined the way operators use them, with the common mistakes that come from misreading each one.
        </p>
        <div className="hero-meta">
          <div className="hero-stat">
            <b className="hsv">{glossaryTerms.length}</b>
            <span className="hsl">Terms defined</span>
          </div>
          <div className="hero-stat">
            <b className="hsv">{categories.length}</b>
            <span className="hsl">Categories</span>
          </div>
        </div>
      </div>

      <div className="module-content">
        {categories.map((cat) => {
          const terms = glossaryTerms.filter((t) => t.tag === cat);
          return (
            <div key={cat} style={{ marginBottom: 28 }}>
              <h3>{cat}</h3>
              <ul>
                {terms.map((t) => (
                  <li key={t.id}>
                    <Link href={`/glossary/${t.slug}`}>
                      <strong>{t.term}</strong>
                    </Link>
                    {' — '}
                    {t.definitionText.split(' ').slice(0, 15).join(' ')}…
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <ResourceNavBar current="/glossary" />
    </>
  );
}
