// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sopa de Letras",
  description: "Juego de sopa de letras con palabras generadas por IA",
  metadataBase: new URL("https://sopa-de-letras-delta.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://sopa-de-letras-delta.vercel.app/",
    title: "Sopa de Letras",
    description: "Juego de sopa de letras con palabras generadas por IA",
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
  },
  themeColor: "#fa7e21",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
