"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CtaPill } from "./ui";
import { consultingFees, incomes, measures, quizCopy, taxAdvisorFees, type Choice } from "@/content/quiz";

/**
 * Quiz-Funnel · sechs Schritte, dunkel gesetzt.
 * Laeuft im Popup (QuizModal) und inline auf /check. Einzelauswahl springt
 * automatisch weiter, Mehrfachauswahl und Freitext ueber „Weiter". Am Ende
 * geht alles an /api/lead, das speichert und an Leadtable/Leadmetrics
 * weiterleitet; danach /danke.
 */

export type QuizAnswers = {
  measures: string[];
  bottleneck: string;
  income: string;
  taxAdvisorFee: string;
  consultingFee: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

const empty: QuizAnswers = {
  measures: [],
  bottleneck: "",
  income: "",
  taxAdvisorFee: "",
  consultingFee: "",
  name: "",
  phone: "",
  email: "",
  consent: false,
};

const TOTAL = quizCopy.total;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s/()-]{6,}$/;

/** UTM-Parameter der Landingpage mitschicken (Meta-Kampagne, Anzeige, Variante) */
function utmFromUrl() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return out;
}

export default function QuizFunnel({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<QuizAnswers>(empty);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return a.measures.length > 0;
      case 1:
        return true; // Freitext bleibt freiwillig, kostet sonst Conversion
      case 2:
        return a.income !== "";
      case 3:
        return a.taxAdvisorFee !== "";
      case 4:
        return a.consultingFee !== "";
      case 5:
        return (
          a.name.trim().length > 1 &&
          PHONE_RE.test(a.phone.trim()) &&
          EMAIL_RE.test(a.email.trim()) &&
          a.consent
        );
      default:
        return false;
    }
  }, [step, a]);

  const next = () => canContinue && setStep((s) => Math.min(TOTAL - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  /** Einzelauswahl: anklicken → kurz zeigen → weiter */
  function pick(key: "income" | "taxAdvisorFee" | "consultingFee", value: string) {
    setA((prev) => ({ ...prev, [key]: value }));
    window.setTimeout(() => setStep((s) => Math.min(TOTAL - 1, s + 1)), 220);
  }

  function toggleMeasure(value: string) {
    setA((prev) => {
      if (value === "nichts") return { ...prev, measures: prev.measures.includes("nichts") ? [] : ["nichts"] };
      const without = prev.measures.filter((m) => m !== "nichts");
      return {
        ...prev,
        measures: without.includes(value) ? without.filter((m) => m !== value) : [...without, value],
      };
    });
  }

  async function submit() {
    if (!canContinue || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...a, source: "quiz-funnel", utm: utmFromUrl(), page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      onDone?.();
      router.push("/danke");
    } catch {
      setError(quizCopy.error);
      setSending(false);
    }
  }

  const copy = quizCopy.steps[step];
  const field =
    "w-full rounded-[10px] bg-black/35 px-4 py-3.5 text-[0.98rem] text-white ring-1 ring-white/12 transition-colors placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-petrol-300";

  return (
    <div>
      {/* Fortschritt */}
      <div className="mb-7">
        <div className="mb-2.5 flex items-center justify-between pr-9 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-white/40 sm:pr-0">
          <span>
            Frage {step + 1} von {TOTAL}
          </span>
          <span className="normal-case tracking-normal text-white/35">ca. {Math.max(1, TOTAL - step - 1) * 15} Sek. übrig</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#86B9BA,#157879)] transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="h-title text-[1.25rem] leading-snug text-white sm:text-[1.45rem]">{copy.title}</h2>
      {copy.sub && <p className="mt-2 text-[0.9rem] text-white/50">{copy.sub}</p>}

      <div className="mt-6">
        {step === 0 && (
          <div className="grid gap-2.5">
            {measures.map((o) => {
              const active = a.measures.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggleMeasure(o.value)}
                  aria-pressed={active}
                  className={optionCls(active)}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                      active ? "border-petrol-300 bg-petrol-300 text-ink" : "border-white/25"
                    }`}
                  >
                    {active && (
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[0.95rem] text-white/90">{o.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <textarea
            value={a.bottleneck}
            onChange={(e) => setA({ ...a, bottleneck: e.target.value })}
            rows={5}
            maxLength={800}
            placeholder={quizCopy.bottleneckPlaceholder}
            className={`${field} resize-none`}
          />
        )}

        {step === 2 && <OptionList options={incomes} selected={a.income} onSelect={(v) => pick("income", v)} />}
        {step === 3 && (
          <OptionList options={taxAdvisorFees} selected={a.taxAdvisorFee} onSelect={(v) => pick("taxAdvisorFee", v)} />
        )}
        {step === 4 && (
          <OptionList options={consultingFees} selected={a.consultingFee} onSelect={(v) => pick("consultingFee", v)} />
        )}

        {step === 5 && (
          <div className="grid gap-3">
            <label className="sr-only" htmlFor="quiz-name">{quizCopy.fields.name}</label>
            <input id="quiz-name" type="text" autoComplete="name" placeholder={quizCopy.fields.name} value={a.name} onChange={(e) => setA({ ...a, name: e.target.value })} className={field} />
            <label className="sr-only" htmlFor="quiz-phone">{quizCopy.fields.phone}</label>
            <input id="quiz-phone" type="tel" autoComplete="tel" placeholder={quizCopy.fields.phone} value={a.phone} onChange={(e) => setA({ ...a, phone: e.target.value })} className={field} />
            <label className="sr-only" htmlFor="quiz-email">{quizCopy.fields.email}</label>
            <input id="quiz-email" type="email" autoComplete="email" placeholder={quizCopy.fields.email} value={a.email} onChange={(e) => setA({ ...a, email: e.target.value })} className={field} />

            <label className="mt-1 flex cursor-pointer items-start gap-3 rounded-[10px] bg-white/[0.04] p-4 ring-1 ring-white/10">
              <input
                type="checkbox"
                checked={a.consent}
                onChange={(e) => setA({ ...a, consent: e.target.checked })}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#157879]"
              />
              <span className="text-[0.8rem] leading-relaxed text-white/60">
                {quizCopy.consent}{" "}
                <a href="/datenschutz" target="_blank" className="font-semibold text-petrol-300 underline-offset-4 hover:underline">
                  Datenschutz
                </a>
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-[10px] bg-[#e08a66]/15 px-4 py-3 text-[0.86rem] text-[#e9a58a]">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-[10px] px-3 py-2.5 text-[0.88rem] font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white disabled:invisible"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {quizCopy.back}
        </button>

        {step < TOTAL - 1 ? (
          <CtaPill size="sm" onClick={next} disabled={!canContinue}>
            {quizCopy.next}
          </CtaPill>
        ) : (
          <CtaPill size="sm" onClick={submit} disabled={!canContinue || sending}>
            {sending ? quizCopy.submitting : quizCopy.submit}
          </CtaPill>
        )}
      </div>
    </div>
  );
}

function optionCls(active: boolean) {
  return `flex items-center gap-3.5 rounded-[12px] border p-4 text-left transition-all ${
    active
      ? "border-petrol-300/70 bg-petrol/20 shadow-[0_0_0_1px_rgba(134,185,186,0.25)]"
      : "border-white/10 bg-white/[0.035] hover:border-petrol-300/40 hover:bg-white/[0.06]"
  }`;
}

function OptionList({ options, selected, onSelect }: { options: Choice[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="grid gap-2.5">
      {options.map((o) => {
        const active = selected === o.value;
        return (
          <button key={o.value} type="button" onClick={() => onSelect(o.value)} aria-pressed={active} className={optionCls(active)}>
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                active ? "border-petrol-300" : "border-white/25"
              }`}
            >
              {active && <span className="h-2.5 w-2.5 rounded-full bg-petrol-300" />}
            </span>
            <span className="text-[0.95rem] text-white/90">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
