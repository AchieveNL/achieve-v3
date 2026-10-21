"""Split a page's <main> into top-level sections and convert each to JSX.
usage: split_page.py <Page> <outdir>"""
import re, json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import h2jsx
h2jsx.BLOBMAP = {k: '/media/' + v for k, v in json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'blobmap.json'))).items()}
page, out = sys.argv[1], sys.argv[2]
P = '/tmp/claude-0/-home-claude/6aa46157-b766-5539-964a-17bed77f96ab/scratchpad/artifact-files/8505e679-cfc6-4d1e-9a5b-046fda58f0d0/project/'
s = open(P + page + '.dc.html').read()
body = s[s.find('</helmet>') + 9:s.find('</x-dc>')]
i = body.find('<main>'); j = body.find('</main>')
if i < 0:
    i = body.find('</header>'); i = body.find('</div>', i) + 6; j = body.find('<footer')
else:
    i += 6
main = body[i:j]
# split on top-level tags by tracking depth
parts = []; depth = 0; start = None
for m in re.finditer(r'<(/?)([a-zA-Z][\w-]*)([^>]*?)(/?)>', main):
    close, tag, attrs, selfc = m.groups()
    if tag in h2jsx.VOID or selfc: 
        if depth == 0: parts.append(main[m.start():m.end()])
        continue
    if not close:
        if depth == 0: start = m.start()
        depth += 1
    else:
        depth -= 1
        if depth == 0: parts.append(main[start:m.end()])
os.makedirs(out, exist_ok=True)
for n, p in enumerate(parts):
    open(f'{out}/{n:02d}.html', 'w').write(p)
    open(f'{out}/{n:02d}.jsx', 'w').write(h2jsx.convert(p))
    first = re.match(r'<[^>]*>', p).group(0)[:160]
    holes = sorted(set(re.findall(r'h\.[A-Za-z0-9_]+', open(f'{out}/{n:02d}.jsx').read())))
    refs = sorted(set(re.findall(r'ref_\("([A-Za-z0-9]+)"\)', open(f'{out}/{n:02d}.jsx').read())))
    print(n, len(p), first); print('   holes:', ' '.join(holes)); print('   refs:', refs)
# page css not in achieve.css
h = s[s.find('<helmet>'):s.find('</helmet>')]
css = '\n'.join(re.findall(r'<style>(.*?)</style>', h, re.S))
def stmts(c):
    c = re.sub(r'/\*.*?\*/', '', c, flags=re.S)
    out, depth, cur = [], 0, ''
    for ch in c:
        cur += ch
        if ch == '{': depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0: out.append(cur.strip()); cur = ''
        elif ch == ';' and depth == 0: out.append(cur.strip()); cur = ''
    return [x for x in out if x]
norm = lambda x: re.sub(r'\s+', ' ', x)
bm = h2jsx.BLOBMAP
fix = lambda x: re.sub(r'/_blob/([0-9a-f]{32})', lambda m: bm.get(m.group(1), m.group(0)), x)
have = set(norm(x) for x in stmts(open('/home/claude/achieve-v3/src/styles/achieve.css').read()))
for extra_file in sys.argv[3:]:
    have |= set(norm(x) for x in stmts(open(extra_file).read()))
extra = [fix(x) for x in stmts(css) if norm(fix(x)) not in have]
open(f'{out}/page.css', 'w').write('\n'.join(extra) + '\n')
print('extra css lines', len(extra))
