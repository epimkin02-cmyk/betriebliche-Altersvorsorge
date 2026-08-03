"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowIcon, CheckIcon } from "./ui";
import {
  incomes,
  measuresEmployee,
  measuresOwner,
  positions,
  timing,
  type Choice,
} from "@/content/quiz";

type Answers = {
  position: string;
  income: string;
  measures: string[];
  bottleneck: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

const empty: Answers = {
  position: "",
  income: "",
  measures: [],
  bottleneck: "",
  timing: "",
  name: "",
  phone: "",
  email: "",
  consent: false,
};

const TOTAL = 6;

export default function CheckFunnel() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(empty);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner = a.position === "ggf" || a.position === "gf" || a.position === "selbststaendig";
  const measureOptions = isOwner ? measuresOwner : measuresEmployee;

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return a.position !== "";
      case 1:
        return a.income !== "";
      case 2:
        return a.measures.length > 0;
      case 3:
        return true; // Freitext ist freiwillig
      case 4:
        return a.timing !== "";
      case 5:
        return (
          a.name.trim().length > 1 &&
          /^[+\d][\d\s/()-]{6,}$/.test(a.phone.trim()) &&
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email.trim()) &&
          a.consent
        );
      default:
        return false;
    }
  }, [step, a]);

  function next() {
    if (!canContinue) return;
    setStep((s) => Math.min(TOTAL - 1, s + 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  /** Direkt-Auswahl: eine Antwort anklicken → automatisch weiter. */
  function pick(key: "position" | "income" | "timing", value: string) {
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
        body: JSON.stringify(a),
      });
      if (!res.ok) throw new Error("Antwort vom Server war nicht ok");
      router.push("/danke");
    } catch {
      setError(
        "Da ist etwas schiefgelaufen. Bitte versuch es noch einmal – oder ruf einfach kurz an: 069 284878.",
      );
      setSending(false);
    }
  }

  return (
    <div className="rounded-[16px] border border-line bg-white p-6 shadow-[var(--shadow-mid)] sm:p-10">
      {/* Fortschritt */}
      <div className="mb-8">
        <div className="mb-2.5 flex items-center justify-between text-[0.78rem] font-medium text-graybrand">
          <span>
            Schritt {step + 1} von {TOTAL}
          </span>
          <span>ca. {Math.max(1, TOTAL - step - 1) * 20} Sekunden übrig</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-nebel">
          <div
            className="h-full rounded-full bg-petrol transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <Question
          title="Was beschreibt dich am besten?"
          sub="Danach wissen wir, welche Wege ins Privatvermögen für dich überhaupt infrage kommen."
        >
          <OptionList options={positions} selected={a.position} onSelect={(v) => pick("position", v)} />
        </Question>
      )}

      {step === 1 && (
        <Question
          title="Wie viel Netto ziehst du dir jährlich raus?"
          sub="Grober Rahmen genügt. Er entscheidet über deinen Grenzsteuersatz – und damit über die Größe des Hebels."
        >
          <OptionList options={incomes} selected={a.income} onSelect={(v) => pick("income", v)} />
        </Question>
      )}

      {step === 2 && (
        <Question
          title="Was nutzt du heute schon?"
          sub="Mehrfachauswahl möglich. So sehen wir, wo dein Spielraum noch offen liegt."
        >
          <div className="grid gap-2.5">
            {measureOptions.map((o) => {
              const active = a.measures.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggleMeasure(o.value)}
                  aria-pressed={active}
                  className={`flex items-center gap-3.5 rounded-[10px] border p-4 text-left transition-all ${
                    active
                      ? "border-petrol bg-petrol-50 shadow-[0_4px_16px_rgba(21,120,121,0.12)]"
                      : "border-line hover:border-petrol-300 hover:bg-soft"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors ${
                      active ? "border-petrol bg-petrol text-white" : "border-line-strong"
                    }`}
                  >
                    {active && (
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                        <path
                          d="M3.5 8.5l3 3 6-7"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-[0.97rem] font-medium text-ink">{o.label}</span>
                </button>
              );
            })}
          </div>
        </Question>
      )}

      {step === 3 && (
        <Question
          title="Was ist aktuell dein größter Engpass?"
          sub="Ein, zwei Sätze reichen – was hält dich davon ab, mehr Privatvermögen aus der Gesellschaft zu ziehen? (Freiwillig)"
        >
          <textarea
            value={a.bottleneck}
            onChange={(e) => setA({ ...a, bottleneck: e.target.value })}
            rows={5}
            maxLength={800}
            placeholder="z. B.: In der GmbH liegt Kapital, aber niemand rechnet mir konkret vor, wie es sicher privat wird."
            className="w-full resize-none rounded-[10px] border border-line bg-soft p-4 text-[0.97rem] text-ink outline-none transition-colors placeholder:text-graybrand focus:border-petrol focus:bg-white"
          />
        </Question>
      )}

      {step === 4 && (
        <Question
          title="Wie schnell willst du das Thema angehen?"
          sub="Damit wir dich nicht drängen – und dich auch nicht vergessen."
        >
          <OptionList options={timing} selected={a.timing} onSelect={(v) => pick("timing", v)} />
        </Question>
      )}

      {step === 5 && (
        <Question
          title="Wohin dürfen wir dein Ergebnis schicken?"
          sub="Du bekommst deine Auswertung und den Ratgeber „Die 3 GGF-Hebel“ – auf Wunsch das Ergebnis per WhatsApp."
        >
          <div className="grid gap-4">
            <Field
              label="Vollständiger Name"
              value={a.name}
              onChange={(v) => setA({ ...a, name: v })}
              autoComplete="name"
              placeholder="Vor- und Nachname"
            />
            <Field
              label="Mobilnummer (für dein Ergebnis)"
              value={a.phone}
              onChange={(v) => setA({ ...a, phone: v })}
              type="tel"
              autoComplete="tel"
              placeholder="+49 …"
              hint="Bitte achte auf die korrekte Nummer – sonst können wir kein Ergebnis zustellen."
            />
            <Field
              label="Deine beste E-Mail-Adresse"
              value={a.email}
              onChange={(v) => setA({ ...a, email: v })}
              type="email"
              autoComplete="email"
              placeholder="name@unternehmen.de"
            />

            <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-[10px] bg-soft p-4">
              <input
                type="checkbox"
                checked={a.consent}
                onChange={(e) => setA({ ...a, consent: e.target.checked })}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#157879]"
              />
              <span className="text-[0.85rem] leading-relaxed text-ink/70">
                Ich bin damit einverstanden, dass Führungsvorsorge mich zu meiner Anfrage per E-Mail,
                Telefon oder WhatsApp kontaktiert und meine Angaben dafür verarbeitet. Die
                Einwilligung kann ich jederzeit widerrufen. Es gilt die{" "}
                <a href="/datenschutz" target="_blank" className="font-medium text-petrol underline">
                  Datenschutzerklärung
                </a>
                .
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-[10px] bg-[#fdf3f0] px-4 py-3 text-[0.88rem] text-[#a8442a]">
                {error}
              </p>
            )}
          </div>
        </Question>
      )}

      {/* Navigation */}
      <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-[10px] px-3 py-2.5 text-[0.9rem] font-medium text-ink/55 transition-colors hover:bg-soft hover:text-ink disabled:invisible"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Zurück
        </button>

        {step < TOTAL - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 rounded-[10px] bg-petrol px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-petrol-600 disabled:cursor-not-allowed disabled:bg-nebel disabled:text-ink/35 disabled:hover:translate-y-0"
          >
            Weiter
            <ArrowIcon />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canContinue || sending}
            className="inline-flex items-center gap-2 rounded-[10px] bg-petrol px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-petrol-600 disabled:cursor-not-allowed disabled:bg-nebel disabled:text-ink/35 disabled:hover:translate-y-0"
          >
            {sending ? "Wird gesendet …" : "Ergebnis & Ratgeber anfordern"}
            {!sending && <ArrowIcon />}
          </button>
        )}
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-graybrand">
        <li className="flex items-center gap-1.5">
          <CheckIcon className="h-4 w-4 text-petrol" /> Kostenlos & unverbindlich
        </li>
        <li className="flex items-center gap-1.5">
          <CheckIcon className="h-4 w-4 text-petrol" /> Kein Verkaufsdruck
        </li>
        <li className="flex items-center gap-1.5">
          <CheckIcon className="h-4 w-4 text-petrol" /> Keine Weitergabe an Dritte
        </li>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ Bausteine */

