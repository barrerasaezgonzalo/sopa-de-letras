// components/Banner.tsx
import Image from "next/image";

export default function Banner() {
  return (
    <div className="banner-wrapper">
      <Image
        src="/banner.svg"
        alt="Sopa de Letras Banner"
        width={1200}
        height={200}
        priority
        className="image"
      />
    </div>
  );
}
