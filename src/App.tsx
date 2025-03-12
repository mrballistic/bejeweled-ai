import React, { useState, useRef } from 'react';
import { Typography, Box, Button, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition } from 'react-dnd-multi-backend';
import GameBoard from './components/GameBoard';
import { findHint } from './utils/hintFinder';
import ScoreDisplay from './components/ScoreDisplay';
import CustomDragLayer from './components/CustomDragLayer';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { ScoreProvider } from './context/ScoreContext';

// Define the backend configuration
const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: TouchTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
        delayTouchStart: 100,
      },
      preview: true,
    },
  ],
};

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
      h3: {
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
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
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: {
              xs: '10px',  // Less padding on mobile
              sm: '20px',  // Default padding for larger screens
            },
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
              marginBottom: {
                xs: '1rem',  // Less margin on mobile
                sm: '2rem',  // Default margin for larger screens
              },
              background: theme === 'dark' 
                ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',  // Center text on all devices
            }}
          >
            ✨Bejeweled.ai✨
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: {
                xs: '1rem',  // Less gap on mobile
                sm: '2rem',  // Default gap for larger screens
              },
              width: '100%',  // Full width container
              maxWidth: '600px',  // Maximum width to maintain readability
            }}
          >
            <GameBoard ref={boardRef} hint={hint} />
            <ScoreDisplay />
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowHint}
              sx={{
                marginTop: {
                  xs: '0.5rem',  // Less margin on mobile
                  sm: '1rem',    // Default margin for larger screens
                },
                padding: {
                  xs: '0.4rem 1.5rem',  // Smaller padding on mobile
                  sm: '0.5rem 2rem',     // Default padding for larger screens
                },
                fontSize: {
                  xs: '0.9rem',  // Smaller font on mobile
                  sm: '1rem',    // Default font size for larger screens
                },
                fontWeight: 'bold',
                width: {
                  xs: '80%',  // Wider button on mobile
                  sm: 'auto', // Auto width on larger screens
                },
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
