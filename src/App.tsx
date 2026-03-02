import { useRef, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import ThemeProvider from './context/ThemeProvider';
import { ScoreProvider, useScore } from './context/ScoreContext';
import GameBoard, { GameBoardHandle } from './components/GameBoard';
import Header from './components/Header';
import GameControls from './components/GameControls';
import CustomDragLayer from './components/CustomDragLayer';
import { Box } from '@mui/material';
import './style.css';

const GameContent: React.FC = () => {
  const gameBoardRef = useRef<GameBoardHandle>(null);
  const [isAIMode, setIsAIMode] = useState(false);
  const { resetScore } = useScore();

  const handleToggleMode = useCallback(() => {
    setIsAIMode(prev => !prev);
  }, []);

  const handleHint = useCallback(() => {
    gameBoardRef.current?.showHint();
  }, []);

  const handleNewGame = useCallback(() => {
    gameBoardRef.current?.resetBoard();
    resetScore();
  }, [resetScore]);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          py: 3,
          gap: 2,
        }}
      >
        <Header isAIMode={isAIMode} onToggleMode={handleToggleMode} />
        <GameBoard ref={gameBoardRef} jewelSize={56} />
        <GameControls onHint={handleHint} onNewGame={handleNewGame} />
        <CustomDragLayer />
      </Box>
    </DndProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <GameContent />
      </ScoreProvider>
    </ThemeProvider>
  );
};

export default App;
