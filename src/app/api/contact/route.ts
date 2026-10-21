import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Forwards the lead as JSON to CONTACT_WEBHOOK_URL
 * (e.g. a Make/Zapier/n8n webhook or your CRM). Set it in Vercel → Settings → Environment Variables.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const naam = String(body.naam ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!naam || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 422 });
  }
  const lead = {
    naam,
    email,
    telefoon: String(body.telefoon ?? "").trim(),
    bericht: String(body.bericht ?? "").trim(),
    bron: String(body.bron ?? ""),
    ontvangen: new Date().toISOString(),
  };
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    console.warn("[contact] CONTACT_WEBHOOK_URL is not set; lead not forwarded", lead);
    return NextResponse.json({ ok: true, forwarded: false });
  }
  const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
  return NextResponse.json({ ok: res.ok, forwarded: res.ok }, { status: res.ok ? 200 : 502 });
}
