import React from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from './Jewel';

const CustomDragLayer: React.FC = () => {
  const { isDragging, currentOffset, item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

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
          width: 50,
          height: 50,
          left: currentOffset.x,
          top: currentOffset.y,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          backgroundColor: 'transparent',
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
        }}
      >
        {item.type}
      </div>
    </div>
  );
};

export default CustomDragLayer;
