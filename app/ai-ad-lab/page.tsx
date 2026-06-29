import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import TwitterEmbedLoader from '@/components/TwitterEmbedLoader';
import ResourceNavBar from '@/components/ResourceNavBar';
import { resourcePanels } from '@/data/resourcePanels';

export const metadata: Metadata = {
  title: 'AI Ad Creative Lab — AI-Generated Ecommerce Ads That Convert',
  description:
    'AI-generated ecommerce ads that convert in 2026. Study real examples by format, then produce your own with MakeUGC, HeyGen, and InfiniteTalk.',
  alternates: { canonical: 'https://firstsalesociety.com/ai-ad-lab' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Ad Creative Lab', item: 'https://firstsalesociety.com/ai-ad-lab' },
  ],
};

export default function AIAdLabPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <ModuleInteractivity />
      <AnalyticsEvents pageType="resource" />
      <TwitterEmbedLoader />
      <div className="page-panel active" data-page="ai_ads" dangerouslySetInnerHTML={{ __html: resourcePanels.ai_ads }} />
      <ResourceNavBar current="/ai-ad-lab" />
    </>
  );
}
