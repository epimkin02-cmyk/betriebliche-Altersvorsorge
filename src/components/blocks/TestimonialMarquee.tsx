import { reviews, testimonials } from "@/content/site";

/**
 * Alle echten Google-Bewertungen als zwei gegenlaeufige, endlos laufende
 * Reihen. Jede Reihe ist einmal dupliziert, damit die CSS-Animation ohne
 * Sprung von -50 % auf 0 laeuft. Hover pausiert, reduced-motion zeigt die
 * Karten als ruhiges Raster (globals.css, .marquee).
 */

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-mint" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

type T = (typeof testimonials)[number];

function Card({ t, i }: { t: T; i: number }) {
  return (
    <figure className="cell spot flex h-[280px] w-[340px] shrink-0 flex-col p-6 sm:w-[400px]">
      <div className="flex items-center justify-between">
        <span className="tag">{reviews.platform} · {t.date}</span>
        <span className="mono text-[0.66rem] text-white/30">{String(i + 1).padStart(2, "0")}</span>
      </div>
      <blockquote className="serif mt-4 line-clamp-5 text-[0.98rem] leading-relaxed text-white/80">{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-hair pt-4">
        <span className="mono flex h-8 w-8 items-center justify-center rounded-[3px] border border-mint/40 text-[0.66rem] text-mint">
          {initials(t.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.86rem] font-semibold text-white">{t.name}</span>
        </span>
        <Stars />
      </figcaption>
    </figure>
  );
}

const half = Math.ceil(testimonials.length / 2);
const rows = [testimonials.slice(0, half), testimonials.slice(half)];

export default function TestimonialMarquee() {
  return (
    <div className="space-y-3 overflow-hidden py-3">
      {rows.map((row, r) => (
        <div key={r} className="marquee" aria-label={r === 0 ? "Bewertungen, erste Reihe" : "Bewertungen, zweite Reihe"}>
          <div className={`marquee__track ${r === 1 ? "marquee__track--reverse" : ""}`}>
            {[...row, ...row].map((t, i) => (
              <div key={`${t.name}-${i}`} aria-hidden={i >= row.length}>
                <Card t={t} i={(i % row.length) + r * half} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
