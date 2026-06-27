import { LUXURY_OFFER, CJ_OFFER, KALODATA_OFFER, type ToolOffer } from '@/data/toolsData';

/**
 * Maps a course module to the single most relevant affiliate offer, so the
 * contextual OfferCard rendered near the end of each module matches the intent
 * of that lesson (sourcing modules → supplier, research modules → spy tools).
 *
 * PostHog autocapture records the click (the OfferCard carries data-offer);
 * no custom tracking code is needed.
 */

const SOURCING_MODULES = new Set([
  'connect-your-supplier',
  'build-shopify-store',
  'private-suppliers',
  'build-a-brand',
]);

const RESEARCH_MODULES = new Set([
  'find-winning-products',
  'pick-your-niche',
  'research-your-buyer',
  'validate-the-product',
  'start-here',
]);

export function offerForModule(slug: string): ToolOffer {
  if (SOURCING_MODULES.has(slug)) return CJ_OFFER;
  if (RESEARCH_MODULES.has(slug)) return KALODATA_OFFER;
  // Ad creative, campaign, data, scale, and bonus modules → the all-in-one bundle.
  return LUXURY_OFFER;
}
