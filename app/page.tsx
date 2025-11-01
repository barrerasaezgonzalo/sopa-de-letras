"use client";

import { useCallback, useState } from "react";
import { handleGenerate } from "./utils";
import Input from "@/components/input";
import Grid from "@/components/grid";
import Banner from "@/components/header";
import Timmer from "@/components/timmer";
import Link from "next/link";
import Image from "next/image";

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
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          opacity: 0.9,
          fontSize: "1rem",
        }}
      >
        <p>Creado a las 3 AM cuando el café ya no hacía efecto ☕💻</p>

        <Link href="https://chilehub.cl">
          <Image
            src="/chilehub.png"
            alt="Logo de Sopa de Letras"
            width={200}
            height={80}
            style={{
              width: "200px",
              height: "80px",
              objectFit: "contain",
              marginTop: "1rem",
            }}
          />
        </Link>
      </footer>
    </div>
  );
}
