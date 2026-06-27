'use client';

import { useState } from 'react';
import { calcConfigs } from '@/components/calculators/configs';
import type { Field } from '@/components/calculators/configs';

/**
 * Generic, data-driven calculator engine — SLIDER inputs.
 *
 * Every free tool page renders <Calculator toolId="..." />; the fields, ranges,
 * and formula come from components/calculators/configs.ts (keyed by the same
 * slug used for the route + SEO data in data/toolsData.ts).
 *
 * Each field is a range slider with a live value readout, so users drag instead
 * of type. Every field has a default, so the result panel shows immediately.
 */

type Vals = Record<string, number>;

const toneColor: Record<string, string> = {
  good: '#1d8a4e',
  warn: '#9a6a00',
  bad: '#d70015',
  neutral: 'var(--heading)',
};

function fmtVal(f: Field, n: number): string {
  if (f.prefix === '$') {
    return '$' + (Math.abs(n) >= 1000 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : (Number.isInteger(n) ? n.toString() : n.toFixed(2)));
  }
  const num = Number.isInteger(n) ? n.toString() : n.toFixed(f.step < 1 ? (f.step < 0.1 ? 2 : 1) : 0);
  if (f.suffix === '%') return `${num}%`;
  if (f.unit) return `${n.toLocaleString('en-US')}${f.unit}`;
  return n.toLocaleString('en-US');
}

export default function Calculator({ toolId }: { toolId: string }) {
  const config = calcConfigs[toolId];
  const initial: Vals = {};
  if (config) for (const f of config.fields) initial[f.id] = f.default;
  const [vals, setVals] = useState<Vals>(initial);

  if (!config) return null;

  const ready = config.ready(vals);

  function update(f: Field, value: number) {
    setVals((prev) => {
      const next = { ...prev, [f.id]: value };
      if (typeof window !== 'undefined') {
        const w = window as unknown as { Analytics?: { track: (e: string, p: object) => void } };
        if (w.Analytics && config.ready(next)) {
          w.Analytics.track('calculator_used', { toolId, ...next });
        }
      }
      return next;
    });
  }

  const outputs = ready ? config.outputs : [];

  return (
    <div className="ks-engine" id={`calc-${toolId}`} style={{ margin: '0 0 32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 20 }}>
        {config.fields.map((f) => {
          const v = vals[f.id] ?? f.default;
          const fillPct = ((v - f.min) / (f.max - f.min)) * 100;
          return (
            <div key={f.id}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 9 }}>
                <label htmlFor={`f-${toolId}-${f.id}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)' }}>
                  {f.label}
                </label>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {fmtVal(f, v)}
                </span>
              </div>
              <input
                id={`f-${toolId}-${f.id}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v}
                aria-label={f.label}
                onChange={(e) => update(f, parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  height: 6,
                  borderRadius: 980,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${fillPct}%, var(--border2) ${fillPct}%, var(--border2) 100%)`,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: 'var(--text3)', fontVariantNumeric: 'tabular-nums' }}>
                <span>{fmtVal(f, f.min)}</span>
                {f.hint ? <span style={{ fontStyle: 'italic' }}>{f.hint}</span> : null}
                <span>{fmtVal(f, f.max)}{v >= f.max ? '+' : ''}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: ready ? 'block' : 'none',
          background: 'var(--surface3)',
          border: '1px solid var(--border2)',
          borderRadius: 'var(--r-md)',
          padding: '20px 22px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: outputs.length > 1 ? `repeat(${Math.min(outputs.length, 3)}, 1fr)` : '1fr',
            gap: 18,
          }}
        >
          {outputs.map((o, i) => {
            const tone = o.tone ? o.tone(vals) : 'neutral';
            return (
              <div key={i} style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--accent2)',
                    marginBottom: 10,
                  }}
                >
                  {o.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: o.primary === false ? 26 : 36,
                    fontWeight: 800,
                    color: toneColor[tone] ?? 'var(--heading)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {o.get(vals)}
                </div>
              </div>
            );
          })}
        </div>
        {config.note ? (
          <div style={{ fontSize: '13.5px', color: 'var(--text2)', lineHeight: 1.6, marginTop: 14 }}>{config.note(vals)}</div>
        ) : null}
      </div>
    </div>
  );
}
