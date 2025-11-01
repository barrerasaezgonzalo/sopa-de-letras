import Image from "next/image";

export default function Banner() {
  return (
    <>
      <div className="banner-wrapper">
        <h1>
          <Image
            src="/logo.png"
            alt="Logo de Sopa de Letras"
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              verticalAlign: "middle",
            }}
          />{" "}
          SOPA DE LETRAS
        </h1>
        <div className="banner-subtitle">
          <p>Encuentra todas las palabras</p>
        </div>
      </div>
    </>
  );
}
