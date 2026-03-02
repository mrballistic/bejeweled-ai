import ScoreDisplay from './ScoreDisplay';
import { Box, Typography } from '@mui/material';

interface HeaderProps {
  isAIMode: boolean;
  onToggleMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAIMode, onToggleMode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 500,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
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
            fontSize: { xs: '1.4rem', sm: '2rem' },
          }}
        >
          BEJEWELED.AI
        </Typography>
        <Box
          onClick={onToggleMode}
          sx={{
            cursor: 'pointer',
            px: 2,
            py: 0.5,
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: isAIMode ? 'rgba(192,96,255,0.15)' : 'rgba(96,200,255,0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isAIMode ? 'rgba(192,96,255,0.25)' : 'rgba(96,200,255,0.25)',
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              color: isAIMode ? '#C060FF' : '#60C8FF',
              letterSpacing: '0.1em',
            }}
          >
            {isAIMode ? 'AI' : 'PLAYER'}
          </Typography>
        </Box>
      </Box>
      <ScoreDisplay />
    </Box>
  );
};

export default Header;
