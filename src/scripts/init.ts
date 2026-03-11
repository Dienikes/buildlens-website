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
  nav.init();
}

function destroyAll(): void {
  nav.destroy();
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
  if ((window as any).__splashActive) {
    // Splash is playing — wait for it to finish before starting animations
    window.addEventListener('splash:complete', () => initAll(), { once: true });
  } else {
    initAll();
  }
});

document.addEventListener('astro:before-swap', () => {
  destroyAll();
});
