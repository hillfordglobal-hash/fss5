import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import ResourceNavBar from '@/components/ResourceNavBar';
import { resourcePanels } from '@/data/resourcePanels';

export const metadata: Metadata = {
  title: 'Ecommerce Ad Swipe File — Real Ad Examples by Format',
  description:
    'Real ecommerce ad examples organized by format — image ads, video ads, advertorials, email flows, and product page swipes. Study what works in 2026 before building your own.',
  alternates: { canonical: 'https://firstsalesociety.com/swipe-files' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'Swipe Files', item: 'https://firstsalesociety.com/swipe-files' },
  ],
};

export default function SwipeFilesPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <ModuleInteractivity />
      <AnalyticsEvents pageType="resource" />
      <div
        className="page-panel active"
        data-page="swipe_files"
        dangerouslySetInnerHTML={{ __html: resourcePanels.swipe_files }}
      />
      <ResourceNavBar current="/swipe-files" />
    </>
  );
}
