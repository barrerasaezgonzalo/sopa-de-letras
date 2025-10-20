// components/Banner.tsx
import Image from "next/image";

const bannerStyles = {
  wrapper: {
    width: "100%",
    maxWidth: "1025px",
    margin: "0 auto 1rem 0",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "1rem",
    display: "block",
  },
};

export default function Banner() {
  return (
    <div style={bannerStyles.wrapper}>
      <Image
        src="/banner.svg"
        alt="Sopa de Letras Banner"
        width={1200}
        height={200}
        priority
        style={bannerStyles.image}
      />
    </div>
  );
}
