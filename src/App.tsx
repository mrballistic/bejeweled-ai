import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import ThemeProvider from './context/ThemeProvider';
import { ScoreProvider } from './context/ScoreContext';
import GameBoard from './components/GameBoard';
import CustomDragLayer from './components/CustomDragLayer';
import { Box, Typography } from '@mui/material';
import './style.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '100vh',
              py: 3,
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                background: 'linear-gradient(135deg, #60C8FF 0%, #C060FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.1em',
              }}
            >
              BEJEWELED.AI
            </Typography>
            <GameBoard jewelSize={56} />
            <CustomDragLayer />
          </Box>
        </DndProvider>
      </ScoreProvider>
    </ThemeProvider>
  );
};

export default App;
