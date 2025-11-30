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
  setTopic,
  setFoundWords,
  setGrid,
}: GridProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [showWinModal, setShowWinModal] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFoundCells(new Set());
    setSelectedCells(new Set());
    setIsSelecting(false);
    setStartCell(null);
  }, [grid]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isSelecting) e.preventDefault();
    };
    const el = gridRef.current;
    el?.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => el?.removeEventListener("touchmove", handleTouchMove);
  }, [isSelecting]);

  const startSelection = useCallback((row: number, col: number) => {
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells(new Set([getCellKey(row, col)]));
  }, []);

  const updateSelection = useCallback(
    (row: number, col: number) => {
      if (isSelecting && startCell) {
        setSelectedCells(
          new Set(getCellsInLine(startCell.row, startCell.col, row, col)),
        );
      }
    },
    [isSelecting, startCell],
  );

  const endSelection = useCallback(() => {
    if (!isSelecting) return;

    const won = checkWord({
      selectedCells,
      words,
      wordPositions,
      foundWords,
      setFoundWords,
      setFoundCells,
    });

    if (won) {
      setTimeout(() => setShowWinModal(true), 300);
    }

    setIsSelecting(false);
    setStartCell(null);
    setSelectedCells(new Set());
  }, [
    isSelecting,
    selectedCells,
    words,
    wordPositions,
    foundWords,
    setFoundWords,
  ]);

  if (!grid.length)
    return (
      <div className="w-full flex justify-center">
        <p className="text-[#FFFFFF]/80 text-lg max-w-[650px] text-center">
          Elige cualquier tema que te guste o genera uno aleatorio, y crea tu
          propia sopa de letras en segundos.
        </p>
      </div>
    );

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col sm:flex-row gap-6 w-full lg:max-w-[900px] justify-center items-start">
        {/* Lista de palabras */}
        <aside className="w-full sm:w-auto min-w-[120px] bg-white rounded p-4">
          <div className="flex flex-row flex-wrap gap-2 md:flex-col">
            {words.map((word, idx) => (
              <div
                key={idx}
                className="p-1 rounded text-center text-sm font-semibold"
                style={{
                  backgroundColor: foundWords.has(word)
                    ? WORD_COLORS.FOUND_BG
                    : WORD_COLORS.DEFAULT_BG,
                  color: foundWords.has(word)
                    ? WORD_COLORS.FOUND_TEXT
                    : WORD_COLORS.DEFAULT_TEXT,
                  textDecoration: foundWords.has(word)
                    ? "line-through"
                    : "none",
                }}
              >
                {word}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Encontradas:{" "}
            <span className="font-bold text-black">{foundWords.size}</span> /{" "}
            {words.length}
          </p>
        </aside>

        {/* Grid */}
        <div className="relative flex justify-center w-full md:w-auto">
          {showWinModal && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowWinModal(false)}
            >
              <div
                className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-3xl font-bold p-4 flex items-center justify-center">
                  <span>🚀</span> <span>¡Felicidades!</span>
                </h1>

                <p className="text-gray-700 mb-4 p-4 text-md">
                  ¡Encontraste todas las palabras!
                </p>

                <button
                  onClick={() => {
                    setShowWinModal(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setTopic("");
                    setGrid([]);
                    setFoundWords(new Set());
                  }}
                  className="bg-[#296885] text-white px-4 py-2 rounded font-bold border"
                >
                  ¿Lo intentas de nuevo?
                </button>
              </div>
            </div>
          )}

          <div
            ref={gridRef}
            className="block select-none overflow-x-auto md:overflow-visible"
            onMouseUp={endSelection}
            onMouseLeave={endSelection}
            style={{ touchAction: "none" }}
          >
            {grid.map((row, i) => (
              <div key={i} className="flex">
                {row.map((cell, j) => {
                  const key = getCellKey(i, j);
                  const isSelected = selectedCells.has(key);
                  const isFound = foundCells.has(key);

                  const bgColor = isFound
                    ? CELL_COLORS.FOUND
                    : isSelected
                      ? CELL_COLORS.SELECTED
                      : CELL_COLORS.DEFAULT;

                  return (
                    <div
                      key={j}
                      data-row={i}
                      data-col={j}
                      onMouseDown={() => startSelection(i, j)}
                      onMouseEnter={() => updateSelection(i, j)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        startSelection(i, j);
                      }}
                      onTouchMove={(e) => {
                        const touch = e.touches[0];
                        const el = document.elementFromPoint(
                          touch.clientX,
                          touch.clientY,
                        ) as HTMLElement | null;
                        if (el?.dataset?.row) {
                          updateSelection(
                            Number(el.dataset.row),
                            Number(el.dataset.col),
                          );
                        }
                      }}
                      onTouchEnd={endSelection}
                      className={`
                        w-10 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
                        flex items-center justify-center border border-gray-300 
                        text-base md:text-lg font-bold
                        ${!isSelected && !isFound ? "hover:bg-gray-200" : ""}
                      `}
                      style={{ backgroundColor: bgColor, touchAction: "none" }}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
