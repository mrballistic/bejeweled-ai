import { useState, useRef, useEffect, useCallback } from 'react';
import { Board, Position } from '../types/game';
import { getAIMove } from '../utils/aiPlayer';
import { findHint } from '../utils/hintFinder';
import { findMatches } from '../utils/matchDetection';
import { cloneBoard } from '../utils/cascadeHandler';
import { isAdjacent } from './useJewelSwap';

export type AISpeed = 'slow' | 'medium' | 'fast';

const SPEED_MS: Record<AISpeed, number> = {
  slow: 2000,
  medium: 1000,
  fast: 500,
};

const MIN_API_INTERVAL = 800;

interface UseAIPlayerOptions {
  boardRef: React.MutableRefObject<Board>;
  isProcessing: React.MutableRefObject<boolean>;
  handleSwap: (pos1: Position, pos2: Position) => void;
}

export function useAIPlayer({ boardRef, isProcessing, handleSwap }: UseAIPlayerOptions) {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState<AISpeed>('medium');
  const [moveCount, setMoveCount] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isThinkingRef = useRef(false);
  const lastApiCallRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const validateMove = useCallback((board: Board, row1: number, col1: number, row2: number, col2: number): boolean => {
    const pos1: Position = { row: row1, col: col1 };
    const pos2: Position = { row: row2, col: col2 };

    if (!isAdjacent(pos1, pos2)) return false;
    if (!board[row1][col1] || !board[row2][col2]) return false;

    const testBoard = cloneBoard(board);
    const temp = testBoard[row1][col1];
    testBoard[row1][col1] = testBoard[row2][col2];
    testBoard[row2][col2] = temp;

    return findMatches(testBoard).length > 0;
  }, []);

  const makeAIMove = useCallback(async () => {
    if (isProcessing.current || isThinkingRef.current) return;

    // Rate limit
    const now = Date.now();
    if (now - lastApiCallRef.current < MIN_API_INTERVAL) return;

    isThinkingRef.current = true;
    setIsThinking(true);
    setError(null);
    lastApiCallRef.current = now;

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const board = boardRef.current;
      const aiMove = await getAIMove(board, abortController.signal);

      if (abortController.signal.aborted) return;

      if (aiMove && validateMove(board, aiMove.row1, aiMove.col1, aiMove.row2, aiMove.col2)) {
        handleSwap(
          { row: aiMove.row1, col: aiMove.col1 },
          { row: aiMove.row2, col: aiMove.col2 },
        );
        setMoveCount(c => c + 1);
        return;
      }

      // Fallback to hint finder
      const hint = findHint(board);
      if (hint) {
        handleSwap(hint.pos1, hint.pos2);
        setMoveCount(c => c + 1);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError('AI error — paused');
      setIsActive(false);
    } finally {
      isThinkingRef.current = false;
      setIsThinking(false);
      abortControllerRef.current = null;
    }
  }, [boardRef, isProcessing, handleSwap, validateMove]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      makeAIMove();
    }, SPEED_MS[speed]);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, speed, makeAIMove]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const toggleActive = useCallback(() => {
    setIsActive(prev => {
      if (prev && abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return !prev;
    });
    setError(null);
  }, []);

  const resetMoveCount = useCallback(() => {
    setMoveCount(0);
  }, []);

  return {
    isActive,
    speed,
    setSpeed,
    moveCount,
    isThinking,
    error,
    toggleActive,
    resetMoveCount,
  };
}
