import { describe, it, expect } from 'vitest';
import { findHint } from '../hintFinder';
import { Board, BOARD_SIZE, JewelKind } from '../../types/game';

function emptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
}

describe('findHint', () => {
  it('finds a valid horizontal move', () => {
    const board = emptyBoard();
    // Set up: two rubies in a row, third nearby that can be swapped in
    // Row 0: [ruby, ruby, emerald, ruby, ...]
    // Swapping col 2 and col 3 creates 3 rubies
    let id = 0;
    board[0][0] = { id: `h-${id++}`, type: 'ruby' as JewelKind };
    board[0][1] = { id: `h-${id++}`, type: 'ruby' as JewelKind };
    board[0][2] = { id: `h-${id++}`, type: 'emerald' as JewelKind };
    board[0][3] = { id: `h-${id++}`, type: 'ruby' as JewelKind };

    // Fill remaining cells to avoid null issues in scanning
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (!board[r][c]) {
          board[r][c] = { id: `fill-${id++}`, type: 'diamond' as JewelKind };
        }
      }
    }

    const hint = findHint(board);
    expect(hint).not.toBeNull();
  });

  it('returns null for a deadlocked board', () => {
    // Create a board with no possible matches via swaps
    // Checkerboard-like pattern with 4 types ensures no swap creates 3-in-a-row
    const types: JewelKind[] = ['ruby', 'emerald', 'diamond', 'sapphire'];
    let id = 0;
    const board: Board = Array.from({ length: BOARD_SIZE }, (_, row) =>
      Array.from({ length: BOARD_SIZE }, (_, col) => ({
        id: `dead-${id++}`,
        type: types[(row * 2 + col) % 4],
      }))
    );

    const hint = findHint(board);
    expect(hint).toBeNull();
  });
});
