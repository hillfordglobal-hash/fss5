import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import ModuleNavRenderer from '@/components/ModuleNavRenderer';
import TwitterEmbedLoader from '@/components/TwitterEmbedLoader';
import GlossaryTermLinker from '@/components/GlossaryTermLinker';
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

      <div className="page-panel active" data-page={mod.id} dangerouslySetInnerHTML={{ __html: mod.contentHTML }} />

      <div className="module-content" style={{ paddingTop: 0 }}>
        {showRoasLink && (
          <p>
            <Link href="/tools/break-even-roas-calculator">
              🧮 Use the Break-Even ROAS Calculator for this step →
            </Link>
          </p>
        )}

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
