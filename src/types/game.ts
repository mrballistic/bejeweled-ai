export const BOARD_SIZE = 8;

export const JEWEL_TYPES = [
  'diamond', 'ruby', 'emerald', 'sapphire', 'topaz', 'amethyst', 'citrine'
] as const;

export type JewelKind = typeof JEWEL_TYPES[number];

export interface JewelType {
  id: string;
  type: JewelKind;
  isNew?: boolean;
  isMoving?: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface Match {
  positions: Position[];
  type: JewelKind;
}

export interface CascadeMove {
  jewelId: string;
  fromRow: number;
  toRow: number;
  col: number;
  isNew: boolean;
}

export type Board = (JewelType | null)[][];
