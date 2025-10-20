import { InputProps } from "@/app/types";

export default function Input({ topic, setTopic, handleGenerate, loading }: InputProps) {
    return (
        <div className="search">

            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Ingresa un tema (ej: animales, países, deportes...)"               
                disabled={loading}
            />
            <button
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}                
            >
                {loading ? 'Generando...' : '🎲 Generar'}
            </button>
        </div>
    );
}