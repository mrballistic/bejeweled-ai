import { JewelType, BOARD_SIZE, JEWEL_TYPES } from '../types/game';

export const getRandomJewelType = (avoidTypes: string[] = []): string => {
  const availableTypes = JEWEL_TYPES.filter(type => !avoidTypes.includes(type));
  return availableTypes[Math.floor(Math.random() * availableTypes.length)];
};

export const createInitialBoard = (): JewelType[][] => {
  const newBoard: JewelType[][] = Array(BOARD_SIZE).fill(null).map((_, y) =>
    Array(BOARD_SIZE).fill(null).map((_, x) => ({
      id: `jewel-${x}-${y}`,
      type: '',
      position: { x, y },
    }))
  );

  // Fill board avoiding matches
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const avoidTypes: string[] = [];

      // Check horizontal matches
      if (x >= 2) {
        if (newBoard[y][x-1].type === newBoard[y][x-2].type) {
          avoidTypes.push(newBoard[y][x-1].type);
        }
      }

      // Check vertical matches
      if (y >= 2) {
        if (newBoard[y-1][x].type === newBoard[y-2][x].type) {
          avoidTypes.push(newBoard[y-1][x].type);
        }
      }

      newBoard[y][x].type = getRandomJewelType(avoidTypes);
    }
  }

  return newBoard;
};
