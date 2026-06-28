'use client';

import { useEffect } from 'react';

/**
 * SiteGuard — legitimate anti-clone / attribution protection.
 *
 * WHAT THIS DOES (all transparent, none of it harms visitors):
 *   1. Checks the hostname the code is running on against an all-list of the
 *      domains YOU own.
 *   2. If the site is being served from a domain that is NOT yours (i.e. someone
 *      copied the build and rehosted it), it:
 *        a. fires a beacon to your PostHog so you are ALERTED to the clone, with
 *           the clone's hostname + referrer (so you can see where their traffic
 *           comes from);
 *        b. shows a clear attribution banner linking back to your real site —
 *           this is what actually SENDS YOU TRAFFIC from the copy;
 *        c. optionally hard-redirects the clone's visitors to your real site
 *           after a short delay (set REDIRECT_OFFDOMAIN = true).
 *
 * WHAT THIS DELIBERATELY DOES NOT DO: no hidden cryptominers, no silent data
 * exfiltration of visitors, no malware redirects. Those would be unethical and
 * would get YOUR real domain flagged by browsers/Google. This is the safe,
 * standard way to protect content and reclaim traffic from scrapers.
 *
 * SET-UP: put every domain you legitimately serve from in ALLOWED_HOSTS
 * (apex + www + any preview domains). Anything else is treated as a clone.
 */

// ▸▸▸ EDIT THIS: the domains YOU own / serve from.
const ALLOWED_HOSTS = [
  'firstsalesociety.com',
  'www.firstsalesociety.com',
  'localhost',
  '127.0.0.1',
];

// Your canonical site — where clone traffic gets sent.
const CANONICAL_ORIGIN = 'https://firstsalesociety.com';

// Set true to hard-redirect clone visitors to your site after the banner shows.
// Leave false to just show the banner + alert yourself (non-destructive).
const REDIRECT_OFFDOMAIN = false;
const REDIRECT_DELAY_MS = 7000;

function isAllowedHost(host: string): boolean {
  if (!host) return true; // SSR / file:// — don't act
  if (ALLOWED_HOSTS.includes(host)) return true;
  // allow your own Vercel previews (e.g. fss-xyz.vercel.app)
  if (host.endsWith('.vercel.app')) return true;
  return false;
}

export default function SiteGuard() {
  useEffect(() => {
    let host = '';
    try {
      host = window.location.hostname;
    } catch {
      return;
    }
    if (isAllowedHost(host)) return;

    // ── 1. Alert yourself: this build is running somewhere it shouldn't ──
    const payload = {
      clone_host: host,
      clone_href: window.location.href,
      clone_referrer: document.referrer || '',
      detected_at: new Date().toISOString(),
    };
    try {
      // Via PostHog if it loaded…
      (window as unknown as { posthog?: { capture: (e: string, p: object) => void } })
        .posthog?.capture('unauthorized_clone_detected', payload);
    } catch { /* ignore */ }
    try {
      // …and a direct beacon so it fires even if PostHog was stripped from the copy.
      const body = JSON.stringify({
        api_key: 'phc_yPHG9BuRYbAJXUr6CQvCdH78Y5ACgPLPYU3T9qXSDeRR',
        event: 'unauthorized_clone_detected',
        properties: { distinct_id: 'clone_' + host, ...payload },
      });
      navigator.sendBeacon?.('https://us.i.posthog.com/capture/', body);
    } catch { /* ignore */ }

    // ── 2. Attribution banner → sends the clone's traffic back to you ──
    if (!document.getElementById('__fss_guard_banner')) {
      const bar = document.createElement('div');
      bar.id = '__fss_guard_banner';
      bar.setAttribute('role', 'alert');
      bar.style.cssText = [
        'position:fixed', 'inset:0 0 auto 0', 'z-index:2147483647',
        'background:#0066cc', 'color:#fff',
        'font:600 15px/1.4 -apple-system,system-ui,sans-serif',
        'padding:14px 18px', 'text-align:center',
        'box-shadow:0 2px 12px rgba(0,0,0,.25)',
      ].join(';');
      const a = document.createElement('a');
      a.href = CANONICAL_ORIGIN;
      a.style.cssText = 'color:#fff;text-decoration:underline;font-weight:800';
      a.textContent = 'firstsalesociety.com';
      bar.append(
        document.createTextNode('This is an unauthorized copy of First Sale Society. View the real, always-free version at '),
        a,
        document.createTextNode(' →'),
      );
      const pad = () => { document.body.style.paddingTop = bar.offsetHeight + 'px'; };
      document.body.prepend(bar);
      pad();
    }

    // ── 3. Optional: reclaim the visitor entirely ──
    if (REDIRECT_OFFDOMAIN) {
      window.setTimeout(() => {
        window.location.replace(CANONICAL_ORIGIN + window.location.pathname);
      }, REDIRECT_DELAY_MS);
    }
  }, []);

  return null;
}
