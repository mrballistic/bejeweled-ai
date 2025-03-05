import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useScore } from '../context/ScoreContext';
import { useTheme } from '../context/ThemeProvider';

const ScoreDisplay: React.FC = () => {
  const { score, combo } = useScore();
  const { theme } = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '1rem',
        marginBottom: '2rem',
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
        border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
        minWidth: '200px',
        height: '100px', // Fixed height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            background: theme === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
          }}
        >
          {score.toLocaleString()}
        </Typography>
        <Box sx={{ height: '24px' }}> {/* Fixed height container for combo text */}
          {combo > 0 && (
            <Typography
              variant="subtitle1"
              color={theme === 'dark' ? '#90caf9' : '#1976d2'}
              sx={{ 
                fontWeight: 'bold',
                position: 'absolute',
                width: '100%',
                left: 0,
              }}
            >
              Combo x{combo + 1}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ScoreDisplay;
