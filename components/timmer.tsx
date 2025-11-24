import { TimmerProps } from "@/app/types";
import { formatTime } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Timmer({ grid, words, foundWords }: TimmerProps) {
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Cargar mejor tiempo
  useEffect(() => {
    const saved = localStorage.getItem("bestTime");
    if (saved) setBestTime(parseInt(saved));
  }, []);

  // Iniciar timer cuando se genera la grilla
  useEffect(() => {
    if (grid.length > 0 && words.length > 0) {
      setIsTimerRunning(true);
      setElapsedTime(0);
    }
  }, [grid, words]);

  // Detener timer al completar el juego
  useEffect(() => {
    if (foundWords.size > 0 && foundWords.size === words.length) {
      setIsTimerRunning(false);

      if (bestTime === null || elapsedTime < bestTime) {
        setBestTime(elapsedTime);
        localStorage.setItem("bestTime", elapsedTime.toString());
      }
    }
  }, [foundWords, words, elapsedTime, bestTime]);

  // Incremento cada segundo
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    grid.length > 0 && (
      <div className="flex items-center justify-center gap-6 p-4 max-w-md mx-auto mt-4 mb-4">
        {/* Tiempo actual */}
        <div className="flex items-center gap-2 text-gray-800">
          <span className="text-2xl">⏱️</span>
          <span className="font-semibold">Tiempo:</span>
          <span className="text-lg font-mono">{formatTime(elapsedTime)}</span>
        </div>

        {/* Mejor tiempo */}
        {bestTime !== null && (
          <div className="flex items-center gap-2 text-green-700">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold">Mejor:</span>
            <span className="text-lg font-mono">{formatTime(bestTime)}</span>
          </div>
        )}
      </div>
    )
  );
}
