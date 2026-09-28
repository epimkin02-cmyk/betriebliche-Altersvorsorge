import Image from "next/image";
import { outlets, press, pressMeta } from "@/content/site";

/**
 * Pressespiegel: vier Karten, oben der Ausschnitt in einem ruhigen Rahmen,
 * unten Wortmarke des Verlags und Schlagzeile. Sobald in `press[].url`
 * eine Artikel-URL steht, wird die Karte verlinkt.
 */

type PressItem = (typeof press)[number];

function OutletMark({ name }: { name: string }) {
  const o = outlets.find((x) => x.name.toLowerCase() === name.toLowerCase());
  if (o && "logo" in o) {
    return <Image src={o.logo} alt={o.name} width={o.width} height={o.height} className="w-auto self-start opacity-80" style={{ height: `${Math.round(14 * o.scale)}px` }} />;
  }
  return <span className="self-start text-[0.72rem] font-bold uppercase tracking-[0.02em] text-white/80">{o && "wordmark" in o ? o.wordmark : name}</span>;
}

function Clipping({ item }: { item: PressItem }) {
  const landscape = item.width > item.height;
  const card = (
    <figure className="card flex h-full flex-col overflow-hidden transition-colors duration-300 group-hover:border-hair-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-3 p-4 sm:p-5">
        <div className={`relative h-full w-full overflow-hidden rounded-[8px] ${landscape ? "" : "bg-white"}`}>
          <Image
            src={item.image}
            alt={`Beitrag in ${item.outlet}: ${item.headline}`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className={landscape ? "object-contain object-center" : "object-cover object-top"}
          />
        </div>
      </div>
      <figcaption className="flex flex-1 flex-col gap-3 p-5">
        <OutletMark name={item.outlet} />
        <span className="text-[0.92rem] font-medium leading-snug text-white/85">{item.headline}</span>
      </figcaption>
    </figure>
  );
  return item.url ? (
    <a href={item.url} target="_blank" rel="noreferrer noopener" className="group block rounded-[16px] outline-none focus-visible:ring-2 focus-visible:ring-white">
      {card}
    </a>
  ) : (
    <div className="group">{card}</div>
  );
}

export default function PressWall() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {press.map((item) => (
          <Clipping key={item.outlet} item={item} />
        ))}
      </div>
      <p className="mt-6 text-[0.78rem] leading-relaxed text-faint">
        {pressMeta.summary}. {pressMeta.note}
      </p>
    </div>
  );
}
