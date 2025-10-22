import { CheckWordProps, Direction } from "./types";
import {
  GRID_SIZE,
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
  MAX_PLACEMENT_ATTEMPTS,
  DIRECTIONS,
} from "./contants";

/* ============================================
   FUNCIONES DE CREACIÓN Y VALIDACIÓN DE GRILLA
   ============================================ */

/**
 * Crea una grilla vacía del tamaño definido en GRID_SIZE
 */
export const createEmptyGrid = (): string[][] => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));
};

/**
 * Verifica si una palabra puede ser colocada en una posición específica
 */
export const canPlaceWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dir: Direction,
): boolean => {
  const { dx, dy } = dir;

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dx;
    const newCol = col + i * dy;

    // Verificar límites de la grilla
    if (
      newRow < 0 ||
      newRow >= GRID_SIZE ||
      newCol < 0 ||
      newCol >= GRID_SIZE
    ) {
      return false;
    }

    // Verificar si la celda está vacía o coincide con la letra de la palabra
    if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
      return false;
    }
  }

  return true;
};

/**
 * Genera una clave única para una celda basada en su fila y columna
 */
export const getCellKey = (row: number, col: number): string => `${row}-${col}`;

/**
 * Coloca una palabra en la grilla y guarda sus posiciones
 */
export const placeWordWithPosition = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dir: Direction,
  wordPositions: Map<string, string[]>,
): void => {
  const { dx, dy } = dir;
  const positions: string[] = [];

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dx;
    const newCol = col + i * dy;
    grid[newRow][newCol] = word[i];
    positions.push(getCellKey(newRow, newCol));
  }

  wordPositions.set(word, positions);
};

/* ============================================
   FUNCIONES DE SELECCIÓN Y VALIDACIÓN
   ============================================ */

/**
 * Obtiene las celdas en línea recta entre dos puntos
 * Soporta movimientos horizontales, verticales y diagonales
 */
export const getCellsInLine = (
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
): string[] => {
  const cells: string[] = [];
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;

  // Calcular dirección del movimiento
  const rowDir = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
  const colDir = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

  // Validar que el movimiento sea en línea recta
  const isHorizontal = rowDiff === 0;
  const isVertical = colDiff === 0;
  const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

  // Si no es un movimiento válido, retornar solo la celda inicial
  if (!isHorizontal && !isVertical && !isDiagonal) {
    return [getCellKey(startRow, startCol)];
  }

  // Generar todas las celdas en la línea
  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  for (let i = 0; i <= steps; i++) {
    const currentRow = startRow + rowDir * i;
    const currentCol = startCol + colDir * i;
    cells.push(getCellKey(currentRow, currentCol));
  }

  return cells;
};

/**
 * Verifica si las celdas seleccionadas forman una palabra válida
 */
export const checkWord = ({
  selectedCells,
  words,
  wordPositions,
  foundWords,
  setFoundWords,
  setFoundCells,
}: CheckWordProps): boolean => {
  const selectedArray = Array.from(selectedCells).sort();
  let shouldCelebrate = false;

  words.forEach((word) => {
    const wordCells = wordPositions.get(word);
    if (!wordCells) return;

    const wordCellsSorted = [...wordCells].sort().join(",");
    const selectedCellsSorted = selectedArray.join(",");

    // Verificar si la selección coincide con la palabra
    if (wordCellsSorted === selectedCellsSorted && !foundWords.has(word)) {
      // Marcar palabra como encontrada
      setFoundWords((prev) => {
        const newFound = new Set([...prev, word]);

        // Verificar si completó el juego
        if (newFound.size === words.length) {
          shouldCelebrate = true;
        }

        return newFound;
      });

      // Marcar celdas como encontradas
      setFoundCells((prev) => new Set([...prev, ...wordCells]));
    }
  });

  return shouldCelebrate;
};

/* ============================================
   FUNCIONES DE GENERACIÓN DE GRILLA
   ============================================ */

/**
 * Genera la grilla de sopa de letras con las palabras proporcionadas
 */
export const generateGrid = (
  wordList: string[],
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setWordPositions: React.Dispatch<React.SetStateAction<Map<string, string[]>>>,
): string[][] => {
  const newGrid = createEmptyGrid();
  const placedWords: string[] = [];
  const positions = new Map<string, string[]>();

  // Intentar colocar cada palabra
  wordList.forEach((word) => {
    // Limpiar y normalizar la palabra
    const cleanWord = word
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remover acentos
      .replace(/[^A-Z]/g, ""); // Solo letras

    // Validar longitud de la palabra
    if (
      cleanWord.length < MIN_WORD_LENGTH ||
      cleanWord.length > MAX_WORD_LENGTH
    ) {
      return;
    }

    let placed = false;
    let attempts = 0;
    const maxAttempts = MAX_PLACEMENT_ATTEMPTS;

    // Intentar colocar la palabra en diferentes posiciones
    while (!placed && attempts < maxAttempts) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(newGrid, cleanWord, row, col, dir)) {
        placeWordWithPosition(newGrid, cleanWord, row, col, dir, positions);
        placedWords.push(cleanWord);
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.warn(`No se pudo colocar la palabra: ${cleanWord}`);
    }
  });

  // Rellenar celdas vacías con letras aleatorias
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j] === "") {
        newGrid[i][j] = String.fromCharCode(
          65 + Math.floor(Math.random() * 26),
        );
      }
    }
  }

  // Actualizar estados
  setWords(placedWords);
  setWordPositions(positions);

  return newGrid;
};

/* ============================================
   FUNCIÓN PRINCIPAL DE GENERACIÓN
   ============================================ */

/**
 * Maneja el proceso completo de generación de la sopa de letras
 */
export const handleGenerate = async (
  topic: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setWordPositions: React.Dispatch<React.SetStateAction<Map<string, string[]>>>,
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>,
  setFoundCells: React.Dispatch<React.SetStateAction<Set<string>>>,
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>,
  setSelectedCells: React.Dispatch<React.SetStateAction<Set<string>>>,
): Promise<void> => {
  // Validar topic
  if (!topic.trim()) {
    console.warn("No se proporcionó un tema");
    return;
  }

  // Limpiar estados previos
  setGrid([]);
  setWords([]);
  setWordPositions(new Map());
  setFoundCells(new Set());
  setFoundWords(new Set());
  setSelectedCells(new Set());

  setLoading(true);

  // Pequeño delay para permitir que React actualice la UI
  await new Promise((resolve) => setTimeout(resolve, 50));

  try {
    // Llamar a la API para generar palabras
    const response = await fetch("/api/generate-words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Validar respuesta de la API
    if (!data.words || data.words.length === 0) {
      alert(
        "No se pudieron generar palabras para este tema. Intenta con otro tema.",
      );
      return;
    }

    // Limpiar palabras recibidas
    const cleanWords = data.words
      .map((w: string) => w.trim())
      .filter((w: string) => w.length > 0);

    if (cleanWords.length < 3) {
      alert("Se generaron muy pocas palabras. Intenta con otro tema.");
      return;
    }

    // Generar la grilla
    const newGrid = generateGrid(cleanWords, setWords, setWordPositions);
    setGrid(newGrid);
  } catch (error) {
    console.error("Error al generar la sopa de letras:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    alert(`Error al generar la sopa de letras: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
