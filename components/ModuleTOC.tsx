'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Module table-of-contents with scroll-spy.
 *
 * Reads the headings out of the verbatim module content (rendered via
 * dangerouslySetInnerHTML), assigns stable ids, and offers jump navigation +
 * an active-section highlight. On very wide screens it floats as a fixed right
 * rail in the gutter; on everything else it renders as a sticky, collapsible
 * "On this page" card above the content. Hidden when there are fewer than 3
 * headings. Pure progressive enhancement — no layout surgery on the shell.
 */

interface Head {
  id: string;
  text: string;
  level: number;
}

function slugify(s: string, used: Set<string>): string {
  const base =
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60) || 'section';
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

export default function ModuleTOC() {
  const [heads, setHeads] = useState<Head[]>([]);
  const [active, setActive] = useState<string>('');
  const [wide, setWide] = useState(false);
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const panel = document.querySelector('.page-panel');
    if (!panel) return;
    const nodes = Array.from(panel.querySelectorAll('h2, h3')) as HTMLElement[];
    const used = new Set<string>();
    const collected: Head[] = [];
    for (const el of nodes) {
      const text = el.textContent?.trim() ?? '';
      if (!text) continue;
      if (!el.id) el.id = slugify(text, used);
      else used.add(el.id);
      el.style.scrollMarginTop = '96px';
      collected.push({ id: el.id, text, level: el.tagName === 'H2' ? 2 : 3 });
    }
    if (collected.length < 3) return;
    setHeads(collected);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    );
    collected.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    observerRef.current = obs;
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1600px)');
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  if (heads.length < 3) return null;

  function jump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActive(id);
    setOpen(false);
  }

  const list = (
    <nav aria-label="On this page" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {heads.map((h) => {
        const on = active === h.id;
        return (
          <button
            type="button"
            key={h.id}
            onClick={() => jump(h.id)}
            style={{
              textAlign: 'left',
              font: 'inherit',
              cursor: 'pointer',
              border: 'none',
              background: 'transparent',
              padding: `4px 0 4px ${h.level === 3 ? 22 : 12}px`,
              borderLeft: `2px solid ${on ? 'var(--accent)' : 'transparent'}`,
              color: on ? 'var(--accent)' : 'var(--text2)',
              fontSize: 13,
              fontWeight: on ? 600 : 400,
              lineHeight: 1.4,
              transition: 'color .14s ease, border-color .14s ease',
            }}
          >
            {h.text}
          </button>
        );
      })}
    </nav>
  );

  const label = (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--text3)',
      }}
    >
      On this page
    </div>
  );

  if (wide) {
    return (
      <aside
        style={{
          position: 'fixed',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          width: 220,
          maxHeight: '70vh',
          overflowY: 'auto',
          padding: '4px 4px 4px 0',
          zIndex: 40,
        }}
      >
        <div style={{ marginBottom: 12, paddingLeft: 12 }}>{label}</div>
        {list}
      </aside>
    );
  }

  return (
    <div
      style={{
        position: 'sticky',
        top: 8,
        zIndex: 40,
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: '0 var(--content-pad)',
      }}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-card, 0 4px 18px rgba(0,0,0,0.05))',
          padding: '10px 14px',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            font: 'inherit',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            padding: 0,
          }}
        >
          {label}
          <span style={{ color: 'var(--accent)', fontSize: 13, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .16s ease' }}>
            ▾
          </span>
        </button>
        {open ? <div style={{ marginTop: 10 }}>{list}</div> : null}
      </div>
    </div>
  );
}
