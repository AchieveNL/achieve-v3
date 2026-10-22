"""Generate Tarieven, Contact, Werken bij (+2 vacatures), Bedankt, 404 and the legal pages."""
import json, re, os, subprocess
P = '../artifact-files/8505e679-cfc6-4d1e-9a5b-046fda58f0d0/project/'
D = '/home/claude/achieve-v3/src/components/pages'; os.makedirs(D, exist_ok=True)
CSSD = '/home/claude/achieve-v3/src/styles/pages'
BASE_CSS = [f'{CSSD}/projecten.css', f'{CSSD}/case.css']
SIMPLE = ['Bedankt', 'NietGevonden', 'Privacy', 'Voorwaarden', 'Disclaimer']
PAGES = ['Tarieven', 'Contact', 'WerkenBij', 'VacatureSales', 'VacatureContent'] + SIMPLE

FORM = r'''
  // Contact/application form: native validation, then send everything (files included) to /api/contact and show the thank-you page.
  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const box = btn.closest("section") ?? document.body;
    const fields = Array.from(box.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) {
      bad.reportValidity();
      return;
    }
    const fd = new FormData();
    for (const f of fields) {
      if (!f.name) continue;
      if (f instanceof HTMLInputElement && f.type === "file") {
        if (f.files?.[0]) fd.append(f.name, f.files[0]);
      } else if (f instanceof HTMLInputElement && f.type === "checkbox") fd.append(f.name, f.checked ? "ja" : "nee");
      else fd.append(f.name, f.value);
    }
    fd.append("bron", window.location.pathname);
    btn.disabled = true;
    try {
      await fetch("/api/contact", { method: "POST", body: fd });
    } catch {
      /* the thank-you page still shows; the team follows up */
    }
    window.location.assign(href("Bedankt"));
  };
'''
WB = r'''
  // Intern reviews: scrolling row (pause button) and a dialog with the full review.
  const WBR: [string, string, string][] = %s;
  const [wbPaused, setWbPaused] = useState(false);
  const [wbRev, setWbRev] = useState(-1);
  useEffect(() => {
    if (wbRev < 0) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWbRev(-1);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [wbRev]);
  const wbOpen = (i: number) => () => setWbRev(i);
'''
WB_H = '''    wbrCls: wbPaused ? "is-paused" : "", wbRunning: !wbPaused, wbStopped: wbPaused, wbPressed: wbPaused,
    wbLabel: wbPaused ? "Reviews afspelen" : "Reviews pauzeren", wbToggle: () => setWbPaused((p) => !p),
    wbRevOpen: wbRev >= 0, wbRevName: wbRev >= 0 ? WBR[wbRev][0] : "", wbRevRole: wbRev >= 0 ? WBR[wbRev][1] : "", wbRevQuote: wbRev >= 0 ? WBR[wbRev][2] : "",
    wbClose: () => setWbRev(-1),
''' + ''.join(f'    wbOpen{i}: wbOpen({i}),\n' for i in range(11))
TF = r'''
  // Price list: chips pick a service; only that table is shown. On phones the plans are a swipeable row.
  const SVCS = %s;
  const [sel, setSel] = useState("sea");
  const tfResRef = useRef<HTMLDivElement>(null);
  const tfcRowRef = useRef<HTMLDivElement>(null);
  const tfmTrackRef = useRef<HTMLDivElement>(null);
  const [tfmI, setTfmI] = useState(1);
  const [tfmReq, setTfmReq] = useState({ i: 1, n: 0 });
  const tfmGo = useCallback((i: number, smooth: boolean) => {
    const t = tfmTrackRef.current;
    if (!t) return;
    const k = Math.max(0, Math.min(t.children.length - 1, i));
    const c = t.children[k] as HTMLElement | undefined;
    if (c) t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);
  useEffect(() => {
    const el = tfmTrackRef.current;
    if (!el) return;
    tfmGo(1, false);
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bd = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const x = c as HTMLElement;
        const d = Math.abs(x.offsetLeft + x.offsetWidth / 2 - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setTfmI(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [sel, tfmGo]);
  useEffect(() => {
    if (tfmReq.n > 0) tfmGo(tfmReq.i, true);
  }, [tfmReq, tfmGo]);
  useEffect(() => {
    // centre the selected chip in its row (phones)
    const row = tfcRowRef.current;
    const b = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (row && b) row.scrollTo({ left: b.offsetLeft - row.offsetLeft - (row.clientWidth - b.offsetWidth) / 2, behavior: "smooth" });
  }, [sel]);
  const pickSvc = (id: string) => () => {
    setSel(id);
    setTfmI(1);
    if (!window.matchMedia("(max-width: 720px)").matches) return;
    setTimeout(() => {
      const a = tfResRef.current;
      if (!a) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: a.getBoundingClientRect().top + window.scrollY - 8, behavior: reduce ? "auto" : "smooth" });
    }, 40);
  };
'''
TF_H = '''    tfChips: SVCS.map((x) => {
      const on = x.id === sel;
      return { label: x.name, pressed: on, bg: on ? "#1F246C" : "#FFFFFF", color: on ? "#FFFFFF" : "#1F246C", border: on ? "#1F246C" : "#D5D8E3", pick: pickSvc(x.id) };
    }),
    tfIsSea: sel === "sea",
''' + ''.join(f'    tfIs_{k}: sel === "{k}",\n' for k in ['strategy','legal','brand','custom','shopify','email','ugc','video','sma','smm','dash','hosting','onderhoud']) + '''    tfmPlan: ["Basic", "Standard", "Premium"][tfmI],
    tfmCounter: `${tfmI + 1} / 3`,
    tfmPrevOp: tfmI === 0 ? "0.35" : "1",
    tfmNextOp: tfmI === 2 ? "0.35" : "1",
    tfmPrev: () => setTfmReq((r) => ({ i: tfmI - 1, n: r.n + 1 })),
    tfmNext: () => setTfmReq((r) => ({ i: tfmI + 1, n: r.n + 1 })),
'''

