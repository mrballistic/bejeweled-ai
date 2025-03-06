import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import type { ForwardedRef } from 'react';
import Jewel from './Jewel.tsx';
import useJewelSwap from '../hooks/useJewelSwap';
import { findMatches } from '../utils/matchDetection';
import { handleCascade } from '../utils/cascadeHandler';
import { animateMatch, animateCascade, animateSwap } from '../utils/animations';
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

interface GameBoardProps {
  hint: Position | null;
  setHint: (hint: Position | null) => void;
}

const BOARD_SIZE = 8;
const JEWEL_TYPES = ['💎', '⭐', '🔵', '🔴', '🟣', '🟡', '🟢', '🟠'];

// Calculate jewel size based on viewport width
const calculateJewelSize = (): number => {
  const vw = Math.min(document.documentElement.clientWidth, 600); // Cap at 600px
  const padding = 20; // Total horizontal padding
  const gap = 2 * (BOARD_SIZE - 1); // Total gap space
  return Math.floor((vw - padding - gap) / BOARD_SIZE);
};

const getRandomJewelType = (avoidTypes: string[] = []): string => {
  const availableTypes = JEWEL_TYPES.filter(type => !avoidTypes.includes(type));
  return availableTypes[Math.floor(Math.random() * availableTypes.length)];
};

export const findHint = (board: NullableJewelType[][]): Position | null => {
  console.log('Finding hints...', JSON.stringify(board));
  const allHints: Position[] = [];

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const current = board[y][x];
      if (!current) {
        console.log(`Skipping empty cell at (${x}, ${y})`);
        continue;
      }

      // Check adjacent positions
      const adjacentPositions: Position[] = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
      ];

      for (const pos of adjacentPositions) {
        if (pos.x < 0 || pos.x >= BOARD_SIZE || pos.y < 0 || pos.y >= BOARD_SIZE) continue;

        const testBoard = board.map(row => row.map(jewel => (jewel ? { ...jewel } : null)));
        const target = testBoard[pos.y][pos.x];
        if (!target) {
          console.log(`Skipping invalid target at (${pos.x}, ${pos.y})`);
          continue;
        }

        // Simulate swap
        console.log(`Simulating swap between (${x}, ${y}) and (${pos.x}, ${pos.y})`);
        testBoard[y][x] = { ...target, position: { x, y } };
        testBoard[pos.y][pos.x] = { ...current, position: pos };

        // Check for matches
        console.log('Calling findMatches with testBoard:', JSON.stringify(testBoard));
        const matches = findMatches(testBoard);
        if (matches.length > 0) {
          console.log('Valid hint found:', { x, y }, '->', pos);
          allHints.push({ x, y });
        }
      }
    }
  }

  console.log('All hints found:', allHints, 'Board state:', JSON.stringify(board));
  return allHints.length > 0 ? allHints[0] : null;
};

