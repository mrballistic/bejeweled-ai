import { createContext, useContext, useState, useCallback } from 'react';
import { Match } from '../types/game';

interface ScoreState {
  score: number;
  chainLevel: number;
  lastCombo: number;
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

interface ScoreProviderProps {
  children: React.ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<ScoreState>({
    score: 0,
    chainLevel: 0,
    lastCombo: 0,
  });

  const addPoints = useCallback((_matches: Match[], _chainLevel: number) => {
    // Full scoring implementation in Task 18
  }, []);

  const resetScore = useCallback(() => {
    setState({ score: 0, chainLevel: 0, lastCombo: 0 });
  }, []);

  return (
    <ScoreContext.Provider value={{ ...state, addPoints, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
