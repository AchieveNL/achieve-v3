import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins, Rajdhani, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { locales, isLocale } from "@/i18n/config";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
  display: "swap",
});
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"], variable: "--font-montserrat", display: "swap" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-rajdhani", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://achieve.nl"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
export const viewport: Viewport = { themeColor: "#1F246C" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${poppins.variable} ${sourceSans.variable} ${montserrat.variable} ${rajdhani.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
