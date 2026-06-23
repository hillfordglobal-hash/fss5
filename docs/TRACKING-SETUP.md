# Tracking & Measurement Setup — First Sale Society

This complements `GSC-SETUP.md` (indexation/schema monitoring) with the
broader measurement stack: keyword rank tracking, AI-citation tracking, and
conversion attribution. None of this requires code changes to the Next.js
site beyond adding the relevant snippet(s) below — it's an operational setup
guide for whoever runs growth/marketing on this project.

## 1. Google Search Console (see GSC-SETUP.md)
Already covered in detail there: sitemap submission, rich-results monitoring,
weekly coverage checks, and Month 1-3 target metrics.

## 2. Keyword Rank Tracking

Use a rank tracker (SE Ranking, Ahrefs, or Semrush) to monitor daily
positions for the highest-priority keywords across US/UK/CA/AU. Group
tracked keywords by page type so reporting can break out performance by
category:

- **Calculator/tool keywords** — "break even ROAS calculator", "break even
  ROAS formula", "dropshipping profit calculator"
- **Glossary keywords** — "what is CBO Facebook ads", "what is surf
  scaling", "what is creative fatigue Facebook ads"
- **Course/module keywords** — the `targetKeyword` value already set per
  module in `data/modules.ts` (27 keywords)
- **FAQ keywords** — long-tail question queries, e.g. "do I need an LLC to
  start dropshipping"

Also monitor **Featured Snippet** and **People Also Ask (PAA)** placements
specifically for glossary and FAQ pages — these are the highest-leverage win
condition for a new domain with no backlink authority yet, since snippet/PAA
placement doesn't require outranking competitors on the main result, just
having the cleanest extractable answer.

## 3. AEO (AI Search) Citation Tracking

As of this writing, dedicated AEO analytics products (e.g. HubSpot's AEO
Search Grader, in beta) are early-stage — verify current availability and
feature set before committing budget, since this space is moving fast and
specific products may have changed.

In the meantime, two things are reliably available:

- **Referral log analysis**: check the site's analytics for traffic
  attributed to `chat.openai.com`, `perplexity.ai`, `claude.ai`, and similar
  referrers. This captures click-through from AI answers that include a
  citation link — it does NOT capture answers where the AI cites the site
  without the user clicking through, which is a fundamental measurement gap
  industry-wide right now.
- **Manual citation spot-checks**: periodically ask ChatGPT, Claude, and
  Perplexity the target questions this site is built to answer (e.g. "how do
  I calculate break-even ROAS for dropshipping", "what is CBO in Facebook
  ads") and check whether firstsalesociety.com is cited. Track this in a
  simple spreadsheet — keyword, date checked, cited Y/N, which engine.

## 4. Conversion Attribution

Track organic visitors through to the two meaningful conversion events this
site has:

- **Course start** — clicking into `/course/start-here` from an organic
  landing page (homepage, blog post, or any deep module page)
  is a fine first definition; if a more granular "started the course" event
  is added later (e.g. completing the first checklist item), prefer that.
- **Discord join** — clicking any of the `discord.gg/j93jW5wauj` links
  embedded across module pages, the homepage, and the sidebar.

Use GA4 (free, sufficient for this) or a paid product analytics tool like
Mixpanel if more advanced funnel analysis is needed later. At minimum, set
up GA4 with:

1. The standard GA4 snippet in `app/layout.tsx` (not yet added — this is a
   deliberate omission until the operator confirms which analytics
   provider they want, since adding a tracking script is a decision with
   privacy/consent implications worth making explicitly rather than
   defaulting silently).
2. An Outbound Link click event for `discord.gg` links (GA4's "Enhanced
   measurement" captures outbound clicks automatically if enabled in the
   GA4 property settings — no code needed).
3. A custom event (or just a pageview-based proxy) for `/course/start-here`
   reached via organic referral.

## 5. Phase-Based KPI Targets

Mirrors the report's three-phase framework — useful as a scoreboard once
the site has traffic to measure:

**Phase 1 — Foundation (Months 1-3):** sitemap indexation rate >95% within
14 days, zero raw-HTML/rendered-DOM mismatches on URL Inspection spot
checks, Core Web Vitals INP <200ms, >500 monthly visitors to the ROAS
calculator page specifically.

**Phase 2 — Engagement (Months 4-6):** >5,000 monthly organic sessions
site-wide, >15 featured-snippet/PAA placements across glossary+FAQ pages,
>3.5 min average session duration on course pages, >20% interaction rate
with the ROAS calculator (i.e. visitors who actually enter numbers, not just
view the page).

**Phase 3 — Authority (Months 7-12):** >1,000 monthly course starts, >15%
Discord join rate among course starters, >150 unique referring domains
(Ahrefs backlink profile), and visible AI-citation presence for the core
target questions tracked via the manual spot-check process above.

These thresholds are planning targets carried over from the original
strategy brief, not guarantees — treat them as a scoreboard to calibrate
against actual results, not a contract.
