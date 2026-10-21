import { notFound } from "next/navigation";

/** Any unknown address shows the 404 page (src/app/[locale]/not-found.tsx). */
export default function CatchAll() {
  notFound();
}
