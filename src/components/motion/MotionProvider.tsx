"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One switch for all moving parts (marquees, floating cards, auto-rotating
 * content), like the pause button in the design. Also respects
 * prefers-reduced-motion.
 */
type MotionCtx = { paused: boolean; reduced: boolean; toggle: () => void; pausedRef: { current: boolean } };
const Ctx = createContext<MotionCtx | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  useEffect(() => {
    pausedRef.current = paused || reduced;
  }, [paused, reduced]);
  const toggle = useCallback(() => setPaused((p) => !p), []);
  return <Ctx.Provider value={{ paused: paused || reduced, reduced, toggle, pausedRef }}>{children}</Ctx.Provider>;
}

export function useMotion(): MotionCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMotion() must be used inside <MotionProvider>");
  return v;
}

/**
 * requestAnimationFrame loop. The callback gets (now ms, dt seconds, t seconds since start).
 * Paused frames are skipped (time does not advance), reduced motion stops the loop.
 */
export function useFrame(cb: (now: number, dt: number, t: number) => void, enabled = true) {
  const { pausedRef, reduced } = useMotion();
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!enabled || reduced) return;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) {
        t += dt;
        cbRef.current(now, dt, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced, pausedRef]);
}

/** setInterval that respects the pause switch and reduced motion. */
export function useTick(ms: number, cb: () => void, enabled = true) {
  const { pausedRef, reduced } = useMotion();
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!enabled || reduced) return;
    const id = setInterval(() => {
      if (!pausedRef.current) cbRef.current();
    }, ms);
    return () => clearInterval(id);
  }, [ms, enabled, reduced, pausedRef]);
}
