import { NextResponse } from "next/server";

/**
 * Lead-Endpunkt des Quiz-Funnels.
 * ---------------------------------------------------------------------------
 * ⚠️ TODO · SETUP: Hier wird der Lead aktuell nur validiert und (in der
 * Vercel-Konsole) protokolliert. Für den Live-Betrieb eine der folgenden
 * Anbindungen ergänzen:
 *
 *   1. Webhook (z. B. Make.com / Zapier / n8n → CRM + Mailversand des Reports)
 *      → einfach die Umgebungsvariable LEAD_WEBHOOK_URL in Vercel setzen,
 *        dann leitet dieser Endpunkt automatisch weiter. Kein Code nötig.
 *
 *   2. Direkte CRM-API oder E-Mail-Versand (z. B. Resend, Brevo) – dann hier
 *      unterhalb des Webhook-Blocks ergänzen.
 *
 * DSGVO-Hinweis: Es werden personenbezogene Daten verarbeitet. Vor dem
 * Livegang Auftragsverarbeitungsverträge mit allen eingesetzten Diensten
 * schließen und die Datenschutzerklärung entsprechend ergänzen.
 */

type LeadPayload = {
  position?: string;
  income?: string;
  measures?: string[];
  bottleneck?: string;
  timing?: string;
  name?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let data: LeadPayload;

  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();

  if (name.length < 2 || !EMAIL_RE.test(email) || phone.length < 6) {
    return NextResponse.json({ error: "Bitte prüfe Name, E-Mail und Telefonnummer." }, { status: 422 });
  }

  if (data.consent !== true) {
    return NextResponse.json({ error: "Ohne Einwilligung können wir nichts zusenden." }, { status: 422 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone,
    position: data.position ?? "",
    income: data.income ?? "",
    measures: Array.isArray(data.measures) ? data.measures : [],
    bottleneck: (data.bottleneck ?? "").slice(0, 800),
    timing: data.timing ?? "",
    source: "landingpage-check",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error("[lead] Webhook antwortete mit", res.status);
        return NextResponse.json({ error: "Weiterleitung fehlgeschlagen." }, { status: 502 });
      }
    } catch (err) {
      console.error("[lead] Webhook nicht erreichbar:", err);
      return NextResponse.json({ error: "Weiterleitung fehlgeschlagen." }, { status: 502 });
    }
  } else {
    // Kein Webhook konfiguriert – Lead geht sonst verloren. Deutlich loggen.
    console.warn(
      "[lead] LEAD_WEBHOOK_URL ist nicht gesetzt. Der Lead wurde NICHT weitergeleitet:",
      JSON.stringify(lead),
    );
  }

  return NextResponse.json({ ok: true });
}
