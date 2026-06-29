import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import Calculator from '@/components/Calculator';
import WinningProductScorecard from '@/components/tools/WinningProductScorecard';
import UTMBuilder from '@/components/tools/UTMBuilder';
import NicheIdeaGenerator from '@/components/tools/NicheIdeaGenerator';
import OfferCard from '@/components/OfferCard';
import { toolsData, toolsBySlug, toolUrl, TOOLS_SITE } from '@/data/toolsData';
import { faqItems } from '@/data/faqs';

export function generateStaticParams() {
  return toolsData.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = toolsBySlug[slug];
  if (!tool) return {};
  const url = toolUrl(tool.slug);
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      siteName: 'First Sale Society',
      images: [{ url: `${TOOLS_SITE}/moduleimages/firstsalesociety.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: tool.metaTitle, description: tool.metaDescription },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const tool = toolsBySlug[slug];
  if (!tool) notFound();
  const url = toolUrl(tool.slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: TOOLS_SITE },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${TOOLS_SITE}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.navName, item: url },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}#tool`,
    name: tool.navName,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any (web-based)',
    datePublished: tool.datePublished,
    inLanguage: 'en',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: tool.metaDescription,
    featureList: tool.features,
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${tool.navName}`,
    description: tool.intro,
    step: tool.steps.map((s) => ({ '@type': 'HowToStep', name: s.name, text: s.text })),
  };

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const relatedFaqItems = (tool.relatedFaqs ?? [])
    .map((s) => faqItems.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema, howToSchema, faqPageSchema]} />
      <ModuleInteractivity />
      <AnalyticsEvents pageType="tool" />
      <div className="module-content">
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 14 }}>
          <Link href="/" style={{ color: 'var(--text3)' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/tools" style={{ color: 'var(--text3)' }}>Tools</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: 'var(--text2)' }}>{tool.navName}</span>
        </nav>

        <h1>
          {tool.emoji} {tool.h1}
        </h1>
        <p>{tool.intro}</p>

        {tool.widget === 'scorecard' ? (
          <WinningProductScorecard />
        ) : tool.widget === 'utm' ? (
          <UTMBuilder />
        ) : tool.widget === 'niche' ? (
          <NicheIdeaGenerator />
        ) : (
          <Calculator toolId={tool.slug} />
        )}

        {/* Monetization: contextual offer right after the result */}
        <div style={{ margin: '8px 0 32px' }}>
          <div className="inline-tools-label">Recommended for this</div>
          <div className="inline-tools-grid">
            <OfferCard offer={tool.offer} />
          </div>
        </div>

        {/* What-is / how-to body — the keyword-rich indexable copy */}
        <div style={{ marginTop: 8 }}>
          <h2>How to use it</h2>
          <ol>
            {tool.steps.map((s) => (
              <li key={s.name} style={{ marginBottom: 6 }}>
                <strong>{s.name}.</strong> {s.text}
              </li>
            ))}
          </ol>
        </div>

        <div style={{ marginTop: 24 }}>
          <h2>{tool.h1} — the context</h2>
          {tool.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <h3>Use this in context</h3>
          <ul>
            {tool.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {relatedFaqItems.length > 0 && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <h3>Operator questions</h3>
            <ul>
              {relatedFaqItems.map((f) => (
                <li key={f.slug}>
                  <Link href={`/faq/${f.slug}`}>{f.question}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <h3>{tool.navName} — common questions</h3>
          <div className="faq-list">
            {tool.faqs.map((f) => (
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
