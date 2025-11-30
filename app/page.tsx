"use client";

import { useCallback, useState } from "react";
import { handleGenerate, handleRandom } from "./utils";
import Input from "@/components/input";
import Grid from "@/components/grid";
import Header from "@/components/header";

export default function WordSearchPage() {
  const [topic, setTopic] = useState("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Map<string, string[]>>(
    new Map(),
  );
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const onGenerate = useCallback(() => {
    handleGenerate(
      topic,
      setLoading,
      setWords,
      setWordPositions,
      setGrid,
      setFoundWords,
    );
  }, [topic]);

  const onRandom = useCallback(() => {
    handleRandom(
      setTopic,
      setLoading,
      setWords,
      setWordPositions,
      setGrid,
      setFoundWords,
    );
  }, [
    setTopic,
    setLoading,
    setWords,
    setWordPositions,
    setGrid,
    setFoundWords,
  ]);

  return (
    <div className="min-h-screen font-mono text-black bg-[#296885]">
      <div className="max-w-[1200px] mx-auto p-4">
        <Header />
        <Input
          topic={topic}
          setTopic={setTopic}
          handleGenerate={onGenerate}
          handleRandom={onRandom}
          loading={loading}
        />
        <Grid
          grid={grid}
          words={words}
          foundWords={foundWords}
          wordPositions={wordPositions}
          setFoundWords={setFoundWords}
          setTopic={setTopic}
          setGrid={setGrid}
        />
      </div>
    </div>
  );
}
