'use client';

import { useEffect, useRef } from 'react';

// ── Type declarations ──────────────────────────────────────────────────────

interface AnalyticsContext {
  userId: string;
  sessionId: string;
  sessionNumber: number;
  isReturnVisit: boolean;
  timestamp: string;
  browser: string;
  browserVersion: string;
  os: string;
  device: 'mobile' | 'tablet' | 'desktop';
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}

interface ProgressContext {
  totalModulesVisited: number;
  progressPercent: number;
  completedPhases: string[];
}

interface UtmParams {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}

export interface AnalyticsAPI {
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  trackPageView: (pathname: string) => void;
  identifyEmail: (email: string, source: string, captureMethod: string) => void;
  currentPathname: () => string;
  currentModuleId: () => string | null;
  currentPhase: () => string;
  _context: () => AnalyticsContext;
  _progressContext: () => ProgressContext;
  _routeToModuleId: (pathname: string) => string | null;
  _routeToPhase: (pathname: string) => string;
}

declare global {
  interface Window {
    Analytics: AnalyticsAPI;
    posthog?: {
      capture: (event: string, props: Record<string, unknown>) => void;
      alias: (aliasId: string, distinctId: string) => void;
      identify: (distinctId: string, props?: Record<string, unknown>) => void;
      init: (key: string, config: Record<string, unknown>) => void;
    };
  }
}

// ── Constants ─────────────────────────────────────────────────────────────

const POSTHOG_KEY = 'phc_yPHG9BuRYbAJXUr6CQvCdH78Y5ACgPLPYU3T9qXSDeRR';

const ALL_MODULE_IDS = [
  'm1','m2','m_pr','m3','m4','m_sup','m5','m6','m7','m7b',
  'm8','m9','m10','m11','m12','m13','m14','m15','m16','m18',
  'm20','m_pay','m21','m_native','m_legal','m_hiring','m_supps',
];

const SLUG_TO_MODULE_ID: Record<string, string> = {
  '/course/start-here':              'm1',
  '/course/pick-your-niche':         'm2',
  '/course/find-winning-products':   'm_pr',
  '/course/research-your-buyer':     'm3',
  '/course/validate-the-product':    'm4',
  '/course/connect-your-supplier':   'm_sup',
  '/course/build-shopify-store':     'm5',
  '/course/pick-your-ad-angles':     'm6',
  '/course/image-ads':               'm7',
  '/course/video-ads':               'm7b',
  '/course/set-up-your-campaign':    'm8',
  '/course/read-your-data':          'm9',
  '/course/kill-or-scale':           'm10',
  '/course/improve-your-store-page': 'm11',
  '/course/improve-your-offer':      'm12',
  '/course/set-up-email-flows':      'm13',
  '/course/handle-ad-account-bans':  'm14',
  '/course/scale-your-ads':          'm15',
  '/course/build-a-brand':           'm16',
  '/course/private-suppliers':       'm18',
  '/course/cash-flow':               'm20',
  '/course/payments':                'm_pay',
  '/course/ad-copy':                 'm21',
  '/course/native-ads-advertorials': 'm_native',
  '/course/legal-tax-business':      'm_legal',
  '/course/hiring':                  'm_hiring',
  '/course/supplements-niche':       'm_supps',
};

const MODULE_ID_TO_PHASE: Record<string, string> = {
  m1:'phase1', m2:'phase1', m_pr:'phase1', m3:'phase1', m4:'phase1',
  m_sup:'phase2',
  m5:'phase3',
  m6:'phase4',
  m7:'phase5', m7b:'phase5', m8:'phase5', m9:'phase5', m10:'phase5',
  m11:'phase6', m12:'phase6', m13:'phase6', m14:'phase6',
  m15:'phase7', m16:'phase7', m18:'phase7',
  m20:'bonus', m_pay:'bonus', m21:'bonus', m_native:'bonus',
  m_legal:'bonus', m_hiring:'bonus', m_supps:'bonus',
};

