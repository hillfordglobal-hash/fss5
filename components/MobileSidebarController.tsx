'use client';

import { useEffect } from 'react';

/**
 * Mobile sidebar controller — ported from main.js's initSidebar() IIFE.
 * Manages the .open class on #sidebar / #sidebar-backdrop and wires up:
 *   - hamburger button (#mob-menu-btn) click to toggle
 *   - backdrop click to close
 *   - swipe-left-to-close gesture on the sidebar itself
 *   - Escape key to close
 *   - auto-close when a nav item is clicked (mobile only)
 *   - auto-close if the viewport is resized back to desktop while open
 *
 * Mounted once in the root layout (not per-page) since the sidebar persists
 * across all routes.
 */
export default function MobileSidebarController() {
  useEffect(() => {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const menuBtn = document.getElementById('mob-menu-btn');
    if (!sidebar) return;

    const isMobile = () => window.innerWidth <= 768;
    const raf = (fn: () => void) => window.requestAnimationFrame(fn);

    function openSidebar() {
      sidebar!.style.willChange = 'transform';
      raf(() => {
        sidebar!.classList.add('open');
        backdrop?.classList.add('open');
        document.body.style.overflow = 'hidden';
        // Bring the module you're on into view inside the drawer (no scrollIntoView)
        raf(() => {
          const list = sidebar!.querySelector('.sidebar-nav') as HTMLElement | null;
          const active = sidebar!.querySelector('.nav-item.active') as HTMLElement | null;
          if (list && active) {
            const target = active.offsetTop - list.clientHeight / 2 + active.clientHeight / 2;
            list.scrollTop = Math.max(0, target);
          }
        });
      });
    }

    function closeSidebar() {
      sidebar!.style.willChange = 'transform';
      raf(() => {
        sidebar!.classList.remove('open');
        backdrop?.classList.remove('open');
        document.body.style.overflow = '';
        clearSearch();
      });
    }

    function toggleSidebar() {
      if (sidebar!.classList.contains('open')) closeSidebar();
      else openSidebar();
    }

    function handleMenuClick(e: Event) {
      e.stopPropagation();
      toggleSidebar();
    }
    menuBtn?.addEventListener('click', handleMenuClick);

    function handleBackdropClick(e: Event) {
      e.stopPropagation();
      closeSidebar();
    }
    backdrop?.addEventListener('click', handleBackdropClick);

    // ── swipe-to-close (right→left swipe on the open sidebar) ──
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    function handleTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
      isDragging = false;
    }
    function handleTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = Math.abs(t.clientY - startY);
      if (!isDragging && Math.abs(dx) > 10 && dy < 40) {
        isDragging = true;
      }
      if (isDragging && dx < -40) {
        closeSidebar();
        isDragging = false;
      }
    }
    sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
    sidebar.addEventListener('touchmove', handleTouchMove, { passive: true });

    // ── edge-swipe-to-open (left→right swipe starting near the screen edge) ──
    let edgeX = 0;
    let edgeY = 0;
    let edgeTracking = false;
    function handleEdgeStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t || !isMobile()) return;
      if (sidebar!.classList.contains('open')) return;
      if (t.clientX <= 24) {
        edgeX = t.clientX;
        edgeY = t.clientY;
        edgeTracking = true;
      }
    }
    function handleEdgeMove(e: TouchEvent) {
      if (!edgeTracking) return;
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - edgeX;
      const dy = Math.abs(t.clientY - edgeY);
      if (dx > 48 && dy < 40) {
        openSidebar();
        edgeTracking = false;
      }
    }
    function handleEdgeEnd() {
      edgeTracking = false;
    }
    document.addEventListener('touchstart', handleEdgeStart, { passive: true });
    document.addEventListener('touchmove', handleEdgeMove, { passive: true });
    document.addEventListener('touchend', handleEdgeEnd, { passive: true });

    // ── search/filter (mobile drawer + desktop) ──
    const search = document.getElementById('nav-search') as HTMLInputElement | null;
    function runFilter() {
      if (!search) return;
      const q = search.value.trim().toLowerCase();
      sidebar!.querySelectorAll<HTMLElement>('.nav-phase-group').forEach((group) => {
        let anyVisible = false;
        group.querySelectorAll<HTMLElement>('.nav-item').forEach((item) => {
          const text = (item.textContent || '').toLowerCase();
          const match = !q || text.includes(q);
          item.style.display = match ? '' : 'none';
          if (match) anyVisible = true;
        });
        group.style.display = anyVisible ? '' : 'none';
      });
    }
    search?.addEventListener('input', runFilter);
    // Reset the filter whenever the drawer closes so it's fresh next open
    function clearSearch() {
      if (search && search.value) {
        search.value = '';
        runFilter();
      }
    }

    // ── Escape key ──
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && sidebar!.classList.contains('open')) {
        closeSidebar();
      }
    }
    document.addEventListener('keydown', handleKeydown);

    // ── auto-close on nav item click (mobile only) ──
    function handleNavClick(e: Event) {
      if (!isMobile()) return;
      const target = e.target as Element;
      const navItem = target.closest('.nav-item');
      if (navItem && sidebar!.classList.contains('open')) {
        raf(() => closeSidebar());
      }
    }
    document.addEventListener('click', handleNavClick, true);

    // ── auto-close if resized to desktop while open ──
    function handleResize() {
      if (!isMobile() && sidebar!.classList.contains('open')) {
        closeSidebar();
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      menuBtn?.removeEventListener('click', handleMenuClick);
      backdrop?.removeEventListener('click', handleBackdropClick);
      sidebar.removeEventListener('touchstart', handleTouchStart);
      sidebar.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleEdgeStart);
      document.removeEventListener('touchmove', handleEdgeMove);
      document.removeEventListener('touchend', handleEdgeEnd);
      search?.removeEventListener('input', runFilter);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleNavClick, true);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}
