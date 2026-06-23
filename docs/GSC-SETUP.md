# Google Search Console Setup — First Sale Society

## Step 1: Verify Domain Ownership
1. Go to search.google.com/search-console
2. Click "Add Property" → choose "Domain" (not URL prefix)
3. Enter: firstsalesociety.com
4. Copy the TXT record and add it to your DNS provider (Vercel DNS or external registrar)
5. Click Verify

## Step 2: Submit Sitemap
1. In GSC left sidebar → "Sitemaps"
2. Enter: https://firstsalesociety.com/sitemap.xml
3. Click Submit
4. Within 48 hours, check "Coverage" — target: all module, glossary, FAQ, and tool pages indexed

## Step 3: Enable Rich Results Monitoring
1. In GSC left sidebar → "Search Appearance"
2. Look for: Course, FAQPage, Breadcrumbs, DefinedTerm enhancements
3. Fix any errors immediately

## Step 4: Weekly Monitoring Checklist (Months 1-3)
- [ ] Coverage: check for new indexed pages (target: all sitemap URLs indexed within 14 days)
- [ ] URL Inspection: spot-check 3-5 pages weekly, verify rendered HTML matches source
- [ ] Rich Results: check for schema errors on FAQPage, Course, DefinedTerm
- [ ] Performance: watch impressions for target keywords (expect first impressions within 30 days)

## Step 5: Month 1-3 Target Metrics
- > 95% of sitemap URLs indexed within 14 days
- First impressions for "break even ROAS calculator" within 30 days
- First impressions for glossary term queries within 21 days
- First People Also Ask appearances for FAQ pages within 45 days

## Step 6: What to Track in GSC Performance Report
Weekly: Total impressions, total clicks, average position
Monthly: Breakdown by page type (tools, glossary, FAQ, modules)
Watch especially:
- Any page with >100 impressions but <1% CTR → improve title tag
- Any page with position 4-15 for its target keyword → optimise H1, meta description, and add TL;DR

---

## Appendix: Why a Domain property, not URL-prefix

A Domain property automatically covers `http://`, `https://`, `www.`, and
non-`www.` variants under one GSC property — useful since `vercel.json` in
this repo redirects the `.vercel.app` preview domain to the production
domain, and you want all of that consolidated for monitoring.

## Appendix: Schema validation pages to spot-check

Use the Rich Results Test (https://search.google.com/test/rich-results)
against one page of each type before considering Phase 9 (Technical SEO
Verification) complete:

| Page type | Schema | Example URL |
|---|---|---|
| Homepage | `Course`, `ItemList`, `Organization` | `/` |
| Module page | `LearningResource`, `BreadcrumbList` | `/course/start-here` |
| Glossary index | `DefinedTermSet`, `BreadcrumbList` | `/glossary` |
| Glossary term | `DefinedTerm`, `BreadcrumbList` | `/glossary/roas` |
| FAQ index | `FAQPage` (10+ Q&A), `BreadcrumbList` | `/faq` |
| FAQ item | `FAQPage` (single question), `BreadcrumbList` | any `/faq/[slug]` |
| ROAS calculator | `SoftwareApplication`, `HowTo`, `BreadcrumbList` | `/tools/break-even-roas-calculator` |

If a block fails validation, the JSON-LD is generated inline per-route (not
from one shared template), so the fix is localized to that route's
`page.tsx`.
