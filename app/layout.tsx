import "./globals.css";

export const metadata = {
  title: "Sopa de Letras",
  description: "Generador de sopas de letras con IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
