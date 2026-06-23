// Blog post data. Empty for now — no blog content has been written yet.
// The 12-month content calendar in docs/CONTENT-CALENDAR.md specifies the
// planned posts and target keywords; this file is the structure those
// posts will be added to once written. Per the project rules, no new course
// content is invented here — blog posts are net-new marketing content that
// the user (or a future writing pass) will author deliberately, not
// something to fabricate during a data-extraction pass.

export type BlogPillar =
  | 'Product Research & Validation'
  | 'Media Buying & Ad Operations'
  | 'Supply Chain & Sourcing'
  | 'Store UX & Conversion Rate Optimization'
  | 'Calculators & Margin Metrics'
  | 'Operational Legals & FAQs';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date, defaults to publishedAt if omitted
  targetKeyword: string;
  pillar: BlogPillar;
  tldr: string; // 1-2 sentence answer-first summary, shown at the top of the post
  relatedModuleSlugs: string[]; // course module slugs this post should link to
  bodyHTML: string;
}

export const blogPosts: BlogPost[] = [];

export const blogPillars: BlogPillar[] = [
  'Product Research & Validation',
  'Media Buying & Ad Operations',
  'Supply Chain & Sourcing',
  'Store UX & Conversion Rate Optimization',
  'Calculators & Margin Metrics',
  'Operational Legals & FAQs',
];
