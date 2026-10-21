"use client";

import { createContext, useCallback, useContext, useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";

/**
 * One switch for all moving parts (marquees, floating cards, auto-rotating
 * content), like the pause button in the design. Also respects
 * prefers-reduced-motion.
 */
type MotionCtx = { paused: boolean; reduced: boolean; toggle: () => void };
const Ctx = createContext<MotionCtx | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    const id = setTimeout(on, 0);
    mq.addEventListener("change", on);
    return () => {
      clearTimeout(id);
      mq.removeEventListener("change", on);
    };
  }, []);
  const toggle = useCallback(() => setUserPaused((p) => !p), []);
  return <Ctx.Provider value={{ paused: userPaused || reduced, reduced, toggle }}>{children}</Ctx.Provider>;
}

export function useMotion(): MotionCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMotion() must be used inside <MotionProvider>");
  return v;
}

/**
 * requestAnimationFrame loop. The callback gets (now ms, dt seconds, t seconds of running time).
 * While paused (or with reduced motion) the loop stops and time does not advance.
 */
export function useFrame(cb: (now: number, dt: number, t: number) => void, enabled = true) {
  const { paused } = useMotion();
  const t = useRef(0);
  const onFrame = useEffectEvent((now: number, dt: number) => {
    t.current += dt;
    cb(now, dt, t.current);
  });
  useEffect(() => {
    if (!enabled || paused) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      onFrame(now, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled, paused]);
}

/** setInterval that stops while animations are paused or reduced. */
export function useTick(ms: number, cb: () => void, enabled = true) {
  const { paused } = useMotion();
  const onTick = useEffectEvent(cb);
  useEffect(() => {
    if (!enabled || paused) return;
    const id = setInterval(() => onTick(), ms);
    return () => clearInterval(id);
  }, [ms, enabled, paused]);
}
