import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import WinningStoresCarousel from '@/components/WinningStoresCarousel';
import { courseModules } from '@/data/modules';

export const metadata: Metadata = {
  title: 'First Sale Society — The Ecommerce Operator Curriculum',
  description:
    'The complete ecommerce operator curriculum. Product research, Meta ads, Shopify store building, supplier sourcing, and scaling — built by operators running real ad spend in 2026.',
  alternates: { canonical: 'https://firstsalesociety.com' },
};

const phaseLabels: Record<number, string> = {
  1: 'Phase 1 · Find a Product',
  2: 'Phase 2 · Source It',
  3: 'Phase 3 · Build the Store',
  4: 'Phase 4 · Make Ads',
  5: 'Phase 5 · Launch & Test Ads',
  6: 'Phase 6 · After First Sales',
  7: 'Phase 7 · Scale & Build a Brand',
  0: 'Bonus Modules',
};
const phaseOrder = [1, 2, 3, 4, 5, 6, 7, 0];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': 'https://firstsalesociety.com#course',
  name: 'First Sale Society — Ecommerce Operator Curriculum',
  description:
    'A complete ecommerce operator curriculum covering product research, Meta ads, Shopify store building, supplier sourcing, and brand building. Built by active operators in 2026.',
  url: 'https://firstsalesociety.com',
  provider: {
    '@type': 'Organization',
    '@id': 'https://firstsalesociety.com#org',
    name: 'First Sale Society',
    url: 'https://firstsalesociety.com',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT10H',
  },
  educationalLevel: 'Beginner',
  inLanguage: 'en',
  teaches:
    'Dropshipping, ecommerce, Meta advertising, product research, supplier sourcing, Shopify store building, email marketing, brand building',
  numberOfCredits: 27,
  totalHistoricalEnrollment: 0,
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://firstsalesociety.com#curriculum',
  name: 'First Sale Society Course Curriculum',
  numberOfItems: courseModules.length,
  itemListElement: courseModules.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://firstsalesociety.com/course/${m.slug}`,
    name: m.title,
  })),
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={[courseSchema, itemListSchema]} />
      <AnalyticsEvents pageType="home" />

      <div className="hero stage1">
        <div className="hero-eyebrow">Operator Curriculum · 2026</div>
        <h1>
          The Complete <em>Ecommerce Operator Library</em>
        </h1>
        <p className="hero-sub">
          Product research, Meta ads, store building, creative testing, and scaling — the way operators
          actually do it. Curated and written by active operators running real ad spend in 2026.
        </p>
        <div className="hero-meta">
          <div className="hero-stat">
            <b className="hsv">27</b>
            <span className="hsl">Course modules</span>
          </div>
          <div className="hero-stat">
            <b className="hsv">7</b>
            <span className="hsl">Bonus modules</span>
          </div>
          <div className="hero-stat">
            <b className="hsv">$0</b>
            <span className="hsl">Current access cost</span>
          </div>
        </div>
      </div>

      <div className="module-content">
        <WinningStoresCarousel limit={3} />

        <div style={{ margin: '24px 0' }}>
          <Link
            href="/course/start-here"
            className="module-nav-btn primary"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Begin the curriculum →
          </Link>
        </div>

        <h2>The Full Curriculum</h2>
        {phaseOrder.map((phase) => {
          const modules = courseModules.filter((m) => m.phase === phase);
          if (!modules.length) return null;
          return (
            <div key={phase} style={{ marginBottom: 28 }}>
              <h3>{phaseLabels[phase]}</h3>
              <ul>
                {modules.map((m) => (
                  <li key={m.id}>
                    <Link href={`/course/${m.slug}`}>
                      {m.moduleNumber}: {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <h2>More Resources</h2>
        <div className="inline-tools-grid">
          <Link className="itkc" href="/tools/break-even-roas-calculator">
            <div className="itkc-info">
              <div className="itkc-name">Break-Even ROAS Calculator</div>
              <div className="itkc-desc">Know your number before you spend a dollar on ads</div>
            </div>
          </Link>
          <Link className="itkc" href="/glossary">
            <div className="itkc-info">
              <div className="itkc-name">Full Glossary</div>
              <div className="itkc-desc">Every dropshipping & Meta Ads term, defined operationally</div>
            </div>
          </Link>
          <Link className="itkc" href="/faq">
            <div className="itkc-info">
              <div className="itkc-name">FAQs</div>
              <div className="itkc-desc">Real questions pulled from real community conversations</div>
            </div>
          </Link>
          <Link className="itkc" href="/toolkit">
            <div className="itkc-info">
              <div className="itkc-name">Toolkit</div>
              <div className="itkc-desc">Every tool vetted by operators running real ad spend</div>
            </div>
          </Link>
          <Link className="itkc" href="/swipe-files">
            <div className="itkc-info">
              <div className="itkc-name">Swipe Files</div>
              <div className="itkc-desc">Real ads, real pages, real funnels to study</div>
            </div>
          </Link>
          <Link className="itkc" href="/ai-ad-lab">
            <div className="itkc-info">
              <div className="itkc-name">AI Ad Creative Lab</div>
              <div className="itkc-desc">Make every ad format without a camera or a crew</div>
            </div>
          </Link>
        </div>

        <div
          style={{
            margin: '32px 0 0',
            padding: '20px 24px',
            background: 'var(--surface2)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
            textAlign: 'center',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--heading)' }}>
            Join the operator community
          </div>
          <div style={{ fontSize: 13, color: 'var(--text2)' }}>
            Ad reviews, store critiques, real operator feedback. Ask anything.
          </div>
          <a
            href="https://discord.gg/sYwE5Mhw9Z"
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-block',
              background: '#7289da',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              padding: '7px 16px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Join Discord →
          </a>
        </div>
      </div>
    </>
  );
}
