import { Board, Position, BOARD_SIZE } from '../types/game';
import Jewel from './Jewel';
import { Box } from '@mui/material';

interface BoardGridProps {
  board: Board;
  jewelSize: number;
  selectedPosition: Position | null;
  hintPositions: Position[];
  onJewelSelect: (pos: Position) => void;
  onSwap?: (pos1: Position, pos2: Position) => void;
  isProcessing?: React.MutableRefObject<boolean>;
}

const BoardGrid: React.FC<BoardGridProps> = ({
  board,
  jewelSize,
  selectedPosition,
  hintPositions,
  onJewelSelect,
  onSwap,
  isProcessing,
}) => {
  const isSelected = (row: number, col: number) =>
    selectedPosition?.row === row && selectedPosition?.col === col;

  const isHinted = (row: number, col: number) =>
    hintPositions.some(p => p.row === row && p.col === col);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${BOARD_SIZE}, ${jewelSize}px)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, ${jewelSize}px)`,
        gap: '1px',
        backgroundColor: '#16213E',
        border: '2px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        padding: '4px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((cell, colIdx) =>
          cell ? (
            <Jewel
              key={cell.id}
              jewel={cell}
              row={rowIdx}
              col={colIdx}
              size={jewelSize}
              isSelected={isSelected(rowIdx, colIdx)}
              isHinted={isHinted(rowIdx, colIdx)}
              onSelect={onJewelSelect}
              onSwap={onSwap}
              isProcessing={isProcessing}
            />
          ) : (
            <Box
              key={`empty-${rowIdx}-${colIdx}`}
              sx={{ width: jewelSize, height: jewelSize }}
            />
          )
        )
      )}
    </Box>
  );
};

export default BoardGrid;
