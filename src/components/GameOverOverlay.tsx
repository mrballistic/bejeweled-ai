import { Box, Button, Typography } from '@mui/material';

interface GameOverOverlayProps {
  score: number;
  onNewGame: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ score, onNewGame }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 10, 20, 0.85)',
        zIndex: 1000,
        gap: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#FF4060',
          textShadow: '0 0 20px rgba(255, 64, 96, 0.5)',
          letterSpacing: '0.15em',
        }}
      >
        GAME OVER
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        No more moves available
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 1 }}>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          Final Score
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '3rem',
            fontWeight: 700,
            color: '#FFD040',
            textShadow: '0 0 15px rgba(255, 208, 64, 0.4)',
          }}
        >
          {score.toLocaleString()}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        onClick={onNewGame}
        sx={{
          mt: 2,
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          px: 4,
          py: 1.5,
          borderColor: 'rgba(96,200,255,0.5)',
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

export default GameOverOverlay;
