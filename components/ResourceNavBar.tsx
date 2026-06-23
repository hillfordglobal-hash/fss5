import Link from 'next/link';

/**
 * Simple prev/next nav bar for resource pages (AI Ad Lab, Swipe Files,
 * Toolkit, FAQs, Glossary). Matches .module-nav styling exactly.
 * Order: AI Ad Lab → Swipe Files → Toolkit → FAQs → Glossary → Course
 */
const sequence = [
  { href: '/ai-ad-lab',   label: 'AI Ad Creative Lab' },
  { href: '/swipe-files', label: 'Swipe Files' },
  { href: '/toolkit',     label: 'Toolkit' },
  { href: '/faq',         label: 'FAQs' },
  { href: '/glossary',    label: 'Full Glossary' },
];

export default function ResourceNavBar({ current }: { current: string }) {
  const idx = sequence.findIndex((s) => s.href === current);
  const prev = idx > 0 ? sequence[idx - 1] : null;
  const next = idx < sequence.length - 1 ? sequence[idx + 1] : null;

  return (
    <div className="module-nav" style={{ marginTop: 40 }}>
      {prev ? (
        <Link className="module-nav-btn" href={prev.href}>
          ← {prev.label}
        </Link>
      ) : (
        <Link className="module-nav-btn" href="/">
          ← Back to Course
        </Link>
      )}
      <div className="module-nav-info">
        <div className="module-nav-label">Operator Resources</div>
        <div className="module-nav-name">{sequence[idx]?.label ?? ''}</div>
      </div>
      {next ? (
        <Link className="module-nav-btn primary" href={next.href}>
          {next.label} →
        </Link>
      ) : (
        <Link className="module-nav-btn primary" href="/">
          Back to Course →
        </Link>
      )}
    </div>
  );
}
