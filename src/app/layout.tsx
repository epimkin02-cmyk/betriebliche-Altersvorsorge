import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizModal from "@/components/QuizModal";
import { brand } from "@/content/site";

/* Schrift-System (seit 28.09.2026): nur Inter, in vier Schnitten.
   Die Schrift wird über @fontsource selbst ausgeliefert – es entsteht
   KEINE Verbindung zu Google-Servern (DSGVO-relevant). */
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

const title = "Führungsvorsorge – GmbH-Vermögen sicher ins Privatvermögen";
const description =
  "Von 100 € aus deiner GmbH kommen auf dem klassischen Weg nur rund 51 bis 53 € privat an. Wir zeigen Gesellschafter-Geschäftsführern die drei Hebel, mit denen Firmenvermögen legal und betriebsprüfungsfest ins Privatvermögen wandert. Kostenlos & unverbindlich.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: title,
    template: "%s · Führungsvorsorge",
  },
  description,
  applicationName: brand.name,
  authors: [{ name: brand.person }],
  keywords: [
    "Firmenvermögen in Privatvermögen",
    "GmbH Vermögen entnehmen",
    "Gesellschafter-Geschäftsführer Vorsorge",
    "GGF Versorgung",
    "Direktversicherung GmbH",
    "Unterstützungskasse",
    "Pensionszusage Geschäftsführer",
    "verdeckte Gewinnausschüttung vermeiden",
    "betriebliche Altersvorsorge Geschäftsführer",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: brand.url,
    siteName: brand.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ink">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:bg-mint focus:px-4 focus:py-2 focus:text-ink"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
        <QuizModal />
      </body>
    </html>
  );
}
