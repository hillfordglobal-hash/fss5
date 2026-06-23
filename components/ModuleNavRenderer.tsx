'use client';

import { useEffect } from 'react';

/**
 * Fills the .module-nav placeholder div that's already present at the end
 * of every module's verbatim content (e.g.
 * <div class="module-nav" data-label="Module 06 · Phase 2: Source It"
 *      data-name="Find Your Supplier" data-next="m5"
 *      data-next-label="07: Build Shopify Store →" data-prev="m4"
 *      data-prev-label="← 05: Validate the Product"></div>).
 *
 * In the original SPA, panel-loader.js's reinitInjected() filled this div
 * with prev/back buttons that called goToPage(). Since this site uses real
 * routes instead of client-side panel swapping, clicking next/prev here
 * does a normal navigation — so we render real <a href> links pointing at
 * /course/[slug] instead of buttons with onclick handlers.
 *
 * This REPLACES any separately hand-built prev/next bar on the page — the
 * .module-nav placeholder is already part of the verbatim content, so
 * having a second prev/next bar elsewhere on the page duplicates it.
 *
 * idToSlug maps the data-prev/data-next module ids (e.g. "m5") to their
 * route slugs (e.g. "build-shopify-store"), since the verbatim content uses
 * the original internal ids, not the new URL slugs.
 */
/**
 * Two ids found in the source data aren't course-module ids at all — they're
 * special targets pointing at the resource directory pages:
 *   - "toolkit" (ad-copy's data-next) → /toolkit
 *   - "glossary-page" (supplements-niche's data-next, the last module in
 *     sequence) → /glossary
 * idToSlug only covers the 27 course modules, so these need their own
 * resolver rather than being silently dropped.
 */
const specialRouteTargets: Record<string, string> = {
  toolkit: '/toolkit',
  'glossary-page': '/glossary',
};

function resolveHref(id: string, idToSlug: Record<string, string>): string | null {
  if (specialRouteTargets[id]) return specialRouteTargets[id];
  const slug = idToSlug[id];
  return slug ? `/course/${slug}` : null;
}

/** Hardcoded next-step map for resource pages that have no .module-nav div.
 *  Order matches the sidebar: AI Ad Lab → Swipe Files → Toolkit → FAQs → Glossary
 */
const resourceNextMap: Record<string, { nextHref: string; nextLabel: string }> = {
  '/ai-ad-lab':   { nextHref: '/swipe-files', nextLabel: 'Swipe Files →' },
  '/swipe-files': { nextHref: '/toolkit',     nextLabel: 'Toolkit →' },
  '/toolkit':     { nextHref: '/faq',         nextLabel: 'FAQs →' },
  '/faq':         { nextHref: '/glossary',    nextLabel: 'Full Glossary →' },
  '/glossary':    { nextHref: '/',            nextLabel: 'Back to Course →' },
};

export default function ModuleNavRenderer({ idToSlug }: { idToSlug: Record<string, string> }) {
  useEffect(() => {
    // Fill any .module-nav divs from verbatim content (course modules)
    document.querySelectorAll('.module-nav:not([data-nav-init])').forEach((el) => {
      el.setAttribute('data-nav-init', '1');

      const prevId = el.getAttribute('data-prev');
      const prevLabel = el.getAttribute('data-prev-label');
      const nextId = el.getAttribute('data-next');
      const nextLabel = el.getAttribute('data-next-label');
      const label = el.getAttribute('data-label');
      const name = el.getAttribute('data-name');
      const prevDisabled = el.hasAttribute('data-prev-disabled');

      let prevHTML = '';
      if (prevDisabled) {
        prevHTML = '<button class="module-nav-btn" disabled aria-disabled="true">← Start</button>';
      } else if (prevId) {
        const prevHref = resolveHref(prevId, idToSlug);
        if (prevHref) {
          prevHTML = `<a class="module-nav-btn" href="${prevHref}">${prevLabel || '← Back'}</a>`;
        }
      }

      let infoHTML = '';
      if (label || name) {
        infoHTML = `<div class="module-nav-info"><div class="module-nav-label">${label || ''}</div><div class="module-nav-name">${name || ''}</div></div>`;
      }

      let nextHTML = '';
      if (nextId) {
        const nextHref = resolveHref(nextId, idToSlug);
        if (nextHref) {
          nextHTML = `<a class="module-nav-btn primary" href="${nextHref}">${nextLabel || 'Next →'}</a>`;
        }
      }

      el.innerHTML = prevHTML + infoHTML + nextHTML;
    });

    // Inject a nav bar for resource pages that have no .module-nav div at all
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const resourceNav = resourceNextMap[path];
    if (resourceNav && !document.querySelector('.module-nav')) {
      const main = document.getElementById('main');
      if (main) {
        const bar = document.createElement('div');
        bar.className = 'module-nav';
        bar.setAttribute('data-nav-init', '1');
        bar.innerHTML = `<a class="module-nav-btn primary" href="${resourceNav.nextHref}">${resourceNav.nextLabel}</a>`;
        main.appendChild(bar);
      }
    }
  }, [idToSlug]);

  return null;
}
