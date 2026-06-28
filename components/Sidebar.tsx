'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar navigation — ported 1:1 from index.html's <nav id="sidebar">.
 * Same structure, same section labels, same icons/numbers, same order.
 * data-page button → URL mapping follows Task 3.2 of
 * FSS_Claude_Implementation_Prompt.md exactly.
 */
export default function Sidebar() {
  return (
    <>
      <div style={{ padding: '12px 12px 8px', background: 'var(--surface2,#1e1e2e)' }}>
        <Link href="/" aria-label="First Sale Society — Home" style={{ display: 'block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="First Sale Society"
            src="/moduleimages/firstsalesociety.png"
            style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }}
          />
        </Link>
      </div>
      <div className="sidebar-nav">
        <div className="nav-search-wrap">
          <svg className="nav-search-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
          <input
            id="nav-search"
            className="nav-search"
            type="search"
            placeholder="Search modules…"
            aria-label="Search modules"
            autoComplete="off"
          />
        </div>
        {/* Resources section — distinct from course phases */}
        <div className="nav-phase-group nav-resources-group" data-phase="resources">
          <div className="nav-section-label sr"><PhaseIcon name="resources" /><span>Operator Resources</span></div>
          <NavLink href="/tools" icon="🧮" label="Free Tools" />
          <NavLink href="/ai-ad-lab" icon="🎬" label="AI Ad Creative Lab" />
          <NavLink href="/swipe-files" icon="📂" label="Swipe Files" />
          <NavLink href="/toolkit" icon="🧰" label="Toolkit" />
          <NavLink href="/faq" icon="❓" label="FAQs" />
          <NavLink href="/glossary" icon="📖" label="Full Glossary" />
        </div>

        <div className="nav-phase-group" data-phase="1">
          <div className="nav-section-label s1"><PhaseIcon name="find" /><span>Phase 1 · Find a Product</span></div>
          <NavLink href="/course/start-here" num="01" label="START here" id="nav-home" />
          <NavLink href="/course/pick-your-niche" num="02" label="Pick Your Niche" />
          <NavLink href="/course/find-winning-products" num="03" label="Find Winning Products" />
          <NavLink href="/course/research-your-buyer" num="04" label="Research Your Buyer" />
          <NavLink href="/course/validate-the-product" num="05" label="Validate the Product" />
        </div>

        <div className="nav-phase-group" data-phase="2">
          <div className="nav-section-label s2"><PhaseIcon name="source" /><span>Phase 2 · Source It</span></div>
          <NavLink href="/course/connect-your-supplier" num="06" label="Connect Your Supplier" />
        </div>

        <div className="nav-phase-group" data-phase="3">
          <div className="nav-section-label s3"><PhaseIcon name="store" /><span>Phase 3 · Build the Store</span></div>
          <NavLink href="/course/build-shopify-store" num="07" label="Build Shopify Store" />
        </div>

        <div className="nav-phase-group" data-phase="4">
          <div className="nav-section-label s4"><PhaseIcon name="ads" /><span>Phase 4 · Make Ads</span></div>
          <NavLink href="/course/pick-your-ad-angles" num="08" label="Pick Your Ad Angles" />
        </div>

        <div className="nav-phase-group" data-phase="5">
          <div className="nav-section-label s5"><PhaseIcon name="launch" /><span>Phase 5 · Launch &amp; Test Ads</span></div>
          <NavLink href="/course/image-ads" num="09" label="Image Ads" />
          <NavLink href="/course/video-ads" num="09B" label="Video Ads" />
          <NavLink href="/course/set-up-your-campaign" num="10" label="Set Up Your Campaign" />
          <NavLink href="/course/read-your-data" num="11" label="Read Your Data" />
          <NavLink href="/course/kill-or-scale" num="12" label="Kill or Scale" />
        </div>

        <div className="nav-phase-group" data-phase="6">
          <div className="nav-section-label s6"><PhaseIcon name="sales" /><span>Phase 6 · After First Sales</span></div>
          <NavLink href="/course/improve-your-store-page" num="13" label="Improve Your Store Page" />
          <NavLink href="/course/improve-your-offer" num="14" label="Improve Your Offer" />
          <NavLink href="/course/set-up-email-flows" num="15" label="Set Up Email Flows" />
          <NavLink href="/course/handle-ad-account-bans" num="16" label="Handle Ad Account Bans" />
        </div>

        <div className="nav-phase-group" data-phase="7">
          <div className="nav-section-label s7"><PhaseIcon name="scale" /><span>Phase 7 · Scale &amp; Build a Brand</span></div>
          <NavLink href="/course/scale-your-ads" num="17" label="Scale Your Budget" />
          <NavLink href="/course/build-a-brand" num="18" label="Store to Brand &amp; Supply Chain" />
          <NavLink href="/course/private-suppliers" num="19" label="Keep Customers Coming Back" />
        </div>

        <div className="nav-phase-group" data-phase="bonus">
          <div className="nav-section-label sb"><PhaseIcon name="bonus" /><span>Bonus Modules</span></div>
          <NavLink href="/course/cash-flow" num="20" label="Cash Flow Basics" />
          <NavLink href="/course/payments" num="21" label="Payments Education" />
          <NavLink href="/course/ad-copy" num="22" label="Ad Copy &amp; Scripts" />
          <NavLink href="/course/native-ads-advertorials" num="23" label="Native Ads &amp; Advertorials" />
          <NavLink href="/course/legal-tax-business" num="24" label="Business, Legal &amp; Tax Basics" />
          <NavLink href="/course/hiring" num="25" label="Hiring Your First Team" />
          <NavLink href="/course/supplements-niche" num="26" label="Supplements &amp; Restricted Niches" />
        </div>
      </div>
      <div
        style={{
          padding: '16px 20px 24px',
          borderTop: '1px solid var(--border)',
          background: 'linear-gradient(0deg, rgba(88,101,242,0.05), transparent)',
          marginTop: 'auto',
        }}
      >
        <a
          href="https://discord.gg/sYwE5Mhw9Z"
          rel="noopener"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'linear-gradient(135deg,rgba(88,101,242,0.15),rgba(88,101,242,0.05))',
            border: '1px solid rgba(88,101,242,0.3)',
            borderRadius: 10,
            padding: '14px 16px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              background: '#5865f2',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <DiscordIcon width={22} height={17} />
          </span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#7289da',
                marginBottom: 2,
              }}
            >
              Free Community
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--heading)', lineHeight: 1.25 }}>
              Join the Discord
            </div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 1 }}>Operators. Real talk. Daily.</div>
          </div>
        </a>
      </div>
    </>
  );
}

