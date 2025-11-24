import { InputProps } from "@/app/types";
import { KeyboardEvent } from "react";

export default function Input({
  topic,
  setTopic,
  handleGenerate,
  loading,
}: InputProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && topic.trim()) {
      handleGenerate();
    }
  };

  return (
    <div className="flex gap-4 mb-8 justify-center">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ingresa un tema (ej: libros, tecnología, cocina...)"
        disabled={loading}
        className="
          px-2 py-2
          text-lg
          border-2 border-[#182329]
          outline-none
          transition-all
          w-full md:w-[600px]
          font-inherit
          disabled:bg-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-60
          placeholder:text-gray-400      
          box-border
        "
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !topic.trim()}
        className="
          px-2 py-2
          text-md 
          bg-[#2376a3]
          border-2 border-[#2376a3]
          text-white
          cursor-pointer
          transition-all
          whitespace-nowrap
          flex items-center gap-2
          font-inherit
          active:translate-y-0
          disabled:bg-[#4a6497] disabled:border-[#4a6497]
          disabled:cursor-not-allowed disabled:opacity-70
        "
      >
        {loading ? ".." : "Generar"}
      </button>
    </div>
  );
}
