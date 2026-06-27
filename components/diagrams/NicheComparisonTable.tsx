/**
 * NicheComparisonTable — niche archetypes vs the factors that decide if paid
 * ads work (Module 02 / Pick Your Niche). Token-driven, no images.
 */
type Level = 'Low' | 'Medium' | 'High';
const tone: Record<Level, string> = { Low: '#1d8a4e', Medium: '#9a6a00', High: '#d70015' };

const ROWS: { type: string; margin: Level; cpm: Level; saturation: Level; fit: string }[] = [
  { type: 'Problem-solver (health, pain)', margin: 'High', cpm: 'Medium', saturation: 'Medium', fit: 'Strong — clear demo + demand' },
  { type: 'Passion / hobby (golf, pets)', margin: 'Medium', cpm: 'Low', saturation: 'Low', fit: 'Good — loyal, lower CPMs' },
  { type: 'Wow / novelty gadgets', margin: 'Medium', cpm: 'Medium', saturation: 'High', fit: 'Risky — fast saturation' },
  { type: 'Apparel / general', margin: 'Low', cpm: 'High', saturation: 'High', fit: 'Hard — thin margin, crowded' },
  { type: 'Supplements / restricted', margin: 'High', cpm: 'Medium', saturation: 'Medium', fit: 'Advanced — compliance risk' },
];

function Pill({ level }: { level: Level }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: tone[level], background: 'var(--surface3)', padding: '3px 9px', borderRadius: 980, whiteSpace: 'nowrap' }}>
      {level}
    </span>
  );
}

export default function NicheComparisonTable() {
  return (
    <div
      data-om-raster
      style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--surface)' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.7fr 0.7fr 0.8fr 1.3fr',
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
        <span>Niche type</span>
        <span>Margin</span>
        <span>CPM</span>
        <span>Saturation</span>
        <span>Beginner fit</span>
      </div>
      {ROWS.map((r, i) => (
        <div
          key={r.type}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.7fr 0.7fr 0.8fr 1.3fr',
            padding: '13px 16px',
            borderBottom: i < ROWS.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
            fontSize: 13.5,
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--heading)', paddingRight: 8 }}>{r.type}</span>
          <span><Pill level={r.margin} /></span>
          <span><Pill level={r.cpm} /></span>
          <span><Pill level={r.saturation} /></span>
          <span style={{ color: 'var(--text2)', lineHeight: 1.4 }}>{r.fit}</span>
        </div>
      ))}
    </div>
  );
}
