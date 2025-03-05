import React from 'react';
import GameBoard from './components/GameBoard';
import { ThemeProvider } from './context/ThemeProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Bejeweled Clone</h1>
        <GameBoard />
      </div>
    </ThemeProvider>
  );
};

export default App;
