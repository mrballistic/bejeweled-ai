import { JewelType, Position } from '../types/game';
import JewelShape from './JewelShape';
import { Box } from '@mui/material';

interface JewelProps {
  jewel: JewelType;
  row: number;
  col: number;
  size: number;
  isSelected: boolean;
  isHinted: boolean;
  onSelect: (pos: Position) => void;
}

const Jewel: React.FC<JewelProps> = ({ jewel, row, col, size, isSelected, isHinted, onSelect }) => {
  return (
    <Box
      data-jewel-id={jewel.id}
      data-position={`${row}-${col}`}
      onClick={() => onSelect({ row, col })}
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        willChange: 'transform',
        transition: 'transform 0.15s ease, filter 0.15s ease',
        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`,
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        '&:hover': {
          transform: 'scale(1.05)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) brightness(1.15)',
        },
        ...(isSelected && {
          animation: 'jewelPulse 0.8s ease-in-out infinite',
        }),
        ...(isHinted && {
          animation: 'jewelHint 1s ease-in-out infinite',
        }),
        '@keyframes jewelPulse': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6)) brightness(1.1)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.9)) brightness(1.25)',
          },
        },
        '@keyframes jewelHint': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.5)) brightness(1.05)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.8)) brightness(1.2)',
          },
        },
      }}
    >
      <JewelShape type={jewel.type} size={size * 0.85} />
    </Box>
  );
};

export default Jewel;
