"use client";

import HeroSection from "@/components/HeroSection";
import TitleSection from "@/components/TitleSection";
import BarcelonaSection from "@/components/BarcelonaSection";
import IntroductionSection from "@/components/IntroductionSection";
import DataSection from "@/components/DataSection";
import KaplanMeierSection from "@/components/KaplanMeierSection";
import CoxSection from "@/components/CoxSection";
import AFTSection from "@/components/AFTSection";
import ConclusionsSection from "@/components/ConclusionsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TitleSection />
      
      {/* 2. Barcelona Case Study (Primary Focus) */}
      <BarcelonaSection />
      
      {/* 3. Introduction (Section 1 of Report) */}
      <IntroductionSection />
      
      {/* 4. Data Description (Section 2 of Report) */}
      <DataSection />
      
      {/* 5. Analysis Frameworks (Section 3 & 4 of Report) */}
      <KaplanMeierSection />
      <CoxSection />
      <AFTSection />
      
      {/* 6. Synthesis (Section 5 & 6 of Report) */}
      <ConclusionsSection />
    </main>
  );
}
