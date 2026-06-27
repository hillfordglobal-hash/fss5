import type { Metadata } from 'next';
import FiveCriteriaTable from '@/components/diagrams/FiveCriteriaTable';
import KillOrScaleTree from '@/components/diagrams/KillOrScaleTree';
import FunnelMetricsTable from '@/components/diagrams/FunnelMetricsTable';
import OfferStackDiagram from '@/components/diagrams/OfferStackDiagram';
import CourseRoadmap from '@/components/diagrams/CourseRoadmap';
import NicheComparisonTable from '@/components/diagrams/NicheComparisonTable';
import CampaignStructureDiagram from '@/components/diagrams/CampaignStructureDiagram';
import CashFlowTimeline from '@/components/diagrams/CashFlowTimeline';

// Internal review page — not for search engines.
export const metadata: Metadata = {
  title: 'Module Diagrams — Preview (internal)',
  robots: { index: false, follow: false },
};

const ITEMS: { module: string; title: string; node: React.ReactNode }[] = [
  { module: 'Module 01', title: '7-Phase Course Roadmap', node: <CourseRoadmap /> },
  { module: 'Module 02', title: 'Niche Archetype Comparison', node: <NicheComparisonTable /> },
  { module: 'Module 03 / 05', title: 'The 5 Winning-Product Criteria', node: <FiveCriteriaTable /> },
  { module: 'Module 10', title: 'CBO Test Campaign Structure', node: <CampaignStructureDiagram /> },
  { module: 'Module 11', title: 'Ad Funnel Metrics Reference', node: <FunnelMetricsTable /> },
  { module: 'Module 12', title: 'Kill / Tune / Scale Decision Tree', node: <KillOrScaleTree /> },
  { module: 'Module 14', title: 'Offer Stack → Higher AOV', node: <OfferStackDiagram /> },
  { module: 'Module 20', title: 'Cash-Flow Payout Gap', node: <CashFlowTimeline /> },
];

export default function DiagramsPreviewPage() {
  return (
    <div className="module-content">
      <h1>Module Diagrams — Preview</h1>
      <p>
        Reusable, dark-mode-aware visual components built in code (no images needed). Tell me which module to drop each
        into, or request more — these are ready to import as <code>{'<FiveCriteriaTable />'}</code> etc.
      </p>
      {ITEMS.map((it) => (
        <section key={it.title} style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>
            {it.module}
          </div>
          <h3 style={{ marginTop: 0 }}>{it.title}</h3>
          {it.node}
        </section>
      ))}
    </div>
  );
}
