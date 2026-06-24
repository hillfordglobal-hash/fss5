# FSS — Apple Redesign · Handoff

Restyle + targeted fixes. The 6 CSS files are a full rebuild; a few component
files have **functional fixes** (theme persistence, active-module highlight,
decluttered module header, phase icons). No course content/copy changed.

## ⚠️ Apply ALL of these — not just the CSS
The theme-revert and sidebar-highlight bugs are fixed in the **.tsx files**, so
copying only the CSS will NOT fix them. Copy every file below to the same path
in your repo, preserving folders.

### Stylesheets → `public/css/`
- `public/css/1-tokens-base.css`
- `public/css/2-layout-sidebar-nav.css`   (phase icons, Operator-Resources card)
- `public/css/3-components.css`            (module top chrome, TL;DR band, hero)
- `public/css/4-features-redesign.css`
- `public/css/5-polish-fixes-final.css`    (dark-mode hardening)
- `public/css/6-apple-redesign.css`

### Components / pages
- `app/layout.tsx` — **THEME FIX.** Replaces the unreliable `next/script`
  preload with a plain render-blocking `<script>` in `<head>` (+ one in
  `<body>`) so the chosen theme is re-applied before paint on every full page
  load. This is what stops dark mode snapping back to light when you click a
  link / next module.
- `components/ThemeToggle.tsx` — keeps the `<html>` preload-dark/-light flags in
  sync with the toggle (belt-and-suspenders for the fix above).
- `components/Sidebar.tsx` — **ACTIVE-MODULE FIX** (now a client component using
  `usePathname()` to add `.active` to the current page's nav item) **+ a unique
  Apple line-icon for every one of the 27 modules** (fitting its name) + Apple
  line-icons per phase + the distinct Operator-Resources card.
- `components/GlobalInteractivity.tsx` — **READING-PROGRESS BAR.** The existing
  scroll handler now also drives the blue bar at the top of each module to show
  how far through it you've scrolled (completion).
- `app/course/[slug]/page.tsx` — **DECLUTTERED HEADER.** Clean breadcrumb +
  "Module N of 27" pill. The TL;DR band was **removed** (it pulled from SEO meta
  descriptions that didn't always match the title).

## What changed visually
- Module top is now: blue reading-progress bar → clean breadcrumb + counter pill
  → hero. The redundant brand bar + the mismatched TL;DR band are gone.
- Sidebar: every module has its own Apple line-icon; each phase has an icon;
  Operator Resources is a distinct card; the current module is highlighted with a
  gradient rail.

## Notes
- All 27 modules verified present in both `data/modules.ts` and the sidebar —
  nothing was missing, so nothing was added.
- Discord branding/icons untouched. `backup-css-original/` holds your old CSS.
- Don't ship `redesign-preview.html` / `css-rebuild/` — local working files.
