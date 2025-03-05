import React from 'react';
import { useTheme } from '../context/ThemeProvider';

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

  return (
    <div
      id={`jewel-${position.x}-${position.y}`}
      style={{
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
        fontSize: '2rem',
        cursor: 'pointer',
        backgroundColor: theme === 'dark' ? '#222' : '#fff',
      }}
      onClick={() => onSelect(position)}
    >
      {type}
    </div>
  );
};

export default Jewel;