const GameBoard = forwardRef<NullableJewelType[][], GameBoardProps>((
  { hint }: GameBoardProps,
  ref: ForwardedRef<NullableJewelType[][]>
) => {
  const [board, setBoard] = useState<NullableJewelType[][]>([]);
  const [jewelSize, setJewelSize] = useState(calculateJewelSize());
  const isInitialized = useRef(false);
  const { theme } = useTheme();
  const { addPoints, incrementCombo, resetCombo } = useScore();

  useImperativeHandle(ref, () => board, [board]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setJewelSize(calculateJewelSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (isInitialized.current) {
      console.log('Board already initialized. Skipping reinitialization.');
      return;
    }
    const newBoard = createInitialBoard();
    setBoard(newBoard);
    resetCombo();
    isInitialized.current = true;
    console.log('Board initialized:', JSON.stringify(newBoard), 'Setting initial board state...');
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

  const handleSwap = async (from: Position, to: Position) => {
    console.log('Attempting swap between:', from, 'and', to);

    const fromElement = document.querySelector(`[data-position="${from.x}-${from.y}"]`) as HTMLElement;
    const toElement = document.querySelector(`[data-position="${to.x}-${to.y}"]`) as HTMLElement;
    
    if (!fromElement || !toElement) {
      console.error('Could not find elements to animate');
      return;
    }

    const newBoard = board.map((row: NullableJewelType[]) => 
      row.map((jewel: NullableJewelType) => (jewel ? { ...jewel } : null))
    );

    const temp = newBoard[from.y][from.x];
    newBoard[from.y][from.x] = newBoard[to.y][to.x];
    newBoard[to.y][to.x] = temp;

    console.log('Board after swap:', JSON.stringify(newBoard));

    const matches = findMatches(newBoard);
    console.log('Matches found after swap:', matches);

    try {
      await animateSwap(fromElement, toElement);

      if (matches.length > 0) {
        console.log('Valid move. Updating board state.');
        setBoard(newBoard);
        handleMatches(matches, newBoard);
      } else {
        console.log('Invalid move. Reverting swap.');
        await animateSwap(fromElement, toElement);
        const temp = newBoard[from.y][from.x];
        newBoard[from.y][from.x] = newBoard[to.y][to.x];
        newBoard[to.y][to.x] = temp;
        setBoard(newBoard);
      }
    } catch (error) {
      console.error('Error during swap animation:', error);
      setBoard(newBoard);
    }
  };

  const processMatchesAndCascade = async (
    currentBoard: NullableJewelType[][],
    isFirstMatch: boolean = true
  ): Promise<void> => {
    console.log(`${isFirstMatch ? '=== Starting' : '=== Continuing'} match process ===`);
    
    const matches = findMatches(currentBoard);
    if (matches.length === 0) {
      console.log('No matches found, ending cascade process');
      if (!isFirstMatch) {
        resetCombo();
      }
      return;
    }

    console.log(`Found ${matches.length} matches:`, matches);

    matches.forEach(match => {
      const matchLength = match.jewels.length;
      const points = calculateMatchPoints(matchLength);
      console.log(`Adding ${points} points for match of ${matchLength}`);
      addPoints(points);
    });

    console.log('Incrementing combo');
    incrementCombo();

    const workingBoard = currentBoard.map((row: NullableJewelType[]) => 
      row.map((jewel: NullableJewelType) => jewel ? { ...jewel } : null)
    );
    
    const matchElements: HTMLElement[] = [];
    matches.forEach(match => {
      console.log('Processing match:', match);
      match.jewels.forEach(jewel => {
        const { x, y } = jewel.position;
        console.log(`Removing jewel at (${x}, ${y}):`, jewel);
        workingBoard[y][x] = null;

        const element = document.querySelector(`[data-position="${x}-${y}"]`) as HTMLElement;
        if (element) {
          matchElements.push(element);
        } else {
          console.warn(`Could not find element for jewel at (${x}, ${y})`);
        }
      });
    });

    try {
      console.log('Starting match animation');
      await animateMatch(matchElements);
      console.log('Match animation completed');

      console.log('Applying cascade...');
      const cascadedBoard = handleCascade(workingBoard);
      
      setBoard(cascadedBoard);

      const cascadeElements: HTMLElement[] = [];
      cascadedBoard.flat().forEach(jewel => {
        if (jewel) {
          const { x, y } = jewel.position;
          const element = document.querySelector(`[data-position="${x}-${y}"]`) as HTMLElement;
          if (element) {
            cascadeElements.push(element);
          }
        }
      });

      console.log('Starting cascade animation');
      await animateCascade(cascadeElements);
      console.log('Cascade animation completed');

      await processMatchesAndCascade(cascadedBoard, false);
    } catch (error) {
      console.error('Error during match/cascade process:', error);
      const cascadedBoard = handleCascade(workingBoard);
      setBoard(cascadedBoard);
      await processMatchesAndCascade(cascadedBoard, false);
    }
  };

  const handleMatches = async (_matches: { type: string; jewels: JewelType[] }[], newBoard: NullableJewelType[][]) => {
    await processMatchesAndCascade(newBoard);
  };

  const { handleJewelSelect, handleDragSwap, selectedJewel } = useJewelSwap(handleSwap);

  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${BOARD_SIZE}, ${jewelSize}px)`,
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
            onSelect={handleJewelSelect}
            onDragSwap={handleDragSwap}
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
});

export default GameBoard;
