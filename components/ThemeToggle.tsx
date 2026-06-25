'use client';

import { useState } from 'react';

/**
 * Theme toggle — ported from main.js's toggleTheme()/preload IIFE, but with
 * the default INVERTED to light mode per product decision: the original SPA
 * defaulted to dark unless localStorage had 'ecom_theme' === 'light'. The
 * CSS tokens (1-tokens-base.css :root, and body.light-mode in
 * 2-layout-sidebar-nav.css / 4-features-redesign.css) are themselves
 * light-first, so the correct default state is body classList containing
 * 'light-mode' (not 'dark-mode') unless the person has explicitly chosen
 * dark before.
 *
 * Initial state is read synchronously from document.documentElement's
 * 'preload-dark' class (set by the render-blocking script in layout.tsx,
 * which runs before hydration) via a lazy useState initializer — NOT via
 * useEffect + setState, which would cause an extra cascading render and a
 * visible flash between server-rendered and corrected client state.
 *
 * Renders a single button; both the desktop pill (#desktop-header-controls)
 * and the mobile icon (#mobile-header) instantiate this with a `variant`
 * prop to get the right markup/classes for each context.
 */
export default function ThemeToggle({ variant }: { variant: 'desktop' | 'mobile' }) {
  const [isLight, setIsLight] = useState(() => {
    // Runs once, synchronously, during the first client render — not in an
    // effect. On the server this branch never executes (typeof document
    // check), so SSR output and the lazy-init client value can briefly
    // differ, but the preload script already applied the correct class to
    // <html> before paint, so there's no visible flash either way.
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('preload-dark');
  });

  function applyTheme(light: boolean) {
    document.body.classList.toggle('light-mode', light);
    document.body.classList.toggle('dark-mode', !light);
    document.documentElement.classList.toggle('preload-dark', !light);
    document.documentElement.classList.toggle('preload-light', light);
  }

  function handleToggle() {
    const next = !isLight;
    setIsLight(next);
    document.body.style.transition = 'background 0.25s ease, color 0.25s ease';
    applyTheme(next);
    try {
      localStorage.setItem('ecom_theme', next ? 'light' : 'dark');
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  if (variant === 'mobile') {
    return (
      <button
        aria-label="Toggle theme"
        className="hdr-btn"
        style={{ fontSize: 16 }}
        type="button"
        onClick={handleToggle}
      >
        {isLight ? '☀️' : '🌙'}
      </button>
    );
  }

  return (
    <button className="dhc-btn" id="theme-toggle" type="button" onClick={handleToggle}>
      <span className="dhc-icon">{isLight ? '☀️' : '🌙'}</span> <span id="theme-label">{isLight ? 'Dark' : 'Light'}</span>
    </button>
  );
}
