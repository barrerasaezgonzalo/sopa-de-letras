"use client";

import React from "react";
import { CELL_COLORS } from "@/app/contants";
import { GridCellProps } from "@/types/types";

export const GridCell = React.memo(
  function GridCellComponent({
    row,
    col,
    cell,
    isSelected,
    isFound,
  }: GridCellProps) {
    const bgColor = isFound
      ? CELL_COLORS.FOUND
      : isSelected
        ? CELL_COLORS.SELECTED
        : CELL_COLORS.DEFAULT;

    return (
      <div
        data-row={row}
        data-col={col}
        className={`
          w-10 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
          flex items-center justify-center border border-[#296885] 
          text-base md:text-lg font-bold rounded 
          ${!isSelected && !isFound ? "hover:bg-[#FFD780]" : ""}
        `}
        style={{ backgroundColor: bgColor }}
      >
        {cell}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isFound === nextProps.isFound &&
    prevProps.cell === nextProps.cell,
);
