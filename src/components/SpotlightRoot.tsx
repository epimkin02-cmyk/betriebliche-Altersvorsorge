"use client";

import { useEffect } from "react";

/**
 * Ein globaler Pointer-Listener setzt auf jedem Element mit der Klasse
 * `spot` die Variablen --mx/--my (Cursor relativ zur Karte). Das CSS in
 * globals.css zeichnet daraus einen Lichtrand, der dem Cursor folgt.
 * Rendert nichts, laeuft nur auf Geraeten mit feinem Zeiger.
 */
export default function SpotlightRoot() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const { clientX, clientY } = last;
      document.querySelectorAll<HTMLElement>(".spot").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        el.style.setProperty("--mx", `${clientX - r.left}px`);
        el.style.setProperty("--my", `${clientY - r.top}px`);
      });
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
