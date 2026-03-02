import { describe, it, expect } from 'vitest';
import { findMatches } from '../matchDetection';
import { Board, JewelKind, BOARD_SIZE } from '../../types/game';

function emptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
}

function fillBoard(): Board {
  // Fill with alternating types to avoid matches
  const types: JewelKind[] = ['ruby', 'emerald', 'diamond', 'sapphire', 'topaz', 'amethyst', 'citrine'];
  let id = 0;
  return Array.from({ length: BOARD_SIZE }, (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) => ({
      id: `test-${id++}`,
      type: types[(row * 3 + col) % types.length],
    }))
  );
}

describe('findMatches', () => {
  it('returns empty array for board with no matches', () => {
    const board = fillBoard();
    expect(findMatches(board)).toEqual([]);
  });

  it('returns empty array for all-null board', () => {
    const board = emptyBoard();
    expect(findMatches(board)).toEqual([]);
  });

  it('detects horizontal 3-match', () => {
    const board = fillBoard();
    // Place 3 rubies in a row at row 0, cols 0-2
    board[0][0] = { id: 'h0', type: 'ruby' };
    board[0][1] = { id: 'h1', type: 'ruby' };
    board[0][2] = { id: 'h2', type: 'ruby' };
    const matches = findMatches(board);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    const allPositions = matches.flatMap(m => m.positions);
    expect(allPositions).toContainEqual({ row: 0, col: 0 });
    expect(allPositions).toContainEqual({ row: 0, col: 1 });
    expect(allPositions).toContainEqual({ row: 0, col: 2 });
  });

  it('detects vertical 3-match', () => {
    const board = fillBoard();
    board[0][0] = { id: 'v0', type: 'topaz' };
    board[1][0] = { id: 'v1', type: 'topaz' };
    board[2][0] = { id: 'v2', type: 'topaz' };
    const matches = findMatches(board);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    const allPositions = matches.flatMap(m => m.positions);
    expect(allPositions).toContainEqual({ row: 0, col: 0 });
    expect(allPositions).toContainEqual({ row: 1, col: 0 });
    expect(allPositions).toContainEqual({ row: 2, col: 0 });
  });

  it('detects 4-in-a-row', () => {
    const board = emptyBoard();
    // Place exactly 4 emeralds in a row with no neighbors
    board[3][2] = { id: 'f0', type: 'emerald' };
    board[3][3] = { id: 'f1', type: 'emerald' };
    board[3][4] = { id: 'f2', type: 'emerald' };
    board[3][5] = { id: 'f3', type: 'emerald' };
    const matches = findMatches(board);
    expect(matches).toHaveLength(1);
    expect(matches[0].positions).toHaveLength(4);
  });

  it('detects 5-in-a-row', () => {
    const board = fillBoard();
    for (let i = 0; i < 5; i++) {
      board[2][i] = { id: `five-${i}`, type: 'amethyst' };
    }
    const matches = findMatches(board);
    const allPositions = matches.flatMap(m => m.positions);
    expect(allPositions.filter(p => p.row === 2).length).toBeGreaterThanOrEqual(5);
  });

  it('deduplicates T-shape positions', () => {
    const board = emptyBoard();
    // Horizontal: row 2, cols 1-3
    board[2][1] = { id: 't1', type: 'sapphire' };
    board[2][2] = { id: 't2', type: 'sapphire' };
    board[2][3] = { id: 't3', type: 'sapphire' };
    // Vertical: rows 0-2, col 2
    board[0][2] = { id: 't4', type: 'sapphire' };
    board[1][2] = { id: 't5', type: 'sapphire' };
    // board[2][2] already set above — shared intersection

    const matches = findMatches(board);
    // All 5 positions should be in a single match (connected same-type)
    expect(matches).toHaveLength(1);
    expect(matches[0].positions).toHaveLength(5);
    expect(matches[0].type).toBe('sapphire');
  });

  it('deduplicates L-shape positions', () => {
    const board = fillBoard();
    // Horizontal: row 4, cols 3-5
    board[4][3] = { id: 'l1', type: 'citrine' };
    board[4][4] = { id: 'l2', type: 'citrine' };
    board[4][5] = { id: 'l3', type: 'citrine' };
    // Vertical: rows 4-6, col 3
    board[5][3] = { id: 'l4', type: 'citrine' };
    board[6][3] = { id: 'l5', type: 'citrine' };
    // board[4][3] already set — shared corner

    const matches = findMatches(board);
    expect(matches).toHaveLength(1);
    expect(matches[0].positions).toHaveLength(5);
  });

  it('detects multiple independent matches', () => {
    const board = fillBoard();
    // Match 1: row 0
    board[0][0] = { id: 'a0', type: 'ruby' };
    board[0][1] = { id: 'a1', type: 'ruby' };
    board[0][2] = { id: 'a2', type: 'ruby' };
    // Match 2: row 5
    board[5][4] = { id: 'b0', type: 'emerald' };
    board[5][5] = { id: 'b1', type: 'emerald' };
    board[5][6] = { id: 'b2', type: 'emerald' };
    const matches = findMatches(board);
    expect(matches.length).toBe(2);
    const types = matches.map(m => m.type).sort();
    expect(types).toEqual(['emerald', 'ruby']);
  });

  it('skips null cells', () => {
    const board = emptyBoard();
    // Place just 2 rubies with a null between — no match
    board[0][0] = { id: 'n0', type: 'ruby' };
    board[0][1] = null;
    board[0][2] = { id: 'n1', type: 'ruby' };
    expect(findMatches(board)).toEqual([]);
  });
});
