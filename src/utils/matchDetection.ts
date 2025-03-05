import { Position } from '../hooks/useJewelSwap';

interface Jewel {
  id: string;
  type: string;
  position: Position;
}

interface Match {
  type: 'horizontal' | 'vertical';
  jewels: Jewel[];
}

const BOARD_SIZE = 8;

export const findMatches = (board: (Jewel | null)[][]): Match[] => {
  const matches: Match[] = [];

  // Check horizontal matches
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE - 2; x++) {
      const jewel1 = board[y][x];
      const jewel2 = board[y][x + 1];
      const jewel3 = board[y][x + 2];

      if (
        jewel1 &&
        jewel2 &&
        jewel3 &&
        jewel1.type === jewel2.type &&
        jewel1.type === jewel3.type
      ) {
        const match: Match = {
          type: 'horizontal',
          jewels: [jewel1, jewel2, jewel3],
        };
        matches.push(match);
      }
    }
  }

  // Check vertical matches
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE - 2; y++) {
      const jewel1 = board[y][x];
      const jewel2 = board[y + 1][x];
      const jewel3 = board[y + 2][x];

      if (
        jewel1 &&
        jewel2 &&
        jewel3 &&
        jewel1.type === jewel2.type &&
        jewel1.type === jewel3.type
      ) {
        const match: Match = {
          type: 'vertical',
          jewels: [jewel1, jewel2, jewel3],
        };
        matches.push(match);
      }
    }
  }

  return matches;
};
