import Image from "next/image";
import { outlets, press, pressMeta } from "@/content/site";

/**
 * Pressespiegel – die vier belegten Beiträge als Artikel-Ausschnitte.
 *
 * Drei Spalten, jeder Screenshot in seinem NATÜRLICHEN Seitenverhältnis (ein
 * erzwungener Zuschnitt würde Schlagzeilen abschneiden); die dritte Spalte
 * trägt zwei Beiträge. Über jedem Ausschnitt steht die echte Wortmarke des
 * Verlags (public/logos), nicht der Name in Schrift.
 *
 * Sobald in `press[].url` eine Artikel-URL steht, wird die Kachel verlinkt.
 */

type PressItem = (typeof press)[number];

/** Spaltenaufteilung: 1 · 1 · 2 */
const columns: PressItem[][] = [[press[0]], [press[1]], [press[2], press[3]]];

/** Wortmarke des Verlags aus der Bekannt-aus-Liste, gematcht über den Namen. */
function OutletMark({ name }: { name: string }) {
  const o = outlets.find((x) => x.name.toLowerCase() === name.toLowerCase());
  if (o && "logo" in o) {
    return (
      <Image
        src={o.logo}
        alt={o.name}
        width={o.width}
        height={o.height}
        className="w-auto opacity-80"
        style={{ height: `${Math.round(16 * o.scale)}px` }}
      />
    );
  }
  return (
    <span className="font-[family-name:var(--font-head)] text-[0.78rem] font-black uppercase tracking-[0.02em] text-white/80">
      {o && "wordmark" in o ? o.wordmark : name}
    </span>
  );
}

function Clipping({ item }: { item: PressItem }) {
  const card = (
    <figure className="flex flex-col">
      <div className="mb-3 flex h-6 items-center justify-between">
        <OutletMark name={item.outlet} />
        <span className="eyebrow text-[0.6rem] text-white/30">Beitrag</span>
      </div>
      <div className="relative overflow-hidden rounded-[10px] bg-white p-[3px] shadow-[0_28px_60px_-22px_rgba(0,0,0,0.9)] ring-1 ring-white/15 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_36px_70px_-22px_rgba(0,0,0,0.95)]">
        <Image
          src={item.image}
          alt={`Beitrag in ${item.outlet}: ${item.headline}`}
          width={item.width}
          height={item.height}
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw"
          className="h-auto w-full rounded-[8px]"
        />
      </div>
      <figcaption className="mt-4 border-l border-petrol-300/50 pl-3">
        <span className="h-title block text-[0.9rem] leading-snug text-white/80">{item.headline}</span>
      </figcaption>
    </figure>
  );

  return item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group block rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-petrol-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
      <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-10">
            {col.map((item) => (
              <Clipping key={item.outlet} item={item} />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-[70ch] text-[0.74rem] leading-relaxed text-white/30">
        {pressMeta.summary}. {pressMeta.note}
      </p>
    </div>
  );
}
