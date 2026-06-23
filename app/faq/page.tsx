import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import ResourceNavBar from '@/components/ResourceNavBar';
import { faqItems } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Dropshipping FAQ — 79 Questions Answered by Active Operators',
  description:
    'Dropshipping FAQ: 79 real questions answered by active operators — LLC requirements, Meta ad spend, product validation, ROAS, chargebacks, and more.',
  alternates: { canonical: 'https://firstsalesociety.com/faq' },
  openGraph: {
    type: 'website',
    title: 'Dropshipping FAQ — 79 Questions Answered by Active Operators',
    description: '79 real dropshipping questions answered by active operators — Meta ads, product validation, ROAS, supplier sourcing, legal, and more.',
    url: 'https://firstsalesociety.com/faq',
  },
};

const categories = Array.from(new Set(faqItems.map((f) => f.category)));

// Top 20 highest-traffic Q/As for FAQPage schema (per spec Task 5.1 and research report Part 5).
// Including all 79 bloats the schema and can cause Google to ignore it.
// These 20 map to the highest search-volume question queries from the keyword master list.
const TOP_FAQ_SLUGS = [
  'how-do-i-validate-a-product-before-spending-money-on',
  'when-exactly-should-i-kill-a-product-vs-kill-a',
  'how-much-money-do-i-actually-need-to-start-dropshipping',
  'my-ad-account-just-got-banned-what-do-i-do-right-now',
  'abo-or-cbo-for-testing-the-community-cant-agree-and',
  'how-long-does-it-take-to-make-my-first-sale',
  'do-i-need-to-register-a-business-or-get-an',
  'i-have-atcs-but-zero-purchases-my-product-page-looks',
  'my-campaign-is-set-to-100-day-but-only-spent',
  'i-got-a-chargeback-how-do-i-fight-it-and-how',
  'my-roas-looks-great-but-im-not-profitable-whats',
  'im-at-break-even-roas-but-cant-get-profitable-what',
  'should-i-use-gempages-replo-or-just-the-default',
  'what-are-realistic-shipping-times-from-chinese-suppliers',
  'i-scaled-too-aggressively-and-now-my-roas-has-crashed',
  'what-should-i-do-when-ads-with-good-metrics-are-getting',
  'my-supplier-increased-prices-how-do-i-know-when-to',
  'how-do-i-know-if-my-pixel-is-set-up-correctly',
  'whats-a-good-abandoned-cart-recovery-rate-and-how',
  'i-have-purchases-but-my-roas-looks-different-in-meta',
];

const topFaqs = TOP_FAQ_SLUGS
  .map(s => faqItems.find(f => f.slug.startsWith(s.slice(0, 35))))
  .filter(Boolean);

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://firstsalesociety.com/faq',
  mainEntity: topFaqs.map((f) => ({
    '@type': 'Question',
    name: f!.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f!.answerText,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://firstsalesociety.com/faq' },
  ],
};

export default function FAQIndexPage() {
  return (
    <>
      <SchemaMarkup schema={[faqPageSchema, breadcrumbSchema]} />
      <AnalyticsEvents pageType="resource" />
      <div className="hero stage2">
        <div className="hero-eyebrow">Operator Resources · FAQs</div>
        <h1>
          {faqItems.length}+ Real Questions.<br />
          <em>Real Answers.</em>
        </h1>
        <p className="hero-sub">
          Not generic FAQs invented for a course. Every question here was pulled from real community conversations —
          the exact questions operators asked before they understood, or learned the expensive way.
        </p>
        <div className="hero-meta">
          <div className="hero-stat">
            <b className="hsv">{faqItems.length}</b>
            <span className="hsl">Real operator questions</span>
          </div>
          <div className="hero-stat">
            <b className="hsv">{categories.length}</b>
            <span className="hsl">Categories covered</span>
          </div>
        </div>
      </div>

      <div className="module-content">
        {categories.map((cat) => {
          const items = faqItems.filter((f) => f.category === cat);
          return (
            <div key={cat} style={{ marginBottom: 28 }}>
              <h3>{cat}</h3>
              <ul>
                {items.map((f) => (
                  <li key={f.id}>
                    <Link href={`/faq/${f.slug}`}>{f.question}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <ResourceNavBar current="/faq" />
    </>
  );
}
