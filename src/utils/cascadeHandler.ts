import { Position } from '../hooks/useJewelSwap';

interface Jewel {
  id: string;
  type: string;
  position: Position;
}

type NullableJewel = Jewel | null;

const BOARD_SIZE = 8;
const JEWEL_TYPES = ['💎', '⭐', '🔵', '🔴', '🟣', '🟡', '🟢', '🟠'];

const getRandomJewelType = () => {
  return JEWEL_TYPES[Math.floor(Math.random() * JEWEL_TYPES.length)];
};

export const handleCascade = (board: NullableJewel[][]): NullableJewel[][] => {
  const newBoard = [...board.map(row => [...row])];

  // Drop existing jewels
  for (let x = 0; x < BOARD_SIZE; x++) {
    let bottomY = BOARD_SIZE - 1;
    
    // Start from the bottom and move jewels down
    while (bottomY >= 0) {
      if (newBoard[bottomY][x] === null) {
        // Find the next non-null jewel above
        let topY = bottomY - 1;
        while (topY >= 0 && newBoard[topY][x] === null) {
          topY--;
        }

        // If we found a jewel, move it down
        if (topY >= 0) {
          newBoard[bottomY][x] = {
            ...newBoard[topY][x]!,
            position: { x, y: bottomY },
          };
          newBoard[topY][x] = null;
        }
      }
      bottomY--;
    }
  }

  // Fill empty spaces with new jewels
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (!newBoard[y][x]) {
        newBoard[y][x] = {
          id: `jewel-${x}-${y}-${Date.now()}`,
          type: getRandomJewelType(),
          position: { x, y },
        } as Jewel;
      }
    }
  }

  return newBoard;
};
