import { reviews, testimonials } from "@/content/site";

/** Alle echten Google-Bewertungen in zwei gegenlaeufigen Reihen. */

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-white" aria-label="5 von 5 Sternen">
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
    <figure className="card flex h-[270px] w-[340px] shrink-0 flex-col p-6 sm:w-[400px]">
      <Stars />
      <blockquote className="mt-4 line-clamp-5 text-[0.95rem] leading-relaxed text-white/80">{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-3 text-[0.74rem] font-semibold text-white/80">{initials(t.name)}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.88rem] font-medium text-white">{t.name}</span>
          <span className="block text-[0.76rem] text-faint">{reviews.platform} · {t.date}</span>
        </span>
      </figcaption>
    </figure>
  );
}

const half = Math.ceil(testimonials.length / 2);
const rows = [testimonials.slice(0, half), testimonials.slice(half)];

export default function TestimonialMarquee() {
  return (
    <div className="space-y-4">
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
