'use client';

import Link from 'next/link';
import { useState } from 'react';
import { glossaryTerms } from '@/data/glossary';

const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

export default function SidebarGlossary() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? sortedTerms.filter((t) =>
        t.term.toLowerCase().includes(query.toLowerCase())
      )
    : sortedTerms;

  return (
    <div>
      <button
        aria-expanded={open}
        className="nav-item"
        onClick={() => setOpen((v) => !v)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        type="button"
      >
        <span className="num">📖</span>
        <span>Full Glossary</span>
        <div className="nav-check" style={{ opacity: 0.4, fontSize: 9 }}>{open ? '▲' : '▼'}</div>
      </button>

      {open && (
        <div
          style={{
            margin: '4px 8px 6px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <input
            aria-label="Search glossary terms"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '7px 10px',
              background: 'var(--surface2)',
              border: 'none',
              borderBottom: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: 12.5,
              outline: 'none',
            }}
            type="text"
            value={query}
          />
          <div
            style={{
              maxHeight: 320,
              overflowY: 'auto',
              padding: '4px 0',
            }}
          >
            {filtered.length === 0 ? (
              <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--text3)' }}>
                No terms found
              </div>
            ) : (
              filtered.map((t) => (
                <Link
                  href={`/glossary/${t.slug}`}
                  key={t.slug}
                  style={{
                    display: 'block',
                    padding: '5px 12px',
                    fontSize: 12.5,
                    color: 'var(--text2)',
                    textDecoration: 'none',
                    lineHeight: 1.4,
                  }}
                  onClick={() => setOpen(false)}
                >
                  {t.term}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
