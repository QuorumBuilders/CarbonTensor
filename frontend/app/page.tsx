import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PayoutSplitPreview } from "@/components/landing/PayoutSplitPreview";
import { ClaimsFaq } from "@/components/landing/ClaimsFaq";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <PayoutSplitPreview />
        <ClaimsFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
