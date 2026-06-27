import Link from 'next/link';

/**
 * OfferCard — the single, consistent monetization unit used across tool pages
 * (and, later, module pages). Renders a trustworthy affiliate CTA: logo slot +
 * value prop + outcome, with a calm outlined CTA — never a loud filled button
 * that competes with course navigation.
 *
 * Affiliate links use rel="sponsored nofollow noopener" (SEO best practice) and
 * target="_blank", which the existing AnalyticsEvents handler already tracks as
 * external_link_clicked. An internal `href` (e.g. /toolkit) renders a normal
 * in-app Link with no sponsored rel.
 */

export interface Offer {
  name: string;
  valueProp: string;
  outcome: string;
  href: string;
  cta?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export default function OfferCard({ offer }: { offer: Offer }) {
  const external = isExternal(offer.href);
  const cta = offer.cta ?? (external ? 'Get it →' : 'Open →');

  const inner = (
    <>
      <div
        className="itkc-logo"
        aria-hidden="true"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--accent2)', fontFamily: 'var(--font-display)' }}
      >
        {offer.name.charAt(0)}
      </div>
      <div className="itkc-info">
        <div className="itkc-name">{offer.name}</div>
        <div className="itkc-desc">
          <strong style={{ color: 'var(--heading)' }}>{offer.outcome}</strong> · {offer.valueProp}
        </div>
      </div>
      <span className="itkc-cta">{cta}</span>
    </>
  );

  if (external) {
    return (
      <a className="itkc" href={offer.href} target="_blank" rel="sponsored nofollow noopener" data-offer={offer.name}>
        {inner}
      </a>
    );
  }
  return (
    <Link className="itkc" href={offer.href} data-offer={offer.name}>
      {inner}
    </Link>
  );
}
