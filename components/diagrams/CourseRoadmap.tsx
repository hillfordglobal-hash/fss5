/**
 * CourseRoadmap — the 7-phase journey (Module 01 / START here). A compact
 * visual map of the whole course. Token-driven, no images.
 */
const PHASES: { n: string; label: string; sub: string }[] = [
  { n: '1', label: 'Find a Product', sub: 'Niche, research, validate' },
  { n: '2', label: 'Source It', sub: 'Supplier + fulfilment' },
  { n: '3', label: 'Build the Store', sub: 'Shopify product page' },
  { n: '4', label: 'Make Ads', sub: 'Angles + creative' },
  { n: '5', label: 'Launch & Test', sub: 'Campaigns + data' },
  { n: '6', label: 'After First Sales', sub: 'CRO, offer, email' },
  { n: '7', label: 'Scale & Brand', sub: 'Budget, brand, retention' },
];

export default function CourseRoadmap() {
  return (
    <div
      data-om-raster
      style={{
        margin: '20px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 10,
      }}
    >
      {PHASES.map((p, i) => (
        <div
          key={p.n}
          style={{
            position: 'relative',
            padding: '14px 14px 14px 16px',
            borderRadius: 'var(--r-md)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)' }}>
            Phase {p.n}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--heading)', fontSize: 15, margin: '3px 0 2px' }}>
            {p.label}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.4 }}>{p.sub}</div>
          {i < PHASES.length - 1 ? (
            <span style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', color: 'var(--border2)', fontSize: 14, fontWeight: 700 }}>→</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
