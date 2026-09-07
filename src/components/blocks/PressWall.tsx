import Image from "next/image";
import { press, pressMentions, pressMeta } from "@/content/site";

/**
 * Pressespiegel – die vier belegten Beiträge als Artikel-Ausschnitte.
 *
 * Screenshots schlagen Logos: ein Logo behauptet nur eine Erwähnung, der
 * Ausschnitt zeigt die Schlagzeile. Sobald in `press[].url` eine Artikel-URL
 * steht, wird die Kachel automatisch verlinkt – bis dahin ist sie statisch.
 */
export default function PressWall() {
  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {press.map((item) => {
          const card = (
            <figure className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-white transition-shadow duration-300 group-hover:shadow-mid">
              <div className="relative aspect-[4/5] overflow-hidden bg-soft">
                <Image
                  src={item.image}
                  alt={`Beitrag in ${item.outlet}: ${item.headline}`}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="flex flex-1 flex-col gap-2 border-t border-line px-5 py-4">
                <span className="eyebrow text-[0.62rem] text-petrol">{item.outlet}</span>
                <span className="h-title text-[0.9rem] leading-snug text-ink/80">
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
                  className="block h-full rounded-[14px] outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2"
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

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-graybrand">
          <span className="font-semibold text-ink/60">Weitere Erwähnungen:</span>
          {pressMentions.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </p>
        <p className="shrink-0 text-[0.8rem] font-semibold text-ink/60">{pressMeta.summary}</p>
      </div>

      <p className="mt-3 text-[0.75rem] leading-relaxed text-graybrand">{pressMeta.note}</p>
    </div>
  );
}
