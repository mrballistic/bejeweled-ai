import gsap from 'gsap';
import { Position, Match, CascadeMove } from '../types/game';

function getElementByPosition(pos: Position): Element | null {
  return document.querySelector(`[data-position="${pos.row}-${pos.col}"]`);
}

function getElementByJewelId(id: string): Element | null {
  return document.querySelector(`[data-jewel-id="${id}"]`);
}

export function animateSwap(pos1: Position, pos2: Position): Promise<void> {
  return new Promise((resolve) => {
    const el1 = getElementByPosition(pos1);
    const el2 = getElementByPosition(pos2);

    if (!el1 || !el2) {
      resolve();
      return;
    }

    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const dx = rect2.left - rect1.left;
    const dy = rect2.top - rect1.top;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([el1, el2], { clearProps: 'all' });
        resolve();
      },
    });

    tl.to(el1, { x: dx, y: dy, duration: 0.3, ease: 'power2.inOut' }, 0);
    tl.to(el2, { x: -dx, y: -dy, duration: 0.3, ease: 'power2.inOut' }, 0);
  });
}

export function animateRevert(pos1: Position, pos2: Position): Promise<void> {
  return animateSwap(pos2, pos1);
}

export function animateMatch(matches: Match[]): Promise<void> {
  return new Promise((resolve) => {
    const elements: Element[] = [];

    for (const match of matches) {
      for (const pos of match.positions) {
        const el = getElementByPosition(pos);
        if (el) elements.push(el);
      }
    }

    if (elements.length === 0) {
      resolve();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(elements, { clearProps: 'all' });
        resolve();
      },
    });

    // Phase 1: Grow — swell up with a bright flash
    tl.to(elements, {
      scale: 1.4,
      filter: 'brightness(1.8) drop-shadow(0 0 12px rgba(255,255,255,0.8))',
      duration: 0.25,
      stagger: 0.03,
      ease: 'back.out(2)',
    });

    // Phase 2: Pop — burst outward and vanish
    tl.to(elements, {
      scale: 1.8,
      opacity: 0,
      filter: 'brightness(2) drop-shadow(0 0 0px rgba(255,255,255,0))',
      duration: 0.15,
      stagger: 0.02,
      ease: 'power2.in',
    });
  });
}

export function animateCascade(moves: CascadeMove[]): Promise<void> {
  return new Promise((resolve) => {
    if (moves.length === 0) {
      resolve();
      return;
    }

    const tl = gsap.timeline({
      onComplete: resolve,
    });

    // Sort moves by column for staggered column-by-column effect
    const sortedMoves = [...moves].sort((a, b) => a.col - b.col || a.toRow - b.toRow);

    for (const move of sortedMoves) {
      const el = getElementByJewelId(move.jewelId);
      if (!el) continue;

      const rowsToTravel = Math.abs(move.toRow - move.fromRow);
      const parent = el.parentElement;
      if (!parent) continue;

      const cellHeight = parent.getBoundingClientRect().height;
      const startY = -(cellHeight * rowsToTravel);
      const duration = Math.max(0.15 * rowsToTravel, 0.25);
      const columnDelay = move.col * 0.05;

      gsap.set(el, { y: startY });
      tl.to(el, {
        y: 0,
        duration,
        ease: 'bounce.out',
        onComplete: () => { gsap.set(el, { clearProps: 'all' }); },
      }, columnDelay);
    }
  });
}
