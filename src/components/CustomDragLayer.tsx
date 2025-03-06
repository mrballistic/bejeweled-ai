import React from 'react';
import { useDragLayer } from 'react-dnd/dist/hooks';
import { useTheme } from '../context/ThemeProvider';

interface DragItem {
  type: string;
  fromPosition: { x: number; y: number };
  size?: number;
}

const CustomDragLayer: React.FC = () => {
  const { theme } = useTheme();
  const { isDragging, currentOffset, item, initialOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as DragItem,
    currentOffset: monitor.getClientOffset(),
    initialOffset: monitor.getInitialClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  // Calculate the distance moved from initial position
  const distance = initialOffset ? Math.sqrt(
    Math.pow(currentOffset.x - initialOffset.x, 2) +
    Math.pow(currentOffset.y - initialOffset.y, 2)
  ) : 0;

  // Calculate scale based on movement (more movement = slightly smaller)
  const scale = Math.max(0.8, 1 - distance / 500);

  // Get the jewel size from the item or use default
  const jewelSize = item.size || 50;

  // Calculate font size based on jewel size
  const fontSize = Math.max(Math.floor(jewelSize * 0.6), 20);

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: jewelSize,
          height: jewelSize,
          left: currentOffset.x,
          top: currentOffset.y,
          transform: `translate(-50%, -50%) scale(${scale})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: `${fontSize}px`,
          backgroundColor: theme === 'dark' ? 'rgba(34, 34, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          border: `${Math.max(2, jewelSize * 0.04)}px solid ${theme === 'dark' ? '#64b5f6' : '#2196f3'}`,
          borderRadius: Math.max(4, jewelSize * 0.08),
          boxShadow: `0 ${Math.max(4, jewelSize * 0.08)}px ${Math.max(8, jewelSize * 0.16)}px rgba(0,0,0,0.3)`,
          transition: 'transform 0.1s ease-out',
          WebkitBackdropFilter: 'blur(2px)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {item.type}
      </div>
      {/* Touch indicator */}
      <div
        style={{
          position: 'absolute',
          width: Math.max(20, jewelSize * 0.4),
          height: Math.max(20, jewelSize * 0.4),
          left: currentOffset.x,
          top: currentOffset.y,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `2px solid ${theme === 'dark' ? '#64b5f6' : '#2196f3'}`,
          opacity: 0.5,
          animation: 'ripple 1s infinite ease-out',
        }}
      />
      <style>
        {`
          @keyframes ripple {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.5;
            }
            100% {
              transform: translate(-50%, -50%) scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomDragLayer;
