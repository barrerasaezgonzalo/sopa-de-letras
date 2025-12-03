"use client";

import { GridProps } from "@/app/types";
import { useRef, useState, useEffect } from "react";
import { useWordSelection } from "@/app/hooks/useWordSelection";
import { GridRow } from "@/components/GridRow";
import { WordList } from "@/components/WordList";
import { WinModal } from "@/components/WinModal";

export default function Grid({
  grid,
  words,
  foundWords,
  wordPositions,
  setTopic,
  setFoundWords,
  setGrid,
}: GridProps) {
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [showWinModal, setShowWinModal] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const {
    isSelecting,
    selectedCells,
    startSelection,
    updateSelection,
    endSelection,
    won,
  } = useWordSelection({
    words,
    wordPositions,
    foundWords,
    setFoundWords,
    setFoundCells,
    gridKey: grid.join(","),
  });

  useEffect(() => {
    if (won) {
      const timeout = setTimeout(() => setShowWinModal(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [won]);

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
        <WordList words={words} foundWords={foundWords} />

        {/* Grid */}
        <div className="relative flex justify-center w-full md:w-auto">
          <WinModal
            isOpen={showWinModal}
            onClose={() => setShowWinModal(false)}
            onRetry={() => {
              setShowWinModal(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTopic("");
              setGrid([]);
              setFoundWords(new Set());
            }}
          />

          {/* Contenedor de la grilla con eventos de selección */}
          <div
            ref={gridRef}
            className="block select-none overflow-x-auto md:overflow-visible"
            onMouseDown={(e) => {
              const el = e.target as HTMLElement;
              if (el.dataset.row && el.dataset.col)
                startSelection(+el.dataset.row, +el.dataset.col);
            }}
            onMouseMove={(e) => {
              if (!isSelecting) return;
              const el = document.elementFromPoint(
                e.clientX,
                e.clientY,
              ) as HTMLElement | null;
              if (el?.dataset.row && el?.dataset.col)
                updateSelection(+el.dataset.row, +el.dataset.col);
            }}
            onMouseUp={endSelection}
            onMouseLeave={endSelection}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const el = document.elementFromPoint(
                touch.clientX,
                touch.clientY,
              ) as HTMLElement | null;
              if (el?.dataset.row && el?.dataset.col)
                startSelection(+el.dataset.row, +el.dataset.col);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const el = document.elementFromPoint(
                touch.clientX,
                touch.clientY,
              ) as HTMLElement | null;
              if (el?.dataset.row && el?.dataset.col)
                updateSelection(+el.dataset.row, +el.dataset.col);
            }}
            onTouchEnd={endSelection}
            style={{ touchAction: "none" }}
          >
            {grid.map((row, i) => (
              <GridRow
                key={i}
                rowIndex={i}
                row={row}
                selectedCells={selectedCells}
                foundCells={foundCells}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
