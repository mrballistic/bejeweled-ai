import React from 'react';
import { useDragLayer } from 'react-dnd';
import { useTheme } from '../context/ThemeProvider';
import { ItemTypes } from './Jewel';

interface DraggedItem {
  type: string;
}

const CustomDragLayer: React.FC = () => {
  const { theme } = useTheme();
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem() as DraggedItem,
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !initialOffset || !currentOffset) {
    return null;
  }

  if (itemType !== ItemTypes.JEWEL) {
    return null;
  }

  // Calculate transform with smooth follow
  const deltaX = currentOffset.x - initialOffset.x;
  const deltaY = currentOffset.y - initialOffset.y;
  const transform = `translate(${deltaX}px, ${deltaY}px)`;

  // Calculate scale based on movement speed
  const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const scale = Math.min(1.2, 1 + speed * 0.001); // Max scale of 1.2x

  // Calculate rotation based on movement direction
  const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  const tilt = Math.min(15, speed * 0.1); // Max tilt of 15 degrees

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: initialOffset.x,
        top: initialOffset.y,
      }}
    >
      <div
        style={{
          transform: `${transform} scale(${scale}) rotate(${tilt}deg)`,
          fontSize: '2rem',
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          border: `2px solid ${theme === 'dark' ? '#64b5f6' : '#2196f3'}`,
          borderRadius: '8px',
          boxShadow: `0 4px 8px rgba(0,0,0,${theme === 'dark' ? '0.5' : '0.2'})`,
          transition: 'transform 0.05s ease-out',
          willChange: 'transform',
          opacity: 0.9,
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransformStyle: 'preserve-3d',
        }}
      >
        {item.type}
      </div>
      {/* Touch ripple effect */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '60px',
          height: '60px',
          marginLeft: '-30px',
          marginTop: '-30px',
          border: `2px solid ${theme === 'dark' ? '#64b5f6' : '#2196f3'}`,
          borderRadius: '50%',
          animation: 'ripple 1s ease-out infinite',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(0.8);
              opacity: 0.3;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default React.memo(CustomDragLayer);
