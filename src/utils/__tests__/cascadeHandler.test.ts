import { describe, it, expect } from 'vitest';
import { handleCascade, cloneBoard, removeMatches } from '../cascadeHandler';
import { Board, BOARD_SIZE } from '../../types/game';

function makeFullBoard(): Board {
  let id = 0;
  const types = ['ruby', 'emerald', 'diamond', 'sapphire', 'topaz', 'amethyst', 'citrine'] as const;
  return Array.from({ length: BOARD_SIZE }, (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) => ({
      id: `c-${id++}`,
      type: types[(row * 3 + col) % types.length],
    }))
  );
}

describe('cloneBoard', () => {
  it('creates a deep copy', () => {
    const board = makeFullBoard();
    const clone = cloneBoard(board);
    expect(clone).toEqual(board);
    clone[0][0] = null;
    expect(board[0][0]).not.toBeNull();
  });
});

describe('removeMatches', () => {
  it('sets matched positions to null', () => {
    const board = makeFullBoard();
    const result = removeMatches(board, [{ row: 0, col: 0 }, { row: 0, col: 1 }]);
    expect(result[0][0]).toBeNull();
    expect(result[0][1]).toBeNull();
    expect(result[0][2]).not.toBeNull();
    // Original unchanged
    expect(board[0][0]).not.toBeNull();
  });
});

describe('handleCascade', () => {
  it('returns unchanged board when no nulls', () => {
    const board = makeFullBoard();
    const { board: newBoard, moves } = handleCascade(board);
    expect(moves).toHaveLength(0);
    // All cells still non-null
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        expect(newBoard[row][col]).not.toBeNull();
      }
    }
  });

  it('drops jewels down when nulls in middle', () => {
    const board = makeFullBoard();
    // Remove middle of column 0 (rows 3, 4)
    board[3][0] = null;
    board[4][0] = null;
    const { board: newBoard, moves } = handleCascade(board);

    // All cells should be filled
    for (let row = 0; row < BOARD_SIZE; row++) {
      expect(newBoard[row][0]).not.toBeNull();
    }

    // Should have moves: existing jewels falling + 2 new jewels
    const newMoves = moves.filter(m => m.isNew);
    const fallMoves = moves.filter(m => !m.isNew);
    expect(newMoves).toHaveLength(2);
    expect(fallMoves.length).toBeGreaterThan(0);

    // All fall moves should go downward (toRow > fromRow)
    for (const m of fallMoves) {
      expect(m.toRow).toBeGreaterThan(m.fromRow);
    }
  });

  it('fills entire empty column with new jewels', () => {
    const board = makeFullBoard();
    for (let row = 0; row < BOARD_SIZE; row++) {
      board[row][3] = null;
    }
    const { board: newBoard, moves } = handleCascade(board);

    // All cells in col 3 should be new
    for (let row = 0; row < BOARD_SIZE; row++) {
      expect(newBoard[row][3]).not.toBeNull();
      expect(newBoard[row][3]!.isNew).toBe(true);
    }

    const col3Moves = moves.filter(m => m.col === 3);
    expect(col3Moves).toHaveLength(BOARD_SIZE);
    expect(col3Moves.every(m => m.isNew)).toBe(true);
  });

  it('new jewels have isNew and isMoving flags', () => {
    const board = makeFullBoard();
    board[0][0] = null;
    const { board: newBoard, moves } = handleCascade(board);
    const newMoves = moves.filter(m => m.isNew && m.col === 0);
    expect(newMoves).toHaveLength(1);
    expect(newBoard[0][0]!.isNew).toBe(true);
    expect(newBoard[0][0]!.isMoving).toBe(true);
  });

  it('new jewels have fromRow above the board (negative)', () => {
    const board = makeFullBoard();
    board[6][2] = null;
    board[7][2] = null;
    const { moves } = handleCascade(board);
    const newMoves = moves.filter(m => m.isNew && m.col === 2);
    for (const m of newMoves) {
      expect(m.fromRow).toBeLessThan(0);
    }
  });
});
