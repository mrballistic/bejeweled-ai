import React, { createContext, useContext, useState } from 'react';

interface ScoreContextType {
  score: number;
  addPoints: (points: number) => void;
  resetScore: () => void;
  combo: number;
  incrementCombo: () => void;
  resetCombo: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const POINTS = {
  MATCH_3: 50,
  MATCH_4: 100,
  MATCH_5: 200,
  COMBO_MULTIPLIER: 1.5, // Each consecutive match increases points by 50%
};

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const addPoints = (basePoints: number) => {
    const comboMultiplier = Math.pow(POINTS.COMBO_MULTIPLIER, combo);
    const points = Math.floor(basePoints * comboMultiplier);
    setScore((prevScore) => prevScore + points);
  };

  const resetScore = () => {
    setScore(0);
    setCombo(0);
  };

  const incrementCombo = () => {
    setCombo((prev) => prev + 1);
  };

  const resetCombo = () => {
    setCombo(0);
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
