/**
 * Free-tool SEO + content registry.
 *
 * One entry per tool, keyed by the slug used for the route (app/tools/[tool])
 * and the calculator config (components/calculators/configs.ts). Drives the
 * dynamic tool page (metadata, JSON-LD, body copy, FAQ, related links, offer)
 * and the /tools hub. Adding a tool = add a config + an entry here.
 *
 * NOTE: the flagship Break-Even ROAS Calculator keeps its own hand-built static
 * route (app/tools/break-even-roas-calculator) and is intentionally NOT in this
 * registry — it is listed in the hub separately.
 */

const SITE = 'https://firstsalesociety.com';

export type ToolCategory =
  | 'Profit & Pricing'
  | 'Ad Metrics'
  | 'Growth & Retention'
  | 'Quick Tools';

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolRelatedLink {
  href: string;
  label: string;
}

export interface ToolOffer {
  name: string;
  valueProp: string;
  outcome: string;
  href: string;
  cta?: string;
  /** Logo path from the toolkit image set (/images/<tool>.png). */
  image?: string;
  /** Emoji shown if the image fails to load. */
  emoji?: string;
}

export interface ToolData {
  slug: string;
  category: ToolCategory;
  emoji: string;
  /** Short name for the hub card + sidebar. */
  navName: string;
  /** One-line hub card description. */
  navDesc: string;
  /** <title> — keyword-led. */
  metaTitle: string;
  /** 150–160 char meta description. */
  metaDescription: string;
  /** Primary target keyword. */
  keyword: string;
  /** H1 on the page (without emoji). */
  h1: string;
  /** Lead paragraph under the H1. */
  intro: string;
  /** "How to use" steps — also emitted as HowTo schema. */
  steps: { name: string; text: string }[];
  /** What-is / context body, rendered as paragraphs below the tool. */
  body: string[];
  faqs: ToolFaq[];
  related: ToolRelatedLink[];
  offer: ToolOffer;
  /** SoftwareApplication featureList. */
  features: string[];
  datePublished: string;
  /** Which widget renders on the page. Defaults to the generic calculator. */
  widget?: 'calculator' | 'scorecard' | 'utm' | 'niche';
}

export const LUXURY_OFFER: ToolOffer = {
  name: 'LuxuryTools Bundle',
  valueProp: '20+ spy & research tools — AdSpy, Kalodata, WinningHunter, Minea & more for $29/mo',
  outcome: 'Replace ~$1,400/mo of tools',
  href: 'https://whop.com/luxury-paid?a=internetjames',
  cta: 'See the bundle →',
  image: '/images/luxurytools.png',
  emoji: '💎',
};

export const CJ_OFFER: ToolOffer = {
  name: 'CJ Dropshipping',
  valueProp: 'Free to join · global 7–12 day shipping · auto-fulfils to Shopify',
  outcome: 'Source & ship your product',
  href: 'https://www.cjdropshipping.com/register.html?token=5d4e0f96-0da0-498e-ad95-124ba08429f3',
  cta: 'Start sourcing →',
  image: '/images/cjdropshipping.webp',
  emoji: '📦',
};

export const KALODATA_OFFER: ToolOffer = {
  name: 'Kalodata',
  valueProp: 'TikTok Shop sales data — find products doing $50K–$500K/mo before they peak',
  outcome: 'Find winning products with data',
  href: 'https://kalodata.com',
  cta: 'Explore the data →',
  image: '/images/kalodata.png',
  emoji: '📊',
};

export const MINEA_OFFER: ToolOffer = {
  name: 'Minea',
  valueProp: 'Meta · TikTok · Pinterest ad spy with spend + targeting data',
  outcome: 'Spy on winning ads',
  href: 'https://minea.com',
  cta: 'Start spying →',
  image: '/images/minea.jpeg',
  emoji: '🔍',
};

