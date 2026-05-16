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
  title: "UCL Trophy Drought — Survival Analysis",
  description:
    "A parametric survival analysis of UEFA Champions League trophy droughts across 23 clubs, 1992–2025. Kaplan-Meier, Cox proportional hazards, and AFT modelling.",
  keywords: [
    "UEFA Champions League",
    "survival analysis",
    "Kaplan-Meier",
    "Cox regression",
    "FC Barcelona",
    "trophy drought",
    "sports analytics",
  ],
  openGraph: {
    title: "UCL Trophy Drought — Survival Analysis",
    description: "Parametric modelling of UCL drought spells across 23 elite clubs, 1992–2025.",
    type: "article",
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
