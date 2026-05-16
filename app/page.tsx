"use client";

import HeroSection from "@/components/HeroSection";
import TitleSection from "@/components/TitleSection";
import BarcelonaSection from "@/components/BarcelonaSection";
import IntroductionSection from "@/components/IntroductionSection";
import DataSection from "@/components/DataSection";
import KaplanMeierSection from "@/components/KaplanMeierSection";
import CoxSection from "@/components/CoxSection";
import AFTSection from "@/components/AFTSection";
import DiagnosticsSection from "@/components/DiagnosticsSection";
import ConclusionsSection from "@/components/ConclusionsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TitleSection />
      
      {/* 1. Introduction */}
      <IntroductionSection />
      
      {/* 2. Data Description */}
      <DataSection />
      
      {/* 3. Non-Parametric (KM) */}
      <KaplanMeierSection />
      
      {/* 4. Semi-Parametric (Cox) */}
      <CoxSection />
      
      {/* 5. Diagnostics & Validation */}
      <DiagnosticsSection />
      
      {/* 6. Parametric (AFT) */}
      <AFTSection />
      
      {/* 7. Case Study (Application) */}
      <BarcelonaSection />
      
      {/* 8. Synthesis */}
      <ConclusionsSection />
    </main>
  );
}
