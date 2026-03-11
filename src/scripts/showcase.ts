/**
 * Showcase — 3D perspective-shift screenshot carousel.
 * Pinned via ScrollTrigger, scrubs through 6 screenshots with
 * rotateY, scale, blur, and opacity transitions.
 *
 * Reduced motion: falls back to simple stacked layout (no pin, no 3D).
 * Touch/mobile: crossfade only (no 3D rotations).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | null = null;

export function init(): void {
  const container = document.querySelector<HTMLElement>('[data-showcase]');
  if (!container) return;

  const cards = container.querySelectorAll<HTMLElement>('.showcase-card');
  const dots = container.querySelectorAll<HTMLElement>('.showcase-dot');
  const captions = container.querySelectorAll<HTMLElement>('.showcase-caption');
  const progress = container.querySelector<HTMLElement>('.showcase-progress-fill');

  if (cards.length < 2) return;

  const isMobile = window.innerWidth < 768;
  const totalCards = cards.length;

  ctx = gsap.context(() => {
    // Set initial states: first card visible, rest hidden
    gsap.set(cards, { position: 'absolute', inset: 0, opacity: 0 });
    gsap.set(cards[0], { opacity: 1 });
    gsap.set(captions, { opacity: 0, y: 20 });
    gsap.set(captions[0], { opacity: 1, y: 0 });

    if (!isMobile) {
      gsap.set(Array.from(cards).slice(1), {
        rotateY: -8,
        scale: 0.92,
        filter: 'blur(4px)',
      });
    }

    // Build the master timeline
    const tl = gsap.timeline();
    const segmentDuration = 1; // normalized per segment

    for (let i = 0; i < totalCards - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];
      const currentCaption = captions[i];
      const nextCaption = captions[i + 1];
      const startTime = i * segmentDuration;

      // Exit current caption
      tl.to(currentCaption, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'power2.in',
      }, startTime);

      if (isMobile) {
        // Mobile: simple crossfade
        tl.to(currentCard, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        }, startTime + 0.1);

        tl.to(nextCard, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }, startTime + 0.3);
      } else {
        // Desktop: 3D perspective shift
        tl.to(currentCard, {
          rotateY: 8,
          scale: 0.92,
          filter: 'blur(4px)',
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        }, startTime + 0.1);

        tl.to(nextCard, {
          rotateY: 0,
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }, startTime + 0.3);
      }

      // Enter next caption
      if (nextCaption) {
        tl.to(nextCaption, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, startTime + 0.6);
      }
    }

    // Pin via ScrollTrigger
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${totalCards * 100}vh`,
      pin: true,
      scrub: 1,
      animation: tl,
      onUpdate: (self) => {
        // Update progress bar
        if (progress) {
          progress.style.width = `${self.progress * 100}%`;
        }

        // Update dots
        const activeIndex = Math.min(
          Math.floor(self.progress * totalCards),
          totalCards - 1
        );
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      },
    });
  }, container);
}

export function destroy(): void {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
}
