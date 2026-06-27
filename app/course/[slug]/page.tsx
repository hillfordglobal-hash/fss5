import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import ModuleNavRenderer from '@/components/ModuleNavRenderer';
import TwitterEmbedLoader from '@/components/TwitterEmbedLoader';
import GlossaryTermLinker from '@/components/GlossaryTermLinker';
import WinningStoresCarousel from '@/components/WinningStoresCarousel';
import OfferCard from '@/components/OfferCard';
import ModuleTOC from '@/components/ModuleTOC';
import FiveCriteriaTable from '@/components/diagrams/FiveCriteriaTable';
import FunnelMetricsTable from '@/components/diagrams/FunnelMetricsTable';
import KillOrScaleTree from '@/components/diagrams/KillOrScaleTree';
import OfferStackDiagram from '@/components/diagrams/OfferStackDiagram';
import CourseRoadmap from '@/components/diagrams/CourseRoadmap';
import NicheComparisonTable from '@/components/diagrams/NicheComparisonTable';
import CampaignStructureDiagram from '@/components/diagrams/CampaignStructureDiagram';
import CashFlowTimeline from '@/components/diagrams/CashFlowTimeline';
import { offerForModule } from '@/data/moduleOffers';
import { courseModules, moduleIdToSlug } from '@/data/modules';
import { glossaryTerms } from '@/data/glossary';

