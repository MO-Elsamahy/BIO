import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import BackgroundElements from "@/components/BackgroundElements";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "UCL Trophy Droughts | A Survival Analysis Study",
  description: "An interactive academic investigation into UEFA Champions League trophy droughts (1992–2025). Discover the statistical impact of managerial instability, transfer spending, and the departure of generational talents like Lionel Messi.",
  keywords: [
    "UEFA Champions League",
    "survival analysis",
    "Kaplan-Meier",
    "Cox regression",
    "FC Barcelona",
    "trophy drought",
    "sports analytics",
    "football statistics"
  ],
  metadataBase: new URL("https://sa.samahy.tech"),
  openGraph: {
    title: "UCL Trophy Droughts | A Survival Analysis Study",
    description: "An interactive academic investigation into UEFA Champions League trophy droughts. Discover the statistical impact of managerial instability and generational talents.",
    type: "article",
    url: "https://sa.samahy.tech",
    siteName: "Academic Investigation Vol. 56",
    images: [
      {
        url: "https://sa.samahy.tech/ucl-logo.png",
        width: 800,
        height: 800,
        alt: "UEFA Champions League Logo",
      },
      {
        url: "https://sa.samahy.tech/ucl-starball.png",
        width: 1200,
        height: 630,
        alt: "UCL Starball Background",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UCL Trophy Droughts | Survival Analysis",
    description: "An interactive academic investigation into UEFA Champions League trophy droughts. Discover the statistical impact of managerial instability and generational talents.",
    images: ["https://sa.samahy.tech/ucl-starball.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="ucl">
      <body
        className={`${cormorantGaramond.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      >
        <BackgroundElements />
        {children}
      </body>
    </html>
  );
}
