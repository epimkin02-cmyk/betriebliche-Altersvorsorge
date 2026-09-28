"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Setzt auf dem Wrapper --px/--py (-1..1) aus der Zeigerposition. Elemente
 * mit .coin lesen die Werte und verschieben sich je nach --depth. Nur bei
 * feinem Zeiger, gedrosselt auf einen Frame.
 */
export default function Parallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const r = el.getBoundingClientRect();
      const px = ((last.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((last.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
