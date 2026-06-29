import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import SchemaMarkup from '@/components/SchemaMarkup';
import ModuleInteractivity from '@/components/ModuleInteractivity';
import ResourceNavBar from '@/components/ResourceNavBar';
import { resourcePanels } from '@/data/resourcePanels';
import { toolkitEntries } from '@/data/toolkitSchema';

export const metadata: Metadata = {
  title: 'Ecommerce Operator Toolkit 2026 — Tools Vetted by Active Operators',
  description:
    'Ecommerce tools vetted by active operators. Product research, supplier sourcing, store build, Meta ads, creative production, and scaling — curated and used in practice.',
  alternates: { canonical: 'https://firstsalesociety.com/toolkit' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://firstsalesociety.com' },
    { '@type': 'ListItem', position: 2, name: 'Toolkit', item: 'https://firstsalesociety.com/toolkit' },
  ],
};

// ItemList schema describing the curated tool directory, per the deep
// research report's Part 6D requirement ("Toolkit Resource Page: JSON-LD
// ItemList schema listing clean, curated operational tools"). This is
// generated from a structural extract of the same .tkc cards already
// rendered verbatim below — it doesn't change what's visible on the page.
const toolkitItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'First Sale Society Operator Toolkit',
  description: 'Curated dropshipping and ecommerce tools, organized by category, vetted by active operators.',
  numberOfItems: toolkitEntries.length,
  itemListElement: toolkitEntries.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: tool.name,
      applicationCategory: tool.category,
      url: tool.url,
      description: tool.description || tool.tagline,
    },
  })),
};

export default function ToolkitPage() {
  return (
    <>
      <SchemaMarkup schema={[toolkitItemListSchema, breadcrumbSchema]} />
      <ModuleInteractivity />
      <AnalyticsEvents pageType="resource" />
      <div
        className="page-panel active"
        data-page="toolkit"
        dangerouslySetInnerHTML={{ __html: resourcePanels.toolkit }}
      />
      <ResourceNavBar current="/toolkit" />
    </>
  );
}
