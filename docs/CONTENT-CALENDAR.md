# First Sale Society — 12-Month SEO Content Calendar

## Months 1-3: Foundation (Launch & Index)
Priority: Get every tool, glossary, FAQ, and module page indexed. No new writing.

### Month 1
- Deploy full Next.js site with all module/glossary/FAQ/tool pages
- Submit sitemap to Google Search Console
- Verify all pages indexed
- Monitor: ROAS calculator impressions, glossary term impressions

### Month 2
- Publish first blog post: "Break-Even ROAS: Complete Guide with Examples" → /blog/break-even-roas-guide
  - Target: "break even ROAS formula" (800 US searches)
  - Internal links: → /tools/break-even-roas-calculator, → /glossary/break-even-roas, → /course/validate-the-product
- Publish: "What is ROAS? The Complete Dropshipping Definition" → /blog/what-is-roas
  - Target: "what is ROAS" (3,500 US searches)

### Month 3
- Publish: "Free Dropshipping Course 2026: Everything We Teach (And Why It's Free)" → /blog/free-dropshipping-course-2026
  - Target: "free dropshipping course" (2,900 US searches)
- Publish: "CJDropshipping Complete Guide 2026" → /blog/cjdropshipping-guide-2026
  - Target: "CJDropshipping review" (1,100 US searches)
  - Internal links: → /course/connect-your-supplier

## Months 4-6: Core Module Blog Posts
Highest-volume course topics turned into standalone blog posts.

### Month 4
- "How to Choose a Profitable Dropshipping Niche in 2026" → /blog/dropshipping-niche-selection
  - Target: "dropshipping niche selection" (3,000 US searches)
  - Internal links: → /course/pick-your-niche
- "The Complete Product Research System: Beyond Ad Spying" → /blog/dropshipping-product-research
  - Target: "how to find winning dropshipping products" (2,200 US searches)
  - Internal links: → /course/find-winning-products

### Month 5
- "The 6-Checkpoint Product Validation Framework (with Break-Even ROAS)" → /blog/product-validation-framework
  - Target: "how to validate a dropshipping product" (900 US searches)
  - Internal links: → /course/validate-the-product, → /tools/break-even-roas-calculator
- "How to Build a High-Converting Shopify Dropshipping Store" → /blog/shopify-dropshipping-store
  - Target: "how to build a Shopify dropshipping store" (2,600 US searches)
  - Internal links: → /course/build-shopify-store

### Month 6
- "Meta Ads for Dropshipping: Complete Beginner's Guide 2026" → /blog/meta-ads-dropshipping-guide
  - Target: "Facebook ads for dropshipping beginners" (4,100 US searches)
  - Internal links: → /course/pick-your-ad-angles, → /course/set-up-your-campaign
- "Sourcing Beyond CJDropshipping: When to Graduate to a Private Agent" → /blog/cj-vs-private-agents
  - Target: "when to switch from CJDropshipping" (150 US searches, KD 8 — very winnable)
  - Internal links: → /course/connect-your-supplier

## Months 7-9: Ad Operations & Creative

### Month 7
- "How to Run a CBO Campaign for Dropshipping (2026 Setup)" → /blog/cbo-campaign-setup
  - Internal links: → /course/set-up-your-campaign, → /glossary/cbo
- "Kill or Scale: The Decision Framework for Meta Ads" → /blog/kill-or-scale-framework
  - Internal links: → /course/kill-or-scale, → /tools/break-even-roas-calculator
- "Direct Response Ad Copy Templates for Dropshipping" → /blog/ad-copy-templates
  - Internal links: → /course/ad-copy

### Month 8
- "How to Read Meta Ads Data as a Beginner" → /blog/how-to-read-meta-ads-data
  - Internal links: → /course/read-your-data
- "How to Make Image Ads for Dropshipping (With AI Tools)" → /blog/image-ads-dropshipping
  - Internal links: → /course/image-ads, → /ai-ad-lab
- "Video Ad Frameworks: UGC Ads Without Hiring Creators" → /blog/ugc-video-ads-without-creators
  - Internal links: → /course/video-ads, → /ai-ad-lab

### Month 9
- "E-commerce CRO: How to Optimise Your Dropshipping Product Page" → /blog/dropshipping-cro
  - Internal links: → /course/improve-your-store-page
- "Offer Engineering: How to Increase AOV Without Changing Your Product" → /blog/offer-engineering-aov
  - Internal links: → /course/improve-your-offer
- "The 3 Email Flows Every Dropshipper Needs (With Templates)" → /blog/ecommerce-email-flows
  - Internal links: → /course/set-up-email-flows

## Months 10-12: Scale, Legal & Operations

### Month 10
- "How to Protect Your Meta Ad Account from Bans" → /blog/meta-ad-account-protection
  - Internal links: → /course/handle-ad-account-bans
- "How to Scale Facebook Ads Without Killing Performance" → /blog/scale-meta-ads
  - Internal links: → /course/scale-your-ads
- "Post-Purchase Email Automation for Dropshipping" → /blog/post-purchase-email-automation
  - Internal links: → /course/set-up-email-flows

### Month 11
- "From Dropshipping to Brand: The Transition Roadmap" → /blog/dropshipping-to-brand
  - Internal links: → /course/build-a-brand
- "Private Label from Dropshipping: When and How to Make the Move" → /blog/private-label-transition
  - Internal links: → /course/build-a-brand
- "Hiring a Virtual Assistant for Your Dropshipping Store" → /blog/hire-va-ecommerce
  - Internal links: → /course/hiring

### Month 12
- "Do I Need an LLC for Dropshipping? Legal Guide for Beginners" → /blog/llc-for-dropshipping
  - Internal links: → /course/legal-tax-business
- "Ecommerce Cash Flow: Why Profitable Stores Run Out of Money" → /blog/ecommerce-cash-flow
  - Internal links: → /course/cash-flow
- "What Is a Native Ad? Advertorial Guide for Ecommerce" → /blog/advertorial-guide-ecommerce
  - Internal links: → /course/native-ads-advertorials

---

## How to publish a post

1. Write the post and add an entry to `data/blog.ts` (slug, title, description,
   publishedAt, targetKeyword, bodyHTML) matching the `BlogPost` interface.
2. `app/blog/[slug]/page.tsx` picks it up automatically via `generateStaticParams`
   — no other code changes required.
3. Run `npm run build` to confirm the page generates and `Article`/`BlogPosting`
   schema validates via the Rich Results Test.
4. Add the new URL's internal links per the mapping above — every blog post
   should link to its corresponding course module (and the ROAS calculator,
   where relevant) within the first couple hundred words.

## Search-volume disclaimer

The volume figures above are planning estimates carried over from the
original content strategy brief, not a live keyword-tool pull. Re-verify
each target keyword's actual volume/difficulty (Google Keyword Planner,
Ahrefs, etc.) immediately before writing — don't treat these numbers as
current.
