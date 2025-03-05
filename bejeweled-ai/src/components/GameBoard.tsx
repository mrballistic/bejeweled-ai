import React, { useState, useEffect } from 'react';
import Jewel from './Jewel';
import useJewelSwap from '../hooks/useJewelSwap';

interface Position {
  x: number;
  y: number;
}

interface JewelType {
  id: string;
  type: string;
  position: Position;
}

const BOARD_SIZE = 8;
const JEWEL_TYPES = ['💎', '⭐', '🔵', '🔴', '🟣', '🟡', '🟢', '🟠'];

const getRandomJewelType = () => {
  return JEWEL_TYPES[Math.floor(Math.random() * JEWEL_TYPES.length)];
};

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<JewelType[][]>([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map((_, y) =>
        Array(BOARD_SIZE)
          .fill(null)
          .map((_, x) => ({
            id: `jewel-${x}-${y}`,
            type: getRandomJewelType(),
            position: { x, y },
          }))
      );
    setBoard(newBoard);
  };

  const swapJewels = (from: Position, to: Position) => {
    const newBoard = [...board];
    const temp = newBoard[from.y][from.x];
    newBoard[from.y][from.x] = newBoard[to.y][to.x];
    newBoard[to.y][to.x] = temp;
    setBoard(newBoard);
  };

  const { handleJewelSelect } = useJewelSwap(swapJewels);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${BOARD_SIZE}, 50px)` }}>
      {board.flat().map((jewel) => (
        <Jewel
          key={jewel.id}
          type={jewel.type}
          position={jewel.position}
          onSelect={handleJewelSelect}
        />
      ))}
    </div>
  );
};

export default GameBoard;
