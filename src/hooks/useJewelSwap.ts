import { useState, useCallback } from 'react';

export interface Position {
  x: number;
  y: number;
}

const useJewelSwap = (onSwap: (from: Position, to: Position) => void) => {
  const [selectedJewel, setSelectedJewel] = useState<Position | null>(null);

  const handleJewelSelect = useCallback((position: Position) => {
    console.log('Jewel selected:', position);
    if (!selectedJewel) {
      // First jewel selected
      setSelectedJewel(position);
      console.log('First jewel selected:', position);
      return;
    }

    // Second jewel selected
    console.log('Second jewel selected:', position);
    if (isAdjacent(selectedJewel, position)) {
      console.log('Jewels are adjacent. Attempting swap...');
      onSwap(selectedJewel, position);
    } else {
      console.log('Jewels are not adjacent. Resetting selection.');
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
    console.log('Drag started from:', from);
    console.log('Drag ended at:', to);
    if (isAdjacent(from, to)) {
      console.log('Jewels are adjacent. Attempting swap...');
      onSwap(from, to);
    } else {
      console.log('Jewels are not adjacent. Swap aborted.');
    }
  }, [onSwap]);

  return {
    handleJewelSelect,
    handleDragSwap,
    selectedJewel,
  };
};

export default useJewelSwap;
