"use client";

import { useRef, type CSSProperties } from "react";
import { clientLogos } from "@/data/logos";
import { useFrame } from "@/components/motion/MotionProvider";

/**
 * Endless row of client logos. The list is rendered four times; the track
 * moves by half its width and wraps, so the loop is seamless.
 */
export function LogoMarquee({
  speed = 14,
  direction = "left",
  style,
}: {
  speed?: number;
  direction?: "left" | "right";
  style?: CSSProperties;
}) {
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  useFrame((_now, dt) => {
    const el = track.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (!half) return;
    pos.current = (pos.current + speed * dt) % half;
    el.style.transform =
      direction === "left" ? `translateX(${(-pos.current).toFixed(1)}px)` : `translateX(${Math.round(-half + pos.current)}px)`;
  });
  return (
    <div className="marquee" style={style}>
      <div ref={track} style={{ display: "flex", alignItems: "center", width: "max-content", willChange: "transform" }}>
        {[0, 1, 2, 3].map((copy) =>
          clientLogos.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${copy}-${l.name}`}
              className="trust-logo trust-light"
              src={l.src}
              alt={copy === 0 ? l.name : ""}
              aria-hidden={copy === 0 ? undefined : true}
              loading="lazy"
              style={{ display: "block", flexShrink: 0, marginRight: 44, height: l.height, width: "auto" }}
            />
          )),
        )}
      </div>
    </div>
  );
}
