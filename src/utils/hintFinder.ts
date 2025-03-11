import { Position, NullableJewelType } from '../types/game';
import { findMatches } from './matchDetection';

export const findHint = (board: NullableJewelType[][]): Position | null => {
  console.log('Finding hints...', JSON.stringify(board));
  const allHints: Position[] = [];
  const BOARD_SIZE = board.length;

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const current = board[y][x];
      if (!current) {
        console.log(`Skipping empty cell at (${x}, ${y})`);
        continue;
      }

      // Check adjacent positions
      const adjacentPositions: Position[] = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
      ];

      for (const pos of adjacentPositions) {
        if (pos.x < 0 || pos.x >= BOARD_SIZE || pos.y < 0 || pos.y >= BOARD_SIZE) continue;

        const testBoard = board.map(row => row.map(jewel => (jewel ? { ...jewel } : null)));
        const target = testBoard[pos.y][pos.x];
        if (!target) {
          console.log(`Skipping invalid target at (${pos.x}, ${pos.y})`);
          continue;
        }

        // Simulate swap
        console.log(`Simulating swap between (${x}, ${y}) and (${pos.x}, ${pos.y})`);
        testBoard[y][x] = { ...target, position: { x, y } };
        testBoard[pos.y][pos.x] = { ...current, position: pos };

        // Check for matches
        console.log('Calling findMatches with testBoard:', JSON.stringify(testBoard));
        const matches = findMatches(testBoard);
        if (matches.length > 0) {
          console.log('Valid hint found:', { x, y }, '->', pos);
          allHints.push({ x, y });
        }
      }
    }
  }

  console.log('All hints found:', allHints, 'Board state:', JSON.stringify(board));
  return allHints.length > 0 ? allHints[0] : null;
};
