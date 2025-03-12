export interface Position {
  x: number;
  y: number;
}

export interface JewelType {
  id: string;
  type: string;
  position: Position;
  isMoving?: boolean;
  isNew?: boolean;
}

export type NullableJewelType = JewelType | null;

export interface Match {
  type: 'horizontal' | 'vertical';
  jewels: JewelType[];
}

export const BOARD_SIZE = 8;
export const JEWEL_TYPES = ['💎', '⭐', '🔵', '🔴', '🟣', '🟡', '🟢', '🟠'];
