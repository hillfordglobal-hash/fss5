'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void;
      };
    };
  }
}

/**
 * Loads the official Twitter/X widgets.js script (needed to render
 * <blockquote class="twitter-tweet"> embeds into actual rendered
 * tweets/videos) and calls twttr.widgets.load() so embeds on the current
 * page get processed. Without this script, the blockquotes just sit there
 * as plain unstyled links — which is what "tweets/videos not loading" was.
 *
 * Mount on any page that renders verbatim content containing tweet embeds
 * (currently: /ai-ad-lab, and any module page — both can contain them).
 */
export default function TwitterEmbedLoader() {
  useEffect(() => {
    function loadWidgets() {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load();
        return;
      }
      // Script not loaded yet (or failed) — inject it once.
      if (document.getElementById('twitter-wjs')) return;
      const script = document.createElement('script');
      script.id = 'twitter-wjs';
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    }

    // Only bother if there's actually a tweet embed on this page.
    if (document.querySelector('.twitter-tweet')) {
      loadWidgets();
    }
  }, []);

  return null;
}
