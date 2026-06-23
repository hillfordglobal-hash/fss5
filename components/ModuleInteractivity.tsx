'use client';

import { useEffect } from 'react';

/**
 * Ports the reusable, page-content-scoped interactivity from the original
 * main.js so verbatim-rendered panel HTML keeps working as a standalone page:
 *   - .checklist-item click/keyboard toggle + localStorage persistence
 *     (mirrors toggleCheck() / restoreChecklists())
 *   - .faq-q / .faq-page-q accordion open/close (single-open-at-a-time,
 *     mirrors the document-level click delegation in main.js)
 *   - image lightbox on .course-img-wrap img / .ws-card img / .pdp-gallery img
 *     (mirrors attachLightbox() — opens a simple full-screen overlay)
 *   - .brands-acc-header accordion (mirrors the brands accordion delegation)
 *   - swipe-files board filter bar (#sfb-filter-bar) and section accordions
 *     (#sfb-sections .sfb-section-header) — mirrors main.js's sfb IIFE
 *   - inspo board scroll/expand-to-modal (.inspo-board, .inspo-modal) via
 *     real window.scrollInspo / window.openInspoModal / window.closeInspoModal
 *     globals, since the verbatim content calls these through inline
 *     onclick="..." attributes rather than delegated clicks
 *
 * This does NOT port SPA-only concerns (goToPage, stage-complete overlay,
 * sidebar progress tracking, panel prefetching) — those belonged to the
 * client-side panel loader and don't apply to statically routed pages.
 *
 * Mount this once on any page that renders verbatim contentHTML
 * (course modules, FAQ, glossary, toolkit, swipe-files, ai-ad-lab, consulting).
 */
