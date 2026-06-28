'use client';    
                   
import Link from 'next/link';

/**
 * OfferCard — affiliate CTA card rendered at the bottom of each course module.
 *
 * Logo slot: uses a plain <img> (not next/image) with an inline onerror fallback,
 * matching the pattern used throughout the verbatim module HTML so the image
 * handling is consistent and works in both SSR and CSR contexts.
 *
 * Affiliate links use rel="sponsored nofollow noopener" per SEO best practice.
 * An internal `href` (e.g. /toolkit) renders a Next Link with no sponsored rel.
 */

export interface Offer {
  name: string;
  valueProp: string;
  outcome: string;
  href: string;
  cta?: string;
  /** Logo path served from /public (e.g. /images/luxurytools.png). */
  image?: string;
  /** Emoji fallback shown if the image fails to load. */
  emoji?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export default function OfferCard({ offer }: { offer: Offer }) {
  const external = isExternal(offer.href);
  const cta = offer.cta ?? (external ? 'Get it →' : 'Open →');
  const fallbackEmoji = offer.emoji ?? offer.name.charAt(0);

  const logoSlot = offer.image ? (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={offer.image}
      alt={offer.name}
      width={44}
      height={44}
      loading="lazy"
      decoding="async"
      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
      onError={(e) => {
        const img = e.currentTarget;
        const parent = img.parentElement;
        if (parent) {
          parent.innerHTML = `<span style="font-size:22px;line-height:1">${fallbackEmoji}</span>`;
        }
      }}
    />
  ) : (
    <span style={{ fontSize: 22, lineHeight: 1 }}>{fallbackEmoji}</span>
  );

  const inner = (
    <>
      <div
        className="itkc-logo"
        aria-hidden="true"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {logoSlot}
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
