export type Direction = { dx: number; dy: number };

export interface InputProps {
    topic: string;
    setTopic: (value: string) => void;
    handleGenerate: () => void;
    loading: boolean;
}

export interface GridProps {
    grid: string[][];
    words: string[];
    foundWords: Set<string>;
    wordPositions: Map<string, string[]>;
    setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export interface CheckWordProps {
  selectedCells: Set<string>; 
  words: string[];
  wordPositions: Map<string, string[]>;
  foundWords: Set<string>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
 setFoundCells: React.Dispatch<React.SetStateAction<Set<{ row: number; col: number; direction: string }>>>;
}