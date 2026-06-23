import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { blogPosts, blogPillars } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Dropshipping Blog — Guides from Active Operators',
  description: 'Dropshipping guides and deep dives from active operators — product research, Meta ads, sourcing, store CRO, and scaling. Tied directly to each course module.',
  alternates: { canonical: 'https://firstsalesociety.com/blog' },
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
      <SchemaMarkup schema={breadcrumbSchema} />
      <AnalyticsEvents pageType="blog" />
      <div className="hero stage1">
        <div className="hero-eyebrow">First Sale Society · Blog</div>
        <h1>
          Guides &amp; <em>Deep Dives</em>
        </h1>
        <p className="hero-sub">
          Posts on product research, media buying, sourcing, conversion, margins, and the operational side of
          running a real store — organized into six pillars.
        </p>
      </div>

      <div className="module-content">
        {blogPosts.length === 0 ? (
          <>
            <p>
              No posts published yet — the 27-module course, full <Link href="/glossary">glossary</Link>, and{' '}
              <Link href="/faq">FAQ</Link> already cover the core curriculum in depth. Blog posts will expand on
              specific topics as they&apos;re published; see the content pillars below for what&apos;s planned.
            </p>
            <h2>Coming Content Pillars</h2>
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
