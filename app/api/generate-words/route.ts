import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    // Validación del topic
    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Debe proporcionar un tema válido" },
        { status: 400 },
      );
    }

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente que genera exactamente 10 palabras relacionadas con un tema. Solo respondes con palabras separadas por comas, sin números, sin puntos, sin explicaciones.",
        },
        {
          role: "user",
          content: `Tema: "${topic}". Genera 10 palabras relacionadas.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7, // Bajado un poco para respuestas más consistentes
      max_tokens: 100, // Limitar tokens para respuestas más cortas
    });

    const text = completion.choices[0]?.message?.content || "";
    // console.log("Respuesta de la API:", text);

    // Limpiar y procesar las palabras
    const words = text
      .split(/[,\n;]/) // Separar por comas, saltos de línea o punto y coma
      .map((word) =>
        word
          .trim()
          .replace(/^\d+[\.\-\)]\s*/, "") // Remover números al inicio
          .replace(/[^\wáéíóúñü]/gi, "") // Remover caracteres especiales, mantener acentos
          .toLowerCase(),
      )
      .filter((word) => word.length >= 3 && word.length <= 12) // Palabras entre 3 y 12 caracteres
      .filter((word, index, self) => self.indexOf(word) === index) // Remover duplicados
      .slice(0, 10); // Máximo 10 palabras

    // console.log("Palabras procesadas:", words);

    if (words.length < 5) {
      // Al menos 5 palabras para que sea jugable
      return NextResponse.json(
        {
          error:
            "No se generaron suficientes palabras válidas. Intenta con otro tema.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ words });
  } catch (err: unknown) {
    console.error("Error generando palabras:", err);

    // Mejor manejo de errores
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Error desconocido al generar palabras";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
