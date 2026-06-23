import type { Metadata } from 'next';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Dropshipping Tools — First Sale Society',
  description: 'Free interactive tools for dropshipping operators — starting with the Break-Even ROAS Calculator.',
  alternates: { canonical: 'https://firstsalesociety.com/tools' },
};

export default function ToolsIndexPage() {
  return (
    <>
      <AnalyticsEvents pageType="other" />
    <div className="module-content">
      <h1>Free Tools</h1>
      <div className="inline-tools-grid">
        <Link className="itkc" href="/tools/break-even-roas-calculator">
          <div className="itkc-info">
            <div className="itkc-name">🧮 Break-Even ROAS Calculator</div>
            <div className="itkc-desc">Know your number before you spend a dollar on ads</div>
          </div>
        </Link>
      </div>
    </div>
    </>
  );
}
