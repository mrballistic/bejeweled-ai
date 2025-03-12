import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import type { ForwardedRef } from 'react';
import { NullableJewelType, BOARD_SIZE, Position } from '../types/game';
import { createInitialBoard } from '../utils/boardInitializer';
import { useGameLogic } from '../hooks/useGameLogic';
import { useViewportCalculator } from '../utils/sizeCalculator';
import useJewelSwap from '../hooks/useJewelSwap';
import { useScore } from '../context/ScoreContext';
import { findHint } from '../utils/hintFinder';
import BoardGrid from './BoardGrid';

interface GameBoardProps {
  hint: Position | null;
  setHint: (hint: Position | null) => void;
}

const GameBoard = forwardRef<NullableJewelType[][], GameBoardProps>((
  { hint }: GameBoardProps,
  ref: ForwardedRef<NullableJewelType[][]>
) => {
  const [board, setBoard] = useState<NullableJewelType[][]>([]);
  const [jewelSize, setJewelSize] = useState(0);
  const isInitialized = useRef(false);
  const { resetCombo, resetChainLevel } = useScore();
  const { handleResize } = useViewportCalculator();
  const { handleSwap, handleMatches } = useGameLogic({ board, setBoard });

  useImperativeHandle(ref, () => board, [board]);

  // Handle window resize
  useEffect(() => {
    return handleResize(setJewelSize);
  }, [handleResize]);

  // Initialize board
  useEffect(() => {
    if (isInitialized.current) {
      console.log('Board already initialized. Skipping reinitialization.');
      return;
    }
    const newBoard = createInitialBoard();
    setBoard(newBoard);
    resetCombo();
    resetChainLevel();
    isInitialized.current = true;
    console.log('Board initialized:', JSON.stringify(newBoard), 'Setting initial board state...');
  }, [resetCombo, resetChainLevel]);

  const { handleJewelSelect, handleDragSwap, selectedJewel } = useJewelSwap(handleSwap);

  return (
    <BoardGrid
      board={board}
      jewelSize={jewelSize}
      boardSize={BOARD_SIZE}
      selectedJewel={selectedJewel}
      hint={hint}
      onJewelSelect={handleJewelSelect}
      onDragSwap={handleDragSwap}
    />
  );
});

export default GameBoard;
