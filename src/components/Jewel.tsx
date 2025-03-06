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
  isSelected?: boolean;
  size?: number;
}

const Jewel: React.FC<JewelProps> = ({ 
  type, 
  position, 
  onSelect, 
  onDragSwap, 
  isHint, 
  isSelected,
  size = 50 // Default size if not provided
}) => {
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

  // Calculate font size based on jewel size
  const fontSize = Math.max(Math.floor(size * 0.6), 20); // Min font size of 20px

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      data-position={`${position.x}-${position.y}`}
      style={{
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isSelected 
          ? `${Math.max(2, size * 0.04)}px solid ${theme === 'dark' ? '#64b5f6' : '#2196f3'}`
          : `${Math.max(1, size * 0.02)}px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
        borderRadius: Math.max(4, size * 0.08),
        fontSize: `${fontSize}px`,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isHint
          ? (theme === 'dark' ? '#ffeb3b' : '#fff59d') // Highlight color for hints
          : isOver 
            ? (theme === 'dark' ? '#444' : '#e3f2fd')
            : (theme === 'dark' ? '#222' : '#fff'),
        transform: isSelected || isOver ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s, background-color 0.2s, border 0.2s',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        boxShadow: isSelected 
          ? `0 0 ${Math.max(8, size * 0.16)}px ${theme === 'dark' ? '#64b5f6' : '#2196f3'}`
          : 'none',
        WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
      }}
      onClick={() => onSelect(position)}
    >
      {type}
    </div>
  );
};

export default Jewel;
