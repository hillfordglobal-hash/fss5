import type { Metadata } from 'next';
import Link from 'next/link';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import SchemaMarkup from '@/components/SchemaMarkup';
import ToolIcon from '@/components/ToolIcon';
import { toolsData, toolCategories, TOOLS_SITE, type ToolCategory } from '@/data/toolsData';

export const metadata: Metadata = {
  title: 'Free Dropshipping & Ecommerce Calculators — First Sale Society',
  description:
    'A free suite of dropshipping calculators: break-even ROAS, profit margin, net profit, product pricing, Shopify fees, conversion rate, AOV and more. No signup required.',
  alternates: { canonical: `${TOOLS_SITE}/tools` },
  openGraph: {
    type: 'website',
    title: 'Free Dropshipping & Ecommerce Calculators',
    description:
      'A free suite of dropshipping calculators — break-even ROAS, profit margin, net profit, pricing, Shopify fees, conversion rate, AOV and more. No signup.',
    url: `${TOOLS_SITE}/tools`,
    siteName: 'First Sale Society',
  },
};

// The flagship Break-Even ROAS tool lives on its own static route and is shown
// first under Ad Metrics.
const flagship = {
  slug: 'break-even-roas-calculator',
  emoji: '🧮',
  navName: 'Break-Even ROAS Calculator',
  navDesc: 'Know the minimum ROAS you need before you spend a dollar on ads',
  category: 'Ad Metrics' as ToolCategory,
};

export default function ToolsIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Dropshipping & Ecommerce Calculators',
    itemListElement: [flagship, ...toolsData].map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.navName,
      url: `${TOOLS_SITE}/tools/${t.slug}`,
    })),
  };

  const byCategory = (cat: ToolCategory) =>
    [flagship, ...toolsData].filter((t) => t.category === cat);

  return (
    <>
      <SchemaMarkup schema={itemListSchema} />
      <AnalyticsEvents pageType="other" />
      <div className="module-content">
        <h1>Free Tools</h1>
        <p>
          Free, instant calculators for dropshipping and ecommerce operators — no signup, no email. Every tool runs
          in your browser and links back to the exact module that teaches the strategy behind the number.
        </p>

        {toolCategories.map((cat) => {
          const tools = byCategory(cat);
          if (tools.length === 0) return null;
          return (
            <section key={cat} style={{ marginTop: 28 }}>
              <div className="inline-tools-label">{cat}</div>
              <div className="inline-tools-grid">
                {tools.map((t) => (
                  <Link className="itkc" href={`/tools/${t.slug}`} key={t.slug}>
                    <div className="itkc-info">
                      <div className="itkc-name" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <span style={{ color: 'var(--accent)', display: 'inline-flex' }}>
                          <ToolIcon slug={t.slug} size={18} />
                        </span>
                        {t.navName}
                      </div>
                      <div className="itkc-desc">{t.navDesc}</div>
                    </div>
                    <span className="itkc-cta">Open →</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <p style={{ marginTop: 32, fontSize: 14, color: 'var(--text3)' }}>
          More calculators are added regularly. Have one you want? Mention it in the{' '}
          <a href="https://discord.gg/sYwE5Mhw9Z" target="_blank" rel="noopener">Discord</a>.
        </p>
      </div>
    </>
  );
}