export const toolsData: ToolData[] = [
  // ── 1. Profit Margin Calculator ──────────────────────────────────────────
  {
    slug: 'profit-margin-calculator',
    category: 'Profit & Pricing',
    emoji: '📈',
    navName: 'Profit Margin Calculator',
    navDesc: 'Turn cost + price into margin %, markup, and profit per order',
    metaTitle: 'Profit Margin Calculator — Free Tool for Ecommerce & Dropshipping',
    metaDescription:
      'Free profit margin calculator. Enter product cost and selling price to get your gross margin %, markup %, and profit per order instantly. No signup required.',
    keyword: 'profit margin calculator',
    h1: 'Profit Margin Calculator',
    intro:
      'Enter your product cost and selling price to see your gross profit margin, markup, and profit per order. Margin is the first number that decides whether a product can survive paid ads.',
    steps: [
      { name: 'Enter your product cost', text: 'Type your total landed cost — what you pay the supplier for the product plus shipping.' },
      { name: 'Enter your selling price', text: 'Type the price the customer pays at checkout.' },
      { name: 'Read your margin', text: 'The calculator shows your gross margin %, markup %, and profit per order in real time.' },
    ],
    body: [
      'Gross profit margin is profit divided by selling price: (Price − Cost) ÷ Price. It tells you what share of every sale you actually keep before ad spend, fees, and refunds.',
      'For paid-traffic dropshipping, operators target roughly 65%+ gross margin. That cushion is what lets a product stay profitable at a 2–3× break-even ROAS once Meta takes its cut. Thin margins (under 40%) leave almost no room for ad inefficiency — one bad day of testing wipes out the week.',
      'Margin and markup are not the same number. A 70% margin is a 233% markup. The calculator shows both so you can talk to suppliers in markup terms and to yourself in margin terms.',
    ],
    faqs: [
      { q: 'How do you calculate profit margin?', a: 'Profit margin = (Selling Price − Cost) ÷ Selling Price, expressed as a percentage. If you sell for $50 and it costs you $15, your margin is (50 − 15) ÷ 50 = 70%.' },
      { q: 'What is a good profit margin for dropshipping?', a: 'Most operators aim for 65%+ gross margin on paid-traffic products. That leaves enough room to cover a 2–3× break-even ROAS, payment fees, and the occasional refund while staying profitable.' },
      { q: "What's the difference between margin and markup?", a: 'Margin is profit as a percentage of the selling price; markup is profit as a percentage of cost. A product that costs $15 and sells for $50 has a 70% margin but a 233% markup.' },
      { q: 'Does this include ad costs?', a: 'No — this is gross margin, before advertising. To see profit after ads, use the Dropshipping Profit Calculator, which subtracts your cost per acquisition too.' },
    ],
    related: [
      { href: '/tools/dropshipping-profit-calculator', label: 'Add ad costs with the Dropshipping Profit Calculator →' },
      { href: '/tools/product-pricing-calculator', label: 'Work backwards from a target margin with the Pricing Calculator →' },
      { href: '/tools/break-even-roas-calculator', label: 'Find the ROAS your margin needs →' },
      { href: '/glossary/break-even-roas', label: 'See how margin sets your break-even ROAS →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Gross margin % calculation', 'Markup % calculation', 'Profit per order', 'Real-time computation', 'Free, no signup'],
    datePublished: '2026-02-01',
  },

  // ── 2. Dropshipping Profit Calculator ────────────────────────────────────
  {
    slug: 'dropshipping-profit-calculator',
    category: 'Profit & Pricing',
    emoji: '💰',
    navName: 'Dropshipping Profit Calculator',
    navDesc: 'Net profit per order after product, ads, and payment fees',
    metaTitle: 'Dropshipping Profit Calculator — Free Net Profit per Order Tool',
    metaDescription:
      'Free dropshipping profit calculator. Enter price, product cost, ad cost per order, and fees to see your real net profit and margin per order. No signup.',
    keyword: 'dropshipping profit calculator',
    h1: 'Dropshipping Profit Calculator',
    intro:
      'See what you actually keep per order after product cost, ad spend, and payment fees. This is the number that funds inventory, refunds, and your time — not revenue.',
    steps: [
      { name: 'Enter your selling price', text: 'The price the customer pays at checkout.' },
      { name: 'Enter product + shipping cost', text: 'Your total landed cost from the supplier.' },
      { name: 'Enter ad cost per order (CPA)', text: 'How much you spend on ads to get one sale — your cost per acquisition.' },
      { name: 'Enter payment fees', text: 'Your processor fee as a percentage, usually around 2.9%.' },
      { name: 'Read your net profit', text: 'The calculator shows net profit per order, net margin, and profit per 100 orders.' },
    ],
    body: [
      'Revenue is a vanity number. Net profit per order — selling price minus product cost, minus ad cost per order, minus payment fees — is what actually lands in your account. A store doing $30,000/month can still be losing money if the CPA is too high.',
      'The single most common mistake is scaling a product with a positive ROAS but a negative net profit, because the operator never subtracted product cost and fees from the ad math. This calculator forces all three costs into one view.',
      'If your net profit per order is negative, you have two levers: lower the CPA (better creative, better targeting, better offer) or widen the margin (raise price, cut COGS). Adding budget to a money-losing product just loses money faster.',
    ],
    faqs: [
      { q: 'How do you calculate dropshipping profit?', a: 'Net profit per order = Selling Price − Product/Shipping Cost − Ad Cost per Order − Payment Fees. Multiply by your order volume to get total profit for the period.' },
      { q: 'What is a good net profit margin for dropshipping?', a: 'After ads and fees, healthy stores keep roughly 15–25% net margin. Anything consistently negative means your CPA is too high or your product margin is too thin to support paid traffic.' },
      { q: 'Why subtract ad cost per order instead of total ad spend?', a: 'Cost per acquisition (total ad spend ÷ orders) puts advertising on a per-order basis, so it lines up with your per-order product cost and fees. It makes the profit on a single sale obvious.' },
      { q: 'What if my profit per order is negative?', a: 'You are paying to lose money on every sale. Lower your CPA with stronger creative and offers, or improve margin by repricing or sourcing cheaper — before you add any budget.' },
    ],
    related: [
      { href: '/tools/break-even-roas-calculator', label: 'Find your break-even ROAS →' },
      { href: '/tools/profit-margin-calculator', label: 'Check your gross margin first →' },
      { href: '/course/kill-or-scale', label: 'Learn how profit drives kill/scale decisions →' },
      { href: '/glossary/cpa', label: 'What is CPA (Cost Per Acquisition)? →' },
    ],
    offer: CJ_OFFER,
    features: ['Net profit per order', 'Net margin %', 'Profit per 100 orders', 'Accounts for ads + fees', 'Free, no signup'],
    datePublished: '2026-02-01',
  },

  // ── 3. Product Pricing Calculator ────────────────────────────────────────
  {
    slug: 'product-pricing-calculator',
    category: 'Profit & Pricing',
    emoji: '🏷️',
    navName: 'Product Pricing Calculator',
    navDesc: 'Work backwards from a target margin to your selling price',
    metaTitle: 'Product Pricing Calculator — Free Markup & Sell-Price Tool',
    metaDescription:
      'Free product pricing calculator. Enter your cost and target margin to get the exact selling price, markup, and profit per order. Built for dropshipping. No signup.',
    keyword: 'product pricing calculator',
    h1: 'Product Pricing Calculator',
    intro:
      'Enter your cost and the margin you want, and get the exact price to charge. Pricing backwards from a target margin keeps you from underpricing a product that has to fund paid ads.',
    steps: [
      { name: 'Enter product + shipping cost', text: 'Your total landed cost from the supplier.' },
      { name: 'Enter your target margin', text: 'The gross margin you want to keep, as a percentage — operators often use 65–75%.' },
      { name: 'Read your suggested price', text: 'The calculator shows the selling price, the markup, and the profit per order needed to hit that margin.' },
    ],
    body: [
      'The formula is Price = Cost ÷ (1 − Target Margin). To keep a 70% margin on a $15 product, you price at $50, not "$15 plus a bit". Most beginners underprice because they think in small markups instead of the margin paid ads actually require.',
      'A 3–5× markup on landed cost is the rough rule of thumb for dropshipping, because the gap has to absorb the cost of acquiring the customer. A product you sell at only 2× cost almost never survives Meta ads.',
      'Once you have a price, sanity-check it against competitors and against the perceived value of the offer — then round to a charm price (.99 / .95). The calculator gives you the floor; the market sets the ceiling.',
    ],
    faqs: [
      { q: 'How do you price a dropshipping product?', a: 'Price = Cost ÷ (1 − Target Margin). For a $15 cost and a 70% target margin, that is 15 ÷ 0.30 = $50. This guarantees the margin you need before ad spend.' },
      { q: 'What markup should I use for dropshipping?', a: 'A 3–5× markup on landed cost is typical, because the margin has to cover customer acquisition. A 70% margin equals roughly a 3.3× markup.' },
      { q: 'Should I price with .99 endings?', a: 'Charm pricing (e.g. $49.99) reliably tests at least as well as round numbers and often better. Use the calculator price as your floor, then round to a .99/.95 ending.' },
      { q: 'Why not just add a fixed dollar amount to cost?', a: 'A flat markup ignores margin. Adding $10 to a $15 product is only a 40% margin — too thin for paid ads. Pricing from a target margin keeps the percentage right at every cost level.' },
    ],
    related: [
      { href: '/tools/profit-margin-calculator', label: 'Check the margin on a price you already have →' },
      { href: '/tools/break-even-roas-calculator', label: 'See the ROAS your price needs →' },
      { href: '/course/validate-the-product', label: 'How pricing fits product validation →' },
      { href: '/glossary/roas', label: 'What is ROAS? →' },
    ],
    offer: CJ_OFFER,
    features: ['Target-margin pricing', 'Markup multiple', 'Profit per order', 'Real-time computation', 'Free, no signup'],
    datePublished: '2026-02-01',
  },

  // ── 4. Shopify Fee Calculator ────────────────────────────────────────────
  {
    slug: 'shopify-fee-calculator',
    category: 'Profit & Pricing',
    emoji: '🧾',
    navName: 'Shopify Fee Calculator',
    navDesc: 'See the real payment fee taken from each order',
    metaTitle: 'Shopify Fee Calculator — Free Payment & Transaction Fee Tool',
    metaDescription:
      'Free Shopify fee calculator. Enter an order value and your processing rate to see the exact payment fee, your net payout, and the fee as a % of the order.',
    keyword: 'shopify fees calculator',
    h1: 'Shopify Fee Calculator',
    intro:
      'See exactly how much payment processing takes from each order, and what actually lands in your account. These fees come out of margin before ad spend — leaving them out understates your break-even.',
    steps: [
      { name: 'Enter the order value', text: 'The total the customer pays at checkout.' },
      { name: 'Enter your processing rate', text: 'Your payment processor percentage — Shopify Payments is commonly around 2.9%.' },
      { name: 'Enter the flat fee', text: 'The fixed per-transaction fee, often $0.30.' },
      { name: 'Read your fee and net', text: 'The calculator shows the fee per order, what you receive, and the fee as a percentage of the order.' },
    ],
    body: [
      'Payment processing on Shopify is typically a percentage of the order plus a small flat fee — commonly 2.9% + $0.30 for online card payments, varying by plan and country. On a $49 order that is about $1.72, or roughly 3.5% once the flat fee is included.',
      'It sounds small, but it comes straight out of gross margin before you spend a cent on ads. When you calculate break-even ROAS, this fee has to be in the cost stack — otherwise every product looks slightly more profitable than it is.',
      'Higher Shopify plans lower the processing rate; using a third-party gateway instead of Shopify Payments can add an extra transaction fee. Always model your real numbers rather than assuming a flat 3%.',
    ],
    faqs: [
      { q: 'How much does Shopify take per sale?', a: 'Shopify Payments commonly charges around 2.9% + $0.30 per online card transaction on the Basic plan, lower on higher plans. On a $49 order that is roughly $1.72.' },
      { q: 'Do Shopify fees affect break-even ROAS?', a: 'Yes. Payment fees reduce your gross profit per order, which raises the ROAS you need to break even. Always include them when modelling margin.' },
      { q: 'Can I avoid Shopify transaction fees?', a: 'Using Shopify Payments avoids the extra third-party transaction fee, but you still pay the card processing rate. Higher plans reduce that rate.' },
      { q: 'Are payment fees the same in every country?', a: 'No — processing rates and flat fees vary by country, currency, and card type. Use your own numbers in the calculator for an accurate figure.' },
    ],
    related: [
      { href: '/tools/dropshipping-profit-calculator', label: 'See net profit after fees and ads →' },
      { href: '/tools/break-even-roas-calculator', label: 'Include fees in your break-even ROAS →' },
      { href: '/tools/profit-margin-calculator', label: 'Check your gross margin →' },
      { href: '/glossary/break-even-roas', label: 'What is break-even ROAS? →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Fee per order', 'Net payout', 'Fee as % of order', 'Custom rate + flat fee', 'Free, no signup'],
    datePublished: '2026-02-01',
  },

  // ── 5. Conversion Rate Calculator ────────────────────────────────────────
  {
    slug: 'conversion-rate-calculator',
    category: 'Growth & Retention',
    emoji: '🛒',
    navName: 'Conversion Rate Calculator',
    navDesc: 'Sessions + orders into CVR — and revenue at a better rate',
    metaTitle: 'Conversion Rate Calculator — Free Ecommerce CVR Tool',
    metaDescription:
      'Free conversion rate calculator for ecommerce. Enter sessions and orders to get your store conversion rate, revenue, and the revenue you would earn at a 3% CVR.',
    keyword: 'conversion rate calculator',
    h1: 'Conversion Rate Calculator',
    intro:
      'Enter your store sessions and orders to get your conversion rate — and see how much more revenue a higher rate would produce. CVR is the lever that decides whether scaling traffic is worth it.',
    steps: [
      { name: 'Enter your sessions', text: 'The number of store visitors or sessions in the period.' },
      { name: 'Enter your orders', text: 'The number of completed orders in the same period.' },
      { name: 'Optional: enter your AOV', text: 'Add your average order value to see revenue and revenue at a 3% conversion rate.' },
      { name: 'Read your conversion rate', text: 'The calculator shows CVR and, if you added AOV, your revenue and the upside of a higher rate.' },
    ],
    body: [
      'Conversion rate is orders ÷ sessions. For cold paid traffic, 1–3% is a normal range; 2.5%+ is strong. A rate under 1% almost always points at the store rather than the traffic — page speed, the product page, trust signals, or the offer.',
      'CVR multiplies everything downstream. Doubling conversion from 1% to 2% doubles revenue on the same ad spend, which is why CRO (conversion rate optimization) is usually cheaper growth than buying more traffic.',
      'The fastest wins are almost always above the fold: a clear price, visible reviews, a strong hero image, fast load, and an obvious add-to-cart. Fix conversion before you scale spend, or you just pay to send more people to a leaky page.',
    ],
    faqs: [
      { q: 'How do you calculate conversion rate?', a: 'Conversion rate = Orders ÷ Sessions × 100. If 40 of 2,000 visitors buy, that is 40 ÷ 2,000 = 2%.' },
      { q: 'What is a good ecommerce conversion rate?', a: 'For cold paid traffic, 1–3% is typical and 2.5%+ is strong. Warm or returning traffic converts higher. Under 1% usually signals a store or offer problem.' },
      { q: 'Why is my conversion rate so low?', a: 'The usual culprits are slow load speed, a weak product page, missing trust signals (reviews, guarantees), a confusing checkout, or an offer that is not compelling. Fix these before scaling traffic.' },
      { q: 'Is it better to improve CVR or buy more traffic?', a: 'Improving CVR is usually cheaper. Going from 1% to 2% doubles revenue on the same ad spend, while more traffic costs more money for the same conversion problems.' },
    ],
    related: [
      { href: '/tools/average-order-value-calculator', label: 'Raise revenue per order with the AOV Calculator →' },
      { href: '/course/improve-your-store-page', label: 'Store-page CRO fixes that lift conversion →' },
      { href: '/tools/dropshipping-profit-calculator', label: 'Turn conversions into net profit →' },
      { href: '/glossary/cvr', label: 'Read the full Conversion Rate (CVR) definition →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Conversion rate %', 'Revenue calculation', 'Revenue at 3% CVR', 'Optional AOV input', 'Free, no signup'],
    datePublished: '2026-02-01',
  },

  // ── 7. Target ROAS Calculator ────────────────────────────────────────────
  {
    slug: 'target-roas-calculator',
    category: 'Ad Metrics',
    emoji: '🎯',
    navName: 'Target ROAS Calculator',
    navDesc: 'The ROAS you need to hit a profit goal — not just break even',
    metaTitle: 'Target ROAS Calculator — Free Profit ROAS Tool for Dropshipping',
    metaDescription:
      'Free target ROAS calculator. Enter your gross margin and desired net profit to get the exact ROAS you need to hit your profit goal, plus your break-even ROAS.',
    keyword: 'target roas calculator',
    h1: 'Target ROAS Calculator',
    intro:
      'Break-even keeps the lights on; target ROAS is the number that actually pays you. Enter your gross margin and the net profit you want to keep, and get the ROAS your ads need to hit.',
    steps: [
      { name: 'Enter your gross margin', text: 'Your product gross margin as a percentage — what you keep before ad spend.' },
      { name: 'Enter your desired net profit margin', text: 'The profit you want to keep as a percentage of revenue, after ads.' },
      { name: 'Read your target ROAS', text: 'The calculator shows the ROAS you need to hit that profit, plus your break-even ROAS for reference.' },
    ],
    body: [
      'Target ROAS works back from a profit goal. If you spend a share of revenue on ads equal to 1 ÷ ROAS, your net margin is roughly gross margin minus that share. Set net margin to your target and the math gives Target ROAS = 1 ÷ (Gross Margin − Target Profit Margin).',
      'Break-even ROAS (1 ÷ gross margin) is the floor. Target ROAS is the line you actually steer toward. Anything in between is profitable but below goal — useful context when deciding whether to keep, tune, or scale a campaign.',
      'A higher target profit margin demands a higher ROAS, which is harder to scale. Most operators pick a realistic profit target (15–25%) so they can push volume, rather than chasing a high-margin number that caps spend.',
    ],
    faqs: [
      { q: 'What is target ROAS?', a: 'Target ROAS is the return on ad spend you need to reach a specific profit goal, not just to break even. It equals 1 ÷ (Gross Margin − Target Net Profit Margin).' },
      { q: 'How is target ROAS different from break-even ROAS?', a: 'Break-even ROAS only covers your costs (1 ÷ gross margin). Target ROAS builds in the profit you want to keep, so it is always a higher number than break-even.' },
      { q: 'What is a realistic target ROAS?', a: 'It depends on margin. At a 70% gross margin, a 20% net profit goal needs a 2× ROAS. Chasing very high profit margins forces a high ROAS that is hard to scale.' },
      { q: 'Should I optimise campaigns to break-even or target ROAS?', a: 'Use break-even ROAS as your kill line and target ROAS as your goal. Between the two you are profitable but below target — a signal to improve creative or offer rather than kill.' },
    ],
    related: [
      { href: '/tools/break-even-roas-calculator', label: 'Find your break-even ROAS first →' },
      { href: '/tools/dropshipping-profit-calculator', label: 'Turn ROAS into net profit per order →' },
      { href: '/course/kill-or-scale', label: 'How ROAS drives kill/scale decisions →' },
      { href: '/glossary/roas', label: 'Read the full ROAS definition →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Target ROAS calculation', 'Break-even ROAS', 'Max ad spend per sale', 'Profit-goal based', 'Free, no signup'],
    datePublished: '2026-02-08',
  },

  // ── 8. Break-Even CPA Calculator ─────────────────────────────────────────
  {
    slug: 'break-even-cpa-calculator',
    category: 'Ad Metrics',
    emoji: '🎚️',
    navName: 'Break-Even CPA Calculator',
    navDesc: 'The most you can pay per sale before you lose money',
    metaTitle: 'Break-Even CPA Calculator — Free Max Cost Per Acquisition Tool',
    metaDescription:
      'Free break-even CPA calculator. Enter price, product cost, and fees to find the maximum cost per acquisition you can pay before a sale loses money. No signup.',
    keyword: 'break even cpa calculator',
    h1: 'Break-Even CPA Calculator',
    intro:
      'Your break-even CPA is the ceiling on what you can pay for a customer. Enter your price and costs to find it — then keep your actual cost per purchase comfortably below it.',
    steps: [
      { name: 'Enter your selling price', text: 'The price the customer pays at checkout.' },
      { name: 'Enter product + shipping cost', text: 'Your total landed cost from the supplier.' },
      { name: 'Enter payment fees', text: 'Your processor fee as a percentage, usually around 2.9%.' },
      { name: 'Read your break-even CPA', text: 'The calculator shows the max CPA to break even, plus the CPA that still leaves a 20% net margin.' },
    ],
    body: [
      'Break-even CPA equals your gross profit per order: Selling Price − Product/Shipping Cost − Payment Fees. If you pay exactly that to acquire a customer, you make zero. Pay more and every sale loses money, no matter how good the revenue looks.',
      'This is the single most useful guardrail in a kill/scale decision. Watch your cost per purchase in Ads Manager against this number: comfortably below it means scale, hovering at it means tune, consistently above it means kill.',
      'To give yourself a profit cushion, target a CPA below break-even by your desired margin. The calculator also shows the CPA that preserves a 20% net margin so you have a working target, not just a ceiling.',
    ],
    faqs: [
      { q: 'How do you calculate break-even CPA?', a: 'Break-even CPA = Selling Price − Product/Shipping Cost − Payment Fees. It equals your gross profit per order — the most you can pay for a sale before losing money.' },
      { q: 'What is the difference between CPA and break-even CPA?', a: 'CPA is what you actually pay to acquire a customer. Break-even CPA is the maximum you can pay before a sale becomes unprofitable. Stay below it to make money.' },
      { q: 'How does break-even CPA relate to ROAS?', a: 'They are two views of the same limit. Break-even CPA is a dollar amount per sale; break-even ROAS is the revenue-to-spend ratio. Both tell you when an ad stops being profitable.' },
      { q: 'What CPA should I aim for?', a: 'Aim below break-even by your target margin. If your break-even CPA is $30 and you want a 20% net margin on a $50 product, target a CPA around $20.' },
    ],
    related: [
      { href: '/tools/break-even-roas-calculator', label: 'See the same limit as a ROAS →' },
      { href: '/tools/dropshipping-profit-calculator', label: 'Model net profit at your real CPA →' },
      { href: '/course/kill-or-scale', label: 'Use CPA in kill/scale decisions →' },
      { href: '/glossary/cpa', label: 'Read the full CPA definition →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Break-even CPA', 'CPA for 20% margin', 'Gross profit per order', 'Custom fees', 'Free, no signup'],
    datePublished: '2026-02-08',
  },

  // ── 9. CPM / CTR / CPC Calculator ────────────────────────────────────────
  {
    slug: 'cpm-calculator',
    category: 'Ad Metrics',
    emoji: '📊',
    navName: 'CPM / CPC / CTR Calculator',
    navDesc: 'Turn spend, impressions, and clicks into CPM, CPC, and CTR',
    metaTitle: 'CPM Calculator — Free CPM, CPC & CTR Tool for Meta Ads',
    metaDescription:
      'Free CPM calculator for Meta and TikTok ads. Enter spend, impressions, and clicks to get CPM, CPC, and CTR instantly. Built for dropshipping ad analysis. No signup.',
    keyword: 'cpm calculator',
    h1: 'CPM, CPC & CTR Calculator',
    intro:
      'Enter your ad spend, impressions, and clicks to get CPM, CPC, and CTR in one view. These three numbers tell you whether your creative or your audience is the problem.',
    steps: [
      { name: 'Enter your ad spend', text: 'Total spend on the ad or campaign for the period.' },
      { name: 'Enter impressions', text: 'How many times the ad was shown.' },
      { name: 'Optional: enter link clicks', text: 'Add clicks to also get your CPC and CTR.' },
      { name: 'Read your metrics', text: 'The calculator shows CPM, and if you added clicks, CPC and CTR too.' },
    ],
    body: [
      'CPM is cost per 1,000 impressions: Spend ÷ Impressions × 1,000. It is what Meta charges to put your ad in front of people, driven by your niche, audience, time of year, and — critically — your creative quality.',
      'CPM, CTR, and CPC move together. A stronger hook lifts CTR (more people click), which Meta rewards with a lower CPM, which lowers your CPC. So a "high CPM problem" is usually a creative problem in disguise — fix the hook before blaming the audience.',
      'Read these alongside your downstream numbers. Cheap clicks that never convert are not a win; expensive clicks that buy are fine. CPM/CPC/CTR diagnose the top of the funnel — CPA and ROAS tell you if it actually made money.',
    ],
    faqs: [
      { q: 'How do you calculate CPM?', a: 'CPM = Ad Spend ÷ Impressions × 1,000. If you spend $100 for 12,000 impressions, your CPM is (100 ÷ 12,000) × 1,000 = $8.33.' },
      { q: 'What is a good CPM for dropshipping?', a: 'CPMs vary widely by niche, country, and season (Q4 spikes 40–100%). Rather than chase a benchmark, lower your own CPM by improving creative — a higher CTR pulls CPM down.' },
      { q: 'How are CPM, CPC, and CTR related?', a: 'A higher CTR signals relevance, so Meta lowers your CPM, which lowers CPC. Improving the hook in your creative usually improves all three at once.' },
      { q: 'Is a low CPM always good?', a: 'No. Cheap impressions that never convert lose money. Use CPM/CPC/CTR to diagnose the funnel top, but judge profitability by CPA and ROAS.' },
    ],
    related: [
      { href: '/tools/break-even-cpa-calculator', label: 'Find the CPA those clicks need to hit →' },
      { href: '/course/read-your-data', label: 'How to read your Meta ad metrics →' },
      { href: '/glossary/cpm', label: 'Read the full CPM definition →' },
    ],
    offer: LUXURY_OFFER,
    features: ['CPM calculation', 'CPC calculation', 'CTR calculation', 'Single-view ad metrics', 'Free, no signup'],
    datePublished: '2026-02-08',
  },

  // ── 10. Ad Testing Budget Calculator ─────────────────────────────────────
  {
    slug: 'ad-testing-budget-calculator',
    category: 'Ad Metrics',
    emoji: '🧪',
    navName: 'Ad Testing Budget Calculator',
    navDesc: 'How much you need to test products fairly on Meta',
    metaTitle: 'Dropshipping Ad Budget Calculator — Free Testing Budget Tool',
    metaDescription:
      'Free dropshipping ad budget calculator. Enter products, daily budget, and test length to see your total testing budget and runway before you start spending. No signup.',
    keyword: 'dropshipping ad budget calculator',
    h1: 'Ad Testing Budget Calculator',
    intro:
      'Answer "how much do I need to start?" with a real number. Enter how many products you want to test, your daily budget, and the test length to see the total budget and runway.',
    steps: [
      { name: 'Enter products to test', text: 'How many products you plan to test in this round.' },
      { name: 'Enter daily budget per product', text: 'What you will spend per product per day — often $20–$50 for a fair test.' },
      { name: 'Enter test length', text: 'How many days each product runs before you judge it — usually 3 days minimum.' },
      { name: 'Read your budget', text: 'The calculator shows the total test budget, the spend per product, and your daily burn.' },
    ],
    body: [
      'Testing budget is simply Products × Daily Budget × Days. The point of the calculator is to set expectations: testing costs real money, and most of the products you test will fail. That is the cost of buying data, not a sign you did something wrong.',
      'A fair test usually needs about 3 days and enough daily budget to exit the learning phase — commonly $20–$50 per product per day depending on price point. Underfunding a test gives you noisy data and false negatives; you kill products that might have worked.',
      'Treat this total as risk capital you are prepared to lose. If the number is uncomfortable, test fewer products at once rather than starving each one — three well-funded tests beat ten underfunded ones.',
    ],
    faqs: [
      { q: 'How much money do I need to start dropshipping ads?', a: 'Multiply products × daily budget × test days. Testing three products at $20/day for 3 days is $180. Budget it as risk capital — most tests fail, and that is expected.' },
      { q: 'How much should I spend testing one product?', a: 'A common fair test is $20–$50 per day for about 3 days, enough to exit the learning phase and gather real data. Underfunding produces noisy results and false negatives.' },
      { q: 'How long should I test a product before killing it?', a: 'Usually at least 3 days at adequate budget, judged against your break-even CPA. Killing too early on too little spend throws away products that might have worked.' },
      { q: 'Should I test many products at once or a few?', a: 'A few, well-funded. Three properly-funded tests beat ten starved ones — spreading a small budget too thin gives every product a bad, inconclusive test.' },
    ],
    related: [
      { href: '/tools/break-even-cpa-calculator', label: 'Set the CPA your tests must beat →' },
      { href: '/course/set-up-your-campaign', label: 'How to structure a test campaign →' },
      { href: '/course/kill-or-scale', label: 'When to kill or scale a test →' },
      { href: '/glossary/cpa', label: 'What is CPA? →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Total test budget', 'Per-product budget', 'Daily spend', 'Test-runway planning', 'Free, no signup'],
    datePublished: '2026-02-08',
  },

  // ── 11. Customer Lifetime Value (LTV) Calculator ─────────────────────────
  {
    slug: 'customer-lifetime-value-calculator',
    category: 'Growth & Retention',
    emoji: '♻️',
    navName: 'Customer LTV Calculator',
    navDesc: 'Lifetime value + the max you can afford to acquire a customer',
    metaTitle: 'Customer Lifetime Value (LTV) Calculator — Free Ecommerce Tool',
    metaDescription:
      'Free customer lifetime value calculator. Enter AOV, margin, purchase frequency, and lifespan to get LTV, lifetime profit, and your maximum CAC. No signup required.',
    keyword: 'customer lifetime value calculator',
    h1: 'Customer Lifetime Value Calculator',
    intro:
      'Enter your AOV, margin, how often customers buy, and how long they stay to get lifetime value and the most you can afford to spend acquiring one. LTV is the number that lets brands outspend dropshippers.',
    steps: [
      { name: 'Enter your average order value', text: 'What a customer spends per order on average.' },
      { name: 'Enter your gross margin', text: 'Your product gross margin as a percentage.' },
      { name: 'Enter purchases per year', text: 'How many times an average customer buys in a year.' },
      { name: 'Enter customer lifespan', text: 'How many years an average customer keeps buying.' },
      { name: 'Read your LTV', text: 'The calculator shows lifetime value, lifetime profit, and your maximum sustainable CAC.' },
    ],
    body: [
      'Lifetime value is AOV × purchases per year × lifespan. Multiply by margin and you get lifetime profit — the real money a customer represents. Most dropshippers optimise only the first order and leave the bulk of that profit on the table.',
      'LTV sets your maximum CAC. If a customer is worth $90 in profit over two years, you can spend far more than first-order margin to acquire them and still win — as long as you have the cash flow to wait for the back-end revenue.',
      'The levers that raise LTV are retention levers: post-purchase email flows, a second-product offer, subscriptions, and loyalty. A small lift in repeat rate compounds across every customer you have already paid to acquire.',
    ],
    faqs: [
      { q: 'How do you calculate customer lifetime value?', a: 'LTV = Average Order Value × Purchases per Year × Customer Lifespan (years). Multiply by gross margin to get lifetime profit per customer.' },
      { q: 'Why does LTV matter for dropshipping?', a: 'LTV sets the ceiling on what you can pay to acquire a customer. A higher LTV lets you outbid competitors for the same customer and still be profitable across the relationship.' },
      { q: 'What is the difference between LTV and AOV?', a: 'AOV is the value of a single order; LTV is the total value of a customer across all their orders over time. LTV captures repeat purchases, AOV does not.' },
      { q: 'How do I increase customer lifetime value?', a: 'Increase repeat purchase rate and AOV: post-purchase email flows, complementary second-product offers, subscriptions, and loyalty incentives all raise LTV from customers you already paid to acquire.' },
    ],
    related: [
      { href: '/tools/average-order-value-calculator', label: 'Raise the AOV that feeds LTV →' },
      { href: '/tools/break-even-roas-calculator', label: 'See how LTV changes what you can spend →' },
      { href: '/glossary/ltv', label: 'Read the full LTV definition →' },
      { href: '/glossary/cac', label: 'What is CAC? →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Lifetime value', 'Lifetime profit', 'Maximum CAC', 'Margin-aware', 'Free, no signup'],
    datePublished: '2026-02-15',
  },

  // ── 12. Ecommerce Cash-Flow Calculator ───────────────────────────────────
  {
    slug: 'ecommerce-cash-flow-calculator',
    category: 'Growth & Retention',
    emoji: '🏦',
    navName: 'Cash-Flow Gap Calculator',
    navDesc: 'The working capital you need to bridge the payout delay',
    metaTitle: 'Ecommerce Cash Flow Calculator — Free Working Capital Tool',
    metaDescription:
      'Free ecommerce cash flow calculator. Enter daily ad spend, product cost, and payout delay to see the working capital you need to bridge the gap. No signup required.',
    keyword: 'ecommerce cash flow calculator',
    h1: 'Ecommerce Cash-Flow Calculator',
    intro:
      'You pay for ads and product today, but processor payouts arrive days later. Enter your numbers to see how much working capital you need to survive that gap — the math that quietly kills profitable stores.',
    steps: [
      { name: 'Enter daily ad spend', text: 'What you spend on ads per day at your current volume.' },
      { name: 'Enter daily product + shipping cost', text: 'Your daily landed product cost at that volume.' },
      { name: 'Enter your payout delay', text: 'How many days your processor (Shopify Payments, Stripe, PayPal) holds funds before paying out.' },
      { name: 'Read your working capital', text: 'The calculator shows the buffer you need to bridge the gap between spending and getting paid.' },
    ],
    body: [
      'The cash-flow gap is simple and brutal: you fund ads and inventory daily, but payment processors pay out on a delay — often several days, longer with rolling reserves. The faster you grow, the bigger the float you have to carry.',
      'Working capital needed is roughly (daily ad spend + daily product cost) × payout delay. A store spending $200/day on ads and $120/day on product with a 5-day delay needs about $1,600 of cash just to keep the lights on while it waits to get paid.',
      'This is why stores that look profitable on a spreadsheet still run out of money. Scaling multiplies the gap. Plan the buffer before you scale, keep a reserve, and understand your processor\u2019s payout schedule and reserve policy.',
    ],
    faqs: [
      { q: 'How do you calculate ecommerce cash flow needs?', a: 'A working estimate is (Daily Ad Spend + Daily Product Cost) × Payout Delay in days. That is the cash you must float between paying for ads/product and receiving processor payouts.' },
      { q: 'Why do profitable stores run out of cash?', a: 'Because spending happens daily while payouts arrive on a delay. As you scale, the gap between cash out and cash in grows faster than profit, and an undercapitalised store stalls.' },
      { q: 'What is a payout delay?', a: 'The time between a customer paying and the funds landing in your bank. Shopify Payments, Stripe, and PayPal each hold funds for a period, sometimes extended by a rolling reserve.' },
      { q: 'How can I reduce my cash-flow gap?', a: 'Scale budget gradually, keep a working-capital reserve, negotiate faster payouts, and watch for rolling reserves. Do not let daily spend outrun the cash you have on hand.' },
    ],
    related: [
      { href: '/course/cash-flow', label: 'The full cash-flow module →' },
      { href: '/tools/dropshipping-scaling-calculator', label: 'See how scaling widens the gap →' },
      { href: '/tools/dropshipping-profit-calculator', label: 'Check the profit funding your float →' },
      { href: '/glossary/cac', label: 'What is CAC? →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Working capital needed', 'Daily cash out', 'Payout-gap float', 'Scaling-aware', 'Free, no signup'],
    datePublished: '2026-02-15',
  },

  // ── 13. Dropshipping Scaling Calculator ──────────────────────────────────
  {
    slug: 'dropshipping-scaling-calculator',
    category: 'Growth & Retention',
    emoji: '🌊',
    navName: 'Scaling Projection Calculator',
    navDesc: 'Project revenue as you push budget — with a ROAS reality check',
    metaTitle: 'Dropshipping Scaling Calculator — Free Revenue Projection Tool',
    metaDescription:
      'Free dropshipping scaling calculator. Enter current spend, ROAS, and target budget to project daily and monthly revenue at scale — with a realistic ROAS caveat.',
    keyword: 'dropshipping scaling calculator',
    h1: 'Scaling Projection Calculator',
    intro:
      'See what your revenue could look like as you push ad budget. Enter your current spend and ROAS plus a target budget, and get projected daily and monthly revenue — with a built-in reality check.',
    steps: [
      { name: 'Enter current daily ad spend', text: 'What you spend per day right now.' },
      { name: 'Enter your current ROAS', text: 'Your current return on ad spend at that budget.' },
      { name: 'Enter your target daily budget', text: 'The daily spend you want to scale up to.' },
      { name: 'Read your projection', text: 'The calculator shows projected daily and monthly revenue at the new budget, plus your current monthly revenue.' },
    ],
    body: [
      'The projection is straightforward: target daily spend × ROAS × 30 gives projected monthly revenue. It is useful for setting goals and seeing what a budget increase could mean — if your ROAS held perfectly.',
      'It almost never does. As you raise budget, Meta reaches less-qualified audiences and ROAS typically dips. That is why the calculator labels the projection a ceiling, not a forecast. Real scaling protects ROAS as much as it chases revenue.',
      '"Surf scaling" is the practical method: raise budget in measured steps (often 20–30% at a time), let performance stabilise, then push again — rather than 5×-ing budget overnight and torching your ROAS. Use this projection as the target, and step toward it.',
    ],
    faqs: [
      { q: 'How do you project revenue when scaling ads?', a: 'Projected monthly revenue = Target Daily Spend × ROAS × 30. It assumes your ROAS holds, which is optimistic — treat the result as a ceiling, not a guarantee.' },
      { q: 'Does ROAS stay the same when you scale?', a: 'Usually not. Higher budgets reach broader, less-qualified audiences, so ROAS tends to decline as you scale. Plan for some drop and protect profitability as you grow.' },
      { q: 'What is surf scaling?', a: 'Raising ad budget in measured steps — often 20–30% at a time — then letting performance stabilise before pushing again, instead of increasing budget dramatically overnight.' },
      { q: 'How fast should I scale my budget?', a: 'Gradually. Sudden large budget jumps reset the learning phase and can crater ROAS. Step increases let the algorithm and your ROAS adjust.' },
    ],
    related: [
      { href: '/course/scale-your-ads', label: 'The full surf-scaling module →' },
      { href: '/tools/ecommerce-cash-flow-calculator', label: 'Check the cash flow scaling demands →' },
      { href: '/tools/target-roas-calculator', label: 'Hold a profitable ROAS as you scale →' },
      { href: '/glossary/roas', label: 'Read the full ROAS definition →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Projected daily revenue', 'Projected monthly revenue', 'Current vs scaled', 'ROAS reality check', 'Free, no signup'],
    datePublished: '2026-02-15',
  },

  // ── 6. Average Order Value Calculator ────────────────────────────────────
  {
    slug: 'average-order-value-calculator',
    category: 'Growth & Retention',
    emoji: '🧺',
    navName: 'Average Order Value Calculator',
    navDesc: 'AOV from revenue + orders, and the lift from an upsell',
    metaTitle: 'Average Order Value (AOV) Calculator — Free Ecommerce Tool',
    metaDescription:
      'Free average order value calculator. Enter revenue and orders to get your AOV, then model the lift from an upsell or bundle. Built for dropshipping. No signup.',
    keyword: 'average order value calculator',
    h1: 'Average Order Value Calculator',
    intro:
      'Enter revenue and order count to get your average order value, then see how a bundle or upsell changes it. Raising AOV is the cheapest profit lever you have, because the ad cost is already paid.',
    steps: [
      { name: 'Enter total revenue', text: 'Total store revenue for the period.' },
      { name: 'Enter total orders', text: 'Number of orders in the same period.' },
      { name: 'Optional: enter an upsell amount', text: 'Add a planned bundle or post-purchase upsell value to model the new AOV.' },
      { name: 'Read your AOV', text: 'The calculator shows current AOV, AOV with the upsell, and the extra revenue per 100 orders.' },
    ],
    body: [
      'Average order value is total revenue ÷ total orders. It tells you how much each customer spends per purchase, and it is one of only three ways to grow revenue (the others being more traffic and higher conversion).',
      'AOV is special because lifting it is nearly free profit. You already paid to acquire the customer, so every extra dollar they spend at checkout drops almost straight to the bottom line — it does not carry its own ad cost.',
      'The usual levers are volume discounts ("buy 2, save 15%"), bundles, free-shipping thresholds set just above your current AOV, and a single one-click post-purchase upsell. Even a $10 bump on a $40 AOV is a 25% revenue increase with no extra ad spend.',
    ],
    faqs: [
      { q: 'How do you calculate average order value?', a: 'AOV = Total Revenue ÷ Total Orders. If you made $9,800 across 200 orders, your AOV is $49.' },
      { q: 'Why does AOV matter so much?', a: 'Because raising it is almost pure profit. The customer is already acquired, so extra spend at checkout carries no additional ad cost — it goes nearly straight to your margin.' },
      { q: 'How do I increase average order value?', a: 'Use bundles, volume discounts, free-shipping thresholds set just above your current AOV, and a single post-purchase upsell. Each adds revenue per order without adding ad spend.' },
      { q: 'How does AOV affect break-even ROAS?', a: 'A higher AOV with the same margin percentage means more gross profit per order, which lowers the ROAS you need to break even and gives you more room to scale.' },
    ],
    related: [
      { href: '/course/improve-your-offer', label: 'Offer engineering that raises AOV →' },
      { href: '/tools/conversion-rate-calculator', label: 'Pair AOV with conversion rate →' },
      { href: '/tools/break-even-roas-calculator', label: 'See how AOV changes break-even ROAS →' },
      { href: '/glossary/aov', label: 'Read the full AOV definition →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Average order value', 'AOV with upsell', 'Extra revenue per 100 orders', 'Bundle modelling', 'Free, no signup'],
    datePublished: '2026-02-01',
  },

  // ── 14. Winning Product Scorecard ────────────────────────────────────────
  {
    slug: 'winning-product-scorecard',
    category: 'Quick Tools',
    emoji: '✅',
    widget: 'scorecard',
    navName: 'Winning Product Scorecard',
    navDesc: 'Score any product against the 5 criteria before you test',
    metaTitle: 'Winning Product Scorecard — Free Dropshipping Product Checklist',
    metaDescription:
      'Free winning product scorecard for dropshipping. Score any product against the 5 criteria that predict a winner before you spend on ads. Interactive, no signup.',
    keyword: 'winning product checklist',
    h1: 'Winning Product Scorecard',
    intro:
      'Score any product against the five criteria that separate winners from money-pits — before you spend a dollar testing. Tick what the product genuinely hits and get an instant verdict.',
    steps: [
      { name: 'Check each criterion honestly', text: 'Only tick a box if the product genuinely meets it — be strict, most products should fail.' },
      { name: 'Read your score', text: 'The scorecard tallies how many of the five criteria the product hits.' },
      { name: 'Act on the verdict', text: 'Four or five is worth testing; three or fewer means keep researching or fix the gaps first.' },
    ],
    body: [
      'A winning product is not a lucky guess — it fits a pattern. The five criteria here come straight from the product research and validation modules: existing demand, a specific visible problem, healthy sourcing margin, proof via ads running 30+ days, and a scroll-stopping wow factor.',
      'The point of scoring is discipline. Most products you look at should fail this test, and that is correct — testing is expensive, and a strict filter is what stops you from burning budget on products that were never going to work.',
      'Treat a high score as permission to validate further, not a guarantee. Four or five out of five means shortlist it and move to full validation; three or fewer means either keep looking or fix the missing criterion before you spend.',
    ],
    faqs: [
      { q: 'What makes a winning dropshipping product?', a: 'A product that fills existing demand, solves a specific visible problem, can be sourced at roughly 25% of its sell price, is proven by competitor ads running 30+ days, and has a scroll-stopping wow factor.' },
      { q: 'How many criteria should a product hit before I test it?', a: 'Aim for four or five of five. Three or fewer means there are real gaps — keep researching or fix the missing criteria (angle, sourcing, or offer) before spending on ads.' },
      { q: 'Why should most products fail this scorecard?', a: 'Because testing costs money. A strict filter is what keeps you from wasting budget on weak products. Rejecting most of what you see is a sign the filter is working.' },
      { q: 'Is a high score a guarantee the product will win?', a: 'No. It means the product is worth validating and testing, not that it will succeed. The scorecard improves your odds; the market still decides.' },
    ],
    related: [
      { href: '/course/find-winning-products', label: 'How to find products to score →' },
      { href: '/course/validate-the-product', label: 'Full product validation →' },
      { href: '/tools/break-even-roas-calculator', label: 'Check the margins once it passes →' },
      { href: '/tools/profit-margin-calculator', label: 'Confirm the sourcing margin →' },
    ],
    offer: LUXURY_OFFER,
    features: ['5-criteria scoring', 'Instant verdict', 'Course-aligned criteria', 'Interactive', 'Free, no signup'],
    datePublished: '2026-02-22',
  },

  // ── 15. UTM Builder ──────────────────────────────────────────────────────
  {
    slug: 'utm-builder',
    category: 'Quick Tools',
    emoji: '🔗',
    widget: 'utm',
    navName: 'UTM Link Builder',
    navDesc: 'Build tagged tracking URLs for your ads and campaigns',
    metaTitle: 'UTM Builder — Free Campaign URL Tracking Link Generator',
    metaDescription:
      'Free UTM builder. Generate tagged tracking URLs for your ads and campaigns with utm_source, medium, campaign, term, and content. Runs in your browser. No signup.',
    keyword: 'utm builder',
    h1: 'UTM Link Builder',
    intro:
      'Build clean, tagged tracking URLs so your analytics can tell exactly which ad, campaign, or post drove a sale. Fill in the fields and copy the link — everything runs in your browser.',
    steps: [
      { name: 'Enter your destination URL', text: 'The page you want visitors to land on — usually a product or collection page.' },
      { name: 'Add source, medium, and campaign', text: 'For example facebook / paid_social / spring_launch. These are the core required tags.' },
      { name: 'Optionally add term and content', text: 'Use utm_term and utm_content to distinguish audiences or specific creatives.' },
      { name: 'Copy your tagged URL', text: 'Copy the generated link and use it as the destination in your ad or post.' },
    ],
    body: [
      'UTM parameters are tags added to the end of a URL that tell analytics tools where a visitor came from. They turn a vague "social" bucket into precise attribution: this exact campaign, this exact creative, this exact audience.',
      'The three required tags are source (where the traffic comes from, e.g. facebook), medium (the type, e.g. paid_social), and campaign (your campaign name). Optional term and content let you split out audiences and individual ad creatives.',
      'Keep your tags consistent and lowercase — analytics treats Facebook and facebook as two different sources. Pick a naming convention and stick to it so your reports stay clean as you scale.',
    ],
    faqs: [
      { q: 'What is a UTM parameter?', a: 'A UTM parameter is a tag added to a URL (like utm_source=facebook) that tells analytics tools where a visitor came from, so you can attribute sales to specific campaigns and creatives.' },
      { q: 'Which UTM parameters are required?', a: 'utm_source, utm_medium, and utm_campaign are the core three. utm_term and utm_content are optional, used to distinguish audiences and individual ad creatives.' },
      { q: 'Do UTM tags affect SEO?', a: 'Used on ad and campaign links they are fine. Avoid putting UTM tags on internal site links, and use canonical tags so search engines do not treat tagged URLs as duplicate pages.' },
      { q: 'Why should I keep UTM tags lowercase?', a: 'Analytics tools are case-sensitive, so Facebook and facebook register as different sources. A consistent lowercase convention keeps your reporting clean.' },
    ],
    related: [
      { href: '/course/read-your-data', label: 'How to read your campaign data →' },
      { href: '/course/set-up-your-campaign', label: 'Set up the campaigns you are tracking →' },
      { href: '/tools/cpm-calculator', label: 'Analyse the metrics on those clicks →' },
    ],
    offer: LUXURY_OFFER,
    features: ['utm_source / medium / campaign', 'Optional term + content', 'One-click copy', 'Runs in-browser', 'Free, no signup'],
    datePublished: '2026-02-22',
  },

  // ── 16. Sales Tax Calculator ─────────────────────────────────────────────
  {
    slug: 'sales-tax-calculator',
    category: 'Profit & Pricing',
    emoji: '🧮',
    navName: 'Sales Tax Calculator',
    navDesc: 'Tax and total on an order at any rate',
    metaTitle: 'Sales Tax Calculator — Free Ecommerce Sales Tax & VAT Tool',
    metaDescription:
      'Free sales tax calculator for ecommerce. Enter an order subtotal and tax rate to get the tax, the total with tax added, and the tax inside a tax-included price.',
    keyword: 'sales tax calculator ecommerce',
    h1: 'Sales Tax Calculator',
    intro:
      'Enter an order subtotal and a tax rate to get the tax owed, the total with tax added, and how much tax is baked into a tax-inclusive price. Useful for pricing, checkout, and bookkeeping.',
    steps: [
      { name: 'Enter the order subtotal', text: 'The pre-tax amount of the order.' },
      { name: 'Enter the sales tax or VAT rate', text: 'Your applicable rate as a percentage — it varies by state or country.' },
      { name: 'Read your numbers', text: 'The calculator shows the tax, the total with tax added, and the tax portion of a tax-included price.' },
    ],
    body: [
      'Sales tax (or VAT) is added to the order subtotal at checkout: Tax = Subtotal × Rate. In the US, rates vary by state and locality; in much of the world, a single VAT rate applies and is often shown tax-inclusive.',
      'Whether you collect tax depends on nexus — a connection to a jurisdiction (often based on where you, your customers, or your sales volume are). This calculator handles the math; your obligations depend on your situation, so confirm them or check with an accountant.',
      'The third output is handy for tax-inclusive pricing common outside the US: it extracts how much of a displayed price is tax, so you can see your true pre-tax revenue.',
    ],
    faqs: [
      { q: 'How do you calculate sales tax?', a: 'Sales Tax = Order Subtotal × Tax Rate. For a $49 order at 8.25%, the tax is 49 × 0.0825 = $4.04, for a total of $53.04.' },
      { q: 'Do I need to charge sales tax on my store?', a: 'It depends on nexus — your connection to a jurisdiction, often based on location or sales volume. The math is simple; the obligation varies, so confirm your specific situation.' },
      { q: 'What is the difference between sales tax and VAT?', a: 'Sales tax (common in the US) is added at checkout and varies by state/locality. VAT (common elsewhere) is usually a single rate often shown tax-inclusive in the displayed price.' },
      { q: 'How do I find the tax inside a tax-included price?', a: 'Divide the price by (1 + rate), then subtract from the price. The calculator does this automatically in the third result so you can see your pre-tax revenue.' },
    ],
    related: [
      { href: '/tools/product-pricing-calculator', label: 'Price your product before tax →' },
      { href: '/tools/shopify-fee-calculator', label: 'See payment fees on the order too →' },
      { href: '/course/legal-tax-business', label: 'Business, legal & tax basics →' },
      { href: '/tools/profit-margin-calculator', label: 'Check your margin →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Tax amount', 'Total with tax', 'Tax-inclusive extraction', 'Any rate', 'Free, no signup'],
    datePublished: '2026-02-22',
  },

  // ── 17. Niche Idea Generator ─────────────────────────────────────────────
  {
    slug: 'niche-idea-generator',
    category: 'Quick Tools',
    emoji: '💡',
    widget: 'niche',
    navName: 'Niche Idea Generator',
    navDesc: 'Filter a curated list of niche angles by margin & saturation',
    metaTitle: 'Dropshipping Niche Ideas — Free Niche Idea Generator',
    metaDescription:
      'Free dropshipping niche idea generator. Filter a curated list of niche angles by margin potential, saturation, and evergreen demand to find a starting point. No signup.',
    keyword: 'dropshipping niche ideas',
    h1: 'Dropshipping Niche Idea Generator',
    intro:
      'Stuck on what to sell? Filter a curated list of niche angles by margin potential, saturation, and evergreen demand to get a shortlist worth researching. A starting point, not a shortcut.',
    steps: [
      { name: 'Set your filters', text: 'Choose a minimum margin potential, a maximum saturation, and whether you only want evergreen niches.' },
      { name: 'Review the shortlist', text: 'The generator shows niche angles that match, each with a margin and saturation read.' },
      { name: 'Regenerate for more', text: 'Hit regenerate to reshuffle the matching ideas and surface different angles.' },
      { name: 'Validate before committing', text: 'Take any niche you like into real product research and competitor-ad checks.' },
    ],
    body: [
      'A niche is not just a category — it is an audience with a shared problem you can speak to. The strongest dropshipping niches combine real, ongoing demand with a specific problem, healthy margins, and room for a fresh angle.',
      'This generator is a discovery aid, not an oracle. The margin and saturation reads are general guidance to help you filter; they are not guarantees. Lower-saturation, higher-margin niches are usually friendlier to a beginner, but every one still has to be validated.',
      'Once a niche catches your eye, the real work starts: find specific products inside it that fill existing demand, confirm competitors are running ads, and check you can source at a margin that survives paid traffic. Use the scorecard and validation module next.',
    ],
    faqs: [
      { q: 'What is a good dropshipping niche?', a: 'One with ongoing demand, a specific solvable problem, margins healthy enough for paid ads, and room for a fresh angle. Lower-saturation, higher-margin niches are usually friendlier for beginners.' },
      { q: 'How do I pick a niche to start dropshipping?', a: 'Filter for real, ideally evergreen demand and a healthy margin, then validate specific products inside the niche against live competitor ads before committing.' },
      { q: 'Are these niche ideas guaranteed to work?', a: 'No. They are starting points to research, not guarantees. Every niche still has to pass product validation — real demand, proof via running ads, and sourceable margins.' },
      { q: 'Should beginners avoid saturated niches?', a: 'Not entirely — saturation is also validation. But a beginner usually has an easier time in a lower-saturation niche with a fresh angle than fighting established players head-on.' },
    ],
    related: [
      { href: '/course/pick-your-niche', label: 'How to choose a niche →' },
      { href: '/tools/winning-product-scorecard', label: 'Score products inside your niche →' },
      { href: '/course/find-winning-products', label: 'Find products to validate →' },
      { href: '/tools/profit-margin-calculator', label: 'Check the margins →' },
    ],
    offer: LUXURY_OFFER,
    features: ['Curated niche angles', 'Filter by margin & saturation', 'Evergreen filter', 'Regenerate', 'Free, no signup'],
    datePublished: '2026-02-22',
  },
];

// ── lookups + helpers ───────────────────────────────────────────────────────
export const toolsBySlug: Record<string, ToolData> = Object.fromEntries(
  toolsData.map((t) => [t.slug, t])
);

export const toolCategories: ToolCategory[] = ['Profit & Pricing', 'Ad Metrics', 'Growth & Retention', 'Quick Tools'];

export function toolUrl(slug: string) {
  return `${SITE}/tools/${slug}`;
}

export { SITE as TOOLS_SITE };
