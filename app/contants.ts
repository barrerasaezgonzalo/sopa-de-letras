import { Direction } from "./types";

export const GRID_SIZE = 15;
export const MIN_WORD_LENGTH = 3;
export const MAX_WORD_LENGTH = GRID_SIZE;
export const MAX_PLACEMENT_ATTEMPTS = 200;

export const DIRECTIONS: readonly Direction[] = [
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 1 },
  { dx: -1, dy: -1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: 1 },
] as const;

export const CELL_COLORS = {
  DEFAULT: "#ffffff",
  SELECTED: "#FFB300",
  FOUND: "#80F2AA",
  HOVER: "#FFD780",
} as const;
export type CellColorKey = keyof typeof CELL_COLORS;

export const WORD_COLORS = {
  DEFAULT_BG: "#296885",
  DEFAULT_TEXT: "#FFFFFF",
  FOUND_BG: "#296885",
  FOUND_TEXT: "#C0C0C0",
} as const;

export const RATE_LIMIT_MS = 2000;
export const MIN_VALID_WORDS = 5;
export const TARGET_WORDS_COUNT = 10;
export const MODEL = "llama-3.3-70b-versatile";
