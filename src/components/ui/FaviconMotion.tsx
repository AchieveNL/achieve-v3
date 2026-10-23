"use client";

import { useEffect } from "react";

/**
 * Animated favicon. Firefox animates the SVG favicon by itself; Chrome, Edge and Safari only show
 * its first frame. So we draw the same animation on a small canvas and swap the tab icon about
 * ten times a second (browsers slow this down to ~1/s in background tabs, which is fine).
 * Matches the design: background drifting navy → purple → blue, a cluster of soft glows,
 * and a light streak sliding over the A every 4.5 s.
 */

const A_PATH = "M26.6 12h10.8l14.6 40h-10.4l-2.9-8.4H25.3L22.4 52H12zM27.9 36.2h8.2L32 23.8z";
const NAVY: RGB = [31, 36, 108];
const PURPLE: RGB = [134, 57, 250];
const BLUE: RGB = [15, 138, 229];

type RGB = [number, number, number];
type Stop = [number, number];

const ease = (x: number) => x * x * (3 - 2 * x);
/** Value at time t (seconds) for keyframes [fraction, value] over `dur`, eased per segment like CSS ease-in-out. */
function key(t: number, dur: number, stops: Stop[]) {
  const p = (t % dur) / dur;
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, va] = stops[i];
    const [b, vb] = stops[i + 1];
    if (p >= a && p <= b) return va + (vb - va) * ease(b === a ? 0 : (p - a) / (b - a));
  }
  return stops[stops.length - 1][1];
}
const mix = (c1: RGB, c2: RGB, k: number) => c1.map((v, i) => Math.round(v + (c2[i] - v) * k)) as RGB;
function bgColor(t: number): RGB {
  const p = (t % 9) / 9;
  if (p < 1 / 3) return mix(NAVY, PURPLE, ease(p * 3));
  if (p < 2 / 3) return mix(PURPLE, BLUE, ease((p - 1 / 3) * 3));
  return mix(BLUE, NAVY, ease((p - 2 / 3) * 3));
}

export function FaviconMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (/firefox/i.test(navigator.userAgent)) return; // animates the SVG itself
    const S = 64;
    const cv = document.createElement("canvas");
    cv.width = S;
    cv.height = S;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const aPath = new Path2D();
    aPath.addPath(new Path2D(A_PATH), new DOMMatrix().translate(32, 32).scale(1.1).translate(-32, -32));
    const bg = new Path2D();
    bg.roundRect(0, 0, 64, 64, 9);

    // One icon link we own; the static SVG stays in the HTML for crawlers and no-JS.
    // Chrome prefers an SVG icon over a PNG one, so park the static icon while we animate.
    const statics = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'));
    statics.forEach((l) => (l.rel = "x-static-icon"));
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);

    const glow = (cx: number, cy: number, r: number, rgb: RGB, a: number, op: number) => {
      if (op <= 0.01) return;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const c = `${rgb[0]},${rgb[1]},${rgb[2]}`;
      g.addColorStop(0, `rgba(${c},${0.6 * a * op})`);
      g.addColorStop(0.5, `rgba(${c},${0.28 * a * op})`);
      g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const start = performance.now();
    const draw = () => {
      const t = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, S, S);
      ctx.save();
      ctx.clip(bg);
      const [r, g, b] = bgColor(t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, 0, S, S);
      // glow cluster drifting as a group
      const clx = key(t, 12, [[0, 0], [0.25, 10], [0.5, -8], [0.75, -10], [1, 0]]);
      const cly = key(t, 12, [[0, 0], [0.25, 8], [0.5, 10], [0.75, -8], [1, 0]]);
      const o1 = key(t, 9, [[0, 0], [1 / 3, 1], [2 / 3, 0], [1, 0]]);
      const o2 = key(t, 9, [[0, 0], [1 / 3, 0], [2 / 3, 1], [1, 0]]);
      const o3 = key(t, 9, [[0, 1], [1 / 3, 0], [2 / 3, 0], [1, 1]]);
      glow(26 + clx + key(t, 5, [[0, 0], [1 / 3, 4], [2 / 3, -2], [1, 0]]), 26 + cly + key(t, 5, [[0, 0], [1 / 3, -3], [2 / 3, 3], [1, 0]]), 32, [180, 141, 255], 1, o1);
      glow(38 + clx + key(t, 6, [[0, 0], [1 / 3, -4], [2 / 3, 2], [1, 0]]), 36 + cly + key(t, 6, [[0, 0], [1 / 3, 3], [2 / 3, -3], [1, 0]]), 30, [94, 192, 250], 1, o2);
      glow(30 + clx + key(t, 5.5, [[0, 0], [1 / 3, 4], [2 / 3, -3], [1, 0]]), 30 + cly + key(t, 5.5, [[0, 0], [1 / 3, -3], [2 / 3, 3], [1, 0]]), 32, [111, 120, 224], 1, o3);
      ctx.restore();
      // the A, with a light streak passing over it
      ctx.save();
      ctx.clip(aPath, "evenodd");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, S, S);
      const sx = key(t, 4.5, [[0, 0], [0.7, 0], [1, 150]]);
      if (sx > 0 && sx < 150) {
        ctx.setTransform(1, 0, Math.tan((-18 * Math.PI) / 180), 1, 0, 0);
        const x = -40 + sx;
        const sg = ctx.createLinearGradient(x, 0, x + 28, 0);
        sg.addColorStop(0, "rgba(134,57,250,0)");
        sg.addColorStop(0.5, "rgba(134,57,250,0.4)");
        sg.addColorStop(1, "rgba(134,57,250,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(x, 0, 28, 64);
      }
      ctx.restore();
      // Next can put its own icon links back on navigation; keep ours the only active one.
      document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((l) => {
        if (l !== link) {
          l.rel = "x-static-icon";
          if (!statics.includes(l)) statics.push(l);
        }
      });
      if (!link.isConnected) document.head.appendChild(link);
      link.href = cv.toDataURL("image/png");
    };
    draw();
    const id = window.setInterval(draw, 100);
    return () => {
      window.clearInterval(id);
      link.remove();
      statics.forEach((l) => (l.rel = "icon"));
    };
  }, []);
  return null;
}
