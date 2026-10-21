"""Convert a dc.html template fragment into JSX.

- text nodes -> {t("...")} (skipped inside translate="no")
- aria-label/alt/title/placeholder -> {ta("...")}
- {{hole}} -> {h.hole}
- <sc-if value="{{x}}"> -> {h.x && (<>...</>)}
- style="..." -> style={{...}}
- blobs -> /media/<name>
- X.dc.html links -> {href("X")}
"""
import re, json, sys, html
from html.parser import HTMLParser

TAG_MAP = {'x-accent': 'Accent', 'x-tip': 'Tip', **{t.lower(): t for t in ['linearGradient','radialGradient','clipPath','feGaussianBlur','feOffset','feBlend','feColorMatrix','feComposite','feFlood','feMerge','feMergeNode','feMorphology','feTurbulence','feDisplacementMap','textPath','foreignObject','animateTransform','animateMotion','feDropShadow']}}
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr'}
ATTR_MAP = { 'viewbox':'viewBox','preserveaspectratio':'preserveAspectRatio','gradientunits':'gradientUnits','gradienttransform':'gradientTransform',
 'patternunits':'patternUnits','patterncontentunits':'patternContentUnits','patterntransform':'patternTransform','stddeviation':'stdDeviation','markerwidth':'markerWidth',
 'markerheight':'markerHeight','textlength':'textLength','clippathunits':'clipPathUnits','maskunits':'maskUnits','maskcontentunits':'maskContentUnits','refx':'refX','refy':'refY',
 'spreadmethod':'spreadMethod','basefrequency':'baseFrequency','numoctaves':'numOctaves','filterunits':'filterUnits','primitiveunits':'primitiveUnits','attributename':'attributeName',
 'repeatcount':'repeatCount','keytimes':'keyTimes','keysplines':'keySplines','calcmode':'calcMode','pathlength':'pathLength','startoffset':'startOffset','lengthadjust':'lengthAdjust',
 'tablevalues':'tableValues','kernelmatrix':'kernelMatrix','diffuseconstant':'diffuseConstant','specularexponent':'specularExponent','surfacescale':'surfaceScale',
 'xchannelselector':'xChannelSelector','ychannelselector':'yChannelSelector','edgemode':'edgeMode','requiredfeatures':'requiredFeatures','markerunits':'markerUnits',
 'class':'className','for':'htmlFor','tabindex':'tabIndex','readonly':'readOnly','maxlength':'maxLength',
 'autocomplete':'autoComplete','inputmode':'inputMode','enterkeyhint':'enterKeyHint','srcset':'srcSet','crossorigin':'crossOrigin',
 'playsinline':'playsInline','autoplay':'autoPlay','novalidate':'noValidate','colspan':'colSpan','rowspan':'rowSpan',
 'xlink:href':'xlinkHref','xmlns:xlink':'xmlnsXlink','xml:space':'xmlSpace','fetchpriority':'fetchPriority','frameborder':'frameBorder',
 'allowfullscreen':'allowFullScreen','datetime':'dateTime','accept-charset':'acceptCharset','contenteditable':'contentEditable',
 'spellcheck':'spellCheck','referrerpolicy':'referrerPolicy','loading':'loading','decoding':'decoding','onclick':'onClick',
 'oninput':'onInput','onchange':'onChange','onsubmit':'onSubmit','onfocus':'onFocus','onblur':'onBlur','onmouseenter':'onMouseEnter',
 'onmouseleave':'onMouseLeave','onkeydown':'onKeyDown','onpointerenter':'onPointerEnter','onpointerleave':'onPointerLeave',
 'ontoggle':'onToggle','onload':'onLoad','onerror':'onError'}
BOOL = {'wide','plain','muted','loop','playsinline','autoplay','controls','disabled','checked','required','hidden','open','novalidate','readonly','selected','multiple','allowfullscreen','defer','async'}
TA = {'aria-label','alt','title','placeholder','label'}
HOLE = re.compile(r'\{\{\s*([^}]+?)\s*\}\}')
LOOPVARS = []  # (design name, js name)
def hx(name):
    name = name.strip()
    root = re.split(r'[.\[]', name)[0]
    for dn, jn in reversed(LOOPVARS):
        if root == dn: return jn + name[len(dn):]
    return 'h.' + name

BLOBMAP = {}
ROUTE = lambda name: name

def camel(p):
    if p.startswith('--'): return p
    if p.startswith('-webkit-'): p = 'Webkit-' + p[8:]
    elif p.startswith('-ms-'): p = 'ms-' + p[4:]
    elif p.startswith('-moz-'): p = 'Moz-' + p[5:]
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), p)

def jsstr(v):
    return json.dumps(v, ensure_ascii=False)

