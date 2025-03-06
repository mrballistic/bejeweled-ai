import { useState, useCallback } from 'react';

export interface Position {
  x: number;
  y: number;
}

const useJewelSwap = (onSwap: (from: Position, to: Position) => Promise<void>) => {
  const [selectedJewel, setSelectedJewel] = useState<Position | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleJewelSelect = useCallback(async (position: Position) => {
    if (isSwapping) {
      console.log('Swap in progress, ignoring selection');
      return;
    }

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
      setIsSwapping(true);
      try {
        await onSwap(selectedJewel, position);
      } finally {
        setIsSwapping(false);
      }
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
  const handleDragSwap = useCallback(async (from: Position, to: Position) => {
    if (isSwapping) {
      console.log('Swap in progress, ignoring drag');
      return;
    }

    console.log('Drag started from:', from);
    console.log('Drag ended at:', to);
    if (isAdjacent(from, to)) {
      console.log('Jewels are adjacent. Attempting swap...');
      setIsSwapping(true);
      try {
        await onSwap(from, to);
      } finally {
        setIsSwapping(false);
      }
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
