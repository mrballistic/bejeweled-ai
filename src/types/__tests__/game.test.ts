import { describe, it, expect } from 'vitest';
import { BOARD_SIZE, JEWEL_TYPES } from '../game';

describe('game constants', () => {
  it('has 8x8 board size', () => {
    expect(BOARD_SIZE).toBe(8);
  });

  it('has 7 jewel types', () => {
    expect(JEWEL_TYPES).toHaveLength(7);
    expect(JEWEL_TYPES).toContain('diamond');
    expect(JEWEL_TYPES).toContain('ruby');
    expect(JEWEL_TYPES).toContain('emerald');
    expect(JEWEL_TYPES).toContain('sapphire');
    expect(JEWEL_TYPES).toContain('topaz');
    expect(JEWEL_TYPES).toContain('amethyst');
    expect(JEWEL_TYPES).toContain('citrine');
  });
});
