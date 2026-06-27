/**
 * CashFlowTimeline — the payout gap (Module 20 / Cash Flow): money goes out on
 * ads + product today, processor pays out days later. Token-driven, no images.
 */
export default function CashFlowTimeline() {
  return (
    <div
      data-om-raster
      style={{
        margin: '20px 0',
        padding: '22px 20px',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        background: 'var(--surface)',
      }}
    >
      {/* OUT row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <span style={{ flex: 'none', width: 64, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#d70015' }}>
          Cash out
        </span>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4'].map((d) => (
            <div key={d} style={{ flex: 1, background: 'rgba(215,0,21,0.08)', border: '1px solid rgba(215,0,21,0.3)', borderRadius: 7, padding: '8px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#d70015', fontWeight: 700 }}>−ads</div>
              <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 1 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* the gap */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <span style={{ flex: 'none', width: 64 }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--text2)', borderTop: '1px dashed var(--border2)', paddingTop: 6 }}>
          ← working capital must cover this gap (≈ daily spend × payout delay) →
        </div>
      </div>

      {/* IN row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flex: 'none', width: 64, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1d8a4e' }}>
          Cash in
        </span>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          <div style={{ flex: 3 }} />
          <div style={{ flex: 2, background: 'rgba(29,138,78,0.08)', border: '1px solid rgba(29,138,78,0.35)', borderRadius: 7, padding: '8px 4px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#1d8a4e', fontWeight: 700 }}>+payout</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 1 }}>Day 4–5+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
