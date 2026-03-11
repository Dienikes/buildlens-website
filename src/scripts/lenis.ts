/**
 * Lenis Smooth Scroll + GSAP Ticker Sync
 * Lenis owns all scroll physics. Native smooth-scroll is disabled in CSS.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export function init(): void {
  // Reset native scroll to top before Lenis takes over
  window.scrollTo(0, 0);

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  // Sync Lenis scroll position with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker (single RAF loop)
  tickerCallback = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);
}

export function destroy(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function getLenis(): Lenis | null {
  return lenis;
}
