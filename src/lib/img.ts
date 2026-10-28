import { imgWidths } from "@/data/imgsizes";

/** srcSet with 320px and 800px variants for large images, so phones and thumbnails load far fewer bytes. */
export function srcSet(src?: string): string | undefined {
  if (!src) return undefined;
  const w = imgWidths[src];
  if (!w) return undefined;
  const base = src.replace(/\.(webp|jpe?g|png)$/, "");
  return `${base}-320.webp 320w, ${base}-800.webp 800w, ${src} ${w}w`;
}

/** Default `sizes` for content images: full width on phones, about half to two thirds on desktop. */
export const IMG_SIZES = "(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw";
