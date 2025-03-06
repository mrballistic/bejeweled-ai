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
        padding: {
          xs: '0.75rem',  // Less padding on mobile
          sm: '1rem',     // Default padding for larger screens
        },
        marginBottom: {
          xs: '1rem',     // Less margin on mobile
          sm: '2rem',     // Default margin for larger screens
        },
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
        border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
        width: {
          xs: '90%',      // Almost full width on mobile
          sm: '200px',    // Fixed width on larger screens
        },
        minWidth: {
          xs: 'auto',     // Allow shrinking on mobile
          sm: '200px',    // Minimum width on larger screens
        },
        height: {
          xs: '80px',     // Smaller height on mobile
          sm: '100px',    // Default height for larger screens
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: {
          xs: '12px',     // Larger border radius on mobile
          sm: '4px',      // Default border radius for larger screens
        },
        boxShadow: theme === 'dark'
          ? '0 4px 8px rgba(0,0,0,0.3)'
          : '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xs: '2rem',    // Smaller font on mobile
              sm: '2.5rem',  // Default font size for larger screens
            },
            background: theme === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: {
              xs: '0.25rem', // Less margin on mobile
              sm: '0.5rem',  // Default margin for larger screens
            },
            letterSpacing: '0.05em', // Improved readability
          }}
        >
          {score.toLocaleString()}
        </Typography>
        <Box 
          sx={{ 
            height: {
              xs: '20px',  // Smaller height on mobile
              sm: '24px',  // Default height for larger screens
            }
          }}
        >
          {combo > 0 && (
            <Typography
              variant="subtitle1"
              color={theme === 'dark' ? '#90caf9' : '#1976d2'}
              sx={{ 
                fontWeight: 'bold',
                position: 'absolute',
                width: '100%',
                left: 0,
                fontSize: {
                  xs: '0.9rem',  // Smaller font on mobile
                  sm: '1rem',    // Default font size for larger screens
                },
                animation: 'pulseCombo 1s infinite',
                '@keyframes pulseCombo': {
                  '0%': {
                    transform: 'scale(1)',
                  },
                  '50%': {
                    transform: 'scale(1.1)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                  },
                },
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
