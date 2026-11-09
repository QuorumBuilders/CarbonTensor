import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ValueChainTable } from "@/components/landing/ValueChainTable";
import { PayoutSplitPreview } from "@/components/landing/PayoutSplitPreview";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { ClaimsFaq } from "@/components/landing/ClaimsFaq";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <ValueChainTable />
        <PayoutSplitPreview />
        <RoadmapSection />
        <ClaimsFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
