// components/WordList.tsx
"use client";

import React from "react";
import { WORD_COLORS } from "@/app/contants";

interface WordListProps {
  words: string[];
  foundWords: Set<string>;
}

export const WordList = React.memo(({ words, foundWords }: WordListProps) => {
  return (
    <aside className="w-full sm:w-auto min-w-[120px] bg-[#45809c] rounded p-4">
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
              textDecoration: foundWords.has(word) ? "line-through" : "none",
            }}
          >
            {word}
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-white/80">
        Encontradas:{" "}
        <span className="font-bold text-white">{foundWords.size}</span> /{" "}
        {words.length}
      </p>
    </aside>
  );
});
