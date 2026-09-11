"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QuizFunnel from "./QuizFunnel";
import { QUIZ_OPEN_EVENT } from "@/lib/quiz-bus";

/**
 * Popup fuer den Quiz-Funnel. Oeffnet auf das Event „quiz:open" (alle CTAs),
 * auf #quiz in der URL oder ?quiz=1 (Deep-Link aus Meta-Anzeigen). Esc und
 * Klick auf den Hintergrund schliessen, die Seite dahinter scrollt nicht.
 */
export default function QuizModal() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setShown(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(QUIZ_OPEN_EVENT, onOpen);
    const params = new URLSearchParams(window.location.search);
    const deepLink = window.location.hash === "#quiz" || params.get("quiz") === "1";
    const t = deepLink ? window.setTimeout(onOpen, 400) : 0;
    return () => {
      window.removeEventListener(QUIZ_OPEN_EVENT, onOpen);
      if (t) window.clearTimeout(t);
    };
  }, []);

  /* Ein Frame nach dem Mount einblenden, beim Schliessen erst ausblenden, dann unmounten */
  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    if (open && !shown) {
      const t = window.setTimeout(() => setOpen(false), 260);
      return () => window.clearTimeout(t);
    }
  }, [open, shown]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const first = panel.current?.querySelector<HTMLElement>("button, input, textarea");
    first?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-end justify-center p-0 transition-opacity duration-300 sm:items-center sm:p-6 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Report anfordern"
    >
      <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
      <div
        ref={panel}
        className={`relative max-h-[92vh] w-full max-w-[640px] overflow-y-auto rounded-t-[22px] bg-[#0f1216] p-6 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] ring-1 ring-white/12 transition-transform duration-300 ease-out sm:rounded-[22px] sm:p-9 ${
          shown ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-petrol/30 blur-3xl"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Schließen"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative">
          <QuizFunnel onDone={close} />
        </div>
      </div>
    </div>
  );
}
