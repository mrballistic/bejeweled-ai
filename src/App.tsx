import ThemeProvider from './context/ThemeProvider';
import { ScoreProvider } from './context/ScoreContext';
import GameBoard from './components/GameBoard';
import { Box, Typography } from '@mui/material';
import './style.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ScoreProvider>
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
        </Box>
      </ScoreProvider>
    </ThemeProvider>
  );
};

export default App;
