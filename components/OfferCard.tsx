import Link from 'next/link';
import Image from 'next/image';

/**
 * OfferCard — the single, consistent monetization unit used across tool pages
 * and module pages. Renders a trustworthy affiliate CTA: logo slot + value prop
 * + outcome, with a calm outlined CTA — never a loud filled button that
 * competes with course navigation.
 *
 * Logo is rendered via <Image> when `image` is present on the offer (all named
 * offers in toolsData have one). Falls back to the first letter of the name if
 * no image is provided.
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
  /** Logo path served from /public (e.g. /images/luxurytools.png). */
  image?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export default function OfferCard({ offer }: { offer: Offer }) {
  const external = isExternal(offer.href);
  const cta = offer.cta ?? (external ? 'Get it →' : 'Open →');

  const logo = offer.image ? (
    <div className="itkc-logo" aria-hidden="true">
      <Image
        src={offer.image}
        alt={offer.name}
        width={44}
        height={44}
        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
        onError={(e) => {
          // If image fails to load, fall back to letter initial
          const parent = (e.target as HTMLImageElement).parentElement;
          if (parent) {
            parent.innerHTML = `<span style="font-weight:800;color:var(--accent2);font-family:var(--font-display);font-size:22px">${offer.name.charAt(0)}</span>`;
          }
        }}
      />
    </div>
  ) : (
    <div
      className="itkc-logo"
      aria-hidden="true"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--accent2)', fontFamily: 'var(--font-display)', fontSize: 22 }}
    >
      {offer.name.charAt(0)}
    </div>
  );

  const inner = (
    <>
      {logo}
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
