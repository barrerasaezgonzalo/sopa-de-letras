"use client";

import { useState } from "react";
import {
  fetchWordsFromTopic,
  fetchRandomTopic,
  generateGridPure,
} from "@/utils/wordSearch";

export function useWordSearch() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Map<string, string[]>>(
    new Map(),
  );
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");

  const handleGenerate = async (newTopic: string) => {
    if (!newTopic.trim()) return;

    setGrid([]);
    setWords([]);
    setWordPositions(new Map());
    setFoundWords(new Set());
    setLoading(true);

    try {
      const fetchedWords = await fetchWordsFromTopic(newTopic);
      const {
        grid: newGrid,
        words: placedWords,
        wordPositions: positions,
      } = generateGridPure(fetchedWords);
      setGrid(newGrid);
      setWords(placedWords);
      setWordPositions(positions);
    } catch (err) {
      console.error("Error al generar palabras:", err);
      alert(`Error: ${err instanceof Error ? err.message : "desconocido"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    try {
      const randomTopic = await fetchRandomTopic();
      setTopic(randomTopic);
      await handleGenerate(randomTopic);
    } catch (err) {
      console.error("Error en handleRandom:", err);
    }
  };

  return {
    grid,
    words,
    wordPositions,
    foundWords,
    loading,
    topic,
    setTopic,
    setFoundWords,
    handleGenerate,
    handleRandom,
    setGrid,
    setWords,
    setWordPositions,
  };
}
