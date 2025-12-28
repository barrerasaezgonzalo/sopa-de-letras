"use client";

import { useCallback } from "react";
import Input from "@/components/input";
import Grid from "@/components/grid";
import Header from "@/components/header";
import { useWordSearch } from "./hooks/useWordSearch";

export default function WordSearchPage() {
  const {
    topic,
    setTopic,
    grid,
    words,
    wordPositions,
    foundWords,
    setFoundWords,
    loading,
    handleGenerate,
    handleRandom,
    setGrid,
  } = useWordSearch();

  const onGenerate = useCallback(() => {
    handleGenerate(topic);
  }, [handleGenerate, topic]);

  const onRandom = useCallback(() => {
    handleRandom();
  }, [handleRandom]);

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
