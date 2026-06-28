'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * OfferCard — affiliate CTA card rendered at the bottom of each course module
 * and on individual tool pages.
 *
 * Must be 'use client' because the logo <img> uses onError → useState to swap
 * to an emoji fallback when the image file is missing. Event handlers cannot
 * be passed through Server Component boundaries in Next.js App Router.
 *
 * Pattern mirrors ToolLogo.tsx exactly: useState tracks load failure,
 * falls back to emoji (or first letter of name) when the image 404s.
 *
 * Affiliate links use rel="sponsored nofollow noopener" per SEO best practice.
 * Internal hrefs (e.g. /toolkit) render a Next Link with no sponsored rel.
 */

export interface Offer {
  name: string;
  valueProp: string;
  outcome: string;
  href: string;
  cta?: string;
  /** Logo path served from /public (e.g. /images/luxurytools.png). */
  image?: string;
  /** Emoji shown if the image fails to load. Falls back to first letter of name. */
  emoji?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export default function OfferCard({ offer }: { offer: Offer }) {
  const [imgErr, setImgErr] = useState(false);
  const external = isExternal(offer.href);
  const cta = offer.cta ?? (external ? 'Get it →' : 'Open →');
  const fallback = offer.emoji ?? offer.name.charAt(0);
  const showImg = !!offer.image && !imgErr;

  const inner = (
    <>
      <div
        className="itkc-logo"
        aria-hidden="true"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={offer.image}
            alt={offer.name}
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            onError={() => setImgErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
          />
        ) : (
          <span style={{ fontSize: 22, lineHeight: 1 }}>{fallback}</span>
        )}
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
