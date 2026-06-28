'use client';

import { useState, useCallback, useMemo } from 'react';
import { calcConfigs } from '@/components/calculators/configs';
import type { Field, Tone } from '@/components/calculators/configs';

type Vals = Record<string, number>;

const toneColor: Record<Tone, string> = {
  good: 'var(--green, #1d8a4e)',
  warn: '#9a6a00',
  bad: 'var(--red, #d70015)',
  neutral: 'var(--heading)',
};

const toneBg: Record<Tone, string> = {
  good: 'rgba(0,229,160,0.08)',
  warn: 'rgba(245,158,11,0.08)',
  bad: 'rgba(215,0,21,0.08)',
  neutral: 'var(--surface3)',
};

const toneBorder: Record<Tone, string> = {
  good: 'rgba(0,229,160,0.25)',
  warn: 'rgba(245,158,11,0.25)',
  bad: 'rgba(215,0,21,0.25)',
  neutral: 'var(--border2)',
};

const toneBadge: Record<Tone, { bg: string; color: string }> = {
  good: { bg: 'rgba(0,229,160,0.12)', color: 'var(--green, #1d8a4e)' },
  warn: { bg: 'rgba(245,158,11,0.12)', color: '#9a6a00' },
  bad: { bg: 'rgba(215,0,21,0.12)', color: 'var(--red, #d70015)' },
  neutral: { bg: 'var(--surface2)', color: 'var(--text2)' },
};

function fmtVal(f: Field, n: number): string {
  if (!isFinite(n)) return f.prefix === '$' ? '$0.00' : '0';
  if (f.prefix === '$') {
    return '$' + (Math.abs(n) >= 1000
      ? n.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : (Number.isInteger(n) ? n.toString() : n.toFixed(2)));
  }
  const num = Number.isInteger(n) ? n.toString()
    : n.toFixed(f.step < 1 ? (f.step < 0.1 ? 2 : 1) : 0);
  if (f.suffix === '%') return `${num}%`;
  if (f.unit) return `${n.toLocaleString('en-US')}${f.unit}`;
  return n.toLocaleString('en-US');
}

function parseInput(raw: string, f: Field): number {
  const cleaned = raw.replace(/[$,%×]/g, '').replace(/,/g, '').trim();
  const n = parseFloat(cleaned);
  if (isNaN(n)) return f.min;
  return Math.max(f.min, Math.min(f.max, n));
}

interface FieldRowProps {
  f: Field;
  v: number;
  toolId: string;
  onChange: (f: Field, value: number) => void;
}

