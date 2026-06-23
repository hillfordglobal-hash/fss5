import Link from 'next/link';

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="First Sale Society"
          src="/moduleimages/firstsalesociety.png"
          style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }}
        />
      </div>
      <div className="sidebar-nav">
        {/* Resources section — distinct from course phases */}
        <div className="nav-phase-group nav-resources-group" data-phase="resources">
          <div className="nav-section-label sr">Operator Resources</div>
          <NavLink href="/ai-ad-lab" icon="🎬" label="AI Ad Creative Lab" />
          <NavLink href="/swipe-files" icon="📂" label="Swipe Files" />
          <NavLink href="/toolkit" icon="🧰" label="Toolkit" />
          <NavLink href="/faq" icon="❓" label="FAQs" />
          <NavLink href="/glossary" icon="📖" label="Full Glossary" />
        </div>

        <div className="nav-phase-group" data-phase="1">
          <div className="nav-section-label s1">Phase 1 · Find a Product</div>
          <NavLink href="/course/start-here" num="01" label="START here" id="nav-home" />
          <NavLink href="/course/pick-your-niche" num="02" label="Pick Your Niche" />
          <NavLink href="/course/find-winning-products" num="03" label="Find Winning Products" />
          <NavLink href="/course/research-your-buyer" num="04" label="Research Your Buyer" />
          <NavLink href="/course/validate-the-product" num="05" label="Validate the Product" />
        </div>

        <div className="nav-phase-group" data-phase="2">
          <div className="nav-section-label s2">Phase 2 · Source It</div>
          <NavLink href="/course/connect-your-supplier" num="06" label="Connect Your Supplier" />
        </div>

        <div className="nav-phase-group" data-phase="3">
          <div className="nav-section-label s3">Phase 3 · Build the Store</div>
          <NavLink href="/course/build-shopify-store" num="07" label="Build Shopify Store" />
        </div>

        <div className="nav-phase-group" data-phase="4">
          <div className="nav-section-label s4">Phase 4 · Make Ads</div>
          <NavLink href="/course/pick-your-ad-angles" num="08" label="Pick Your Ad Angles" />
        </div>

        <div className="nav-phase-group" data-phase="5">
          <div className="nav-section-label s5">Phase 5 · Launch &amp; Test Ads</div>
          <NavLink href="/course/image-ads" num="09" label="Image Ads" />
          <NavLink href="/course/video-ads" num="09B" label="Video Ads" />
          <NavLink href="/course/set-up-your-campaign" num="10" label="Set Up Your Campaign" />
          <NavLink href="/course/read-your-data" num="11" label="Read Your Data" />
          <NavLink href="/course/kill-or-scale" num="12" label="Kill or Scale" />
        </div>

        <div className="nav-phase-group" data-phase="6">
          <div className="nav-section-label s6">Phase 6 · After First Sales</div>
          <NavLink href="/course/improve-your-store-page" num="13" label="Improve Your Store Page" />
          <NavLink href="/course/improve-your-offer" num="14" label="Improve Your Offer" />
          <NavLink href="/course/set-up-email-flows" num="15" label="Set Up Email Flows" />
          <NavLink href="/course/handle-ad-account-bans" num="16" label="Handle Ad Account Bans" />
        </div>

        <div className="nav-phase-group" data-phase="7">
          <div className="nav-section-label s7">Phase 7 · Scale &amp; Build a Brand</div>
          <NavLink href="/course/scale-your-ads" num="17" label="Scale Your Budget" />
          <NavLink href="/course/build-a-brand" num="18" label="Store to Brand &amp; Supply Chain" />
          <NavLink href="/course/private-suppliers" num="19" label="Keep Customers Coming Back" />
        </div>

        <div className="nav-phase-group" data-phase="bonus">
          <div className="nav-section-label sb">Bonus Modules</div>
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
          href="https://discord.gg/9NcaPMe3T"
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
  return (
    <Link className="nav-item" href={href} id={id}>
      <span className="num">{icon || num}</span>
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <div className="nav-check"></div>
    </Link>
  );
}

function DiscordIcon({ width, height }: { width: number; height: number }) {
  return (
    <svg fill="white" height={height} viewBox="0 0 24 18" width={width} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 1.492a19.84 19.84 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 5.534-.32 9.46.099 13.333a.082.082 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.199.373.293a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 10.886c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
