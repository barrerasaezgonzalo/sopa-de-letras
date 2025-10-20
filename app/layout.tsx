import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sopa de Letras",
  description: "Juego de sopa de letras con palabras generadas por IA",
  manifest: "/manifest.json",
  themeColor: "#3AAEAB",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sopa de Letras",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* ✅ Agregar esto */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3AAEAB" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
