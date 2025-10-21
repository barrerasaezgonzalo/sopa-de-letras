import { TimmerProps } from "@/app/types";
import { formatTime } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Timmer({ grid, words, foundWords }:TimmerProps) {

    const [bestTime, setBestTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // ✅ Cargar mejor tiempo al iniciar
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


    return (grid.length > 0 && (
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
                </>
            )}
        </div>
    ))
}