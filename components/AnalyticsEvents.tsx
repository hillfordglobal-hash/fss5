'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────────────────

interface AnalyticsEventsProps {
  pageType: 'course' | 'resource' | 'tool' | 'home' | 'blog' | 'other';
}

// ── Guard helper ───────────────────────────────────────────────────────────

function guardAttach(el: Element, fn: (el: Element) => void): void {
  if (el.getAttribute('data-analytics-init') === '1') return;
  el.setAttribute('data-analytics-init', '1');
  fn(el);
}

// ── Main component ─────────────────────────────────────────────────────────

export default function AnalyticsEvents({ pageType }: AnalyticsEventsProps) {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  // Active time tracking state
  const pageEnteredAtRef = useRef<number>(Date.now());
  const activeSecondsRef = useRef<number>(0);
  const lastActivityAtRef = useRef<number>(Date.now());
  const activeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll depth tracking
  const scrollDepthFiredRef = useRef<Set<number>>(new Set());
  const rafPendingRef = useRef<boolean>(false);

  // ── Page view — fires on every pathname change ──────────────────────────
  useEffect(() => {
    if (typeof window.Analytics === 'undefined') return;
    if (pathname === prevPathname.current) return;

    // Emit page_time for the page we're leaving
    if (prevPathname.current !== null) {
      window.Analytics.track('page_time', {
        pathname: prevPathname.current,
        activeSeconds: activeSecondsRef.current,
        totalSeconds: Math.round((Date.now() - pageEnteredAtRef.current) / 1000),
      });
    }

    prevPathname.current = pathname;
    pageEnteredAtRef.current = Date.now();
    activeSecondsRef.current = 0;
    scrollDepthFiredRef.current = new Set();

    window.Analytics.trackPageView(pathname);
  }, [pathname]);

  // ── One-time mount: attach all DOM listeners ────────────────────────────
  useEffect(() => {
    // Wait for Analytics to be ready (may be called before Analytics.tsx useEffect runs)
    let retryCount = 0;
    const waitForAnalytics = (): void => {
      if (typeof window.Analytics !== 'undefined') {
        init();
        return;
      }
      if (retryCount++ < 20) {
        setTimeout(waitForAnalytics, 100);
      }
    };
    waitForAnalytics();

    function init(): void {
      // Fire page_view for initial load (pathname effect may have fired before Analytics was ready)
      if (prevPathname.current === null) {
        prevPathname.current = pathname;
        pageEnteredAtRef.current = Date.now();
        window.Analytics.trackPageView(pathname);
      }

      // session_started — once per browser session
      if (!sessionStorage.getItem('ecom_session_started')) {
        sessionStorage.setItem('ecom_session_started', '1');
        window.Analytics.track('session_started', {
          sessionNumber: window.Analytics._context().sessionNumber,
          isReturnVisit: window.Analytics._context().isReturnVisit,
        });
      }

      attachAll();
      startActiveTimeTracking();
      startScrollTracking();
    }

    // Cleanup
    return () => {
      if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
      window.removeEventListener('scroll', handleScroll);
    };

    // ── 1. Sidebar navigation links ────────────────────────────────────────
    function attachSidebarNav(): void {
      document.querySelectorAll('.nav-item').forEach((el) => {
        guardAttach(el, (e) => {
          e.addEventListener('click', () => {
            const href = e.getAttribute('href') ?? '';
            // Strip icon/number children text to get label
            const clone = e.cloneNode(true) as HTMLElement;
            clone.querySelectorAll('.num, .nav-check, svg').forEach((c) => c.remove());
            const label = clone.textContent?.trim() ?? '';
            window.Analytics.track('sidebar_navigation', { href, label, pathname });
          });
        });
      });
    }

    // ── 2. Module nav prev/next ────────────────────────────────────────────
    function attachModuleNav(): void {
      document.querySelectorAll('.module-nav-btn').forEach((el) => {
        guardAttach(el, (e) => {
          e.addEventListener('click', () => {
            const href = e.getAttribute('href') ?? '';
            const isPrimary = e.classList.contains('primary');
            window.Analytics.track(isPrimary ? 'next_clicked' : 'previous_clicked', {
              from: window.Analytics.currentModuleId(),
              to: href,
              fromPathname: pathname,
            });
          });
        });
      });
    }

    // ── 3. Stage complete overlay ──────────────────────────────────────────
    function attachStageComplete(): void {
      const overlay = document.getElementById('stage-complete-overlay');
      if (!overlay) return;

      // MutationObserver for when class 'show' is added
      if (overlay.getAttribute('data-analytics-sc-init') !== '1') {
        overlay.setAttribute('data-analytics-sc-init', '1');
        const scObserver = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.attributeName === 'class') {
              const hasShow = overlay.classList.contains('show');
              if (hasShow) {
                window.Analytics.track('stage_complete_shown', {
                  stage: window.Analytics.currentPhase(),
                  progressPercent: window.Analytics._progressContext().progressPercent,
                });
              }
            }
          }
        });
        scObserver.observe(overlay, { attributes: true, attributeFilter: ['class'] });
      }

      const nextBtn = document.getElementById('sc-next-btn');
      if (nextBtn && nextBtn.getAttribute('data-analytics-init') !== '1') {
        nextBtn.setAttribute('data-analytics-init', '1');
        nextBtn.addEventListener('click', () => {
          window.Analytics.track('stage_complete_continued', {
            stage: window.Analytics.currentPhase(),
            progressPercent: window.Analytics._progressContext().progressPercent,
          });
        });
      }

      const stayBtn = document.getElementById('sc-stay-btn');
      if (stayBtn && stayBtn.getAttribute('data-analytics-init') !== '1') {
        stayBtn.setAttribute('data-analytics-init', '1');
        stayBtn.addEventListener('click', () => {
          window.Analytics.track('stage_complete_dismissed', {
            stage: window.Analytics.currentPhase(),
            progressPercent: window.Analytics._progressContext().progressPercent,
          });
        });
      }
    }

    // ── 4 & 5. External links + Discord (delegated on document) ───────────
    function attachExternalLinks(): void {
      if (document.documentElement.getAttribute('data-analytics-extlinks') === '1') return;
      document.documentElement.setAttribute('data-analytics-extlinks', '1');

      document.addEventListener('click', (e) => {
        const target = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
        if (!target) return;
        const href = target.href || '';
        if (!href.startsWith('http')) return;

        const label = target.textContent?.trim().substring(0, 60) ?? '';
        const isDiscord = href.includes('discord.gg') || href.includes('discord.com');

        if (isDiscord) {
          window.Analytics.track('discord_clicked', {
            href,
            pathname,
            label,
          });
        } else if (target.getAttribute('target') === '_blank') {
          try {
            const domain = new URL(href).hostname;
            window.Analytics.track('external_link_clicked', {
              href,
              domain,
              label,
              pathname,
            });
          } catch { /* ignore malformed URLs */ }
        }
      });
    }

    // ── 6. Tool cards (.itkc) ──────────────────────────────────────────────
    function attachToolCards(): void {
      document.querySelectorAll('.itkc').forEach((el) => {
        guardAttach(el, (e) => {
          e.addEventListener('click', () => {
            const toolName = e.querySelector('.itkc-name')?.textContent?.trim() ?? '';
            const href = (e as HTMLAnchorElement).href ?? '';
            window.Analytics.track('tool_link_clicked', { toolName, href, pathname });
          });
        });
      });
    }

    // ── 7. Mobile sidebar open/close ───────────────────────────────────────
    function attachSidebarToggle(): void {
      const toggle = document.getElementById('sidebar-toggle');
      if (!toggle) return;
      guardAttach(toggle, (el) => {
        el.addEventListener('click', () => {
          // Check state AFTER click (MobileSidebarController toggles class)
          setTimeout(() => {
            const sidebar = document.getElementById('sidebar');
            const isOpen = sidebar?.classList.contains('open') ?? false;
            window.Analytics.track(isOpen ? 'sidebar_opened' : 'sidebar_closed', {});
          }, 0);
        });
      });
    }

    // ── 8. Theme toggle ────────────────────────────────────────────────────
    function attachThemeToggle(): void {
      ['dhc-theme-toggle', 'mob-theme-toggle'].forEach((id) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        guardAttach(btn, (el) => {
          el.addEventListener('click', () => {
            setTimeout(() => {
              window.Analytics.track('theme_toggled', {
                theme: localStorage.getItem('ecom_theme') ?? 'dark',
              });
            }, 0);
          });
        });
      });
    }

    // ── 9. Checklist items ─────────────────────────────────────────────────
    function attachChecklists(): void {
      document.querySelectorAll('.checklist-wrap').forEach((wrap) => {
        if (wrap.getAttribute('data-analytics-checklist') === '1') return;
        wrap.setAttribute('data-analytics-checklist', '1');

        // Use capture:true so our listener runs after ModuleInteractivity toggles .checked
        wrap.addEventListener('click', (e) => {
          const item = (e.target as Element).closest('.checklist-item');
          if (!item) return;

          // Allow one tick for ModuleInteractivity to update class
          setTimeout(() => {
            const isChecked = item.classList.contains('checked');
            const items = wrap.querySelectorAll('.checklist-item');
            const checkedItems = wrap.querySelectorAll('.checklist-item.checked');
            const itemIndex = Array.from(items).indexOf(item);
            const checklistId = wrap.id || 'default';

            window.Analytics.track(
              isChecked ? 'checklist_item_checked' : 'checklist_item_unchecked',
              { checklistId, itemIndex, pathname }
            );

            // checklist_started — first item checked from zero
            if (isChecked && checkedItems.length === 1) {
              window.Analytics.track('checklist_started', { checklistId, pathname });
            }

            // checklist_completed — all checked
            if (checkedItems.length === items.length) {
              window.Analytics.track('checklist_completed', {
                checklistId,
                totalItems: items.length,
                pathname,
              });
            }
          }, 0);
        }, true); // capture phase
      });
    }

    // ── 10. ROAS Calculator ────────────────────────────────────────────────
    function attachCalculator(): void {
      const inputs = ['be-price', 'be-cogs', 'be-ship', 'be-fees']
        .map((id) => document.getElementById(id) as HTMLInputElement | null)
        .filter(Boolean) as HTMLInputElement[];

      if (inputs.length === 0) return;

      let debounceTimer: ReturnType<typeof setTimeout> | null = null;
      let lastEmittedHash = '';

      inputs.forEach((input) => {
        guardAttach(input, (el) => {
          el.addEventListener('input', () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              const vals = inputs.map((i) => parseFloat(i.value));
              if (vals.some(isNaN)) return;
              const hash = vals.join(',');
              if (hash === lastEmittedHash) return;
              lastEmittedHash = hash;
              window.Analytics.track('calculator_used', {
                price: vals[0],
                cogs: vals[1],
                shipping: vals[2],
                fees: vals[3],
                pathname,
              });
            }, 800);
          });
        });
      });
    }

    // ── 11. Glossary modal ─────────────────────────────────────────────────
    function attachGlossaryModal(): void {
      const modal = document.getElementById('glossary-modal');
      if (!modal || modal.getAttribute('data-analytics-modal') === '1') return;
      modal.setAttribute('data-analytics-modal', '1');

      const modalObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.attributeName === 'class') {
            const isOpen = modal.classList.contains('open');
            window.Analytics.track(isOpen ? 'glossary_opened' : 'glossary_closed', { pathname });
          }
        }
      });
      modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] });

      // Search — debounced
      const searchInput = document.getElementById('glossary-search-input') as HTMLInputElement | null;
      if (searchInput && searchInput.getAttribute('data-analytics-search') !== '1') {
        searchInput.setAttribute('data-analytics-search', '1');
        let searchDebounce: ReturnType<typeof setTimeout> | null = null;
        searchInput.addEventListener('input', () => {
          if (searchDebounce) clearTimeout(searchDebounce);
          searchDebounce = setTimeout(() => {
            const visible = document.querySelectorAll(
              '#glossary-list .glossary-item:not([style*="none"])'
            ).length;
            window.Analytics.track('glossary_searched', {
              query: searchInput.value,
              resultsVisible: visible,
              pathname,
            });
          }, 500);
        });
      }

      // Category filter
      const cats = document.getElementById('glossary-cats');
      if (cats && cats.getAttribute('data-analytics-cats') !== '1') {
        cats.setAttribute('data-analytics-cats', '1');
        cats.addEventListener('click', (e) => {
          const btn = (e.target as Element).closest('.gcat-btn');
          if (!btn) return;
          window.Analytics.track('glossary_filtered', {
            category: btn.getAttribute('data-cat'),
            pathname,
          });
        });
      }
    }

    // ── 12. FAQ interactions (delegated) ───────────────────────────────────
    function attachFaq(): void {
      if (document.documentElement.getAttribute('data-analytics-faq') === '1') return;
      document.documentElement.setAttribute('data-analytics-faq', '1');

      document.addEventListener('click', (e) => {
        const target = e.target as Element;
        const faqQ = target.closest('.faq-q, .faq-page-q');
        if (!faqQ) return;
        window.Analytics.track('faq_opened', {
          question: faqQ.textContent?.trim().substring(0, 100),
          pathname,
        });
      });
    }

    // ── 13. Scroll depth ───────────────────────────────────────────────────
    function handleScroll(): void {
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        const thresholds = [0.25, 0.5, 0.75, 1.0];
        for (const t of thresholds) {
          const label = Math.round(t * 100) as 25 | 50 | 75 | 100;
          if (pct >= t && !scrollDepthFiredRef.current.has(label)) {
            scrollDepthFiredRef.current.add(label);
            if (typeof window.Analytics !== 'undefined') {
              window.Analytics.track('scroll_depth', {
                depth: label,
                pathname,
                phase: window.Analytics.currentPhase(),
              });
            }
          }
        }
      });
    }

    function startScrollTracking(): void {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ── 14. Active time tracking ───────────────────────────────────────────
    function startActiveTimeTracking(): void {
      const updateActivity = (): void => { lastActivityAtRef.current = Date.now(); };
      window.addEventListener('mousemove', updateActivity, { passive: true });
      window.addEventListener('keydown', updateActivity, { passive: true });
      window.addEventListener('touchstart', updateActivity, { passive: true });
      window.addEventListener('scroll', updateActivity, { passive: true });

      activeIntervalRef.current = setInterval(() => {
        const isActive = Date.now() - lastActivityAtRef.current < 60_000;
        if (isActive && document.visibilityState === 'visible') {
          activeSecondsRef.current += 10;
        }
      }, 10_000);

      // Emit page_time on visibility hidden
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && typeof window.Analytics !== 'undefined') {
          window.Analytics.track('page_time', {
            pathname,
            activeSeconds: activeSecondsRef.current,
            totalSeconds: Math.round((Date.now() - pageEnteredAtRef.current) / 1000),
          });
        }
      });
    }

    // ── 15. Video tracking ─────────────────────────────────────────────────
    function attachVideos(): void {
      document.querySelectorAll('video').forEach((video) => {
        if (video.getAttribute('data-analytics-init') === '1') return;
        video.setAttribute('data-analytics-init', '1');

        let hasPlayed = false;
        let wasPaused = false;
        const milestonesFired = new Set<number>();
        let prevTime = 0;

        const vSrc = (): string => video.src || video.currentSrc || '';

        video.addEventListener('play', () => {
          window.Analytics.track(hasPlayed && !wasPaused ? 'video_resumed' : 'video_started', {
            videoSrc: vSrc(),
            pathname,
          });
          hasPlayed = true;
          wasPaused = false;
        });

        video.addEventListener('pause', () => {
          if (!video.ended) {
            wasPaused = true;
            window.Analytics.track('video_paused', { videoSrc: vSrc(), pathname });
          }
        });

        video.addEventListener('ended', () => {
          window.Analytics.track('video_completed', { videoSrc: vSrc(), pathname });
        });

        video.addEventListener('seeked', () => {
          window.Analytics.track('video_seek', {
            from: prevTime,
            to: video.currentTime,
            videoSrc: vSrc(),
            pathname,
          });
        });

        video.addEventListener('timeupdate', () => {
          prevTime = video.currentTime;
          if (!video.duration) return;
          const pct = video.currentTime / video.duration;
          [0.25, 0.5, 0.75].forEach((t) => {
            const label = Math.round(t * 100);
            if (pct >= t && !milestonesFired.has(label)) {
              milestonesFired.add(label);
              window.Analytics.track('video_progress', {
                milestone: label,
                videoSrc: vSrc(),
                pathname,
              });
            }
          });
        });

        video.addEventListener('error', () => {
          window.Analytics.track('video_error', {
            videoSrc: vSrc(),
            errorCode: video.error?.code ?? null,
            pathname,
          });
        });
      });
    }

    // ── 16. Image lightbox ─────────────────────────────────────────────────
    function attachLightbox(): void {
      if (document.documentElement.getAttribute('data-analytics-lightbox') === '1') return;
      document.documentElement.setAttribute('data-analytics-lightbox', '1');

      document.addEventListener('click', (e) => {
        const img = (e.target as Element).closest(
          '.course-img-wrap img, .ws-card img, .pdp-gallery img'
        ) as HTMLImageElement | null;
        if (!img) return;
        const srcParts = (img.src || '').split('/');
        window.Analytics.track('image_lightbox_opened', {
          src: srcParts[srcParts.length - 1] ?? '',
          alt: img.alt ?? '',
          pathname,
        });
      });
    }

    // ── 18. JS errors ──────────────────────────────────────────────────────
    function attachErrorTracking(): void {
      if (document.documentElement.getAttribute('data-analytics-errors') === '1') return;
      document.documentElement.setAttribute('data-analytics-errors', '1');

      const seenErrors = new Set<string>();

      window.addEventListener('error', (e) => {
        const key = `${e.message}|${e.filename}`;
        if (seenErrors.has(key)) return;
        seenErrors.add(key);
        if (typeof window.Analytics !== 'undefined') {
          window.Analytics.track('js_error', {
            message: e.message,
            source: e.filename,
            line: e.lineno,
            col: e.colno,
            pathname: window.Analytics.currentPathname(),
          });
        }
      });
    }

    // ── 19. Broken image fallback detection ────────────────────────────────
    function attachImageFallbackObserver(): void {
      const main = document.getElementById('main');
      if (!main || main.getAttribute('data-analytics-imgfallback') === '1') return;
      main.setAttribute('data-analytics-imgfallback', '1');

      const fallbackObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
          m.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            const el = node as Element;
            if (el.classList.contains('module-image-fallback')) {
              window.Analytics.track('image_load_error', {
                alt: el.querySelector('strong')?.textContent ?? '',
                pathname,
              });
            }
          });
        }
      });
      fallbackObserver.observe(main, { childList: true, subtree: true });
    }

    // ── 20. Swipe file resource links ──────────────────────────────────────
    function attachSwipeFileLinks(): void {
      document.querySelectorAll('.swipe-card a, .swipe-card-link').forEach((el) => {
        guardAttach(el, (e) => {
          e.addEventListener('click', () => {
            const card = e.closest('.swipe-card');
            const label =
              card?.querySelector('.swipe-card-title')?.textContent?.trim() ??
              card?.querySelector('h3, h4')?.textContent?.trim() ??
              '';
            const category = e.closest('.sfb-section')?.id ?? '';
            window.Analytics.track('resource_clicked', {
              resourceLabel: label,
              href: (e as HTMLAnchorElement).href ?? '',
              category,
              pathname,
            });
          });
        });
      });
    }

    // ── 21. Email capture (future-ready) ───────────────────────────────────
    function attachEmailCapture(): void {
      if (document.documentElement.getAttribute('data-analytics-email') === '1') return;
      document.documentElement.setAttribute('data-analytics-email', '1');

      document.addEventListener('analytics:email_captured', (e: Event) => {
        const detail = (e as CustomEvent<{ email: string; source: string; captureMethod: string }>).detail;
        if (detail?.email && typeof window.Analytics !== 'undefined') {
          window.Analytics.identifyEmail(detail.email, detail.source, detail.captureMethod);
        }
      });
    }

    // ── attachAll ──────────────────────────────────────────────────────────
    function attachAll(): void {
      attachSidebarNav();
      attachModuleNav();
      attachStageComplete();
      attachExternalLinks();
      attachToolCards();
      attachSidebarToggle();
      attachThemeToggle();
      attachChecklists();
      attachCalculator();
      attachGlossaryModal();
      attachFaq();
      attachVideos();
      attachLightbox();
      attachErrorTracking();
      attachImageFallbackObserver();
      attachSwipeFileLinks();
      attachEmailCapture();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentional empty deps — runs once on mount

  // Re-attach module-nav and checklist listeners after pathname changes
  // (new content is rendered by Next.js on navigation)
  useEffect(() => {
    if (typeof window.Analytics === 'undefined') return;

    // Re-attach listeners that target page-specific content
    document.querySelectorAll('.module-nav-btn').forEach((el) => {
      if (el.getAttribute('data-analytics-init') === '1') return;
      el.setAttribute('data-analytics-init', '1');
      el.addEventListener('click', () => {
        const href = el.getAttribute('href') ?? '';
        const isPrimary = el.classList.contains('primary');
        window.Analytics.track(isPrimary ? 'next_clicked' : 'previous_clicked', {
          from: window.Analytics.currentModuleId(),
          to: href,
          fromPathname: pathname,
        });
      });
    });

    document.querySelectorAll('.checklist-wrap').forEach((wrap) => {
      if (wrap.getAttribute('data-analytics-checklist') === '1') return;
      wrap.setAttribute('data-analytics-checklist', '1');
      wrap.addEventListener('click', (e) => {
        const item = (e.target as Element).closest('.checklist-item');
        if (!item) return;
        setTimeout(() => {
          const isChecked = item.classList.contains('checked');
          const items = wrap.querySelectorAll('.checklist-item');
          const checkedItems = wrap.querySelectorAll('.checklist-item.checked');
          const itemIndex = Array.from(items).indexOf(item);
          const checklistId = wrap.id || 'default';
          window.Analytics.track(
            isChecked ? 'checklist_item_checked' : 'checklist_item_unchecked',
            { checklistId, itemIndex, pathname }
          );
          if (isChecked && checkedItems.length === 1) {
            window.Analytics.track('checklist_started', { checklistId, pathname });
          }
          if (checkedItems.length === items.length) {
            window.Analytics.track('checklist_completed', {
              checklistId,
              totalItems: items.length,
              pathname,
            });
          }
        }, 0);
      }, true);
    });

    document.querySelectorAll('.itkc').forEach((el) => {
      if (el.getAttribute('data-analytics-init') === '1') return;
      el.setAttribute('data-analytics-init', '1');
      el.addEventListener('click', () => {
        const toolName = el.querySelector('.itkc-name')?.textContent?.trim() ?? '';
        const href = (el as HTMLAnchorElement).href ?? '';
        window.Analytics.track('tool_link_clicked', { toolName, href, pathname });
      });
    });

    document.querySelectorAll('video').forEach((video) => {
      if (video.getAttribute('data-analytics-init') === '1') return;
      video.setAttribute('data-analytics-init', '1');
      const vSrc = (): string => video.src || video.currentSrc || '';
      let hasPlayed = false;
      let wasPaused = false;
      const milestonesFired = new Set<number>();
      let prevTime = 0;
      video.addEventListener('play', () => {
        window.Analytics.track(hasPlayed && !wasPaused ? 'video_resumed' : 'video_started', {
          videoSrc: vSrc(), pathname,
        });
        hasPlayed = true; wasPaused = false;
      });
      video.addEventListener('pause', () => {
        if (!video.ended) { wasPaused = true; window.Analytics.track('video_paused', { videoSrc: vSrc(), pathname }); }
      });
      video.addEventListener('ended', () => window.Analytics.track('video_completed', { videoSrc: vSrc(), pathname }));
      video.addEventListener('seeked', () => window.Analytics.track('video_seek', { from: prevTime, to: video.currentTime, videoSrc: vSrc(), pathname }));
      video.addEventListener('timeupdate', () => {
        prevTime = video.currentTime;
        if (!video.duration) return;
        const pct = video.currentTime / video.duration;
        [0.25, 0.5, 0.75].forEach((t) => {
          const label = Math.round(t * 100);
          if (pct >= t && !milestonesFired.has(label)) {
            milestonesFired.add(label);
            window.Analytics.track('video_progress', { milestone: label, videoSrc: vSrc(), pathname });
          }
        });
      });
    });
  }, [pathname]);

  return null;
}
