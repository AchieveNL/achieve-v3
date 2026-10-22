import json, os
META = [
["DienstStrategy", "Strategy: positionering en merkrichting | Achieve", "Een scherpe positionering die je merk onderscheidt en je doelgroep direct aanspreekt. Strategy van Achieve, vanaf €1.747 ex. btw."],
["DienstLegal", "Legal: juridisch advies voor ondernemers | Achieve", "Juridisch advies voor ondernemers: een scan van je onderneming, algemene voorwaarden op maat en bescherming van je merk. Vanaf €197 eenmalig."],
["DienstBrandBook", "Brand Book: je huisstijl in één handboek | Achieve", "Een huisstijlhandboek met je logo, pay-off, kleuren, letters en vormentaal, plus volledig gebruiksrecht. Vanaf €1.497 eenmalig."],
["DienstWebDevelopment", "Web Development: website op maat of webshop in Shopify | Achieve", "Een website op maat of een webshop in Shopify, mooi op elk scherm en klaar voor betalingen. Vanaf €4.497 eenmalig."],
["DienstEmailMarketing", "Email Marketing: nieuwsbrieven en automatische e-mails | Achieve", "Nieuwsbrieven en automatische e-mails die je klanten op het juiste moment bereiken. Begeleiding vanaf €997."],
["DienstVideoMarketing", "Video Marketing: video's die jouw verhaal vertellen | Achieve", "Video's die jouw verhaal vertellen, van idee en script tot montage, met onze cameraploeg bij jou op locatie. Vanaf €1.447 per maand."],
["DienstUGCMarketing", "UGC Marketing: video's van echte creators | Achieve", "Video's van echte creators die passen bij jouw merk. Wij zoeken de creator, regelen het contract en bedenken het concept. Vanaf €997 per maand."],
["DienstSEA", "Search Engine Advertising: adverteren in Google | Achieve", "Adverteren in Google met Achieve. We zetten je campagnes op en sturen ze samen met jou bij, vanaf €1.197 per maand."],
["DienstSMA", "Social Media Advertising: adverteren op social media | Achieve", "Adverteren op Meta, TikTok, LinkedIn en meer met Achieve. Vanaf €497 per maand, plus opstartkosten en advertentiebudget."],
["DienstSMALooptijd", "Voorbeeld SMA looptijden – Social Media Advertising | Achieve", "Adverteren op Meta, TikTok, LinkedIn en meer met Achieve. Vanaf €497 per maand, plus opstartkosten en advertentiebudget."],
["DienstSMM", "Social Media Management: beheer van je social media | Achieve", "Achieve maakt je content, plant je posts en houdt je social media actief. Social Media Management vanaf €497 per maand."],
["DienstDashboard", "Dashboard: al je cijfers in één overzicht | Achieve", "Achieve koppelt je databronnen aan één helder dashboard, zodat je in één oogopslag ziet hoe je bedrijf ervoor staat. Dashboard vanaf €997, eenmalig."],
["DienstHosting", "Hosting: snel en veilig online | Achieve", "Hosting van Achieve: de server waarop je website draait, zodat hij altijd online is. Servers in Amsterdam, vanaf €10,99 per maand."],
["DienstOnderhoud", "Website onderhoud: veilig, snel en up-to-date | Achieve", "Wij houden je website veilig, snel en up-to-date, ook als hij niet door ons is gebouwd. Een vast bedrag per maand."],
]
import re
cfg = open('/home/claude/achieve-v3/src/i18n/config.ts').read()
for pid, title, desc in META:
    slug = re.search(pid + r': "diensten/([^"]+)"', cfg).group(1)
    short = pid[len('Dienst'):]
    d = f'/home/claude/achieve-v3/src/app/[locale]/diensten/{slug}'
    os.makedirs(d, exist_ok=True)
    open(f'{d}/page.tsx', 'w').write(f'''import type {{ Metadata }} from "next";
import {{ ServicePage }} from "@/components/services/ServicePage";
import {{ {pid}Content }} from "@/components/services/{pid}Content";
import type {{ Locale }} from "@/i18n/config";
import {{ pageMetadata }} from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/{short}.css";

type Props = {{ params: Promise<{{ locale: string }}> }};

export async function generateMetadata({{ params }}: Props): Promise<Metadata> {{
  const {{ locale }} = await params;
  const meta = await pageMetadata(locale as Locale, "{pid}", {{
    title: {json.dumps(title, ensure_ascii=False)},
    description: {json.dumps(desc, ensure_ascii=False)},
  }});
  return {"{ ...meta, robots: { index: false, follow: true } }" if pid == "DienstSMALooptijd" else "meta"};
}}

export default async function Page({{ params }}: Props) {{
  const {{ locale }} = await params;
  return (
    <ServicePage locale={{locale}} page="{pid}">
      <{pid}Content />
    </ServicePage>
  );
}}
''')
    print(slug)
