import { Direction } from "./types";

export const GRID_SIZE = 15;

export const DIRECTIONS: Direction[] = [
  { dx: 0, dy: 1 },   // horizontal derecha
  { dx: 0, dy: -1 },  // horizontal izquierda (reversa)
  { dx: 1, dy: 0 },   // vertical abajo
  { dx: -1, dy: 0 },  // vertical arriba (reversa)
  { dx: 1, dy: 1 },   // diagonal abajo-derecha
  { dx: -1, dy: -1 }, // diagonal arriba-izquierda (reversa)
  { dx: 1, dy: -1 },  // diagonal abajo-izquierda
  { dx: -1, dy: 1 },  // diagonal arriba-derecha (reversa)
];