def sub_blobs(v):
    return re.sub(r'/_blob/([0-9a-f]{32})', lambda m: BLOBMAP.get(m.group(1), '/_blob/' + m.group(1)), v)

FONTS = [("'Source Sans 3', system-ui, sans-serif", 'var(--font-display)'), ("'Poppins', system-ui, sans-serif", 'var(--font-body)'),
 ("Poppins, system-ui, sans-serif", 'var(--font-body)'), ("'Gotham Pro', 'Gotham', 'Montserrat', system-ui, sans-serif", 'var(--font-logo)'),
 ("'Industry', 'Rajdhani', system-ui, sans-serif", 'var(--font-logo-sub)')]
def val_expr(v):
    """attribute/style value possibly containing holes -> JS expression string"""
    v = sub_blobs(v)
    for a, b in FONTS: v = v.replace(a, b)
    if not HOLE.search(v):
        return jsstr(v)
    parts = HOLE.split(v)
    if len(parts) == 3 and parts[0] == '' and parts[2] == '':
        return hx(parts[1])
    out = '`'
    for i, p in enumerate(parts):
        if i % 2: out += '${' + hx(p) + '}'
        else: out += p.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    return out + '`'

def style_obj(s):
    s = html.unescape(s)
    decls = []
    # split on ; not inside parens
    depth = 0; cur = ''
    for ch in s:
        if ch == '(': depth += 1
        if ch == ')': depth -= 1
        if ch == ';' and depth == 0:
            decls.append(cur); cur = ''
        else: cur += ch
    decls.append(cur)
    items = []
    for d in decls:
        if ':' not in d: continue
        k, v = d.split(':', 1)
        k = k.strip(); v = v.strip()
        if not k: continue
        key = camel(k)
        key = jsstr(key) if (key.startswith('--') or not re.match(r'^[A-Za-z_$][\w$]*$', key)) else key
        items = [it for it in items if it[0] != key]
        items.append((key, f'{key}: {val_expr(v)}'))
    return '{{ ' + ', '.join(x for _, x in items) + ' }}'

