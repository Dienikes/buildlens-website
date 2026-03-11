/**
 * Navigation
 * Scroll-triggered background transition + mobile overlay menu.
 * Exports init/destroy for lifecycle management.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let scrollTriggerInstance: ScrollTrigger | null = null;
let hamburgerHandler: (() => void) | null = null;
let closeHandler: (() => void) | null = null;
let escapeHandler: ((e: KeyboardEvent) => void) | null = null;
let overlayLinkHandlers: Array<{ el: Element; handler: () => void }> = [];
let openTimeline: gsap.core.Timeline | null = null;
let isOpen = false;

function openMenu(): void {
  const overlay = document.getElementById('nav-overlay');
  const hamburger = document.getElementById('nav-hamburger');
  if (!overlay || !hamburger) return;

  isOpen = true;
  overlay.style.pointerEvents = 'auto';
  hamburger.setAttribute('aria-expanded', 'true');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const links = overlay.querySelectorAll('.overlay-link');
  const cta = overlay.querySelector('.nav-cta');
  const footer = overlay.querySelector('div:last-child');

  // Check reduced motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    gsap.set(overlay, { opacity: 1 });
    gsap.set(links, { opacity: 1, y: 0 });
    if (cta) gsap.set(cta, { opacity: 1, y: 0 });
    if (footer) gsap.set(footer, { opacity: 1 });
    return;
  }

  openTimeline = gsap.timeline();
  openTimeline
    .to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    .from(links, { opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.1')
    .from(cta, { opacity: 0, y: 20, duration: 0.4, ease: 'power3.out' }, '-=0.3')
    .from(footer, { opacity: 0, duration: 0.3 }, '-=0.2');
}

function closeMenu(): void {
  const overlay = document.getElementById('nav-overlay');
  const hamburger = document.getElementById('nav-hamburger');
  if (!overlay || !hamburger) return;

  isOpen = false;
  hamburger.setAttribute('aria-expanded', 'false');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (openTimeline) {
    openTimeline.kill();
    openTimeline = null;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    gsap.set(overlay, { opacity: 0 });
    overlay.style.pointerEvents = 'none';
    return;
  }

  gsap.to(overlay, {
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      overlay.style.pointerEvents = 'none';
    },
  });
}

export function init(): void {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const closeBtn = document.getElementById('nav-close');
  const overlay = document.getElementById('nav-overlay');

  // Scroll background transition
  if (nav) {
    scrollTriggerInstance = ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.progress > 0) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      },
    });
  }

  // Mobile menu handlers
  if (hamburger) {
    hamburgerHandler = () => openMenu();
    hamburger.addEventListener('click', hamburgerHandler);
  }

  if (closeBtn) {
    closeHandler = () => closeMenu();
    closeBtn.addEventListener('click', closeHandler);
  }

  // Close on Escape key
  escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  };
  document.addEventListener('keydown', escapeHandler);

  // Close on overlay link click
  if (overlay) {
    const links = overlay.querySelectorAll('a');
    links.forEach((link) => {
      const handler = () => closeMenu();
      link.addEventListener('click', handler);
      overlayLinkHandlers.push({ el: link, handler });
    });
  }
}

export function destroy(): void {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }

  if (openTimeline) {
    openTimeline.kill();
    openTimeline = null;
  }

  const hamburger = document.getElementById('nav-hamburger');
  const closeBtn = document.getElementById('nav-close');

  if (hamburger && hamburgerHandler) {
    hamburger.removeEventListener('click', hamburgerHandler);
    hamburgerHandler = null;
  }

  if (closeBtn && closeHandler) {
    closeBtn.removeEventListener('click', closeHandler);
    closeHandler = null;
  }

  if (escapeHandler) {
    document.removeEventListener('keydown', escapeHandler);
    escapeHandler = null;
  }

  overlayLinkHandlers.forEach(({ el, handler }) => {
    el.removeEventListener('click', handler);
  });
  overlayLinkHandlers = [];

  // Reset state
  isOpen = false;
  document.body.style.overflow = '';
}
