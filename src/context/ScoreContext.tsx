import React, { createContext, useContext, useState } from 'react';

interface ScoreContextType {
  score: number;
  addPoints: (points: number, chainLevel?: number) => void;
  resetScore: () => void;
  combo: number;
  incrementCombo: () => void;
  resetCombo: () => void;
  chainLevel: number;
  incrementChainLevel: () => void;
  resetChainLevel: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const POINTS = {
  MATCH_3: 50,
  MATCH_4: 100,
  MATCH_5: 200,
  COMBO_MULTIPLIER: 1.5, // Each consecutive match increases points by 50%
  CHAIN_MULTIPLIER: 2.0, // Each cascade level doubles the points
  MAX_CHAIN_LEVEL: 5, // Cap chain reaction bonus at 5x
};

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [chainLevel, setChainLevel] = useState(0);

  const addPoints = (basePoints: number, currentChainLevel: number = 0) => {
    // Calculate combo multiplier (consecutive matches)
    const comboMultiplier = Math.pow(POINTS.COMBO_MULTIPLIER, combo);
    
    // Calculate chain reaction multiplier (cascade level)
    const chainMultiplier = Math.pow(
      POINTS.CHAIN_MULTIPLIER,
      Math.min(currentChainLevel, POINTS.MAX_CHAIN_LEVEL)
    );
    
    // Apply both multipliers to base points
    const points = Math.floor(basePoints * comboMultiplier * chainMultiplier);
    
    setScore((prevScore) => prevScore + points);
  };

  const resetScore = () => {
    setScore(0);
    setCombo(0);
    setChainLevel(0);
  };

  const incrementCombo = () => {
    setCombo((prev) => prev + 1);
  };

  const resetCombo = () => {
    setCombo(0);
  };

  const incrementChainLevel = () => {
    setChainLevel((prev) => Math.min(prev + 1, POINTS.MAX_CHAIN_LEVEL));
  };

  const resetChainLevel = () => {
    setChainLevel(0);
  };

  return (
    <ScoreContext.Provider
      value={{
        score,
        addPoints,
        resetScore,
        combo,
        incrementCombo,
        resetCombo,
        chainLevel,
        incrementChainLevel,
        resetChainLevel,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
