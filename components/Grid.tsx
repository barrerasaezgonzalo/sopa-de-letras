"use client";

import { GridProps } from "@/app/types";
import { checkWord, getCellKey, getCellsInLine } from "@/app/utils";
import { useEffect, useState, useCallback } from "react";
import { CELL_COLORS, WORD_COLORS } from "@/app/contants";

export default function Grid({
  grid,
  words,
  foundWords,
  wordPositions,
  setFoundWords,
}: GridProps) {
  /* ============================================
     ESTADOS
     ============================================ */
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());

  /* ============================================
     EFECTOS
     ============================================ */

  /**
   * Resetea los estados cuando cambia la grilla (nueva partida)
   */
  useEffect(() => {
    setFoundCells(new Set());
    setSelectedCells(new Set());
    setIsSelecting(false);
    setStartCell(null);
  }, [grid]);

  /* ============================================
     HANDLERS DE INTERACCIÓN
     ============================================ */

  /**
   * Inicia la selección de celdas al hacer click
   */
  const handleMouseDown = useCallback((row: number, col: number) => {
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells(new Set([getCellKey(row, col)]));
  }, []);

  /**
   * Actualiza la selección mientras el mouse se mueve
   */
  const handleMouseEnter = useCallback(
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

  /**
   * Finaliza la selección y verifica si se encontró una palabra
   */
  const handleMouseUp = useCallback(() => {
    if (isSelecting) {
      checkWord({
        selectedCells,
        words,
        wordPositions,
        foundWords,
        setFoundWords,
        setFoundCells,
      });
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

  /* ============================================
     RENDERIZADO CONDICIONAL
     ============================================ */

  // No renderizar nada si no hay grilla
  if (grid.length === 0) {
    return null;
  }

  /* ============================================
     RENDERIZADO PRINCIPAL
     ============================================ */

  return (
    <div className="grid">
      {/* Grilla de letras */}
      <div className="blocks">
        <div onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          {grid.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => {
                const cellKey = getCellKey(i, j);
                const isSelected = selectedCells.has(cellKey);
                const isFound = foundCells.has(cellKey);

                // Determinar color de fondo
                let bgColor = CELL_COLORS.DEFAULT;
                if (isFound) {
                  bgColor = CELL_COLORS.FOUND;
                } else if (isSelected) {
                  bgColor = CELL_COLORS.SELECTED;
                }

                return (
                  <div
                    key={j}
                    className="letter"
                    onMouseDown={() => handleMouseDown(i, j)}
                    onMouseEnter={() => handleMouseEnter(i, j)}
                    style={{ backgroundColor: bgColor }}
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
      </div>

      {/* Lista de palabras */}
      <div className="words-container">
        <h2>Palabras a encontrar</h2>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {words.map((word, idx) => {
            const isWordFound = foundWords.has(word);

            return (
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
                  textDecoration: foundWords.has(word)
                    ? "line-through"
                    : "none",
                }}
              >
                {word}
              </div>
            );
          })}
        </div>

        {/* Footer con contador */}
        <div className="footer">
          <p>
            Encontradas: <span>{foundWords.size}</span> / {words.length}
          </p>
        </div>
      </div>
    </div>
  );
}
