// types.ts

/**
 * Representa una dirección en la grilla (horizontal, vertical, diagonal)
 */
export type Direction = {
  dx: number;
  dy: number;
};

/**
 * Props para el componente Input
 */
export interface InputProps {
  topic: string;
  setTopic: (value: string) => void;
  handleGenerate: () => void;
  loading: boolean;
}

/**
 * Props para el componente Grid
 */
export interface GridProps {
  grid: string[][];
  words: string[];
  foundWords: Set<string>;
  wordPositions: Map<string, string[]>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
}

/**
 * Props para la función checkWord
 */
export interface CheckWordProps {
  selectedCells: Set<string>;
  words: string[];
  wordPositions: Map<string, string[]>;
  foundWords: Set<string>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
  setFoundCells: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export interface TimmerProps {
  grid: string[][];
  words: string[];
  foundWords: Set<string>;
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}
