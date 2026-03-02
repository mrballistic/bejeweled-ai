import { useCallback, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Board, Position, Match } from '../types/game';
import { createBoard } from '../utils/boardInitializer';
import { findMatches } from '../utils/matchDetection';
import { cloneBoard, removeMatches, handleCascade } from '../utils/cascadeHandler';
import { animateSwap, animateMatch, animateCascade, animateRevert } from '../utils/animations';
import { useScore } from '../context/ScoreContext';

export function useGameLogic() {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const boardRef = useRef<Board>(board);
  const isProcessing = useRef(false);
  const { addPoints } = useScore();

  const updateBoard = useCallback((newBoard: Board) => {
    boardRef.current = newBoard;
    flushSync(() => setBoard(newBoard));
  }, []);

  const processMatchesAndCascade = useCallback(async (currentBoard: Board, chainLevel: number): Promise<Board> => {
    const matches: Match[] = findMatches(currentBoard);
    if (matches.length === 0) return currentBoard;

    // Score this round
    addPoints(matches, chainLevel);

    // Animate removal
    await animateMatch(matches);

    // Remove matched cells
    const allPositions = matches.flatMap(m => m.positions);
    const boardAfterRemoval = removeMatches(currentBoard, allPositions);
    updateBoard(boardAfterRemoval);

    // Gravity + new jewels
    const cascadeResult = handleCascade(boardAfterRemoval);
    updateBoard(cascadeResult.board);

    // Animate drops
    await animateCascade(cascadeResult.moves);

    // Recurse for chain reactions
    return processMatchesAndCascade(cascadeResult.board, chainLevel + 1);
  }, [addPoints, updateBoard]);

  const handleSwap = useCallback(async (pos1: Position, pos2: Position) => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    try {
      // Clone and swap to test
      const testBoard = cloneBoard(boardRef.current);
      const temp = testBoard[pos1.row][pos1.col];
      testBoard[pos1.row][pos1.col] = testBoard[pos2.row][pos2.col];
      testBoard[pos2.row][pos2.col] = temp;

      const matches = findMatches(testBoard);

      if (matches.length === 0) {
        // Invalid swap — animate forward then back
        await animateSwap(pos1, pos2);
        await animateRevert(pos1, pos2);
        return;
      }

      // Valid swap — animate the swap
      await animateSwap(pos1, pos2);

      // Commit the swap to state
      const newBoard = cloneBoard(boardRef.current);
      const swapTemp = newBoard[pos1.row][pos1.col];
      newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
      newBoard[pos2.row][pos2.col] = swapTemp;
      updateBoard(newBoard);

      // Process matches and cascades
      await processMatchesAndCascade(newBoard, 0);
    } finally {
      isProcessing.current = false;
    }
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
