'use client';

import { useEffect, useRef } from 'react';

function slugToTitle(path: string): string {
  const segment = path.split('/').filter(Boolean).pop() ?? '';
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function GlossaryBackButton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const referrer = document.referrer;
    if (!referrer || !containerRef.current) return;

    try {
      const url = new URL(referrer);
      const isSameOrigin = url.origin === window.location.origin;
      const isInternal =
        isSameOrigin || url.hostname.includes('firstsalesociety.com');
      if (!isInternal) return;
      const label = slugToTitle(url.pathname);
      if (!label) return;

      const btn = document.createElement('button');
      btn.className = 'module-nav-btn';
      btn.type = 'button';
      btn.style.marginBottom = '12px';
      btn.style.cursor = 'pointer';
      btn.textContent = `← Back to ${label}`;
      btn.addEventListener('click', () => window.history.back());
      containerRef.current.appendChild(btn);
    } catch {
      // referrer wasn't a valid URL — ignore
    }
  }, []);

  return <div ref={containerRef} />;
}
