import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

/**
 * Mobile header — ported from index.html's <header id="mobile-header">.
 * Hidden by default (display:none in 3-components.css), shown via the
 * site's mobile media query (≤768px). Glossary/FAQ/Toolkit buttons are
 * links to their real routes here (the SPA opened them as in-page panels).
 */
export default function MobileHeader() {
  return (
    <header id="mobile-header">
      <button aria-label="Menu" className="hdr-btn" id="mob-menu-btn" type="button">
        <svg viewBox="0 0 24 24">
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
      </button>
      <div className="mh-center">
        <span className="mh-logo" id="mh-logo-text">
          First Sale Society
        </span>
        <span className="mh-phase-tag" id="mh-phase-tag"></span>
      </div>
      <a
        aria-label="Join Discord"
        className="hdr-btn"
        href="https://discord.gg/sYwE5Mhw9Z"
        rel="noopener"
        style={{ textDecoration: 'none' }}
        target="_blank"
      >
        <svg
          fill="none"
          height="18"
          style={{ color: '#7289da', flexShrink: 0 }}
          viewBox="0 0 24 18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.317 1.492a19.84 19.84 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 5.534-.32 9.46.099 13.333a.082.082 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.199.373.293a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 10.886c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
            fill="#7289da"
          />
        </svg>
      </a>
      <Link aria-label="Toolkit" className="hdr-btn" href="/toolkit" id="mob-toolkit-btn">
        <svg viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </Link>
      <ThemeToggle variant="mobile" />
    </header>
  );
}
