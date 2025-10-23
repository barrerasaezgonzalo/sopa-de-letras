"use client";

import { useCallback, useState } from "react";
import { handleGenerate } from "./utils";
import Input from "@/components/Input";
import Grid from "@/components/Grid";
import Banner from "@/components/header";
import InstallPrompt from "@/components/InstallPrompt";
import Timmer from "@/components/timmer";

export default function WordSearchPage() {
  const [topic, setTopic] = useState("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Map<string, string[]>>(
    new Map(),
  );
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [, setFoundCells] = useState<Set<string>>(new Set());
  const [, setSelectedCells] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const onGenerate = useCallback(() => {
    handleGenerate(
      topic,
      setLoading,
      setWords,
      setWordPositions,
      setGrid,
      setFoundCells,
      setFoundWords,
      setSelectedCells,
    );
  }, [topic]);

  return (
    <div className="contenedor">
      <div className="main">
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
        />
        <InstallPrompt />
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          opacity: 0.9,
          fontSize: "1rem",
        }}
      >
        Creado a las 3 AM cuando el café ya no hacía efecto ☕💻
      </footer>
    </div>
  );
}
