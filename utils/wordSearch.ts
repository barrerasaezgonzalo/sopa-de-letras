import {
  DIRECTIONS,
  GRID_SIZE,
  MAX_PLACEMENT_ATTEMPTS,
  MAX_WORD_LENGTH,
  MIN_WORD_LENGTH,
} from "@/app/contants";
import { CheckWordProps, Direction } from "@/types/types";

export const createEmptyGrid = (): string[][] => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));
};

export const getCellKey = (row: number, col: number): string => `${row}-${col}`;

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

    if (
      newRow < 0 ||
      newRow >= GRID_SIZE ||
      newCol < 0 ||
      newCol >= GRID_SIZE
    ) {
      return false;
    }

    if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
      return false;
    }
  }

  return true;
};

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

export const getCellsInLine = (
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
): string[] => {
  const cells: string[] = [];
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;

  const rowDir = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
  const colDir = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

  const isHorizontal = rowDiff === 0;
  const isVertical = colDiff === 0;
  const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

  if (!isHorizontal && !isVertical && !isDiagonal) {
    return [getCellKey(startRow, startCol)];
  }

  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  for (let i = 0; i <= steps; i++) {
    const currentRow = startRow + rowDir * i;
    const currentCol = startCol + colDir * i;
    cells.push(getCellKey(currentRow, currentCol));
  }

  return cells;
};

export const generateGridPure = (wordList: string[]) => {
  const newGrid = createEmptyGrid();
  const positions = new Map<string, string[]>();
  const placedWords: string[] = [];

  wordList.forEach((w) => {
    const word = w
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z]/g, "");
    if (word.length < MIN_WORD_LENGTH || word.length > MAX_WORD_LENGTH) return;

    let placed = false;
    let attempts = 0;

    while (!placed && attempts < MAX_PLACEMENT_ATTEMPTS) {
      const dir: Direction =
        DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(newGrid, word, row, col, dir)) {
        placeWordWithPosition(newGrid, word, row, col, dir, positions);
        placedWords.push(word);
        placed = true;
      }

      attempts++;
    }
  });

  // Llenar espacios vacíos con letras aleatorias
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!newGrid[r][c])
        newGrid[r][c] = String.fromCharCode(
          65 + Math.floor(Math.random() * 26),
        );
    }
  }

  return { grid: newGrid, words: placedWords, wordPositions: positions };
};

export const generateGrid = (
  wordList: string[],
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setWordPositions: React.Dispatch<React.SetStateAction<Map<string, string[]>>>,
): string[][] => {
  const newGrid = createEmptyGrid();
  const placedWords: string[] = [];
  const positions = new Map<string, string[]>();

  wordList.forEach((word) => {
    const cleanWord = word
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z]/g, "");

    if (
      cleanWord.length < MIN_WORD_LENGTH ||
      cleanWord.length > MAX_WORD_LENGTH
    ) {
      return;
    }

    let placed = false;
    let attempts = 0;

    while (!placed && attempts < MAX_PLACEMENT_ATTEMPTS) {
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

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j] === "") {
        newGrid[i][j] = String.fromCharCode(
          65 + Math.floor(Math.random() * 26),
        );
      }
    }
  }

  setWords(placedWords);
  setWordPositions(positions);

  return newGrid;
};

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

    if (wordCellsSorted === selectedCellsSorted && !foundWords.has(word)) {
      setFoundWords((prev) => {
        const newFound = new Set([...prev, word]);
        if (newFound.size === words.length) {
          shouldCelebrate = true;
        }
        return newFound;
      });

      setFoundCells((prev) => new Set([...prev, ...wordCells]));
    }
  });

  return shouldCelebrate;
};

// Lógica de fetch de palabras desde un topic
export const fetchWordsFromTopic = async (topic: string): Promise<string[]> => {
  const response = await fetch("/api/generate-words", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  const words = data.words.map((w: string) => w.trim()).filter(Boolean);

  if (words.length < 3) throw new Error("Muy pocas palabras generadas");
  return words;
};

// Lógica de fetch de topic aleatorio
export const fetchRandomTopic = async (): Promise<string> => {
  const response = await fetch("/api/random-topic");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  if (!data.topic) throw new Error("Topic inválido");
  return data.topic;
};