function NavLink({
  href,
  num,
  icon,
  label,
  id,
}: {
  href: string;
  num?: string;
  icon?: string;
  label: string;
  id?: string;
}) {
  const pathname = usePathname();
  const current = (pathname || '').replace(/\/$/, '');
  const active = current === href;
  const slug = href.startsWith('/course/') ? href.replace('/course/', '') : '';
  const modIcon = slug && moduleIcons[slug] ? <ModuleIcon slug={slug} /> : null;
  return (
    <Link
      className={`nav-item${active ? ' active' : ''}`}
      href={href}
      id={id}
      aria-current={active ? 'page' : undefined}
    >
      <span className="num">{modIcon || icon || num}</span>
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <div className="nav-check"></div>
    </Link>
  );
}

const moduleIcons: Record<string, React.ReactNode> = {
  'start-here': <path d="M5 21V4M5 5h12l-2.5 3.5L17 11.5H5" />,
  'pick-your-niche': (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.3" />
    </>
  ),
  'find-winning-products': (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20.5 20.5l-4-4" />
    </>
  ),
  'research-your-buyer': (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0113 0" />
    </>
  ),
  'validate-the-product': (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-3 7.4-7 8.5-4-1.1-7-4.2-7-8.5V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  'connect-your-supplier': (
    <>
      <path d="M9.5 14.5l5-5" />
      <path d="M11 6.5l1.3-1.3a3.5 3.5 0 014.9 4.9L15.9 11M13 17.5l-1.3 1.3a3.5 3.5 0 01-4.9-4.9L8 12.6" />
    </>
  ),
  'build-shopify-store': (
    <>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </>
  ),
  'pick-your-ad-angles': (
    <>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 00-3.8 10.6c.5.5.8 1 .8 1.9h6c0-.9.3-1.4.8-1.9A6 6 0 0012 3z" />
    </>
  ),
  'image-ads': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M21 16l-5-4-7 7" />
    </>
  ),
  'video-ads': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9l5 3-5 3z" />
    </>
  ),
  'set-up-your-campaign': (
    <>
      <path d="M4 7h9M19 7h1M4 17h1M11 17h9" />
      <circle cx="16" cy="7" r="2.4" />
      <circle cx="8" cy="17" r="2.4" />
    </>
  ),
  'read-your-data': (
    <>
      <path d="M3 21h18" />
      <path d="M6.5 17v-5M12 17V7M17.5 17v-8" />
    </>
  ),
  'kill-or-scale': (
    <>
      <path d="M7 21V7M7 7L4 10M7 7l3 3" />
      <path d="M17 3v14M17 17l-3-3M17 17l3-3" />
    </>
  ),
  'improve-your-store-page': (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  'improve-your-offer': (
    <>
      <rect x="4" y="9.5" width="16" height="10.5" rx="1" />
      <path d="M2 9.5h20M12 9.5V20" />
      <path d="M12 9.5C11 5.5 8 5.5 7.6 7S9.5 9.5 12 9.5zM12 9.5c1-4 4-4 4.4-2.5S14.5 9.5 12 9.5z" />
    </>
  ),
  'set-up-email-flows': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  'handle-ad-account-bans': (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-3 7.4-7 8.5-4-1.1-7-4.2-7-8.5V6l7-3z" />
      <path d="M12 8.5v4M12 15.4h.01" />
    </>
  ),
  'scale-your-ads': (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M16 7h5v5" />
    </>
  ),
  'build-a-brand': (
    <>
      <path d="M6 3h12l3 5.5L12 21 3 8.5z" />
      <path d="M3 8.5h18M9.5 3L7 8.5l5 12 5-12-2.5-5.5" />
    </>
  ),
  'private-suppliers': (
    <>
      <path d="M4 12a8 8 0 0114-5l1.5 1.5" />
      <path d="M20 12a8 8 0 01-14 5l-1.5-1.5" />
      <path d="M20 4.5v4h-4M4 19.5v-4h4" />
    </>
  ),
  'cash-flow': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.3v9.4" />
      <path d="M14.6 9.4C14 8.5 13 8 12 8c-1.4 0-2.6.8-2.6 2 0 2.4 5.2 1.3 5.2 3.8 0 1.2-1.2 2-2.6 2-1 0-2-.5-2.6-1.4" />
    </>
  ),
  payments: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18M7 15h3.5" />
    </>
  ),
  'ad-copy': (
    <>
      <path d="M4 20l3.6-.8L18 8.8 15.2 6 4.8 16.4 4 20z" />
      <path d="M14 7.2l2.8 2.8" />
    </>
  ),
  'native-ads-advertorials': (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </>
  ),
  'legal-tax-business': (
    <>
      <path d="M12 4v16M8 20h8" />
      <path d="M12 6l-6 1.6 2 4.4a3 3 0 01-4 0l2-4.4M12 6l6 1.6-2 4.4a3 3 0 004 0l-2-4.4" />
    </>
  ),
  hiring: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M3.5 20a5.5 5.5 0 0111 0" />
      <path d="M18 8v6M15 11h6" />
    </>
  ),
  'supplements-niche': (
    <>
      <rect x="3.5" y="9" width="17" height="6" rx="3" />
      <path d="M12 9.2v5.6" />
    </>
  ),
};

