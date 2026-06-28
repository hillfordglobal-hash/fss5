# Security review & anti-copy protection — First Sale Society

## 1. Security review summary

This is a **static content site** (Next.js, no backend, no auth, no database, no
user-generated content, no forms posting to a server). The attack surface is
small. Findings:

| Area | Status | Notes |
|---|---|---|
| Secrets in client code | ✅ OK | Only the PostHog **public ingestion key** (`phc_…`) is exposed — that is by design (write-only). No API keys, tokens, passwords, or `.env` secrets. |
| XSS via `dangerouslySetInnerHTML` | ⚠️ Acceptable | Used in 4 places (modules, resource panels, glossary, JSON-LD) but always on **first-party build-time data**, never user input. Keep that content author-only. |
| External / affiliate links | ✅ OK | `rel="noopener"` and `rel="sponsored nofollow"` are set — no reverse-tabnabbing, no SEO leakage. |
| Injection / SQLi / auth bypass | ✅ N/A | No server, DB, or accounts. |
| Clickjacking / MIME sniff / referrer leak | ➕ Fixed | Added security headers in `next.config.js` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS). |

### Action items
1. Add `next.config.js` (or merge its `headers()` into your existing config).
2. If you statically export to a CDN, set the same headers at the host level.
3. Never feed user input into the `dangerouslySetInnerHTML` data files.
4. Rotate the PostHog key only if you want — it is not a vulnerability.

## 2. Anti-copy / attribution protection (legitimate)

Three layers, all safe and transparent — none harm visitors:

**a. `components/SiteGuard.tsx`** (mounted in `app/layout.tsx`)
- Checks the runtime hostname against `ALLOWED_HOSTS` (**edit this list** to your
  real domains).
- If served from a domain that isn't yours (a clone), it:
  - fires `unauthorized_clone_detected` to your PostHog (via SDK **and** a direct
    `sendBeacon`, so it works even if they strip the SDK) with the clone's host +
    referrer — **this is your copy alert + their traffic source**;
  - shows a banner linking back to your real site — **this sends you the traffic**;
  - optionally hard-redirects clone visitors to your site (`REDIRECT_OFFDOMAIN`,
    default off so a misconfigured allowlist can never bounce your real users).

**b. Passive copy-detection pixel** (in `app/layout.tsx`)
- A 1×1 `<img>` whose `src` points at `firstsalesociety.com`. If the build is
  copied, the pixel still requests **your** domain, so your access logs record the
  clone's domain as the `Referer` — a copy alert that works with **JavaScript
  disabled**. Serve any 1×1 at `/_px.gif` (or repoint to an existing asset and
  watch its referrers).

**c. Visually-hidden attribution backlink** (in `app/layout.tsx`)
- An always-present credit + `rel="author"` link. Copiers who don't strip it hand
  you SEO attribution; it also acts as a honeytoken you can search the web for.

### What was deliberately NOT done
No hidden cryptominers, no silent exfiltration of visitor data, no malware
redirects. Those are unethical and would get **your** real domain flagged by
Google Safe Browsing / browsers. The measures above are the standard, safe way to
detect clones and reclaim their traffic.

### Before you go live
- [ ] Put every domain you serve from in `SiteGuard.ALLOWED_HOSTS` (apex + www +
      previews). A missing domain = your own users see the clone banner.
- [ ] Decide whether to flip `REDIRECT_OFFDOMAIN` to `true` (strongest reclaim).
- [ ] Add a 1×1 `/_px.gif` to `public/` (or repoint the pixel) so it returns 200.
- [ ] Deploy `next.config.js` and verify headers (e.g. securityheaders.com).
