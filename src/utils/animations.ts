import gsap from 'gsap';
import { NullableJewelType, Position } from '../types/game';

export const animateSwap = (from: HTMLElement, to: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    gsap.to(from, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    gsap.to(to, {
      x: -deltaX,
      y: -deltaY,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set([from, to], { clearProps: 'x,y' });
        resolve();
      },
    });
  });
};

export const animateMatch = (elements: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    gsap.to(elements, {
      scale: 1.25,
      opacity: 0,
      duration: 0.18,
      ease: 'back.in(1.4)',
      onComplete: () => {
        gsap.set(elements, { clearProps: 'scale,opacity' });
        resolve();
      },
    });
  });
};

export const animateCascade = (
  board: NullableJewelType[][],
  previousPositions: Map<string, Position>
): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve();
      return;
    }

    const elementsToReset: HTMLElement[] = [];
    const columnAnimations = new Map<
      number,
      Array<{
        element: HTMLElement;
        fromY: number;
        fromX: number;
        isNew: boolean;
        yOrder: number;
      }>
    >();

    board.forEach((row) => {
      row.forEach((jewel) => {
        if (!jewel) {
          return;
        }

        const element = document.querySelector(`[data-jewel-id="${jewel.id}"]`) as HTMLElement | null;
        if (!element) {
          return;
        }

        const currentRect = element.getBoundingClientRect();
        const parent = element.parentElement as HTMLElement | null;
        const parentStyles = parent ? window.getComputedStyle(parent) : null;
        const gapValue = parentStyles?.rowGap || parentStyles?.gap || '0';
        const gap = parseFloat(gapValue) || 0;
        const cellHeight = currentRect.height + gap;

        const previousPosition = previousPositions.get(jewel.id);
        let fromY: number;
        let isNew = false;

        let fromX = 0;

        if (previousPosition) {
          const deltaRows = previousPosition.y - jewel.position.y;
          fromY = deltaRows * cellHeight;
          const deltaCols = previousPosition.x - jewel.position.x;
          if (deltaCols !== 0) {
            const cellWidth = currentRect.width + gap;
            fromX = deltaCols * cellWidth;
          }
        } else {
          fromY = -(cellHeight * (jewel.position.y + 1));
          isNew = true;
        }

        // Ignore negligible movement
        if (Math.abs(fromY) < 1) {
          fromY = 0;
        }

        if (fromY === 0 && !isNew) {
          return;
        }

        if (!columnAnimations.has(jewel.position.x)) {
          columnAnimations.set(jewel.position.x, []);
        }

        columnAnimations.get(jewel.position.x)?.push({
          element,
          fromY,
          fromX,
          isNew,
          yOrder: jewel.position.y,
        });

        elementsToReset.push(element);
      });
    });

    if (columnAnimations.size === 0) {
      resolve();
      return;
    }

    const timeline = gsap.timeline({
      defaults: {
        duration: 0.28,
        ease: 'power2.in',
      },
      onComplete: () => {
        elementsToReset.forEach((el) => {
          gsap.set(el, { clearProps: 'transform,opacity' });
        });
        resolve();
      },
    });

    const sortedColumns = Array.from(columnAnimations.entries()).sort(([a], [b]) => a - b);

    sortedColumns.forEach(([_columnIndex, animations], columnOffset) => {
      animations
        .sort((a, b) => a.yOrder - b.yOrder)
        .forEach((item, rowOffset) => {
          const startAt = columnOffset * 0.05 + rowOffset * 0.04;
          timeline.fromTo(
            item.element,
            {
              x: item.fromX,
              y: item.fromY,
              opacity: item.isNew ? 0 : 1,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
            },
            startAt
          );
        });
    });
  });
};
