import React from 'react';

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
  return (
    <div
      style={{
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        fontSize: '2rem',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(position)}
    >
      {type}
    </div>
  );
};

export default Jewel;
