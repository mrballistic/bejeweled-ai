import { BOARD_SIZE } from '../types/game';

export const calculateJewelSize = (): number => {
  const vw = Math.min(document.documentElement.clientWidth, 600); // Cap at 600px
  const padding = 20; // Total horizontal padding
  const gap = 2 * (BOARD_SIZE - 1); // Total gap space
  return Math.floor((vw - padding - gap) / BOARD_SIZE);
};

export const useViewportCalculator = () => {
  const handleResize = (callback: (size: number) => void) => {
    const updateSize = () => {
      const newSize = calculateJewelSize();
      callback(newSize);
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // Initial calculation

    return () => window.removeEventListener('resize', updateSize);
  };

  return {
    handleResize,
    calculateJewelSize,
  };
};
