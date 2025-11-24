"use client";

import { useCallback, useState } from "react";
import { handleGenerate } from "./utils";
import Input from "@/components/input";
import Grid from "@/components/grid";
import Banner from "@/components/header";
import Timmer from "@/components/timmer";

export default function WordSearchPage() {
  const [topic, setTopic] = useState("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Map<string, string[]>>(
    new Map(),
  );
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  // const [, setFoundCells] = useState<Set<string>>(new Set());
  // const [, setSelectedCells] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const onGenerate = useCallback(() => {
    handleGenerate(
      topic,
      setLoading,
      setWords,
      setWordPositions,
      setGrid,
      // setFoundCells,
      setFoundWords,
      // setSelectedCells,
    );
  }, [topic]);

  return (
    <div className="min-h-screen font-mono text-black">
      <div className="max-w-[1200px] mx-auto p-4">
        <Banner />
        <Input
          topic={topic}
          setTopic={setTopic}
          handleGenerate={onGenerate}
          loading={loading}
        />

        <Timmer grid={grid} words={words} foundWords={foundWords} />

        <Grid
          grid={grid}
          words={words}
          foundWords={foundWords}
          wordPositions={wordPositions}
          setFoundWords={setFoundWords}
          setTopic={setTopic}
        />
      </div>
    </div>
  );
}
