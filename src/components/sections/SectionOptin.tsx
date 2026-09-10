"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Reveal from "../Reveal";
import { Container, CtaPill } from "../ui";
import { optin } from "@/content/site";

/**
 * SECTION 3 · Opt-in
 * Zwei Felder, wie im Figma-Wireframe. Links das echte Cover und die drei
 * Kapitel des Ratgebers, rechts das Formular. Der Lead geht an /api/lead;
 * sobald dort LEAD_WEBHOOK_URL gesetzt ist, landet er im CRM.
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
      {/* Nav-Anker „Die Lösung": der Ratgeber ist sie. Der CTA nutzt weiter #ratgeber. */}
      <span id="loesung" className="absolute top-0" aria-hidden="true" />
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
          <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Links: Cover + Kapitel */}
            <div className="relative overflow-hidden bg-[linear-gradient(160deg,rgba(21,120,121,0.28)_0%,rgba(21,120,121,0.06)_50%,transparent_100%)] p-8 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-petrol/30 blur-3xl"
              />
              <div className="relative flex items-start gap-6 sm:gap-8">
                <div className="hidden w-[132px] shrink-0 rotate-[-4deg] overflow-hidden rounded-[6px] shadow-[0_24px_40px_-14px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:block">
                  <Image src="/ratgeber-cover.png" alt="Cover des Ratgebers" width={848} height={1200} sizes="132px" className="h-auto w-full" />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-petrol-300">{optin.eyebrow}</p>
                  <h2 className="h-display mt-4 text-[clamp(1.6rem,3.2vw,2.2rem)] text-white">
                    {optin.headline[0]}
                    <span className="serif block italic text-petrol-300">{optin.headline[1]}</span>
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[0.96rem] leading-relaxed text-white/60">{optin.lead}</p>
                </div>
              </div>

              <ol className="relative mt-9 divide-y divide-white/10 border-t border-white/10">
                {optin.chapters.map((c) => (
                  <li key={c.n} className="grid grid-cols-[2.4rem_1fr] gap-x-3 py-4">
                    <span className="eyebrow pt-0.5 text-petrol-300">{c.n}</span>
                    <span>
                      <span className="h-title block text-[0.96rem] text-white">{c.title}</span>
                      <span className="mt-0.5 block text-[0.86rem] leading-relaxed text-white/50">{c.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Rechts: Formular */}
            <div className="border-t border-white/10 bg-black/25 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="h-title text-[1.15rem] text-white">{optin.title}</h3>

              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-3">
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

                <div className="pt-1">
                  <CtaPill type="submit" disabled={sending} block>
                    {sending ? optin.submitting : optin.submit}
                  </CtaPill>
                </div>

                <p aria-live="polite" className="min-h-[1.25rem]">
                  {error && <span className="text-[0.82rem] text-[#e08a66]">{error}</span>}
                </p>

                <ul className="space-y-1.5 text-[0.8rem] text-white/50">
                  {["18 Seiten als PDF, sofort per E-Mail", "Kostenfrei, kein Abo", "Kein Anruf ohne deine Zustimmung"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="inline-block h-1 w-1 rounded-full bg-petrol-300" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </form>

              <p className="mt-6 text-[0.72rem] leading-relaxed text-white/35">{optin.consent}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