function FieldRow({ f, v, toolId, onChange }: FieldRowProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const fillPct = Math.max(0, Math.min(100, ((v - f.min) / (f.max - f.min)) * 100));

  const displayVal = inputFocused ? rawInput : fmtVal(f, v);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
        <label htmlFor={`f-${toolId}-${f.id}`} style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text2)', lineHeight: 1.3 }}>
          {f.label}
        </label>
        {/* Number input — type directly */}
        <input
          type="text"
          inputMode="decimal"
          aria-label={f.label}
          value={displayVal}
          style={{
            width: 90,
            textAlign: 'right',
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--accent)',
            background: 'var(--surface2)',
            border: `1px solid ${inputFocused ? 'var(--accent)' : 'var(--border2)'}`,
            borderRadius: 8,
            padding: '4px 8px',
            outline: 'none',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.01em',
            transition: 'border-color 0.15s ease',
            flexShrink: 0,
          }}
          onFocus={() => {
            setInputFocused(true);
            setRawInput(v.toString());
          }}
          onBlur={(e) => {
            setInputFocused(false);
            const parsed = parseInput(e.target.value, f);
            onChange(f, parsed);
          }}
          onChange={(e) => setRawInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
      </div>
      {/* Slider */}
      <input
        id={`f-${toolId}-${f.id}`}
        type="range"
        min={f.min}
        max={f.max}
        step={f.step}
        value={v}
        aria-label={`${f.label} slider`}
        onChange={(e) => onChange(f, parseFloat(e.target.value))}
        style={{
          width: '100%',
          height: 5,
          borderRadius: 980,
          appearance: 'none',
          WebkitAppearance: 'none',
          outline: 'none',
          cursor: 'pointer',
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${fillPct}%, var(--border2) ${fillPct}%, var(--border2) 100%)`,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--text3)', fontVariantNumeric: 'tabular-nums' }}>
        <span>{fmtVal(f, f.min)}</span>
        {f.hint ? <span style={{ fontStyle: 'italic' }}>{f.hint}</span> : null}
        <span>{fmtVal(f, f.max)}{v >= f.max ? '+' : ''}</span>
      </div>
    </div>
  );
}

export default function Calculator({ toolId }: { toolId: string }) {
  const config = calcConfigs[toolId];

  const initial = useMemo<Vals>(() => {
    if (!config) return {};
    const r: Vals = {};
    for (const f of config.fields) r[f.id] = f.default;
    return r;
  }, [config]);

  const [vals, setVals] = useState<Vals>(initial);
  const [advOpen, setAdvOpen] = useState(false);
  const [assumeOpen, setAssumeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = useCallback((f: Field, value: number) => {
    setVals((prev) => {
      const next = { ...prev, [f.id]: value };
      if (typeof window !== 'undefined') {
        const w = window as unknown as { Analytics?: { track: (e: string, p: object) => void } };
        if (w.Analytics && config?.ready(next)) {
          w.Analytics.track('calculator_used', { toolId, ...next });
        }
      }
      return next;
    });
  }, [config, toolId]);

  if (!config) return null;

  const basicFields = config.fields.filter((f) => !f.advanced);
  const advFields = config.fields.filter((f) => f.advanced);
  const ready = config.ready(vals);
  const outputs = ready ? config.outputs : [];

  // Primary output for summary
  const primaryOutput = outputs.find((o) => o.primary !== false) ?? outputs[0];
  const primaryTone: Tone = primaryOutput?.tone ? primaryOutput.tone(vals) : 'neutral';

  function buildSummary(): string {
    if (!ready) return '';
    const lines = outputs.map((o) => `${o.label}: ${o.get(vals)}`).join('\n');
    const formula = config.formula ? `\nFormula: ${config.formula}` : '';
    return `${toolId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}\n${'─'.repeat(40)}\n${lines}${formula}`;
  }

  function handleCopy() {
    const text = buildSummary();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div className="ks-engine" id={`calc-${toolId}`} style={{ margin: '0 0 32px' }}>

      {/* Basic fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: advFields.length ? 4 : 20 }}>
        {basicFields.map((f) => (
          <FieldRow key={f.id} f={f} v={vals[f.id] ?? f.default} toolId={toolId} onChange={update} />
        ))}
      </div>

      {/* Advanced accordion */}
      {advFields.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <button
            type="button"
            onClick={() => setAdvOpen((o) => !o)}
            aria-expanded={advOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '10px 0',
              cursor: 'pointer',
              color: 'var(--accent)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.02em',
              borderTop: '1px solid var(--border)',
              borderBottom: advOpen ? 'none' : '1px solid var(--border)',
            }}
          >
            <span style={{ transform: advOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.18s ease', display: 'inline-block', lineHeight: 1 }}>▶</span>
            Advanced Inputs
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)', fontWeight: 400 }}>
              {advOpen ? 'Hide' : `${advFields.length} optional fields (all default to 0)`}
            </span>
          </button>
          {advOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16, paddingBottom: 4, borderBottom: '1px solid var(--border)' }}>
              {advFields.map((f) => (
                <FieldRow key={f.id} f={f} v={vals[f.id] ?? 0} toolId={toolId} onChange={update} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results panel */}
      {ready && (
        <div
          style={{
            background: toneBg[primaryTone],
            border: `1px solid ${toneBorder[primaryTone]}`,
            borderRadius: 'var(--r-md)',
            padding: '20px 22px',
            marginBottom: 12,
          }}
        >
          {/* Output grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: outputs.length === 1 ? '1fr' : outputs.length === 2 ? '1fr 1fr' : 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '16px 20px',
              marginBottom: config.note ? 14 : 0,
            }}
          >
            {outputs.map((o, i) => {
              const tone: Tone = o.tone ? o.tone(vals) : 'neutral';
              const isPrimary = o.primary !== false && i === 0;
              return (
                <div key={i} style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>
                    {o.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isPrimary ? 34 : 22,
                    fontWeight: 800,
                    color: toneColor[tone],
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                    marginBottom: o.sublabel ? 4 : 0,
                  }}>
                    {o.get(vals)}
                  </div>
                  {o.sublabel && (
                    <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.3, marginTop: 3 }}>{o.sublabel}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interpretation note */}
          {config.note && (
            <div style={{
              fontSize: 13,
              color: 'var(--text2)',
              lineHeight: 1.6,
              paddingTop: 14,
              borderTop: '1px solid var(--border)',
            }}>
              {config.note(vals)}
            </div>
          )}
        </div>
      )}

      {/* Formula */}
      {config.formula && ready && (
        <div style={{
          fontSize: 12.5,
          color: 'var(--text3)',
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '9px 14px',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.01em',
          marginBottom: 10,
        }}>
          <span style={{ fontWeight: 700, color: 'var(--text2)', marginRight: 6 }}>Formula:</span>
          {config.formula}
        </div>
      )}

      {/* Benchmarks */}
      {config.benchmarks && ready && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            Industry Benchmarks
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {config.benchmarks.map((b, i) => {
              const badge = toneBadge[b.tone];
              return (
                <div key={i} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 980,
                  background: badge.bg,
                  border: `1px solid ${toneBorder[b.tone]}`,
                  fontSize: 12,
                }}>
                  <span style={{ color: badge.color, fontWeight: 700 }}>{b.label}</span>
                  <span style={{ color: 'var(--text3)' }}>{b.range}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assumptions */}
      {config.assumptions && (
        <div style={{ marginBottom: 10 }}>
          <button
            type="button"
            onClick={() => setAssumeOpen((o) => !o)}
            aria-expanded={assumeOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text3)',
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 0',
            }}
          >
            <span style={{ transform: assumeOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s ease', display: 'inline-block', lineHeight: 1, fontSize: 9 }}>▶</span>
            Assumptions
          </button>
          {assumeOpen && (
            <ul style={{ margin: '8px 0 0 16px', padding: 0, fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.7 }}>
              {config.assumptions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Copy button */}
      {ready && (
        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 8,
            border: '1px solid var(--border2)',
            background: 'var(--surface)',
            color: copied ? 'var(--green, #1d8a4e)' : 'var(--text2)',
            fontSize: 12.5,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
        >
          {copied ? '✓ Copied' : '⎘ Copy Results'}
        </button>
      )}
    </div>
  );
}
