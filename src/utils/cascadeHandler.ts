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
  console.log('Starting cascade process with board:', JSON.stringify(board));
  const newBoard = [...board.map(row => [...row])];

  // Drop existing jewels
  for (let x = 0; x < BOARD_SIZE; x++) {
    let bottomY = BOARD_SIZE - 1;
    
    // Start from the bottom and move jewels down
    while (bottomY >= 0) {
      if (newBoard[bottomY][x] === null) {
        console.log(`Found empty space at (${x}, ${bottomY})`);
        // Find the next non-null jewel above
        let topY = bottomY - 1;
        while (topY >= 0 && newBoard[topY][x] === null) {
          topY--;
        }

        // If we found a jewel, move it down
        if (topY >= 0) {
          console.log(`Moving jewel from (${x}, ${topY}) to (${x}, ${bottomY})`);
          const movedJewel = {
            ...newBoard[topY][x]!,
            id: `jewel-${x}-${bottomY}-${Date.now()}`, // Update ID for the new position
            position: { x, y: bottomY },
          };
          newBoard[bottomY][x] = movedJewel;
          newBoard[topY][x] = null;
          console.log(`Moved jewel:`, movedJewel);
        }
      }
      bottomY--;
    }
  }

  console.log('Board after dropping jewels:', JSON.stringify(newBoard));

  // Fill empty spaces with new jewels
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (!newBoard[y][x]) {
        console.log(`Filling empty space at (${x}, ${y})`);
        const newJewel = {
          id: `jewel-${x}-${y}-${Date.now()}`,
          type: getRandomJewelType(),
          position: { x, y },
        } as Jewel;
        newBoard[y][x] = newJewel;
        console.log(`Created new jewel:`, newJewel);
      }
    }
  }

  console.log('Final board after cascade:', JSON.stringify(newBoard));
  return newBoard;
};
