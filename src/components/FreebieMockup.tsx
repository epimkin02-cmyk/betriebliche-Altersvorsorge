"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { freebie } from "@/content/site";

/**
 * =============================================================================
 * 3D-MOCKUP DES FREEBIES · Hero-Element
 * =============================================================================
 * Zeigt die echte Titelseite des Ratgebers als 3D-Objekt (Seitenstapel,
 * Schnittkante, Maus-Parallax).
 *
 * Diese Komponente ist bewusst der EINZIGE Ort, an dem das Mockup lebt. Zum
 * Austauschen genügt es, den Inhalt von <MockupArt /> weiter unten zu ersetzen:
 *
 *   • Bild/Renderer (PNG, WEBP):  <Image src="/mockup.png" … /> in public/ ablegen
 *   • Video (MP4/WEBM, Loop):     <video autoPlay muted loop playsInline …/>
 *   • Lottie/Rive-Animation:      Player-Komponente hier einsetzen
 *   • 3D-Szene (GLB, three.js):   Canvas hier einhängen
 *
 * Die Maus-Parallax-Hülle drumherum kann bleiben oder entfallen – sie liest die
 * Zeigerposition und kippt das Mockup leicht mit. Auf Touch-Geräten und bei
 * prefers-reduced-motion ist sie automatisch aus.
 * =============================================================================
 */
export default function FreebieMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    function onMove(e: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // −1 … 1, gedämpft, damit es souverän bleibt und nicht zappelt
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      setTilt({ x: dx, y: dy });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[290px] sm:max-w-[360px] lg:max-w-[420px]"
      style={{ perspective: "1400px" }}
    >
      {/* Petrol-Glow hinter dem Mockup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(21,120,121,0.55),transparent_65%)] blur-2xl"
      />

      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateY(${-14 + tilt.x * 7}deg) rotateX(${5 - tilt.y * 6}deg) translateZ(0)`,
          transformStyle: "preserve-3d",
        }}
      >
        <MockupArt />
      </div>

      {/* Bodenschatten */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-6 h-8 w-4/5 rounded-[50%] bg-black/45 blur-xl"
      />

      <p className="mt-5 text-center text-[0.78rem] text-white/40">
        18 Seiten · PDF · kostenfrei · Ausgabe 2026
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Ab hier: nur die Darstellung. Diesen Block ersetzt du durch dein Mockup.    */
/* -------------------------------------------------------------------------- */

function MockupArt() {
  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      {/* zwei angedeutete Innenseiten dahinter – Tiefenwirkung */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[10px] bg-white/25"
        style={{ transform: "translate3d(16px, 10px, -30px)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[10px] bg-white/40"
        style={{ transform: "translate3d(8px, 5px, -15px)" }}
      />

      {/* Cover – die echte Titelseite aus dem Ratgeber-PDF (public/ratgeber-cover.png).
          Vorher stand hier ein CSS-Nachbau; der ist nicht mehr nötig. */}
      <div className="relative aspect-[210/297] overflow-hidden rounded-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
        <Image
          src="/ratgeber-cover.png"
          alt={`Titelseite des Ratgebers: ${freebie.title}`}
          fill
          sizes="(min-width: 1024px) 420px, 70vw"
          className="object-cover"
          priority
        />
        {/* Glanzkante am Bund – macht aus der Fläche wieder ein Objekt */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-white/25 via-white/5 to-transparent"
        />
      </div>

      {/* rechte Seitenkante – macht aus der Fläche ein Objekt */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[10px] rounded-r-[3px] bg-gradient-to-l from-white/70 via-white/35 to-white/10"
        style={{ transform: "rotateY(90deg) translateZ(5px)", transformOrigin: "right center" }}
      />
    </div>
  );
}
