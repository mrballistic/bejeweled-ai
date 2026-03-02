import { describe, it, expect } from 'vitest';
import { createBoard, createRandomJewel } from '../boardInitializer';
import { BOARD_SIZE, JEWEL_TYPES } from '../../types/game';

describe('createRandomJewel', () => {
  it('returns a jewel with a valid type and unique id', () => {
    const jewel = createRandomJewel();
    expect(JEWEL_TYPES).toContain(jewel.type);
    expect(jewel.id).toBeTruthy();
  });

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => createRandomJewel().id));
    expect(ids.size).toBe(100);
  });
});

describe('createBoard', () => {
  it('returns an 8x8 grid', () => {
    const board = createBoard();
    expect(board).toHaveLength(BOARD_SIZE);
    board.forEach(row => {
      expect(row).toHaveLength(BOARD_SIZE);
    });
  });

  it('every cell is a non-null jewel', () => {
    const board = createBoard();
    board.forEach(row => {
      row.forEach(cell => {
        expect(cell).not.toBeNull();
        expect(JEWEL_TYPES).toContain(cell!.type);
      });
    });
  });

  it('has no horizontal 3-in-a-row', () => {
    const board = createBoard();
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col <= BOARD_SIZE - 3; col++) {
        const a = board[row][col]!.type;
        const b = board[row][col + 1]!.type;
        const c = board[row][col + 2]!.type;
        expect(a === b && b === c).toBe(false);
      }
    }
  });

  it('has no vertical 3-in-a-row', () => {
    const board = createBoard();
    for (let col = 0; col < BOARD_SIZE; col++) {
      for (let row = 0; row <= BOARD_SIZE - 3; row++) {
        const a = board[row][col]!.type;
        const b = board[row + 1][col]!.type;
        const c = board[row + 2][col]!.type;
        expect(a === b && b === c).toBe(false);
      }
    }
  });

  it('all jewels have unique ids', () => {
    const board = createBoard();
    const ids = new Set<string>();
    board.forEach(row => {
      row.forEach(cell => {
        ids.add(cell!.id);
      });
    });
    expect(ids.size).toBe(BOARD_SIZE * BOARD_SIZE);
  });
});
