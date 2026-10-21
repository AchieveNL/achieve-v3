"""Make header/footer page-aware: anchors to the homepage work from every page, and the current page is marked."""
import re, sys
f, kind = sys.argv[1], sys.argv[2]
s = open(f).read()
s = s.replace('href="#diensten"', 'href={href("Main", "diensten")}').replace('href="#over-ons"', 'href={href("Main", "over-ons")}')
cur = lambda pg: f'aria-current={{page === "{pg}" ? "page" : undefined}}'
if kind == 'header':
    s = re.sub(r'<a href=\{href\("(\w+)"\)\} style=\{\{ color: "#0E1116", textDecoration: "none", padding: "12px 12px"',
               lambda m: f'<a href={{href("{m.group(1)}")}} {cur(m.group(1))} className={{page === "{m.group(1)}" ? "nav-current" : undefined}} style={{{{ color: "#0E1116", textDecoration: "none", padding: "12px 12px"', s)
    s = re.sub(r'<a href=\{href\("Tarieven"\)\} aria-haspopup', f'<a href={{href("Tarieven")}} {cur("Tarieven")} aria-haspopup', s)
else:
    s = re.sub(r'<a href=\{href\("(\w+)"\)\} className="foot-link"', lambda m: f'<a href={{href("{m.group(1)}")}} {cur(m.group(1))} className="foot-link"', s)
open(f, 'w').write(s)
