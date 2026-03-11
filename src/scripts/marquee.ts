/**
 * Marquee
 * Infinite horizontal scroll. Duplicates inner content for seamless loop.
 * data-marquee-direction="reverse" for opposite direction.
 * Pauses when off-screen via IntersectionObserver.
 */
import { gsap } from 'gsap';

interface MarqueeItem {
  el: HTMLElement;
  tween: gsap.core.Tween;
  observer: IntersectionObserver;
}

let items: MarqueeItem[] = [];

export function init(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-marquee]');

  elements.forEach((el) => {
    const inner = el.firstElementChild as HTMLElement;
    if (!inner) return;

    // Duplicate content for seamless loop
    const clone = inner.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    el.appendChild(clone);

    el.style.display = 'flex';
    el.style.overflow = 'hidden';
    el.style.whiteSpace = 'nowrap';

    const isReverse = el.getAttribute('data-marquee-direction') === 'reverse';
    const duration = parseFloat(el.getAttribute('data-marquee-speed') || '20');

    const tween = gsap.to(el.children, {
      xPercent: isReverse ? 100 : -100,
      repeat: -1,
      duration,
      ease: 'none',
    });

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tween.play();
        else tween.pause();
      },
      { threshold: 0 },
    );
    observer.observe(el);

    items.push({ el, tween, observer });
  });
}

export function destroy(): void {
  items.forEach(({ el, tween, observer }) => {
    tween.kill();
    observer.disconnect();
    // Remove cloned content
    if (el.children.length > 1) {
      el.removeChild(el.lastElementChild!);
    }
  });
  items = [];
}