const ROUTE_PHASES: Record<string, string> = {
  '/ai-ad-lab':                             'resources',
  '/swipe-files':                           'resources',
  '/toolkit':                               'resources',
  '/faq':                                   'resources',
  '/glossary':                              'resources',
  '/tools/break-even-roas-calculator':      'tools',
  '/':                                      'home',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function safeLocalGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeLocalSet(key: string, val: string): void {
  try { localStorage.setItem(key, val); } catch { /* ignore */ }
}
function safeSessionGet(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function safeSessionSet(key: string, val: string): void {
  try { sessionStorage.setItem(key, val); } catch { /* ignore */ }
}

function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // keep unsigned 32-bit
  }
  return hash;
}

function detectBrowser(): { browser: string; browserVersion: string } {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) {
    const m = ua.match(/Edg\/(\d+)/);
    return { browser: 'Edge', browserVersion: m?.[1] ?? '' };
  }
  if (/SamsungBrowser\//.test(ua)) {
    const m = ua.match(/SamsungBrowser\/(\d+)/);
    return { browser: 'Samsung', browserVersion: m?.[1] ?? '' };
  }
  if (/OPR\/|Opera\//.test(ua)) {
    const m = ua.match(/OPR\/(\d+)/);
    return { browser: 'Opera', browserVersion: m?.[1] ?? '' };
  }
  if (/Firefox\//.test(ua)) {
    const m = ua.match(/Firefox\/(\d+)/);
    return { browser: 'Firefox', browserVersion: m?.[1] ?? '' };
  }
  if (/Chrome\//.test(ua)) {
    const m = ua.match(/Chrome\/(\d+)/);
    return { browser: 'Chrome', browserVersion: m?.[1] ?? '' };
  }
  if (/Safari\//.test(ua)) {
    const m = ua.match(/Version\/(\d+)/);
    return { browser: 'Safari', browserVersion: m?.[1] ?? '' };
  }
  return { browser: 'unknown', browserVersion: '' };
}

function detectOS(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac/.test(ua)) return 'macOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'unknown';
}

function detectDevice(): { device: 'mobile' | 'tablet' | 'desktop'; isMobile: boolean } {
  const w = screen.width;
  const isMobileUA = /Mobi/i.test(navigator.userAgent);
  if (w < 768 || isMobileUA) return { device: 'mobile', isMobile: true };
  if (w <= 1024) return { device: 'tablet', isMobile: false };
  return { device: 'desktop', isMobile: false };
}

function parseUtmParams(): UtmParams {
  // Check sessionStorage first (persists across client-side navigations)
  const stored = safeSessionGet('ecom_utm');
  if (stored) {
    try { return JSON.parse(stored) as UtmParams; } catch { /* fall through */ }
  }
  const params = new URLSearchParams(window.location.search);
  const result: UtmParams = {
    utmSource:   params.get('utm_source'),
    utmMedium:   params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmContent:  params.get('utm_content'),
    utmTerm:     params.get('utm_term'),
  };
  // Only persist if we actually found UTM params
  if (result.utmSource || result.utmCampaign) {
    safeSessionSet('ecom_utm', JSON.stringify(result));
  }
  return result;
}

function isDevHost(): boolean {
  const h = window.location.hostname;
  return h === 'localhost' || h.endsWith('.vercel.app');
}

// ── Main component ─────────────────────────────────────────────────────────

