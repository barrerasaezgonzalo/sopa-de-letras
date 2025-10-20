'use client';

import { GridProps } from "@/app/types";
import { checkWord, getCellKey, getCellsInLine } from "@/app/utils";
import { useEffect, useState } from "react";

export default function Grid({ grid, words, foundWords, wordPositions, setFoundWords }: GridProps) {
    const [isSelecting, setIsSelecting] = useState(false);
    const [startCell, setStartCell] = useState<{ row: number, col: number } | null>(null);
    const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
    const [foundCells, setFoundCells] = useState<Set<{ row: number; col: number; direction: string }>>(new Set());

     useEffect(() => {
        setFoundCells(new Set());
        setSelectedCells(new Set());
        setIsSelecting(false);
        setStartCell(null);
    }, [grid])
    
    const handleMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        setStartCell({ row, col });
        setSelectedCells(new Set([getCellKey(row, col)]));
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isSelecting && startCell) {
            const cellsInLine = getCellsInLine(startCell.row, startCell.col, row, col);
            setSelectedCells(new Set(cellsInLine));
        }
    };

    const handleMouseUp = () => {
        if (isSelecting) {
            checkWord({ selectedCells, words, wordPositions, foundWords, setFoundWords, setFoundCells });
            setIsSelecting(false);
            setStartCell(null);
            setSelectedCells(new Set());
        }
    };

    return (

        grid.length > 0 && (
            <div className="grid">
                <div className="blocks">
                    <div                        
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {grid.map((row, i) => (
                            <div key={i} className="flex">
                                {row.map((cell, j) => {
                                    const cellKey = getCellKey(i, j);
                                    const isSelected = selectedCells.has(cellKey);
                                    // @ts-expect-error lost color background on fix
                                    const isFound = foundCells.has(cellKey);

                                    let bgColor = '#ffffff';
                                    if (isFound) {
                                        bgColor = '#86efac';
                                    } else if (isSelected) {
                                        bgColor = '#fde047';
                                    }

                                    return (
                                        <div
                                            key={j}
                                            className="letter"
                                            onMouseDown={() => handleMouseDown(i, j)}
                                            onMouseEnter={() => handleMouseEnter(i, j)}
                                            style={{
                                                backgroundColor: bgColor,
                                            }}
                                            onMouseOver={(e) => {
                                                if (!isSelected && !isFound) {
                                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
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

                <div className="words-container">
                    <h2>Palabras a encontrar</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {words.map((word, idx) => (
                            <div
                                key={idx}
                                className="word"
                                style={{                                    
                                    backgroundColor: foundWords.has(word) ? '#dcfce7' : '#f3f4f6',
                                    color: foundWords.has(word) ? '#166534' : '#1f2937',
                                    textDecoration: foundWords.has(word) ? 'line-through' : 'none'
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
            </div>
        )

    )
}