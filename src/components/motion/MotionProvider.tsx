"use client";

import { createContext, useCallback, useContext, useEffect, useEffectEvent, useRef, useState, type ReactNode, type RefObject } from "react";

/**
 * One switch for all moving parts (marquees, floating cards, auto-rotating
 * content), like the pause button in the design. Also respects
 * prefers-reduced-motion.
 */
type MotionCtx = { paused: boolean; reduced: boolean; live: boolean; toggle: () => void };
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
  // Frame loops start once the page has loaded and gone idle, so the first paint and the
  // load itself get the main thread to themselves. (Things look the same; they start moving a moment later.)
  const [live, setLive] = useState(false);
  useEffect(() => {
    let idle = 0;
    const go = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      idle = ric ? ric(() => setLive(true), { timeout: 1500 }) : window.setTimeout(() => setLive(true), 500);
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
  const toggle = useCallback(() => setUserPaused((p) => !p), []);
  return <Ctx.Provider value={{ paused: userPaused || reduced, reduced, live, toggle }}>{children}</Ctx.Provider>;
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
export function useFrame(cb: (now: number, dt: number, t: number) => void, enabled = true, target?: RefObject<Element | null>) {
  const { paused, live } = useMotion();
  const t = useRef(0);
  // Only animate what is on screen: off-screen loops still cost a style pass every frame.
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = target?.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => setInView(es.some((e) => e.isIntersecting)), { rootMargin: "120px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  const onFrame = useEffectEvent((now: number, dt: number) => {
    t.current += dt;
    cb(now, dt, t.current);
  });
  useEffect(() => {
    if (!enabled || paused || !live || !inView) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      // rAF timestamps can be slightly earlier than performance.now() at start: never let time run backwards.
      const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
      last = now;
      onFrame(now, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled, paused, live, inView]);
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
