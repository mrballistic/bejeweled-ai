import { useState, useCallback } from 'react';

export interface Position {
  x: number;
  y: number;
}

const useJewelSwap = (onSwap: (from: Position, to: Position) => void) => {
  const [selectedJewel, setSelectedJewel] = useState<Position | null>(null);

  const handleJewelSelect = useCallback((position: Position) => {
    if (!selectedJewel) {
      // First jewel selected
      setSelectedJewel(position);
      return;
    }

    // Second jewel selected
    if (isAdjacent(selectedJewel, position)) {
      onSwap(selectedJewel, position);
    }

    // Reset selection
    setSelectedJewel(null);
  }, [selectedJewel, onSwap]);

  const isAdjacent = (pos1: Position, pos2: Position) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  // Direct swap function for drag and drop
  const handleDragSwap = useCallback((from: Position, to: Position) => {
    if (isAdjacent(from, to)) {
      onSwap(from, to);
    }
  }, [onSwap]);

  return {
    handleJewelSelect,
    handleDragSwap,
    selectedJewel,
  };
};

export default useJewelSwap;
