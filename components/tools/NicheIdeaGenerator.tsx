'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Niche Idea Generator — a curated, filterable shortlist of dropshipping niche
 * angles. Pure client filtering over a hand-built list (no AI, no claims about
 * guaranteed results) — a discovery aid that maps to the niche-selection module.
 */

type Level = 'Low' | 'Medium' | 'High';
interface Niche {
  name: string;
  angle: string;
  margin: Level; // margin potential
  saturation: Level;
  evergreen: boolean;
}

const NICHES: Niche[] = [
  { name: 'Posture & back support', angle: 'Desk workers with daily pain — clear before/after demo', margin: 'High', saturation: 'Medium', evergreen: true },
  { name: 'Sleep & recovery', angle: 'Trouble sleeping → visible nightly ritual products', margin: 'High', saturation: 'Medium', evergreen: true },
  { name: 'Pet anxiety & grooming', angle: 'Owners spend freely; strong emotional UGC', margin: 'High', saturation: 'High', evergreen: true },
  { name: 'Car cleaning & detailing', angle: 'Satisfying demo content, repeat consumables', margin: 'Medium', saturation: 'Medium', evergreen: true },
  { name: 'Kitchen gadgets', angle: 'Single-problem tools with a clear wow moment', margin: 'Medium', saturation: 'High', evergreen: true },
  { name: 'Home organization', angle: 'Before/after transformation; broad audience', margin: 'Medium', saturation: 'High', evergreen: true },
  { name: 'Postpartum & new-mom', angle: 'Underserved pain points, high trust purchases', margin: 'High', saturation: 'Low', evergreen: true },
  { name: 'Gardening & plant care', angle: 'Hobbyist passion, seasonal spikes', margin: 'Medium', saturation: 'Low', evergreen: false },
  { name: 'Senior mobility & aids', angle: 'Adult children buying for parents; problem-led', margin: 'High', saturation: 'Low', evergreen: true },
  { name: 'Migraine & tension relief', angle: 'Acute pain, instant-relief demo', margin: 'High', saturation: 'Medium', evergreen: true },
  { name: 'Golf training aids', angle: 'Passionate buyers, accessory upsells', margin: 'Medium', saturation: 'Low', evergreen: false },
  { name: 'Camping & outdoor', angle: 'Gear with a survival/clever-utility hook', margin: 'Medium', saturation: 'Medium', evergreen: false },
  { name: 'Hair growth & scalp', angle: 'Before/after, strong repeat / subscription', margin: 'High', saturation: 'High', evergreen: true },
  { name: 'Foot pain & plantar', angle: 'Specific problem, older demographic', margin: 'High', saturation: 'Low', evergreen: true },
  { name: 'Baby feeding & safety', angle: 'High trust, problem-driven, gift-able', margin: 'Medium', saturation: 'Medium', evergreen: true },
  { name: 'Home workout / recovery', angle: 'Massage guns, mobility — demo-friendly', margin: 'Medium', saturation: 'High', evergreen: true },
];

const levelColor: Record<Level, string> = { Low: '#1d8a4e', Medium: '#9a6a00', High: '#d70015' };

export default function NicheIdeaGenerator() {
  const [evergreenOnly, setEvergreenOnly] = useState(false);
  const [minMargin, setMinMargin] = useState<Level | 'Any'>('Any');
  const [maxSat, setMaxSat] = useState<Level | 'Any'>('Any');
  const [seed, setSeed] = useState(0);

  const rank: Record<Level, number> = { Low: 1, Medium: 2, High: 3 };
  let list = NICHES.filter((n) => {
    if (evergreenOnly && !n.evergreen) return false;
    if (minMargin !== 'Any' && rank[n.margin] < rank[minMargin]) return false;
    if (maxSat !== 'Any' && rank[n.saturation] > rank[maxSat]) return false;
    return true;
  });
  // light shuffle on "regenerate"
  list = [...list].sort((a, b) => ((a.name.length * 7 + seed) % 5) - ((b.name.length * 7 + seed) % 5));
  const shown = list.slice(0, 6);

  const pill = (active: boolean): React.CSSProperties => ({
    fontSize: 12.5,
    fontWeight: 600,
    padding: '6px 13px',
    borderRadius: 980,
    cursor: 'pointer',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    background: active ? 'var(--accent)' : 'var(--surface)',
    color: active ? '#fff' : 'var(--text2)',
    font: 'inherit',
    lineHeight: 1.4,
  });

  return (
    <div className="ks-engine" style={{ margin: '0 0 32px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 16, alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 7 }}>Min margin potential</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['Any', 'Medium', 'High'] as const).map((l) => (
              <button type="button" key={l} style={pill(minMargin === l)} onClick={() => setMinMargin(l)}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 7 }}>Max saturation</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['Any', 'Medium', 'Low'] as const).map((l) => (
              <button type="button" key={l} style={pill(maxSat === l)} onClick={() => setMaxSat(l)}>{l}</button>
            ))}
          </div>
        </div>
        <button type="button" style={pill(evergreenOnly)} onClick={() => setEvergreenOnly((v) => !v)}>Evergreen only</button>
        <button type="button" style={{ ...pill(false), marginLeft: 'auto' }} onClick={() => setSeed((s) => s + 1)}>↻ Regenerate</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {shown.map((n) => (
          <div key={n.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '15px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--heading)', marginBottom: 5 }}>{n.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 10 }}>{n.angle}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: levelColor[n.margin], background: 'var(--surface3)', padding: '3px 8px', borderRadius: 980 }}>Margin: {n.margin}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: levelColor[n.saturation], background: 'var(--surface3)', padding: '3px 8px', borderRadius: 980 }}>Saturation: {n.saturation}</span>
            </div>
          </div>
        ))}
        {shown.length === 0 ? (
          <div style={{ fontSize: 14, color: 'var(--text2)', gridColumn: '1 / -1' }}>No niches match those filters — loosen them to see ideas.</div>
        ) : null}
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, marginTop: 16 }}>
        These are starting angles, not guarantees — validate any niche against real demand and live competitor ads.{' '}
        <Link href="/course/pick-your-niche">Learn how to choose a niche →</Link>
      </p>
    </div>
  );
}
