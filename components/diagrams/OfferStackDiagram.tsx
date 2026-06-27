/**
 * OfferStackDiagram — visualises how stacking base + bundle + bonus + guarantee
 * raises perceived value & AOV (Module 14). Token-driven, no images.
 */
const LAYERS: { label: string; sub: string; tone: string }[] = [
  { label: 'Core product', sub: 'The thing they came for', tone: 'var(--text2)' },
  { label: '+ Bundle / volume deal', sub: 'Buy 2–3, save — raises AOV', tone: '#0066cc' },
  { label: '+ Free bonus', sub: 'Low cost to you, high perceived value', tone: '#6e4ff0' },
  { label: '+ Risk-reversal guarantee', sub: 'Removes the reason not to buy', tone: '#1d8a4e' },
];

export default function OfferStackDiagram() {
  return (
    <div
      data-om-raster
      style={{
        margin: '20px 0',
        display: 'flex',
        gap: 18,
        alignItems: 'stretch',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          flex: '1 1 280px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: 18,
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          background: 'var(--surface)',
        }}
      >
        {LAYERS.map((l, i) => (
          <div
            key={l.label}
            style={{
              padding: '11px 14px',
              borderRadius: 9,
              border: `1px solid ${i === 0 ? 'var(--border)' : l.tone}`,
              background: i === 0 ? 'var(--surface2)' : 'transparent',
              borderLeft: `3px solid ${l.tone}`,
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--heading)', fontSize: 14, fontFamily: 'var(--font-display)' }}>{l.label}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text2)', marginTop: 2 }}>{l.sub}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          flex: '0 0 150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: 18,
          border: '1px solid rgba(29,138,78,0.3)',
          borderRadius: 'var(--r-md)',
          background: 'linear-gradient(180deg, rgba(29,138,78,0.08), transparent)',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)' }}>Result</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#1d8a4e', textAlign: 'center', lineHeight: 1.1 }}>
          Higher AOV
        </div>
        <div style={{ fontSize: 12, color: 'var(--text2)', textAlign: 'center' }}>same ad cost, more profit</div>
      </div>
    </div>
  );
}
