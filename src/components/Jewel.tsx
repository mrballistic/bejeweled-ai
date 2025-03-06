import React, { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTheme } from '../context/ThemeProvider';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const ItemTypes = {
  JEWEL: 'jewel',
};

interface Position {
  x: number;
  y: number;
}

interface JewelProps {
  type: string;
  position: Position;
  onSelect: (position: Position) => void;
  onDragSwap?: (from: Position, to: Position) => void;
  isHint?: boolean;
}

const Jewel: React.FC<JewelProps> = ({ type, position, onSelect, onDragSwap, isHint }) => {
  const { theme } = useTheme();

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.JEWEL,
    item: { fromPosition: position, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Remove default drag preview
  useEffect(() => {
    dragPreview(getEmptyImage());
  }, [dragPreview]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.JEWEL,
    drop: (item: { fromPosition: Position }) => {
      // When dropping, swap the dragged jewel with this one
      if (item.fromPosition && onDragSwap) {
        onDragSwap(item.fromPosition, position);
      }
    },
    canDrop: (item: { fromPosition: Position }) => {
      // Only allow drops on adjacent jewels
      const dx = Math.abs(item.fromPosition.x - position.x);
      const dy = Math.abs(item.fromPosition.y - position.y);
      // Prevent dropping on self
      if (item.fromPosition.x === position.x && item.fromPosition.y === position.y) {
        return false;
      }
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver() && monitor.canDrop(),
    }),
  }), [position, onDragSwap]);

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      id={`jewel-${position.x}-${position.y}`}
      style={{
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
        borderRadius: '4px',
        fontSize: '2rem',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isHint
          ? (theme === 'dark' ? '#ffeb3b' : '#fff59d') // Highlight color for hints
          : isOver 
            ? (theme === 'dark' ? '#444' : '#e3f2fd')
            : (theme === 'dark' ? '#222' : '#fff'),
        transform: isOver ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s, background-color 0.2s',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
      }}
      onClick={() => onSelect(position)}
    >
      {type}
    </div>
  );
};

export default Jewel;