wbr = open('wbr.json').read()
tsvc = re.search(r'const TF_SVCS = (\[.*?\]);', open(P + 'Tarieven.dc.html').read()).group(1)
for pg in PAGES:
    subprocess.run(['python3', 'split_page.py', pg, f'pg_{pg}'] + BASE_CSS, check=True, capture_output=True)
    secs = sorted(f for f in os.listdir(f'pg_{pg}') if re.match(r'\d\d\.jsx$', f))
    jsx = ''.join(open(f'pg_{pg}/{f}').read() for f in secs)
    jsx = re.sub(r'(<button type="button" className="glow")( style=\{\{[^}]*\}\}>\{t\("Verstuur (?:bericht|sollicitatie)"\)\})', r'\1 onClick={h.send}\2', jsx)
    m = re.search(r'<option selected>\{t\("([^"]+)"\)\}', jsx)
    if m:
        jsx = jsx.replace('<option selected>', '<option>')
        jsx = re.sub(r'<select name="vacature"', '<select name="vacature" defaultValue={t("%s")}' % m.group(1), jsx, count=1)
    open('/tmp/pg.jsx', 'w').write(jsx)
    subprocess.run(['python3', 'post.py', '/tmp/pg.jsx'], check=True)
    jsx = open('/tmp/pg.jsx').read()
    imports = ['useCallback', 'useEffect', 'useRef', 'useState', 'Fragment']
    body = ''; hh = ''
    if 'h.send' in jsx: body += FORM; hh += '    send,\n'
    if 'h.wbrCls' in jsx: body += WB % wbr; hh += WB_H
    if 'h.tfChips' in jsx: body += TF % tsvc; hh += TF_H
    if 'h.notNL' in jsx:
        body += '  const { locale } = useTr();\n'; hh += '    notNL: locale !== "nl",\n'
    used = [x for x in imports if (x + '(' in body) or (x + '<' in body) or (x == 'Fragment' and '<Fragment' in jsx)]
    react = 'React' if 'React.' in body else ''
    spec = (react + (', ' if react and used else '') + ('{ ' + ', '.join(used) + ' }' if used else '')) or None
    pre = (f'import {spec} from "react";\n' if spec else '') + '//BODY\n%s  const h = {\n%s  };\n' % (body, hh)
    open('/tmp/pg_pre.txt', 'w').write(pre)
    subprocess.run(['python3', 'gen.py', '/tmp/pg.jsx', f'{D}/{pg}Content.tsx', f'{pg}Content', 'client', '/tmp/pg_pre.txt'], check=True)
    holes = set(re.findall(r'\bh\.(\w+)', jsx)) - set(re.findall(r'^\s+(\w+)[,:]', hh, re.M)) - set(re.findall(r'(\w+):', hh)) - {'01'}
    css = open(f'pg_{pg}/page.css').read()
    open(f'{CSSD}/{pg[0].lower() + pg[1:]}.css', 'w').write(f'/* {pg}.dc.html: rules on top of projecten.css and case.css */\n' + css)
    print(pg, 'unwired:', holes)
