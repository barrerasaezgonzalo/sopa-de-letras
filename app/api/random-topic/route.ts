import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { MODEL } from "@/app/contants";

const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function GET() {
  const prompt = `
    Eres un asistente que genera un tema para un juego de sopa de letras.
    Solo responde con una palabra o frase corta (máximo 3 palabras) adecuada para todas las edades.
    No agregues explicaciones, numeración, comillas, puntos o caracteres especiales.
    Evita repetir temas anteriores.
    Devuelve únicamente el texto limpio.
    `;

  try {
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: "Dame un tema aleatorio.",
        },
      ],
      model: MODEL,
      temperature: 1.2,
      max_tokens: 10,
    });

    const topic =
      completion.choices[0]?.message?.content
        ?.trim()
        ?.replace(/[^\wáéíóúñü ]/gi, "")
        ?.toLowerCase() || "";

    if (!topic || topic.length < 3) {
      return NextResponse.json(
        { error: "No se pudo generar un tema válido" },
        { status: 500 },
      );
    }

    return NextResponse.json({ topic });
  } catch {
    return NextResponse.json(
      { error: "Error generando topic aleatorio" },
      { status: 500 },
    );
  }
}
