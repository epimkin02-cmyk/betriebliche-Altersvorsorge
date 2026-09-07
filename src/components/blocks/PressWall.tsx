import Image from "next/image";
import { press, pressMentions, pressMeta } from "@/content/site";

/**
 * Pressespiegel – die vier belegten Beiträge als Artikel-Ausschnitte.
 *
 * Screenshots schlagen Logos: ein Logo behauptet nur eine Erwähnung, der
 * Ausschnitt zeigt die Schlagzeile. Wie im Wireframe stehen die hellen
 * Screenshots direkt auf dem dunklen Grund, ohne zusätzlichen Kartenrahmen.
 *
 * Sobald in `press[].url` eine Artikel-URL steht, wird die Kachel automatisch
 * verlinkt – bis dahin ist sie statisch.
 */
export default function PressWall() {
  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {press.map((item) => {
          const card = (
            <figure className="flex h-full flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-white shadow-[0_24px_56px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/12 transition-transform duration-300 group-hover:-translate-y-1">
                <Image
                  src={item.image}
                  alt={`Beitrag in ${item.outlet}: ${item.headline}`}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-4 flex flex-col gap-1.5">
                <span className="eyebrow text-[0.62rem] text-petrol-300">{item.outlet}</span>
                <span className="h-title text-[0.9rem] leading-snug text-white/80">
                  {item.headline}
                </span>
              </figcaption>
            </figure>
          );

          return (
            <li key={item.outlet} className="group">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block h-full rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-petrol-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {card}
                </a>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-white/45">
          <span className="font-semibold text-white/60">Weitere Erwähnungen:</span>
          {pressMentions.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </p>
        <p className="shrink-0 text-[0.8rem] font-semibold text-white/60">{pressMeta.summary}</p>
      </div>

      <p className="mt-3 text-[0.75rem] leading-relaxed text-white/35">{pressMeta.note}</p>
    </div>
  );
}
