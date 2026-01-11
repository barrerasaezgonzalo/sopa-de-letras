import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { MODEL } from "@/app/contants";

const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function GET() {
  const prompt = `
    Eres un asistente que genera un tema para un juego de sopa de letras.
    Solo responde con una palabra adecuada para todas las edades.
    No agregues explicaciones, numeración, comillas, puntos o caracteres especiales.
    Evita repetir temas anteriores.
    Devuelve únicamente el texto limpio.
    `;

  try {
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres un generador de vocabulario especializado en juegos de lógica. 
        Tu objetivo es proporcionar una palabra para una sopa de letras desafiante.
        
        REGLAS ESTRICTAS:
        1. Genera exactamente 1 palabras.
        2. La palabra debe tener entre 4 y 12 caracteres.
        3. Evita términos ultra-genéricos; busca sustantivos interesantes o términos técnicos.
        4. NO uses tildes ni caracteres especiales (ñ, á, é, etc.) para evitar bugs en la cuadrícula.
        5. No incluyas explicaciones, solo las palabras separadas por comas.
        6. CRUCIAL: Introduce variedad semántica. Si el tema es común, busca términos menos frecuentes.`,
        },
        {
          role: "user",
          content: `Tema: Aleatorio, Genera 1 palabra únicas y variada. Semilla de aleatoriedad: ${Math.random()}`,
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
