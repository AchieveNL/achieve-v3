"""Generate one client component per case page from its artboard sections 0..6 (section 7 = shared ProjectsCta)."""
import json, re, os, subprocess, sys
sys.path.insert(0, '.')
bm = json.load(open('blobmap.json'))
CASES = ['Sharkys', 'SushiToday', 'RCpeptides', 'ADirect', 'Beddenenzo', 'Minimasters', 'RonVanDam']
P = '../artifact-files/8505e679-cfc6-4d1e-9a5b-046fda58f0d0/project/'
D = '/home/claude/achieve-v3/src/components/cases'; os.makedirs(D, exist_ok=True)
fixb = lambda s: re.sub(r'/_blob/([0-9a-f]{32})', lambda m: '/media/' + bm[m.group(1)], s)
for c in CASES:
    secs = sorted(f for f in os.listdir(f'case_{c}') if re.match(r'\d\d\.jsx$', f))[:-1]
    jsx = ''.join(open(f'case_{c}/{f}').read() for f in secs)
    open('/tmp/case.jsx', 'w').write(jsx)
    subprocess.run(['python3', 'post.py', '/tmp/case.jsx'], check=True)
    jsx = open('/tmp/case.jsx').read()
    # data: csSlides
    s = open(P + f'Case{c}.dc.html').read()
    m = re.search(r'csSlides: (\[.*?\])\.map', s)
    slides = fixb(m.group(1)) if m else '[]'
    n = len(json.loads(slides))
    pre = f'''import {{ Fragment, useState }} from "react";
import {{ useMotion }} from "@/components/motion/MotionProvider";
//BODY
  // Video pause button = the site-wide animation switch; photo slider and media carousel are click-through.
  const {{ paused, toggle }} = useMotion();
  const [csI, setCsI] = useState(0);
  const [mkI, setMkI] = useState(0);
  const SLIDES: {{ img: string; alt: string }}[] = {slides};
  const N = {max(n, 1)};
  const ci = csI % N;
  const h = {{
    vidPaused: paused, vidPlaying: !paused, vidPressed: paused,
    vidLabel: paused ? "Video afspelen" : "Video pauzeren",
    toggleVid: toggle,
    csSlides: SLIDES.map((x, i) => ({{ ...x, op: i === ci ? "1" : "0", hidden: i !== ci }})),
    csProg: ((ci + 1) / N) * 100 + "%",
    csCounter: `${{ci + 1}} / ${{N}}`,
    csPrev: () => setCsI((i) => (i + N - 1) % N),
    csNext: () => setCsI((i) => (i + 1) % N),
    mkIsVid: mkI === 2,
    mkOp0: mkI === 0 ? "1" : "0", mkOp1: mkI === 1 ? "1" : "0", mkOp2: mkI === 2 ? "1" : "0",
    mkHid0: mkI !== 0, mkHid1: mkI !== 1, mkHid2: mkI !== 2,
    mkW0: "100%", mkW1: mkI >= 1 ? "100%" : "0%", mkW2: mkI >= 2 ? "100%" : "0%",
    mkCounter: `${{mkI + 1}} / 3`,
    mkPrev: () => setMkI((i) => (i + 2) % 3),
    mkNext: () => setMkI((i) => (i + 1) % 3),
  }};
'''
    open('/tmp/case_pre.txt', 'w').write(pre)
    subprocess.run(['python3', 'gen.py', '/tmp/case.jsx', f'{D}/Case{c}Content.tsx', f'Case{c}Content', 'client', '/tmp/case_pre.txt'], check=True)
    print(c, 'slides', n, 'unresolved refs:', set(re.findall(r'ref=\{(\w+)\}', open(f'{D}/Case{c}Content.tsx').read())))
