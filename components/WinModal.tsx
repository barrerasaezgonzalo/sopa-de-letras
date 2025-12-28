// components/WinModal.tsx
"use client";

import { WinModalProps } from "@/types/types";
import React from "react";

export const WinModal: React.FC<WinModalProps> = ({
  isOpen,
  onClose,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
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
          onClick={onRetry}
          className="bg-[#FFB300] text-white px-4 py-2 rounded font-bold border"
        >
          ¿Lo intentas de nuevo?
        </button>
      </div>
    </div>
  );
};
