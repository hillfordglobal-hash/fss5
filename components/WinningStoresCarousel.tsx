'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * WinningStoresCarousel — social-proof carousel for the home page, built in the
 * same visual language as the Image Ads module (.adimg-carousel-wrap / track /
 * slide + click-to-magnify lightbox), with a caption under each store.
 *
 * Images live at /winningstores/N.jpeg (public/winningstores/).
 */

type Store = { src: string; stat: string; sub: string };

const stores: Store[] = [
  { src: '/winningstores/1.jpeg', stat: 'This store went from 0 monthly visitors to 51k', sub: 'Running 1.1k Facebook ads' },
  { src: '/winningstores/2.jpeg', stat: 'This store went from nothing to 29k monthly visitors', sub: 'Running 179 Facebook ads' },
  { src: '/winningstores/3.jpeg', stat: 'This store went from nothing to 30k monthly visitors in one month', sub: 'Running 172 Facebook ads' },
  { src: '/winningstores/4.jpeg', stat: 'This new store went from nothing to 45k monthly visitors in one month', sub: 'Running 199 Facebook ads' },
  { src: '/winningstores/6.jpeg', stat: 'This new store went from 0 to 18k monthly visitors', sub: 'Running 262 Facebook ads' },
  { src: '/winningstores/5.jpeg', stat: 'This new store went from nothing to 14k monthly visitors in one month', sub: 'Running 251 Facebook ads' },
  { src: '/winningstores/7.jpeg', stat: 'This new store went from nothing to 14k monthly visitors in one month', sub: 'Running 96 Facebook ads' },
  { src: '/winningstores/8.jpeg', stat: 'This store went from nothing to 73k monthly visitors in 2 months', sub: 'While running 813 Meta ads' },
];

export default function WinningStoresCarousel({ limit }: { limit?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const items = typeof limit === 'number' ? stores.slice(0, limit) : stores;

  const scroll = useCallback((dir: number) => {
    const t = trackRef.current;
    if (!t) return;
    const slide = t.querySelector('.adimg-slide') as HTMLElement | null;
    const w = slide ? slide.offsetWidth + 14 : 320;
    t.scrollBy({ left: dir * w * 1.5, behavior: 'smooth' });
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  // Keyboard controls while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') nav(1);
      else if (e.key === 'ArrowLeft') nav(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, nav]);

  return (
    <div className="adimg-carousel-wrap ws-carousel">
      <div className="adimg-carousel-label">🏆 Real Stores, Real Results</div>
      <p className="adimg-carousel-sub">
        Stores scaled to real traffic with Facebook ads. Swipe through, or click any to magnify.
      </p>

      <div className="adimg-carousel">
        <button className="adimg-nav-btn adimg-nav-prev" aria-label="Previous" onClick={() => scroll(-1)}>
          ‹
        </button>

        <div className="adimg-track ws-track" ref={trackRef}>
          {items.map((s, i) => (
            <div className="adimg-slide ws-slide" key={s.src}>
              <img
                src={s.src}
                alt={s.stat}
                loading="lazy"
                decoding="async"
                onClick={() => setOpen(i)}
              />
              <div className="ws-cap">
                <div className="ws-stat">{s.stat}</div>
                <div className="ws-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="adimg-nav-btn adimg-nav-next" aria-label="Next" onClick={() => scroll(1)}>
          ›
        </button>
      </div>

      {open !== null && (
        <div className="ws-lb ws-lb-open" onClick={close}>
          <button className="ws-lb-close" aria-label="Close" onClick={close}>
            ×
          </button>
          <button
            className="ws-lb-nav ws-lb-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              nav(-1);
            }}
          >
            ‹
          </button>
          <div className="ws-lb-ctr" onClick={(e) => e.stopPropagation()}>
            <img src={items[open].src} alt={items[open].stat} />
            <div className="ws-lb-cap">
              <div className="ws-stat">{items[open].stat}</div>
              <div className="ws-sub">{items[open].sub}</div>
            </div>
          </div>
          <button
            className="ws-lb-nav ws-lb-next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              nav(1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
