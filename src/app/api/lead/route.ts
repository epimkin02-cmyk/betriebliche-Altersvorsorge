import { NextResponse } from "next/server";

/**
 * Lead-Endpunkt des Quiz-Funnels.
 * ---------------------------------------------------------------------------
 * Ablauf: validieren → normalisieren → an alle konfigurierten Ziele senden.
 *
 * Ziele (je eine Umgebungsvariable in Vercel, alle optional):
 *   LEADTABLE_WEBHOOK_URL    Leadtable „Lead API"/Webhook der Kampagne
 *   LEADMETRICS_WEBHOOK_URL  Leadmetrics Webhook
 *   LEAD_WEBHOOK_URL         freier Webhook (Make/n8n/Zapier → CRM, Mailversand)
 *   LEAD_WEBHOOK_SECRET      optional, wird als Header X-Lead-Secret mitgeschickt
 *
 * ⚠️ TODO · SPEICHER: Eigene Ablage der Antworten (z. B. Supabase-Tabelle
 * funnel_leads) ist vorbereitet, aber noch nicht entschieden. Bis dahin ist
 * der Lead nur so sicher wie die Webhooks: sind keine gesetzt, wird er nur
 * im Vercel-Log protokolliert.
 *
 * DSGVO: personenbezogene Daten. Vor dem Livegang AV-Vertraege mit Leadtable,
 * Leadmetrics (und ggf. Supabase) und Datenschutzerklaerung ergaenzen.
 */

type Payload = {
  measures?: string[];
  bottleneck?: string;
  income?: string;
  taxAdvisorFee?: string;
  consultingFee?: string;
  name?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
  source?: string;
  page?: string;
  utm?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s/()-]{6,}$/;

const clean = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = clean(data.name);
  const email = clean(data.email).toLowerCase();
  const phone = clean(data.phone, 40);

  if (name.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Bitte prüfe Name und E-Mail-Adresse." }, { status: 422 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Bitte prüfe deine Handynummer." }, { status: 422 });
  }
  if (data.consent !== true) {
    return NextResponse.json({ error: "Ohne Einwilligung können wir nichts zusenden." }, { status: 422 });
  }

  const utm: Record<string, string> = {};
  if (data.utm && typeof data.utm === "object") {
    for (const [k, v] of Object.entries(data.utm)) if (/^(utm_\w+|fbclid)$/.test(k)) utm[k] = clean(v, 200);
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    source: clean(data.source, 40) || "quiz-funnel",
    page: clean(data.page, 200),
    name,
    email,
    phone,
    answers: {
      measures: Array.isArray(data.measures) ? data.measures.map((m) => clean(m, 40)).filter(Boolean) : [],
      bottleneck: clean(data.bottleneck, 800),
      income: clean(data.income, 40),
      taxAdvisorFee: clean(data.taxAdvisorFee, 40),
      consultingFee: clean(data.consultingFee, 40),
    },
    utm,
    userAgent: request.headers.get("user-agent") ?? "",
  };

  const targets = [
    ["leadtable", process.env.LEADTABLE_WEBHOOK_URL],
    ["leadmetrics", process.env.LEADMETRICS_WEBHOOK_URL],
    ["webhook", process.env.LEAD_WEBHOOK_URL],
  ].filter((t): t is [string, string] => Boolean(t[1]));

  if (targets.length === 0) {
    console.warn("[lead] Kein Ziel konfiguriert. Lead NICHT weitergeleitet:", JSON.stringify(lead));
    return NextResponse.json({ ok: true, forwarded: [] });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LEAD_WEBHOOK_SECRET) headers["X-Lead-Secret"] = process.env.LEAD_WEBHOOK_SECRET;

  const results = await Promise.allSettled(
    targets.map(async ([id, url]) => {
      const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(lead) });
      if (!res.ok) throw new Error(`${id} antwortete mit ${res.status}`);
      return id;
    }),
  );

  const ok = results.filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled").map((r) => r.value);
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === "rejected").map((r) => String(r.reason));
  if (failed.length) console.error("[lead] Weiterleitung fehlgeschlagen:", failed, JSON.stringify(lead));

  /* Solange mindestens ein Ziel den Lead hat, ist er nicht verloren. Erst wenn
     alle scheitern, bekommt der Nutzer eine Fehlermeldung und kann es erneut senden. */
  if (ok.length === 0) {
    return NextResponse.json({ error: "Weiterleitung fehlgeschlagen." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, forwarded: ok });
}
