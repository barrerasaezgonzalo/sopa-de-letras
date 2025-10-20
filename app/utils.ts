import { DIRECTIONS, GRID_SIZE } from "./contants";
import { CheckWordProps, Direction } from "./types";

export const createEmptyGrid = (): string[][] => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
};

export const canPlaceWord = (grid: string[][], word: string, row: number, col: number, dir: Direction): boolean => {
  const { dx, dy } = dir;
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dx;
    const newCol = col + i * dy;
    if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
      return false;
    }
    if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
      return false;
    }
  }
  return true;
};

export const getCellKey = (row: number, col: number): string => `${row}-${col}`;

export const placeWordWithPosition = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dir: Direction,
  wordPositions: Map<string, string[]>
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

export const getCellsInLine = (startRow: number, startCol: number, endRow: number, endCol: number): string[] => {
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
    const currentRow = startRow + (rowDir * i);
    const currentCol = startCol + (colDir * i);
    cells.push(getCellKey(currentRow, currentCol));
  }

  return cells;
};

export const checkWord = ({ selectedCells, words, wordPositions, foundWords, setFoundWords, setFoundCells }: CheckWordProps) => {
  const selectedArray = Array.from(selectedCells).sort();
  let shouldCelebrate = false;

  words.forEach(word => {
    const wordCells = wordPositions.get(word);
    if (!wordCells) return;

    const wordCellsSorted = [...wordCells].sort().join(',');
    const selectedCellsSorted = selectedArray.join(',');

    if (wordCellsSorted === selectedCellsSorted && !foundWords.has(word)) {
      setFoundWords(prev => {
        const newFound = new Set([...prev, word]);

        if (newFound.size === words.length) {
          shouldCelebrate = true;
        }

        return newFound;
      });
      // @ts-expect-error lost color brackground on fix
      setFoundCells(prev => new Set([...prev, ...wordCells]));
    }
  });
  if (shouldCelebrate) {
    setTimeout(() => {
      alert('🎉 ¡Felicitaciones! ¡Has encontrado todas las palabras! 🎊');
    }, 300);
  }
};

export const generateGrid = (
  wordList: string[],
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setWordPositions: React.Dispatch<React.SetStateAction<Map<string, string[]>>>
): string[][] => {

  const newGrid = createEmptyGrid();
  const placedWords: string[] = [];
  const positions = new Map<string, string[]>();

  wordList.forEach(word => {
    const cleanWord = word.toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z]/g, '');

    if (cleanWord.length < 3 || cleanWord.length > GRID_SIZE) {
      // Palabra descartada por longitud;
      return;
    }

    let placed = false;
    let attempts = 0;
    const maxAttempts = 200;

    while (!placed && attempts < maxAttempts) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(newGrid, cleanWord, row, col, dir)) {
        placeWordWithPosition(newGrid, cleanWord, row, col, dir, positions);
        placedWords.push(cleanWord);
        placed = true;
        // console.log('Palabra colocada:', cleanWord, 'en posición', row, col, 'dirección', dir);
      }

      attempts++;
    }
  });

  // console.log('Palabras colocadas:', placedWords);

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid[i][j] === '') {
        newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  setWords(placedWords);
  setWordPositions(positions);
  return newGrid;
};

export const handleGenerate = async (
  topic: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setWords: React.Dispatch<React.SetStateAction<string[]>>,
  setWordPositions: React.Dispatch<React.SetStateAction<Map<string, string[]>>>,
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>,
  setFoundCells: React.Dispatch<React.SetStateAction<Set<string>>>,
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>,
  setSelectedCells: React.Dispatch<React.SetStateAction<Set<string>>>
): Promise<void> => {
  if (!topic.trim()) return;

  setGrid([]);
  setWords([]);
  setWordPositions(new Map());
  setFoundCells(new Set());
  setFoundWords(new Set());
  setSelectedCells(new Set());

  setLoading(true);
  await new Promise(resolve => setTimeout(resolve, 50));

  try {
    const response = await fetch('/api/generate-words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();

    if (data.words && data.words.length > 0) {
      const cleanWords = data.words
        .map((w: string) => w.trim())
        .filter((w: string) => w.length > 0);

      const newGrid = generateGrid(cleanWords, setWords, setWordPositions);
      setGrid(newGrid);
    } else {
      alert('No se pudieron generar palabras para este tema');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al generar la sopa de letras');
  } finally {
    setLoading(false);
  }
};