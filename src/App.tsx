import React, { useState, useRef } from 'react';
import { Typography, Box, Button, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard, { findHint } from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import CustomDragLayer from './components/CustomDragLayer';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { ScoreProvider } from './context/ScoreContext';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null);
  const boardRef = useRef<null | any>(null);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === 'dark' ? '#90caf9' : '#1976d2',
      },
    },
    typography: {
      h2: {
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
    },
  });

  const handleShowHint = () => {
    console.log('Show Hint button clicked');
    setHint((prevHint) => {
      if (!prevHint && boardRef.current) {
        console.log('Calculating hint...');
        const newHint = findHint(boardRef.current);
        console.log('Hint calculated:', newHint);
        setTimeout(() => {
          console.log('Clearing hint');
          setHint(null); // Remove the hint after 3 seconds
        }, 3000);
        return newHint;
      }
      return prevHint;
    });
  };

  console.log('Rendering AppContent...');

  return (
    <MuiThemeProvider theme={muiTheme}>
      <DndProvider backend={HTML5Backend}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            minHeight: '100vh',
            bgcolor: theme === 'dark' ? '#121212' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#121212',
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              marginBottom: '2rem',
              background: theme === 'dark' 
                ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ✨Bejeweled.ai✨
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <GameBoard ref={boardRef} hint={hint} setHint={setHint} />
            <ScoreDisplay />
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowHint}
              sx={{
                marginTop: '1rem',
                padding: '0.5rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Show Hint
            </Button>
          </Box>
        </Box>
        <CustomDragLayer />
      </DndProvider>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  console.log('Rendering App...');
  return (
    <ThemeProvider>
      <ScoreProvider>
        <AppContent />
      </ScoreProvider>
    </ThemeProvider>
  );
};

export default App;
