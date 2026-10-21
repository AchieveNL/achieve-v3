import { NextResponse } from "next/server";

/**
 * Contact form, CTA form and job applications all post here.
 * The lead (and any uploaded CV/motivation) is forwarded to CONTACT_WEBHOOK_URL
 * (Make, Zapier, n8n or your CRM). Set it in Vercel → Settings → Environment Variables.
 */
const MAX_FILE = 10 * 1024 * 1024;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const type = req.headers.get("content-type") ?? "";
  const out = new FormData();
  let naam = "";
  let email = "";
  try {
    if (type.includes("multipart/form-data")) {
      const fd = await req.formData();
      for (const [k, v] of fd.entries()) {
        if (typeof v === "string") out.append(k, v.trim());
        else if (v.size > 0) {
          if (v.size > MAX_FILE) return NextResponse.json({ ok: false, error: "file too large" }, { status: 413 });
          out.append(k, v, v.name);
        }
      }
    } else {
      const body = (await req.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(body)) out.append(k, String(v ?? "").trim());
    }
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }
  naam = String(out.get("naam") ?? "");
  email = String(out.get("email") ?? "");
  if (!naam || !EMAIL.test(email)) return NextResponse.json({ ok: false, error: "missing fields" }, { status: 422 });
  out.append("ontvangen", new Date().toISOString());

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL is not set; lead not forwarded",
      Object.fromEntries([...out.entries()].map(([k, v]) => [k, typeof v === "string" ? v : `[file ${v.name}]`])),
    );
    return NextResponse.json({ ok: true, forwarded: false });
  }
  const res = await fetch(hook, { method: "POST", body: out });
  return NextResponse.json({ ok: res.ok, forwarded: res.ok }, { status: res.ok ? 200 : 502 });
}
