"""Post-process converted JSX: marquees -> <LogoMarquee/>, lazy videos -> <LazyVideo/>."""
import re, sys
def logo_marquee(jsx, speed, direction):
    # <div className="marquee" style={{...}}><div {...ref_("setTrustX")} style={{...}}>IMGS</div></div>
    pat = re.compile(r'<div className="marquee" style=(\{\{[^}]*\}\})><div \{\.\.\.ref_\("setTrust2?"\)\} style=\{\{[^}]*\}\}>(?:<img className="trust-logo[^>]*/>)+</div></div>')
    return pat.sub(lambda m: f'<LogoMarquee speed={{{speed}}} direction="{direction}" style={m.group(1)} />', jsx)
def lazy_video(jsx):
    def rep(m):
        a = m.group(1).replace('data-lazy-vid="" ', '')
        a = re.sub(r'\{\.\.\.ref_\("[^"]*"\)\} ?', '', a)
        return f'<LazyVideo{a} />'
    return re.sub(r'<video( data-lazy-vid=""[^>]*)></video>', rep, jsx)
if __name__ == '__main__':
    f = sys.argv[1]; s = open(f).read()
    s = lazy_video(s)
    if len(sys.argv) > 2: s = logo_marquee(s, sys.argv[2], sys.argv[3])
    open(f, 'w').write(s)
