'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ToolkitSearch — adds the search + category filter the audit called for, on
 * top of the existing verbatim toolkit cards (no content rebuild). Inserts its
 * control bar between the hero and the category list via a portal, then filters
 * the live .tkc cards by query and category, hiding empty categories.
 */
export default function ToolkitSearch() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [cats, setCats] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');

  // Insert a mount point right before the category list.
  useEffect(() => {
    const page = document.querySelector('.tk-page');
    if (!page) return;
    const host = document.createElement('div');
    host.id = 'toolkit-search-host';
    page.parentNode?.insertBefore(host, page);

    const titles = Array.from(document.querySelectorAll('.tk-page .tk-cat-title'))
      .map((el) => (el.textContent || '').trim())
      .filter(Boolean);
    setCats(['All', ...titles]);
    setNode(host);
    return () => {
      host.remove();
    };
  }, []);

  // Apply filtering whenever query/active changes.
  useEffect(() => {
    const q = query.trim().toLowerCase();
    const cards = Array.from(document.querySelectorAll('.tk-page .tkc')) as HTMLElement[];
    cards.forEach((card) => {
      const text = (card.textContent || '').toLowerCase();
      card.style.display = q && !text.includes(q) ? 'none' : '';
    });
    // Show/hide each category (.tk-cat header + its next .tk-grid-v2) by active
    // filter and by whether it has any visible cards.
    const headers = Array.from(document.querySelectorAll('.tk-page .tk-cat')) as HTMLElement[];
    headers.forEach((header) => {
      const title = (header.querySelector('.tk-cat-title')?.textContent || '').trim();
      const grid = header.nextElementSibling as HTMLElement | null;
      const catMatch = active === 'All' || active === title;
      const visibleCards = grid
        ? (Array.from(grid.querySelectorAll('.tkc')) as HTMLElement[]).filter((c) => c.style.display !== 'none')
        : [];
      const show = catMatch && visibleCards.length > 0;
      header.style.display = show ? '' : 'none';
      if (grid) grid.style.display = show ? '' : 'none';
    });
  }, [query, active]);

  if (!node) return null;

  const pill = (label: string): React.CSSProperties => ({
    fontSize: 12.5,
    fontWeight: 600,
    padding: '6px 13px',
    borderRadius: 980,
    cursor: 'pointer',
    border: `1px solid ${active === label ? 'var(--accent)' : 'var(--border)'}`,
    background: active === label ? 'var(--accent)' : 'var(--surface)',
    color: active === label ? '#fff' : 'var(--text2)',
    font: 'inherit',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
  });

  return createPortal(
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 var(--content-pad) 8px' }}>
      <div
        style={{
          height: 44,
          borderRadius: 980,
          border: '1px solid var(--border2)',
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 16px',
          marginBottom: 14,
        }}
      >
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--text3)" strokeWidth={1.7} strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.2-3.2" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          aria-label="Search tools"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'inherit', fontSize: 15, color: 'var(--heading)' }}
        />
        {query ? (
          <button type="button" onClick={() => setQuery('')} aria-label="Clear search" style={{ border: 'none', background: 'transparent', color: 'var(--text3)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>
            ×
          </button>
        ) : null}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {cats.map((c) => (
          <button type="button" key={c} style={pill(c)} onClick={() => setActive(c)}>
            {c.replace(/^[^\w]+\s*/, '')}
          </button>
        ))}
      </div>
    </div>,
    node
  );
}
