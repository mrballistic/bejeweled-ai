import React from 'react';
import { Position, NullableJewelType } from '../types/game';
import Jewel from './Jewel';
import { useTheme } from '../context/ThemeProvider';

interface BoardGridProps {
  board: NullableJewelType[][];
  jewelSize: number;
  boardSize: number;
  selectedJewel: Position | null;
  hint: Position | null;
  onJewelSelect: (position: Position) => void;
  onDragSwap: (from: Position, to: Position) => void;
}

const BoardGrid: React.FC<BoardGridProps> = ({
  board,
  jewelSize,
  boardSize,
  selectedJewel,
  hint,
  onJewelSelect,
  onDragSwap,
}) => {
  const { theme } = useTheme();

  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${boardSize}, ${jewelSize}px)`,
        gap: '2px',
        padding: '10px',
        backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
        borderRadius: '8px',
        touchAction: 'none', // Prevent scrolling while dragging on touch devices
        WebkitTouchCallout: 'none', // Disable callout on long press
        WebkitUserSelect: 'none', // Disable text selection
        userSelect: 'none',
      }}
    >
      {board.flat().map((jewel: NullableJewelType, index: number) =>
        jewel ? (
          <Jewel
            key={jewel.id}
            type={jewel.type}
            position={jewel.position}
            onSelect={onJewelSelect}
            onDragSwap={onDragSwap}
            isHint={hint?.x === jewel.position.x && hint?.y === jewel.position.y}
            isSelected={selectedJewel?.x === jewel.position.x && selectedJewel?.y === jewel.position.y}
            size={jewelSize}
          />
        ) : (
          <div
            key={`empty-${index}`}
            style={{
              width: jewelSize,
              height: jewelSize,
              border: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
              backgroundColor: theme === 'dark' ? '#222' : '#fff',
              borderRadius: '4px',
            }}
          />
        )
      )}
    </div>
  );
};

export default BoardGrid;