class Conv(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.stack = []  # (tag, no_translate)
        self.svg = 0
    @property
    def notr(self):
        return any(n for _, n in self.stack)
    def attrs_jsx(self, tag, attrs):
        res = []
        notr = dict(attrs).get('translate') == 'no' or self.notr
        for k, v in attrs:
            if k in ('ref', 'hint-placeholder-val') or k.startswith('hint-'):
                if k == 'ref': res.append('{...ref_(' + jsstr(HOLE.sub(lambda m: m.group(1), v or '')) + ')}')
                continue
            name = ATTR_MAP.get(k)
            if name is None:
                if k.startswith('aria-') or k.startswith('data-'): name = k
                elif ':' in k: name = camel(k.replace(':', '-'))
                elif '-' in k: name = camel(k)
                else: name = k
            if v is None:
                res.append(name if k in BOOL or True else name)
                continue
            if k == 'style':
                res.append('style=' + style_obj(v)); continue
            if k in ('onclick','oninput','onchange','onsubmit','onfocus','onblur','onmouseenter','onmouseleave','onkeydown','onpointerenter','onpointerleave','ontoggle','onload','onerror') or name.startswith('on') and HOLE.search(v or ''):
                res.append(f'{name}={{{val_expr(v)}}}'); continue
            if k == 'href' and re.match(r'^[A-Za-z0-9]+\.dc\.html(#.*)?$', v):
                pg, _, anc = v.partition('#')
                res.append(f'href={{href({jsstr(pg[:-8])}{", " + jsstr(anc) if anc else ""})}}'); continue
            if k in TA and not notr and not HOLE.search(v) and v.strip():
                res.append(f'{name}={{ta({jsstr(v)})}}'); continue
            if k in TA and not notr and HOLE.search(v):
                res.append(f'{name}={{ta(String({val_expr(v)}))}}'); continue
            if name in ('tabIndex','rows','cols','colSpan','rowSpan','maxLength','minLength','size','span','start') and re.match(r'^-?\d+$', v or ''):
                res.append(f'{name}={{{v}}}'); continue
            if k in BOOL and v in ('', k):
                res.append(name); continue
            e = val_expr(v)
            res.append(f'{name}={e}' if e.startswith('"') else f'{name}={{{e}}}')
        return (' ' + ' '.join(res)) if res else ''
    def handle_starttag(self, tag, attrs):
        if tag == 'sc-if':
            v = dict(attrs).get('value', '')
            m = HOLE.search(v)
            self.out.append('{' + (hx(m.group(1)) if m else 'false') + ' && (<>')
            self.stack.append((tag, False)); return
        if tag == 'dc-import':
            self.out.append('<' + 'Import_' + dict(attrs).get('name', 'X') + ' />'); return
        if tag == 'sc-for':
            d = dict(attrs); m = HOLE.search(d.get('list', '')); dvar = d.get('as', 'it')
            var = dvar + dvar if dvar in ('h', 't') else dvar
            self.out.append('{' + (hx(m.group(1)) if m else '[]') + '.map((' + var + ', ' + var + '_i) => (<Fragment key={' + var + '_i}>')
            LOOPVARS.append((dvar, var))
            self.stack.append(('sc-for', False)); return
        if tag == 'svg': self.svg += 1
        tag = TAG_MAP.get(tag, tag)
        notr = dict(attrs).get('translate') == 'no'
        a = self.attrs_jsx(tag, attrs)
        if tag in VOID:
            self.out.append(f'<{tag}{a} />')
        else:
            self.out.append(f'<{tag}{a}>')
            self.stack.append((tag, notr))
    def handle_startendtag(self, tag, attrs):
        if tag == 'dc-import':
            self.out.append('<Import_' + dict(attrs).get('name', 'X') + ' />'); return
        tag = TAG_MAP.get(tag, tag)
        a = self.attrs_jsx(tag, attrs)
        self.out.append(f'<{tag}{a} />')
    def handle_endtag(self, tag):
        tag = TAG_MAP.get(tag, tag)
        if tag in VOID or tag == 'dc-import': return
        if not self.stack: return
        t, _ = self.stack.pop()
        if t == 'sc-if': self.out.append('</>)}'); return
        if t == 'sc-for':
            LOOPVARS.pop(); self.out.append('</Fragment>))}'); return
        if t == 'svg': self.svg -= 1
        self.out.append(f'</{t}>')
    def handle_data(self, data):
        if not data: return
        if self.stack and self.stack[-1][0] in ('style', 'script'):
            self.out.append('{' + jsstr(data) + '}'); return
        if data.strip() == '':
            if '\n' in data: return
            self.out.append('{" "}'); return
        # holes inside text
        lead = data[:len(data) - len(data.lstrip())]
        trail = data[len(data.rstrip()):]
        core = data.strip()
        pre = '{" "}' if lead else ''
        post = '{" "}' if trail else ''
        if HOLE.search(core):
            parts = HOLE.split(core)
            seg = ''
            for i, p in enumerate(parts):
                if i % 2: seg += ('{' + hx(p) + '}') if (self.notr or self.svg) else ('{t(String(' + hx(p) + '))}')
                elif p:
                    seg += ('{' + jsstr(p) + '}') if self.notr else ('{t(' + jsstr(p) + ')}')
            self.out.append(pre + seg + post); return
        if self.notr or self.svg:
            self.out.append(pre + '{' + jsstr(core) + '}' + post)
        else:
            self.out.append(pre + '{t(' + jsstr(core) + ')}' + post)


ACCENT_RE = re.compile(r'<span style="position: relative; display: inline-block">(<span[^>]*>[^<]*</span>)<svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" style="([^"]*)"><defs><linearGradient id="[^"]*" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="([^"]*)"></stop><stop offset="1" stop-color="([^"]*)"></stop></linearGradient></defs><path d="M4 9 C 60 4, 130 3, 196 7" stroke="url\(#[^)]*\)" stroke-width="7" fill="none" stroke-linecap="round"></path><path d="M38 16 C 90 12.5, 140 12.5, 182 14.5" stroke="url\(#[^)]*\)" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="([0-9.]+)"></path></svg></span>')
TIP_RE = re.compile(r'<span class="tf-tip" tabindex="0" role="button" aria-label="Uitleg"><svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true"><rect x="10.5" y="4" width="3" height="3" rx="1.5" fill="currentColor"></rect><rect x="10.5" y="9.5" width="3" height="10.5" rx="1.5" fill="currentColor"></rect></svg><span class="tf-tip-box" role="tooltip"( style="text-transform: none; letter-spacing: normal; font-weight: 400")?>([^<]*)</span></span>')
def preprocess(h):
    def acc(m):
        inner, st, a, b, op = m.groups()
        attrs = f' from="{a}" to="{b}"'
        if st != 'position: absolute; left: 0; bottom: -0.22em; width: 94%; height: 0.26em; overflow: visible': attrs += ' wide'
        if op != '0.75': attrs += f' thin="{op}"'
        return f'<x-accent{attrs}>{inner}</x-accent>'
    h = ACCENT_RE.sub(acc, h)
    h = TIP_RE.sub(lambda m: f'<x-tip label="Uitleg"{" plain" if m.group(1) else ""}>{m.group(2)}</x-tip>', h)
    return h

def convert(fragment):
    fragment = preprocess(fragment)
    c = Conv(); c.feed(fragment); c.close()
    return ''.join(c.out)

if __name__ == '__main__':
    print(convert(open(sys.argv[1]).read()))
