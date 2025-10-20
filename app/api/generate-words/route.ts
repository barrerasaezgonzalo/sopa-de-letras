import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    if (!topic) {
      return NextResponse.json(
        { error: "Debe proporcionar un tema" },
        { status: 400 },
      );
    }

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Genera exactamente 10 palabras relacionadas con el tema: "${topic}". 
        Responde SOLAMENTE con las palabras separadas por comas, sin números, sin guiones, sin explicaciones.
        Ejemplo de respuesta: perro, gato, elefante, león, tigre, jirafa, cebra, mono, oso, águila`,
        },
      ],
      model: "llama-3.3-70b-versatile", // Cambiado a un modelo más confiable
      temperature: 0.8,
    });

    const text = completion.choices[0]?.message?.content || "";
    console.log("Respuesta de la API:", text); // Para debugging

    // Limpiar y procesar las palabras
    const words = text
      .split(/[,\n]/) // Separar por comas o saltos de línea
      .map((word) => word.trim().replace(/^\d+[\.\-\)]\s*/, "")) // Remover números al inicio
      .filter((word) => word.length > 2 && word.length < 15) // Filtrar palabras muy cortas o largas
      .slice(0, 10); // Tomar máximo 10 palabras

    console.log("Palabras procesadas:", words); // Para debugging

    if (words.length === 0) {
      return NextResponse.json(
        { error: "No se generaron palabras válidas" },
        { status: 500 },
      );
    }

    return NextResponse.json({ words });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error generando palabras:", err);
    return NextResponse.json(
      { error: err.message || "Error generando palabras" },
      { status: 500 },
    );
  }
}
