import { Position } from '../hooks/useJewelSwap';

interface Jewel {
  id: string;
  type: string;
  position: Position;
}

type NullableJewel = Jewel | null;

interface CascadeResult {
  board: NullableJewel[][];
  cascadeLevel: number;
}

const BOARD_SIZE = 8;
const JEWEL_TYPES = ['💎', '⭐', '🔵', '🔴', '🟣', '🟡', '🟢', '🟠'];

const getRandomJewelType = () => {
  return JEWEL_TYPES[Math.floor(Math.random() * JEWEL_TYPES.length)];
};

export const handleCascade = (
  board: NullableJewel[][],
  currentCascadeLevel: number = 0
): CascadeResult => {
  console.log('Starting cascade process with board:', JSON.stringify(board));
  console.log('Current cascade level:', currentCascadeLevel);
  
  const newBoard = [...board.map(row => [...row])];
  let hasChanges = false;

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
            id: `jewel-${x}-${bottomY}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            position: { x, y: bottomY },
          };
          newBoard[bottomY][x] = movedJewel;
          newBoard[topY][x] = null;
          hasChanges = true;
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
          id: `jewel-${x}-${y}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: getRandomJewelType(),
          position: { x, y },
        } as Jewel;
        newBoard[y][x] = newJewel;
        hasChanges = true;
        console.log(`Created new jewel:`, newJewel);
      }
    }
  }

  // Increment cascade level only if changes were made
  const newCascadeLevel = hasChanges ? currentCascadeLevel + 1 : currentCascadeLevel;
  
  console.log('Final board after cascade:', JSON.stringify(newBoard));
  console.log('New cascade level:', newCascadeLevel);
  
  return {
    board: newBoard,
    cascadeLevel: newCascadeLevel
  };
};
