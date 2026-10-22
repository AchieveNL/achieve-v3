"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

/**
 * Muted background video that only loads/plays while it is (nearly) in view,
 * and stays paused with reduced motion or when animations are paused.
 */
export function LazyVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  const { paused } = useMotion();
  const inView = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting && !paused) v.play().catch(() => {});
        else if (!e.isIntersecting && !v.paused) v.pause();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [paused]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (paused) v.pause();
    else if (inView.current) v.play().catch(() => {});
  }, [paused]);

  return <video ref={ref} {...props} />;
}
