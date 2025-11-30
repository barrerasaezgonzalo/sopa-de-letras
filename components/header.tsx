import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="text-center p-6 rounded text-[#FFFFFF]/80">
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
      >
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-4 mb-2">
          <Image
            src="/logo.png"
            alt="Logo de Sopa de Letras"
            width={80}
            height={80}
            className="object-contain"
          />
          SOPA DE LETRAS
        </h1>
      </Link>
      <p className="text-lg mt-4">Encuentra todas las palabras!</p>
    </div>
  );
}
