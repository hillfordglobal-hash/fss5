import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import SchemaMarkup from '@/components/SchemaMarkup';
import DesktopHeaderControls from '@/components/DesktopHeaderControls';
import MobileHeader from '@/components/MobileHeader';
import MobileSidebarController from '@/components/MobileSidebarController';
import GlobalInteractivity from '@/components/GlobalInteractivity';
import Analytics from '@/components/Analytics';
import SiteGuard from '@/components/SiteGuard';
import FeedbackWidget from '@/components/FeedbackWidget';

// The 5 production CSS files are served as static assets from /public/css
// and linked directly (cascade order matters — do not reorder) rather than
// imported through globals.css, since Next's CSS pipeline doesn't treat
// @import url('/abs/path') as a plain public-asset reference.
const cssFiles = [
  '/css/1-tokens-base.css',
  '/css/2-layout-sidebar-nav.css',
  '/css/3-components.css',
  '/css/4-features-redesign.css',
  '/css/5-polish-fixes-final.css',
  '/css/6-apple-redesign.css',
];

export const metadata: Metadata = {
  metadataBase: new URL('https://firstsalesociety.com'),
  title: {
    default: 'First Sale Society — The Ecommerce Operator Curriculum',
    template: '%s',
  },
  description:
    'The complete ecommerce operator curriculum. Product research, Meta ads, Shopify store building, supplier sourcing, and scaling — built by operators running real ad spend in 2026.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'First Sale Society',
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    siteName: 'First Sale Society',
    title: 'The Ecommerce Operator Curriculum — First Sale Society',
    description:
      'The complete operator curriculum for dropshipping and ecommerce. Product research, Meta ads, Shopify, supplier sourcing, and scaling — built by active operators in 2026.',
    url: 'https://firstsalesociety.com',
    images: [
      {
        url: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png',
        width: 1200,
        height: 630,
        alt: 'First Sale Society — Ecommerce Operator Curriculum',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Sale Society — The Ecommerce Operator Curriculum',
    description:
      'The complete operator curriculum for dropshipping and ecommerce. Product research, Meta ads, sourcing, store building, and scaling — built by active operators.',
    images: ['https://firstsalesociety.com/moduleimages/firstsalesociety.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://firstsalesociety.com#org',
  name: 'First Sale Society',
  url: 'https://firstsalesociety.com',
  logo: 'https://firstsalesociety.com/moduleimages/firstsalesociety.png',
  description: 'Comprehensive dropshipping and ecommerce operator curriculum. 27 modules, 79 FAQs, 49 glossary terms, and 20+ calculators — built by active operators running real ad spend.',
  foundingDate: '2026',
  sameAs: ['https://discord.gg/sYwE5Mhw9Z'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://firstsalesociety.com#website',
  name: 'First Sale Society',
  url: 'https://firstsalesociety.com',
  description: 'Dropshipping and ecommerce operator curriculum — course, calculators, glossary, and FAQs built by active operators.',
  publisher: { '@id': 'https://firstsalesociety.com#org' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://firstsalesociety.com/glossary?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Inline, render-blocking theme preload script — runs before paint so there's
// no flash of dark mode before React hydrates. Defaults to light unless the
// person previously chose dark (mirrors ThemeToggle.tsx's logic exactly).
// Split into two parts because <body> doesn't exist yet when <head> scripts
// run (same reason the original CSS mirrors html.preload-dark / body.dark-mode
// separately — see the comment in 1-tokens-base.css).
// Render-blocking theme preload. Plain inline <script> (NOT next/script) so it
// runs synchronously before first paint on EVERY full page load — including the
// hard navigations triggered by the prev/next module links — which is what keeps
// the chosen theme from snapping back to light. Drives html.preload-dark/-light
// (the canonical flag the CSS keys off) plus the body class for live toggling.
const htmlPreloadScript = `
(function(){
  try {
    var dark = localStorage.getItem('ecom_theme') === 'dark';
    var d = document.documentElement;
    d.classList.toggle('preload-dark', dark);
    d.classList.toggle('preload-light', !dark);
  } catch(e) {}
})();
`;

const bodyPreloadScript = `
(function(){
  try {
    var dark = localStorage.getItem('ecom_theme') === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {cssFiles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script dangerouslySetInnerHTML={{ __html: htmlPreloadScript }} />
      </head>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: bodyPreloadScript }} />
        <Analytics />
        <SiteGuard />
        <FeedbackWidget />
        <SchemaMarkup schema={[organizationSchema, websiteSchema]} />
        <MobileSidebarController />
        <GlobalInteractivity />
        <nav aria-label="Course navigation" id="sidebar">
          <div className="sidebar-progress-bar">
            <div className="sidebar-progress-fill" id="sidebar-progress-fill"></div>
          </div>
          <Sidebar />
        </nav>
        <div id="sidebar-backdrop"></div>
        <MobileHeader />
        <DesktopHeaderControls />
        <div id="main">{children}</div>

        {/* Glossary quick-reference modal — persistent shell element from index.html,
            populated from the 35 terms embedded there (quick-reference subset of the
            richer /glossary route). The filterGlossary() + gcat-btn click handlers
            are wired in ModuleInteractivity.tsx via the existing glossary modal section. */}
        <div aria-labelledby="glossary-modal-title" aria-modal="true" id="glossary-modal" role="dialog">
          <div className="glossary-box">
            <div className="glossary-header">
              <div className="glossary-title" id="glossary-modal-title">Glossary</div>
              <button aria-label="Close glossary" className="glossary-close" id="glossary-close-btn" type="button">×</button>
            </div>
            <div className="glossary-search-wrap">
              <input autoComplete="off" className="glossary-search" id="glossary-search-input" placeholder="Search terms, metrics, definitions…" spellCheck={false} type="text" />
            </div>
            <div className="glossary-cats" id="glossary-cats">
              <button className="gcat-btn active" data-cat="all" type="button">All</button>
              <button className="gcat-btn" data-cat="Metrics" type="button">📊 Metrics</button>
              <button className="gcat-btn" data-cat="Meta Ads" type="button">📣 Meta Ads</button>
              <button className="gcat-btn" data-cat="Creative" type="button">🎬 Creative</button>
              <button className="gcat-btn" data-cat="Creative Strategy" type="button">🧭 Strategy</button>
              <button className="gcat-btn" data-cat="Tracking" type="button">📡 Tracking</button>
              <button className="gcat-btn" data-cat="Store Metrics" type="button">🛒 Store</button>
              <button className="gcat-btn" data-cat="Finance" type="button">💰 Finance</button>
              <button className="gcat-btn" data-cat="Supply Chain" type="button">📦 Supply Chain</button>
              <button className="gcat-btn" data-cat="Funnel" type="button">🔁 Funnel</button>
              <button className="gcat-btn" data-cat="Scaling" type="button">📈 Scaling</button>
              <button className="gcat-btn" data-cat="Monetization" type="button">💎 Monetization</button>
            </div>
            <div aria-live="polite" id="glossary-count" role="status"></div>
            <div className="glossary-list" id="glossary-list">
              <div id="glossary-empty" style={{ display: 'none', padding: '48px 26px', textAlign: 'center', color: 'var(--text3)', fontSize: 14 }}>
                No terms match your search.
              </div>
              {/* Quick-reference terms from index.html — 35 terms, simpler markup than
                  the richer /glossary route but immediately accessible via keyboard shortcut G */}
              <div className="glossary-item"><b className="gt">ROAS</b><p className="gd">Return on Ad Spend. Revenue ÷ Ad Spend. Your break-even ROAS = Selling Price ÷ Gross Profit. Every scaling decision is relative to YOUR break-even, not a generic benchmark.</p><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">CPA</div><div className="glossary-def">Cost Per Acquisition (per purchase). Total spend ÷ number of purchases. Your target CPA = your gross profit per order — what you can afford to pay and still break even.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">CBO</div><div className="glossary-def">Campaign Budget Optimization. Meta allocates your campaign-level budget across ad sets automatically based on performance. Use CBO for scaling proven winners. Use ABO for testing — CBO starves angle variations of data during tests.</div><span className="glossary-tag">Meta Ads</span></div>
              <div className="glossary-item"><div className="glossary-term">ABO</div><div className="glossary-def">Ad Set Budget Optimization. You control exactly how much each adset spends. Essential for testing — gives equal data to every angle. Switch to CBO once winners are confirmed for efficient budget allocation at scale.</div><span className="glossary-tag">Meta Ads</span></div>
              <div className="glossary-item"><div className="glossary-term">CTR (Link Click-Through Rate)</div><div className="glossary-def">% of people who saw your ad and clicked the link to your store. Below 0.5% after $30 spend = creative/hook problem. 0.8–2% is normal. Above 2% is strong. Always use Link CTR — not &ldquo;All CTR&rdquo; which inflates with non-purchase clicks.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">ATC Rate</div><div className="glossary-def">Add-to-Cart Rate. % of store visitors who add to cart. Below 3% = product page or offer problem. 5–8% is acceptable. Above 8% = strong offer-product fit. High ATC + zero purchases = checkout friction, not product problem.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">Hook Rate</div><div className="glossary-def">% of people who watch the first 3 seconds of your video. Below 25% = hook failure. 35–50% is good. Above 50% is excellent.</div><span className="glossary-tag">Creative</span></div>
              <div className="glossary-item"><div className="glossary-term">Learning Phase</div><div className="glossary-def">7 days or 50 purchase events during which Meta builds a delivery model for your campaign. Never edit campaigns during learning — it resets the clock.</div><span className="glossary-tag">Meta Ads</span></div>
              <div className="glossary-item"><div className="glossary-term">CPM</div><div className="glossary-def">Cost Per 1,000 Impressions. The foundational cost of your metrics. High CPM means higher CPC and CPA. Never celebrate low CPM — always read it with CVR.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">AOV</div><div className="glossary-def">Average Order Value. Total revenue ÷ number of orders. Increase with bundles, upsells, and order bumps.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">LTV</div><div className="glossary-def">Lifetime Value. Total revenue a customer generates across all purchases. Changes your entire acquisition math.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">MER</div><div className="glossary-def">Marketing Efficiency Ratio. Total revenue ÷ total ad spend across ALL channels. More honest than ROAS.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">Sourcing Agent</div><div className="glossary-def">A person/company in China managing supplier relationships on your behalf. Replaces CJDropshipping at scale.</div><span className="glossary-tag">Supply Chain</span></div>
              <div className="glossary-item"><div className="glossary-term">Ugly Winner</div><div className="glossary-def">A creative that looks rough but significantly outperforms polished ads. Do not pause or &ldquo;upgrade&rdquo; ugly winners.</div><span className="glossary-tag">Creative</span></div>
              <div className="glossary-item"><div className="glossary-term">CAC</div><div className="glossary-def">Customer Acquisition Cost. Total acquisition costs ÷ customers acquired. At scale, true CAC is always higher than platform-reported CPA.</div><span className="glossary-tag">Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">Creative Brief</div><div className="glossary-def">A document specifying the hook, angle, persona, problem, product benefit, and CTA for an ad. Brief quality is the single biggest determinant of creative output quality.</div><span className="glossary-tag">Creative</span></div>
              <div className="glossary-item"><div className="glossary-term">COGS</div><div className="glossary-def">Cost of Goods Sold. Product cost + shipping + payment fees per unit. Gross margin = Revenue − COGS.</div><span className="glossary-tag">Finance</span></div>
              <div className="glossary-item"><div className="glossary-term">3PL</div><div className="glossary-def">Third-Party Logistics. A warehouse/fulfillment service. Relevant once you move to bulk ordering at 20+ orders/day.</div><span className="glossary-tag">Supply Chain</span></div>
              <div className="glossary-item"><div className="glossary-term">Break-Even ROAS</div><div className="glossary-def">The ROAS at which revenue exactly covers ad spend plus COGS. Formula: Selling Price ÷ (Selling Price − COGS − Fees).</div><span className="glossary-tag">Finance</span></div>
              <div className="glossary-item"><div className="glossary-term">Advertorial / Bridge Page</div><div className="glossary-def">A pre-sell landing page styled as editorial content. Warms cold traffic before the purchase ask.</div><span className="glossary-tag">Funnel</span></div>
              <div className="glossary-item"><div className="glossary-term">VSL</div><div className="glossary-def">Video Sales Letter. A longer-form ad (2–5 min) that builds a full case: problem, failed alternatives, solution, social proof, offer.</div><span className="glossary-tag">Creative</span></div>
              <div className="glossary-item"><div className="glossary-term">CVR</div><div className="glossary-def">Conversion Rate. % of store visitors who purchase. Below 1% is concerning. 1.5–2.5% is industry average.</div><span className="glossary-tag">Store Metrics</span></div>
              <div className="glossary-item"><div className="glossary-term">Frequency</div><div className="glossary-def">Average number of times each person in your audience has seen your ad. Above 3–4 = audience saturation.</div><span className="glossary-tag">Meta Ads</span></div>
              <div className="glossary-item"><div className="glossary-term">Surf Scaling</div><div className="glossary-def">Budget management technique that increases spend in profitable daily windows and reduces it during low-converting periods.</div><span className="glossary-tag">Scaling</span></div>
              <div className="glossary-item"><div className="glossary-term">Creative Fatigue</div><div className="glossary-def">Performance degradation when the same creative has saturated its available audience. Fix: fresh creative with new angles, not more budget.</div><span className="glossary-tag">Creative</span></div>
              <div className="glossary-item"><div className="glossary-term">Cash Float</div><div className="glossary-def">The gap between when Meta charges your card and when Shopify pays you. Use business credit cards to create 30-day float.</div><span className="glossary-tag">Finance</span></div>
              <div className="glossary-item"><div className="glossary-term">Voice of Customer (VOC)</div><div className="glossary-def">The actual language real customers use to describe their problems. Sourced from Amazon reviews, Reddit, TikTok comments.</div><span className="glossary-tag">Creative Strategy</span></div>
              <div className="glossary-item"><div className="glossary-term">Offer Stack</div><div className="glossary-def">The combination of elements making up your purchase proposition: product, price, shipping, guarantee, bonuses, urgency, social proof.</div><span className="glossary-tag">CRO</span></div>
              <div className="glossary-item"><div className="glossary-term">Abandoned Cart Flow</div><div className="glossary-def">Automated email/SMS sequence for visitors who add to cart but don&apos;t complete checkout. Recovers 10–20% of abandoned carts.</div><span className="glossary-tag">Email</span></div>
              <div className="glossary-item"><div className="glossary-term">Business Manager (Meta)</div><div className="glossary-def">Meta&apos;s central hub for managing ad accounts, pixels, pages, and team access. Keep a backup BM ready before you need it.</div><span className="glossary-tag">Account</span></div>
            </div>
          </div>
        </div>

        {/* Stage-complete overlay — fires when a user completes a phase in the SPA.
            In the Next.js build, checkStageComplete() is wired in ModuleInteractivity;
            it shows this overlay on checklist completion milestones. */}
        <div aria-labelledby="sc-title" aria-modal="true" id="stage-complete-overlay" role="dialog">
          <div className="stage-complete-box">
            <div className="stage-complete-icon">✓</div>
            <div className="stage-complete-eyebrow" id="sc-eyebrow">Stage Complete</div>
            <div className="stage-complete-title" id="sc-title">Stage Complete</div>
            <div className="stage-complete-sub" id="sc-sub">You&apos;ve covered the full stage. Keep going.</div>
            <div className="stage-complete-actions">
              <button className="stage-complete-primary" id="sc-next-btn">Continue →</button>
              <button className="stage-complete-secondary" id="sc-stay-btn">Stay and review</button>
            </div>
          </div>
        </div>

        {/* Scroll-to-top button */}
        <button
          aria-label="Scroll to top"
          id="scroll-top-btn"
          title="Back to top"
        >↑</button>

        {/* ── Passive copy-detection pixel + attribution credit ──
            The pixel's src points at YOUR domain. If someone copies this build
            and rehosts it, the <img> still requests firstsalesociety.com, so your
            server access logs record the request with the clone's domain as the
            Referer — a copy alert that works even with JavaScript disabled.
            (Serve any 1×1 asset at /_px.gif, or repoint to an existing asset and
            watch its referrers.) The visually-hidden credit is a real backlink:
            copiers who don't strip it hand you SEO attribution. */}
        <img
          src="https://firstsalesociety.com/_px.gif"
          alt=""
          width={1}
          height={1}
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
          Original content by First Sale Society —{' '}
          <a href="https://firstsalesociety.com" rel="author">firstsalesociety.com</a>.
        </div>
      </body>
    </html>
  );
}
