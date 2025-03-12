import { useState, useCallback } from 'react';
import { Position, NullableJewelType, JewelType } from '../types/game';
import { findMatches } from '../utils/matchDetection';
import { handleCascade } from '../utils/cascadeHandler';
import { animateMatch, animateCascade, animateSwap } from '../utils/animations';
import { useScore, POINTS } from '../context/ScoreContext';

interface UseGameLogicProps {
  board: NullableJewelType[][];
  setBoard: (board: NullableJewelType[][]) => void;
}

export const useGameLogic = ({ board, setBoard }: UseGameLogicProps) => {
  const { addPoints, incrementCombo, resetCombo, incrementChainLevel, resetChainLevel } = useScore();

  const calculateMatchPoints = useCallback((matchLength: number): number => {
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
  }, []);

  const processMatchesAndCascade = useCallback(async (
    currentBoard: NullableJewelType[][],
    currentChainLevel: number = 0,
    isFirstMatch: boolean = true
  ): Promise<void> => {
    console.log(`${isFirstMatch ? '=== Starting' : '=== Continuing'} match process ===`);
    console.log('Current chain level:', currentChainLevel);
    
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
      console.log(`Adding ${points} points with chain level ${currentChainLevel}`);
      addPoints(points, currentChainLevel);
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
      const cascadeResult = handleCascade(workingBoard, currentChainLevel);
      const cascadedBoard = cascadeResult.board;
      const newChainLevel = cascadeResult.cascadeLevel;
      
      if (newChainLevel > currentChainLevel) {
        incrementChainLevel();
      }
      
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

      await processMatchesAndCascade(cascadedBoard, newChainLevel, false);
    } catch (error) {
      console.error('Error during match/cascade process:', error);
      const cascadeResult = handleCascade(workingBoard, currentChainLevel);
      setBoard(cascadeResult.board);
      await processMatchesAndCascade(cascadeResult.board, cascadeResult.cascadeLevel, false);
    }
  }, [addPoints, incrementCombo, resetCombo, incrementChainLevel, setBoard, calculateMatchPoints]);

  const handleMatches = useCallback(async (
    matches: { type: string; jewels: JewelType[] }[],
    newBoard: NullableJewelType[][]
  ) => {
    await processMatchesAndCascade(newBoard, 0, true);
  }, [processMatchesAndCascade]);

  const handleSwap = useCallback(async (from: Position, to: Position) => {
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
    newBoard[to.y][from.x] = temp;

    console.log('Board after swap:', JSON.stringify(newBoard));

    const matches = findMatches(newBoard);
    console.log('Matches found after swap:', matches);

    try {
      await animateSwap(fromElement, toElement);

      if (matches.length > 0) {
        console.log('Valid move. Updating board state.');
        setBoard(newBoard);
        resetChainLevel(); // Reset chain level for new move
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
  }, [board, setBoard, handleMatches, resetChainLevel]);

  return {
    handleSwap,
    handleMatches,
    processMatchesAndCascade,
  };
};