export default function ModuleInteractivity() {
  useEffect(() => {
    // ── checklist toggle + persistence ──
    function toggleCheck(el: Element) {
      el.classList.toggle('checked');
      const wrap = el.closest('.checklist-wrap');
      if (!wrap) return;
      const counter = wrap.querySelector('#checklist-counter, .checklist-count-val');
      const checked = wrap.querySelectorAll('.checklist-item.checked').length;
      if (counter) counter.textContent = String(checked);
      const items = wrap.querySelectorAll('.checklist-item');
      const states: number[] = [];
      items.forEach((item) => states.push(item.classList.contains('checked') ? 1 : 0));
      const key = 'checklist_' + (wrap.id || 'default');
      try {
        localStorage.setItem(key, JSON.stringify(states));
      } catch {
        /* ignore */
      }
    }

    function restoreChecklists() {
      document.querySelectorAll('.checklist-wrap').forEach((wrap) => {
        const key = 'checklist_' + (wrap.id || 'default');
        try {
          const states = JSON.parse(localStorage.getItem(key) || '[]');
          const items = wrap.querySelectorAll('.checklist-item');
          items.forEach((item, i) => {
            if (states[i]) item.classList.add('checked');
          });
          const counter = wrap.querySelector('#checklist-counter, .checklist-count-val');
          if (counter) counter.textContent = String(wrap.querySelectorAll('.checklist-item.checked').length);
        } catch {
          /* ignore */
        }
      });
    }

    document.querySelectorAll('.checklist-item:not([data-interactivity-init])').forEach((item) => {
      item.setAttribute('data-interactivity-init', '1');
      item.removeAttribute('onclick');
      item.setAttribute('role', 'checkbox');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-checked', item.classList.contains('checked') ? 'true' : 'false');
      item.addEventListener('click', () => {
        toggleCheck(item);
        item.setAttribute('aria-checked', item.classList.contains('checked') ? 'true' : 'false');
      });
      item.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === ' ' || ke.key === 'Enter') {
          e.preventDefault();
          toggleCheck(item);
          item.setAttribute('aria-checked', item.classList.contains('checked') ? 'true' : 'false');
        }
      });
    });

    restoreChecklists();

    // ── FAQ accordion (.faq-q and .faq-page-q) ──
    function handleFaqClick(e: MouseEvent) {
      const target = e.target as Element;

      const pageQ = target.closest('.faq-page-q');
      if (pageQ) {
        const item = pageQ.closest('.faq-page-item');
        if (item) {
          const wasOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-page-item.open').forEach((el) => {
            el.classList.remove('open');
            el.querySelector('.faq-page-q')?.setAttribute('aria-expanded', 'false');
          });
          if (!wasOpen) {
            item.classList.add('open');
            pageQ.setAttribute('aria-expanded', 'true');
          }
        }
        return;
      }

      const q = target.closest('.faq-q');
      if (q) {
        const item = q.parentElement;
        if (item) {
          const wasOpen = item.classList.contains('open');
          const container = item.parentElement;
          container?.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
          if (!wasOpen) item.classList.add('open');
        }
        return;
      }

      // ── brands accordion ──
      const hdr = target.closest('.brands-acc-header');
      if (hdr) {
        const item = hdr.closest('.brands-acc-item');
        if (item) {
          const wasOpen = item.classList.contains('open');
          document.querySelectorAll('.brands-acc-item').forEach((i) => i.classList.remove('open'));
          if (!wasOpen) item.classList.add('open');
        }
        return;
      }

      // ── swipe-files board: filter bar (#sfb-filter-bar .sfb-filter-btn) ──
      // Ported from main.js's unnamed IIFE that wires #sfb-filter-bar /
      // #sfb-sections. Filtering by category shows/hides .sfb-section
      // blocks and auto-opens the selected one; "All" shows everything.
      const filterBtn = target.closest('#sfb-filter-bar .sfb-filter-btn');
      if (filterBtn) {
        const filterBar = filterBtn.closest('#sfb-filter-bar');
        const sectionsRoot = document.getElementById('sfb-sections');
        if (filterBar && sectionsRoot) {
          filterBar.querySelectorAll('.sfb-filter-btn').forEach((b) => b.classList.remove('active'));
          filterBtn.classList.add('active');
          const targetId = filterBtn.getAttribute('data-target');
          const sections = sectionsRoot.querySelectorAll('.sfb-section');
          sections.forEach((sec) => {
            if (targetId === 'all' || sec.id === targetId) {
              sec.classList.remove('sfb-hidden');
              if (targetId !== 'all') sec.classList.add('sfb-open');
            } else {
              sec.classList.add('sfb-hidden');
            }
          });
          if (targetId && targetId !== 'all') {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        return;
      }

      // ── swipe-files board: section accordion header ──
      const sfbHeader = target.closest('.sfb-section-header');
      if (sfbHeader) {
        const sec = sfbHeader.closest('.sfb-section');
        if (sec) {
          const isOpen = sec.classList.contains('sfb-open');
          sec.classList.toggle('sfb-open', !isOpen);
          sfbHeader.setAttribute('aria-expanded', String(!isOpen));
        }
      }
    }

    document.addEventListener('click', handleFaqClick);

    // make faq-page-q / faq-q keyboard accessible (mirrors panel-loader.js reinit)
    document.querySelectorAll('.faq-page-q:not([data-interactivity-init])').forEach((q) => {
      q.setAttribute('data-interactivity-init', '1');
      q.setAttribute('tabindex', '0');
      q.setAttribute('role', 'button');
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === ' ' || ke.key === 'Enter') {
          e.preventDefault();
          (q as HTMLElement).click();
        }
      });
    });
    document.querySelectorAll('.faq-q:not([data-interactivity-init])').forEach((q) => {
      q.setAttribute('data-interactivity-init', '1');
      q.setAttribute('tabindex', '0');
      q.setAttribute('role', 'button');
      q.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === ' ' || ke.key === 'Enter') {
          e.preventDefault();
          (q as HTMLElement).click();
        }
      });
    });

    document.querySelectorAll('.sfb-section-header:not([data-interactivity-init])').forEach((q) => {
      q.setAttribute('data-interactivity-init', '1');
      q.setAttribute('tabindex', '0');
      q.setAttribute('role', 'button');
      q.setAttribute('aria-expanded', q.closest('.sfb-section')?.classList.contains('sfb-open') ? 'true' : 'false');
      q.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === ' ' || ke.key === 'Enter') {
          e.preventDefault();
          (q as HTMLElement).click();
        }
      });
    });

    // ── Inspo board (.inspo-board / .inspo-modal) ──
    // The verbatim content calls these via inline onclick="scrollInspo(-1)" /
    // onclick="openInspoModal(0)" attributes (not delegated clicks), so they
    // must exist as real global window functions — ported 1:1 from
    // main.js's window.scrollInspo / window.openInspoModal /
    // window.closeInspoModal (board "2" variants included for completeness,
    // even though only board 1 is currently used in any module).
    type WindowWithInspo = Window & {
      scrollInspo?: (dir: number) => void;
      scrollInspo2?: (dir: number) => void;
      openInspoModal?: (idx: number) => void;
      openInspoModal2?: (idx: number) => void;
      closeInspoModal?: () => void;
      closeInspoModal2?: () => void;
      twttr?: { widgets: { load: (el?: HTMLElement) => void } };
      _inspoCurrentUrl?: string | null;
      _inspoCurrentUrl2?: string | null;
    };
    const w = window as WindowWithInspo;

    function makeScroll(boardId: string) {
      return (dir: number) => {
        const board = document.getElementById(boardId);
        if (!board) return;
        try {
          board.scrollBy({ left: dir * 320, behavior: 'smooth' });
        } catch {
          board.scrollLeft += dir * 320;
        }
      };
    }
    w.scrollInspo = makeScroll('inspo-board');
    w.scrollInspo2 = makeScroll('inspo-board-2');

    function makeOpenModal(boardId: string, modalId: string, contentId: string, urlKey: '_inspoCurrentUrl' | '_inspoCurrentUrl2') {
      return (idx: number) => {
        const modal = document.getElementById(modalId);
        const contentEl = document.getElementById(contentId);
        if (!modal || !contentEl) return;
        const card = document.querySelectorAll(`#${boardId} .inspo-card`)[idx];
        if (!card) return;
        const tweetUrl = card.getAttribute('data-tweet-url');
        if (tweetUrl && tweetUrl !== w[urlKey]) {
          w[urlKey] = tweetUrl;
          contentEl.innerHTML = `<div style="display:flex;justify-content:center;padding:8px 0;min-height:300px;"><blockquote class="twitter-tweet" data-media-max-width="500" data-dnt="true" data-theme="dark"><a href="${tweetUrl}"></a></blockquote></div>`;
          if (w.twttr?.widgets) w.twttr.widgets.load(contentEl);
          else {
            // widgets.js may not be loaded yet if no tweet was visible on
            // initial paint to trigger TwitterEmbedLoader — load it now.
            if (!document.getElementById('twitter-wjs')) {
              const script = document.createElement('script');
              script.id = 'twitter-wjs';
              script.src = 'https://platform.twitter.com/widgets.js';
              script.async = true;
              document.body.appendChild(script);
            } else {
              setTimeout(() => w.twttr?.widgets?.load(contentEl), 300);
            }
          }
        }
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      };
    }
    w.openInspoModal = makeOpenModal('inspo-board', 'inspo-modal', 'inspo-modal-content', '_inspoCurrentUrl');
    w.openInspoModal2 = makeOpenModal('inspo-board-2', 'inspo-modal-2', 'inspo-modal-content-2', '_inspoCurrentUrl2');

    function makeCloseModal(modalId: string, contentId: string, urlKey: '_inspoCurrentUrl' | '_inspoCurrentUrl2') {
      return () => {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('open');
        w[urlKey] = null;
        document.body.style.overflow = '';
        setTimeout(() => {
          const c = document.getElementById(contentId);
          if (c && !document.getElementById(modalId)?.classList.contains('open')) c.innerHTML = '';
        }, 350);
      };
    }
    w.closeInspoModal = makeCloseModal('inspo-modal', 'inspo-modal-content', '_inspoCurrentUrl');
    w.closeInspoModal2 = makeCloseModal('inspo-modal-2', 'inspo-modal-content-2', '_inspoCurrentUrl2');

    // Backdrop click closes the modal (clicking outside .inspo-modal-inner)
    function handleInspoBackdropClick(e: MouseEvent) {
      const target = e.target as Element;
      if (target.id === 'inspo-modal') w.closeInspoModal?.();
      if (target.id === 'inspo-modal-2') w.closeInspoModal2?.();
    }
    document.addEventListener('click', handleInspoBackdropClick);

    // Escape closes an open inspo modal
    function handleInspoEscape(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      const m1 = document.getElementById('inspo-modal');
      if (m1?.classList.contains('open')) {
        w.closeInspoModal?.();
        return;
      }
      const m2 = document.getElementById('inspo-modal-2');
      if (m2?.classList.contains('open')) w.closeInspoModal2?.();
    }
    document.addEventListener('keydown', handleInspoEscape);

    // ── lightbox ──
    let lb: HTMLDivElement | null = document.getElementById('fss-lightbox') as HTMLDivElement | null;
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'fss-lightbox';
      lb.style.cssText =
        'display:none;position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.85);' +
        'align-items:center;justify-content:center;cursor:zoom-out;padding:24px;';
      const img = document.createElement('img');
      img.id = 'fss-lightbox-img';
      img.style.cssText = 'max-width:100%;max-height:100%;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
      lb.appendChild(img);
      lb.addEventListener('click', () => {
        if (lb) lb.style.display = 'none';
      });
      document.body.appendChild(lb);
    }
    function openLB(src: string, alt: string) {
      const img = document.getElementById('fss-lightbox-img') as HTMLImageElement | null;
      if (img) {
        img.src = src;
        img.alt = alt;
      }
      if (lb) lb.style.display = 'flex';
    }
    document.querySelectorAll('.course-img-wrap img, .ws-card img, .pdp-gallery img').forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.dataset.lbAttached) return;
      el.dataset.lbAttached = '1';
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openLB(el.src, el.alt);
      });
    });

    // Escape closes lightbox
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && lb && lb.style.display === 'flex') {
        lb.style.display = 'none';
      }
    }
    document.addEventListener('keydown', handleKeydown);

    // ── window.runKSTree — Kill or Scale decision engine ──
    // Called via onclick="runKSTree()" on the .ks-run-btn button in the
    // kill-or-scale module's verbatim content. Ported 1:1 from main.js
    // window.runKSTree (line 503). Full decision tree logic preserved exactly.
    type WinWithGlobals = Window & {
      runKSTree?: () => void;
      showConsultingForm?: () => void;
      calcBE?: () => void;
    };
    const wg = window as WinWithGlobals;

    wg.runKSTree = function () {
      const spend = parseFloat((document.getElementById('ks-spend') as HTMLInputElement)?.value) || 0;
      const cpa = parseFloat((document.getElementById('ks-cpa') as HTMLInputElement)?.value) || 0;
      const atc = parseFloat((document.getElementById('ks-atc') as HTMLInputElement)?.value) || 0;
      const sales = parseFloat((document.getElementById('ks-sales') as HTMLInputElement)?.value) || 0;
      const ctr = parseFloat((document.getElementById('ks-ctr') as HTMLInputElement)?.value) || 0;
      const result = document.getElementById('ks-result');
      const empty = document.getElementById('ks-empty');
      if (!spend || !cpa || spend < 0 || cpa < 0) {
        if (result) result.style.display = 'none';
        if (empty) {
          empty.style.display = 'block';
          empty.textContent = !spend && !cpa ? 'Enter your spend and target CPA to get a decision.' : 'Please enter valid positive numbers.';
        }
        return;
      }
      if (result) result.style.display = 'block';
      if (empty) empty.style.display = 'none';
      const threshold4x = cpa * 4;
      const badge = document.getElementById('ks-verdict-badge');
      const title = document.getElementById('ks-verdict-title');
      const reason = document.getElementById('ks-verdict-reason');
      const list = document.getElementById('ks-actions-list');
      let verdict = '', color = '', bgColor = '', borderColor = '', titleText = '', reasonText = '', actions: string[] = [];
      if (ctr > 0 && ctr < 0.5 && spend > 30) {
        verdict = 'KILL — Hook Failure'; color = 'var(--red)'; bgColor = 'rgba(255,59,92,.12)'; borderColor = 'rgba(255,59,92,.25)';
        titleText = 'Your creative is not generating clicks.';
        reasonText = `CTR of ${ctr}% is below the 0.5% floor after $${spend} in spend. This is a hook and angle problem — not a product problem. New creative hooks, not budget changes.`;
        actions = ['Stop ad spend immediately', 'Produce 5 new hooks using different emotional triggers', 'Launch a new creative batch — do not edit existing ads (resets learning)', 'Return to Module 07 for hook construction guidance'];
      } else if (atc > 0 && atc < 3 && spend >= threshold4x && sales === 0) {
        verdict = 'KILL — No Signal'; color = 'var(--red)'; bgColor = 'rgba(255,59,92,.12)'; borderColor = 'rgba(255,59,92,.25)';
        titleText = 'No purchase signal after full evaluation threshold.';
        reasonText = `You've spent $${spend} — 4× your CPA target of $${cpa}. ATC of ${atc}% is below 3% minimum and zero purchases. Kill and move on.`;
        actions = ['Kill this product test — do not iterate on zero signal', 'Review if you tested 3–5 genuinely different angles', 'If yes: product has no hook in this market — next product', 'If no: try 2–3 completely different angles before calling it dead'];
      } else if (atc >= 3 && atc < 5 && sales === 0 && spend < threshold4x) {
        verdict = 'WAIT — Weak Signal'; color = 'var(--yellow)'; bgColor = 'rgba(245,158,11,.1)'; borderColor = 'rgba(245,158,11,.25)';
        titleText = "Weak signal — don't kill yet, but investigate the page.";
        reasonText = `ATC of ${atc}% means people are interested but not convinced to buy. You've spent $${spend} of your $${threshold4x.toFixed(0)} evaluation threshold. Check your product page.`;
        actions = ['Check page load time on mobile — must be under 3 seconds', 'Review checkout for hidden shipping costs', 'Confirm ad promise matches product page promise', `Give it until $${threshold4x.toFixed(0)} total spend before kill decision`];
      } else if (atc >= 5 && sales >= 1 && spend >= threshold4x) {
        const currentCPA = spend / sales;
        if (currentCPA <= cpa * 1.2) {
          verdict = 'SCALE ↑'; color = 'var(--green)'; bgColor = 'rgba(0,229,160,.1)'; borderColor = 'rgba(0,229,160,.25)';
          titleText = 'Clear signal — scale immediately.';
          reasonText = `ATC of ${atc}% is strong. Actual CPA of $${currentCPA.toFixed(0)} is within 20% of your $${cpa} target. Time to push budget.`;
          actions = ['Increase daily budget 20–30% (do not double — avoids learning phase reset)', 'Produce 10+ new creatives in the same winning angle', 'Check every 2–4 hours using surf scaling protocol (Module 15)', 'Start building second creative batch with different angle'];
        } else {
          verdict = 'IMPROVE — CPA Too High'; color = 'var(--yellow)'; bgColor = 'rgba(245,158,11,.1)'; borderColor = 'rgba(245,158,11,.25)';
          titleText = 'Sales are happening but CPA is above target.';
          reasonText = `You have ${sales} purchase(s) at average CPA of $${currentCPA.toFixed(0)} vs target of $${cpa}. Product works — economics don't yet. Fix the offer.`;
          actions = ['Review offer stack — bundle, guarantee, free shipping threshold', 'Check if price increase (+10–15%) improves margins without dropping CVR', 'Add upsell or order bump to raise AOV', 'Revisit Module 12 — Offer Engineering'];
        }
      } else if (atc >= 8 && spend < threshold4x) {
        verdict = 'LOOKS GOOD — Watch Closely'; color = 'var(--green)'; bgColor = 'rgba(0,229,160,.08)'; borderColor = 'rgba(0,229,160,.2)';
        titleText = 'Strong early ATC signal — let it breathe.';
        reasonText = `ATC of ${atc}% is above the 8% "has legs" threshold. Only $${spend} in — haven't hit $${threshold4x.toFixed(0)} evaluation point. Don't kill. Don't scale yet.`;
        actions = ['Do not touch budget or creative — let algorithm optimize', `Check back at $${threshold4x.toFixed(0)} spend for full evaluation`, 'Prepare next creative batch for immediate production if confirmed', `Set reminder to evaluate at $${threshold4x.toFixed(0)} mark`];
      } else {
        verdict = 'INSUFFICIENT DATA'; color = 'var(--text3)'; bgColor = 'var(--surface)'; borderColor = 'var(--border2)';
        titleText = 'Not enough data yet for a reliable decision.';
        reasonText = "Fill in all fields accurately. Target CPA = your gross profit per order, not what you hope to pay. Return once you've spent at least 2× target CPA.";
        actions = ['Confirm all numbers are accurate — especially target CPA', 'Target CPA = gross profit per order, not aspirational number', "Return once you've hit at least 48 hours of spend data"];
      }
      if (badge) {
        badge.textContent = verdict;
        badge.style.cssText = `display:inline-block;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:5px 14px;border-radius:4px;margin-bottom:12px;background:${bgColor};color:${color};border:1px solid ${borderColor};`;
      }
      if (title) title.textContent = titleText;
      if (reason) reason.textContent = reasonText;
      if (list) {
        list.innerHTML = actions.map((a, i) => `<li style="font-size:13.5px;color:var(--text);padding:8px 0 8px 28px;border-bottom:1px solid rgba(255,255,255,.04);position:relative;"><span style="position:absolute;left:0;top:10px;font-size:11px;font-weight:800;color:var(--accent);">${i + 1}.</span>${a}</li>`).join('');
      }
    };

    // ── window.showConsultingForm — toggle consulting apply form ──
    // Called via onclick="showConsultingForm()" in the consulting panel.
    wg.showConsultingForm = function () {
      const f = document.getElementById('consulting-apply-form');
      if (!f) return;
      const isVisible = f.style.display !== 'none' && f.style.display !== '';
      f.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) setTimeout(() => f.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    };

    // ── Broken module image fallback ──
    // Ported from initializePremiumVisualSystem's module-image fallback block
    // (main.js lines 155-176). Replaces broken .course-img-wrap images with a
    // clean placeholder div showing the image's alt text + "Visual asset unavailable"
    // instead of a broken img icon. Excludes images already handled by
    // pdp-gallery (they have their own onerror) and the lightbox (already set
    // cursor:zoom-in, which would conflict with fallback replacement).
    document.querySelectorAll('.course-img-wrap img').forEach((imgEl) => {
      const img = imgEl as HTMLImageElement;
      if (img.dataset.fallbackApplied) return;
      function replaceBrokenModuleImage() {
        if (!img.parentNode || img.dataset.fallbackApplied === '1') return;
        img.dataset.fallbackApplied = '1';
        const fallback = document.createElement('div');
        fallback.className = 'module-image-fallback';
        const t = document.createElement('strong');
        t.textContent = img.alt || 'Module visual';
        const s = document.createElement('span');
        s.textContent = 'Visual asset unavailable';
        fallback.appendChild(t);
        fallback.appendChild(s);
        img.parentNode.replaceChild(fallback, img);
      }
      if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        replaceBrokenModuleImage();
      } else {
        img.addEventListener('error', replaceBrokenModuleImage, { once: true });
      }
    });

    // ── Mobile header module title sync ──
    // In the SPA, syncMobileModuleHeader ran each time goToPage() was called.
    // In the Next.js build, each page is a real route — so we run it once on
    // mount, reading the current page's module info from the active nav item
    // (matched by href) to set mh-logo-text to the module number/name.
    const mhLogo = document.getElementById('mh-logo-text');
    if (mhLogo) {
      const currentPath = window.location.pathname;
      const activeNavItem = document.querySelector(`.nav-item[href="${currentPath}"]`) as HTMLElement | null;
      if (activeNavItem) {
        const numEl = activeNavItem.querySelector('.num');
        const raw = numEl?.textContent?.trim() || '';
        let compact = '';
        if (/^\d+$/.test(raw)) compact = 'MODULE ' + raw.padStart(2, '0');
        else if (/^B\d+$/i.test(raw)) compact = 'BONUS ' + raw.toUpperCase();
        else if (raw) compact = raw.toUpperCase();
        if (!compact) {
          const clone = activeNavItem.cloneNode(true) as HTMLElement;
          clone.querySelectorAll('.num, .nav-check, svg').forEach((c) => c.remove());
          compact = clone.textContent?.trim() || 'Playbook';
        }
        mhLogo.textContent = compact;
      }
    }

    return () => {
      document.removeEventListener('click', handleFaqClick);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleInspoBackdropClick);
      document.removeEventListener('keydown', handleInspoEscape);
    };
  }, []);

  return null;
}
