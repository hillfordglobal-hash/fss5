/**
 * Next.js config — security headers.
 *
 * If you ALREADY have a next.config.js / .mjs, don't overwrite it — copy the
 * `headers()` function below into your existing config and merge.
 *
 * These headers harden the site against clickjacking, MIME-sniffing, referrer
 * leakage, and feature abuse. They apply when hosted on a Node/Vercel target.
 * If you statically export (`output: 'export'`) to a plain CDN, set the same
 * headers at the CDN/host level instead — static export does not run headers().
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Content-Security-Policy.
    // NOTE: 'unsafe-inline' is required for scripts because the app uses inline
    // bootstrap scripts (theme preload) and inline onerror= image fallbacks.
    // Removing those inline bits later would let you drop 'unsafe-inline' and
    // get full CSP XSS protection. Domains below cover PostHog + Twitter embeds.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com https://platform.twitter.com https://*.twimg.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com",
      "frame-src https://platform.twitter.com https://www.youtube.com https://player.vimeo.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
