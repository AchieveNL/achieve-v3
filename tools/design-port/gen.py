"""Wrap converted JSX into a TSX component file.
usage: gen.py <jsx-file> <out.tsx> <Name> <server|client> [preamble-file]
Body placeholder: the JSX is inserted as `return (<>JSX</>)`.
"""
import sys
src, out, name, kind = sys.argv[1:5]
pre = open(sys.argv[5]).read() if len(sys.argv) > 5 else ''
jsx = open(src).read()
AUTO = [('<Accent', 'import { Accent } from "@/components/ui/Accent";'), ('<Tip', 'import { Tip } from "@/components/ui/Tip";'),
        ('<LogoMarquee', 'import { LogoMarquee } from "@/components/ui/LogoMarquee";'), ('<LazyVideo', 'import { LazyVideo } from "@/components/ui/LazyVideo";'),
        ('<Stars', 'import { Stars } from "@/components/ui/Stars";')]
auto = ''.join(imp + '\n' for tag, imp in AUTO if tag in jsx and imp not in pre)
pre = pre.replace('//BODY', auto + '//BODY') if '//BODY' in pre else auto + '//BODY\n'
if kind == 'server':
    head = 'import type { ServerTr } from "@/i18n/server";\n\n' + pre.split('//BODY')[0] if '//BODY' in pre else 'import type { ServerTr } from "@/i18n/server";\n\n'
    body = f'export function {name}({{ tr }}: {{ tr: ServerTr }}) {{\n  const {{ t, ta, href }} = tr;\n' + (pre.split('//BODY')[1] if '//BODY' in pre else '') + f'  return (\n    <>\n{jsx}\n    </>\n  );\n}}\n'
else:
    head = '"use client";\n\nimport { useTr } from "@/i18n/I18nProvider";\n' + (pre.split('//BODY')[0] if '//BODY' in pre else '')
    body = f'\nexport function {name}() {{\n  const {{ t, ta, href }} = useTr();\n' + (pre.split('//BODY')[1] if '//BODY' in pre else '') + f'  return (\n    <>\n{jsx}\n    </>\n  );\n}}\n'
open(out, 'w').write('/* eslint-disable @typescript-eslint/no-unused-vars */\n' + head + body)
