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
          content:
            "Eres un asistente que genera exactamente 10 palabras relacionadas con un tema. Solo responde con palabras separadas por comas.",
        },
        {
          role: "user",
          content: `Tema: "${topic}". Genera 10 palabras relacionadas.`,
        },
      ],
      model: MODEL,
      temperature: 0.7,
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
