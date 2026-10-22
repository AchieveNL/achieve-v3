/**
 * All forms (contact, CTA, job applications) send their lead the same way the old
 * achieve.nl did: to FormSubmit, which e-mails it to info@achieve.nl.
 *
 * 1. Try FormSubmit's AJAX endpoint, so the visitor stays on our site and lands on
 *    our own thank-you page.
 * 2. If that fails (network, or FormSubmit asks for activation/captcha), fall back to
 *    a normal browser form post (exactly what the old site did). FormSubmit then
 *    handles it on its own page and sends the visitor back to our thank-you page.
 */
const TO = "info@achieve.nl";
const AJAX = `https://formsubmit.co/ajax/${TO}`;
const PLAIN = `https://formsubmit.co/${TO}`;

/** Our internal field names → the labels that appear in the e-mail. */
const LABELS: Record<string, string> = {
  naam: "Naam",
  email: "E-mailadres",
  telefoon: "Telefoonnummer",
  bedrijf: "Bedrijf",
  dienst: "Dienst",
  vacature: "Vacature",
  bericht: "Bericht",
  toestemming: "Toestemming",
  cv: "CV",
  motivatie: "Motivatiebrief",
  bron: "Pagina",
};

export type LeadValue = string | File;

export async function sendLead(fields: Record<string, LeadValue | undefined>, thanksPath: string) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined) continue;
    if (typeof v === "string") {
      if (v.trim()) fd.append(LABELS[k] ?? k, v.trim());
    } else if (v.size > 0) fd.append(LABELS[k] ?? k, v, v.name);
  }
  const naam = typeof fields.naam === "string" ? fields.naam.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const vacature = typeof fields.vacature === "string" ? fields.vacature.trim() : "";
  fd.append(
    "_subject",
    vacature ? `Sollicitatie ${vacature}${naam ? ` – ${naam}` : ""}` : `Nieuwe aanvraag via achieve.nl${naam ? ` – ${naam}` : ""}`,
  );
  if (email) fd.append("_replyto", email);
  fd.append("_template", "table");
  fd.append("_captcha", "false");
  const thanks = new URL(thanksPath, window.location.origin).href;

  try {
    const res = await fetch(AJAX, { method: "POST", body: fd, headers: { Accept: "application/json" } });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    if (res.ok && (data?.success === true || data?.success === "true")) {
      window.location.assign(thanks);
      return;
    }
  } catch {
    /* fall through to the plain form post */
  }

  // Fallback: real browser form post, files included.
  const form = document.createElement("form");
  form.action = PLAIN;
  form.method = "POST";
  form.enctype = "multipart/form-data";
  form.style.display = "none";
  fd.set("_next", thanks);
  for (const [k, v] of fd.entries()) {
    const input = document.createElement("input");
    input.name = k;
    if (typeof v === "string") {
      input.type = "hidden";
      input.value = v;
    } else {
      input.type = "file";
      const dt = new DataTransfer();
      dt.items.add(v);
      input.files = dt.files;
    }
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}
