import Image from "next/image";
import { hero } from "@/content/site";

/**
 * =============================================================================
 * RATGEBER-MOCKUP · Hero-Element
 * =============================================================================
 * Freigestelltes Buch (public/ratgeber-stapel-2.png, PNG mit Alpha): ein
 * Exemplar steht aufrecht und lehnt an einem Stapel von drei weiteren, die
 * Front traegt das echte Cover. Nach LINKS gedreht, damit es aus der rechten
 * Seitenhaelfte zum Text hin zeigt. Querformat 1200 x 927.
 *
 * Bewegung ohne Loop-Punkt: Schweben (7 s), Glow (13 s), Lichtstreifen (9 s)
 * mit teilerfremden Laufzeiten, reines CSS. Keine Maus-Reaktion.
 * =============================================================================
 */
export default function FreebieMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Petrol-Licht hinter der Box, langsam pulsierend */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-[-10%] -z-10 bg-[radial-gradient(50%_55%_at_45%_55%,rgba(21,120,121,0.55),transparent_72%)] blur-2xl"
      />

      <div className="hero-float-near relative">
        <Image
          src="/ratgeber-stapel-2.png"
          alt="Der Ratgeber „Die 3 GGF-Hebel“ als Buch, ein Exemplar an einen Stapel gelehnt, das oberste zeigt das Cover"
          width={1200}
          height={927}
          sizes="(min-width: 1024px) 560px, 90vw"
          priority
          className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.75)]"
        />
        {/* Lichtstreifen, exakt auf die Silhouette des Buchs maskiert */}
        <div
          aria-hidden="true"
          className="hero-sheen pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: "url(/ratgeber-stapel-2.png)",
            maskImage: "url(/ratgeber-stapel-2.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>

      <p className="mt-5 text-center text-[0.78rem] text-white/40">{hero.mockupMeta}</p>
    </div>
  );
}
