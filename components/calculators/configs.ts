/**
 * Calculator configs — fields + formulas for every free tool.
 *
 * Keyed by the slug used in the page route (app/tools/[tool]) and the SEO
 * content registry (data/toolsData.ts). Adding a new calculator = add one
 * entry here + one entry in toolsData.ts.
 *
 * Basic fields are always shown. Advanced fields are collapsed behind an
 * accordion and default to 0 — calculations always work without them.
 */

export type Vals = Record<string, number>;
export type Tone = 'good' | 'warn' | 'bad' | 'neutral';

export interface Field {
  id: string;
  label: string;
  prefix?: '$';
  suffix?: '%';
  unit?: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  default: number;
  /** If true, shown only in the Advanced section (always defaults to 0) */
  advanced?: boolean;
}

export interface Output {
  label: string;
  get: (v: Vals) => string;
  tone?: (v: Vals) => Tone;
  primary?: boolean;
  /** Shown below the value as context */
  sublabel?: string;
}

export interface Benchmark {
  label: string;
  tone: Tone;
  range: string;
}

export interface CalcConfig {
  fields: Field[];
  ready: (v: Vals) => boolean;
  outputs: Output[];
  note?: (v: Vals) => string;
  /** e.g. "Gross Profit = Selling Price − All Costs" */
  formula?: string;
  /** Contextual benchmarks shown below results */
  benchmarks?: Benchmark[];
  /** Assumptions displayed in collapsed section */
  assumptions?: string[];
}

// ── field builders ───────────────────────────────────────────────────────────
const $ = (id: string, label: string, def: number, max: number, step = 1, extra: Partial<Field> = {}): Field =>
  ({ id, label, prefix: '$', min: 0, max, step, default: def, ...extra });
const pctF = (id: string, label: string, def: number, max = 100, step = 1, extra: Partial<Field> = {}): Field =>
  ({ id, label, suffix: '%', min: 0, max, step, default: def, ...extra });
const numF = (id: string, label: string, def: number, max: number, step = 1, extra: Partial<Field> = {}): Field =>
  ({ id, label, min: 0, max, step, default: def, ...extra });

// Advanced field shorthands (same as above but with advanced: true, default: 0)
const $adv = (id: string, label: string, max: number, step = 1, extra: Partial<Field> = {}): Field =>
  ({ id, label, prefix: '$', min: 0, max, step, default: 0, advanced: true, ...extra });
const pctAdv = (id: string, label: string, max = 100, step = 0.1, extra: Partial<Field> = {}): Field =>
  ({ id, label, suffix: '%', min: 0, max, step, default: 0, advanced: true, ...extra });
const numAdv = (id: string, label: string, max: number, step = 1, extra: Partial<Field> = {}): Field =>
  ({ id, label, min: 0, max, step, default: 0, advanced: true, ...extra });

// ── formatting helpers ────────────────────────────────────────────────────────
const money = (n: number) => {
  if (!isFinite(n)) return '—';
  return '$' + (Math.abs(n) >= 1000
    ? n.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : n.toFixed(2));
};
const pct = (n: number) => (isFinite(n) ? `${n.toFixed(1)}%` : '—');
const x = (n: number) => (isFinite(n) && n > 0 ? `${n.toFixed(2)}×` : '—');

