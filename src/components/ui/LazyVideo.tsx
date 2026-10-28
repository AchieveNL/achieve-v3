"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { srcSet, IMG_SIZES } from "@/lib/img";

/**
 * Muted background video that only loads/plays while it is in view, and stays
 * paused with reduced motion or when animations are paused. The file itself is
 * only attached after the page has finished loading (and never with Save-Data),
 * so it never competes with the first paint; until then the poster shows.
 */
export function LazyVideo({ src, poster, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  const { paused } = useMotion();
  const inView = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    let idle = 0;
    const go = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      idle = ric ? ric(() => setReady(true), { timeout: 3000 }) : window.setTimeout(() => setReady(true), 1500);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cic) cic(idle);
      else clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !ready) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting && !paused) v.play().catch(() => {});
        else if (!e.isIntersecting && !v.paused) v.pause();
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [paused, ready]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !ready) return;
    if (paused) v.pause();
    else if (inView.current) v.play().catch(() => {});
  }, [paused, ready]);

  // The poster is a real <img> under the video: it paints right away (and counts as the page's largest
  // image), the video covers it once it plays.
  return (
    <>
      {poster && (
        <img src={poster} srcSet={srcSet(poster)} sizes={IMG_SIZES} alt="" aria-hidden="true" decoding="async" className={props.className} style={props.style} />
      )}
      <video ref={ref} src={ready ? src : undefined} {...props} />
    </>
  );
}