function Question({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="h-title text-[1.35rem] sm:text-[1.6rem]">{title}</h2>
      <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink/60">{sub}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function OptionList({
  options,
  selected,
  onSelect,
}: {
  options: Choice[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-2.5">
      {options.map((o) => {
        const active = selected === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(o.value)}
            aria-pressed={active}
            className={`flex items-center gap-3.5 rounded-[10px] border p-4 text-left transition-all ${
              active
                ? "border-petrol bg-petrol-50 shadow-[0_4px_16px_rgba(21,120,121,0.12)]"
                : "border-line hover:border-petrol-300 hover:bg-soft"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                active ? "border-petrol" : "border-line-strong"
              }`}
            >
              {active && <span className="h-2.5 w-2.5 rounded-full bg-petrol" />}
            </span>
            <span>
              <span className="block text-[0.97rem] font-medium text-ink">{o.label}</span>
              {o.hint && <span className="mt-0.5 block text-[0.83rem] text-graybrand">{o.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
}) {
  const id = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.88rem] font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[10px] border border-line bg-soft px-4 py-3.5 text-[0.97rem] text-ink outline-none transition-colors placeholder:text-graybrand focus:border-petrol focus:bg-white"
      />
      {hint && <p className="mt-1.5 text-[0.8rem] text-graybrand">{hint}</p>}
    </div>
  );
}
