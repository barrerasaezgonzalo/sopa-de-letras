// constants.ts
import { Direction } from "./types";

/* ============================================
   CONFIGURACIÓN DE LA GRILLA
   ============================================ */

/**
 * Tamaño de la grilla (filas y columnas)
 */
export const GRID_SIZE = 15;

/**
 * Tamaño mínimo permitido para una palabra
 */
export const MIN_WORD_LENGTH = 3;

/**
 * Tamaño máximo permitido para una palabra (igual al tamaño de la grilla)
 */
export const MAX_WORD_LENGTH = GRID_SIZE;

/**
 * Número máximo de intentos para colocar una palabra
 */
export const MAX_PLACEMENT_ATTEMPTS = 200;

/* ============================================
   DIRECCIONES POSIBLES
   ============================================ */

/**
 * Todas las direcciones posibles para colocar palabras en la grilla
 * Incluye: horizontal (→←), vertical (↑↓) y diagonal (↗↖↘↙)
 */
export const DIRECTIONS: Direction[] = [
  { dx: 0, dy: 1 }, // horizontal derecha →
  { dx: 0, dy: -1 }, // horizontal izquierda ← (reversa)
  { dx: 1, dy: 0 }, // vertical abajo ↓
  { dx: -1, dy: 0 }, // vertical arriba ↑ (reversa)
  { dx: 1, dy: 1 }, // diagonal abajo-derecha ↘
  { dx: -1, dy: -1 }, // diagonal arriba-izquierda ↖ (reversa)
  { dx: 1, dy: -1 }, // diagonal abajo-izquierda ↙
  { dx: -1, dy: 1 }, // diagonal arriba-derecha ↗ (reversa)
];

/* ============================================
   COLORES DEL JUEGO
   ============================================ */

/**
 * Colores para el estado de las celdas
 */
export const CELL_COLORS = {
  DEFAULT: "#ffffff",
  SELECTED: "#fde047", // Amarillo
  FOUND: "#86efac", // Verde
  HOVER: "#f3f4f6", // Gris claro
};

/**
 * Colores para las palabras
 */
export const WORD_COLORS = {
  DEFAULT_BG: "#f3f4f6",
  DEFAULT_TEXT: "#1f2937",
  FOUND_BG: "#dcfce7",
  FOUND_TEXT: "#166534",
};

/* ============================================
   CONFIGURACIÓN DE LA API
   ============================================ */

/**
 * Tiempo de espera entre requests (rate limiting)
 */
export const RATE_LIMIT_MS = 2000;

/**
 * Número mínimo de palabras válidas para generar una sopa
 */
export const MIN_VALID_WORDS = 5;

/**
 * Número objetivo de palabras a generar
 */
export const TARGET_WORDS_COUNT = 10;
