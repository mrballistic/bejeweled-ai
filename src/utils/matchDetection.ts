import { Position } from '../hooks/useJewelSwap';

interface Jewel {
  id: string;
  type: string;
  position: Position;
}

interface Match {
  type: 'horizontal' | 'vertical';
  jewels: Jewel[];
}

const BOARD_SIZE = 8;

export const findMatches = (board: (Jewel | null)[][]): Match[] => {
  console.log('findMatches called with board:', JSON.stringify(board));
  const matches: Match[] = [];

  // Check horizontal matches
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE - 2; x++) {
      const jewel2 = board[y][x + 1]; // Check middle jewel first
      
      if (jewel2) {
        const currentType = jewel2.type;
        let leftMatches = 0;
        let rightMatches = 0;

        // Check left
        let leftX = x;
        while (leftX >= 0) {
          const leftJewel = board[y][leftX];
          if (leftJewel && leftJewel.type === currentType) {
            leftMatches++;
            leftX--;
          } else {
            break;
          }
        }

        // Check right
        let rightX = x + 2;
        while (rightX < BOARD_SIZE) {
          const rightJewel = board[y][rightX];
          if (rightJewel && rightJewel.type === currentType) {
            rightMatches++;
            rightX++;
          } else {
            break;
          }
        }

        // If we have at least 3 total matches including the center
        if (leftMatches + rightMatches >= 2) { // +1 for the center jewel
          const matchJewels: Jewel[] = [];
          for (let i = leftX + 1; i < rightX; i++) {
            const jewel = board[y][i];
            if (jewel) {
              matchJewels.push(jewel);
            }
          }

          matches.push({
            type: 'horizontal',
            jewels: matchJewels
          });
          console.log('Horizontal match found:', matchJewels);

          // Skip the rest of this match to avoid duplicate matches
          x = rightX - 1;
        }
      }
    }
  }

  // Check vertical matches
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE - 2; y++) {
      const jewel2 = board[y + 1][x]; // Check middle jewel first
      
      if (jewel2) {
        const currentType = jewel2.type;
        let upMatches = 0;
        let downMatches = 0;

        // Check up
        let upY = y;
        while (upY >= 0) {
          const upJewel = board[upY][x];
          if (upJewel && upJewel.type === currentType) {
            upMatches++;
            upY--;
          } else {
            break;
          }
        }

        // Check down
        let downY = y + 2;
        while (downY < BOARD_SIZE) {
          const downJewel = board[downY][x];
          if (downJewel && downJewel.type === currentType) {
            downMatches++;
            downY++;
          } else {
            break;
          }
        }

        // If we have at least 3 total matches including the center
        if (upMatches + downMatches >= 2) { // +1 for the center jewel
          const matchJewels: Jewel[] = [];
          for (let i = upY + 1; i < downY; i++) {
            const jewel = board[i][x];
            if (jewel) {
              matchJewels.push(jewel);
            }
          }

          matches.push({
            type: 'vertical',
            jewels: matchJewels
          });
          console.log('Vertical match found:', matchJewels);

          // Skip the rest of this match to avoid duplicate matches
          y = downY - 1;
        }
      }
    }
  }

  console.log('All matches found:', matches);
  return matches;
};
