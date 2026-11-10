import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { AwdExplainerSection } from "@/components/landing/AwdExplainerSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FarmerBenefitsSection } from "@/components/landing/FarmerBenefitsSection";
import { PayoutSplitPreview } from "@/components/landing/PayoutSplitPreview";
import { LearnBasicsSection } from "@/components/landing/LearnBasicsSection";
import { ClaimsFaq } from "@/components/landing/ClaimsFaq";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <AwdExplainerSection />
        <HowItWorksSection />
        <FarmerBenefitsSection />
        <PayoutSplitPreview />
        <LearnBasicsSection />
        <ClaimsFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
