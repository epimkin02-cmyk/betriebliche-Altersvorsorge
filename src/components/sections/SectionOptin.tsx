"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Reveal from "../Reveal";
import { ArrowIcon, Container } from "../ui";
import { optin } from "@/content/site";

/**
 * SECTION 3 · Opt-in
 * Zwei Felder, wie im Figma-Wireframe. Der Lead geht an /api/lead; sobald dort
 * LEAD_WEBHOOK_URL gesetzt ist, landet er im CRM.
 *
 * ⚠️ OFFEN: Der weitere Funnel ist bewusst noch nicht verdrahtet. Der
 * Quiz unter /check existiert unverändert weiter und kann später als zweiter
 * Schritt hinter die Danke-Seite gehängt werden.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "error";

export default function SectionOptin() {
  const router = useRouter();
  const nameId = useId();
  const mailId = useId();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    if (firstName.trim().length < 2) {
      setError(optin.errors.firstName);
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError(optin.errors.email);
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName.trim(),
          email: email.trim(),
          source: "freebie-optin",
          consent: true,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/danke");
    } catch {
      setStatus("error");
      setError(optin.errors.generic);
    }
  }

  const sending = status === "sending";
  const field =
    "w-full rounded-[10px] bg-black/35 px-4 py-3.5 text-[0.98rem] text-white ring-1 ring-white/12 transition-colors placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-petrol-300";

  return (
    <section
      id="ratgeber"
      className="grid-veil relative scroll-mt-20 overflow-hidden bg-ink text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0c1a1a_0%,#101217_55%,#0a0d11_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-12%,rgba(21,120,121,0.32),transparent_66%)]"
      />

      <Container className="relative z-10 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow text-center text-petrol-300">{optin.eyebrow}</p>

          <div className="mx-auto mt-10 w-full max-w-[420px]">
            <div className="rounded-[16px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] p-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/12">
              <h2 className="h-title text-[1.12rem] text-white">{optin.title}</h2>

              <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
                <div>
                  <label htmlFor={nameId} className="sr-only">
                    {optin.fields.firstName}
                  </label>
                  <input
                    id={nameId}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder={optin.fields.firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={sending}
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor={mailId} className="sr-only">
                    {optin.fields.email}
                  </label>
                  <input
                    id={mailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={optin.fields.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sending}
                    className={field}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-between gap-2 rounded-[10px] bg-[linear-gradient(90deg,#157879_0%,#1fa096_100%)] px-5 py-4 text-[0.98rem] font-semibold text-white shadow-[0_14px_36px_-10px_rgba(21,120,121,0.75)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {sending ? optin.submitting : optin.submit}
                  {!sending && <ArrowIcon className="h-4 w-4 shrink-0" />}
                </button>

                <p aria-live="polite" className="min-h-[1.25rem]">
                  {error && <span className="text-[0.82rem] text-[#e08a66]">{error}</span>}
                </p>

                <p className="text-center text-[0.78rem] leading-relaxed text-white/45">
                  {optin.microcopy}
                </p>
              </form>
            </div>

            <p className="mt-5 text-center text-[0.74rem] leading-relaxed text-white/35">
              {optin.consent}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