export default function Analytics() {
  const sessionStartTimeRef = useRef<number>(Date.now());
  const pagesViewedRef = useRef<number>(0);
  const currentPathnameRef = useRef<string>('');
  const currentModuleIdRef = useRef<string | null>(null);
  const currentPhaseRef = useRef<string>('unknown');

  useEffect(() => {
    // ── Identity ──
    let userId = safeLocalGet('ecom_uid');
    if (!userId) {
      userId = 'anon_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      safeLocalSet('ecom_uid', userId);
    }

    let sessionId = safeSessionGet('ecom_sid');
    const isNewSession = !sessionId;
    if (!sessionId) {
      sessionId = 'sess_' + Date.now().toString(36);
      safeSessionSet('ecom_sid', sessionId);
    }

    let sessionNumber = parseInt(safeLocalGet('ecom_session_count') ?? '0', 10);
    if (isNewSession) {
      sessionNumber += 1;
      safeLocalSet('ecom_session_count', String(sessionNumber));
    }

    sessionStartTimeRef.current = Date.now();

    // ── Return visit detection ──
    let isReturnVisit = false;
    try {
      const progress = JSON.parse(safeLocalGet('ecom_progress') ?? '{}') as Record<string, unknown>;
      isReturnVisit = Object.keys(progress).some((k) => !k.startsWith('sc_'));
    } catch { /* ignore */ }

    // ── UTM params ──
    const utmParams = parseUtmParams();

    // ── Browser/OS/Device ──
    const { browser, browserVersion } = detectBrowser();
    const os = detectOS();
    const { device, isMobile } = detectDevice();

    // ── Build window.Analytics ──
    const routeToModuleId = (pathname: string): string | null =>
      SLUG_TO_MODULE_ID[pathname] ?? null;

    const routeToPhase = (pathname: string): string => {
      const moduleId = SLUG_TO_MODULE_ID[pathname];
      if (moduleId && MODULE_ID_TO_PHASE[moduleId]) return MODULE_ID_TO_PHASE[moduleId];
      if (ROUTE_PHASES[pathname]) return ROUTE_PHASES[pathname];
      if (pathname.startsWith('/blog')) return 'blog';
      if (pathname.startsWith('/faq/')) return 'resources';
      if (pathname.startsWith('/glossary/')) return 'resources';
      return 'other';
    };

    const buildContext = (): AnalyticsContext => ({
      userId: userId!,
      sessionId: sessionId!,
      sessionNumber,
      isReturnVisit,
      timestamp: new Date().toISOString(),
      browser,
      browserVersion,
      os,
      device,
      isMobile,
      screenWidth: screen.width,
      screenHeight: screen.height,
      referrer: document.referrer || '',
      ...utmParams,
    });

    const buildProgressContext = (): ProgressContext => {
      try {
        const progress = JSON.parse(safeLocalGet('ecom_progress') ?? '{}') as Record<string, unknown>;
        const visited = Object.keys(progress).filter(
          (k) => !k.startsWith('sc_') && ALL_MODULE_IDS.includes(k)
        );
        const completedPhases = Object.keys(progress)
          .filter((k) => k.startsWith('sc_') && progress[k])
          .map((k) => k.replace('sc_', ''));
        const pct = Math.round((visited.length / 27) * 100);
        return {
          totalModulesVisited: visited.length,
          progressPercent: pct,
          completedPhases,
        };
      } catch {
        return { totalModulesVisited: 0, progressPercent: 0, completedPhases: [] };
      }
    };

    const track = (eventName: string, properties: Record<string, unknown> = {}): void => {
      try {
        const ctx = buildContext();
        const progressCtx = buildProgressContext();
        const moduleId = currentModuleIdRef.current;
        const merged: Record<string, unknown> = {
          ...ctx,
          ...progressCtx,
          pathname: currentPathnameRef.current,
          page: moduleId,
          phase: currentPhaseRef.current,
          isModule: moduleId !== null,
          ...properties,
        };
        window.posthog?.capture(eventName, merged);
        if (isDevHost()) {
          console.debug('[Analytics]', eventName, merged);
        }
      } catch (err) {
        if (isDevHost()) console.warn('[Analytics] track error', err);
      }
    };

    const trackPageView = (pathname: string): void => {
      currentPathnameRef.current = pathname;
      const moduleId = routeToModuleId(pathname);
      currentModuleIdRef.current = moduleId;
      currentPhaseRef.current = routeToPhase(pathname);
      pagesViewedRef.current += 1;

      const isModule = moduleId !== null;

      // Update ecom_progress for module pages (additive — existing schema preserved)
      let alreadyVisited = false;
      if (isModule && moduleId) {
        try {
          const progress = JSON.parse(safeLocalGet('ecom_progress') ?? '{}') as Record<string, unknown>;
          alreadyVisited = Object.prototype.hasOwnProperty.call(progress, moduleId);
          if (!alreadyVisited) {
            progress[moduleId] = 1;
            safeLocalSet('ecom_progress', JSON.stringify(progress));
          }
        } catch { /* ignore */ }
      }

      const progressCtx = buildProgressContext();

      track('page_view', {
        pathname,
        page: moduleId,
        phase: currentPhaseRef.current,
        isModule,
      });

      if (isModule && moduleId) {
        track(alreadyVisited ? 'module_revisited' : 'module_opened', {
          page: moduleId,
          phase: currentPhaseRef.current,
          progressPercent: progressCtx.progressPercent,
          totalModulesVisited: progressCtx.totalModulesVisited,
        });
      }

      // course_started — very first module visit ever
      if (isModule && progressCtx.totalModulesVisited === 1 && !alreadyVisited) {
        track('course_started', { firstPage: moduleId });
      }

      // course_resumed — return visit, first page of session
      if (isModule && isReturnVisit && pagesViewedRef.current === 1) {
        track('course_resumed', {
          page: moduleId,
          progressPercent: progressCtx.progressPercent,
        });
      }

      // Progress milestones
      const milestones = [25, 50, 75, 100];
      for (const ms of milestones) {
        if (progressCtx.progressPercent >= ms) {
          const milestoneKey = `ecom_milestone_${ms}`;
          if (!safeLocalGet(milestoneKey)) {
            safeLocalSet(milestoneKey, '1');
            track('progress_milestone', {
              milestone: ms,
              totalModulesVisited: progressCtx.totalModulesVisited,
              progressPercent: progressCtx.progressPercent,
            });
            if (ms === 100) {
              track('course_completed', {
                totalSessions: sessionNumber,
                progressPercent: 100,
              });
            }
          }
        }
      }
    };

    const identifyEmail = (email: string, source: string, captureMethod: string): void => {
      try {
        const normalised = email.toLowerCase().trim();
        const hash = djb2Hash(normalised);
        const hashedId = `email_${hash}`;
        window.posthog?.alias(hashedId, userId!);
        safeLocalSet('ecom_email_captured', 'true');
        track('email_captured', { source, hashedId, captureMethod });
      } catch (err) {
        if (isDevHost()) console.warn('[Analytics] identifyEmail error', err);
      }
    };

    window.Analytics = {
      track,
      trackPageView,
      identifyEmail,
      currentPathname: () => currentPathnameRef.current,
      currentModuleId: () => currentModuleIdRef.current,
      currentPhase: () => currentPhaseRef.current,
      _context: buildContext,
      _progressContext: buildProgressContext,
      _routeToModuleId: routeToModuleId,
      _routeToPhase: routeToPhase,
    };

    // ── Return visit event (once per session) ──
    if (isReturnVisit && isNewSession) {
      track('return_visit', {});
    }

    // ── Load PostHog async ──
    const loadPostHog = (): void => {
      if (document.getElementById('posthog-js')) return;

      // Stub so queued calls before load are safe
      if (!window.posthog) {
        // @ts-expect-error stub array
        window.posthog = [];
      }

      const script = document.createElement('script');
      script.id = 'posthog-js';
      script.src = 'https://us-assets.i.posthog.com/static/array.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        try {
          window.posthog?.init(POSTHOG_KEY, {
            api_host: 'https://us.i.posthog.com',
            ui_host: 'https://us.posthog.com',
            autocapture: false,
            capture_pageview: false,
            capture_pageleave: false,
            persistence: 'localStorage',
            bootstrap: {
              distinctID: userId,
            },
          });
        } catch (err) {
          if (isDevHost()) console.warn('[Analytics] PostHog init error', err);
        }
      };
      document.head.appendChild(script);
    };

    loadPostHog();

    // ── Session end tracking ──
    const emitSessionEnd = (): void => {
      track('session_ended', {
        durationSeconds: Math.round((Date.now() - sessionStartTimeRef.current) / 1000),
        pageCount: pagesViewedRef.current,
      });
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === 'hidden') emitSessionEnd();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', emitSessionEnd);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', emitSessionEnd);
    };
  }, []);

  return null;
}
