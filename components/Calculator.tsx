'use client';

import { useState } from 'react';
import { calcConfigs } from '@/components/calculators/configs';

/**
 * Generic, data-driven calculator engine.
 *
 * Every free tool page renders <Calculator toolId="..." /> and the actual
 * fields + formula come from components/calculators/configs.ts (keyed by the
 * same slug used for the page route + SEO data in data/toolsData.ts).
 *
 * Reuses the exact .ks-engine / .ks-field markup + classes already shipped
 * for the Break-Even ROAS Calculator, so styling/dark-mode are inherited and
 * there is one calculator look across all 18+ tools.
 */

type Vals = Record<string, number>;

const toneColor: Record<string, string> = {
  good: '#1d8a4e',
  warn: '#9a6a00',
  bad: '#d70015',
  neutral: 'var(--heading)',
};

export default function Calculator({ toolId }: { toolId: string }) {
  const config = calcConfigs[toolId];
  const [raw, setRaw] = useState<Record<string, string>>({});

  if (!config) return null;

  const vals: Vals = {};
  for (const f of config.fields) {
    const r = raw[f.id];
    vals[f.id] = r === undefined || r === '' ? (f.default ?? 0) : parseFloat(r) || 0;
  }

  const ready = config.ready(vals);

  function update(id: string, value: string) {
    setRaw((prev) => {
      const next = { ...prev, [id]: value };
      // Fire analytics (debounced-ish: only when this field has a numeric value)
      if (typeof window !== 'undefined' && (window as unknown as { Analytics?: { track: (e: string, p: object) => void } }).Analytics) {
        const nums: Vals = {};
        for (const f of config.fields) {
          const rv = next[f.id];
          nums[f.id] = rv === undefined || rv === '' ? (f.default ?? 0) : parseFloat(rv) || 0;
        }
        if (config.ready(nums)) {
          (window as unknown as { Analytics: { track: (e: string, p: object) => void } }).Analytics.track('calculator_used', {
            toolId,
            ...nums,
          });
        }
      }
      return next;
    });
  }

  const outputs = ready ? config.outputs : [];

  return (
    <div className="ks-engine" id={`calc-${toolId}`} style={{ margin: '0 0 32px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: config.fields.length > 1 ? '1fr 1fr' : '1fr',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {config.fields.map((f) => (
          <div className="ks-field" key={f.id}>
            <label htmlFor={`f-${toolId}-${f.id}`}>
              {f.label}
              {f.prefix === '$' ? ' ($)' : f.suffix === '%' ? ' (%)' : ''}
            </label>
            <input
              id={`f-${toolId}-${f.id}`}
              type="number"
              inputMode="decimal"
              placeholder={f.placeholder ?? ''}
              step={f.step ?? 'any'}
              value={raw[f.id] ?? ''}
              onChange={(e) => update(f.id, e.target.value)}
              style={{ fontSize: 16 }}
            />
            {f.hint ? (
              <small style={{ color: 'var(--text3)', fontSize: 11, display: 'block', marginTop: 3 }}>{f.hint}</small>
            ) : null}
          </div>
        ))}
        <p style={{ fontSize: '12.5px', color: 'var(--text3)', margin: '10px 0 4px', fontStyle: 'italic', gridColumn: '1 / -1' }}>
          Enter your numbers above — results update instantly.
        </p>
      </div>

      <div
        style={{
          display: ready ? 'block' : 'none',
          background: 'var(--surface3)',
          border: '1px solid var(--border2)',
          borderRadius: 'var(--r-md)',
          padding: '20px 22px',
          marginTop: 4,
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
