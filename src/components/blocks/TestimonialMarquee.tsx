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
    <span className="flex gap-0.5 text-[#fbbc04]" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

type T = (typeof testimonials)[number];

function Card({ t }: { t: T }) {
  return (
    <figure className="spot relative flex h-[296px] w-[340px] shrink-0 flex-col rounded-[16px] bg-white/[0.035] p-6 pt-10 ring-1 ring-white/10 sm:w-[400px]">
      <span aria-hidden="true" className="serif absolute left-5 top-3 text-[3rem] leading-none text-petrol-300/50">
        “
      </span>
      <blockquote className="serif line-clamp-6 text-[0.93rem] leading-relaxed text-white/78">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-petrol/25 text-[0.74rem] font-bold text-petrol-300 ring-1 ring-petrol-300/30">
          {initials(t.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.86rem] font-semibold text-white">{t.name}</span>
          <span className="block text-[0.74rem] text-white/45">
            {reviews.platform} · {t.date}
          </span>
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
    <div className="marquee-wrap relative left-1/2 w-screen -translate-x-1/2 space-y-5">
      {rows.map((row, r) => (
        <div key={r} className="marquee" aria-label={r === 0 ? "Bewertungen, erste Reihe" : "Bewertungen, zweite Reihe"}>
          <div className={`marquee__track ${r === 1 ? "marquee__track--reverse" : ""}`}>
            {[...row, ...row].map((t, i) => (
              <div key={`${t.name}-${i}`} aria-hidden={i >= row.length} className="py-1">
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
