import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import ResourceNavBar from '@/components/ResourceNavBar';
import { glossaryTerms } from '@/data/glossary';

export const metadata: Metadata = {
  title: 'Dropshipping Glossary — 49 Terms Defined for Operators',
  description:
    'Dropshipping glossary — 49 operator definitions. ROAS, CPM, CPA, CBO, AOV, surf scaling, ugly winner ads, and more. Defined operationally, not from textbooks.',
  alternates: { canonical: 'https://firstsalesociety.com/glossary' },
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
  name: 'First Sale Society Glossary',
  description:
    'Operational definitions of every dropshipping and Meta Ads term used across the First Sale Society course.',
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
        <div className="hero-eyebrow">Operator Resources · Reference Glossary</div>
        <h1>
          Full Operator <em>Glossary</em>
        </h1>
        <p className="hero-sub">
          Every term that appears in this course, defined operationally — not textbook definitions. Includes the
          common mistakes operators make with each concept.
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
