import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { MODEL } from "@/app/contants";

const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

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
          content: `Eres un generador de vocabulario especializado en juegos de lógica. 
          Tu objetivo es proporcionar palabras para una sopa de letras desafiante.
          
          REGLAS ESTRICTAS:
          1. Genera exactamente 10 palabras.
          2. Las palabras deben tener entre 4 y 12 caracteres.
          3. Evita términos ultra-genéricos; busca sustantivos interesantes o términos técnicos.
          4. NO uses tildes ni caracteres especiales (ñ, á, é, etc.) para evitar bugs en la cuadrícula.
          5. No incluyas explicaciones, solo las palabras separadas por comas.
          6. CRUCIAL: Introduce variedad semántica. Si el tema es común, busca términos menos frecuentes.`,
        },
        {
          role: "user",
          content: `Tema: "${topic}". Genera 10 palabras únicas y variadas. Semilla de aleatoriedad: ${Math.random()}`,
        },
      ],
      model: MODEL,
      temperature: 0.9,
      max_tokens: 100,
    });

    const text = completion.choices[0]?.message?.content || "";

    const words = text
      .split(/[,\n;]/)
      .map((word) =>
        word
          .trim()
          .replace(/^\d+[\.\-\)]\s*/, "")
          .replace(/[^\wáéíóúñü]/gi, "")
          .toLowerCase(),
      )
      .filter((word) => word.length >= 3 && word.length <= 12)
      .filter((word, index, self) => self.indexOf(word) === index)
      .slice(0, 10);

    if (words.length < 5) {
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
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Error desconocido al generar palabras";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
