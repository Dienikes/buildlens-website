/**
 * Master Init — Orchestrates all interaction modules.
 * Handles Astro page transition lifecycle and prefers-reduced-motion.
 */
import * as lenis from './lenis';
import * as cursor from './cursor';
import * as magnetic from './magnetic';
import * as reveal from './reveal';
import * as parallax from './parallax';
import * as marquee from './marquee';
import * as nav from './nav';
import * as showcase from './showcase';

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let isReducedMotion = reducedMotionQuery.matches;

function initAll(): void {
  isReducedMotion = reducedMotionQuery.matches;

  if (isReducedMotion) {
    // Show all reveal content statically
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  lenis.init();
  cursor.init();
  magnetic.init();
  reveal.init();
  parallax.init();
  marquee.init();
  showcase.init();
  nav.init();
}

function destroyAll(): void {
  nav.destroy();
  showcase.destroy();
  marquee.destroy();
  parallax.destroy();
  reveal.destroy();
  magnetic.destroy();
  cursor.destroy();
  lenis.destroy();
}

// Handle reduced motion changes mid-session
reducedMotionQuery.addEventListener('change', () => {
  destroyAll();
  initAll();
});

// Astro page transition lifecycle
document.addEventListener('astro:page-load', () => {
  // The Splash script is a hoisted module — it only runs once.
  // On subsequent client-side transitions, remove the overlay manually.
  const splash = document.getElementById('splash-overlay');
  if (splash && !window.__splashActive) {
    splash.remove();
  }

  if (window.__splashActive) {
    // Splash is playing — wait for it to finish before starting animations
    window.addEventListener('splash:complete', () => initAll(), { once: true });
  } else {
    initAll();
  }
});

document.addEventListener('astro:before-swap', () => {
  destroyAll();
});
