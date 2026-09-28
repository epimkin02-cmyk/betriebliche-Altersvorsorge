import Image from "next/image";

/** Freigestelltes Buch (public/ratgeber-stapel-3.png), ruhig, ohne Effekt. */
export default function FreebieMockup({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/ratgeber-stapel-3.png"
      alt="Der Ratgeber „Die 3 GGF-Hebel“ als Buch, ein Exemplar an einen Stapel gelehnt, das oberste zeigt das Cover"
      width={1200}
      height={927}
      sizes="(min-width: 1024px) 700px, 90vw"
      className={`h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)] ${className}`}
    />
  );
}
