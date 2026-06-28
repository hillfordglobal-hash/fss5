import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

/**
 * Desktop header controls — ported from index.html's
 * <div id="desktop-header-controls"> (Discord, Glossary, FAQs, Toolkit,
 * theme toggle pills, fixed top-right). In the SPA, Glossary/FAQ/Toolkit
 * opened in-page modals/panels; here they're real routes, so the buttons
 * become links to /glossary, /faq, /toolkit.
 */
export default function DesktopHeaderControls() {
  return (
    <div id="desktop-header-controls">
      <a
        className="dhc-btn"
        href="https://discord.gg/sYwE5Mhw9Z"
        rel="noopener"
        target="_blank"
        style={{
          textDecoration: 'none',
          background: 'rgba(88,101,242,0.12)',
          borderColor: 'rgba(88,101,242,0.3)',
          color: '#7289da',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            background: '#5865f2',
            borderRadius: 3,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            verticalAlign: 'middle',
            marginRight: 5,
          }}
        >
          <svg fill="white" height="8" viewBox="0 0 24 18" width="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 1.492a19.84 19.84 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 5.534-.32 9.46.099 13.333a.082.082 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.1.246.199.373.293a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 10.886c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        </span>
        <span style={{ marginLeft: 4 }}>Join Discord</span>
      </a>
      <Link className="dhc-btn" href="/toolkit">
        <span className="dhc-icon">🧰</span> Toolkit
      </Link>
      <ThemeToggle variant="desktop" />
    </div>
  );
}
