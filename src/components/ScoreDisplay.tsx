import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useScore } from '../context/ScoreContext';
import { useTheme } from '../context/ThemeProvider';

const ScoreDisplay: React.FC = () => {
  const { score, combo, chainLevel } = useScore();
  const { theme } = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: {
          xs: '0.75rem',
          sm: '1rem',
        },
        marginBottom: {
          xs: '1rem',
          sm: '2rem',
        },
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
        border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
        width: {
          xs: '90%',
          sm: '200px',
        },
        minWidth: {
          xs: 'auto',
          sm: '200px',
        },
        height: {
          xs: '100px',
          sm: '120px',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: {
          xs: '12px',
          sm: '4px',
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
              xs: '2rem',
              sm: '2.5rem',
            },
            background: theme === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: {
              xs: '0.25rem',
              sm: '0.5rem',
            },
            letterSpacing: '0.05em',
          }}
        >
          {score.toLocaleString()}
        </Typography>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            height: {
              xs: '40px',
              sm: '48px',
            }
          }}
        >
          {combo > 0 && (
            <Typography
              variant="subtitle1"
              color={theme === 'dark' ? '#90caf9' : '#1976d2'}
              sx={{ 
                fontWeight: 'bold',
                fontSize: {
                  xs: '0.9rem',
                  sm: '1rem',
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
          {chainLevel > 0 && (
            <Typography
              variant="subtitle1"
              color={theme === 'dark' ? '#f48fb1' : '#d81b60'}
              sx={{ 
                fontWeight: 'bold',
                fontSize: {
                  xs: '0.9rem',
                  sm: '1rem',
                },
                animation: 'pulseChain 1s infinite',
                animationDelay: '0.5s',
                '@keyframes pulseChain': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                  '50%': {
                    transform: 'scale(1.2)',
                    opacity: 0.8,
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                },
              }}
            >
              Chain x{Math.pow(2, chainLevel)}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ScoreDisplay;
