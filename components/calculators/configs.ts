/**
 * Calculator configs — fields + formulas for every free tool.
 *
 * Keyed by the slug used in the page route (app/tools/[tool]) and the SEO
 * content registry (data/toolsData.ts). Adding a new calculator = add one
 * entry here + one entry in toolsData.ts; the dynamic route + hub pick it up.
 *
 * Pure client module (imported by components/Calculator.tsx). No formula
 * invents new claims — they restate the same math taught in the course
 * (margin, break-even, ROAS, AOV, LTV, etc.).
 */

export type Vals = Record<string, number>;
export type Tone = 'good' | 'warn' | 'bad' | 'neutral';

export interface Field {
  id: string;
  label: string;
  prefix?: '$';
  suffix?: '%';
  placeholder?: string;
  default?: number;
  step?: number;
  hint?: string;
}

export interface Output {
  label: string;
  get: (v: Vals) => string;
  tone?: (v: Vals) => Tone;
  primary?: boolean;
}

export interface CalcConfig {
  fields: Field[];
  ready: (v: Vals) => boolean;
  outputs: Output[];
  note?: (v: Vals) => string;
}

// ── formatting helpers ──────────────────────────────────────────────────────
const money = (n: number) =>
  '$' + (Math.abs(n) >= 1000 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : n.toFixed(2));
const pct = (n: number) => `${n.toFixed(1)}%`;
const x = (n: number) => `${n.toFixed(2)}×`;

