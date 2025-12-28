// components/GridRow.tsx
"use client";

import React from "react";
import { GridCell } from "./GridCell";
import { getCellKey } from "@/utils/wordSearch";
import { GridRowProps } from "@/types/types";

export const GridRow = React.memo(
  function GridRowComponent({
    rowIndex,
    row,
    selectedCells,
    foundCells,
  }: GridRowProps) {
    return (
      <div className="flex">
        {row.map((cell, colIndex) => {
          const key = getCellKey(rowIndex, colIndex);
          const isSelected = selectedCells.has(key);
          const isFound = foundCells.has(key);

          return (
            <GridCell
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              cell={cell}
              isSelected={isSelected}
              isFound={isFound}
            />
          );
        })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    for (let i = 0; i < prevProps.row.length; i++) {
      const key = getCellKey(prevProps.rowIndex, i);
      if (
        prevProps.selectedCells.has(key) !== nextProps.selectedCells.has(key) ||
        prevProps.foundCells.has(key) !== nextProps.foundCells.has(key)
      ) {
        return false;
      }
    }
    return true;
  },
);
