import { useRef, useCallback } from 'react';
import { Position } from '../types/game';

interface UseTouchGestureOptions {
  position: Position;
  jewelSize: number;
  onSwipe: (from: Position, to: Position) => void;
}

export function useTouchGesture({ position, jewelSize, onSwipe }: UseTouchGestureOptions) {
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!startPos.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - startPos.current.x;
    const dy = touch.clientY - startPos.current.y;
    const threshold = jewelSize * 0.3;

    startPos.current = null;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx < threshold && absDy < threshold) return;

    let targetPos: Position;

    if (absDx > absDy) {
      // Horizontal swipe
      targetPos = {
        row: position.row,
        col: position.col + (dx > 0 ? 1 : -1),
      };
    } else {
      // Vertical swipe
      targetPos = {
        row: position.row + (dy > 0 ? 1 : -1),
        col: position.col,
      };
    }

    // Bounds check
    if (targetPos.row >= 0 && targetPos.row < 8 &&
        targetPos.col >= 0 && targetPos.col < 8) {
      onSwipe(position, targetPos);
    }
  }, [position, jewelSize, onSwipe]);

  return { onTouchStart, onTouchEnd };
}
