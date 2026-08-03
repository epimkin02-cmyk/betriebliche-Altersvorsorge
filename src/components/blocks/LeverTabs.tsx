"use client";

import { useState } from "react";
import { CheckIcon } from "../ui";
import { levers } from "@/content/site";

export default function LeverTabs() {
  const [active, setActive] = useState(0);
  const item = levers.items[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Die Hebel"
        className="flex flex-wrap gap-2 border-b border-white/10 pb-3"
      >
        {levers.items.map((l, i) => (
          <button
            key={l.title}
            role="tab"
            id={`hebel-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`hebel-panel-${i}`}
            onClick={() => setActive(i)}
            className={`rounded-[10px] px-4 py-3 text-left text-[0.92rem] font-semibold transition-all sm:px-5 ${
              active === i
                ? "bg-petrol text-white shadow-[0_8px_24px_rgba(21,120,121,0.4)]"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <span className="block text-[0.66rem] font-bold uppercase tracking-[0.14em] opacity-70">
              {i < 3 ? `Hebel ${i + 1}` : "Bonus"}
            </span>
            {l.title}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`hebel-panel-${active}`}
        aria-labelledby={`hebel-tab-${active}`}
        key={active}
        className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[0.75rem] font-semibold text-petrol-200">
            {item.tag}
          </span>
          <h3 className="h-display mt-5 text-[clamp(1.5rem,3.2vw,2.1rem)] text-petrol-300">
            {item.claim}
          </h3>
          <p className="mt-5 max-w-[54ch] text-[1rem] leading-relaxed text-white/70">{item.body}</p>

          <div className="mt-7 rounded-[10px] border border-white/12 bg-white/[0.04] px-5 py-4">
            <p className="text-[0.88rem] leading-relaxed text-white/60">
              <strong className="font-semibold text-white/85">Ehrlich dazugesagt: </strong>
              {item.limit}
            </p>
          </div>
        </div>

        <ul className="space-y-4 self-start rounded-[14px] border border-white/12 bg-white/[0.045] p-7">
          <li className="eyebrow text-petrol-300">Die Eckdaten</li>
          {item.facts.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-white/80">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-petrol-300" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
