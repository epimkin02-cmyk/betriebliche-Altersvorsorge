"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

/**
 * =============================================================================
 * MOCKUP DES FREEBIES · Hero-Element
 * =============================================================================
 * Freigestellte 3D-Produktbox (public/ratgeber-box.png, PNG mit Alpha):
 * Front traegt das echte Cover, der linke Ruecken den Titel und das Logo.
 * Erzeugt mit Higgsfield auf Basis des echten Covers, Hintergrund entfernt,
 * auf das Motiv zugeschnitten.
 *
 * Weil der Freisteller den Original-Schlagschatten mitgenommen hat, liegt der
 * Schatten hier als CSS-drop-shadow auf dem Bild – dadurch passt er sich der
 * dunklen Flaeche an und laesst sich frei justieren.
 *
 * Austauschen? Nur die Datei in public/ ersetzen, sonst nichts.
 *
 * Die Maus-Parallax-Huelle kippt das Mockup leicht mit. Auf Touch-Geraeten und
 * bei prefers-reduced-motion ist sie automatisch aus.
 * =============================================================================
 */
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

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[400px]" style={{ perspective: "1400px" }}>
      {/* Petrol-Schein hinter dem Mockup – gibt dem Freisteller Grund. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(21,120,121,0.45),transparent_70%)] blur-2xl"
      />

      <div
        className="transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateY(${tilt.x * 5}deg) rotateX(${-tilt.y * 4}deg) translateZ(0)`,
        }}
      >
        <Image
          src="/ratgeber-box.png"
          alt={`Produktbox: ${hero.mockupLabel}`}
          width={745}
          height={1100}
          sizes="(min-width: 1024px) 400px, 70vw"
          priority
          className="h-auto w-full drop-shadow-[0_38px_45px_rgba(0,0,0,0.75)]"
        />
      </div>

      <p className="mt-5 text-center text-[0.78rem] text-white/40">{hero.mockupMeta}</p>
    </div>
  );
}
