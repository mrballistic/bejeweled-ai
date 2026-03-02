import { useState, useCallback } from 'react';
import { Position } from '../types/game';

export function isAdjacent(a: Position, b: Position): boolean {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

interface UseJewelSwapOptions {
  onSwap: (pos1: Position, pos2: Position) => void;
  isProcessing: React.MutableRefObject<boolean>;
}

export function useJewelSwap({ onSwap, isProcessing }: UseJewelSwapOptions) {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const handleJewelSelect = useCallback((pos: Position) => {
    if (isProcessing.current) return;

    setSelectedPosition(prev => {
      if (!prev) return pos;
      if (prev.row === pos.row && prev.col === pos.col) return null;

      if (isAdjacent(prev, pos)) {
        onSwap(prev, pos);
        return null;
      }

      return pos;
    });
  }, [onSwap, isProcessing]);

  const clearSelection = useCallback(() => {
    setSelectedPosition(null);
  }, []);

  return { selectedPosition, handleJewelSelect, clearSelection };
}
