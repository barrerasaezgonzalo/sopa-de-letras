// components/Banner.tsx
import Image from "next/image";

export default function Banner() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo de Sopa de Letras"
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-contain inline-block align-middle"
        />
        SOPA DE LETRAS
      </h1>

      <div className="mb-4">
        <p className="text-lg text-gray-700 mt-4">
          Encuentra todas las palabras
        </p>
      </div>
    </div>
  );
}
