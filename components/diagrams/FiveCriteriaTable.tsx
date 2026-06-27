/**
 * FiveCriteriaTable — the 5 winning-product criteria (Module 03 / 05) as a
 * styled, responsive table. Self-contained, token-driven (matches light/dark),
 * no images required. Drop into a module with <FiveCriteriaTable />.
 */
const ROWS: { n: string; criterion: string; why: string; pass: string }[] = [
  { n: '1', criterion: 'Fills existing demand', why: 'People already search for / buy it', pass: 'Active competitors selling it' },
  { n: '2', criterion: 'Solves a specific problem', why: 'Clear before/after, must-have not nice-to-have', pass: 'One-sentence problem statement' },
  { n: '3', criterion: 'Healthy sourcing margin', why: 'Paid ads need ~65%+ gross margin', pass: 'Cost ≤ 25% of sell price' },
  { n: '4', criterion: 'Proven by running ads', why: 'A live competitor validates demand', pass: 'Ads running 30+ days' },
  { n: '5', criterion: 'Scroll-stopping wow', why: 'Demonstrates in the first 3 seconds', pass: 'Obvious visual hook' },
];

export default function FiveCriteriaTable() {
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
          gridTemplateColumns: '34px 1.1fr 1.4fr 1.1fr',
          gap: 0,
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
        <span>#</span>
        <span>Criterion</span>
        <span>Why it matters</span>
        <span>You pass if…</span>
      </div>
      {ROWS.map((r, i) => (
        <div
          key={r.n}
          style={{
            display: 'grid',
            gridTemplateColumns: '34px 1.1fr 1.4fr 1.1fr',
            gap: 0,
            padding: '14px 16px',
            borderBottom: i < ROWS.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'start',
            fontSize: 14,
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)' }}>{r.n}</span>
          <span style={{ fontWeight: 600, color: 'var(--heading)', paddingRight: 10 }}>{r.criterion}</span>
          <span style={{ color: 'var(--text2)', paddingRight: 10, lineHeight: 1.5 }}>{r.why}</span>
          <span style={{ color: 'var(--text2)', lineHeight: 1.5 }}>{r.pass}</span>
        </div>
      ))}
    </div>
  );
}
