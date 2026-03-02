import { useDragLayer } from 'react-dnd';
import { Box } from '@mui/material';

const CustomDragLayer: React.FC = () => {
  const { isDragging, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          transform: `translate(${currentOffset.x}px, ${currentOffset.y}px) rotate(5deg) scale(1.1)`,
          opacity: 0.8,
        }}
      />
    </Box>
  );
};

export default CustomDragLayer;
