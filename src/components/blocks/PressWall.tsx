import Image from "next/image";
import { Tag } from "../ui";
import { outlets, press, pressMeta } from "@/content/site";

/**
 * Pressespiegel: die vier belegten Beitraege als Zellen in einer Reihe.
 * Kopfzeile mit der echten Wortmarke des Verlags, darunter der Ausschnitt
 * (Hochformate oben angeschnitten, das Querformat komplett), unten die
 * Schlagzeile. Sobald in `press[].url` eine Artikel-URL steht, wird die
 * Zelle verlinkt.
 */

type PressItem = (typeof press)[number];

function OutletMark({ name }: { name: string }) {
  const o = outlets.find((x) => x.name.toLowerCase() === name.toLowerCase());
  if (o && "logo" in o) {
    return (
      <Image
        src={o.logo}
        alt={o.name}
        width={o.width}
        height={o.height}
        className="w-auto opacity-85"
        style={{ height: `${Math.round(15 * o.scale)}px` }}
      />
    );
  }
  return (
    <span className="font-[family-name:var(--font-head)] text-[0.74rem] font-bold uppercase tracking-[0.02em] text-white/85">
      {o && "wordmark" in o ? o.wordmark : name}
    </span>
  );
}

function Clipping({ item, i }: { item: PressItem; i: number }) {
  const landscape = item.width > item.height;
  const card = (
    <figure className="spot relative flex h-full flex-col">
      <div className="flex h-12 items-center justify-between border-b border-hair px-5">
        <OutletMark name={item.outlet} />
        <Tag>Beitrag 0{i + 1}</Tag>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-3 p-4">
        <div className={`relative h-full w-full overflow-hidden rounded-[3px] ${landscape ? "" : "bg-white"}`}>
          <Image
            src={item.image}
            alt={`Beitrag in ${item.outlet}: ${item.headline}`}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
              landscape ? "object-contain object-center" : "object-cover object-top"
            }`}
          />
        </div>
      </div>
      <figcaption className="mt-auto border-t border-hair px-5 py-4">
        <span className="h-title block text-[0.9rem] leading-snug text-white/85">{item.headline}</span>
      </figcaption>
    </figure>
  );

  const cls = "group block h-full border-b border-hair sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0";
  return item.url ? (
    <a href={item.url} target="_blank" rel="noreferrer noopener" className={`${cls} outline-none focus-visible:ring-2 focus-visible:ring-mint`}>
      {card}
    </a>
  ) : (
    <div className={cls}>{card}</div>
  );
}

export default function PressWall() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {press.map((item, i) => (
          <Clipping key={item.outlet} item={item} i={i} />
        ))}
      </div>
      <p className="px-5 py-5 text-[0.74rem] leading-relaxed text-white/35 sm:px-8">
        {pressMeta.summary}. {pressMeta.note}
      </p>
    </div>
  );
}
