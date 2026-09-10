import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * =============================================================================
 * HERO-COLLAGE · geschichtete, halbtransparente Fragmente hinter dem Scrim
 * =============================================================================
 * Nur echtes Material: acht Seiten aus dem Ratgeber (public/hero/seite-*.webp,
 * gerastert aus Freebie-VersionEgor.pdf) und zwei Presse-Screenshots. Die
 * Kacheln liegen zwischen Skyline-Foto und Scrim, laufen an den Raendern
 * weich aus (Maske in globals.css) und driften sehr langsam mit
 * teilerfremden Laufzeiten – kein Loop-Punkt, keine Maus-Reaktion.
 *
 * Links bleibt der Scrim dicht, damit die Copy ruhig steht; die Fragmente
 * leben in der Mitte und rechts, hinter und um das Buch-Mockup.
 * =============================================================================
 */

type Tile = {
  src: string;
  w: number;
  h: number;
  /** Position in Prozent der Section (links / oben) */
  x: number;
  y: number;
  /** Darstellungsbreite in px */
  size: number;
  rot: number;
  opacity: number;
  drift: "a" | "b" | "c";
  /** Helle Presse-Screenshots werden in Petrol eingefaerbt */
  tint?: boolean;
  /** Auch auf kleinen Viewports zeigen */
  mobile?: boolean;
};

const tiles: Tile[] = [
  { src: "/hero/seite-bruecke.webp",     w: 560, h: 792, x: 36, y: -8,  size: 330, rot: -8, opacity: 0.62, drift: "a", mobile: true },
  { src: "/hero/seite-achttausend.webp", w: 560, h: 792, x: 56, y: -14, size: 300, rot: 4,  opacity: 0.55, drift: "b" },
  { src: "/hero/seite-podium.webp",      w: 560, h: 792, x: 86, y: -6,  size: 340, rot: 7,  opacity: 0.66, drift: "c", mobile: true },
  { src: "/presse/wallstreet-online.png", w: 421, h: 728, x: 74, y: 4,   size: 230, rot: -4, opacity: 0.30, drift: "a", tint: true },
  { src: "/hero/seite-waage.webp",       w: 560, h: 792, x: 22, y: 8,   size: 280, rot: -6, opacity: 0.45, drift: "c" },
  { src: "/hero/seite-methode.webp",     w: 560, h: 792, x: 30, y: 46,  size: 320, rot: 6,  opacity: 0.55, drift: "b" },
  { src: "/hero/seite-fahrplan.webp",    w: 560, h: 792, x: 60, y: 56,  size: 330, rot: -5, opacity: 0.62, drift: "a", mobile: true },
  { src: "/presse/frankfurt-live.png",   w: 421, h: 555, x: 47, y: 72,  size: 220, rot: 9,  opacity: 0.28, drift: "c", tint: true },
  { src: "/hero/seite-check.webp",       w: 560, h: 792, x: 88, y: 50,  size: 330, rot: -9, opacity: 0.66, drift: "b" },
];

export default function HeroCollage() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[25] overflow-hidden">
      {tiles.map((t) => (
        <div
          key={t.src + t.x}
          className={`collage-tile collage-drift-${t.drift} absolute ${t.tint ? "collage-tint" : ""} ${
            t.mobile ? "" : "hidden lg:block"
          }`}
          style={
            {
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: `${t.size}px`,
              opacity: t.opacity,
              "--rot": `${t.rot}deg`,
            } as CSSProperties
          }
        >
          <Image
            src={t.src}
            alt=""
            width={t.w}
            height={t.h}
            sizes={`${t.size}px`}
            className="h-auto w-full rounded-[10px]"
          />
        </div>
      ))}
    </div>
  );
}
