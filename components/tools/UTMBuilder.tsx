'use client';

import { useState } from 'react';

/**
 * UTM Builder — client-side tagged-URL generator for ad/campaign tracking.
 * No data leaves the browser. Pairs with the analytics + ad-tracking taught
 * across the campaign / data modules.
 */

const FIELDS: { id: string; label: string; placeholder: string; required?: boolean }[] = [
  { id: 'url', label: 'Destination URL', placeholder: 'https://yourstore.com/products/best-seller', required: true },
  { id: 'source', label: 'Campaign Source (utm_source)', placeholder: 'facebook', required: true },
  { id: 'medium', label: 'Campaign Medium (utm_medium)', placeholder: 'paid_social', required: true },
  { id: 'campaign', label: 'Campaign Name (utm_campaign)', placeholder: 'spring_launch', required: true },
  { id: 'term', label: 'Campaign Term (utm_term)', placeholder: 'interest_targeting (optional)' },
  { id: 'content', label: 'Campaign Content (utm_content)', placeholder: 'video_hook_a (optional)' },
];

function build(v: Record<string, string>): string {
  if (!v.url) return '';
  const params: [string, string][] = [];
  if (v.source) params.push(['utm_source', v.source]);
  if (v.medium) params.push(['utm_medium', v.medium]);
  if (v.campaign) params.push(['utm_campaign', v.campaign]);
  if (v.term) params.push(['utm_term', v.term]);
  if (v.content) params.push(['utm_content', v.content]);
  if (params.length === 0) return v.url;
  const sep = v.url.includes('?') ? '&' : '?';
  const qs = params.map(([k, val]) => `${k}=${encodeURIComponent(val.trim())}`).join('&');
  return `${v.url}${sep}${qs}`;
}

export default function UTMBuilder() {
  const [v, setV] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const result = build(v);
  const ready = !!(v.url && v.source && v.medium && v.campaign);

  function copy() {
    if (!result) return;
    navigator.clipboard?.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="ks-engine" style={{ margin: '0 0 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        {FIELDS.map((f) => (
          <div className="ks-field" key={f.id} style={f.id === 'url' ? { gridColumn: '1 / -1' } : undefined}>
            <label htmlFor={`utm-${f.id}`}>
              {f.label}
              {f.required ? <span style={{ color: 'var(--accent2)' }}> *</span> : null}
            </label>
            <input
              id={`utm-${f.id}`}
              type="text"
              placeholder={f.placeholder}
              value={v[f.id] ?? ''}
              onChange={(e) => setV((p) => ({ ...p, [f.id]: e.target.value }))}
              style={{ fontSize: 16 }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: ready ? 'block' : 'none',
          background: 'var(--surface3)',
          border: '1px solid var(--border2)',
          borderRadius: 'var(--r-md)',
          padding: '18px 20px',
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 10 }}>
          Your tagged URL
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, Menlo, monospace)',
            fontSize: 13.5,
            color: 'var(--heading)',
            wordBreak: 'break-all',
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          {result}
        </div>
        <button
          type="button"
          onClick={copy}
          className="ks-run-btn"
          style={{
            cursor: 'pointer',
            border: '1px solid var(--accent)',
            background: copied ? 'var(--accent)' : 'var(--accent-glow)',
            color: copied ? '#fff' : 'var(--accent)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 14,
            padding: '9px 18px',
            borderRadius: 'var(--r-sm, 8px)',
            transition: 'background .16s ease, color .16s ease',
          }}
        >
          {copied ? 'Copied ✓' : 'Copy URL'}
        </button>
      </div>
      {!ready ? (
        <p style={{ fontSize: '12.5px', color: 'var(--text3)', margin: '10px 0 0', fontStyle: 'italic' }}>
          Fill in the destination URL, source, medium, and campaign name to generate your link.
        </p>
      ) : null}
    </div>
  );
}
