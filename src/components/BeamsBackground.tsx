"use client";

import { useEffect, useRef } from "react";

/**
 * Weiche Lichtstreifen auf Schwarz, nach dem Muster „Beams Background“ von
 * kokonutd auf 21st.dev, hier ohne Fremdpakete und auf die Marke gesetzt:
 * Petrol-Toene statt Blau bis Violett, deutlich leiser, auf die Groesse des
 * Elternelements statt des Fensters gezeichnet. Pausiert ausserhalb des
 * Sichtfelds, zeigt bei reduced-motion ein stehendes Bild.
 */

type Beam = {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
};

const COUNT = 18;
const HUE_MIN = 168;
const HUE_MAX = 192;

function makeBeam(w: number, h: number, i: number): Beam {
  const column = i % 3;
  const spacing = w / 3;
  return {
    x: column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.6,
    y: Math.random() * h * 1.6 - h * 0.3,
    width: 100 + Math.random() * 120,
    length: h * 2.2,
    angle: -34 + Math.random() * 8,
    speed: 0.25 + Math.random() * 0.3,
    opacity: 0.18 + Math.random() * 0.14,
    hue: HUE_MIN + Math.random() * (HUE_MAX - HUE_MIN),
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.012,
  };
}

export default function BeamsBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let beams: Beam[] = [];
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: COUNT }, (_, i) => makeBeam(w, h, i));
    };

    const draw = (b: Beam) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.angle * Math.PI) / 180);
      const o = b.opacity * (0.8 + Math.sin(b.pulse) * 0.2);
      const g = ctx.createLinearGradient(0, 0, 0, b.length);
      const c = (a: number) => `hsla(${b.hue}, 62%, 60%, ${a})`;
      g.addColorStop(0, c(0));
      g.addColorStop(0.15, c(o * 0.5));
      g.addColorStop(0.45, c(o));
      g.addColorStop(0.6, c(o));
      g.addColorStop(0.88, c(o * 0.5));
      g.addColorStop(1, c(0));
      ctx.fillStyle = g;
      ctx.fillRect(-b.width / 2, 0, b.width, b.length);
      ctx.restore();
    };

    const frame = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      ctx.filter = "blur(28px)";
      beams.forEach((b, i) => {
        if (animate) {
          b.y -= b.speed;
          b.pulse += b.pulseSpeed;
          if (b.y + b.length < -100) {
            const fresh = makeBeam(w, h, i);
            Object.assign(b, fresh, { y: h + 100 });
          }
        }
        draw(b);
      });
      ctx.filter = "none";
    };

    const loop = () => {
      raf = 0;
      if (!visible) return;
      frame(true);
      raf = requestAnimationFrame(loop);
    };

    size();
    if (reduced) {
      frame(false);
    } else {
      loop();
    }

    const ro = new ResizeObserver(() => {
      size();
      if (reduced) frame(false);
    });
    ro.observe(parent);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced && !raf) loop();
    });
    io.observe(parent);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
