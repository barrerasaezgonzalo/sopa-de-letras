export type Direction = {
  dx: number;
  dy: number;
};

export interface InputProps {
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  handleGenerate: () => void;
  handleRandom: () => void;
  loading: boolean;
}

export interface GridProps {
  grid: string[][];
  words: string[];
  foundWords: Set<string>;
  wordPositions: Map<string, string[]>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
}

export interface CheckWordProps {
  selectedCells: Set<string>;
  words: string[];
  wordPositions: Map<string, string[]>;
  foundWords: Set<string>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
  setFoundCells: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export interface UseWordSelectionProps {
  words: string[];
  wordPositions: Map<string, string[]>;
  foundWords: Set<string>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
  setFoundCells: React.Dispatch<React.SetStateAction<Set<string>>>;
  gridKey: string | number;
}

export interface GridCellProps {
  row: number;
  col: number;
  cell: string;
  isSelected: boolean;
  isFound: boolean;
}

export interface GridRowProps {
  rowIndex: number;
  row: string[];
  selectedCells: Set<string>;
  foundCells: Set<string>;
}

export interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export interface WordListProps {
  words: string[];
  foundWords: Set<string>;
}
