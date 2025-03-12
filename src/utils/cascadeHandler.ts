import { Position } from '../hooks/useJewelSwap';

interface Jewel {
  id: string;
  type: string;
  position: Position;
  isMoving?: boolean;
  isNew?: boolean;
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

  // Process each column
  for (let x = 0; x < BOARD_SIZE; x++) {
    // First, collect all non-null jewels in the column from bottom to top
    const columnJewels: Jewel[] = [];
    for (let y = BOARD_SIZE - 1; y >= 0; y--) {
      if (newBoard[y][x]) {
        columnJewels.push({
          ...newBoard[y][x]!,
          isMoving: false,
          isNew: false
        });
        newBoard[y][x] = null;
      }
    }

    // Place existing jewels from bottom up
    let bottomY = BOARD_SIZE - 1;
    columnJewels.forEach(jewel => {
      if (bottomY >= 0) {
        if (bottomY !== jewel.position.y) {
          jewel.isMoving = true;
        }
        jewel.position = { x, y: bottomY };
        newBoard[bottomY][x] = jewel;
        bottomY--;
      }
    });

    // Fill remaining spaces with new jewels from bottom up
    while (bottomY >= 0) {
      const newJewel = {
        id: `jewel-${x}-${bottomY}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: getRandomJewelType(),
        position: { x, y: bottomY },
        isMoving: true,
        isNew: true,
      } as Jewel;
      newBoard[bottomY][x] = newJewel;
      hasChanges = true;
      bottomY--;
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
