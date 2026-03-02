import { forwardRef, useImperativeHandle } from 'react';
import { Board, Position } from '../types/game';
import { useGameLogic } from '../hooks/useGameLogic';
import { useJewelSwap } from '../hooks/useJewelSwap';
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
  const { board, boardRef, isProcessing, handleSwap, resetBoard } = useGameLogic();
  const { selectedPosition, handleJewelSelect } = useJewelSwap({
    onSwap: handleSwap,
    isProcessing,
  });

  useImperativeHandle(ref, () => ({
    boardRef,
    isProcessing,
    handleSwap,
    resetBoard,
  }));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <BoardGrid
        board={board}
        jewelSize={jewelSize}
        selectedPosition={selectedPosition}
        hintPositions={[]}
        onJewelSelect={handleJewelSelect}
        onSwap={handleSwap}
        isProcessing={isProcessing}
      />
    </Box>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;
