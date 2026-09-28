import Image from "next/image";

/**
 * =============================================================================
 * RATGEBER-MOCKUP · Hero-Objekt
 * =============================================================================
 * Freigestelltes Buch (public/ratgeber-stapel-3.png, PNG mit Alpha) auf einem
 * Spotlight: weisses Licht von oben, Mint-Schein am Boden (.spotlight in
 * globals.css). Das Buch steht still, nur der Lichtstreifen (11 s) laeuft.
 * =============================================================================
 */
export default function FreebieMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`spotlight relative ${className}`}>
      <div className="relative">
        <Image
          src="/ratgeber-stapel-3.png"
          alt="Der Ratgeber „Die 3 GGF-Hebel“ als Buch, ein Exemplar an einen Stapel gelehnt, das oberste zeigt das Cover"
          width={1200}
          height={927}
          sizes="(min-width: 1024px) 640px, 92vw"
          priority
          className="h-auto w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)]"
        />
        <div
          aria-hidden="true"
          className="hero-sheen pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: "url(/ratgeber-stapel-3.png)",
            maskImage: "url(/ratgeber-stapel-3.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
