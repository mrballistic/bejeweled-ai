import { useCallback, useRef, useState } from 'react';
import { Board, Position, Match } from '../types/game';
import { createBoard } from '../utils/boardInitializer';
import { findMatches } from '../utils/matchDetection';
import { cloneBoard, removeMatches, handleCascade } from '../utils/cascadeHandler';
import { useScore } from '../context/ScoreContext';

export function useGameLogic() {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const boardRef = useRef<Board>(board);
  const isProcessing = useRef(false);
  const { addPoints } = useScore();

  const updateBoard = useCallback((newBoard: Board) => {
    boardRef.current = newBoard;
    setBoard(newBoard);
  }, []);

  const processMatchesAndCascade = useCallback((currentBoard: Board, chainLevel: number): Board => {
    const matches: Match[] = findMatches(currentBoard);
    if (matches.length === 0) return currentBoard;

    addPoints(matches, chainLevel);

    // Remove matched cells
    const allPositions = matches.flatMap(m => m.positions);
    let newBoard = removeMatches(currentBoard, allPositions);

    // Cascade: gravity + new jewels
    const cascadeResult = handleCascade(newBoard);
    newBoard = cascadeResult.board;

    updateBoard(newBoard);

    // Recurse for chain reactions
    return processMatchesAndCascade(newBoard, chainLevel + 1);
  }, [addPoints, updateBoard]);

  const handleSwap = useCallback((pos1: Position, pos2: Position) => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    // Clone and swap
    const newBoard = cloneBoard(boardRef.current);
    const temp = newBoard[pos1.row][pos1.col];
    newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
    newBoard[pos2.row][pos2.col] = temp;

    // Check for matches
    const matches = findMatches(newBoard);
    if (matches.length === 0) {
      // Invalid swap — no match created
      isProcessing.current = false;
      return;
    }

    // Commit the swap
    updateBoard(newBoard);

    // Process matches and cascades
    processMatchesAndCascade(newBoard, 0);

    isProcessing.current = false;
  }, [processMatchesAndCascade, updateBoard]);

  const resetBoard = useCallback(() => {
    const newBoard = createBoard();
    updateBoard(newBoard);
  }, [updateBoard]);

  return {
    board,
    boardRef,
    isProcessing,
    handleSwap,
    resetBoard,
  };
}
