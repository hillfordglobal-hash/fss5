/**
 * CampaignStructureDiagram — a CBO test campaign structure (Module 10 / Set Up
 * Your Campaign): one budget → broad ad sets → multiple creatives.
 * Token-driven, no images.
 */
function Box({ title, sub, tone = 'neutral' }: { title: string; sub?: string; tone?: 'accent' | 'neutral' }) {
  const accent = tone === 'accent';
  return (
    <div
      style={{
        background: accent ? 'var(--accent-glow)' : 'var(--surface2)',
        border: `1px solid ${accent ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 9,
        padding: '9px 12px',
        textAlign: 'center',
        minWidth: 0,
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: accent ? 'var(--accent)' : 'var(--heading)' }}>{title}</div>
      {sub ? <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 1 }}>{sub}</div> : null}
    </div>
  );
}

export default function CampaignStructureDiagram() {
  return (
    <div
      data-om-raster
      style={{
        margin: '20px 0',
        padding: '20px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        maxWidth: 520,
      }}
    >
      <Box title="CBO Campaign" sub="One budget, Meta distributes" tone="accent" />
      <span style={{ color: 'var(--border2)', fontSize: 14 }}>↓</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: '100%' }}>
        <Box title="Ad set 1" sub="Broad" />
        <Box title="Ad set 2" sub="Broad" />
        <Box title="Ad set 3" sub="Broad" />
      </div>
      <span style={{ color: 'var(--border2)', fontSize: 14 }}>↓</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: '100%' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box title="3–5 creatives" />
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.5, marginTop: 4, textAlign: 'center' }}>
        Broad targeting · let the creative do the targeting · same creatives in each ad set so Meta can find the winner.
      </div>
    </div>
  );
}
