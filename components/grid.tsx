// app/sopa-de-letras/Grid.tsx
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

  // Prevenir scroll durante selección táctil
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isSelecting) e.preventDefault();
    };
    const el = gridRef.current;
    if (el) el.addEventListener("touchmove", preventScroll, { passive: false });
    return () => el?.removeEventListener("touchmove", preventScroll);
  }, [isSelecting]);

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
        setTimeout(() => setShowWinModal(true), 300);
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

  if (grid.length === 0)
    return (
      <p className="text-gray-700 text-lg leading-relaxed">
        Elige cualquier tema que te guste y crea tu propia sopa de letras en
        segundos. 🎲 Las palabras aparecerán mezcladas en un mar de letras,
        listas para ser descubiertas. ¡Juega solo o desafía a alguien más para
        ver quién las encuentra primero! 🔥 Cada partida es distinta, así que no
        hay dos sopas iguales. 🧠
      </p>
    );

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row gap-6 max-w-[1200px] w-full justify-center items-start">
        {/* Lista de palabras */}
        <aside className="w-full md:w-64 bg-white shadow rounded p-4">
          <div className="flex flex-row flex-wrap gap-2">
            {words.map((word, idx) => (
              <div
                key={idx}
                className="p-2 rounded text-center font-semibold"
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

          <div className="mt-4 text-sm text-gray-600">
            <p>
              Encontradas:{" "}
              <span className="font-bold text-black">{foundWords.size}</span> /{" "}
              {words.length}
            </p>
          </div>
        </aside>

        {/* Grid + modal (el modal se posiciona fixed para que no rompa layout) */}
        <div className="relative  flex justify-center">
          {/* Modal ganador */}
          {showWinModal && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowWinModal(false)}
            >
              <div
                className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>¡Felicidades!</span>
                </h1>
                <p className="text-gray-700 mb-4">
                  ¡Encontraste todas las palabras!
                </p>
                <button
                  onClick={() => {
                    setShowWinModal(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setTopic("");
                  }}
                  className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow hover:shadow-md"
                >
                  ¿Lo intentas de nuevo?
                </button>
              </div>
            </div>
          )}

          {/* Grid */}
          <div
            ref={gridRef}
            className="inline-block select-none overflow-x-auto"
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
                      className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 text-base md:text-lg font-bold"
                      style={{ backgroundColor: bgColor, touchAction: "none" }}
                      onMouseDown={() => startSelection(i, j)}
                      onMouseEnter={() => updateSelection(i, j)}
                      onTouchStart={(e) => {
                        // evitar doble tap que dispare click del navegador
                        e.preventDefault();
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
                      data-row={i}
                      data-col={j}
                      onMouseOver={(e) => {
                        if (!isSelected && !isFound)
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = CELL_COLORS.HOVER;
                      }}
                      onMouseOut={(e) => {
                        if (!isSelected && !isFound)
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = bgColor;
                      }}
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
