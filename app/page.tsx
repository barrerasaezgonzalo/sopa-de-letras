"use client";

import { useCallback, useEffect, useState } from "react";
import { handleGenerate } from "./utils";
import Input from "@/components/Input";
import Grid from "@/components/Grid";
import Banner from "@/components/header";
import InstallPrompt from "@/components/InstallPrompt";

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

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  // ✅ AGREGAR: Cargar mejor tiempo al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("bestTime");
    if (saved) {
      setBestTime(parseInt(saved));
    }
  }, []);

  // ✅ Iniciar timer cuando se genera la grilla
  useEffect(() => {
    if (grid.length > 0 && words.length > 0) {
      setIsTimerRunning(true);
      setElapsedTime(0);
    }
  }, [grid, words]);

  // ✅ Detener timer cuando se completa el juego
  useEffect(() => {
    if (foundWords.size > 0 && foundWords.size === words.length) {
      setIsTimerRunning(false);

      if (bestTime === null || elapsedTime < bestTime) {
        setBestTime(elapsedTime);
        localStorage.setItem("bestTime", elapsedTime.toString());
      }
    }
  }, [foundWords, words, elapsedTime, bestTime]);

  // ✅ Incrementar tiempo cada segundo
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // ✅ Formatear tiempo a MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

        {/* ✅ Mostrar timer */}
        {grid.length > 0 && (
          <div className="timer-container">
            <div className="timer-current">
              <span className="timer-icon">⏱️</span>
              <span className="timer-label">Tiempo:</span>
              <span className="timer-value">{formatTime(elapsedTime)}</span>
            </div>

            {bestTime !== null && (
              <>
                <div className="timer-best">
                  <span className="timer-icon">🏆</span>
                  <span className="timer-label">Mejor:</span>
                  <span className="timer-value">{formatTime(bestTime)}</span>
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("bestTime");
                    setBestTime(null);
                  }}
                  className="reset-best-time"
                  title="Resetear récord"
                >
                  🔄
                </button>
              </>
            )}
          </div>
        )}

        <Grid
          grid={grid}
          words={words}
          foundWords={foundWords}
          wordPositions={wordPositions}
          setFoundWords={setFoundWords}
        />
      </div>
      <InstallPrompt />
    </div>
  );
}
