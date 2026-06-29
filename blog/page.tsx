import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { blogPosts, blogPillars } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Ecommerce Operator Blog — First Sale Society',
  description: 'Operator-written guides on dropshipping and ecommerce — product research, Meta ads, margins, sourcing, store CRO, and scaling. Tied directly to each curriculum module.',
  alternates: { canonical: 'https://firstsalesociety.com/blog' },
  openGraph: {
    type: 'website',
    title: 'Ecommerce Operator Blog — First Sale Society',
    description: 'Operator-written guides on dropshipping and ecommerce — product research, Meta ads, margins, sourcing, store CRO, and scaling.',
    url: 'https://firstsalesociety.com/blog',
    siteName: 'First Sale Society',
    images: [{ url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png', width: 1200, height: 630, alt: 'First Sale Society — Dropshipping Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce Operator Blog — First Sale Society',
    description: 'Operator-written guides on product research, Meta ads, margins, sourcing, store CRO, and scaling.',
    images: ['https://firstsalesociety.com/moduleimages/firstsalesociety.png'],
  },
};

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://firstsalesociety.com/blog',
  name: 'First Sale Society Operator Blog',
  description: 'Operator-written guides on dropshipping and ecommerce — margins, media buying, sourcing, and store operations.',
  url: 'https://firstsalesociety.com/blog',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://firstsalesociety.com#org',
    name: 'First Sale Society',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://firstsalesociety.com/blog' },
  ],
};

export default function BlogIndexPage() {
  return (
    <>
      <SchemaMarkup schema={[collectionPageSchema, breadcrumbSchema]} />
      <AnalyticsEvents pageType="blog" />
      <div className="hero stage1">
        <div className="hero-eyebrow">Operator Blog</div>
        <h1>
          Operator <em>Guides</em>
        </h1>
        <p className="hero-sub">
          Written by operators who run the ad accounts, read the P&amp;Ls, and work with the suppliers. Covers product research, media buying, margins, sourcing, and store operations.
        </p>
      </div>

      <div className="module-content">
        {blogPosts.length === 0 ? (
          <>
            <p>
              The curriculum, <Link href="/glossary">glossary</Link>, and{' '}
              <Link href="/faq">FAQ</Link> cover the core material. These posts go deeper on specific topics — practical
              guides, worked examples, and operator decisions with trade-offs explained.
            </p>
            <h2>What we are covering</h2>
            <ul>
              {blogPillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
          </>
        ) : (
          blogPillars.map((pillar) => {
            const posts = blogPosts.filter((p) => p.pillar === pillar);
            if (!posts.length) return null;
            return (
              <div key={pillar} style={{ marginBottom: 28 }}>
                <h3>{pillar}</h3>
                <ul>
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
