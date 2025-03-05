import React, { useState, useEffect } from 'react';
import Jewel from './Jewel.tsx';
import useJewelSwap from '../hooks/useJewelSwap';
import { findMatches } from '../utils/matchDetection';
import { handleCascade } from '../utils/cascadeHandler';
import { animateSwap, animateMatch, animateCascade } from '../utils/animations';
import { useTheme } from '../context/ThemeProvider';
import { useScore, POINTS } from '../context/ScoreContext';

interface Position {
  x: number;
  y: number;
}

interface JewelType {
  id: string;
  type: string;
  position: Position;
}

type NullableJewelType = JewelType | null;

const BOARD_SIZE = 8;
const JEWEL_TYPES = ['💎', '⭐', '🔵', '🔴', '🟣', '🟡', '🟢', '🟠'];

const getRandomJewelType = (avoidTypes: string[] = []): string => {
  const availableTypes = JEWEL_TYPES.filter(type => !avoidTypes.includes(type));
  return availableTypes[Math.floor(Math.random() * availableTypes.length)];
};

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<NullableJewelType[][]>([]);
  const { theme } = useTheme();
  const { addPoints, incrementCombo, resetCombo } = useScore();

  const createInitialBoard = (): JewelType[][] => {
    const newBoard: JewelType[][] = Array(BOARD_SIZE).fill(null).map((_, y) =>
      Array(BOARD_SIZE).fill(null).map((_, x) => ({
        id: `jewel-${x}-${y}`,
        type: '',
        position: { x, y },
      }))
    );

    // Fill board avoiding matches
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const avoidTypes: string[] = [];

        // Check horizontal matches
        if (x >= 2) {
          if (newBoard[y][x-1].type === newBoard[y][x-2].type) {
            avoidTypes.push(newBoard[y][x-1].type);
          }
        }

        // Check vertical matches
        if (y >= 2) {
          if (newBoard[y-1][x].type === newBoard[y-2][x].type) {
            avoidTypes.push(newBoard[y-1][x].type);
          }
        }

        newBoard[y][x].type = getRandomJewelType(avoidTypes);
      }
    }

    return newBoard;
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = createInitialBoard();
    setBoard(newBoard);
    resetCombo();
  };

  const updateJewelId = (jewel: JewelType, newPosition: Position): JewelType => {
    return {
      ...jewel,
      id: `jewel-${newPosition.x}-${newPosition.y}`,
      position: newPosition,
    };
  };

  const calculateMatchPoints = (matchLength: number): number => {
    switch (matchLength) {
      case 3:
        return POINTS.MATCH_3;
      case 4:
        return POINTS.MATCH_4;
      case 5:
        return POINTS.MATCH_5;
      default:
        return POINTS.MATCH_3;
    }
  };

  const swapJewels = async (from: Position, to: Position) => {
    const newBoard = [...board];
    const fromJewel = newBoard[from.y][from.x];
    const toJewel = newBoard[to.y][to.x];

    if (!fromJewel || !toJewel) return;

    // Update jewel IDs and positions
    newBoard[from.y][from.x] = updateJewelId(toJewel, from);
    newBoard[to.y][to.x] = updateJewelId(fromJewel, to);

    const fromElement = document.getElementById(`jewel-${from.x}-${from.y}`);
    const toElement = document.getElementById(`jewel-${to.x}-${to.y}`);

    if (fromElement && toElement) {
      await animateSwap(fromElement, toElement);
    }

    setBoard(newBoard);

    // Check for matches after swapping
    const matches = findMatches(newBoard as (JewelType | null)[][]);
    if (matches.length > 0) {
      await processMatches(newBoard as (JewelType | null)[][], matches);
    } else {
      // If no matches, reset combo
      resetCombo();
    }
  };

  const processMatches = async (currentBoard: (JewelType | null)[][], matches: any) => {
    // Calculate points for matches
    matches.forEach((match: any) => {
      const matchLength = match.jewels.length;
      const points = calculateMatchPoints(matchLength);
      addPoints(points);
    });
    incrementCombo();

    // Animate matched jewels
    const matchedElements = matches.flatMap((match: any) =>
      match.jewels.map((jewel: JewelType) =>
        document.getElementById(jewel.id)
      )
    );

    await animateMatch(
      matchedElements.filter((el: Element | null): el is HTMLElement => el !== null)
    );

    // Remove matched jewels
    matches.forEach((match: any) => {
      match.jewels.forEach((jewel: JewelType) => {
        const { x, y } = jewel.position;
        currentBoard[y][x] = null;
      });
    });

    // Handle cascades
    const cascadedBoard = handleCascade(currentBoard);

    // Update IDs for cascaded jewels
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (cascadedBoard[y][x]) {
          cascadedBoard[y][x] = updateJewelId(cascadedBoard[y][x]!, { x, y });
        }
      }
    }

    // Animate cascades
    const cascadeElements = cascadedBoard.flatMap((row, y) =>
      row.map((jewel, x) => {
        if (jewel && !board[y][x]) {
          return document.getElementById(jewel.id);
        }
        return null;
      })
    );

    await animateCascade(
      cascadeElements.filter((el: Element | null): el is HTMLElement => el !== null)
    );

    setBoard(cascadedBoard);

    // Check for new matches after cascade
    const newMatches = findMatches(cascadedBoard);
    if (newMatches.length > 0) {
      await processMatches(cascadedBoard, newMatches);
    } else {
      // Reset combo if no more matches
      resetCombo();
    }
  };

  const { handleJewelSelect } = useJewelSwap(swapJewels);

  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 50px)`,
        gap: '2px',
        padding: '10px',
        backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
        borderRadius: '8px',
      }}
    >
      {board.flat().map((jewel, index) =>
        jewel ? (
          <Jewel
            key={jewel.id}
            type={jewel.type}
            position={jewel.position}
            onSelect={handleJewelSelect}
          />
        ) : (
          <div
            key={`empty-${index}`}
            style={{
              width: 50,
              height: 50,
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

export default GameBoard;
