import { InputProps } from "@/app/types";
import { KeyboardEvent } from "react";

export default function Input({
  topic,
  setTopic,
  handleGenerate,
  handleRandom,
  loading,
}: InputProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && topic.trim()) {
      handleGenerate();
    }
  };

  const buttonStyles = `
  border
  border-[#FFFFFF]
  flex-1 md:flex-none
  px-4 py-3
  bg-[#296885]
  text-white/80 font-semibold
  rounded
  flex items-center justify-center
  disabled:opacity-60 disabled:cursor-not-allowed
  cursor-pointer
`;

  return (
    <div className="flex flex-col gap-4 mb-8 w-full md:items-center md:justify-center">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ingresa un tema (ej: libros, tecnología, cocina...)"
        disabled={loading}
        className="
          px-4 py-3
          text-lg
          border-2 border-[#FFFFFF]
          rounded
          focus:outline-none focus:ring-2 focus:ring-[#2376a3]
          transition-all
          w-full
          md:w-[600px]
          font-inherit
          disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60
          placeholder:text-white/60
          text-[#FFFFFF]/80
    "
      />

      <div className="flex flex-row gap-4 w-full md:w-auto">
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className={buttonStyles}
        >
          {loading ? ".." : "Generar"}
        </button>

        <button
          onClick={handleRandom}
          disabled={loading}
          className={buttonStyles}
        >
          Aleatorio
        </button>
      </div>
    </div>
  );
}