export const calcConfigs: Record<string, CalcConfig> = {
  // ── 1. Profit Margin Calculator ──────────────────────────────────────────
  'profit-margin-calculator': {
    fields: [
      { id: 'cost', label: 'Product Cost', prefix: '$', placeholder: 'e.g. 14' },
      { id: 'price', label: 'Selling Price', prefix: '$', placeholder: 'e.g. 49' },
    ],
    ready: (v) => v.price > 0 && v.cost >= 0,
    outputs: [
      {
        label: 'Profit Margin',
        get: (v) => pct(((v.price - v.cost) / v.price) * 100),
        tone: (v) => {
          const m = ((v.price - v.cost) / v.price) * 100;
          return m >= 65 ? 'good' : m >= 40 ? 'warn' : 'bad';
        },
      },
      { label: 'Markup', get: (v) => (v.cost > 0 ? pct(((v.price - v.cost) / v.cost) * 100) : '—'), primary: false },
      { label: 'Profit / Order', get: (v) => money(v.price - v.cost), primary: false },
    ],
    note: (v) => {
      const m = ((v.price - v.cost) / v.price) * 100;
      if (m < 40) return 'Below ~40% margin leaves almost no room for ad costs, returns, and fees. Reprice or cut COGS before scaling.';
      if (m < 65) return 'Workable, but tight. Operators aim for ~65%+ gross margin so paid ads still leave profit after a 2–3× break-even ROAS.';
      return 'Healthy margin — enough cushion to run paid ads profitably and absorb the occasional refund or ad-inefficiency.';
    },
  },

  // ── 2. Dropshipping Profit Calculator ────────────────────────────────────
  'dropshipping-profit-calculator': {
    fields: [
      { id: 'price', label: 'Selling Price', prefix: '$', placeholder: 'e.g. 49' },
      { id: 'cogs', label: 'Product + Shipping Cost', prefix: '$', placeholder: 'e.g. 16' },
      { id: 'cpa', label: 'Ad Cost per Order (CPA)', prefix: '$', placeholder: 'e.g. 18' },
      { id: 'fees', label: 'Payment Fees', suffix: '%', placeholder: 'e.g. 2.9', default: 2.9 },
    ],
    ready: (v) => v.price > 0 && v.cogs >= 0,
    outputs: [
      {
        label: 'Net Profit / Order',
        get: (v) => money(v.price - v.cogs - v.cpa - v.price * (v.fees / 100)),
        tone: (v) => {
          const p = v.price - v.cogs - v.cpa - v.price * (v.fees / 100);
          return p > 0 ? 'good' : p === 0 ? 'warn' : 'bad';
        },
      },
      {
        label: 'Net Margin',
        get: (v) => pct(((v.price - v.cogs - v.cpa - v.price * (v.fees / 100)) / v.price) * 100),
        primary: false,
      },
      {
        label: 'Profit / 100 Orders',
        get: (v) => money((v.price - v.cogs - v.cpa - v.price * (v.fees / 100)) * 100),
        primary: false,
      },
    ],
    note: (v) => {
      const p = v.price - v.cogs - v.cpa - v.price * (v.fees / 100);
      return p > 0
        ? `You keep ${money(p)} after product, ads, and fees on every sale. That's the number that has to fund inventory, refunds, and your time.`
        : `You're losing ${money(Math.abs(p))} per order. Either your CPA is too high or your margin is too thin — fix one before adding budget.`;
    },
  },

  // ── 3. Product Pricing Calculator ────────────────────────────────────────
  'product-pricing-calculator': {
    fields: [
      { id: 'cost', label: 'Product + Shipping Cost', prefix: '$', placeholder: 'e.g. 14' },
      { id: 'margin', label: 'Target Margin', suffix: '%', placeholder: 'e.g. 70', default: 70 },
    ],
    ready: (v) => v.cost > 0 && v.margin > 0 && v.margin < 100,
    outputs: [
      {
        label: 'Suggested Price',
        get: (v) => money(v.cost / (1 - v.margin / 100)),
        tone: () => 'good',
      },
      { label: 'Markup', get: (v) => x(1 / (1 - v.margin / 100)), primary: false },
      { label: 'Profit / Order', get: (v) => money(v.cost / (1 - v.margin / 100) - v.cost), primary: false },
    ],
    note: (v) =>
      `To hit a ${v.margin.toFixed(0)}% gross margin on a ${money(v.cost)} cost, price at ${money(
        v.cost / (1 - v.margin / 100)
      )}. Round to a charm price (e.g. .99) and pressure-test it against what competitors charge.`,
  },

  // ── 4. Shopify Fee Calculator ────────────────────────────────────────────
  'shopify-fee-calculator': {
    fields: [
      { id: 'order', label: 'Order Value', prefix: '$', placeholder: 'e.g. 49' },
      { id: 'rate', label: 'Processing Rate', suffix: '%', placeholder: 'e.g. 2.9', default: 2.9 },
      { id: 'flat', label: 'Flat Fee per Transaction', prefix: '$', placeholder: 'e.g. 0.30', default: 0.3 },
    ],
    ready: (v) => v.order > 0,
    outputs: [
      {
        label: 'Fee per Order',
        get: (v) => money(v.order * (v.rate / 100) + v.flat),
        tone: () => 'warn',
      },
      { label: 'You Receive', get: (v) => money(v.order - (v.order * (v.rate / 100) + v.flat)), primary: false },
      { label: 'Fee % of Order', get: (v) => pct(((v.order * (v.rate / 100) + v.flat) / v.order) * 100), primary: false },
    ],
    note: (v) =>
      `Payment processing takes ${money(v.order * (v.rate / 100) + v.flat)} from this ${money(
        v.order
      )} order before any ad spend. Always subtract this from margin when you calculate break-even ROAS.`,
  },

  // ── 5. Conversion Rate Calculator ────────────────────────────────────────
  'conversion-rate-calculator': {
    fields: [
      { id: 'sessions', label: 'Store Sessions / Visitors', placeholder: 'e.g. 2000' },
      { id: 'orders', label: 'Orders', placeholder: 'e.g. 40' },
      { id: 'aov', label: 'Average Order Value', prefix: '$', placeholder: 'e.g. 49 (optional)' },
    ],
    ready: (v) => v.sessions > 0,
    outputs: [
      {
        label: 'Conversion Rate',
        get: (v) => pct((v.orders / v.sessions) * 100),
        tone: (v) => {
          const c = (v.orders / v.sessions) * 100;
          return c >= 2.5 ? 'good' : c >= 1 ? 'warn' : 'bad';
        },
      },
      { label: 'Revenue', get: (v) => (v.aov > 0 ? money(v.orders * v.aov) : '—'), primary: false },
      {
        label: 'Revenue at 3% CVR',
        get: (v) => (v.aov > 0 ? money(v.sessions * 0.03 * v.aov) : '—'),
        primary: false,
      },
    ],
    note: (v) => {
      const c = (v.orders / v.sessions) * 100;
      if (c < 1) return 'Under 1% usually points at the store, not the traffic — page speed, product page, trust, or offer. Fix conversion before scaling spend.';
      if (c < 2.5) return 'Average for cold paid traffic. Small CRO wins (above-the-fold price, reviews, urgency) compound directly into profit.';
      return 'Strong conversion rate — your store and offer are pulling their weight. Now scale the traffic.';
    },
  },

  // ── 7. Target ROAS Calculator ────────────────────────────────────────────
  'target-roas-calculator': {
    fields: [
      { id: 'margin', label: 'Gross Margin', suffix: '%', placeholder: 'e.g. 70', default: 70 },
      { id: 'profit', label: 'Desired Net Profit Margin', suffix: '%', placeholder: 'e.g. 20', default: 20 },
    ],
    ready: (v) => v.margin > 0 && v.margin < 100 && v.profit >= 0 && v.margin > v.profit,
    outputs: [
      {
        label: 'Target ROAS',
        get: (v) => x(1 / (v.margin / 100 - v.profit / 100)),
        tone: () => 'good',
      },
      { label: 'Break-Even ROAS', get: (v) => x(1 / (v.margin / 100)), primary: false },
      { label: 'Max Ad Spend / Sale', get: (v) => pct((v.margin / 100 - v.profit / 100) * 100), primary: false },
    ],
    note: (v) =>
      `To keep ${v.profit.toFixed(0)}% net profit at a ${v.margin.toFixed(0)}% gross margin, your ads need to hit ${x(
        1 / (v.margin / 100 - v.profit / 100)
      )} ROAS. Anything between your break-even (${x(1 / (v.margin / 100))}) and target ROAS is profitable but below your goal.`,
  },

  // ── 8. Break-Even CPA Calculator ─────────────────────────────────────────
  'break-even-cpa-calculator': {
    fields: [
      { id: 'price', label: 'Selling Price', prefix: '$', placeholder: 'e.g. 49' },
      { id: 'cogs', label: 'Product + Shipping Cost', prefix: '$', placeholder: 'e.g. 16' },
      { id: 'fees', label: 'Payment Fees', suffix: '%', placeholder: 'e.g. 2.9', default: 2.9 },
    ],
    ready: (v) => v.price > 0 && v.cogs >= 0,
    outputs: [
      {
        label: 'Break-Even CPA',
        get: (v) => money(v.price - v.cogs - v.price * (v.fees / 100)),
        tone: (v) => (v.price - v.cogs - v.price * (v.fees / 100) > 0 ? 'good' : 'bad'),
      },
      {
        label: 'CPA for 20% Margin',
        get: (v) => money(v.price - v.cogs - v.price * (v.fees / 100) - 0.2 * v.price),
        primary: false,
      },
      {
        label: 'Gross Profit / Order',
        get: (v) => money(v.price - v.cogs - v.price * (v.fees / 100)),
        primary: false,
      },
    ],
    note: (v) =>
      `Your break-even CPA is ${money(
        v.price - v.cogs - v.price * (v.fees / 100)
      )} — the most you can pay for a sale before you lose money. Keep your actual cost per purchase comfortably below this to stay profitable.`,
  },

  // ── 9. CPM / CTR / CPC Calculator ────────────────────────────────────────
  'cpm-calculator': {
    fields: [
      { id: 'spend', label: 'Ad Spend', prefix: '$', placeholder: 'e.g. 100' },
      { id: 'impressions', label: 'Impressions', placeholder: 'e.g. 12000' },
      { id: 'clicks', label: 'Link Clicks', placeholder: 'e.g. 180 (optional)' },
    ],
    ready: (v) => v.spend > 0 && v.impressions > 0,
    outputs: [
      { label: 'CPM', get: (v) => money((v.spend / v.impressions) * 1000), tone: () => 'neutral' },
      { label: 'CPC', get: (v) => (v.clicks > 0 ? money(v.spend / v.clicks) : '—'), primary: false },
      { label: 'CTR', get: (v) => (v.clicks > 0 ? pct((v.clicks / v.impressions) * 100) : '—'), primary: false },
    ],
    note: (v) =>
      `You paid ${money(
        (v.spend / v.impressions) * 1000
      )} per 1,000 impressions. High CPMs are usually a creative or audience problem — a stronger hook lifts CTR, which lowers CPM and CPC together.`,
  },

  // ── 10. Ad Testing Budget Calculator ─────────────────────────────────────
  'ad-testing-budget-calculator': {
    fields: [
      { id: 'products', label: 'Products to Test', placeholder: 'e.g. 3', default: 3 },
      { id: 'daily', label: 'Daily Budget per Product', prefix: '$', placeholder: 'e.g. 20', default: 20 },
      { id: 'days', label: 'Test Length (days)', placeholder: 'e.g. 3', default: 3 },
    ],
    ready: (v) => v.products > 0 && v.daily > 0 && v.days > 0,
    outputs: [
      {
        label: 'Total Test Budget',
        get: (v) => money(v.products * v.daily * v.days),
        tone: () => 'warn',
      },
      { label: 'Per Product', get: (v) => money(v.daily * v.days), primary: false },
      { label: 'Daily Spend', get: (v) => money(v.products * v.daily), primary: false },
    ],
    note: (v) =>
      `Budget ${money(
        v.products * v.daily * v.days
      )} to give ${v.products} products a fair ${v.days}-day test. Treat this as money you're prepared to spend to buy data — most products will fail, and that's the point of testing.`,
  },

  // ── 11. Customer Lifetime Value (LTV) Calculator ─────────────────────────
  'customer-lifetime-value-calculator': {
    fields: [
      { id: 'aov', label: 'Average Order Value', prefix: '$', placeholder: 'e.g. 49' },
      { id: 'margin', label: 'Gross Margin', suffix: '%', placeholder: 'e.g. 65', default: 65 },
      { id: 'freq', label: 'Purchases per Year', placeholder: 'e.g. 2.5', default: 2 },
      { id: 'years', label: 'Customer Lifespan (years)', placeholder: 'e.g. 2', default: 2 },
    ],
    ready: (v) => v.aov > 0 && v.freq > 0 && v.years > 0,
    outputs: [
      { label: 'Lifetime Value', get: (v) => money(v.aov * v.freq * v.years), tone: () => 'good' },
      { label: 'Lifetime Profit', get: (v) => money(v.aov * v.freq * v.years * (v.margin / 100)), primary: false },
      { label: 'Max CAC', get: (v) => money(v.aov * v.freq * v.years * (v.margin / 100)), primary: false },
    ],
    note: (v) =>
      `Each customer is worth ${money(
        v.aov * v.freq * v.years * (v.margin / 100)
      )} in profit over their lifetime — that's the most you can spend to acquire one and still win. Tracking LTV, not just the first sale, is what lets brands outspend dropshippers for the same customer.`,
  },

  // ── 12. Ecommerce Cash-Flow Calculator ───────────────────────────────────
  'ecommerce-cash-flow-calculator': {
    fields: [
      { id: 'spend', label: 'Daily Ad Spend', prefix: '$', placeholder: 'e.g. 200' },
      { id: 'cogs', label: 'Daily Product + Shipping Cost', prefix: '$', placeholder: 'e.g. 120' },
      { id: 'delay', label: 'Payout Delay (days)', placeholder: 'e.g. 5', default: 5 },
    ],
    ready: (v) => v.spend > 0 && v.delay > 0,
    outputs: [
      { label: 'Working Capital Needed', get: (v) => money((v.spend + v.cogs) * v.delay), tone: () => 'warn' },
      { label: 'Cash Out per Day', get: (v) => money(v.spend + v.cogs), primary: false },
      { label: 'Float Across Payout Gap', get: (v) => money((v.spend + v.cogs) * v.delay), primary: false },
    ],
    note: (v) =>
      `You spend on ads and product today, but processor payouts land ~${v.delay.toFixed(
        0
      )} days later. You need about ${money(
        (v.spend + v.cogs) * v.delay
      )} of working capital to bridge that gap. Underestimating this is what kills profitable-on-paper stores.`,
  },

  // ── 13. Dropshipping Scaling Calculator ──────────────────────────────────
  'dropshipping-scaling-calculator': {
    fields: [
      { id: 'spend', label: 'Current Daily Ad Spend', prefix: '$', placeholder: 'e.g. 100' },
      { id: 'roas', label: 'Current ROAS', placeholder: 'e.g. 2.4', default: 2 },
      { id: 'target', label: 'Target Daily Ad Spend', prefix: '$', placeholder: 'e.g. 500' },
    ],
    ready: (v) => v.spend > 0 && v.roas > 0 && v.target > 0,
    outputs: [
      { label: 'Projected Daily Revenue', get: (v) => money(v.target * v.roas), tone: () => 'good' },
      { label: 'Projected Monthly Revenue', get: (v) => money(v.target * v.roas * 30), primary: false },
      { label: 'Monthly Revenue Now', get: (v) => money(v.spend * v.roas * 30), primary: false },
    ],
    note: (v) =>
      `At ${money(v.target)}/day and a ${x(v.roas)} ROAS, you'd project ${money(
        v.target * v.roas * 30
      )}/month. Reality check: ROAS usually dips as you scale spend, so treat this as a ceiling and step budget up gradually (surf scaling) rather than all at once.`,
  },

  // ── 14. Sales Tax Calculator ─────────────────────────────────────────────
  'sales-tax-calculator': {
    fields: [
      { id: 'amount', label: 'Order Subtotal', prefix: '$', placeholder: 'e.g. 49' },
      { id: 'rate', label: 'Sales Tax / VAT Rate', suffix: '%', placeholder: 'e.g. 8.25', default: 8.25 },
    ],
    ready: (v) => v.amount > 0 && v.rate >= 0,
    outputs: [
      { label: 'Tax', get: (v) => money(v.amount * (v.rate / 100)), tone: () => 'neutral' },
      { label: 'Total (Tax Added)', get: (v) => money(v.amount + v.amount * (v.rate / 100)), primary: false },
      { label: 'Tax if Price Includes It', get: (v) => money(v.amount - v.amount / (1 + v.rate / 100)), primary: false },
    ],
    note: (v) =>
      `At ${v.rate.toFixed(2)}%, this ${money(v.amount)} order carries ${money(
        v.amount * (v.rate / 100)
      )} in tax for a ${money(v.amount + v.amount * (v.rate / 100))} total. Rates vary by state/country and where you have nexus — always confirm your own obligations.`,
  },

  // ── 6. Average Order Value Calculator ────────────────────────────────────
  'average-order-value-calculator': {
    fields: [
      { id: 'revenue', label: 'Total Revenue', prefix: '$', placeholder: 'e.g. 9800' },
      { id: 'orders', label: 'Total Orders', placeholder: 'e.g. 200' },
      { id: 'bump', label: 'Planned Upsell / Bundle', prefix: '$', placeholder: 'e.g. 12 (optional)' },
    ],
    ready: (v) => v.orders > 0 && v.revenue > 0,
    outputs: [
      { label: 'Average Order Value', get: (v) => money(v.revenue / v.orders), tone: () => 'good' },
      { label: 'AOV with Upsell', get: (v) => (v.bump > 0 ? money(v.revenue / v.orders + v.bump) : '—'), primary: false },
      {
        label: 'Extra Revenue / 100 Orders',
        get: (v) => (v.bump > 0 ? money(v.bump * 100) : '—'),
        primary: false,
      },
    ],
    note: (v) =>
      `Your AOV is ${money(v.revenue / v.orders)}. Raising it is the cheapest growth lever you have — every extra dollar of AOV drops almost straight to profit because the ad cost is already paid. Bundles, volume discounts, and a single post-purchase upsell are the usual moves.`,
  },
};
