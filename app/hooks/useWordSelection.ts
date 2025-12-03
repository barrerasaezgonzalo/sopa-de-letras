"use client";

import { useCallback, useState, useEffect } from "react";
import { getCellKey, getCellsInLine, checkWord } from "@/app/utils";

interface UseWordSelectionProps {
  words: string[];
  wordPositions: Map<string, string[]>;
  foundWords: Set<string>;
  setFoundWords: React.Dispatch<React.SetStateAction<Set<string>>>;
  setFoundCells: React.Dispatch<React.SetStateAction<Set<string>>>;
  gridKey: string | number; // sirve para resetear cuando la grilla cambia
}

export function useWordSelection({
  words,
  wordPositions,
  foundWords,
  setFoundWords,
  setFoundCells,
  gridKey,
}: UseWordSelectionProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [won, setWon] = useState(false);

  // Reset cuando cambia la grilla
  useEffect(() => {
    setSelectedCells(new Set());
    setIsSelecting(false);
    setFoundCells(new Set());
    setWon(false);
  }, [gridKey, setFoundCells]);

  const startSelection = useCallback((row: number, col: number) => {
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells(new Set([getCellKey(row, col)]));
  }, []);

  const updateSelection = useCallback(
    (row: number, col: number) => {
      if (isSelecting && startCell) {
        setSelectedCells(
          new Set(getCellsInLine(startCell.row, startCell.col, row, col)),
        );
      }
    },
    [isSelecting, startCell],
  );

  const endSelection = useCallback(() => {
    if (!isSelecting) return;

    const result = checkWord({
      selectedCells,
      words,
      wordPositions,
      foundWords,
      setFoundWords,
      setFoundCells,
    });

    if (result) setWon(true);

    setIsSelecting(false);
    setStartCell(null);
    setSelectedCells(new Set());
  }, [
    isSelecting,
    selectedCells,
    words,
    wordPositions,
    foundWords,
    setFoundWords,
    setFoundCells,
  ]);

  return {
    isSelecting,
    selectedCells,
    startSelection,
    updateSelection,
    endSelection,
    won,
    setWon,
  };
}
