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
      });
    }

    function closeSidebar() {
      sidebar!.style.willChange = 'transform';
      raf(() => {
        sidebar!.classList.remove('open');
        backdrop?.classList.remove('open');
        document.body.style.overflow = '';
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
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleNavClick, true);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}
