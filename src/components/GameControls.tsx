import { Box, Button } from '@mui/material';

interface GameControlsProps {
  onHint: () => void;
  onNewGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onHint, onNewGame }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        variant="outlined"
        onClick={onHint}
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          borderColor: 'rgba(255,215,0,0.4)',
          color: '#FFD040',
          '&:hover': {
            borderColor: '#FFD040',
            backgroundColor: 'rgba(255,215,0,0.1)',
          },
        }}
      >
        HINT
      </Button>
      <Button
        variant="outlined"
        onClick={onNewGame}
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          borderColor: 'rgba(96,200,255,0.4)',
          color: '#60C8FF',
          '&:hover': {
            borderColor: '#60C8FF',
            backgroundColor: 'rgba(96,200,255,0.1)',
          },
        }}
      >
        NEW GAME
      </Button>
    </Box>
  );
};

export default GameControls;
