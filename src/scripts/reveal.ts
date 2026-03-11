/**
 * Scroll Reveal
 * Animates elements with [data-reveal] attribute on scroll enter.
 * Types: "lines" (SplitText), "fade", "stagger", "counter"
 * All ScrollTrigger instances stored for cleanup.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

let triggers: ScrollTrigger[] = [];
let splits: SplitText[] = [];

function revealLines(el: HTMLElement): void {
  const split = new SplitText(el, {
    type: 'lines',
    linesClass: 'split-line',
    mask: 'lines',
  });
  splits.push(split);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  });

  tl.from(split.lines, {
    yPercent: 100,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
  });

  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
}

function revealFade(el: HTMLElement): void {
  gsap.set(el, { opacity: 0, y: 40 });

  const st = ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
  });

  triggers.push(st);
}

function revealStagger(el: HTMLElement): void {
  const children = Array.from(el.children) as HTMLElement[];
  gsap.set(children, { opacity: 0, y: 60 });

  const st = ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
  });

  triggers.push(st);
}

function revealCounter(el: HTMLElement): void {
  const target = parseFloat(el.getAttribute('data-target') || '0');
  const obj = { value: 0 };

  // Store final value in DOM for screen readers
  const finalText = el.textContent || String(target);
  el.textContent = '0';

  const st = ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        snap: { value: 1 },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.value));
        },
        onComplete: () => {
          el.textContent = finalText;
        },
      });
    },
  });

  triggers.push(st);
}

export function init(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

  elements.forEach((el) => {
    const type = el.getAttribute('data-reveal');

    switch (type) {
      case 'lines':
        revealLines(el);
        break;
      case 'fade':
        revealFade(el);
        break;
      case 'stagger':
        revealStagger(el);
        break;
      case 'counter':
        revealCounter(el);
        break;
    }
  });

  // After a page transition the scroll position is 0, so elements already
  // in the viewport need their ScrollTriggers to fire immediately.
  // A brief delay lets the DOM settle before recalculating positions.
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export function destroy(): void {
  triggers.forEach((st) => st.kill());
  triggers = [];

  splits.forEach((split) => split.revert());
  splits = [];
}
