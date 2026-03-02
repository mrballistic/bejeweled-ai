import { Board, CascadeMove, JewelType, BOARD_SIZE } from '../types/game';
import { createRandomJewel } from './boardInitializer';

export function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => (cell ? { ...cell } : null)));
}

export function removeMatches(board: Board, positions: { row: number; col: number }[]): Board {
  const newBoard = cloneBoard(board);
  for (const { row, col } of positions) {
    newBoard[row][col] = null;
  }
  return newBoard;
}

export function handleCascade(board: Board): { board: Board; moves: CascadeMove[] } {
  const newBoard = cloneBoard(board);
  const moves: CascadeMove[] = [];

  for (let col = 0; col < BOARD_SIZE; col++) {
    // Collect non-null jewels from bottom to top
    const jewels: JewelType[] = [];
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      if (newBoard[row][col]) {
        jewels.push(newBoard[row][col]!);
      }
    }

    // Clear the column
    for (let row = 0; row < BOARD_SIZE; row++) {
      newBoard[row][col] = null;
    }

    // Place existing jewels at the bottom
    let targetRow = BOARD_SIZE - 1;
    for (const jewel of jewels) {
      const fromRow = findJewelRow(board, col, jewel.id);
      if (fromRow !== targetRow) {
        moves.push({ jewelId: jewel.id, fromRow, toRow: targetRow, col, isNew: false });
      }
      newBoard[targetRow][col] = { ...jewel, isMoving: fromRow !== targetRow };
      targetRow--;
    }

    // Fill remaining top slots with new jewels
    while (targetRow >= 0) {
      const newJewel = createRandomJewel();
      newBoard[targetRow][col] = { ...newJewel, isNew: true, isMoving: true };
      const emptySlots = targetRow + 1;
      moves.push({
        jewelId: newJewel.id,
        fromRow: targetRow - emptySlots,
        toRow: targetRow,
        col,
        isNew: true,
      });
      targetRow--;
    }
  }

  return { board: newBoard, moves };
}

function findJewelRow(board: Board, col: number, id: string): number {
  for (let row = 0; row < BOARD_SIZE; row++) {
    if (board[row][col]?.id === id) return row;
  }
  return -1;
}
