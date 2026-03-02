import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { JewelType, Position } from '../types/game';
import { isAdjacent } from '../hooks/useJewelSwap';
import { useTouchGesture } from '../hooks/useTouchGesture';
import JewelShape from './JewelShape';
import { Box } from '@mui/material';

const ITEM_TYPE = 'JEWEL';

interface DragItem {
  position: Position;
}

interface JewelProps {
  jewel: JewelType;
  row: number;
  col: number;
  size: number;
  isSelected: boolean;
  isHinted: boolean;
  onSelect: (pos: Position) => void;
  onSwap?: (pos1: Position, pos2: Position) => void;
  isProcessing?: React.MutableRefObject<boolean>;
}

const Jewel: React.FC<JewelProps> = ({
  jewel,
  row,
  col,
  size,
  isSelected,
  isHinted,
  onSelect,
  onSwap,
  isProcessing,
}) => {
  const position: Position = { row, col };
  const elRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: (): DragItem | null => {
      if (isProcessing?.current) return null;
      return { position };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [row, col, isProcessing]);

  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: DragItem) => {
      if (isProcessing?.current) return;
      if (isAdjacent(item.position, position) && onSwap) {
        onSwap(item.position, position);
      }
    },
  }), [row, col, onSwap, isProcessing]);

  const { onTouchStart, onTouchEnd } = useTouchGesture({
    position,
    jewelSize: size,
    onSwipe: (from, to) => {
      if (isProcessing?.current) return;
      if (onSwap) onSwap(from, to);
    },
  });

  // Combine refs
  const combinedRef = (node: HTMLDivElement | null) => {
    (elRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    drag(drop(node));
  };

  return (
    <Box
      ref={combinedRef}
      data-jewel-id={jewel.id}
      data-position={`${row}-${col}`}
      onClick={() => onSelect(position)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        willChange: 'transform',
        transition: 'transform 0.15s ease, filter 0.15s ease',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        opacity: isDragging ? 0.4 : 1,
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
