import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTheme } from '../context/ThemeProvider';

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
}

const Jewel: React.FC<JewelProps> = ({ type, position, onSelect }) => {
  const { theme } = useTheme();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.JEWEL,
    item: { position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.JEWEL,
    drop: (item: { position: Position }) => {
      onSelect(item.position);
    },
    canDrop: (item: { position: Position }) => {
      const dx = Math.abs(item.position.x - position.x);
      const dy = Math.abs(item.position.y - position.y);
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver() && monitor.canDrop(),
    }),
  }), [position, onSelect]);

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
        backgroundColor: isOver 
          ? (theme === 'dark' ? '#444' : '#e3f2fd')
          : (theme === 'dark' ? '#222' : '#fff'),
        transform: isOver ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s, background-color 0.2s',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onClick={() => onSelect(position)}
    >
      {type}
    </div>
  );
};

export default Jewel;
