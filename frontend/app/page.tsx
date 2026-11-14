import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { AwdExplainerSection } from "@/components/landing/AwdExplainerSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PayoutSplitPreview } from "@/components/landing/PayoutSplitPreview";
import { FarmerBenefitsSection } from "@/components/landing/FarmerBenefitsSection";
import { LearnBasicsSection } from "@/components/landing/LearnBasicsSection";
import { ClaimsFaq } from "@/components/landing/ClaimsFaq";
import { ClosingCtaSection } from "@/components/landing/ClosingCtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <AwdExplainerSection />
        <HowItWorksSection />
        <PayoutSplitPreview />
        <FarmerBenefitsSection />
        <LearnBasicsSection />
        <ClaimsFaq />
        <ClosingCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
