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
  const newBoard = [...board];

  // Drop existing jewels
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = BOARD_SIZE - 1; y > 0; y--) {
      if (!newBoard[y][x] && newBoard[y - 1][x]) {
        newBoard[y][x] = { ...newBoard[y - 1][x]!, position: { x, y } };
        newBoard[y - 1][x] = null;
      }
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
