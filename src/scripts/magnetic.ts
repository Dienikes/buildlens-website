/**
 * Magnetic Buttons
 * Pointer-only magnetic pull on [data-magnetic] elements.
 * Keyboard focus: no transform, shows focus ring. Snap to rest on focus.
 * Disabled on touch devices.
 */
import { gsap } from 'gsap';

interface MagneticItem {
  el: HTMLElement;
  onPointerMove: (e: PointerEvent) => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

const RADIUS = 100;
const STRENGTH = 0.3;
let items: MagneticItem[] = [];
let canHover = false;

export function init(): void {
  canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  const elements = document.querySelectorAll<HTMLElement>('[data-magnetic]');

  elements.forEach((el) => {
    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < RADIUS) {
        const pull = STRENGTH * (1 - distance / RADIUS);
        gsap.to(el, {
          x: distX * pull,
          y: distY * pull,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onPointerLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const onFocus = () => {
      // Snap to rest immediately on keyboard focus
      gsap.to(el, { x: 0, y: 0, duration: 0 });
    };

    const onBlur = () => {
      // Nothing special needed — focus ring handled by CSS :focus-visible
    };

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);

    items.push({ el, onPointerMove, onPointerLeave, onFocus, onBlur });
  });
}

export function destroy(): void {
  items.forEach(({ el, onPointerMove, onPointerLeave, onFocus, onBlur }) => {
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerleave', onPointerLeave);
    el.removeEventListener('focus', onFocus);
    el.removeEventListener('blur', onBlur);
    gsap.set(el, { x: 0, y: 0 });
  });
  items = [];
}
