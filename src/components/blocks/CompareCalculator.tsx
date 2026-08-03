"use client";

import { useMemo, useState } from "react";
import { calculator } from "@/content/site";

const EUR = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/**
 * Vergleichs-Rechner: Was bleibt von einem Betrag aus der GmbH privat übrig?
 * Bewusst nur eine Größenordnung – die Annahmen stehen offen darunter.
 */
export default function CompareCalculator() {
  const [betrag, setBetrag] = useState(50_000);

  const { ausschuettung, tantieme, verlust } = useMemo(() => {
    const ausschuettung = Math.round(betrag * calculator.netQuoteAusschuettung);
    const tantieme = Math.round(betrag * calculator.netQuoteTantieme);
    return { ausschuettung, tantieme, verlust: betrag - ausschuettung };
  }, [betrag]);

  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-[var(--shadow-mid)]">
      {/* Regler */}
      <div className="border-b border-line p-7 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <label htmlFor="betrag" className="text-[0.95rem] font-semibold text-ink">
            Betrag, den du aus der GmbH ins Private holen willst
          </label>
          <span className="h-display text-[1.7rem] text-petrol">{EUR.format(betrag)}</span>
        </div>
        <input
          id="betrag"
          type="range"
          min={10_000}
          max={200_000}
          step={5_000}
          value={betrag}
          onChange={(e) => setBetrag(Number(e.target.value))}
          className="mt-5 w-full"
          aria-valuetext={`${EUR.format(betrag)} pro Jahr`}
        />
        <div className="mt-1.5 flex justify-between text-[0.74rem] text-graybrand">
          <span>10.000 €</span>
          <span>200.000 €</span>
        </div>
      </div>

      {/* Vergleich */}
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-line p-7 sm:border-b-0 sm:border-r sm:p-9">
          <p className="eyebrow text-graybrand">Der klassische Weg</p>

          <div className="mt-6 space-y-5">
            <Line label="Als Ausschüttung entnommen" value={EUR.format(ausschuettung)} muted />
            <Line label="Als Gehalt oder Tantieme" value={EUR.format(tantieme)} muted />
          </div>

          <div className="mt-7 rounded-[10px] bg-soft px-5 py-4">
            <p className="text-[0.85rem] leading-relaxed text-ink/65">
              Rund{" "}
              <strong className="text-ink">{EUR.format(verlust)}</strong> gehen unterwegs an
              Körperschaft-, Gewerbe- und Abgeltungsteuer verloren.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-ink p-7 text-white sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_360px_at_85%_-10%,rgba(21,120,121,0.55),transparent_65%)]"
          />
          <div className="relative z-10">
            <p className="eyebrow text-petrol-300">Über die Vermögensbrücke</p>

            <div className="mt-6">
              <p className="text-[0.85rem] text-white/55">Für dich arbeiten</p>
              <p className="h-display mt-1 text-[2.2rem] text-petrol-300 sm:text-[2.6rem]">
                {EUR.format(betrag)}
              </p>
              <p className="mt-1 text-[0.78rem] leading-snug text-white/40">
                Der Beitrag ist Betriebsausgabe – es geht unterwegs nichts verloren.
              </p>
            </div>

            <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6 text-[0.88rem] text-white/70">
              <li>Sofort-Effekt: senkt den Gewinn im laufenden Jahr</li>
              <li>Zinseszins-Effekt: kein jährlicher Steuerabzug auf die Erträge</li>
              <li>Tarif-Effekt: versteuert wird erst im Ruhestand, meist niedriger</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="border-t border-line px-7 py-5 text-[0.75rem] leading-relaxed text-graybrand sm:px-9">
        {calculator.disclaimer}
      </p>
    </div>
  );
}

function Line({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p className="text-[0.85rem] text-ink/55">{label}</p>
      <p className={`h-display mt-0.5 text-[1.7rem] ${muted ? "text-ink/70" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
