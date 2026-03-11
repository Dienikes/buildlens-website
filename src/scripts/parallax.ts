/**
 * Parallax
 * Elements with [data-parallax="0.2"] move at 20% of scroll speed.
 * Images get a slight scale(1.15) inside overflow:hidden containers.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let triggers: ScrollTrigger[] = [];

export function init(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');

  elements.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.2');
    const isImage = el.tagName === 'IMG' || el.querySelector('img') !== null;

    if (isImage) {
      gsap.set(el, { scale: 1.15 });
    }

    const st = gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    if (st.scrollTrigger) triggers.push(st.scrollTrigger);
  });
}

export function destroy(): void {
  triggers.forEach((st) => st.kill());
  triggers = [];
}
