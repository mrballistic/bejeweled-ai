import { useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { Board, Position } from '../types/game';
import { useGameLogic } from '../hooks/useGameLogic';
import { useJewelSwap } from '../hooks/useJewelSwap';
import { findHint } from '../utils/hintFinder';
import BoardGrid from './BoardGrid';
import { Box } from '@mui/material';

export interface GameBoardHandle {
  boardRef: React.MutableRefObject<Board>;
  isProcessing: React.MutableRefObject<boolean>;
  handleSwap: (pos1: Position, pos2: Position) => void;
  resetBoard: () => void;
  showHint: () => void;
}

interface GameBoardProps {
  jewelSize: number;
}

const GameBoard = forwardRef<GameBoardHandle, GameBoardProps>(({ jewelSize }, ref) => {
  const { board, boardRef, isProcessing, handleSwap, resetBoard } = useGameLogic();
  const { selectedPosition, handleJewelSelect, clearSelection } = useJewelSwap({
    onSwap: handleSwap,
    isProcessing,
  });
  const [hintPositions, setHintPositions] = useState<Position[]>([]);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showHint = useCallback(() => {
    if (isProcessing.current) return;
    clearSelection();

    // Clear previous hint
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }

    const hint = findHint(boardRef.current);
    if (hint) {
      setHintPositions([hint.pos1, hint.pos2]);
      hintTimeoutRef.current = setTimeout(() => {
        setHintPositions([]);
        hintTimeoutRef.current = null;
      }, 3000);
    } else {
      // Deadlocked — reshuffle
      resetBoard();
    }
  }, [boardRef, isProcessing, clearSelection, resetBoard]);

  const handleReset = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }
    setHintPositions([]);
    clearSelection();
    resetBoard();
  }, [resetBoard, clearSelection]);

  useImperativeHandle(ref, () => ({
    boardRef,
    isProcessing,
    handleSwap,
    resetBoard: handleReset,
    showHint,
  }));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <BoardGrid
        board={board}
        jewelSize={jewelSize}
        selectedPosition={selectedPosition}
        hintPositions={hintPositions}
        onJewelSelect={handleJewelSelect}
        onSwap={handleSwap}
        isProcessing={isProcessing}
      />
    </Box>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;
