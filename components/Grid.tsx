"use client";

import { GridProps } from "@/app/types";
import { checkWord, getCellKey, getCellsInLine } from "@/app/utils";
import { useEffect, useState, useCallback, useRef } from "react";
import { CELL_COLORS, WORD_COLORS } from "@/app/contants";

export default function Grid({
  grid,
  words,
  foundWords,
  wordPositions,
  setFoundWords,
}: GridProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [showWinModal, setShowWinModal] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFoundCells(new Set());
    setSelectedCells(new Set());
    setIsSelecting(false);
    setStartCell(null);
  }, [grid]);

  // 🔥 Prevenir scroll durante la selección
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isSelecting) {
        e.preventDefault();
      }
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener("touchmove", preventScroll);
      }
    };
  }, [isSelecting]);

  // ==== Handlers comunes (funcionan para mouse y touch) ====

  const startSelection = useCallback((row: number, col: number) => {
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells(new Set([getCellKey(row, col)]));
  }, []);

  const updateSelection = useCallback(
    (row: number, col: number) => {
      if (isSelecting && startCell) {
        const cellsInLine = getCellsInLine(
          startCell.row,
          startCell.col,
          row,
          col,
        );
        setSelectedCells(new Set(cellsInLine));
      }
    },
    [isSelecting, startCell],
  );

  const endSelection = useCallback(() => {
    if (isSelecting) {
      const won = checkWord({
        selectedCells,
        words,
        wordPositions,
        foundWords,
        setFoundWords,
        setFoundCells,
      });

      if (won) {
        setTimeout(() => {
          setShowWinModal(true);
        }, 300);
      }

      setIsSelecting(false);
      setStartCell(null);
      setSelectedCells(new Set());
    }
  }, [
    isSelecting,
    selectedCells,
    words,
    wordPositions,
    foundWords,
    setFoundWords,
  ]);

  if (grid.length === 0) return null;

  // ==== Render ====
  return (
    <div className="grid">
      <div
        ref={gridRef}
        className="blocks"
        onMouseUp={endSelection}
        onMouseLeave={endSelection}
        style={{ touchAction: "none" }}
      >
        {grid.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => {
              const cellKey = getCellKey(i, j);
              const isSelected = selectedCells.has(cellKey);
              const isFound = foundCells.has(cellKey);

              let bgColor = CELL_COLORS.DEFAULT;
              if (isFound) bgColor = CELL_COLORS.FOUND;
              else if (isSelected) bgColor = CELL_COLORS.SELECTED;

              return (
                <div
                  key={j}
                  className="letter select-none"
                  style={{
                    backgroundColor: bgColor,
                    touchAction: "none",
                  }}
                  // 🖱️ Eventos de mouse
                  onMouseDown={() => startSelection(i, j)}
                  onMouseEnter={() => updateSelection(i, j)}
                  // 📱 Eventos de touch (para móviles)
                  onTouchStart={(e) => {
                    startSelection(i, j);
                  }}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(
                      touch.clientX,
                      touch.clientY,
                    ) as HTMLElement | null;
                    if (element?.dataset?.row && element?.dataset?.col) {
                      updateSelection(
                        parseInt(element.dataset.row),
                        parseInt(element.dataset.col),
                      );
                    }
                  }}
                  onTouchEnd={endSelection}
                  // dataset para reconocer posición al mover el dedo
                  data-row={i}
                  data-col={j}
                  onMouseOver={(e) => {
                    if (!isSelected && !isFound) {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected && !isFound) {
                      e.currentTarget.style.backgroundColor = bgColor;
                    }
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lista de palabras */}
      <div className="words-container">
        <h2>Palabras a encontrar</h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {words.map((word, idx) => (
            <div
              key={idx}
              className="word"
              style={{
                backgroundColor: foundWords.has(word)
                  ? WORD_COLORS.FOUND_BG
                  : WORD_COLORS.DEFAULT_BG,
                color: foundWords.has(word)
                  ? WORD_COLORS.FOUND_TEXT
                  : WORD_COLORS.DEFAULT_TEXT,
                textDecoration: foundWords.has(word) ? "line-through" : "none",
              }}
            >
              {word}
            </div>
          ))}
        </div>
        <div className="footer">
          <p>
            Encontradas: <span>{foundWords.size}</span> / {words.length}
          </p>
        </div>
      </div>
      {showWinModal && (
        <div
          className="win-modal-overlay"
          onClick={() => setShowWinModal(false)}
        >
          <div className="win-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confetti">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti-piece" />
              ))}
            </div>
            <h1>🚀 ¡Felicidades! 🤟 </h1>
            <p>¡Encontraste todas las palabras!</p>
            <button
              onClick={() => setShowWinModal(false)}
              className="win-button"
            >
              ¿Lo itengas denuevo para superar tu reccord?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
