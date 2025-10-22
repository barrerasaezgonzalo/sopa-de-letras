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
    <div className="search">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ingresa un tema (ej: animales, países, deportes...)"
        disabled={loading}
      />
      <button onClick={handleGenerate} disabled={loading || !topic.trim()}>
        {loading ? ".." : "📝"}
      </button>
    </div>
  );
}
