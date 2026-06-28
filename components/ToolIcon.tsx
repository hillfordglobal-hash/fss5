/**
 * ToolIcon — clean, Apple-style thin-line icons (SF-Symbols flavour) for each
 * tool, keyed by slug. Stroke uses currentColor so the caller controls colour.
 * Replaces the emoji that previously prefixed tool titles.
 */
type IconKey =
  | 'chart-up' | 'wallet' | 'tag' | 'receipt' | 'cart' | 'basket' | 'target'
  | 'gauge' | 'bars' | 'flask' | 'loop' | 'bank' | 'wave' | 'percent'
  | 'badge-check' | 'link' | 'bulb' | 'calc';

const SLUG_ICON: Record<string, IconKey> = {
  'break-even-roas-calculator': 'calc',
  'profit-margin-calculator': 'chart-up',
  'dropshipping-profit-calculator': 'wallet',
  'product-pricing-calculator': 'tag',
  'shopify-fee-calculator': 'receipt',
  'conversion-rate-calculator': 'cart',
  'average-order-value-calculator': 'basket',
  'target-roas-calculator': 'target',
  'break-even-cpa-calculator': 'gauge',
  'cpm-calculator': 'bars',
  'ad-testing-budget-calculator': 'flask',
  'customer-lifetime-value-calculator': 'loop',
  'ecommerce-cash-flow-calculator': 'bank',
  'dropshipping-scaling-calculator': 'wave',
  'sales-tax-calculator': 'percent',
  'winning-product-scorecard': 'badge-check',
  'utm-builder': 'link',
  'niche-idea-generator': 'bulb',
};

const PATHS: Record<IconKey, React.ReactNode> = {
  'chart-up': <><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7 15l4-4 3 3 5-6" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M16 12h2.5" /><path d="M3 9h13a2 2 0 0 1 0 0" /></>,
  tag: <><path d="M4 4h7l9 9-7 7-9-9z" /><circle cx="8.5" cy="8.5" r="1.4" /></>,
  receipt: <><path d="M6 3h12v18l-2.2-1.4L13.6 21 12 19.5 10.4 21 8.2 19.6 6 21z" /><path d="M9 8h6M9 12h6" /></>,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.2 11h10l2-7H6" /></>,
  basket: <><path d="M5 9h14l-1.3 9.5a1.5 1.5 0 0 1-1.5 1.3H7.8a1.5 1.5 0 0 1-1.5-1.3z" /><path d="M9 9l3-5 3 5" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /></>,
  gauge: <><path d="M4 16a8 8 0 0 1 16 0" /><path d="M12 16l4-4" /><circle cx="12" cy="16" r="1" /></>,
  bars: <><path d="M5 20V11M10 20V5M15 20v-7M20 20V8" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-8V3" /><path d="M7.5 15h9" /></>,
  loop: <><path d="M4 12a8 8 0 0 1 14-5.3L20 8" /><path d="M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-14 5.3L4 16" /><path d="M4 20v-4h4" /></>,
  bank: <><path d="M4 10l8-5 8 5" /><path d="M5 10v8M19 10v8M9 10v8M15 10v8" /><path d="M3 20h18" /></>,
  wave: <><path d="M4 14c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4" /><path d="M4 19h16" /></>,
  percent: <><circle cx="7.5" cy="7.5" r="2.2" /><circle cx="16.5" cy="16.5" r="2.2" /><path d="M18 6L6 18" /></>,
  'badge-check': <><path d="M12 3l2.3 1.7 2.8-.2 1 2.7 2.3 1.6-.8 2.7.8 2.7-2.3 1.6-1 2.7-2.8-.2L12 21l-2.3-1.7-2.8.2-1-2.7-2.3-1.6.8-2.7-.8-2.7 2.3-1.6 1-2.7 2.8.2z" /><path d="M9 12l2 2 4-4" /></>,
  link: <><path d="M9 15l6-6" /><path d="M10.5 6.5l1.5-1.5a3.5 3.5 0 0 1 5 5l-2 2" /><path d="M13.5 17.5l-1.5 1.5a3.5 3.5 0 0 1-5-5l2-2" /></>,
  bulb: <><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .9 1.6h5.2c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3z" /></>,
  calc: <><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8 7h8" /><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h4" /></>,
};

export default function ToolIcon({ slug, size = 20 }: { slug: string; size?: number }) {
  const key = SLUG_ICON[slug] ?? 'calc';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: 'none' }}
    >
      {PATHS[key]}
    </svg>
  );
}
