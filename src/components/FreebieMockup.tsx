import Image from "next/image";
import { hero } from "@/content/site";

/**
 * =============================================================================
 * PRODUKTBOX · Hero-Element
 * =============================================================================
 * Freigestellte 3D-Box (public/ratgeber-box-links.png, PNG mit Alpha), Front
 * traegt das echte Cover, der Ruecken den Titel. Nach LINKS gedreht, damit sie
 * aus der rechten Seitenhaelfte zum Text hin zeigt.
 *
 * Bewegung ohne Loop-Punkt: Schweben (7 s), Glow (13 s), Lichtstreifen (9 s)
 * mit teilerfremden Laufzeiten, reines CSS. Keine Maus-Reaktion.
 *
 * Die beiden schwebenden Seiten (Vermoegensbruecke, Sicher-Check), die zuvor
 * hinter der Box lagen, sind auf Wunsch entfernt.
 * =============================================================================
 */
export default function FreebieMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Petrol-Licht hinter der Box, langsam pulsierend */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-[-12%] -z-10 bg-[radial-gradient(55%_50%_at_50%_52%,rgba(21,120,121,0.55),transparent_72%)] blur-2xl"
      />

      <div className="hero-float-near relative">
        <Image
          src="/ratgeber-box-links.png"
          alt={`Produktbox: ${hero.mockupLabel}`}
          width={656}
          height={900}
          sizes="(min-width: 1024px) 440px, 70vw"
          priority
          className="h-auto w-full drop-shadow-[0_34px_42px_rgba(0,0,0,0.8)]"
        />
        {/* Lichtstreifen, exakt auf die Silhouette der Box maskiert */}
        <div
          aria-hidden="true"
          className="hero-sheen pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: "url(/ratgeber-box-links.png)",
            maskImage: "url(/ratgeber-box-links.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>

      <p className="mt-6 text-center text-[0.78rem] text-white/40">{hero.mockupMeta}</p>
    </div>
  );
}
