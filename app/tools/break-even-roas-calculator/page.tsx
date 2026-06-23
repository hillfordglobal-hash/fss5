import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import ROASCalculator from '@/components/ROASCalculator';
import ModuleInteractivity from '@/components/ModuleInteractivity';

export const metadata: Metadata = {
  // Spec (Task 6.1): "Break-Even ROAS Calculator — Free Tool for Dropshippers"
  title: 'Break-Even ROAS Calculator — Free Tool for Dropshippers',
  description:
    'Calculate your exact break-even ROAS instantly. Enter your product cost, shipping, and fees — get your break-even ROAS in seconds. Free, no signup required.',
  alternates: { canonical: 'https://firstsalesociety.com/tools/break-even-roas-calculator' },
  openGraph: {
    type: 'website',
    title: 'Break-Even ROAS Calculator — Free Dropshipping Tool',
    description: 'Calculate your exact break-even ROAS instantly. Enter product cost, shipping, and fees — get your number in seconds. Free, no signup.',
    url: 'https://firstsalesociety.com/tools/break-even-roas-calculator',
    siteName: 'First Sale Society',
    images: [{ url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Break-Even ROAS Calculator — Free for Dropshippers',
    description: 'Calculate your break-even ROAS instantly. Free, no signup required.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://firstsalesociety.com/tools' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Break-Even ROAS Calculator',
      item: 'https://firstsalesociety.com/tools/break-even-roas-calculator',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://firstsalesociety.com/tools/break-even-roas-calculator#tool',
  name: 'Break-Even ROAS Calculator',
  url: 'https://firstsalesociety.com/tools/break-even-roas-calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any (web-based)',
  datePublished: '2026-01-01',
  inLanguage: 'en',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free calculator for finding your break-even Return on Ad Spend (ROAS) based on selling price, product cost, shipping, and payment fees.',
  featureList: [
    'Break-Even ROAS calculation',
    'Gross Profit Margin calculation',
    'Real-time computation',
    'No signup required',
    'Free to use',
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Break-Even ROAS',
  description:
    'Find the minimum Return on Ad Spend (ROAS) you need to break even on a dropshipping product, given your selling price, product cost, shipping, and payment fees.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Enter your selling price',
      text: 'Enter the price you sell the product for, in dollars.',
    },
    {
      '@type': 'HowToStep',
      name: 'Enter your product + shipping cost',
      text: 'Enter your total landed cost — what you pay your supplier for the product and shipping combined.',
    },
    {
      '@type': 'HowToStep',
      name: 'Enter the shipping you charge customers',
      text: 'Enter any shipping fee you charge the customer at checkout, or 0 if shipping is free.',
    },
    {
      '@type': 'HowToStep',
      name: 'Enter your payment processing fees',
      text: 'Enter your Shopify/payment processor fee as a percentage, typically around 2.9%.',
    },
    {
      '@type': 'HowToStep',
      name: 'Read your break-even ROAS',
      text: 'The calculator instantly shows the minimum ROAS you need — any Meta ad performing below that number is losing you money.',
    },
  ],
};

// FAQ content for the calculator page, written to match the exact formula
// already taught in Module 05 (Validate the Product): Selling Price ÷ Gross
// Profit = Break-Even ROAS. No new claims invented — this restates the same
// course-taught method in accordion form, per the deep research report's
// Part 7B page template ("Add an FAQ section with accordions at the bottom
// to target search queries like 'how to calculate break-even ROAS'").
const calculatorFaqs = [
  {
    q: 'How do you calculate break-even ROAS?',
    a: 'Break-even ROAS is your selling price divided by your gross profit per order. Gross profit is your selling price minus product cost, shipping, and payment fees. If your gross profit is $20 on a $50 sale, your break-even ROAS is 2.5×.',
  },
  {
    q: 'What does break-even ROAS actually mean?',
    a: "It's the minimum Return on Ad Spend you need just to cover your costs — not to profit. Any ad performing below your break-even ROAS is losing you money on every sale, even if revenue looks healthy.",
  },
  {
    q: 'What is a good break-even ROAS for dropshipping?',
    a: 'Lower is better — it means more margin cushion before you lose money. A break-even ROAS of 1.5–2× gives more room to scale than 3–4×, which leaves almost no margin for ad inefficiency or returns.',
  },
  {
    q: 'Why does the calculator need my payment processing fees?',
    a: 'Shopify and payment processors typically take 2–3% of every transaction. That comes out of your margin before ad costs, so leaving it out understates your true break-even ROAS.',
  },
];

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: calculatorFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function ROASCalculatorPage() {
  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema, howToSchema, faqPageSchema]} />
      <ModuleInteractivity />
      <AnalyticsEvents pageType="tool" />
      <div className="module-content">
        <h1>🧮 Break-Even ROAS Calculator</h1>
        <p>
          Know your number before you spend a dollar. Every kill/scale decision you make compares your actual ROAS
          to this number — not to a generic benchmark.
        </p>
        <ROASCalculator />

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <h3>Use This Calculator In Context</h3>
          <ul>
            <li>
              <Link href="/course/validate-the-product">
                Learn how to use break-even ROAS in product validation →
              </Link>
            </li>
            <li>
              <Link href="/course/kill-or-scale">See how break-even ROAS drives kill/scale decisions →</Link>
            </li>
            <li>
              <Link href="/glossary/break-even-roas">Read the full Break-Even ROAS definition →</Link>
            </li>
            <li>
              <Link href="/glossary/roas">What is ROAS? →</Link>
            </li>
          </ul>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <h3>Break-Even ROAS — Common Questions</h3>
          <div className="faq-list">
            {calculatorFaqs.map((f) => (
              <div className="faq-item" key={f.q}>
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