export const calcConfigs: Record<string, CalcConfig> = {

  // ── 1. Profit Margin Calculator ───────────────────────────────────────────
  'profit-margin-calculator': {
    fields: [
      $('price', 'Selling Price', 49, 500),
      $('cost', 'Product Cost (COGS)', 14, 200),
      $adv('shipping', 'Shipping Cost', 50, 0.5),
      $adv('packaging', 'Packaging Cost', 20, 0.5),
      pctAdv('payment_fee', 'Payment Processing Fee %', 10, 0.1),
      pctAdv('platform_fee', 'Platform Fee %', 10, 0.1),
      $adv('fulfil', 'Fulfilment / Other Costs', 20, 0.5),
    ],
    ready: (v) => v.price > 0,
    formula: 'Gross Margin % = (Selling Price − All Costs) ÷ Selling Price × 100',
    outputs: [
      {
        label: 'Gross Margin',
        get: (v) => {
          const totalCosts = v.cost + v.shipping + v.packaging + v.fulfil
            + v.price * ((v.payment_fee + v.platform_fee) / 100);
          return pct(((v.price - totalCosts) / v.price) * 100);
        },
        tone: (v) => {
          const totalCosts = v.cost + v.shipping + v.packaging + v.fulfil
            + v.price * ((v.payment_fee + v.platform_fee) / 100);
          const m = ((v.price - totalCosts) / v.price) * 100;
          return m >= 65 ? 'good' : m >= 40 ? 'warn' : 'bad';
        },
        sublabel: '65%+ is healthy for paid ads',
      },
      {
        label: 'Gross Profit / Order',
        get: (v) => {
          const totalCosts = v.cost + v.shipping + v.packaging + v.fulfil
            + v.price * ((v.payment_fee + v.platform_fee) / 100);
          return money(v.price - totalCosts);
        },
        primary: false,
      },
      {
        label: 'Total Variable Costs',
        get: (v) => money(v.cost + v.shipping + v.packaging + v.fulfil
          + v.price * ((v.payment_fee + v.platform_fee) / 100)),
        primary: false,
      },
      {
        label: 'Markup',
        get: (v) => {
          if (v.cost <= 0) return '—';
          const totalCosts = v.cost + v.shipping + v.packaging + v.fulfil
            + v.price * ((v.payment_fee + v.platform_fee) / 100);
          return pct(((v.price - totalCosts) / totalCosts) * 100);
        },
        primary: false,
      },
    ],
    benchmarks: [
      { label: 'Excellent (65%+)', tone: 'good', range: '65% – 85%' },
      { label: 'Workable (40–65%)', tone: 'warn', range: '40% – 65%' },
      { label: 'Tight (under 40%)', tone: 'bad', range: 'Below 40%' },
    ],
    assumptions: [
      'Refund rate is not included — add a refund reserve manually.',
      'Income tax is excluded; this is gross margin before tax.',
      'Payment fee defaults to 0% unless entered in Advanced.',
    ],
    note: (v) => {
      const totalCosts = v.cost + v.shipping + v.packaging + v.fulfil
        + v.price * ((v.payment_fee + v.platform_fee) / 100);
      const m = ((v.price - totalCosts) / v.price) * 100;
      if (m < 40) return 'Below ~40% margin leaves almost no room for ad costs, returns, and fees. Reprice or cut COGS before scaling.';
      if (m < 65) return 'Workable, but tight. Aim for 65%+ so paid ads leave profit after a 2–3× break-even ROAS.';
      return 'Healthy margin — enough cushion to run paid ads profitably and absorb occasional refunds.';
    },
  },

  // ── 2. Dropshipping Profit Calculator ────────────────────────────────────
  'dropshipping-profit-calculator': {
    fields: [
      $('price', 'Selling Price', 49, 500),
      $('cogs', 'Product + Shipping Cost', 16, 200),
      $('cpa', 'Ad Cost per Order (CPA)', 18, 150),
      pctF('fees', 'Payment Fees', 2.9, 10, 0.1),
      pctAdv('refund_rate', 'Refund Rate %', 20, 0.5),
      pctAdv('chargeback_rate', 'Chargeback Rate %', 5, 0.1),
      pctAdv('fx_fee', 'Currency Conversion Fee %', 5, 0.1),
      pctAdv('platform_fee', 'Platform Fee %', 5, 0.1),
      $adv('apps', 'Apps Cost Allocation / Order', 10, 0.5),
      $adv('packaging', 'Packaging Cost', 5, 0.5),
    ],
    ready: (v) => v.price > 0 && v.cogs >= 0,
    formula: 'Net Profit = Selling Price − COGS − CPA − All Fees − Refund Reserve',
    outputs: [
      {
        label: 'Net Profit / Order',
        get: (v) => {
          const refundCost = v.price * (v.refund_rate / 100);
          const chargebackCost = v.price * (v.chargeback_rate / 100);
          const feeTotal = v.price * ((v.fees + v.fx_fee + v.platform_fee) / 100);
          return money(v.price - v.cogs - v.cpa - feeTotal - refundCost - chargebackCost - v.apps - v.packaging);
        },
        tone: (v) => {
          const refundCost = v.price * (v.refund_rate / 100);
          const chargebackCost = v.price * (v.chargeback_rate / 100);
          const feeTotal = v.price * ((v.fees + v.fx_fee + v.platform_fee) / 100);
          const p = v.price - v.cogs - v.cpa - feeTotal - refundCost - chargebackCost - v.apps - v.packaging;
          return p > 0 ? 'good' : p === 0 ? 'warn' : 'bad';
        },
        sublabel: 'After all costs',
      },
      {
        label: 'Net Margin',
        get: (v) => {
          const refundCost = v.price * (v.refund_rate / 100);
          const chargebackCost = v.price * (v.chargeback_rate / 100);
          const feeTotal = v.price * ((v.fees + v.fx_fee + v.platform_fee) / 100);
          const p = v.price - v.cogs - v.cpa - feeTotal - refundCost - chargebackCost - v.apps - v.packaging;
          return pct((p / v.price) * 100);
        },
        primary: false,
      },
      {
        label: 'Break-Even CPA',
        get: (v) => {
          const feeTotal = v.price * ((v.fees + v.fx_fee + v.platform_fee) / 100);
          const refundCost = v.price * (v.refund_rate / 100);
          const chargebackCost = v.price * (v.chargeback_rate / 100);
          return money(v.price - v.cogs - feeTotal - refundCost - chargebackCost - v.apps - v.packaging);
        },
        primary: false,
        sublabel: 'Max you can pay per sale',
      },
      {
        label: 'Profit / 100 Orders',
        get: (v) => {
          const refundCost = v.price * (v.refund_rate / 100);
          const chargebackCost = v.price * (v.chargeback_rate / 100);
          const feeTotal = v.price * ((v.fees + v.fx_fee + v.platform_fee) / 100);
          const p = v.price - v.cogs - v.cpa - feeTotal - refundCost - chargebackCost - v.apps - v.packaging;
          return money(p * 100);
        },
        primary: false,
      },
    ],
    benchmarks: [
      { label: 'Profitable', tone: 'good', range: 'Net margin > 0%' },
      { label: 'Break-even', tone: 'warn', range: 'Net margin = 0%' },
      { label: 'Losing money', tone: 'bad', range: 'Net margin < 0%' },
    ],
    assumptions: [
      'Refund rate defaults to 0% unless entered in Advanced.',
      'Chargeback rate defaults to 0% unless entered.',
      'This is per-order profit — does not include fixed overheads.',
    ],
    note: (v) => {
      const feeTotal = v.price * ((v.fees + v.fx_fee + v.platform_fee) / 100);
      const refundCost = v.price * (v.refund_rate / 100);
      const chargebackCost = v.price * (v.chargeback_rate / 100);
      const p = v.price - v.cogs - v.cpa - feeTotal - refundCost - chargebackCost - v.apps - v.packaging;
      return p > 0
        ? `You keep ${money(p)} per order after all costs. That number must fund inventory deposits, refund reserves, and your time.`
        : `You're losing ${money(Math.abs(p))} per order. Either CPA is too high or margin is too thin — fix one before adding budget.`;
    },
  },

  // ── 3. Product Pricing Calculator ────────────────────────────────────────
  'product-pricing-calculator': {
    fields: [
      $('cost', 'Product + Shipping Cost', 14, 200),
      pctF('margin', 'Target Gross Margin', 70, 95, 1),
      $adv('shipping_out', 'Outbound Shipping (customer pays)', 15, 0.5),
      $adv('packaging', 'Packaging Cost', 5, 0.5),
      pctAdv('fees', 'Payment / Platform Fees %', 10, 0.1),
      $adv('ad_allowance', 'Ad Spend Allowance / Order', 20, 1),
    ],
    ready: (v) => v.cost > 0 && v.margin > 0 && v.margin < 100,
    formula: 'Selling Price = Total Costs ÷ (1 − Target Margin %)',
    outputs: [
      {
        label: 'Suggested Selling Price',
        get: (v) => {
          const totalCost = v.cost + v.packaging + v.ad_allowance;
          return money(totalCost / (1 - v.margin / 100));
        },
        tone: () => 'good',
        sublabel: 'Round to charm price (.99)',
      },
      {
        label: 'Gross Profit / Order',
        get: (v) => {
          const totalCost = v.cost + v.packaging + v.ad_allowance;
          const price = totalCost / (1 - v.margin / 100);
          return money(price - totalCost);
        },
        primary: false,
      },
      {
        label: 'Markup',
        get: (v) => x(1 / (1 - v.margin / 100)),
        primary: false,
      },
      {
        label: 'Contribution Margin',
        get: (v) => {
          const totalCost = v.cost + v.packaging + v.ad_allowance;
          const price = totalCost / (1 - v.margin / 100);
          const feeAmt = price * (v.fees / 100);
          return money(price - totalCost - feeAmt - v.shipping_out);
        },
        primary: false,
        sublabel: 'After all variable costs',
      },
    ],
    benchmarks: [
      { label: 'Excellent', tone: 'good', range: '65%+ margin' },
      { label: 'Workable', tone: 'warn', range: '40–65% margin' },
      { label: 'Risky', tone: 'bad', range: 'Below 40% margin' },
    ],
    assumptions: [
      'Ad spend allowance defaults to 0 unless entered.',
      'Payment fees default to 0% unless entered.',
      'Suggested price does not include sales tax.',
    ],
    note: (v) => {
      const totalCost = v.cost + v.packaging + v.ad_allowance;
      return `To hit ${v.margin.toFixed(0)}% margin on ${money(totalCost)} in costs, price at ${money(totalCost / (1 - v.margin / 100))}. Round to a charm price (.99) and compare against competitor pricing.`;
    },
  },

  // ── 4. Shopify Fee Calculator ─────────────────────────────────────────────
  'shopify-fee-calculator': {
    fields: [
      $('order', 'Order Value', 49, 500),
      pctF('rate', 'Processing Rate', 2.9, 10, 0.1),
      $('flat', 'Flat Fee per Transaction', 0.3, 2, 0.05),
      pctAdv('platform_fee', 'Shopify Plan Transaction Fee %', 2, 0.1),
      pctAdv('fx', 'Currency Conversion Fee %', 3, 0.1),
      numAdv('orders_mo', 'Orders per Month (for monthly totals)', 200, 10),
    ],
    ready: (v) => v.order > 0,
    formula: 'Total Fee = (Order × Rate%) + Flat Fee + (Order × Transaction%)',
    outputs: [
      {
        label: 'Fee per Order',
        get: (v) => money(v.order * ((v.rate + v.platform_fee + v.fx) / 100) + v.flat),
        tone: () => 'warn',
        sublabel: 'Subtract from gross margin',
      },
      {
        label: 'Net Revenue',
        get: (v) => money(v.order - (v.order * ((v.rate + v.platform_fee + v.fx) / 100) + v.flat)),
        primary: false,
      },
      {
        label: 'Fee % of Order',
        get: (v) => pct(((v.order * ((v.rate + v.platform_fee + v.fx) / 100) + v.flat) / v.order) * 100),
        primary: false,
      },
      {
        label: 'Monthly Fee (est.)',
        get: (v) => {
          if (!v.orders_mo) return '—';
          return money((v.order * ((v.rate + v.platform_fee + v.fx) / 100) + v.flat) * v.orders_mo);
        },
        primary: false,
        sublabel: 'Based on orders/month above',
      },
    ],
    benchmarks: [
      { label: 'Shopify Payments (Basic)', tone: 'warn', range: '2.9% + 30¢' },
      { label: 'Shopify Payments (Grow)', tone: 'good', range: '2.6% + 30¢' },
      { label: 'Shopify Payments (Plus)', tone: 'good', range: '2.15% + 30¢' },
    ],
    assumptions: [
      'Uses Shopify Payments rates by default.',
      'Transaction fee (2% on Basic non-Payments) defaults to 0 — enter in Advanced if applicable.',
      'Currency conversion fee defaults to 0 unless entered.',
    ],
    note: (v) =>
      `Payment processing takes ${money(v.order * ((v.rate + v.platform_fee + v.fx) / 100) + v.flat)} from this ${money(v.order)} order. Always subtract this from margin when calculating break-even ROAS.`,
  },

  // ── 5. Conversion Rate Calculator ────────────────────────────────────────
  'conversion-rate-calculator': {
    fields: [
      numF('sessions', 'Store Sessions / Visitors', 2000, 50000, 100),
      numF('orders', 'Orders', 40, 2000, 5),
      $('aov', 'Average Order Value', 49, 500, 1),
      numAdv('atc', 'Add-to-Cart Events', 5000, 50),
      numAdv('checkout', 'Checkout Started', 2000, 20),
    ],
    ready: (v) => v.sessions > 0,
    formula: 'CVR = Orders ÷ Sessions × 100',
    outputs: [
      {
        label: 'Conversion Rate',
        get: (v) => pct((v.orders / v.sessions) * 100),
        tone: (v) => {
          const c = (v.orders / v.sessions) * 100;
          return c >= 2.5 ? 'good' : c >= 1 ? 'warn' : 'bad';
        },
        sublabel: 'Industry avg: 1–2.5%',
      },
      {
        label: 'Revenue',
        get: (v) => (v.aov > 0 ? money(v.orders * v.aov) : '—'),
        primary: false,
      },
      {
        label: 'Add-to-Cart Rate',
        get: (v) => (v.atc > 0 ? pct((v.atc / v.sessions) * 100) : '—'),
        primary: false,
        sublabel: 'Healthy: 5–8%+',
      },
      {
        label: 'Cart Abandonment',
        get: (v) => {
          if (!v.atc || !v.orders) return '—';
          return pct(((v.atc - v.orders) / v.atc) * 100);
        },
        primary: false,
      },
      {
        label: 'Checkout Abandonment',
        get: (v) => {
          if (!v.checkout || !v.orders) return '—';
          return pct(((v.checkout - v.orders) / v.checkout) * 100);
        },
        primary: false,
      },
    ],
    benchmarks: [
      { label: 'Excellent (2.5%+)', tone: 'good', range: '2.5% – 5%+' },
      { label: 'Average (1–2.5%)', tone: 'warn', range: '1% – 2.5%' },
      { label: 'Needs work (under 1%)', tone: 'bad', range: 'Below 1%' },
    ],
    assumptions: [
      'Funnel metrics (ATC, checkout) default to 0 unless entered in Advanced.',
      'Sessions = unique visitors or sessions from analytics.',
      'Revenue estimate does not account for refunds.',
    ],
    note: (v) => {
      const c = (v.orders / v.sessions) * 100;
      if (c < 1) return 'Under 1% usually points at the store, not the traffic — page speed, product page, trust, or offer. Fix conversion before scaling spend.';
      if (c < 2.5) return 'Average for cold paid traffic. Small CRO wins (above-the-fold price, reviews, urgency) compound directly into profit.';
      return 'Strong CVR — your store and offer are doing their job. Scale the traffic.';
    },
  },

  // ── 6. Average Order Value Calculator ────────────────────────────────────
  'average-order-value-calculator': {
    fields: [
      $('revenue', 'Total Revenue', 9800, 200000, 100),
      numF('orders', 'Total Orders', 200, 5000, 10),
      $adv('discounts', 'Total Discounts Given', 50000, 100),
      $adv('refunds', 'Total Refunds', 10000, 50),
      $adv('upsell', 'Average Upsell / Bundle Add-on', 15, 1),
    ],
    ready: (v) => v.orders > 0 && v.revenue > 0,
    formula: 'AOV = Revenue ÷ Orders',
    outputs: [
      {
        label: 'Gross AOV',
        get: (v) => money(v.revenue / v.orders),
        tone: () => 'good',
        sublabel: 'Before discounts / refunds',
      },
      {
        label: 'Net AOV',
        get: (v) => {
          const netRev = v.revenue - (v.discounts || 0) - (v.refunds || 0);
          return money(netRev / v.orders);
        },
        primary: false,
        sublabel: 'After discounts and refunds',
      },
      {
        label: 'AOV with Upsell',
        get: (v) => (v.upsell > 0 ? money(v.revenue / v.orders + v.upsell) : '—'),
        primary: false,
      },
      {
        label: 'Extra Revenue / 100 Orders',
        get: (v) => (v.upsell > 0 ? money(v.upsell * 100) : '—'),
        primary: false,
        sublabel: 'From upsell alone',
      },
    ],
    benchmarks: [
      { label: 'High AOV ($80+)', tone: 'good', range: '$80+' },
      { label: 'Average ($40–$80)', tone: 'warn', range: '$40 – $80' },
      { label: 'Low (under $40)', tone: 'bad', range: 'Below $40' },
    ],
    assumptions: [
      'Discounts and refunds default to 0 unless entered in Advanced.',
      'Upsell revenue shows potential uplift — not actuals unless entered.',
      'AOV is gross before cost of goods or ad spend.',
    ],
    note: (v) =>
      `Your AOV is ${money(v.revenue / v.orders)}. Raising it is the cheapest growth lever — every extra dollar drops almost straight to profit because the ad cost is already paid.`,
  },

  // ── 7. Target ROAS Calculator ─────────────────────────────────────────────
  'target-roas-calculator': {
    fields: [
      $('price', 'Selling Price', 49, 500),
      $('cogs', 'Product + Shipping Cost', 16, 200),
      pctF('profit_target', 'Desired Net Profit Margin %', 20, 80, 1),
      pctAdv('fees', 'Payment Fees %', 10, 0.1),
      $adv('shipping_out', 'Shipping Cost', 8, 0.5),
      pctAdv('refund_rate', 'Refund Rate %', 20, 0.5),
    ],
    ready: (v) => v.price > 0 && v.cogs >= 0,
    formula: 'Break-even ROAS = Revenue ÷ Ad Spend = 1 ÷ Gross Margin %',
    outputs: [
      {
        label: 'Break-Even ROAS',
        get: (v) => {
          const totalCost = v.cogs + v.shipping_out + v.price * ((v.fees + v.refund_rate) / 100);
          const margin = (v.price - totalCost) / v.price;
          return x(1 / margin);
        },
        tone: () => 'warn',
        sublabel: 'Minimum to not lose money',
      },
      {
        label: 'Target ROAS',
        get: (v) => {
          const totalCost = v.cogs + v.shipping_out + v.price * ((v.fees + v.refund_rate) / 100);
          const margin = (v.price - totalCost) / v.price;
          const adBudgetFraction = margin - v.profit_target / 100;
          return adBudgetFraction > 0 ? x(1 / adBudgetFraction) : '—';
        },
        tone: () => 'good',
        sublabel: 'To hit your profit target',
      },
      {
        label: 'Max CPA',
        get: (v) => {
          const totalCost = v.cogs + v.shipping_out + v.price * ((v.fees + v.refund_rate) / 100);
          return money(v.price - totalCost - v.price * (v.profit_target / 100));
        },
        primary: false,
        sublabel: 'Most you can pay per purchase',
      },
      {
        label: 'Contribution Margin',
        get: (v) => {
          const totalCost = v.cogs + v.shipping_out + v.price * ((v.fees + v.refund_rate) / 100);
          return money(v.price - totalCost);
        },
        primary: false,
      },
    ],
    benchmarks: [
      { label: 'Excellent ROAS (4×+)', tone: 'good', range: '4× and above' },
      { label: 'Good (2.5–4×)', tone: 'warn', range: '2.5× – 4×' },
      { label: 'Struggling (below 2×)', tone: 'bad', range: 'Below 2×' },
    ],
    assumptions: [
      'Break-even ROAS assumes all contribution margin is available for ads.',
      'Refund rate defaults to 0% unless entered in Advanced.',
      'Payment fees default to 0% unless entered in Advanced.',
    ],
    note: (v) => {
      const totalCost = v.cogs + v.shipping_out + v.price * ((v.fees + v.refund_rate) / 100);
      const margin = (v.price - totalCost) / v.price;
      const adFraction = margin - v.profit_target / 100;
      const beRoas = 1 / margin;
      const tgtRoas = adFraction > 0 ? 1 / adFraction : null;
      return `Your break-even ROAS is ${x(beRoas)}. ${tgtRoas ? `To keep ${v.profit_target.toFixed(0)}% net profit your ads need to hit ${x(tgtRoas)}.` : 'Reduce desired profit or improve margin to find a valid target ROAS.'}`;
    },
  },

  // ── 8. Break-Even CPA Calculator ─────────────────────────────────────────
  'break-even-cpa-calculator': {
    fields: [
      $('price', 'Selling Price', 49, 500),
      $('cogs', 'Product + Shipping Cost', 16, 200),
      pctF('fees', 'Payment Fees', 2.9, 10, 0.1),
      $adv('shipping_out', 'Outbound Shipping', 8, 0.5),
      $adv('packaging', 'Packaging Cost', 5, 0.5),
      pctAdv('refund_rate', 'Refund Rate %', 20, 0.5),
    ],
    ready: (v) => v.price > 0 && v.cogs >= 0,
    formula: 'Break-Even CPA = Selling Price − COGS − All Fees',
    outputs: [
      {
        label: 'Break-Even CPA',
        get: (v) => {
          const gross = v.price - v.cogs - v.shipping_out - v.packaging
            - v.price * ((v.fees + v.refund_rate) / 100);
          return money(gross);
        },
        tone: (v) => {
          const gross = v.price - v.cogs - v.shipping_out - v.packaging
            - v.price * ((v.fees + v.refund_rate) / 100);
          return gross > 0 ? 'good' : 'bad';
        },
        sublabel: 'Max cost per sale to break even',
      },
      {
        label: 'CPA for 20% Margin',
        get: (v) => {
          const gross = v.price - v.cogs - v.shipping_out - v.packaging
            - v.price * ((v.fees + v.refund_rate) / 100);
          return money(gross - 0.2 * v.price);
        },
        primary: false,
        sublabel: 'Comfortable profitability target',
      },
      {
        label: 'Max CPC (at 1% CVR)',
        get: (v) => {
          const gross = v.price - v.cogs - v.shipping_out - v.packaging
            - v.price * ((v.fees + v.refund_rate) / 100);
          return money(gross * 0.01);
        },
        primary: false,
        sublabel: 'Assuming 1% store CVR',
      },
      {
        label: 'Gross Profit / Order',
        get: (v) => money(v.price - v.cogs - v.price * (v.fees / 100)),
        primary: false,
      },
    ],
    benchmarks: [
      { label: 'Healthy CPA room', tone: 'good', range: 'Gross margin > $25' },
      { label: 'Tight', tone: 'warn', range: 'Gross margin $10–$25' },
      { label: 'Unprofitable', tone: 'bad', range: 'Gross margin under $10' },
    ],
    assumptions: [
      'Shipping and packaging default to 0 unless entered in Advanced.',
      'Max CPC assumes 1% store conversion rate — change if your CVR differs.',
      'Refund rate defaults to 0% unless entered.',
    ],
    note: (v) => {
      const gross = v.price - v.cogs - v.shipping_out - v.packaging
        - v.price * ((v.fees + v.refund_rate) / 100);
      return `Your break-even CPA is ${money(gross)} — the most you can pay per sale before you lose money. Keep actual CPA comfortably below this.`;
    },
  },

  // ── 9. CPM / CTR / CPC Calculator ────────────────────────────────────────
  'cpm-calculator': {
    fields: [
      $('spend', 'Ad Spend', 100, 5000, 10),
      numF('impressions', 'Impressions', 12000, 500000, 1000),
      numF('clicks', 'Link Clicks', 180, 10000, 10),
      numAdv('landing_views', 'Landing Page Views', 5000, 10),
      pctAdv('outbound_ctr', 'Outbound CTR %', 10, 0.01),
    ],
    ready: (v) => v.spend > 0 && v.impressions > 0,
    formula: 'CPM = (Spend ÷ Impressions) × 1,000   |   CPC = Spend ÷ Clicks',
    outputs: [
      {
        label: 'CPM',
        get: (v) => money((v.spend / v.impressions) * 1000),
        tone: (v) => {
          const cpm = (v.spend / v.impressions) * 1000;
          return cpm < 15 ? 'good' : cpm < 30 ? 'warn' : 'bad';
        },
        sublabel: 'Cost per 1,000 impressions',
      },
      {
        label: 'CPC',
        get: (v) => (v.clicks > 0 ? money(v.spend / v.clicks) : '—'),
        primary: false,
        sublabel: 'Cost per link click',
      },
      {
        label: 'CTR',
        get: (v) => (v.clicks > 0 ? pct((v.clicks / v.impressions) * 100) : '—'),
        primary: false,
        sublabel: '1%+ is strong',
      },
      {
        label: 'Landing Page Views',
        get: (v) => (v.landing_views > 0 ? v.landing_views.toLocaleString('en-US') : '—'),
        primary: false,
      },
      {
        label: 'Traffic Cost per LPV',
        get: (v) => (v.landing_views > 0 ? money(v.spend / v.landing_views) : '—'),
        primary: false,
      },
    ],
    benchmarks: [
      { label: 'Low CPM (under $15)', tone: 'good', range: 'Under $15' },
      { label: 'Average ($15–$30)', tone: 'warn', range: '$15 – $30' },
      { label: 'High ($30+)', tone: 'bad', range: '$30+' },
    ],
    assumptions: [
      'Landing page views default to 0 unless entered in Advanced.',
      'CPM benchmarks are for Meta ads — Google/TikTok differ.',
      'CTR benchmarks: 1%+ link CTR is strong on Meta cold traffic.',
    ],
    note: (v) =>
      `You paid ${money((v.spend / v.impressions) * 1000)} per 1,000 impressions. High CPM usually means weak hook or saturated audience — a better creative lowers CPM and CPC together.`,
  },

  // ── 10. Ad Testing Budget Calculator ─────────────────────────────────────
  'ad-testing-budget-calculator': {
    fields: [
      numF('products', 'Products to Test', 3, 10, 1, { min: 1 }),
      $('daily', 'Daily Budget per Product', 20, 200, 5, { min: 5 }),
      numF('days', 'Test Length', 3, 14, 1, { min: 1, unit: ' days' }),
      $('cpa', 'Expected CPA', 25, 150, 1),
      numAdv('target_purchases', 'Target Purchases per Product', 50, 1),
    ],
    ready: (v) => v.products > 0 && v.daily > 0 && v.days > 0,
    formula: 'Total Budget = Products × Daily Budget × Test Days',
    outputs: [
      {
        label: 'Total Test Budget',
        get: (v) => money(v.products * v.daily * v.days),
        tone: () => 'warn',
        sublabel: 'Budget this as a data purchase',
      },
      {
        label: 'Spend per Product',
        get: (v) => money(v.daily * v.days),
        primary: false,
      },
      {
        label: 'Expected Purchases',
        get: (v) => {
          if (!v.cpa) return '—';
          const purchases = (v.daily * v.days) / v.cpa;
          return `~${purchases.toFixed(0)} per product`;
        },
        primary: false,
        sublabel: 'Based on expected CPA',
      },
      {
        label: 'Budget for Target Purchases',
        get: (v) => {
          if (!v.target_purchases || !v.cpa) return '—';
          return money(v.target_purchases * v.cpa * v.products);
        },
        primary: false,
        sublabel: 'To hit purchase target (Advanced)',
      },
    ],
    benchmarks: [
      { label: 'Minimum viable test', tone: 'warn', range: '2–3× target CPA per product' },
      { label: 'Good signal', tone: 'good', range: '5–10 purchases per product' },
      { label: 'Underspend (kill early)', tone: 'bad', range: 'Under 1× target CPA' },
    ],
    assumptions: [
      'Target purchases default to 0 — budget is calculated from daily × days.',
      'Expected CPA is your estimate — actuals will differ.',
      'Each product gets an equal daily budget.',
    ],
    note: (v) =>
      `Budget ${money(v.products * v.daily * v.days)} to give ${v.products} products a fair ${v.days}-day test. Treat this as money spent to buy data — most products will fail, and that's exactly the point.`,
  },

  // ── 11. Customer Lifetime Value (LTV) Calculator ──────────────────────────
  'customer-lifetime-value-calculator': {
    fields: [
      $('aov', 'Average Order Value', 49, 500),
      pctF('margin', 'Gross Margin', 65, 95, 1),
      numF('freq', 'Purchases per Year', 2.5, 12, 0.5, { min: 0.5 }),
      numF('years', 'Customer Lifespan', 2, 7, 0.5, { min: 0.5, unit: ' yrs' }),
      pctAdv('retention', 'Annual Retention Rate %', 100, 1),
      pctAdv('repeat_pct', 'Repeat Purchase Rate %', 100, 1),
      $adv('cac', 'Customer Acquisition Cost (CAC)', 100, 1),
    ],
    ready: (v) => v.aov > 0 && v.freq > 0 && v.years > 0,
    formula: 'LTV = AOV × Purchase Frequency × Lifespan (years)',
    outputs: [
      {
        label: 'Revenue LTV',
        get: (v) => money(v.aov * v.freq * v.years),
        tone: () => 'good',
        sublabel: 'Total revenue per customer',
      },
      {
        label: 'Gross Profit LTV',
        get: (v) => money(v.aov * v.freq * v.years * (v.margin / 100)),
        primary: false,
        sublabel: 'What you actually keep',
      },
      {
        label: 'LTV : CAC Ratio',
        get: (v) => {
          if (!v.cac) return '—';
          const ltv = v.aov * v.freq * v.years * (v.margin / 100);
          return x(ltv / v.cac);
        },
        primary: false,
        sublabel: '3× or higher is healthy',
      },
      {
        label: 'Max Profitable CAC',
        get: (v) => money(v.aov * v.freq * v.years * (v.margin / 100)),
        primary: false,
        sublabel: 'Most you can spend to acquire',
      },
    ],
    benchmarks: [
      { label: 'LTV:CAC 3×+', tone: 'good', range: '3× or above' },
      { label: 'LTV:CAC 1–3×', tone: 'warn', range: '1× – 3×' },
      { label: 'LTV:CAC under 1×', tone: 'bad', range: 'Below 1×' },
    ],
    assumptions: [
      'CAC defaults to 0 — LTV:CAC ratio requires CAC in Advanced.',
      'Retention rate is informational — does not adjust the base calculation.',
      'LTV does not account for fixed operating costs.',
    ],
    note: (v) =>
      `Each customer is worth ${money(v.aov * v.freq * v.years * (v.margin / 100))} in gross profit over their lifetime — that's the most you can spend acquiring them and still win long-term.`,
  },

  // ── 12. Ecommerce Cash-Flow Calculator ───────────────────────────────────
  'ecommerce-cash-flow-calculator': {
    fields: [
      $('spend', 'Daily Ad Spend', 200, 10000, 50),
      $('cogs', 'Daily Product + Shipping Cost', 120, 5000, 50),
      numF('delay', 'Payout Delay', 5, 30, 1, { min: 1, unit: ' days' }),
      $adv('inventory', 'Inventory Purchase (one-time)', 5000, 100),
      numAdv('supplier_terms', 'Supplier Payment Terms (days)', 60, 1),
      $adv('refund_reserve', 'Refund Reserve (monthly)', 2000, 50),
    ],
    ready: (v) => v.spend > 0 && v.delay > 0,
    formula: 'Working Capital = (Daily Ad Spend + Daily COGS) × Payout Delay',
    outputs: [
      {
        label: 'Working Capital Needed',
        get: (v) => money((v.spend + v.cogs) * v.delay + v.inventory),
        tone: () => 'warn',
        sublabel: 'To bridge the payout gap',
      },
      {
        label: 'Cash Out per Day',
        get: (v) => money(v.spend + v.cogs),
        primary: false,
      },
      {
        label: 'Monthly Cash Required',
        get: (v) => money((v.spend + v.cogs) * 30 + v.refund_reserve + v.inventory),
        primary: false,
      },
      {
        label: 'Float Across Gap',
        get: (v) => money((v.spend + v.cogs) * v.delay),
        primary: false,
        sublabel: 'Tied up in transit revenue',
      },
    ],
    benchmarks: [
      { label: 'Safe runway', tone: 'good', range: '60+ days of cash' },
      { label: 'Tight', tone: 'warn', range: '30–60 days' },
      { label: 'Risky', tone: 'bad', range: 'Under 30 days' },
    ],
    assumptions: [
      'Inventory and refund reserve default to 0 unless entered in Advanced.',
      'Supplier terms are informational — they reduce effective cash outflow if negotiated.',
      'This models operational cash flow, not profit.',
    ],
    note: (v) =>
      `You spend on ads and inventory today, but payouts land ~${v.delay.toFixed(0)} days later. You need ${money((v.spend + v.cogs) * v.delay + v.inventory)} to bridge that gap. This is what kills profitable-on-paper stores.`,
  },

  // ── 13. Dropshipping Scaling Calculator ──────────────────────────────────
  'dropshipping-scaling-calculator': {
    fields: [
      $('spend', 'Current Daily Ad Spend', 100, 5000, 10),
      numF('roas', 'Current ROAS', 2.4, 10, 0.1, { min: 0.1, unit: '×' }),
      $('target', 'Target Daily Ad Spend', 500, 20000, 50),
      pctAdv('roas_decay', 'Expected ROAS Decay %', 50, 1),
      pctAdv('margin', 'Gross Margin %', 95, 1),
    ],
    ready: (v) => v.spend > 0 && v.roas > 0 && v.target > 0,
    formula: 'Projected Revenue = Target Spend × ROAS × (1 − Decay%)',
    outputs: [
      {
        label: 'Projected Daily Revenue',
        get: (v) => {
          const adjRoas = v.roas * (1 - (v.roas_decay || 0) / 100);
          return money(v.target * adjRoas);
        },
        tone: () => 'good',
      },
      {
        label: 'Projected Monthly Revenue',
        get: (v) => {
          const adjRoas = v.roas * (1 - (v.roas_decay || 0) / 100);
          return money(v.target * adjRoas * 30);
        },
        primary: false,
      },
      {
        label: 'Expected ROAS at Scale',
        get: (v) => x(v.roas * (1 - (v.roas_decay || 0) / 100)),
        primary: false,
        sublabel: 'After expected decay',
      },
      {
        label: 'Projected Monthly Profit',
        get: (v) => {
          if (!v.margin) return '—';
          const adjRoas = v.roas * (1 - (v.roas_decay || 0) / 100);
          const rev = v.target * adjRoas * 30;
          return money(rev * (v.margin / 100) - v.target * 30);
        },
        primary: false,
        sublabel: 'After ad spend (Advanced)',
      },
    ],
    benchmarks: [
      { label: 'Scaling safely', tone: 'good', range: 'ROAS stays above break-even' },
      { label: 'Watch carefully', tone: 'warn', range: 'ROAS approaching break-even' },
      { label: 'Stop and review', tone: 'bad', range: 'ROAS below break-even' },
    ],
    assumptions: [
      'ROAS decay defaults to 0% — add expected decay in Advanced for realistic projections.',
      'Gross margin defaults to 0 unless entered — profit projection requires it.',
      'ROAS usually dips when budget is increased rapidly.',
    ],
    note: (v) => {
      const adjRoas = v.roas * (1 - (v.roas_decay || 0) / 100);
      return `At ${money(v.target)}/day and a ${x(adjRoas)} ROAS, you'd project ${money(v.target * adjRoas * 30)}/month. Step budget up gradually (20–30% at a time) to avoid resetting the learning phase.`;
    },
  },

  // ── 14. Sales Tax Calculator ──────────────────────────────────────────────
  'sales-tax-calculator': {
    fields: [
      $('amount', 'Order Subtotal', 49, 1000, 1),
      pctF('rate', 'Sales Tax / VAT / GST Rate', 8.25, 30, 0.25),
    ],
    ready: (v) => v.amount > 0 && v.rate >= 0,
    formula: 'Tax = Amount × Rate%   |   Inclusive: Tax = Amount − Amount ÷ (1 + Rate%)',
    outputs: [
      {
        label: 'Tax Amount',
        get: (v) => money(v.amount * (v.rate / 100)),
        tone: () => 'neutral',
        sublabel: 'Added on top of price',
      },
      {
        label: 'Total (Tax Exclusive)',
        get: (v) => money(v.amount + v.amount * (v.rate / 100)),
        primary: false,
        sublabel: 'Price + tax',
      },
      {
        label: 'Tax if Price Includes It',
        get: (v) => money(v.amount - v.amount / (1 + v.rate / 100)),
        primary: false,
        sublabel: 'Tax-inclusive (VAT style)',
      },
      {
        label: 'Pre-Tax Price (inclusive)',
        get: (v) => money(v.amount / (1 + v.rate / 100)),
        primary: false,
        sublabel: 'Net of included tax',
      },
    ],
    benchmarks: [
      { label: 'US Average Sales Tax', tone: 'neutral', range: '~7–10%' },
      { label: 'UK VAT', tone: 'neutral', range: '20%' },
      { label: 'EU VAT (varies)', tone: 'neutral', range: '19–25%' },
    ],
    assumptions: [
      'Rates vary by country, state, and product category — always verify your obligations.',
      'This calculator does not determine whether you have tax nexus.',
      'Income tax is excluded.',
    ],
    note: (v) =>
      `At ${v.rate.toFixed(2)}%, this ${money(v.amount)} order carries ${money(v.amount * (v.rate / 100))} in tax. Confirm your nexus obligations — requirements vary by jurisdiction.`,
  },
};
