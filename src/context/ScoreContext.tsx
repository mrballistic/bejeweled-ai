import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Match } from '../types/game';

interface ScoreState {
  score: number;
  chainLevel: number;
  lastCombo: number;
  lastPointsAdded: number;
}

interface ScoreContextType extends ScoreState {
  addPoints: (matches: Match[], chainLevel: number) => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextType | null>(null);

export function useScore(): ScoreContextType {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error('useScore must be used within ScoreProvider');
  return ctx;
}

function getBasePoints(matchSize: number): number {
  if (matchSize >= 5) return 500;
  if (matchSize === 4) return 200;
  return 100; // 3-match
}

function getChainMultiplier(chainLevel: number): number {
  if (chainLevel >= 5) return 32;
  return Math.pow(2, chainLevel);
}

function getComboMultiplier(matchCount: number): number {
  if (matchCount >= 4) return 2.5;
  if (matchCount === 3) return 2;
  if (matchCount === 2) return 1.5;
  return 1;
}

export function calculatePoints(matches: Match[], chainLevel: number): number {
  const baseTotal = matches.reduce((sum, m) => sum + getBasePoints(m.positions.length), 0);
  const chain = getChainMultiplier(chainLevel);
  const combo = getComboMultiplier(matches.length);
  return Math.round(baseTotal * chain * combo);
}

interface ScoreProviderProps {
  children: React.ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<ScoreState>({
    score: 0,
    chainLevel: 0,
    lastCombo: 0,
    lastPointsAdded: 0,
  });

  const scoreRef = useRef(0);

  const addPoints = useCallback((matches: Match[], chainLevel: number) => {
    const points = calculatePoints(matches, chainLevel);
    scoreRef.current += points;
    setState({
      score: scoreRef.current,
      chainLevel,
      lastCombo: matches.length,
      lastPointsAdded: points,
    });
  }, []);

  const resetScore = useCallback(() => {
    scoreRef.current = 0;
    setState({ score: 0, chainLevel: 0, lastCombo: 0, lastPointsAdded: 0 });
  }, []);

  return (
    <ScoreContext.Provider value={{ ...state, addPoints, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
