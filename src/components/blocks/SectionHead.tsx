import type { ReactNode } from "react";
import { Tag } from "../ui";

/**
 * Kopfzeile einer Section im Raster: links die grosse Laufnummer in ihrer
 * eigenen Zelle, in der Mitte Klammer-Label und Headline, rechts optional
 * eine Einordnung. Alle drei Zellen sitzen auf den Hairlines des Rahmens.
 */
export default function SectionHead({
  n,
  tag,
  headline,
  aside,
  id,
}: {
  n: string;
  tag: ReactNode;
  headline: ReactNode;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="grid scroll-mt-20 border-b border-hair lg:grid-cols-12">
      <div className="flex items-start border-b border-hair px-5 py-6 sm:px-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:py-14">
        <span className="mono text-[2.6rem] leading-none tracking-[-0.04em] text-white/20 lg:text-[3.4rem]">{n}</span>
      </div>
      <div className={`px-5 py-8 sm:px-8 lg:py-14 ${aside ? "lg:col-span-7" : "lg:col-span-10"}`}>
        <p className="mb-5">
          <Tag mint>{tag}</Tag>
        </p>
        <h2 className="h-display max-w-[18ch] text-[clamp(1.9rem,3.8vw,3rem)] text-white">{headline}</h2>
      </div>
      {aside && (
        <div className="flex items-end border-t border-hair px-5 py-6 sm:px-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:py-14">
          <div className="max-w-[34ch] text-[0.92rem] leading-relaxed text-white/55">{aside}</div>
        </div>
      )}
    </div>
  );
}
