import { Board, Match, JewelKind, Position, BOARD_SIZE } from '../types/game';

export function findMatches(board: Board): Match[] {
  const matchedPositions = new Map<string, JewelKind>();

  // Horizontal scan
  for (let row = 0; row < BOARD_SIZE; row++) {
    let col = 0;
    while (col < BOARD_SIZE) {
      const jewel = board[row][col];
      if (!jewel) {
        col++;
        continue;
      }

      let runLength = 1;
      while (col + runLength < BOARD_SIZE &&
             board[row][col + runLength]?.type === jewel.type) {
        runLength++;
      }

      if (runLength >= 3) {
        for (let i = 0; i < runLength; i++) {
          matchedPositions.set(`${row}-${col + i}`, jewel.type);
        }
      }

      col += runLength;
    }
  }

  // Vertical scan
  for (let col = 0; col < BOARD_SIZE; col++) {
    let row = 0;
    while (row < BOARD_SIZE) {
      const jewel = board[row][col];
      if (!jewel) {
        row++;
        continue;
      }

      let runLength = 1;
      while (row + runLength < BOARD_SIZE &&
             board[row + runLength][col]?.type === jewel.type) {
        runLength++;
      }

      if (runLength >= 3) {
        for (let i = 0; i < runLength; i++) {
          matchedPositions.set(`${row + i}-${col}`, jewel.type);
        }
      }

      row += runLength;
    }
  }

  if (matchedPositions.size === 0) return [];

  // Group matched positions into connected Match objects by type
  return groupIntoMatches(matchedPositions);
}

function groupIntoMatches(positions: Map<string, JewelKind>): Match[] {
  const visited = new Set<string>();
  const matches: Match[] = [];

  for (const [key, type] of positions) {
    if (visited.has(key)) continue;

    const group: Position[] = [];
    const queue = [key];

    while (queue.length > 0) {
      const current = queue.pop()!;
      if (visited.has(current)) continue;
      if (positions.get(current) !== type) continue;

      visited.add(current);
      const [row, col] = current.split('-').map(Number);
      group.push({ row, col });

      // Check 4 neighbors
      const neighbors = [
        `${row - 1}-${col}`,
        `${row + 1}-${col}`,
        `${row}-${col - 1}`,
        `${row}-${col + 1}`,
      ];
      for (const n of neighbors) {
        if (!visited.has(n) && positions.has(n) && positions.get(n) === type) {
          queue.push(n);
        }
      }
    }

    if (group.length >= 3) {
      matches.push({ positions: group, type });
    }
  }

  return matches;
}
