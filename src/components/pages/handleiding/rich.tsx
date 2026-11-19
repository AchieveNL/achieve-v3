import { Fragment, type ReactNode } from "react";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Small markup for translatable guide sentences, so a whole sentence (with its bold words and links)
 * is one dictionary entry:
 *   **woord**        → <b>woord</b>
 *   [tekst](sleutel)  → link in a new tab, bold text; the URL comes from `links[sleutel]`
 *   [tekst](~sleutel) → same, without bold
 *   {NAAM}           → `slots.NAAM` (for example the business ID with its copy button)
 */
export function rich(s: string, links: Record<string, string> = {}, slots: Record<string, ReactNode> = {}): ReactNode {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((~?)([\w-]+)\)|\{(\w+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={k++}>{m[1]}</b>);
    else if (m[2] !== undefined) {
      const href = links[m[4]] ?? "#";
      out.push(
        <a key={k++} href={href} {...(/^(mailto|tel):/.test(href) ? {} : ext)}>
          {m[3] ? m[2] : <b>{m[2]}</b>}
        </a>,
      );
    } else out.push(<Fragment key={k++}>{slots[m[5]] ?? m[0]}</Fragment>);
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}

/** Fill {n}-style numbers into an already translated sentence. */
export function fill(s: string, vals: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (all, k) => (k in vals ? String(vals[k]) : all));
}