export async function generateStaticParams() {
  return courseModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = courseModules.find((m) => m.slug === slug);
  if (!mod) return {};
  return {
    title: mod.metaTitle,
    description: mod.metaDescription,
    alternates: { canonical: `https://firstsalesociety.com/course/${mod.slug}` },
    openGraph: {
      type: 'article',
      title: mod.metaTitle,
      description: mod.metaDescription,
      url: `https://firstsalesociety.com/course/${mod.slug}`,
      siteName: 'First Sale Society',
      images: [{ url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: mod.metaTitle,
      description: mod.metaDescription,
    },
  };
}

// Modules that involve financial/break-even calculations get a mandatory
// link to the ROAS calculator, per Task 10.1.
const roasRelevantModuleIds = new Set(['m4', 'm5', 'm9', 'm10', 'm11', 'm12']);

// Code-built reference diagrams placed contextually at the foot of the modules
// they summarise (no edit to the auto-generated module HTML). Server-rendered,
// so crawlers see them too.
const moduleDiagrams: Record<string, { title: string; intro: string; node: React.ReactNode }> = {
  'start-here': {
    title: 'Quick reference — the 7-phase roadmap',
    intro: 'The whole journey from first product to scaled brand, at a glance.',
    node: <CourseRoadmap />,
  },
  'pick-your-niche': {
    title: 'Quick reference — niche archetypes',
    intro: 'How common niche types compare on margin, CPM, saturation, and beginner fit.',
    node: <NicheComparisonTable />,
  },
  'find-winning-products': {
    title: 'Quick reference — the 5 winning-product criteria',
    intro: 'Every product you consider should clear all five before you spend on ads.',
    node: <FiveCriteriaTable />,
  },
  'validate-the-product': {
    title: 'Quick reference — the 5 validation criteria',
    intro: 'Run any shortlisted product through these before committing budget.',
    node: <FiveCriteriaTable />,
  },
  'set-up-your-campaign': {
    title: 'Quick reference — CBO test structure',
    intro: 'One budget, broad ad sets, the same creatives in each — let Meta find the winner.',
    node: <CampaignStructureDiagram />,
  },
  'read-your-data': {
    title: 'Quick reference — ad funnel metrics',
    intro: 'What each metric means, a healthy range, and the warning sign to watch.',
    node: <FunnelMetricsTable />,
  },
  'kill-or-scale': {
    title: 'Quick reference — the kill / tune / scale decision',
    intro: 'Once a product has had a fair test, this is the decision in one view.',
    node: <KillOrScaleTree />,
  },
  'improve-your-offer': {
    title: 'Quick reference — the offer stack',
    intro: 'Each layer raises perceived value and AOV without raising ad cost.',
    node: <OfferStackDiagram />,
  },
  'cash-flow': {
    title: 'Quick reference — the payout gap',
    intro: 'Why a profitable store can still run out of money between spend and payout.',
    node: <CashFlowTimeline />,
  },
};

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = courseModules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const index = courseModules.findIndex((m) => m.slug === slug);
  const moduleSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `https://firstsalesociety.com/course/${mod.slug}#module`,
    name: mod.title,
    description: mod.metaDescription,
    url: `https://firstsalesociety.com/course/${mod.slug}`,
    learningResourceType: 'Course Unit',
    keywords: mod.targetKeyword,
    datePublished: '2026-01-01',
    dateModified: '2026-06-01',
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Course',
      '@id': 'https://firstsalesociety.com#course',
      name: 'First Sale Society — Free Dropshipping Course 2026',
      url: 'https://firstsalesociety.com',
    },
    educationalLevel: 'Beginner',
    provider: {
      '@type': 'Organization',
      '@id': 'https://firstsalesociety.com#org',
      name: 'First Sale Society',
      url: 'https://firstsalesociety.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
      { '@type': 'ListItem', position: 2, name: mod.phaseLabel, item: 'https://firstsalesociety.com' },
      {
        '@type': 'ListItem',
        position: 3,
        name: mod.title,
        item: `https://firstsalesociety.com/course/${mod.slug}`,
      },
    ],
  };

  const showRoasLink = roasRelevantModuleIds.has(mod.id);
  // Avoid a duplicate Discord CTA on the handful of modules that already
  // have one hand-embedded in their verbatim content.
  // Match ANY discord.gg link, not one specific invite code — the source
  // content has two different invite codes in circulation (a legacy one and
  // the current one), and checking only one left 24 of 27 modules rendering
  // a duplicate Discord CTA on top of their own embedded one.
  const hasEmbeddedDiscordCta = /discord\.gg\/[a-zA-Z0-9]+/.test(mod.contentHTML);

  return (
    <>
      <SchemaMarkup schema={[moduleSchema, breadcrumbSchema]} />
      <AnalyticsEvents pageType="course" />
      <ModuleInteractivity />
      <ModuleNavRenderer idToSlug={moduleIdToSlug} />
      <TwitterEmbedLoader />
      <GlossaryTermLinker terms={glossaryTerms.map(t => ({ term: t.term, slug: t.slug }))} />

      <div className="page-progress">
        <div className="page-progress-fill" style={{ width: '0%' }} />
      </div>

      <div className="module-topbar">
        <nav aria-label="Breadcrumb" className="module-crumb">
          <Link href="/">Home</Link>
          <span className="crumb-sep">›</span>
          <span className="crumb-phase">{mod.phaseLabel}</span>
          <span className="crumb-sep">›</span>
          <span className="crumb-current">{mod.title}</span>
        </nav>
        <span className="module-counter">
          Module {index + 1} <span className="module-counter-of">of {courseModules.length}</span>
        </span>
      </div>

      {mod.slug === 'find-winning-products' && (
        <div className="module-content" style={{ paddingBottom: 0 }}>
          <WinningStoresCarousel />
        </div>
      )}

      <ModuleTOC />

      <div className="page-panel active" data-page={mod.id} dangerouslySetInnerHTML={{ __html: mod.contentHTML }} />

      <div className="module-content" style={{ paddingTop: 0 }}>
        {moduleDiagrams[mod.slug] && (
          <div style={{ margin: '0 0 28px' }}>
            <h3 style={{ marginTop: 0 }}>{moduleDiagrams[mod.slug].title}</h3>
            <p style={{ color: 'var(--text2)', marginTop: 0 }}>{moduleDiagrams[mod.slug].intro}</p>
            {moduleDiagrams[mod.slug].node}
          </div>
        )}

        {showRoasLink && (
          <p>
            <Link href="/tools/break-even-roas-calculator">
              🧮 Use the Break-Even ROAS Calculator for this step →
            </Link>
          </p>
        )}

        {/* Contextual, intent-matched affiliate offer (PostHog autocaptures the click) */}
        <div style={{ margin: '24px 0 0' }}>
          <div className="inline-tools-label">Recommended for this step</div>
          <div className="inline-tools-grid">
            <OfferCard offer={offerForModule(mod.slug)} />
          </div>
        </div>

        {!hasEmbeddedDiscordCta && (
          <div
            style={{
              margin: '24px 0 0',
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
              Join First Sale Society — Free Discord
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>
              Ad reviews, store critiques, real operator feedback. Ask anything.
            </div>
            <a
              href="https://discord.gg/9NcaPMe3T"
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
        )}
      </div>

    </>
  );
}
