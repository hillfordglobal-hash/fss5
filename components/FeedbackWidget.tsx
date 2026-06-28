'use client';

import { useEffect, useState } from 'react';

/**
 * FeedbackWidget — a small fixed button pinned to the bottom-right on both
 * desktop and mobile that opens the project's Google Form for feedback.
 *
 * - Opens in a new tab (the form is external).
 * - On mobile it sits just above the mobile header / thumb zone and shrinks to
 *   an icon-only circle so it never covers content.
 * - Remembers if the user dismissed it (localStorage) so it isn't naggy, but
 *   keeps a tiny re-open dot.
 */

const FORM_URL = 'https://forms.gle/ig4vZbtdk3mDD4Rx7';

export default function FeedbackWidget() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem('fss-feedback-dismissed') === '1') setHidden(true);
    } catch {
      /* ignore */
    }
  }, []);

  if (!mounted) return null;

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setHidden(true);
    try {
      localStorage.setItem('fss-feedback-dismissed', '1');
    } catch {
      /* ignore */
    }
  }

  function reopen() {
    setHidden(false);
    try {
      localStorage.removeItem('fss-feedback-dismissed');
    } catch {
      /* ignore */
    }
  }

  // Collapsed state: a tiny re-open dot in the corner.
  if (hidden) {
    return (
      <button
        type="button"
        onClick={reopen}
        aria-label="Open feedback"
        className="fss-feedback-reopen"
        title="Leave feedback"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
      </button>
    );
  }

  return (
    <a
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fss-feedback-btn"
      aria-label="Leave feedback in our form"
      data-feedback-cta="1"
    >
      <svg className="fss-feedback-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
      </svg>
      <span className="fss-feedback-label">Feedback</span>
      <button type="button" className="fss-feedback-x" aria-label="Dismiss" onClick={dismiss} tabIndex={-1}>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
    </a>
  );
}
