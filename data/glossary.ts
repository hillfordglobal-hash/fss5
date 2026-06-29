// Core fields auto-generated from 09-resources.html (.gloss-page-item blocks).
// relatedTools and relatedTerms are manually maintained for cross-linking.

export interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  definitionHTML: string;
  definitionText: string;
  tag: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  /** FSS calculator slugs that directly apply this concept (links to /tools/[slug]) */
  relatedTools?: string[];
  /** Other glossary slugs that are definitionally related (cross-category links) */
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    "id": "broad-targeting",
    "slug": "broad-targeting",
    "term": "Broad Targeting",
    "definitionHTML": "<p>Running Meta ads with no interest or demographic restrictions beyond age and geography. In 2026, broad targeting almost always outperforms interest targeting because Meta's algorithm is better at finding buyers than human-specified interests.</p>\n<p class=\"why\">Why it matters: Interest targeting narrows the available audience pool, raises CPMs, and limits Meta's ability to optimize delivery. Broad targeting gives Meta the largest pool to find high-intent buyers in.</p>\n<div class=\"mistake\">Adding interest stacks to broad campaigns \"just to narrow it down a bit.\" Every restriction raises CPM and reduces the algorithm's search space. If broad isn't working, the problem is the creative — not that your targeting is too broad.</div>",
    "definitionText": "Running Meta ads with no interest or demographic restrictions beyond age and geography. In 2026, broad targeting almost always outperforms interest targeting because Meta's algorithm is better at finding buyers than human-specified interests. Why it matters: Interest targeting narrows the available audience pool, raises CPMs, and limits Meta's ability to optimize delivery. Broad targeting gives Meta the largest pool to find high-intent buyers in. Adding interest stacks to broad campaigns \"just to narrow it down a bit.\" Every restriction raises CPM and reduces the algorithm's search space. If broad isn't working, the problem is the creative — not that your targeting is too broad.",
    "tag": "Meta Ads",
    "targetKeyword": "what is broad targeting",
    "metaTitle": "What Is Broad Targeting? Dropshipping Definition — First Sale Society",
    "metaDescription": "Running Meta ads with no interest or demographic restrictions beyond age and geography. In 2026, broad targeting almost always outperforms interest…"
  },
  {
    "id": "advantage-audience",
    "slug": "advantage-audience",
    "term": "Advantage+ Audience",
    "definitionHTML": "<p>Meta's AI-driven audience expansion feature that allows the algorithm to reach beyond your defined targeting parameters when it identifies users likely to convert. In 2026, enabling Advantage+ Audience on broad targeting campaigns typically improves delivery efficiency. Distinct from Advantage+ Shopping Campaigns (ASC), which is a separate campaign type.</p>",
    "definitionText": "Meta's AI-driven audience expansion feature that allows the algorithm to reach beyond your defined targeting parameters when it identifies users likely to convert. In 2026, enabling Advantage+ Audience on broad targeting campaigns typically improves delivery efficiency. Distinct from Advantage+ Shopping Campaigns (ASC), which is a separate campaign type.",
    "tag": "Meta Ads",
    "targetKeyword": "what is advantage+ audience",
    "metaTitle": "What Is Advantage+ Audience? Dropshipping Definition — First Sale Society",
    "metaDescription": "Meta's AI-driven audience expansion feature that allows the algorithm to reach beyond your defined targeting parameters when it identifies users likely to…"
  },
  {
    "id": "learning-phase",
    "slug": "learning-phase",
    "term": "Learning Phase",
    "definitionHTML": "<p>The period (typically 7 days or 50 optimization events, whichever comes first) during which Meta's algorithm is actively building a delivery model for your campaign. During learning, costs are higher and delivery is less efficient. Editing campaigns during learning resets the clock.</p>",
    "definitionText": "The period (typically 7 days or 50 optimization events, whichever comes first) during which Meta's algorithm is actively building a delivery model for your campaign. During learning, costs are higher and delivery is less efficient. Editing campaigns during learning resets the clock.",
    "tag": "Meta Ads",
    "targetKeyword": "what is learning phase",
    "metaTitle": "What Is Learning Phase? Dropshipping Definition — First Sale Society",
    "metaDescription": "The period (typically 7 days or 50 optimization events, whichever comes first) during which Meta's algorithm is actively building a delivery model for…"
  },
  {
    "id": "frequency",
    "slug": "frequency",
    "term": "Frequency",
    "definitionHTML": "<p>The average number of times each person in your audience has seen your ad. When frequency climbs above 3–4, the same people are seeing the same creative repeatedly — which is a symptom of audience saturation and drives CPM up as delivery efficiency falls.</p>\n<p class=\"why\">Why it matters: High frequency (above 3) with declining ROAS is the clearest signal that you need fresh creative. It means you've reached most of your willing buyers and are now re-reaching people who already decided not to buy.</p>",
    "definitionText": "The average number of times each person in your audience has seen your ad. When frequency climbs above 3–4, the same people are seeing the same creative repeatedly — which is a symptom of audience saturation and drives CPM up as delivery efficiency falls. Why it matters: High frequency (above 3) with declining ROAS is the clearest signal that you need fresh creative. It means you've reached most of your willing buyers and are now re-reaching people who already decided not to buy.",
    "tag": "Meta Ads",
    "targetKeyword": "what is frequency",
    "metaTitle": "What Is Frequency? Dropshipping Definition — First Sale Society",
    "metaDescription": "The average number of times each person in your audience has seen your ad. When frequency climbs above 3–4, the same people are seeing the same creative…"
  },
  {
    "id": "midnight-launch",
    "slug": "midnight-launch",
    "term": "Midnight Launch",
    "definitionHTML": "<p>The practice of scheduling new ad campaigns to start at midnight (local or target timezone) so that Meta's algorithm has a full 24-hour data cycle on day one. Campaigns launched mid-day have their first day's data truncated, making day-1 performance less representative and day-2 comparison harder.</p>\n<p class=\"why\">Why it matters: Launching at midnight gives you clean, comparable daily data from day one. It also means your budget doesn't get partially spent in the afternoon learning phase — the entire first day's budget is used in a complete delivery cycle.</p>",
    "definitionText": "The practice of scheduling new ad campaigns to start at midnight (local or target timezone) so that Meta's algorithm has a full 24-hour data cycle on day one. Campaigns launched mid-day have their first day's data truncated, making day-1 performance less representative and day-2 comparison harder. Why it matters: Launching at midnight gives you clean, comparable daily data from day one. It also means your budget doesn't get partially spent in the afternoon learning phase — the entire first day's budget is used in a complete delivery cycle.",
    "tag": "Meta Ads",
    "targetKeyword": "what is midnight launch",
    "metaTitle": "What Is Midnight Launch? Dropshipping Definition — First Sale Society",
    "metaDescription": "The practice of scheduling new ad campaigns to start at midnight (local or target timezone) so that Meta's algorithm has a full 24-hour data cycle on day…"
  },
  {
    "id": "abo",
    "slug": "abo",
    "term": "ABO",
    "definitionHTML": "<p>Ad Set Budget Optimization. You set the budget at the individual ad set level, giving you precise control over how much each angle receives. Essential for testing phases where you need equal spend across ad sets to collect clean comparative data.</p>\n<p class=\"why\">Why it matters: Use ABO for testing (equal data per angle), CBO for scaling (Meta allocates to winners). Using CBO during testing means your top-spending angle starves every other angle of data.</p>\n<div class=\"mistake\">Running ABO when scaling. At scale, manually managing budgets across 10+ adsets is inefficient. Meta's CBO algorithm optimizes budget allocation better than you can at volume. Switch to CBO once you have proven winners.</div>",
    "definitionText": "Ad Set Budget Optimization. You set the budget at the individual ad set level, giving you precise control over how much each angle receives. Essential for testing phases where you need equal spend across ad sets to collect clean comparative data. Why it matters: Use ABO for testing (equal data per angle), CBO for scaling (Meta allocates to winners). Using CBO during testing means your top-spending angle starves every other angle of data. Running ABO when scaling. At scale, manually managing budgets across 10+ adsets is inefficient. Meta's CBO algorithm optimizes budget allocation better than you can at volume. Switch to CBO once you have proven winners.",
    "tag": "Campaign Structure",
    "targetKeyword": "what is abo",
    "metaTitle": "What Is ABO? Dropshipping Definition — First Sale Society",
    "metaDescription": "Ad Set Budget Optimization. You set the budget at the individual ad set level, giving you precise control over how much each angle receives. Essential for…"
  },
  {
    "id": "cbo",
    "slug": "cbo",
    "term": "CBO",
    "definitionHTML": "<p>Campaign Budget Optimization. You set the budget at the campaign level; Meta allocates it across adsets automatically toward whichever is converting. Efficient for scaling but problematic for testing — one adset will eat all the spend and starve your other angles of data.</p>\n<p class=\"why\">Why it matters: CBO is the right tool for scaling proven winners. ABO is the right tool for testing new angles. Confusing them costs real money — either through inefficient scaling or through data-starved testing.</p>\n<div class=\"mistake\">Running CBO for initial product testing. Your top-spending angle steals the budget, starving every other angle. You end up with one over-tested angle and four data-starved ones — and you call it a \"full test.\"</div>",
    "definitionText": "Campaign Budget Optimization. You set the budget at the campaign level; Meta allocates it across adsets automatically toward whichever is converting. Efficient for scaling but problematic for testing — one adset will eat all the spend and starve your other angles of data. Why it matters: CBO is the right tool for scaling proven winners. ABO is the right tool for testing new angles. Confusing them costs real money — either through inefficient scaling or through data-starved testing. Running CBO for initial product testing. Your top-spending angle steals the budget, starving every other angle. You end up with one over-tested angle and four data-starved ones — and you call it a \"full test.\"",
    "tag": "Campaign Structure",
    "targetKeyword": "what is cbo",
    "metaTitle": "What Is CBO? Dropshipping Definition — First Sale Society",
    "metaDescription": "Campaign Budget Optimization. You set the budget at the campaign level; Meta allocates it across adsets automatically toward whichever is converting.…"
  },
  {
    "id": "cpa",
    "slug": "cpa",
    "term": "CPA",
    "definitionHTML": "<p>Cost Per Acquisition (per purchase). Total spend ÷ number of purchases. Your target CPA = your gross profit per order — the maximum you can pay per sale and break even. Your actual CPA should be compared to your target CPA, not to industry benchmarks.</p>\n<p class=\"why\">Why it matters: Every kill/scale decision is ultimately a CPA decision. Is your actual CPA below, at, or above your target CPA? That's the only question that matters for scaling.</p>\n<div class=\"mistake\">Using industry average CPA benchmarks as your target. \"The average CPA in my niche is $35\" is irrelevant. Your target CPA is your gross profit per order. A $20 gross profit product targeting a $35 CPA is a loss machine.</div>",
    "definitionText": "Cost Per Acquisition (per purchase). Total spend ÷ number of purchases. Your target CPA = your gross profit per order — the maximum you can pay per sale and break even. Your actual CPA should be compared to your target CPA, not to industry benchmarks. Why it matters: Every kill/scale decision is ultimately a CPA decision. Is your actual CPA below, at, or above your target CPA? That's the only question that matters for scaling. Using industry average CPA benchmarks as your target. \"The average CPA in my niche is $35\" is irrelevant. Your target CPA is your gross profit per order. A $20 gross profit product targeting a $35 CPA is a loss machine.",
    "tag": "Metrics",
    "targetKeyword": "what is cpa",
    "metaTitle": "What Is CPA? Dropshipping Definition — First Sale Society",
    "metaDescription": "Cost Per Acquisition (per purchase). Total spend ÷ number of purchases. Your target CPA = your gross profit per order — the maximum you can pay per sale…"
,
    "relatedTools": ["break-even-cpa-calculator", "break-even-roas-calculator"],
    "relatedTerms": ["roas", "cac", "mer", "break-even-roas"]
  },
  {
    "id": "cpm",
    "slug": "cpm",
    "term": "CPM",
    "definitionHTML": "<p>Cost Per Mille — what you pay Meta to show your ad to 1,000 people. Driven by niche, audience size, creative quality score, time of year (CPMs spike 40–100% during Q4/Black Friday), and advertiser competition for the same audience.</p>\n<p class=\"why\">Why it matters: CPM is the foundational cost of all your other metrics. High CPM means higher CPC, higher CPA, and a thinner margin. Your break-even math changes completely between a $15 CPM and a $60 CPM niche.</p>\n<div class=\"mistake\">Celebrating low CPM without checking conversion rate. A $9 CPM reaching the wrong audience produces a $200 CPA. A $45 CPM reaching the right buyer intent produces a $30 CPA. CPM without CVR context is meaningless.</div>",
    "definitionText": "Cost Per Mille — what you pay Meta to show your ad to 1,000 people. Driven by niche, audience size, creative quality score, time of year (CPMs spike 40–100% during Q4/Black Friday), and advertiser competition for the same audience. Why it matters: CPM is the foundational cost of all your other metrics. High CPM means higher CPC, higher CPA, and a thinner margin. Your break-even math changes completely between a $15 CPM and a $60 CPM niche. Celebrating low CPM without checking conversion rate. A $9 CPM reaching the wrong audience produces a $200 CPA. A $45 CPM reaching the right buyer intent produces a $30 CPA. CPM without CVR context is meaningless.",
    "tag": "Metrics",
    "targetKeyword": "what is cpm",
    "metaTitle": "What Is CPM? Dropshipping Definition — First Sale Society",
    "metaDescription": "Cost Per Mille — what you pay Meta to show your ad to 1,000 people. Driven by niche, audience size, creative quality score, time of year (CPMs spike…"
,
    "relatedTools": ["cpm-calculator"],
    "relatedTerms": ["ctr-link", "roas", "hook-rate"]
  },
  {
    "id": "ctr-link",
    "slug": "ctr-link",
    "term": "CTR (Link)",
    "definitionHTML": "<p>Link Click-Through Rate. Percentage of people who saw your ad and clicked the link to your store. Below 0.5% after $30 spend = creative or hook problem. 0.8–2% is normal. Above 2% is strong. Always use Link CTR, not \"All CTR\" — the latter includes clicks on your profile, video plays, and reactions.</p>\n<p class=\"why\">Why it matters: CTR is the bridge between your creative's ability to stop the scroll and your store's ability to convert. Low CTR = fix the creative. Good CTR + low CVR = fix the store or offer.</p>\n<div class=\"mistake\">Optimizing for CTR as a success metric instead of as a diagnostic tool. The goal is profitable purchases, not clicks. A high CTR that doesn't lead to purchases just means you're paying for expensive curiosity.</div>",
    "definitionText": "Link Click-Through Rate. Percentage of people who saw your ad and clicked the link to your store. Below 0.5% after $30 spend = creative or hook problem. 0.8–2% is normal. Above 2% is strong. Always use Link CTR, not \"All CTR\" — the latter includes clicks on your profile, video plays, and reactions. Why it matters: CTR is the bridge between your creative's ability to stop the scroll and your store's ability to convert. Low CTR = fix the creative. Good CTR + low CVR = fix the store or offer. Optimizing for CTR as a success metric instead of as a diagnostic tool. The goal is profitable purchases, not clicks. A high CTR that doesn't lead to purchases just means you're paying for expensive curiosity.",
    "tag": "Metrics",
    "targetKeyword": "what is ctr (link)",
    "metaTitle": "What Is CTR (Link)? Dropshipping Definition — First Sale Society",
    "metaDescription": "Link Click-Through Rate. Percentage of people who saw your ad and clicked the link to your store. Below 0.5% after $30 spend = creative or hook problem.…"
,
    "relatedTools": ["cpm-calculator"],
    "relatedTerms": ["cpm", "hook-rate", "cvr"]
  },
  {
    "id": "cvr",
    "slug": "cvr",
    "term": "CVR",
    "definitionHTML": "<p>Conversion Rate. Percentage of store visitors who complete a purchase. Below 1% is concerning (industry average is 1.5–2.5% for ecom). Above 3% is strong for cold paid traffic. CVR fluctuates heavily at low volume — requires 200+ sessions before it's statistically meaningful.</p>\n<p class=\"why\">Why it matters: CVR is the multiplier on all your ad spend. Doubling CVR from 1% to 2% halves your effective CPA without touching your campaigns. It's often easier to improve CVR than to improve ROAS.</p>\n<div class=\"mistake\">Panic-changing a store after 2 days of low CVR at 30 daily sessions. With small sample sizes, variance alone can explain dramatic CVR swings. Measure CVR over at least 200 sessions before making page changes.</div>",
    "definitionText": "Conversion Rate. Percentage of store visitors who complete a purchase. Below 1% is concerning (industry average is 1.5–2.5% for ecom). Above 3% is strong for cold paid traffic. CVR fluctuates heavily at low volume — requires 200+ sessions before it's statistically meaningful. Why it matters: CVR is the multiplier on all your ad spend. Doubling CVR from 1% to 2% halves your effective CPA without touching your campaigns. It's often easier to improve CVR than to improve ROAS. Panic-changing a store after 2 days of low CVR at 30 daily sessions. With small sample sizes, variance alone can explain dramatic CVR swings. Measure CVR over at least 200 sessions before making page changes.",
    "tag": "Metrics",
    "targetKeyword": "what is cvr",
    "metaTitle": "What Is CVR? Dropshipping Definition — First Sale Society",
    "metaDescription": "Conversion Rate. Percentage of store visitors who complete a purchase. Below 1% is concerning (industry average is 1.5–2.5% for ecom). Above 3% is strong…"
,
    "relatedTools": ["conversion-rate-calculator"],
    "relatedTerms": ["atc-rate", "cpa", "roas"]
  },
  {
    "id": "atc-rate",
    "slug": "atc-rate",
    "term": "ATC Rate",
    "definitionHTML": "<p>Add-to-Cart Rate. Percentage of store visitors who add a product to their cart. Below 3% indicates a product page or offer problem. 5–8% is acceptable. Above 8% suggests strong offer-product fit and a well-converting page.</p>\n<p class=\"why\">Why it matters: ATC rate is your clearest signal of product page and offer strength. High ATC with low purchase rate = checkout friction problem. Low ATC = the product page isn't convincing visitors the product is worth buying.</p>\n<div class=\"mistake\">Treating ATC as a success metric rather than a diagnostic. ATCs without purchases are a warning signal, not a win. The goal is purchases — ATC is a step in the funnel, not the destination.</div>",
    "definitionText": "Add-to-Cart Rate. Percentage of store visitors who add a product to their cart. Below 3% indicates a product page or offer problem. 5–8% is acceptable. Above 8% suggests strong offer-product fit and a well-converting page. Why it matters: ATC rate is your clearest signal of product page and offer strength. High ATC with low purchase rate = checkout friction problem. Low ATC = the product page isn't convincing visitors the product is worth buying. Treating ATC as a success metric rather than a diagnostic. ATCs without purchases are a warning signal, not a win. The goal is purchases — ATC is a step in the funnel, not the destination.",
    "tag": "Metrics",
    "targetKeyword": "what is atc rate",
    "metaTitle": "What Is ATC Rate? Dropshipping Definition — First Sale Society",
    "metaDescription": "Add-to-Cart Rate. Percentage of store visitors who add a product to their cart. Below 3% indicates a product page or offer problem. 5–8% is acceptable.…"
,
    "relatedTools": ["conversion-rate-calculator"],
    "relatedTerms": ["cvr", "cpa"]
  },
  {
    "id": "aov",
    "slug": "aov",
    "term": "AOV",
    "definitionHTML": "<p>Average Order Value. Total revenue ÷ number of orders. Increase with bundles, upsells, and order bumps. Every $10 increase in AOV at 100 daily orders = $1,000/day in additional revenue at zero additional ad spend.</p>\n<p class=\"why\">Why it matters: When you're at break-even ROAS, a 30% AOV increase can take you from break-even to 1.3× profitable without touching your campaigns. AOV engineering is often easier than ROAS improvement.</p>\n<div class=\"mistake\">Focusing exclusively on AOV and ignoring LTV. Bundles and upsells improve AOV, but post-purchase sequences and product line extensions build LTV — which is where brands separate from dropshippers.</div>",
    "definitionText": "Average Order Value. Total revenue ÷ number of orders. Increase with bundles, upsells, and order bumps. Every $10 increase in AOV at 100 daily orders = $1,000/day in additional revenue at zero additional ad spend. Why it matters: When you're at break-even ROAS, a 30% AOV increase can take you from break-even to 1.3× profitable without touching your campaigns. AOV engineering is often easier than ROAS improvement. Focusing exclusively on AOV and ignoring LTV. Bundles and upsells improve AOV, but post-purchase sequences and product line extensions build LTV — which is where brands separate from dropshippers.",
    "tag": "Metrics",
    "targetKeyword": "what is aov",
    "metaTitle": "What Is AOV? Dropshipping Definition — First Sale Society",
    "metaDescription": "Average Order Value. Total revenue ÷ number of orders. Increase with bundles, upsells, and order bumps. Every $10 increase in AOV at 100 daily orders =…"
,
    "relatedTools": ["average-order-value-calculator", "dropshipping-scaling-calculator"],
    "relatedTerms": ["ltv", "cac", "break-even-roas"]
  },
  {
    "id": "hook-rate",
    "slug": "hook-rate",
    "term": "Hook Rate",
    "definitionHTML": "<p>Percentage of people who watch the first 3 seconds of your video ad vs. all who saw it. Above 30–35% is considered good; above 50% is excellent. Measures whether your opening frames stop the scroll.</p>",
    "definitionText": "Percentage of people who watch the first 3 seconds of your video ad vs. all who saw it. Above 30–35% is considered good; above 50% is excellent. Measures whether your opening frames stop the scroll.",
    "tag": "Metrics",
    "targetKeyword": "what is hook rate",
    "metaTitle": "What Is Hook Rate? Dropshipping Definition — First Sale Society",
    "metaDescription": "Percentage of people who watch the first 3 seconds of your video ad vs. all who saw it. Above 30–35% is considered good; above 50% is excellent. Measures…"
,
    "relatedTools": ["cpm-calculator"],
    "relatedTerms": ["thumb-stop-ratio", "ctr-link", "creative-fatigue"]
  },
  {
    "id": "thumb-stop-ratio",
    "slug": "thumb-stop-ratio",
    "term": "Thumb-Stop Ratio",
    "definitionHTML": "<p>Identical to Hook Rate — the percentage of people who pause scrolling on your video (measured as 3-second video views ÷ impressions). Sometimes reported as \"ThruPlay\" percentage or \"3-Second Video Views\" in Ads Manager. A hook that doesn't generate at least 25–30% thumb-stop rate is failing before anyone hears your message.</p>",
    "definitionText": "Identical to Hook Rate — the percentage of people who pause scrolling on your video (measured as 3-second video views ÷ impressions). Sometimes reported as \"ThruPlay\" percentage or \"3-Second Video Views\" in Ads Manager. A hook that doesn't generate at least 25–30% thumb-stop rate is failing before anyone hears your message.",
    "tag": "Metrics",
    "targetKeyword": "what is thumb-stop ratio",
    "metaTitle": "What Is Thumb-Stop Ratio? Dropshipping Definition — First Sale Society",
    "metaDescription": "Identical to Hook Rate — the percentage of people who pause scrolling on your video (measured as 3-second video views ÷ impressions). Sometimes reported…"
  },
  {
    "id": "desire-vs-angle",
    "slug": "desire-vs-angle",
    "term": "Desire vs. Angle",
    "definitionHTML": "<p>A <strong>desire</strong> is the underlying outcome your customer wants (e.g., \"to sleep without back pain\"). An <strong>angle</strong> is the specific creative framing used to address that desire (e.g., \"doctor dismissed me\" vs. \"failed surgery\" vs. \"can't play with my kids\"). One desire can have 10+ viable angles.</p>\n<p class=\"why\">Why it matters: Testing one desire with one angle is not a real product test. You've tested one framing, not one product. Operators who \"test 3 products and get no results\" are almost always testing 3 ads with the same angle — not 3 different desires.</p>\n<div class=\"mistake\">Treating multiple visual variations of the same script as \"testing different angles.\" Changing the background color or the actor is not a new angle. A new angle = a new psychological entry point into the same desire.</div>",
    "definitionText": "A desire is the underlying outcome your customer wants (e.g., \"to sleep without back pain\"). An angle is the specific creative framing used to address that desire (e.g., \"doctor dismissed me\" vs. \"failed surgery\" vs. \"can't play with my kids\"). One desire can have 10+ viable angles. Why it matters: Testing one desire with one angle is not a real product test. You've tested one framing, not one product. Operators who \"test 3 products and get no results\" are almost always testing 3 ads with the same angle — not 3 different desires. Treating multiple visual variations of the same script as \"testing different angles.\" Changing the background color or the actor is not a new angle. A new angle = a new psychological entry point into the same desire.",
    "tag": "Creative",
    "targetKeyword": "what is desire vs. angle",
    "metaTitle": "What Is Desire vs. Angle? Dropshipping Definition — First Sale Society",
    "metaDescription": "A desire is the underlying outcome your customer wants (e.g., \"to sleep without back pain\"). An angle is the specific creative framing used to address…"
  },
  {
    "id": "native-creative",
    "slug": "native-creative",
    "term": "Native Creative",
    "definitionHTML": "<p>Ad content — whether AI-generated or filmed — that blends naturally with the organic social feed. The defining quality is that it does not immediately signal \"advertisement\" before the viewer has absorbed the hook.</p>",
    "definitionText": "Ad content — whether AI-generated or filmed — that blends naturally with the organic social feed. The defining quality is that it does not immediately signal \"advertisement\" before the viewer has absorbed the hook.",
    "tag": "Creative",
    "targetKeyword": "what is native creative",
    "metaTitle": "What Is Native Creative? Dropshipping Definition — First Sale Society",
    "metaDescription": "Ad content — whether AI-generated or filmed — that blends naturally with the organic social feed. The defining quality is that it does not immediately…"
  },
  {
    "id": "ugly-winner",
    "slug": "ugly-winner",
    "term": "Ugly Winner",
    "definitionHTML": "<p>A creative that performs significantly better than polished, well-produced alternatives despite looking rough, unedited, or technically imperfect. Common form: a lo-fi phone video, a screen recording, a text-heavy static image. Often outperforms studio-quality content because it doesn't pattern-match as an ad.</p>\n<p class=\"why\">Why it matters: Operators frequently kill their best-performing creatives for aesthetic reasons. If an ugly creative is converting, its ugliness is irrelevant — the data is what matters.</p>\n<div class=\"mistake\">Pausing or replacing a winning creative because it doesn't look professional. ROAS doesn't care about production value. If the ugly ad is working at scale, run more variations of it — don't \"improve\" it aesthetically and kill your winner.</div>",
    "definitionText": "A creative that performs significantly better than polished, well-produced alternatives despite looking rough, unedited, or technically imperfect. Common form: a lo-fi phone video, a screen recording, a text-heavy static image. Often outperforms studio-quality content because it doesn't pattern-match as an ad. Why it matters: Operators frequently kill their best-performing creatives for aesthetic reasons. If an ugly creative is converting, its ugliness is irrelevant — the data is what matters. Pausing or replacing a winning creative because it doesn't look professional. ROAS doesn't care about production value. If the ugly ad is working at scale, run more variations of it — don't \"improve\" it aesthetically and kill your winner.",
    "tag": "Creative",
    "targetKeyword": "what is ugly winner",
    "metaTitle": "What Is Ugly Winner? Dropshipping Definition — First Sale Society",
    "metaDescription": "A creative that performs significantly better than polished, well-produced alternatives despite looking rough, unedited, or technically imperfect. Common…"
  },
  {
    "id": "creative-brief",
    "slug": "creative-brief",
    "term": "Creative Brief",
    "definitionHTML": "<p>A document given to video editors or AI generation tools that specifies the hook, the problem to address, the product angle, the key benefit, the call to action, and visual requirements for an ad. The quality of the brief is the primary determinant of creative output quality — a weak brief produces weak creative regardless of the creator's technical skill.</p>\n<div class=\"mistake\">Sending a creator your product link and a vague direction (\"make something authentic\"). A proper brief includes: (1) exact persona, (2) verbatim first 3-second hook, (3) specific pain narrative, (4) product mechanism, (5) the outcome/transformation, (6) the CTA. Without these six elements, you get generic content that performs generically.</div>",
    "definitionText": "A document given to video editors or AI generation tools that specifies the hook, the problem to address, the product angle, the key benefit, the call to action, and visual requirements for an ad. The quality of the brief is the primary determinant of creative output quality — a weak brief produces weak creative regardless of the creator's technical skill. Sending a creator your product link and a vague direction (\"make something authentic\"). A proper brief includes: (1) exact persona, (2) verbatim first 3-second hook, (3) specific pain narrative, (4) product mechanism, (5) the outcome/transformation, (6) the CTA. Without these six elements, you get generic content that performs generically.",
    "tag": "Creative",
    "targetKeyword": "what is creative brief",
    "metaTitle": "What Is Creative Brief? Dropshipping Definition — First Sale Society",
    "metaDescription": "A document given to video editors or AI generation tools that specifies the hook, the problem to address, the product angle, the key benefit, the call to…"
  },
  {
    "id": "vsl",
    "slug": "vsl",
    "term": "VSL",
    "definitionHTML": "<p>Video Sales Letter. A longer-form ad (typically 2–5 minutes) that builds a full case for the product: problem establishment, failed alternatives, the solution, social proof, and offer with urgency. More effective than short-form ads for higher-ticket products ($75+) where the purchase decision requires more information.</p>\n<p class=\"why\">Why it matters: At lower price points, a 30-second hook-driven ad usually outperforms a VSL. At $80+, buyers want more context before committing.</p>\n<div class=\"mistake\">Using VSL format for impulse-buy products. A 3-minute video before a $19 purchase creates friction, not conviction.</div>",
    "definitionText": "Video Sales Letter. A longer-form ad (typically 2–5 minutes) that builds a full case for the product: problem establishment, failed alternatives, the solution, social proof, and offer with urgency. More effective than short-form ads for higher-ticket products ($75+) where the purchase decision requires more information. Why it matters: At lower price points, a 30-second hook-driven ad usually outperforms a VSL. At $80+, buyers want more context before committing. Using VSL format for impulse-buy products. A 3-minute video before a $19 purchase creates friction, not conviction.",
    "tag": "Creative",
    "targetKeyword": "what is vsl",
    "metaTitle": "What Is VSL? Dropshipping Definition — First Sale Society",
    "metaDescription": "Video Sales Letter. A longer-form ad (typically 2–5 minutes) that builds a full case for the product: problem establishment, failed alternatives, the…"
  },
  {
    "id": "creative-fatigue",
    "slug": "creative-fatigue",
    "term": "Creative Fatigue",
    "definitionHTML": "<p>The performance degradation that occurs when the same creative has been shown to your audience enough times that the remaining audience has mostly already decided whether to buy. Symptoms: rising CPM, declining CTR, rising CPA, despite no changes to targeting or budget.</p>\n<p class=\"why\">Why it matters: Most operators interpret creative fatigue as a product problem when it's actually a creative rotation problem. The product is fine — the creative has reached saturation.</p>\n<div class=\"mistake\">Trying to fix creative fatigue by increasing budget. More budget accelerates fatigue. The fix is fresh creative with new angles, hooks, and visual formats.</div>",
    "definitionText": "The performance degradation that occurs when the same creative has been shown to your audience enough times that the remaining audience has mostly already decided whether to buy. Symptoms: rising CPM, declining CTR, rising CPA, despite no changes to targeting or budget. Why it matters: Most operators interpret creative fatigue as a product problem when it's actually a creative rotation problem. The product is fine — the creative has reached saturation. Trying to fix creative fatigue by increasing budget. More budget accelerates fatigue. The fix is fresh creative with new angles, hooks, and visual formats.",
    "tag": "Creative",
    "targetKeyword": "what is creative fatigue",
    "metaTitle": "What Is Creative Fatigue? Dropshipping Definition — First Sale Society",
    "metaDescription": "The performance degradation that occurs when the same creative has been shown to your audience enough times that the remaining audience has mostly already…"
  },
  {
    "id": "angle-saturation",
    "slug": "angle-saturation",
    "term": "Angle Saturation",
    "definitionHTML": "<p>When a specific creative angle (pain point framing, persona, product positioning) has been run by so many advertisers that the target audience is desensitized to it. The audience has seen the same hook, the same problem setup, and the same type of solution enough times that it no longer generates response.</p>\n<p class=\"why\">Why it matters: Angle saturation is the most common reason a previously profitable product stops converting — not algorithm changes, not increased competition on CPMs. The product may still work; the angle is exhausted.</p>\n<div class=\"mistake\">Attributing ROAS decline to \"the algorithm\" without checking the Meta Ad Library for competitor saturation. Search your product category. If 100+ advertisers are running the same angle, you need a genuinely novel one.</div>",
    "definitionText": "When a specific creative angle (pain point framing, persona, product positioning) has been run by so many advertisers that the target audience is desensitized to it. The audience has seen the same hook, the same problem setup, and the same type of solution enough times that it no longer generates response. Why it matters: Angle saturation is the most common reason a previously profitable product stops converting — not algorithm changes, not increased competition on CPMs. The product may still work; the angle is exhausted. Attributing ROAS decline to \"the algorithm\" without checking the Meta Ad Library for competitor saturation. Search your product category. If 100+ advertisers are running the same angle, you need a genuinely novel one.",
    "tag": "Creative",
    "targetKeyword": "what is angle saturation",
    "metaTitle": "What Is Angle Saturation? Dropshipping Definition — First Sale Society",
    "metaDescription": "When a specific creative angle (pain point framing, persona, product positioning) has been run by so many advertisers that the target audience is…"
  },
  {
    "id": "winning-angle-isolation",
    "slug": "winning-angle-isolation",
    "term": "Winning Angle Isolation",
    "definitionHTML": "<p>The process of identifying which specific angle in a multi-angle creative test generated the winning performance signal — and then doubling production exclusively on variations of that winning angle.</p>\n<div class=\"mistake\">Producing more creatives in the same format as the winner without isolating why it won. If your winning creative used a \"failed alternatives\" angle for a 45-year-old woman avatar, produce 10 more variations of that specific angle-persona combination — not 10 random variations.</div>",
    "definitionText": "The process of identifying which specific angle in a multi-angle creative test generated the winning performance signal — and then doubling production exclusively on variations of that winning angle. Producing more creatives in the same format as the winner without isolating why it won. If your winning creative used a \"failed alternatives\" angle for a 45-year-old woman avatar, produce 10 more variations of that specific angle-persona combination — not 10 random variations.",
    "tag": "Creative",
    "targetKeyword": "what is winning angle isolation",
    "metaTitle": "What Is Winning Angle Isolation? Dropshipping Definition — First Sale Society",
    "metaDescription": "The process of identifying which specific angle in a multi-angle creative test generated the winning performance signal — and then doubling production…"
  },
  {
    "id": "break-even-roas",
    "slug": "break-even-roas",
    "term": "Break-Even ROAS",
    "definitionHTML": "<p>The ROAS (return on ad spend) at which your revenue exactly covers your ad spend plus COGS. Below this number you're losing money. Above it, you're profitable. Formula: Selling Price ÷ (Selling Price − COGS − Fees) = Break-Even ROAS.</p>\n<p class=\"why\">Why it matters: Every kill/scale decision depends on comparing your actual ROAS to your break-even ROAS. Without knowing your number, you're flying blind.</p>\n<div class=\"mistake\">Running ads for weeks without calculating this first. Multiple operators in real data discovered they'd been losing $50/sale only after tracking it properly. Calculate it before you spend a dollar on ads.</div>",
    "definitionText": "The ROAS (return on ad spend) at which your revenue exactly covers your ad spend plus COGS. Below this number you're losing money. Above it, you're profitable. Formula: Selling Price ÷ (Selling Price − COGS − Fees) = Break-Even ROAS. Why it matters: Every kill/scale decision depends on comparing your actual ROAS to your break-even ROAS. Without knowing your number, you're flying blind. Running ads for weeks without calculating this first. Multiple operators in real data discovered they'd been losing $50/sale only after tracking it properly. Calculate it before you spend a dollar on ads.",
    "tag": "Finance",
    "targetKeyword": "what is break-even roas",
    "metaTitle": "What Is Break-Even ROAS? Dropshipping Definition — First Sale Society",
    "metaDescription": "The ROAS (return on ad spend) at which your revenue exactly covers your ad spend plus COGS. Below this number you're losing money. Above it, you're…"
,
    "relatedTools": ["break-even-roas-calculator", "profit-margin-calculator"],
    "relatedTerms": ["roas", "cpa", "cogs", "mer"]
  },
  {
    "id": "roas",
    "slug": "roas",
    "term": "ROAS",
    "definitionHTML": "<p>Return on Ad Spend. Revenue ÷ Ad Spend. A 2× ROAS means you earned $2 in revenue for every $1 spent on ads. Your break-even ROAS = Selling Price ÷ Gross Profit. Every scaling decision is relative to YOUR break-even ROAS, not a generic \"2× or 3× benchmark.\"</p>",
    "definitionText": "Return on Ad Spend. Revenue ÷ Ad Spend. A 2× ROAS means you earned $2 in revenue for every $1 spent on ads. Your break-even ROAS = Selling Price ÷ Gross Profit. Every scaling decision is relative to YOUR break-even ROAS, not a generic \"2× or 3× benchmark.\"",
    "tag": "Finance",
    "targetKeyword": "what is roas",
    "metaTitle": "What Is ROAS? Dropshipping Definition — First Sale Society",
    "metaDescription": "Return on Ad Spend. Revenue ÷ Ad Spend. A 2× ROAS means you earned $2 in revenue for every $1 spent on ads. Your break-even ROAS = Selling Price ÷ Gross…"
,
    "relatedTools": ["target-roas-calculator", "break-even-roas-calculator", "dropshipping-profit-calculator"],
    "relatedTerms": ["break-even-roas", "mer", "cpa", "cac"]
  },
  {
    "id": "mer",
    "slug": "mer",
    "term": "MER",
    "definitionHTML": "<p>Marketing Efficiency Ratio. Total revenue ÷ total ad spend across ALL channels. More accurate than ROAS because it accounts for email revenue, organic, SMS, and repeat buyers — not just the last ad clicked. A business with a 2.5× MER may show a 4× Meta ROAS because email is recovering 30% of revenue at near-zero cost.</p>\n<div class=\"mistake\">Optimizing Meta ROAS in isolation once you have multiple revenue channels. A campaign may look unprofitable in Ads Manager but be driving email list signups that convert at 3× through your Klaviyo flows. MER catches this; platform ROAS doesn't.</div>",
    "definitionText": "Marketing Efficiency Ratio. Total revenue ÷ total ad spend across ALL channels. More accurate than ROAS because it accounts for email revenue, organic, SMS, and repeat buyers — not just the last ad clicked. A business with a 2.5× MER may show a 4× Meta ROAS because email is recovering 30% of revenue at near-zero cost. Optimizing Meta ROAS in isolation once you have multiple revenue channels. A campaign may look unprofitable in Ads Manager but be driving email list signups that convert at 3× through your Klaviyo flows. MER catches this; platform ROAS doesn't.",
    "tag": "Finance",
    "targetKeyword": "what is mer",
    "metaTitle": "What Is MER? Dropshipping Definition — First Sale Society",
    "metaDescription": "Marketing Efficiency Ratio. Total revenue ÷ total ad spend across ALL channels. More accurate than ROAS because it accounts for email revenue, organic,…"
,
    "relatedTools": ["mer-calculator", "target-roas-calculator"],
    "relatedTerms": ["roas", "cpa", "ltv"]
  },
  {
    "id": "cogs",
    "slug": "cogs",
    "term": "COGS",
    "definitionHTML": "<p>Cost of Goods Sold. The direct cost of producing or acquiring each unit sold: product cost + shipping cost + payment processing fees. Does not include ad spend, which is a marketing cost. Your gross margin = Revenue − COGS. Your net margin = Gross Margin − Ad Spend − Fixed Costs.</p>",
    "definitionText": "Cost of Goods Sold. The direct cost of producing or acquiring each unit sold: product cost + shipping cost + payment processing fees. Does not include ad spend, which is a marketing cost. Your gross margin = Revenue − COGS. Your net margin = Gross Margin − Ad Spend − Fixed Costs.",
    "tag": "Finance",
    "targetKeyword": "what is cogs",
    "metaTitle": "What Is COGS? Dropshipping Definition — First Sale Society",
    "metaDescription": "Cost of Goods Sold. The direct cost of producing or acquiring each unit sold: product cost + shipping cost + payment processing fees. Does not include ad…"
,
    "relatedTools": ["profit-margin-calculator", "dropshipping-profit-calculator", "product-pricing-calculator"],
    "relatedTerms": ["break-even-roas", "roas", "cash-float"]
  },
  {
    "id": "cac",
    "slug": "cac",
    "term": "CAC",
    "definitionHTML": "<p>Customer Acquisition Cost. Total ad spend ÷ total customers acquired. Different from CPA in that CAC accounts for all acquisition costs (ad spend, creative production, agency fees) not just ad spend alone. At scale, true CAC is always higher than platform-reported CPA.</p>",
    "definitionText": "Customer Acquisition Cost. Total ad spend ÷ total customers acquired. Different from CPA in that CAC accounts for all acquisition costs (ad spend, creative production, agency fees) not just ad spend alone. At scale, true CAC is always higher than platform-reported CPA.",
    "tag": "Finance",
    "targetKeyword": "what is cac",
    "metaTitle": "What Is CAC? Dropshipping Definition — First Sale Society",
    "metaDescription": "Customer Acquisition Cost. Total ad spend ÷ total customers acquired. Different from CPA in that CAC accounts for all acquisition costs (ad spend,…"
,
    "relatedTools": ["break-even-cpa-calculator", "customer-lifetime-value-calculator"],
    "relatedTerms": ["cpa", "ltv", "roas"]
  },
  {
    "id": "ltv",
    "slug": "ltv",
    "term": "LTV",
    "definitionHTML": "<p>Lifetime Value. Total revenue a customer generates across all purchases — tracked over 30, 60, 90, 180 days. Most dropshippers track AOV but ignore LTV, limiting them to single-transaction math that understates the real value of each customer.</p>",
    "definitionText": "Lifetime Value. Total revenue a customer generates across all purchases — tracked over 30, 60, 90, 180 days. Most dropshippers track AOV but ignore LTV, limiting them to single-transaction math that understates the real value of each customer.",
    "tag": "Finance",
    "targetKeyword": "what is ltv",
    "metaTitle": "What Is LTV? Dropshipping Definition — First Sale Society",
    "metaDescription": "Lifetime Value. Total revenue a customer generates across all purchases — tracked over 30, 60, 90, 180 days. Most dropshippers track AOV but ignore LTV,…"
,
    "relatedTools": ["customer-lifetime-value-calculator"],
    "relatedTerms": ["aov", "cac", "mer"]
  },
  {
    "id": "cash-float",
    "slug": "cash-float",
    "term": "Cash Float",
    "definitionHTML": "<p>The gap between when you pay for ads (Meta charges your card every 24–48 hours or at billing threshold) and when Shopify pays you (net-14 to net-30 depending on account age). At $1,000/day in ad spend and a 30-day Shopify payout schedule, you need $30,000 in cash float to sustain operations without credit.</p>\n<p class=\"why\">Why it matters: Many profitable operators run out of cash to scale because they don't account for the float gap. A business generating $10,000/month in profit can still stall if it can't fund the 30-day window between ad spend and revenue receipt.</p>\n<div class=\"mistake\">Scaling rapidly using a debit card without any credit float. Business credit cards (Amex Blue Business Plus, Chase Ink) give you the billing cycle buffer needed to scale without hitting your cash wall.</div>",
    "definitionText": "The gap between when you pay for ads (Meta charges your card every 24–48 hours or at billing threshold) and when Shopify pays you (net-14 to net-30 depending on account age). At $1,000/day in ad spend and a 30-day Shopify payout schedule, you need $30,000 in cash float to sustain operations without credit. Why it matters: Many profitable operators run out of cash to scale because they don't account for the float gap. A business generating $10,000/month in profit can still stall if it can't fund the 30-day window between ad spend and revenue receipt. Scaling rapidly using a debit card without any credit float. Business credit cards (Amex Blue Business Plus, Chase Ink) give you the billing cycle buffer needed to scale without hitting your cash wall.",
    "tag": "Finance",
    "targetKeyword": "what is cash float",
    "metaTitle": "What Is Cash Float? Dropshipping Definition — First Sale Society",
    "metaDescription": "The gap between when you pay for ads (Meta charges your card every 24–48 hours or at billing threshold) and when Shopify pays you (net-14 to net-30…"
,
    "relatedTools": ["ecommerce-cash-flow-calculator"],
    "relatedTerms": ["cogs", "ltv"]
  },
  {
    "id": "sunk-cost-fallacy",
    "slug": "sunk-cost-fallacy",
    "term": "Sunk Cost Fallacy",
    "definitionHTML": "<p>Continuing to invest in a failing product test because of money already spent — \"I've put $400 into this, I can't quit now.\" The correct decision framework only looks at expected future returns, not past losses.</p>\n<p class=\"why\">Why it matters: The sunk cost fallacy is responsible for more sustained losses in ecom testing than any single tactical mistake. It causes operators to spend $300 validating a product that failed its $200 evaluation threshold.</p>\n<div class=\"mistake\">Framing kill decisions as \"wasting what I've already spent.\" The correct framing: \"Given what I now know, is additional investment likely to be profitable?\" If no — kill. The past spend is gone either way.</div>",
    "definitionText": "Continuing to invest in a failing product test because of money already spent — \"I've put $400 into this, I can't quit now.\" The correct decision framework only looks at expected future returns, not past losses. Why it matters: The sunk cost fallacy is responsible for more sustained losses in ecom testing than any single tactical mistake. It causes operators to spend $300 validating a product that failed its $200 evaluation threshold. Framing kill decisions as \"wasting what I've already spent.\" The correct framing: \"Given what I now know, is additional investment likely to be profitable?\" If no — kill. The past spend is gone either way.",
    "tag": "Finance",
    "targetKeyword": "what is sunk cost fallacy",
    "metaTitle": "What Is Sunk Cost Fallacy? Dropshipping Definition — First Sale Society",
    "metaDescription": "Continuing to invest in a failing product test because of money already spent — \"I've put $400 into this, I can't quit now.\" The correct decision…"
  },
  {
    "id": "dropshipping",
    "slug": "dropshipping",
    "term": "Dropshipping",
    "definitionHTML": "<p>A retail fulfillment model where the seller does not hold inventory. When a customer places an order, the seller purchases the product from a supplier who ships directly to the customer. The seller earns the margin between selling price and (supplier cost + ad cost). Zero inventory risk; higher COGS than inventory model.</p>",
    "definitionText": "A retail fulfillment model where the seller does not hold inventory. When a customer places an order, the seller purchases the product from a supplier who ships directly to the customer. The seller earns the margin between selling price and (supplier cost + ad cost). Zero inventory risk; higher COGS than inventory model.",
    "tag": "Store",
    "targetKeyword": "what is dropshipping",
    "metaTitle": "What Is Dropshipping? Dropshipping Definition — First Sale Society",
    "metaDescription": "A retail fulfillment model where the seller does not hold inventory. When a customer places an order, the seller purchases the product from a supplier who…"
  },
  {
    "id": "offer-stack",
    "slug": "offer-stack",
    "term": "Offer Stack",
    "definitionHTML": "<p>The complete combination of elements that make up your purchase proposition: core product, price, shipping policy, guarantee, bonuses, urgency mechanism, and social proof. Each element either increases perceived value or removes friction at the buying decision. Two stores selling the same product at the same price can have dramatically different conversion rates based solely on how the offer is structured.</p>\n<p class=\"why\">Why it matters: When you're at break-even ROAS with good traffic, the lever to pull is almost always the offer — not the ads. Adding free shipping, a 90-day guarantee, and a low-COGS bonus item can double CVR without touching a single campaign.</p>\n<div class=\"mistake\">Competing on price instead of value. Dropping your price reduces margin permanently. Adding perceived-value bonuses increases CVR without touching COGS — and doesn't train buyers to wait for discounts.</div>",
    "definitionText": "The complete combination of elements that make up your purchase proposition: core product, price, shipping policy, guarantee, bonuses, urgency mechanism, and social proof. Each element either increases perceived value or removes friction at the buying decision. Two stores selling the same product at the same price can have dramatically different conversion rates based solely on how the offer is structured. Why it matters: When you're at break-even ROAS with good traffic, the lever to pull is almost always the offer — not the ads. Adding free shipping, a 90-day guarantee, and a low-COGS bonus item can double CVR without touching a single campaign. Competing on price instead of value. Dropping your price reduces margin permanently. Adding perceived-value bonuses increases CVR without touching COGS — and doesn't train buyers to wait for discounts.",
    "tag": "Store",
    "targetKeyword": "what is offer stack",
    "metaTitle": "What Is Offer Stack? Dropshipping Definition — First Sale Society",
    "metaDescription": "The complete combination of elements that make up your purchase proposition: core product, price, shipping policy, guarantee, bonuses, urgency mechanism,…"
  },
  {
    "id": "aov-lift",
    "slug": "aov-lift",
    "term": "AOV Lift",
    "definitionHTML": "<p>The increase in Average Order Value achieved through bundles, upsells, order bumps, or post-purchase offers. Every dollar of AOV lift produces outsized profit impact because it requires zero additional ad spend. A $10 AOV lift at 50 daily orders = $500/day in additional near-100%-margin revenue.</p>\n<div class=\"mistake\">Treating AOV optimization as optional. Once you have a profitable product doing 20+ orders/day, not having bundles or upsells in place is leaving your highest-margin revenue channel completely untouched.</div>",
    "definitionText": "The increase in Average Order Value achieved through bundles, upsells, order bumps, or post-purchase offers. Every dollar of AOV lift produces outsized profit impact because it requires zero additional ad spend. A $10 AOV lift at 50 daily orders = $500/day in additional near-100%-margin revenue. Treating AOV optimization as optional. Once you have a profitable product doing 20+ orders/day, not having bundles or upsells in place is leaving your highest-margin revenue channel completely untouched.",
    "tag": "Store",
    "targetKeyword": "what is aov lift",
    "metaTitle": "What Is AOV Lift? Dropshipping Definition — First Sale Society",
    "metaDescription": "The increase in Average Order Value achieved through bundles, upsells, order bumps, or post-purchase offers. Every dollar of AOV lift produces outsized…"
,
    "relatedTools": ["average-order-value-calculator"],
    "relatedTerms": ["aov", "ltv", "offer-stack"]
  },
  {
    "id": "advertorial-bridge-page",
    "slug": "advertorial-bridge-page",
    "term": "Advertorial / Bridge Page",
    "definitionHTML": "<p>An advertorial is a pre-sell landing page styled to look like editorial content (a news article, a personal story, a \"doctor recommendation\"). A bridge page is similar but shorter — it connects the ad's promise to the product page without a full article. Both warm up cold traffic before the purchase ask.</p>\n<p class=\"why\">Why it matters: For higher-ticket or health/wellness products, a pre-sell page that builds context and trust before the purchase ask can 2–4× your conversion rate.</p>\n<div class=\"mistake\">Using advertorials for every product regardless of price point. A $19 impulse-buy product doesn't need a 1,200-word pre-sell page. Advertorials are for products where the buyer needs to be convinced before they click Buy.</div>",
    "definitionText": "An advertorial is a pre-sell landing page styled to look like editorial content (a news article, a personal story, a \"doctor recommendation\"). A bridge page is similar but shorter — it connects the ad's promise to the product page without a full article. Both warm up cold traffic before the purchase ask. Why it matters: For higher-ticket or health/wellness products, a pre-sell page that builds context and trust before the purchase ask can 2–4× your conversion rate. Using advertorials for every product regardless of price point. A $19 impulse-buy product doesn't need a 1,200-word pre-sell page. Advertorials are for products where the buyer needs to be convinced before they click Buy.",
    "tag": "Store",
    "targetKeyword": "what is advertorial / bridge page",
    "metaTitle": "What Is Advertorial / Bridge Page? Dropshipping Definition — First Sale Society",
    "metaDescription": "An advertorial is a pre-sell landing page styled to look like editorial content (a news article, a personal story, a \"doctor recommendation\"). A bridge…"
  },
  {
    "id": "persona",
    "slug": "persona",
    "term": "Persona",
    "definitionHTML": "<p>A detailed, named profile of your ideal buyer: their age range, life stage, specific pain or desire, language they use, failed alternatives they've tried, objections to buying, and the emotional state that makes them receptive to your offer. The persona drives angle selection, copy tone, and hook type.</p>",
    "definitionText": "A detailed, named profile of your ideal buyer: their age range, life stage, specific pain or desire, language they use, failed alternatives they've tried, objections to buying, and the emotional state that makes them receptive to your offer. The persona drives angle selection, copy tone, and hook type.",
    "tag": "Store",
    "targetKeyword": "what is persona",
    "metaTitle": "What Is Persona? Dropshipping Definition — First Sale Society",
    "metaDescription": "A detailed, named profile of your ideal buyer: their age range, life stage, specific pain or desire, language they use, failed alternatives they've tried,…"
  },
  {
    "id": "abandoned-cart-flow",
    "slug": "abandoned-cart-flow",
    "term": "Abandoned Cart Flow",
    "definitionHTML": "<p>An automated email (and/or SMS) sequence triggered when a visitor adds to cart but does not complete checkout. Standard 3-email structure: Email 1 at 1 hour (reminder, no discount), Email 2 at 24 hours (social proof + urgency), Email 3 at 72 hours (discount or final incentive). Typically recovers 10–20% of abandoned carts.</p>\n<p class=\"why\">Why it matters: At $100/day in ad spend, 50+ people are abandoning carts daily. A 15% recovery rate at $60 AOV = $450/day in revenue from traffic you've already paid for — often representing 20–30% of total store revenue with zero incremental ad spend.</p>\n<div class=\"mistake\">Waiting until you're \"at scale\" to set up abandoned cart flows. At any order volume, this flow generates immediate return on 90 minutes of setup time. Operators who launch ads without email flows are paying to send traffic to a leaky bucket.</div>",
    "definitionText": "An automated email (and/or SMS) sequence triggered when a visitor adds to cart but does not complete checkout. Standard 3-email structure: Email 1 at 1 hour (reminder, no discount), Email 2 at 24 hours (social proof + urgency), Email 3 at 72 hours (discount or final incentive). Typically recovers 10–20% of abandoned carts. Why it matters: At $100/day in ad spend, 50+ people are abandoning carts daily. A 15% recovery rate at $60 AOV = $450/day in revenue from traffic you've already paid for — often representing 20–30% of total store revenue with zero incremental ad spend. Waiting until you're \"at scale\" to set up abandoned cart flows. At any order volume, this flow generates immediate return on 90 minutes of setup time. Operators who launch ads without email flows are paying to send traffic to a leaky bucket.",
    "tag": "Email",
    "targetKeyword": "what is abandoned cart flow",
    "metaTitle": "What Is Abandoned Cart Flow? Dropshipping Definition — First Sale Society",
    "metaDescription": "An automated email (and/or SMS) sequence triggered when a visitor adds to cart but does not complete checkout. Standard 3-email structure: Email 1 at 1…"
,
    "relatedTools": ["customer-lifetime-value-calculator", "average-order-value-calculator"],
    "relatedTerms": ["cvr", "aov", "post-purchase-flow"]
  },
  {
    "id": "post-purchase-flow",
    "slug": "post-purchase-flow",
    "term": "Post-Purchase Flow",
    "definitionHTML": "<p>An automated email sequence triggered after a customer completes a purchase. Serves multiple functions: reduces buyer's remorse, delivers tracking information, solicits reviews at the moment of highest satisfaction, and presents complementary product offers at the peak of purchase intent.</p>",
    "definitionText": "An automated email sequence triggered after a customer completes a purchase. Serves multiple functions: reduces buyer's remorse, delivers tracking information, solicits reviews at the moment of highest satisfaction, and presents complementary product offers at the peak of purchase intent.",
    "tag": "Email",
    "targetKeyword": "what is post-purchase flow",
    "metaTitle": "What Is Post-Purchase Flow? Dropshipping Definition — First Sale Society",
    "metaDescription": "An automated email sequence triggered after a customer completes a purchase. Serves multiple functions: reduces buyer's remorse, delivers tracking…"
  },
  {
    "id": "sourcing-agent",
    "slug": "sourcing-agent",
    "term": "Sourcing Agent",
    "definitionHTML": "<p>A person or company in China (or other manufacturing hubs) who manages supplier relationships, product quality, inventory, and fulfillment on your behalf. Agents replace CJDropshipping once you're doing meaningful volume — typically 20+ orders/day.</p>",
    "definitionText": "A person or company in China (or other manufacturing hubs) who manages supplier relationships, product quality, inventory, and fulfillment on your behalf. Agents replace CJDropshipping once you're doing meaningful volume — typically 20+ orders/day.",
    "tag": "Supply Chain",
    "targetKeyword": "what is sourcing agent",
    "metaTitle": "What Is Sourcing Agent? Dropshipping Definition — First Sale Society",
    "metaDescription": "A person or company in China (or other manufacturing hubs) who manages supplier relationships, product quality, inventory, and fulfillment on your behalf.…"
,
    "relatedTools": ["dropshipping-profit-calculator", "product-pricing-calculator"],
    "relatedTerms": ["cogs", "3pl"]
  },
  {
    "id": "3pl",
    "slug": "3pl",
    "term": "3PL",
    "definitionHTML": "<p>Third-Party Logistics provider. A warehouse and fulfillment service that stores your inventory and ships orders on your behalf. Relevant once you move from dropshipping to bulk ordering. Popular providers: ShipBob, ShipHero, Deliverr. Costs $1–$3/order plus storage.</p>",
    "definitionText": "Third-Party Logistics provider. A warehouse and fulfillment service that stores your inventory and ships orders on your behalf. Relevant once you move from dropshipping to bulk ordering. Popular providers: ShipBob, ShipHero, Deliverr. Costs $1–$3/order plus storage.",
    "tag": "Supply Chain",
    "targetKeyword": "what is 3pl",
    "metaTitle": "What Is 3PL? Dropshipping Definition — First Sale Society",
    "metaDescription": "Third-Party Logistics provider. A warehouse and fulfillment service that stores your inventory and ships orders on your behalf. Relevant once you move…"
  },
  {
    "id": "meta-pixel",
    "slug": "meta-pixel",
    "term": "Meta Pixel",
    "definitionHTML": "<p>A JavaScript snippet on your Shopify store that fires events (PageView, AddToCart, InitiateCheckout, Purchase) back to Meta so it can optimize ad delivery. Without a working pixel, Meta cannot find buyers — it's optimizing blind. Verify with Meta's Test Events tool before spending any real budget.</p>",
    "definitionText": "A JavaScript snippet on your Shopify store that fires events (PageView, AddToCart, InitiateCheckout, Purchase) back to Meta so it can optimize ad delivery. Without a working pixel, Meta cannot find buyers — it's optimizing blind. Verify with Meta's Test Events tool before spending any real budget.",
    "tag": "Tracking",
    "targetKeyword": "what is meta pixel",
    "metaTitle": "What Is Meta Pixel? Dropshipping Definition — First Sale Society",
    "metaDescription": "A JavaScript snippet on your Shopify store that fires events (PageView, AddToCart, InitiateCheckout, Purchase) back to Meta so it can optimize ad…"
  },
  {
    "id": "pixel-capi",
    "slug": "pixel-capi",
    "term": "Pixel + CAPI",
    "definitionHTML": "<p>The Meta Pixel fires browser-side events from your store. The Conversions API (CAPI) is a server-side backup that sends the same events directly from your server — bypassing iOS14 ad-blocking and browser privacy restrictions. Together they maximize attribution accuracy.</p>",
    "definitionText": "The Meta Pixel fires browser-side events from your store. The Conversions API (CAPI) is a server-side backup that sends the same events directly from your server — bypassing iOS14 ad-blocking and browser privacy restrictions. Together they maximize attribution accuracy.",
    "tag": "Tracking",
    "targetKeyword": "what is pixel + capi",
    "metaTitle": "What Is Pixel + CAPI? Dropshipping Definition — First Sale Society",
    "metaDescription": "The Meta Pixel fires browser-side events from your store. The Conversions API (CAPI) is a server-side backup that sends the same events directly from your…"
  },
  {
    "id": "prospecting-vs-retargeting",
    "slug": "prospecting-vs-retargeting",
    "term": "Prospecting vs Retargeting",
    "definitionHTML": "<p>Prospecting campaigns reach cold audiences who have never interacted with your brand. Retargeting campaigns reach warm audiences — people who visited your product page, added to cart, or initiated checkout but didn't purchase. Prospecting builds the top of funnel; retargeting recovers it.</p>",
    "definitionText": "Prospecting campaigns reach cold audiences who have never interacted with your brand. Retargeting campaigns reach warm audiences — people who visited your product page, added to cart, or initiated checkout but didn't purchase. Prospecting builds the top of funnel; retargeting recovers it.",
    "tag": "Strategy",
    "targetKeyword": "what is prospecting vs retargeting",
    "metaTitle": "What Is Prospecting vs Retargeting? Dropshipping Definition — First Sale Society",
    "metaDescription": "Prospecting campaigns reach cold audiences who have never interacted with your brand. Retargeting campaigns reach warm audiences — people who visited your…"
  },
  {
    "id": "horizontal-scaling",
    "slug": "horizontal-scaling",
    "term": "Horizontal Scaling",
    "definitionHTML": "<p>Expanding ad reach by duplicating winning campaigns into new geographies, audiences, or placements — rather than increasing budget on existing campaigns (vertical scaling). Horizontal scaling avoids the learning phase resets that come with large vertical budget increases.</p>",
    "definitionText": "Expanding ad reach by duplicating winning campaigns into new geographies, audiences, or placements — rather than increasing budget on existing campaigns (vertical scaling). Horizontal scaling avoids the learning phase resets that come with large vertical budget increases.",
    "tag": "Strategy",
    "targetKeyword": "what is horizontal scaling",
    "metaTitle": "What Is Horizontal Scaling? Dropshipping Definition — First Sale Society",
    "metaDescription": "Expanding ad reach by duplicating winning campaigns into new geographies, audiences, or placements — rather than increasing budget on existing campaigns…"
,
    "relatedTools": ["dropshipping-scaling-calculator", "ad-testing-budget-calculator"],
    "relatedTerms": ["surf-scaling", "roas", "cpa"]
  },
  {
    "id": "surf-scaling",
    "slug": "surf-scaling",
    "term": "Surf Scaling",
    "definitionHTML": "<p>A budget management technique that increases spend in profitable windows (typically late morning through early afternoon when ROAS is highest) and reduces spend during low-converting periods. Named for \"riding\" the profitability curve. Requires checking campaigns every 2–4 hours and making incremental budget adjustments.</p>",
    "definitionText": "A budget management technique that increases spend in profitable windows (typically late morning through early afternoon when ROAS is highest) and reduces spend during low-converting periods. Named for \"riding\" the profitability curve. Requires checking campaigns every 2–4 hours and making incremental budget adjustments.",
    "tag": "Strategy",
    "targetKeyword": "what is surf scaling",
    "metaTitle": "What Is Surf Scaling? Dropshipping Definition — First Sale Society",
    "metaDescription": "A budget management technique that increases spend in profitable windows (typically late morning through early afternoon when ROAS is highest) and reduces…"
,
    "relatedTools": ["dropshipping-scaling-calculator"],
    "relatedTerms": ["horizontal-scaling", "roas", "cpa"]
  },
  {
    "id": "winning-creative-rate",
    "slug": "winning-creative-rate",
    "term": "Winning Creative Rate",
    "definitionHTML": "<p>The percentage of launched creatives that become profitable performers. Industry expectation: 1 in 10 to 1 in 20 creatives becomes a sustainable winner. Most beginner operators expect 1 in 3 and stop testing when that expectation fails. Accepting a 5–10% winning creative rate reframes creative production as a volume game — you need 50 creatives in market to reliably find 3–5 winners.</p>\n<div class=\"mistake\">Stopping creative production when the first few don't perform. Launching 5 creatives with no winners means 5 angles didn't work — not that the product doesn't work. Treat the non-winners as the cost of finding the winners.</div>",
    "definitionText": "The percentage of launched creatives that become profitable performers. Industry expectation: 1 in 10 to 1 in 20 creatives becomes a sustainable winner. Most beginner operators expect 1 in 3 and stop testing when that expectation fails. Accepting a 5–10% winning creative rate reframes creative production as a volume game — you need 50 creatives in market to reliably find 3–5 winners. Stopping creative production when the first few don't perform. Launching 5 creatives with no winners means 5 angles didn't work — not that the product doesn't work. Treat the non-winners as the cost of finding the winners.",
    "tag": "Strategy",
    "targetKeyword": "what is winning creative rate",
    "metaTitle": "What Is Winning Creative Rate? Dropshipping Definition — First Sale Society",
    "metaDescription": "The percentage of launched creatives that become profitable performers. Industry expectation: 1 in 10 to 1 in 20 creatives becomes a sustainable winner.…"
  },
  {
    "id": "voice-of-customer-voc",
    "slug": "voice-of-customer-voc",
    "term": "Voice of Customer (VOC)",
    "definitionHTML": "<p>The actual language, phrases, and emotional vocabulary that real customers use to describe their problems and desired outcomes. Sourced from Amazon reviews, Reddit threads, TikTok comments, and Quora answers. The most powerful copy comes from reflecting customers' exact words back to them.</p>\n<p class=\"why\">Why it matters: Customers convert on recognition, not persuasion. When an ad says exactly what they already think about their problem in exactly the words they use to describe it, they feel understood — and that feeling precedes the purchase.</p>\n<div class=\"mistake\">Writing ad copy from your own perspective as the product seller. You know too much about the product. Mine VOC before writing a single word of copy — let customers write the brief.</div>",
    "definitionText": "The actual language, phrases, and emotional vocabulary that real customers use to describe their problems and desired outcomes. Sourced from Amazon reviews, Reddit threads, TikTok comments, and Quora answers. The most powerful copy comes from reflecting customers' exact words back to them. Why it matters: Customers convert on recognition, not persuasion. When an ad says exactly what they already think about their problem in exactly the words they use to describe it, they feel understood — and that feeling precedes the purchase. Writing ad copy from your own perspective as the product seller. You know too much about the product. Mine VOC before writing a single word of copy — let customers write the brief.",
    "tag": "Strategy",
    "targetKeyword": "what is voice of customer (voc)",
    "metaTitle": "What Is Voice of Customer (VOC)? Dropshipping Definition — First Sale Society",
    "metaDescription": "The actual language, phrases, and emotional vocabulary that real customers use to describe their problems and desired outcomes. Sourced from Amazon…"
  },
  {
    "id": "business-manager-meta",
    "slug": "business-manager-meta",
    "term": "Business Manager (Meta)",
    "definitionHTML": "<p>Meta's central management hub where you manage your ad accounts, pixels, pages, and team access. A clean, properly-structured Business Manager reduces ban risk and makes account management more resilient. One BM can contain multiple ad accounts.</p>\n<p class=\"why\">Why it matters: Account bans are often triggered by BM-level red flags. A BM created with a verified business identity, consistent payment method, and legitimate-looking page history is dramatically less ban-prone.</p>\n<div class=\"mistake\">Using the same BM for multiple ad accounts when one has a poor compliance history. Account flags can propagate across the BM. Keep a clean backup BM on a trusted separate identity for exactly this scenario.</div>",
    "definitionText": "Meta's central management hub where you manage your ad accounts, pixels, pages, and team access. A clean, properly-structured Business Manager reduces ban risk and makes account management more resilient. One BM can contain multiple ad accounts. Why it matters: Account bans are often triggered by BM-level red flags. A BM created with a verified business identity, consistent payment method, and legitimate-looking page history is dramatically less ban-prone. Using the same BM for multiple ad accounts when one has a poor compliance history. Account flags can propagate across the BM. Keep a clean backup BM on a trusted separate identity for exactly this scenario.",
    "tag": "Strategy",
    "targetKeyword": "what is business manager (meta)",
    "metaTitle": "What Is Business Manager (Meta)? Dropshipping Definition — First Sale Society",
    "metaDescription": "Meta's central management hub where you manage your ad accounts, pixels, pages, and team access. A clean, properly-structured Business Manager reduces ban…"
  },
  {
    "id": "ecomtalent",
    "slug": "ecomtalent",
    "term": "EcomTalent",
    "definitionHTML": "<p>A platform connecting ecommerce brands with creative talent. Operators and creators produce ad creatives (video ads, static ads) for brands and earn per creative or on a monthly retainer basis. Primary alternative income path for beginners under $500 capital.</p>\n<p class=\"why\">Why it matters: Builds creative skills while generating capital for your own store. By the time you have enough to run paid ads, you'll have made 50–100 ads and will understand exactly what hooks work, what copy converts, and what the algorithm rewards.</p>",
    "definitionText": "A platform connecting ecommerce brands with creative talent. Operators and creators produce ad creatives (video ads, static ads) for brands and earn per creative or on a monthly retainer basis. Primary alternative income path for beginners under $500 capital. Why it matters: Builds creative skills while generating capital for your own store. By the time you have enough to run paid ads, you'll have made 50–100 ads and will understand exactly what hooks work, what copy converts, and what the algorithm rewards.",
    "tag": "Strategy",
    "targetKeyword": "what is ecomtalent",
    "metaTitle": "What Is EcomTalent? Dropshipping Definition — First Sale Society",
    "metaDescription": "A platform connecting ecommerce brands with creative talent. Operators and creators produce ad creatives (video ads, static ads) for brands and earn per…"
  }
];
