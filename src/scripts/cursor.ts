/**
 * Custom Cursor
 * Outer circle (30px) + inner dot (8px), GSAP quickTo for smooth follow.
 * Hover states via data-cursor attribute. Disabled on touch devices.
 */
import { gsap } from 'gsap';

let outer: HTMLDivElement | null = null;
let inner: HTMLDivElement | null = null;
let moveOuterX: gsap.QuickToFunc | null = null;
let moveOuterY: gsap.QuickToFunc | null = null;
let moveInnerX: gsap.QuickToFunc | null = null;
let moveInnerY: gsap.QuickToFunc | null = null;
let hoverTargets: Element[] = [];
let boundMouseMove: ((e: MouseEvent) => void) | null = null;
let boundMouseLeave: (() => void) | null = null;
let boundMouseEnter: (() => void) | null = null;
let enterHandlers: Array<{ el: Element; handler: () => void }> = [];
let leaveHandlers: Array<{ el: Element; handler: () => void }> = [];

function createElements(): void {
  outer = document.createElement('div');
  outer.setAttribute('aria-hidden', 'true');
  outer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border: 1px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: width 0.3s, height 0.3s, background 0.3s;
  `;

  inner = document.createElement('div');
  inner.setAttribute('aria-hidden', 'true');
  inner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    opacity: 0;
  `;

  document.body.appendChild(outer);
  document.body.appendChild(inner);
}

function setDefaultState(): void {
  if (!outer) return;
  outer.style.width = '30px';
  outer.style.height = '30px';
  outer.style.background = 'transparent';
}

function setPointerState(): void {
  if (!outer) return;
  outer.style.width = '60px';
  outer.style.height = '60px';
  outer.style.background = 'rgba(240, 230, 211, 0.2)';
}

function setActionState(): void {
  if (!outer) return;
  outer.style.width = '80px';
  outer.style.height = '80px';
  outer.style.background = 'rgba(240, 230, 211, 0.15)';
}

export function init(): void {
  // Disable on touch devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  createElements();
  if (!outer || !inner) return;

  moveOuterX = gsap.quickTo(outer, 'left', { duration: 0.3, ease: 'power3' });
  moveOuterY = gsap.quickTo(outer, 'top', { duration: 0.3, ease: 'power3' });
  moveInnerX = gsap.quickTo(inner, 'left', { duration: 0.15, ease: 'power3' });
  moveInnerY = gsap.quickTo(inner, 'top', { duration: 0.15, ease: 'power3' });

  boundMouseMove = (e: MouseEvent) => {
    moveOuterX!(e.clientX);
    moveOuterY!(e.clientY);
    moveInnerX!(e.clientX);
    moveInnerY!(e.clientY);
  };

  boundMouseEnter = () => {
    if (outer) outer.style.opacity = '1';
    if (inner) inner.style.opacity = '1';
  };

  boundMouseLeave = () => {
    if (outer) outer.style.opacity = '0';
    if (inner) inner.style.opacity = '0';
  };

  document.addEventListener('mousemove', boundMouseMove);
  document.addEventListener('mouseleave', boundMouseLeave);
  document.addEventListener('mouseenter', boundMouseEnter);

  // Set up hover states for data-cursor elements
  bindHoverTargets();
}

function bindHoverTargets(): void {
  hoverTargets = Array.from(document.querySelectorAll('[data-cursor]'));

  hoverTargets.forEach((el) => {
    const type = el.getAttribute('data-cursor');
    const enterHandler = () => {
      if (type === 'pointer') setPointerState();
      else if (type === 'action') setActionState();
    };
    const leaveHandler = () => setDefaultState();

    el.addEventListener('mouseenter', enterHandler);
    el.addEventListener('mouseleave', leaveHandler);

    enterHandlers.push({ el, handler: enterHandler });
    leaveHandlers.push({ el, handler: leaveHandler });
  });
}

export function destroy(): void {
  if (boundMouseMove) document.removeEventListener('mousemove', boundMouseMove);
  if (boundMouseLeave) document.removeEventListener('mouseleave', boundMouseLeave);
  if (boundMouseEnter) document.removeEventListener('mouseenter', boundMouseEnter);

  enterHandlers.forEach(({ el, handler }) => el.removeEventListener('mouseenter', handler));
  leaveHandlers.forEach(({ el, handler }) => el.removeEventListener('mouseleave', handler));

  if (outer) outer.remove();
  if (inner) inner.remove();

  outer = null;
  inner = null;
  moveOuterX = null;
  moveOuterY = null;
  moveInnerX = null;
  moveInnerY = null;
  hoverTargets = [];
  enterHandlers = [];
  leaveHandlers = [];
  boundMouseMove = null;
  boundMouseLeave = null;
  boundMouseEnter = null;
}
