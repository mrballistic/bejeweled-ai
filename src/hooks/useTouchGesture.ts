import { useCallback, useRef, useState } from 'react';
import { Position } from '../types/game';

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
}

interface UseTouchGestureProps {
  onSwipe: (from: Position, direction: Position) => void;
  onTap: (position: Position) => void;
  position: Position;
  threshold?: number;
  maxTime?: number;
}

export const useTouchGesture = ({
  onSwipe,
  onTap,
  position,
  threshold = 30, // minimum distance for swipe
  maxTime = 300, // maximum time for swipe in ms
}: UseTouchGestureProps) => {
  const touchRef = useRef<TouchState | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
    setIsTouching(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent scrolling
    if (!touchRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;

    // Visual feedback during movement
    const element = e.currentTarget;
    const transform = `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px)`;
    element.style.transform = transform;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault();
    setIsTouching(false);

    // Reset transform
    const element = e.currentTarget;
    element.style.transform = '';

    if (!touchRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;
    const deltaTime = Date.now() - touchRef.current.startTime;

    // Reset touch state
    const touchState = touchRef.current;
    touchRef.current = null;

    // If the touch duration is too long, treat as a tap
    if (deltaTime > maxTime) {
      onTap(position);
      return;
    }

    // Calculate absolute distances
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // If movement is less than threshold, treat as a tap
    if (Math.max(absX, absY) < threshold) {
      onTap(position);
      return;
    }

    // Determine swipe direction
    if (absX > absY) {
      // Horizontal swipe
      const direction: Position = {
        x: deltaX > 0 ? 1 : -1,
        y: 0,
      };
      onSwipe(position, direction);
    } else {
      // Vertical swipe
      const direction: Position = {
        x: 0,
        y: deltaY > 0 ? 1 : -1,
      };
      onSwipe(position, direction);
    }
  }, [onSwipe, onTap, position, threshold, maxTime]);

  const handleTouchCancel = useCallback((e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault();
    setIsTouching(false);
    touchRef.current = null;

    // Reset transform
    const element = e.currentTarget;
    element.style.transform = '';
  }, []);

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
    },
    isTouching,
  };
};
