import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

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
        url: "https://sopa-de-letras-delta.vercel.app/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#fa7e21" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
