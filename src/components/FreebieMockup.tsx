"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

/**
 * =============================================================================
 * HERO-STAPEL · Produktbox + zwei echte Seiten aus dem Ratgeber
 * =============================================================================
 * Beantwortet die Frage, die der Besucher hier wirklich hat: „Was ist da drin?"
 * Deshalb liegen hinter der Box zwei ECHTE Seiten aus dem PDF – die
 * Vermoegensbruecke und der Sicher-Check. Keine Attrappen, keine erfundenen
 * Bonusprodukte.
 *
 * Die Box ist nach LINKS gedreht: sie steht in der rechten Seitenhaelfte und
 * zeigt damit nach innen zum Text, statt aus der Seite heraus.
 *
 * Endlos ohne Loop-Punkt: drei Schwebe-Zyklen mit teilerfremden Laufzeiten
 * (7 / 9 / 11 s), dazu Glow (13 s) und Lichtstreifen (9 s). Ein Video haetten
 * wir schneiden und nahtlos schliessen muessen; hier gibt es schlicht keine
 * Naht. Kostet ausserdem keine zusaetzliche Ladezeit und braucht kein
 * Alpha-Video, das in Safari und Chrome unterschiedliche Codecs verlangt.
 *
 * Die Maus verschiebt die drei Ebenen unterschiedlich stark – nah mehr als
 * fern. Auf Touch-Geraeten und bei prefers-reduced-motion ist alles ruhig.
 * =============================================================================
 */

/** Wie stark eine Ebene der Maus folgt. Naeher = mehr Weg. */
const DEPTH = { box: 1, mid: 0.55, far: 0.3 } as const;

export default function FreebieMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      setTilt({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /** Parallaxe pro Ebene: Verschiebung plus die feste Neigung der Seite. */
  const shift = (depth: number, rotate = 0) => ({
    transform: `translate3d(${tilt.x * 16 * depth}px, ${tilt.y * 10 * depth}px, 0) rotate(${rotate}deg)`,
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]">
      {/* Petrol-Licht hinter dem Stapel, langsam pulsierend */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_52%_at_58%_48%,rgba(21,120,121,0.55),transparent_72%)] blur-2xl"
      />

      <div className="relative aspect-square">
        {/* Ebene 3 · Sicher-Check, am weitesten hinten */}
        <div className="hero-float-far absolute left-0 top-[4%] z-10 w-[31%]">
          <div className="transition-transform duration-500 ease-out" style={shift(DEPTH.far, -14)}>
            <Image
              src="/seiten/check.jpg"
              alt="Seite aus dem Ratgeber: der Sicher-Check mit neun Prüfpunkten"
              width={396}
              height={560}
              sizes="(min-width: 1024px) 175px, 30vw"
              className="h-auto w-full rounded-[8px] shadow-[0_24px_50px_-14px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.16]"
            />
          </div>
        </div>

        {/* Ebene 2 · Vermögensbrücke */}
        <div className="hero-float-mid absolute bottom-[14%] left-[7%] z-20 w-[38%]">
          <div className="transition-transform duration-500 ease-out" style={shift(DEPTH.mid, -7)}>
            <Image
              src="/seiten/bruecke.jpg"
              alt="Seite aus dem Ratgeber: die Vermögensbrücke von der Firma ins Private"
              width={396}
              height={560}
              sizes="(min-width: 1024px) 215px, 36vw"
              className="h-auto w-full rounded-[8px] shadow-[0_26px_56px_-14px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.16]"
            />
          </div>
        </div>

        {/* Ebene 1 · die Produktbox, vorn */}
        <div className="hero-float-near absolute bottom-[2%] right-[1%] z-30 w-[62%]">
          <div className="relative transition-transform duration-500 ease-out" style={shift(DEPTH.box)}>
            <Image
              src="/ratgeber-box-links.png"
              alt={`Produktbox: ${hero.mockupLabel}`}
              width={656}
              height={900}
              sizes="(min-width: 1024px) 350px, 60vw"
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
        </div>
      </div>

      <p className="mt-2 text-center text-[0.78rem] text-white/40">{hero.mockupMeta}</p>
    </div>
  );
}
