import { describe, it, expect } from 'vitest';
import { calculatePoints } from '../ScoreContext';
import { Match } from '../../types/game';

function makeMatch(size: number, type = 'ruby' as const): Match {
  return {
    type,
    positions: Array.from({ length: size }, (_, i) => ({ row: 0, col: i })),
  };
}

describe('calculatePoints', () => {
  it('scores 100 for a single 3-match at chain 0', () => {
    expect(calculatePoints([makeMatch(3)], 0)).toBe(100);
  });

  it('scores 200 for a single 4-match at chain 0', () => {
    expect(calculatePoints([makeMatch(4)], 0)).toBe(200);
  });

  it('scores 500 for a single 5-match at chain 0', () => {
    expect(calculatePoints([makeMatch(5)], 0)).toBe(500);
  });

  it('applies chain multiplier', () => {
    // Chain level 1 = 2x
    expect(calculatePoints([makeMatch(3)], 1)).toBe(200);
    // Chain level 2 = 4x
    expect(calculatePoints([makeMatch(3)], 2)).toBe(400);
    // Chain level 5+ = 32x (cap)
    expect(calculatePoints([makeMatch(3)], 5)).toBe(3200);
    expect(calculatePoints([makeMatch(3)], 6)).toBe(3200);
  });

  it('applies combo multiplier for multiple simultaneous matches', () => {
    // 2 matches = 1.5x combo
    const points = calculatePoints([makeMatch(3), makeMatch(3)], 0);
    expect(points).toBe(Math.round(200 * 1.5)); // 300

    // 3 matches = 2x combo
    const points3 = calculatePoints([makeMatch(3), makeMatch(3), makeMatch(3)], 0);
    expect(points3).toBe(Math.round(300 * 2)); // 600
  });

  it('combines chain and combo multipliers', () => {
    // 2 matches at chain 1: base=200, chain=2x, combo=1.5x
    const points = calculatePoints([makeMatch(3), makeMatch(3)], 1);
    expect(points).toBe(Math.round(200 * 2 * 1.5)); // 600
  });
});
