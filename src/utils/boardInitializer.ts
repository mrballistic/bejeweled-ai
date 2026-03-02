import { v4 as uuidv4 } from 'uuid';
import { Board, JewelType, JewelKind, BOARD_SIZE, JEWEL_TYPES } from '../types/game';

export function createRandomJewel(): JewelType {
  const type = JEWEL_TYPES[Math.floor(Math.random() * JEWEL_TYPES.length)];
  return { id: uuidv4(), type };
}

export function createBoard(): Board {
  const board: Board = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const excluded = new Set<JewelKind>();

      if (col >= 2) {
        const a = board[row][col - 1]?.type;
        const b = board[row][col - 2]?.type;
        if (a && a === b) excluded.add(a);
      }

      if (row >= 2) {
        const a = board[row - 1][col]?.type;
        const b = board[row - 2][col]?.type;
        if (a && a === b) excluded.add(a);
      }

      const available = JEWEL_TYPES.filter(t => !excluded.has(t));
      const type = available[Math.floor(Math.random() * available.length)];
      board[row][col] = { id: uuidv4(), type };
    }
  }

  return board;
}
