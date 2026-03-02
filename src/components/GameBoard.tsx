import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Board, Position } from '../types/game';
import { createBoard } from '../utils/boardInitializer';
import BoardGrid from './BoardGrid';
import { Box } from '@mui/material';

export interface GameBoardHandle {
  boardRef: React.MutableRefObject<Board>;
  isProcessing: React.MutableRefObject<boolean>;
  handleSwap: (pos1: Position, pos2: Position) => void;
  resetBoard: () => void;
}

interface GameBoardProps {
  jewelSize: number;
}

const GameBoard = forwardRef<GameBoardHandle, GameBoardProps>(({ jewelSize }, ref) => {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const boardRef = useRef<Board>(board);
  const isProcessing = useRef(false);
  const isInitialized = useRef(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
  }, []);

  const handleSwap = useCallback((_pos1: Position, _pos2: Position) => {
    // Will be implemented in Task 12 (useGameLogic)
  }, []);

  const resetBoard = useCallback(() => {
    const newBoard = createBoard();
    setBoard(newBoard);
    boardRef.current = newBoard;
    setSelectedPosition(null);
  }, []);

  useImperativeHandle(ref, () => ({
    boardRef,
    isProcessing,
    handleSwap,
    resetBoard,
  }));

  const handleJewelSelect = useCallback((pos: Position) => {
    if (isProcessing.current) return;
    setSelectedPosition(prev => {
      if (!prev) return pos;
      if (prev.row === pos.row && prev.col === pos.col) return null;
      // Check adjacency
      const dr = Math.abs(prev.row - pos.row);
      const dc = Math.abs(prev.col - pos.col);
      if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
        handleSwap(prev, pos);
        return null;
      }
      return pos;
    });
  }, [handleSwap]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <BoardGrid
        board={board}
        jewelSize={jewelSize}
        selectedPosition={selectedPosition}
        hintPositions={[]}
        onJewelSelect={handleJewelSelect}
      />
    </Box>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;
