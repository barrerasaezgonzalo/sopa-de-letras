import Link from "next/link";

export default function Header() {
  const letterStyle = `
    inline-block 
    border 
    border-white 
    p-2 
    text-2xl 
    md:p-4 
    md:text-4xl 
    bg-amber-300
    text-black
  `;

  return (
    <div className="text-center p-6 rounded text-[#FFFFFF]/80">
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
      >
        <h1 className="flex flex-wrap flex-w items-center justify-center gap-2 mb-2">
          <span className={letterStyle}>S</span>
          <span className={letterStyle}>O</span>
          <span className={letterStyle}>P</span>
          <span className={letterStyle}>A</span>
          <div className="w-4 md:w-8"></div>
          <span className={letterStyle}>D</span>
          <span className={letterStyle}>E</span>
          <div className="w-4 md:w-8"></div>
          <span className={letterStyle}>L</span>
          <span className={letterStyle}>E</span>
          <span className={letterStyle}>T</span>
          <span className={letterStyle}>R</span>
          <span className={letterStyle}>A</span>
          <span className={letterStyle}>S</span>
        </h1>
      </Link>
      <p className="text-lg mt-4">Encuentra todas las palabras!</p>
    </div>
  );
}
