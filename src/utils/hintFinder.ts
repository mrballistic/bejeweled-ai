import { Board, Position, BOARD_SIZE } from '../types/game';
import { findMatches } from './matchDetection';
import { cloneBoard } from './cascadeHandler';

export function findHint(board: Board): { pos1: Position; pos2: Position } | null {
  // Try every adjacent swap, return first that produces a match
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col]) continue;

      // Try swap right
      if (col + 1 < BOARD_SIZE && board[row][col + 1]) {
        const testBoard = cloneBoard(board);
        const temp = testBoard[row][col];
        testBoard[row][col] = testBoard[row][col + 1];
        testBoard[row][col + 1] = temp;
        if (findMatches(testBoard).length > 0) {
          return { pos1: { row, col }, pos2: { row, col: col + 1 } };
        }
      }

      // Try swap down
      if (row + 1 < BOARD_SIZE && board[row + 1][col]) {
        const testBoard = cloneBoard(board);
        const temp = testBoard[row][col];
        testBoard[row][col] = testBoard[row + 1][col];
        testBoard[row + 1][col] = temp;
        if (findMatches(testBoard).length > 0) {
          return { pos1: { row, col }, pos2: { row: row + 1, col } };
        }
      }
    }
  }

  return null;
}
