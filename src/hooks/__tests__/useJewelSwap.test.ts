import { describe, it, expect } from 'vitest';
import { isAdjacent } from '../useJewelSwap';

describe('isAdjacent', () => {
  it('returns true for horizontally adjacent positions', () => {
    expect(isAdjacent({ row: 0, col: 0 }, { row: 0, col: 1 })).toBe(true);
    expect(isAdjacent({ row: 3, col: 5 }, { row: 3, col: 4 })).toBe(true);
  });

  it('returns true for vertically adjacent positions', () => {
    expect(isAdjacent({ row: 0, col: 0 }, { row: 1, col: 0 })).toBe(true);
    expect(isAdjacent({ row: 5, col: 3 }, { row: 4, col: 3 })).toBe(true);
  });

  it('returns false for diagonal positions', () => {
    expect(isAdjacent({ row: 0, col: 0 }, { row: 1, col: 1 })).toBe(false);
    expect(isAdjacent({ row: 2, col: 3 }, { row: 3, col: 4 })).toBe(false);
  });

  it('returns false for same position', () => {
    expect(isAdjacent({ row: 2, col: 2 }, { row: 2, col: 2 })).toBe(false);
  });

  it('returns false for positions 2+ apart', () => {
    expect(isAdjacent({ row: 0, col: 0 }, { row: 0, col: 2 })).toBe(false);
    expect(isAdjacent({ row: 0, col: 0 }, { row: 2, col: 0 })).toBe(false);
  });
});
