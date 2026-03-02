import { Box, Button, Typography, Slider } from '@mui/material';
import { AISpeed } from '../hooks/useAIPlayer';

const SPEED_LABELS: Record<AISpeed, string> = {
  slow: 'SLOW',
  medium: 'MED',
  fast: 'FAST',
};

const SPEED_VALUES: AISpeed[] = ['slow', 'medium', 'fast'];

interface AIControlsProps {
  isActive: boolean;
  speed: AISpeed;
  moveCount: number;
  isThinking: boolean;
  error: string | null;
  onToggleActive: () => void;
  onSpeedChange: (speed: AISpeed) => void;
}

const AIControls: React.FC<AIControlsProps> = ({
  isActive,
  speed,
  moveCount,
  isThinking,
  error,
  onToggleActive,
  onSpeedChange,
}) => {
  const speedIndex = SPEED_VALUES.indexOf(speed);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        p: 2,
        borderRadius: '12px',
        border: '1px solid rgba(192,96,255,0.2)',
        backgroundColor: 'rgba(192,96,255,0.05)',
        minWidth: 240,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Button
          variant="outlined"
          onClick={onToggleActive}
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            borderColor: isActive ? 'rgba(255,64,96,0.5)' : 'rgba(64,232,128,0.5)',
            color: isActive ? '#FF4060' : '#40E880',
            minWidth: 80,
            '&:hover': {
              borderColor: isActive ? '#FF4060' : '#40E880',
              backgroundColor: isActive ? 'rgba(255,64,96,0.1)' : 'rgba(64,232,128,0.1)',
            },
          }}
        >
          {isActive ? 'PAUSE' : 'PLAY'}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            Speed
          </Typography>
          <Slider
            value={speedIndex}
            min={0}
            max={2}
            step={1}
            onChange={(_, val) => onSpeedChange(SPEED_VALUES[val as number])}
            marks={SPEED_VALUES.map((_, i) => ({ value: i, label: SPEED_LABELS[SPEED_VALUES[i]] }))}
            sx={{
              color: '#C060FF',
              '& .MuiSlider-markLabel': {
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.55rem',
                color: 'rgba(255,255,255,0.4)',
              },
              '& .MuiSlider-thumb': { width: 14, height: 14 },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          Moves: <span style={{ color: '#C060FF', fontWeight: 700 }}>{moveCount}</span>
        </Typography>

        {isThinking && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#C060FF',
                animation: 'thinkPulse 1s ease-in-out infinite',
                '@keyframes thinkPulse': {
                  '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '0.75rem',
                color: '#C060FF',
              }}
            >
              thinking...
            </Typography>
          </Box>
        )}

        {error && (
          <Typography
            sx={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.75rem',
              color: '#FF4060',
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AIControls;
