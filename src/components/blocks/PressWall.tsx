import Image from "next/image";
import { press, pressMentions, pressMeta } from "@/content/site";

/**
 * Pressespiegel – die vier belegten Beiträge als Artikel-Ausschnitte.
 *
 * Aufbau wie im Figma-Wireframe: drei Spalten, jeder Screenshot in seinem
 * NATÜRLICHEN Seitenverhältnis. Kein einheitliches Raster, weil die Beiträge
 * unterschiedlich hoch sind – ein erzwungener Zuschnitt würde Schlagzeilen
 * abschneiden. Die dritte Spalte trägt zwei Beiträge übereinander.
 *
 * Sobald in `press[].url` eine Artikel-URL steht, wird die Kachel automatisch
 * verlinkt – bis dahin ist sie statisch.
 */

type PressItem = (typeof press)[number];

/** Spaltenaufteilung aus dem Wireframe: 1 · 1 · 2 */
const columns: PressItem[][] = [[press[0]], [press[1]], [press[2], press[3]]];

function Clipping({ item }: { item: PressItem }) {
  const card = (
    <figure>
      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_24px_56px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/12 transition-transform duration-300 group-hover:-translate-y-1">
        <Image
          src={item.image}
          alt={`Beitrag in ${item.outlet}: ${item.headline}`}
          width={item.width}
          height={item.height}
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1">
        <span className="eyebrow text-[0.62rem] text-petrol-300">{item.outlet}</span>
        <span className="h-title text-[0.88rem] leading-snug text-white/75">{item.headline}</span>
      </figcaption>
    </figure>
  );

  return item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group block rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-petrol-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      {card}
    </a>
  ) : (
    <div className="group">{card}</div>
  );
}

export default function PressWall() {
  return (
    <div>
      <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-6">
            {col.map((item) => (
              <Clipping key={item.outlet} item={item} />
            ))}
          </div>
        ))}
      </div>

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
