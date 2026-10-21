"""Generate one client component per service page (Dienst*.dc.html)."""
import json, re, os, subprocess, sys
SVCS = ['Strategy', 'Legal', 'BrandBook', 'WebDevelopment', 'EmailMarketing', 'VideoMarketing', 'UGCMarketing', 'SEA', 'SMA', 'SMM', 'Dashboard', 'Hosting', 'Onderhoud']
D = '/home/claude/achieve-v3/src/components/services'; os.makedirs(D, exist_ok=True)
PRE = r'''import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
//BODY
  // "Op deze pagina": sticks under the header and highlights the section you are reading.
  const jumpRef = useRef<HTMLElement>(null);
  const [act, setAct] = useState("");
  useEffect(() => {
    const bar = jumpRef.current;
    if (!bar) return;
    const ids = Array.from(bar.querySelectorAll("a[href^='#']")).map((a) => a.getAttribute("href")!.slice(1));
    const onScroll = () => {
      const head = document.querySelector(".site-head") as HTMLElement | null;
      const top = head && !head.classList.contains("is-hidden") ? head.offsetHeight : 0;
      bar.style.top = top + "px";
      const line = top + bar.offsetHeight + 24;
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setAct(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const j = (id: string) => ({ c: act === id ? "is-on" : "", a: act === id });

  // Price plans on phones: a swipeable row of cards, centred on the selected plan (Standard first).
  const tfmTrackRef = useRef<HTMLDivElement>(null);
  const [tfmI, setTfmI] = useState(1);
  const tfmGo = useCallback((i: number, smooth: boolean) => {
    const t = tfmTrackRef.current;
    if (!t) return;
    const n = t.children.length;
    const k = Math.max(0, Math.min(n - 1, i));
    const c = t.children[k] as HTMLElement | undefined;
    if (!c) return;
    t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);
  useEffect(() => {
    const el = tfmTrackRef.current;
    if (!el) return;
    tfmGo(1, false);
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bd = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const h2 = c as HTMLElement;
        const d = Math.abs(h2.offsetLeft + h2.offsetWidth / 2 - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setTfmI(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [tfmGo]);
  const [tfmReq, setTfmReq] = useState({ i: 1, n: 0 });
  useEffect(() => {
    if (tfmReq.n > 0) tfmGo(tfmReq.i, true);
  }, [tfmReq, tfmGo]);

  // Web Development: switch between Custom website and Shopify webshop.
  const [wdKind, setWdKind] = useState<"custom" | "shopify">("custom");
  const wdC = wdKind === "custom", wdS = wdKind === "shopify";

  const h = {
    jcUitdagingen: j("uitdagingen").c, jaUitdagingen: j("uitdagingen").a,
    jcOplossing: j("oplossing").c, jaOplossing: j("oplossing").a,
    jcVoordelen: j("voordelen").c, jaVoordelen: j("voordelen").a,
    jcCijfers: j("cijfers").c, jaCijfers: j("cijfers").a,
    jcWaaromWij: j("waarom-wij").c, jaWaaromWij: j("waarom-wij").a,
    jcAanpak: j("aanpak").c, jaAanpak: j("aanpak").a,
    jcPakketten: j("pakketten").c, jaPakketten: j("pakketten").a,
    jcHosting: j("hosting").c, jaHosting: j("hosting").a,
    jcReviews: j("reviews").c, jaReviews: j("reviews").a,
    jcStart: j("start").c, jaStart: j("start").a,
    tfmPlan: ["Basic", "Standard", "Premium"][tfmI],
    tfmCounter: `${tfmI + 1} / 3`,
    tfmPrevOp: tfmI === 0 ? "0.35" : "1",
    tfmNextOp: tfmI === 2 ? "0.35" : "1",
    tfmPrev: () => setTfmReq((r) => ({ i: tfmI - 1, n: r.n + 1 })),
    tfmNext: () => setTfmReq((r) => ({ i: tfmI + 1, n: r.n + 1 })),
    wdIsCustom: wdC, wdIsShop: wdS,
    wdPickCustom: () => setWdKind("custom"), wdPickShop: () => setWdKind("shopify"),
    wdCP: wdC, wdSP: wdS,
    wdCBg: wdC ? "#1F246C" : "transparent", wdSBg: wdS ? "#1F246C" : "transparent",
    wdCCol: wdC ? "#FFFFFF" : "#1F246C", wdSCol: wdS ? "#FFFFFF" : "#1F246C",
    wdCSh: wdC ? "0 6px 16px rgba(31, 36, 108, 0.18)" : "none", wdSSh: wdS ? "0 6px 16px rgba(31, 36, 108, 0.18)" : "none",
  };
'''
open('/tmp/svc_pre.txt', 'w').write(PRE)
for c in SVCS:
    subprocess.run(['python3', 'split_page.py', f'Dienst{c}', f'svc_{c}', '/home/claude/achieve-v3/src/styles/pages/projecten.css', '/home/claude/achieve-v3/src/styles/pages/case.css'], check=True, capture_output=True)
    secs = sorted(f for f in os.listdir(f'svc_{c}') if re.match(r'\d\d\.jsx$', f))
    parts = []
    for f in secs:
        x = open(f'svc_{c}/{f}').read()
        if x.startswith('<div className="em-progress"'): continue
        parts.append(x.replace('<Import_Reviews />', '<Reviews />'))
    open('/tmp/svc.jsx', 'w').write(''.join(parts))
    subprocess.run(['python3', 'post.py', '/tmp/svc.jsx'], check=True)
    jsx = open('/tmp/svc.jsx').read()
    holes = set(re.findall(r'h\.([A-Za-z0-9_]+)', jsx)) - set(re.findall(r'^\s+(\w+):', PRE, re.M)) - set(re.findall(r'(\w+): ', PRE))
    subprocess.run(['python3', 'gen.py', '/tmp/svc.jsx', f'{D}/Dienst{c}Content.tsx', f'Dienst{c}Content', 'client', '/tmp/svc_pre.txt'], check=True)
    print(c, 'unwired holes:', holes - {'01'})
