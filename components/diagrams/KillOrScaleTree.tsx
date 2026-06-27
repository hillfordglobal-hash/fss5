/**
 * KillOrScaleTree — the kill / tune / scale decision flow (Module 12) as a
 * compact decision diagram. Token-driven, no images. <KillOrScaleTree />.
 */

function Node({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'good' | 'bad' | 'warn' | 'neutral' | 'q';
}) {
  const map = {
    good: { bg: 'rgba(29,138,78,0.10)', bd: 'rgba(29,138,78,0.45)', fg: '#1d8a4e' },
    bad: { bg: 'rgba(215,0,21,0.08)', bd: 'rgba(215,0,21,0.4)', fg: '#d70015' },
    warn: { bg: 'rgba(154,106,0,0.10)', bd: 'rgba(154,106,0,0.4)', fg: '#9a6a00' },
    neutral: { bg: 'var(--surface2)', bd: 'var(--border)', fg: 'var(--heading)' },
    q: { bg: 'var(--surface)', bd: 'var(--accent)', fg: 'var(--accent)' },
  }[tone];
  return (
    <div
      style={{
        background: map.bg,
        border: `1px solid ${map.bd}`,
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 13.5,
        fontWeight: 600,
        color: map.fg,
        textAlign: 'center',
        fontFamily: 'var(--font-display)',
      }}
    >
      {label}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 0' }}>
      {label ? <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>{label}</span> : null}
      <span style={{ color: 'var(--border2)', fontSize: 14, lineHeight: 1 }}>↓</span>
    </div>
  );
}

export default function KillOrScaleTree() {
  return (
    <div
      data-om-raster
      style={{
        margin: '20px 0',
        padding: '22px 20px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        maxWidth: 520,
      }}
    >
      <Node label="Product reached ~1× break-even spend?" tone="q" />
      <Arrow />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, marginBottom: 6 }}>NO — too early</span>
          <Node label="Keep running · gather data" tone="neutral" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 700, marginBottom: 6 }}>YES — judge it</span>
          <Node label="CPA vs break-even CPA?" tone="q" />
        </div>
      </div>
      <Arrow />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#d70015', fontWeight: 700 }}>Above</span>
          <Node label="KILL" tone="bad" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#9a6a00', fontWeight: 700 }}>At / near</span>
          <Node label="TUNE creative + offer" tone="warn" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#1d8a4e', fontWeight: 700 }}>Below</span>
          <Node label="SCALE budget" tone="good" />
        </div>
      </div>
    </div>
  );
}
