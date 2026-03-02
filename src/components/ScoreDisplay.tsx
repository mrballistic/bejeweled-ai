import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScore } from '../context/ScoreContext';
import { Box, Typography } from '@mui/material';

const ScoreDisplay: React.FC = () => {
  const { score, chainLevel, lastPointsAdded } = useScore();
  const displayRef = useRef<HTMLSpanElement>(null);
  const prevScoreRef = useRef(0);

  useEffect(() => {
    if (!displayRef.current) return;
    const from = prevScoreRef.current;
    const to = score;
    prevScoreRef.current = score;

    if (from === to) return;

    const obj = { val: from };
    gsap.to(obj, {
      val: to,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (displayRef.current) {
          displayRef.current.textContent = Math.round(obj.val).toLocaleString();
        }
      },
    });
  }, [score]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        Score
      </Typography>
      <Typography
        ref={displayRef}
        variant="h3"
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          color: '#60C8FF',
          lineHeight: 1,
        }}
      >
        {score.toLocaleString()}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#FFD040',
          mt: 0.5,
          visibility: chainLevel > 0 ? 'visible' : 'hidden',
        }}
      >
        {chainLevel > 0 ? `CHAIN x${Math.pow(2, Math.min(chainLevel, 5))}` : '\u00A0'}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '0.85rem',
          color: '#40E880',
          mt: 0.25,
          visibility: lastPointsAdded > 0 ? 'visible' : 'hidden',
        }}
      >
        {lastPointsAdded > 0 ? `+${lastPointsAdded.toLocaleString()}` : '\u00A0'}
      </Typography>
    </Box>
  );
};

export default ScoreDisplay;
