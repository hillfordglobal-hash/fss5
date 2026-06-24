'use client';

import { useEffect } from 'react';

/**
 * Wires layout-level interactive behaviors that live in the persistent
 * shell (layout.tsx), ported from main.js:
 *   - Glossary modal: open via G key / toolbar button, close, search filter,
 *     category filter buttons (filterGlossary)
 *   - Stage-complete overlay: close via Escape or the "Stay and review" button
 *   - Scroll-to-top button (#scroll-top-btn): show on scroll, smooth scroll
 *   - Sidebar progress bar (#sidebar-progress-fill): persisted module completion
 *
 * Mounted once in the root layout so these behaviors work on every page.
 */
export default function GlobalInteractivity() {
  useEffect(() => {
    // ── Glossary modal open/close ──
    function openGlossaryModal() {
      const m = document.getElementById('glossary-modal');
      if (!m) return;
      m.classList.add('open');
      document.body.style.overflow = 'hidden';
      const input = document.getElementById('glossary-search-input') as HTMLInputElement | null;
      if (input) setTimeout(() => input.focus(), 100);
    }

    function closeGlossaryModal() {
      const m = document.getElementById('glossary-modal');
      if (!m) return;
      m.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Close button
    document.getElementById('glossary-close-btn')?.addEventListener('click', closeGlossaryModal);

    // G key opens glossary (original SPA behaviour)
    function handleGlobalKeydown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const inInput = tag === 'input' || tag === 'textarea' || tag === 'select';

      // Escape: close glossary, then stage-complete overlay
      if (e.key === 'Escape') {
        const glossary = document.getElementById('glossary-modal');
        if (glossary?.classList.contains('open')) { closeGlossaryModal(); return; }
        const sc = document.getElementById('stage-complete-overlay');
        if (sc?.classList.contains('show')) {
          sc.classList.remove('show');
          document.body.style.overflow = '';
          return;
        }
      }

      // G key: toggle glossary
      if (e.key === 'g' || e.key === 'G') {
        if (inInput) return;
        const glossary = document.getElementById('glossary-modal');
        if (glossary?.classList.contains('open')) closeGlossaryModal();
        else openGlossaryModal();
      }
    }
    document.addEventListener('keydown', handleGlobalKeydown);

    // Click outside glossary-box closes the modal
    function handleGlossaryBackdropClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.id === 'glossary-modal') closeGlossaryModal();
    }
    document.addEventListener('click', handleGlossaryBackdropClick);

    // ── Glossary search + category filter ──
    function filterGlossary(searchVal: string, cat: string) {
      const items = document.querySelectorAll('#glossary-list .glossary-item');
      let visible = 0;
      items.forEach((item) => {
        const text = item.textContent?.toLowerCase() || '';
        const tagEl = item.querySelector('.glossary-tag');
        const itemCat = tagEl?.textContent?.trim() || '';
        const matchesCat = cat === 'all' || itemCat === cat;
        const matchesSearch = !searchVal || text.includes(searchVal.toLowerCase());
        const show = matchesCat && matchesSearch;
        (item as HTMLElement).style.display = show ? '' : 'none';
        if (show) visible++;
      });
      const empty = document.getElementById('glossary-empty');
      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
      const count = document.getElementById('glossary-count');
      if (count) count.textContent = visible === items.length ? '' : `${visible} term${visible !== 1 ? 's' : ''}`;
    }

    let currentGlossaryCat = 'all';

    const searchInput = document.getElementById('glossary-search-input');
    searchInput?.addEventListener('input', (e) => {
      filterGlossary((e.target as HTMLInputElement).value, currentGlossaryCat);
    });

    function handleGcatClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest('.gcat-btn');
      if (!btn) return;
      document.querySelectorAll('.gcat-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentGlossaryCat = btn.getAttribute('data-cat') || 'all';
      const searchVal = (document.getElementById('glossary-search-input') as HTMLInputElement | null)?.value || '';
      filterGlossary(searchVal, currentGlossaryCat);
    }
    document.getElementById('glossary-cats')?.addEventListener('click', handleGcatClick);

    // Open glossary from desktop/mobile header buttons if clicked
    function handleHeaderGlossaryClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('#dhc-glossary, #mob-glossary-btn')) {
        e.preventDefault();
        openGlossaryModal();
      }
    }
    document.addEventListener('click', handleHeaderGlossaryClick);

    // ── Stage-complete overlay close ──
    document.getElementById('sc-stay-btn')?.addEventListener('click', () => {
      document.getElementById('stage-complete-overlay')?.classList.remove('show');
      document.body.style.overflow = '';
    });

    document.getElementById('scroll-top-btn')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll-to-top button visibility + module reading-progress bar
    function handleScroll() {
      const btn = document.getElementById('scroll-top-btn');
      if (btn) btn.classList.toggle('visible', window.scrollY > 400);
      // Reading-progress bar (present only on course module pages)
      const fill = document.querySelector('.page-progress-fill') as HTMLElement | null;
      if (fill) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
        fill.style.width = pct + '%';
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // set initial state

    // ── Sidebar progress bar ──
    // Read stored module-visit keys from localStorage and calculate percentage
    // (mirrors main.js updateProgress). Only course module pages (m1–m_supps)
    // count — resource pages (toolkit, faq, etc.) don't advance the bar.
    function updateSidebarProgress() {
      const fill = document.getElementById('sidebar-progress-fill');
      if (!fill) return;
      try {
        const progress = JSON.parse(localStorage.getItem('ecom_progress') || '{}');
        const keys = Object.keys(progress).filter((k) => !k.startsWith('sc_'));
        const moduleKeys = keys.filter((k) => progress[k] === 1);
        // 27 total course modules (from data/modules.ts)
        const total = 27;
        const pct = Math.round((moduleKeys.length / total) * 100);
        fill.style.width = `${pct}%`;
        const label = document.getElementById('sidebar-progress-label');
        if (label) label.textContent = pct > 0 ? `${pct}%` : '';
      } catch {
        /* ignore */
      }
    }
    updateSidebarProgress();

    return () => {
      document.removeEventListener('keydown', handleGlobalKeydown);
      document.removeEventListener('click', handleGlossaryBackdropClick);
      document.removeEventListener('click', handleHeaderGlossaryClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return null;
}
