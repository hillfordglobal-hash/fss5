'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Winning Product Scorecard — interactive version of the 5-criteria product
 * filter taught in Module 03 (Find Winning Products) / Module 05 (Validate the
 * Product). Pure client state; no new claims — the criteria restate the course.
 */

const CRITERIA = [
  {
    id: 'demand',
    title: 'Fills existing demand',
    desc: 'People are already searching for / buying this. You are entering a conversation, not creating one.',
  },
  {
    id: 'problem',
    title: 'Solves a specific, visible problem',
    desc: 'Clear before/after. The ad writes itself because the pain is obvious.',
  },
  {
    id: 'margin',
    title: 'Sourceable at ≤25% of sell price',
    desc: 'Landed cost leaves a ~65%+ margin so paid ads can stay profitable.',
  },
  {
    id: 'active',
    title: 'Proven by ads running 30+ days',
    desc: 'A competitor is actively running it on Meta — validation that it sells.',
  },
  {
    id: 'wow',
    title: 'Has a scroll-stopping "wow" factor',
    desc: 'Demonstrates visually in the first 3 seconds of a video or a static.',
  },
];

export default function WinningProductScorecard() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const score = CRITERIA.filter((c) => checked[c.id]).length;

  const verdict =
    score <= 2
      ? { label: 'Weak candidate', tone: '#d70015', text: 'This product fails too many criteria. Keep researching — most products should be rejected at this stage.' }
      : score <= 3
      ? { label: 'Borderline', tone: '#9a6a00', text: 'Some signal, but real gaps. Only test this if you can fix the missing criteria (angle, sourcing, or offer).' }
      : score === 4
      ? { label: 'Worth testing', tone: '#1d8a4e', text: 'Strong candidate. Shortlist it and move to validation — check the one missing box before you spend.' }
      : { label: 'Test it now', tone: '#1d8a4e', text: 'Hits all five criteria. This is exactly the kind of product worth putting ad budget behind.' };

  return (
    <div className="ks-engine" style={{ margin: '0 0 32px' }}>
      <div className="checklist-wrap" id="winning-product-scorecard" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CRITERIA.map((c) => {
          const on = !!checked[c.id];
          return (
            <button
              type="button"
              key={c.id}
              onClick={() => setChecked((p) => ({ ...p, [c.id]: !p[c.id] }))}
              aria-pressed={on}
              style={{
                display: 'flex',
                gap: 13,
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '14px 16px',
                borderRadius: 'var(--r-md)',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                background: on ? 'var(--accent-glow)' : 'var(--surface)',
                cursor: 'pointer',
                transition: 'border-color .16s ease, background .16s ease',
                font: 'inherit',
                color: 'inherit',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: 'none',
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: `2px solid ${on ? 'var(--accent)' : 'var(--border2)'}`,
                  background: on ? 'var(--accent)' : 'transparent',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  marginTop: 1,
                }}
              >
                {on ? '✓' : ''}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 600, color: 'var(--heading)', fontFamily: 'var(--font-display)' }}>
                  {c.title}
                </span>
                <span style={{ display: 'block', fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.5, marginTop: 2 }}>
                  {c.desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          background: 'var(--surface3)',
          border: '1px solid var(--border2)',
          borderRadius: 'var(--r-md)',
          padding: '20px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 'none' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 8 }}>
            Score
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: verdict.tone, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {score}<span style={{ fontSize: 22, color: 'var(--text3)' }}>/5</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontWeight: 700, color: verdict.tone, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{verdict.label}</div>
          <div style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>{verdict.text}</div>
        </div>
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, marginTop: 16 }}>
        Want a second opinion on a product before you spend? Drop it in the{' '}
        <a href="https://discord.gg/9NcaPMe3T" target="_blank" rel="noopener">free Discord</a> for operator feedback, or{' '}
        <Link href="/course/validate-the-product">run it through full validation →</Link>
      </p>
    </div>
  );
}
