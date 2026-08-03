"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "./Logo";
import { freebie } from "@/content/site";

/**
 * =============================================================================
 * 3D-MOCKUP DES FREEBIES · Hero-Element
 * =============================================================================
 * ⚠️ PLATZHALTER — wird durch das von dir gelieferte 3D-Mockup ersetzt.
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

      {/* Cover */}
      <div className="relative aspect-[210/297] overflow-hidden rounded-[10px] bg-[linear-gradient(155deg,#123030_0%,#0f1a1c_45%,#0a0d11_100%)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
        {/* Petrol-Licht oben rechts */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_360px_at_82%_-8%,rgba(21,120,121,0.75),transparent_62%)]"
        />
        {/* Glanzkante */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-white/25 via-white/5 to-transparent"
        />

        <div className="relative z-10 flex h-full flex-col p-[7%]">
          <div className="flex items-center gap-2.5">
            <Mark className="h-[9%] max-h-9 w-auto text-petrol-300" />
            <span className="font-[family-name:var(--font-head)] text-[0.6rem] font-black uppercase leading-[1.05] text-white sm:text-[0.68rem]">
              Führungs
              <span className="block text-petrol-300">Vorsorge</span>
            </span>
          </div>

          <p className="mt-[8%] text-[0.54rem] font-bold uppercase tracking-[0.18em] text-petrol-300 sm:text-[0.6rem]">
            {freebie.badge}
          </p>

          <h3 className="h-display mt-[5%] text-[1.05rem] leading-[1.14] text-white sm:text-[1.3rem]">
            {freebie.title}
          </h3>

          <p className="mt-[5%] text-[0.7rem] leading-relaxed text-white/55 sm:text-[0.76rem]">
            {freebie.coverSub}
          </p>

          <div className="mt-auto border-t border-white/12 pt-[5%]">
            <p className="text-[0.68rem] font-semibold text-white sm:text-[0.74rem]">Marius Michael</p>
            <p className="text-[0.6rem] text-white/45 sm:text-[0.66rem]">
              Allianz Hauptvertretung · Frankfurt a. M.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.52rem] uppercase tracking-[0.1em] text-petrol-300 sm:text-[0.56rem]">
              <span>21 Jahre</span>
              <span>IHK-zertifiziert</span>
              <span>77,8 % Weiterempfehlung</span>
            </div>
          </div>
        </div>
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
