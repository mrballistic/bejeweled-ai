import React from 'react';
import { Typography, Box, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { ScoreProvider } from './context/ScoreContext';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  
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
            variant="h2" 
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
            Bejeweled.ai
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <GameBoard />
            <ScoreDisplay />
          </Box>
        </Box>
      </DndProvider>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <AppContent />
      </ScoreProvider>
    </ThemeProvider>
  );
};

export default App;
