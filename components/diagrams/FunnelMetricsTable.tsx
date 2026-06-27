/**
 * FunnelMetricsTable — a Meta ad-metrics reference table (Module 11) with
 * health-coloured ranges. Token-driven, no images. <FunnelMetricsTable />.
 */
const ROWS: { metric: string; what: string; healthy: string; watch: string }[] = [
  { metric: 'CTR (link)', what: 'Clicks ÷ impressions', healthy: '≥ 1.5%', watch: '< 1% = weak creative/hook' },
  { metric: 'CPC', what: 'Cost per link click', healthy: 'Niche-dependent', watch: 'Rising = fatigue or poor relevance' },
  { metric: 'ATC rate', what: 'Add-to-carts ÷ clicks', healthy: '≥ 5%', watch: '< 3% = product page / price issue' },
  { metric: 'CVR', what: 'Purchases ÷ sessions', healthy: '≥ 2.5%', watch: '< 1% = store, not traffic' },
  { metric: 'CPA', what: 'Cost per purchase', healthy: '< break-even CPA', watch: '> break-even = losing money' },
  { metric: 'ROAS', what: 'Revenue ÷ ad spend', healthy: '> break-even ROAS', watch: 'Below = unprofitable' },
];

export default function FunnelMetricsTable() {
  return (
    <div
      data-om-raster
      style={{
        margin: '20px 0',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        background: 'var(--surface)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr 0.9fr 1.3fr',
          padding: '12px 16px',
          background: 'var(--surface2)',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
        }}
      >
        <span>Metric</span>
        <span>What it is</span>
        <span>Healthy</span>
        <span>Warning sign</span>
      </div>
      {ROWS.map((r, i) => (
        <div
          key={r.metric}
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr 0.9fr 1.3fr',
            padding: '13px 16px',
            borderBottom: i < ROWS.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'start',
            fontSize: 13.5,
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--heading)', fontFamily: 'var(--font-display)' }}>{r.metric}</span>
          <span style={{ color: 'var(--text2)', paddingRight: 8, lineHeight: 1.45 }}>{r.what}</span>
          <span style={{ color: '#1d8a4e', fontWeight: 600 }}>{r.healthy}</span>
          <span style={{ color: 'var(--text2)', lineHeight: 1.45 }}>{r.watch}</span>
        </div>
      ))}
    </div>
  );
}
