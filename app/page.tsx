'use client';

import { useState } from 'react';
import { handleGenerate } from './utils';
import Input from '@/components/Input';
import Grid from '@/components/Grid';

export default function WordSearchPage() {
  const [topic, setTopic] = useState('');
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [wordPositions, setWordPositions] = useState<Map<string, string[]>>(new Map());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [, setFoundCells] = useState<Set<string>>(new Set());
  const [, setSelectedCells] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  return (
    <div className="contenedor">
      <div className="main">

        <h1>🥣 SOPA DE LETRAS</h1>

        <Input
          topic={topic}
          setTopic={setTopic}
          handleGenerate={() => handleGenerate(
            topic,
            setLoading,
            setWords,
            setWordPositions,
            setGrid,
            setFoundCells,
            setFoundWords,
            setSelectedCells
          )}
          loading={loading}
        />

        <Grid
          grid={grid}
          words={words}
          foundWords={foundWords}
          wordPositions={wordPositions}
          setFoundWords={setFoundWords}
        />

      </div>
    </div>
  );
}