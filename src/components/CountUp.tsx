"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zaehlt eine Kennzahl beim ersten Sichtkontakt hoch. Nicht-numerische Werte
 * („IHK") werden unveraendert gezeigt, deutsches Dezimalkomma bleibt erhalten.
 * Bei prefers-reduced-motion steht die Zahl sofort.
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const target = Number(value.replace(",", "."));
  const numeric = Number.isFinite(target);
  const decimals = value.includes(",") ? value.split(",")[1].length : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(numeric ? 0 : target);

  useEffect(() => {
    if (!numeric || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setShown(target), 0);
      return () => window.clearTimeout(t);
    }
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(target * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, target, duration]);

  if (!numeric) return <span>{value}</span>;
  return <span ref={ref}>{shown.toFixed(decimals).replace(".", ",")}</span>;
}
