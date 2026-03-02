import { useRef, useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import ThemeProvider from './context/ThemeProvider';
import { ScoreProvider, useScore } from './context/ScoreContext';
import GameBoard, { GameBoardHandle } from './components/GameBoard';
import Header from './components/Header';
import GameControls from './components/GameControls';
import AIControls from './components/AIControls';
import GameOverOverlay from './components/GameOverOverlay';
import CustomDragLayer from './components/CustomDragLayer';
import { useAIPlayer } from './hooks/useAIPlayer';
import { Board } from './types/game';
import { Box } from '@mui/material';
import './style.css';

const EMPTY_BOARD: Board = [];

const GameContent: React.FC = () => {
  const gameBoardRef = useRef<GameBoardHandle>(null);
  const [isAIMode, setIsAIMode] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const { score, resetScore } = useScore();

  // Stable refs that delegate to the GameBoard handle
  const boardProxy = useRef<Board>(EMPTY_BOARD);
  const processingProxy = useRef(false);

  // Keep proxies in sync + poll game over state
  useEffect(() => {
    const id = setInterval(() => {
      if (gameBoardRef.current) {
        boardProxy.current = gameBoardRef.current.boardRef.current;
        processingProxy.current = gameBoardRef.current.isProcessing.current;
        setIsGameOver(gameBoardRef.current.isGameOver);
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  const handleSwapProxy = useCallback((...args: Parameters<GameBoardHandle['handleSwap']>) => {
    gameBoardRef.current?.handleSwap(...args);
  }, []);

  const ai = useAIPlayer({
    boardRef: boardProxy,
    isProcessing: processingProxy,
    handleSwap: handleSwapProxy,
  });

  const handleToggleMode = useCallback(() => {
    setIsAIMode(prev => {
      const next = !prev;
      if (!next && ai.isActive) {
        ai.toggleActive();
      }
      return next;
    });
  }, [ai]);

  const handleHint = useCallback(() => {
    gameBoardRef.current?.showHint();
  }, []);

  const handleNewGame = useCallback(() => {
    gameBoardRef.current?.resetBoard();
    resetScore();
    ai.resetMoveCount();
    setIsGameOver(false);
  }, [resetScore, ai]);

  // Pause AI when game is over
  useEffect(() => {
    if (isGameOver && ai.isActive) {
      ai.toggleActive();
    }
  }, [isGameOver, ai]);

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
        {isAIMode ? (
          <AIControls
            isActive={ai.isActive}
            speed={ai.speed}
            moveCount={ai.moveCount}
            isThinking={ai.isThinking}
            error={ai.error}
            onToggleActive={ai.toggleActive}
            onSpeedChange={ai.setSpeed}
          />
        ) : (
          <GameControls onHint={handleHint} onNewGame={handleNewGame} />
        )}
        {!isAIMode && <Box />}
        <CustomDragLayer />
      </Box>
      {isGameOver && (
        <GameOverOverlay score={score} onNewGame={handleNewGame} />
      )}
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