function ModuleIcon({ slug }: { slug: string }) {
  const p = moduleIcons[slug];
  if (!p) return null;
  return (
    <svg
      className="nav-mod-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p}
    </svg>
  );
}

function PhaseIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    resources: <path d="M12 3l1.7 4.8L18.5 9l-4.8 1.2L12 15l-1.7-4.8L5.5 9l4.8-1.2L12 3z" />,
    find: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20.5 20.5l-4-4" />
      </>
    ),
    source: (
      <>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
      </>
    ),
    store: (
      <>
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V6a3 3 0 016 0v2" />
      </>
    ),
    ads: (
      <>
        <path d="M4 9.5v4l10 4.5V5L4 9.5z" />
        <path d="M14 8a3.5 3.5 0 010 7" />
      </>
    ),
    launch: <path d="M21 3L11 13M21 3l-6.5 18-3.5-8L3 9.5 21 3z" />,
    sales: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 14l3.5-3.5 3 3L21 6" />
      </>
    ),
    scale: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M16 7h5v5" />
      </>
    ),
    bonus: <path d="M12 3.5l2.4 5.6 6 .5-4.6 4 1.4 5.9L12 16.4 6.8 19.5l1.4-5.9-4.6-4 6-.5L12 3.5z" />,
  };
  return (
    <svg
      className="nav-section-icon"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function DiscordIcon({ width, height }: { width: number; height: number }) {
  return (
    <svg fill="white" height={height} viewBox="0 0 24 18" width={width} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 1.492a19.84 19.84 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 5.534-.32 9.46.099 13.333a.082.082 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.199.373.293a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 10.886c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
