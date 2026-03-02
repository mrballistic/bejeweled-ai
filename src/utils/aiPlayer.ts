import { Board, JewelKind, BOARD_SIZE } from '../types/game';

const JEWEL_CHAR: Record<JewelKind, string> = {
  diamond: 'D',
  ruby: 'R',
  emerald: 'E',
  sapphire: 'S',
  topaz: 'T',
  amethyst: 'A',
  citrine: 'C',
};

export function serializeBoard(board: Board): string {
  const legend = 'D=Diamond R=Ruby E=Emerald S=Sapphire T=Topaz A=Amethyst C=Citrine';
  const header = '   ' + Array.from({ length: BOARD_SIZE }, (_, i) => i).join(' ');

  const rows = board.map((row, i) => {
    const cells = row.map(cell => (cell ? JEWEL_CHAR[cell.type] : '.'));
    return `${i}: ${cells.join(' ')}`;
  });

  return [legend, '', header, ...rows].join('\n');
}

const systemPrompt = `You are a Bejeweled game AI. You will receive an 8x8 grid of jewels.
Each cell contains one letter: D(Diamond) R(Ruby) E(Emerald) S(Sapphire) T(Topaz) A(Amethyst) C(Citrine).

Find the best move. Rules:
- Swap two horizontally or vertically adjacent jewels
- The swap must create a line of 3+ identical jewels (horizontal or vertical)
- Prefer moves that: create 4+ matches, trigger chain reactions, or clear the bottom of the board

Respond with ONLY this JSON (no markdown, no explanation):
{"row1":N,"col1":N,"row2":N,"col2":N}

Coordinates are 0-indexed. Row 0 is the top.`;

export interface AIMove {
  row1: number;
  col1: number;
  row2: number;
  col2: number;
}

export async function getAIMove(board: Board, signal: AbortSignal): Promise<AIMove | null> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;

  const boardText = serializeBoard(board);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: boardText }] }],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.1,
          },
        }),
        signal,
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) return null;

    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[^}]+\}/);
    if (!jsonMatch) return null;

    const move = JSON.parse(jsonMatch[0]) as AIMove;

    // Basic validation
    if (
      typeof move.row1 !== 'number' || typeof move.col1 !== 'number' ||
      typeof move.row2 !== 'number' || typeof move.col2 !== 'number' ||
      move.row1 < 0 || move.row1 >= BOARD_SIZE ||
      move.col1 < 0 || move.col1 >= BOARD_SIZE ||
      move.row2 < 0 || move.row2 >= BOARD_SIZE ||
      move.col2 < 0 || move.col2 >= BOARD_SIZE
    ) {
      return null;
    }

    return move;
  } catch {
    return null;
  }
}
