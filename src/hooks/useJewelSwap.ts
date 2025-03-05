import { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const useJewelSwap = (onSwap: (from: Position, to: Position) => void) => {
  const [selectedJewel, setSelectedJewel] = useState<Position | null>(null);

  const handleJewelSelect = (position: Position) => {
    if (!selectedJewel) {
      setSelectedJewel(position);
      return;
    }

    if (isAdjacent(selectedJewel, position)) {
      onSwap(selectedJewel, position);
    }

    setSelectedJewel(null);
  };

  const isAdjacent = (pos1: Position, pos2: Position) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  return { handleJewelSelect, selectedJewel };
};

export default useJewelSwap;
