"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinemagraph hinter dem Hero. Laeuft nur auf breiten Viewports ohne
 * reduced-motion; sonst bleibt das JPG (Poster) stehen. Blendet erst ein,
 * wenn das erste Bild da ist, damit nichts poppt. Stumm, ohne Controls,
 * Loop ohne Schnitt (Start- und Endframe sind identisch).
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    const onReady = () => setReady(true);
    v.addEventListener("playing", onReady, { once: true });
    v.play().catch(() => {});
    return () => v.removeEventListener("playing", onReady);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover object-[70%_45%] saturate-[1.05] transition-opacity duration-[1400ms] ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
