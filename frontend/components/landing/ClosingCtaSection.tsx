import Link from "next/link";
import { IconArrowRight, IconShieldCheck, IconCpu } from "@tabler/icons-react";

export function ClosingCtaSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-background border-b border-border">
      {/* Subtle Grid and Radial Gradient Background (Matching Hero) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(22, 19, 33, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(22, 19, 33, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(11, 77, 37, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-muted text-xs font-mono font-medium text-brand border border-brand/30">
          <IconShieldCheck size={14} stroke={1.5} />
          <span>Kebbi State AWD Pilot Cohort</span>
        </div>

        {/* 2-Line Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
          Ready to verify rice methane avoidance
          <br className="hidden sm:inline" /> and distribute transparent dividends?
        </h2>

        {/* 3-Line Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
          Explore the Kebbi cooperative cluster workspace to review live in-situ piezometer readings, inspect satellite radar checks, and simulate seasonal batch disbursements.
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-control bg-brand text-brand-foreground text-sm font-medium hover:bg-brand-hover transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span>Open Cooperative Dashboard</span>
            <IconArrowRight
              size={16}
              stroke={1.5}
              className="group-hover:translate-x-0.5 transition-transform duration-150"
            />
          </Link>

          <Link
            href="/verifier"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-control bg-card border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <IconCpu size={16} stroke={1.5} className="text-muted-foreground" />
            <span>Review Verifier Dossier</span>
          </Link>
        </div>

        {/* Qualification Microcopy */}
        <div className="pt-2 text-xs font-mono text-subtle">
          Access Bank Sandbox Settlement • Carbon metrics qualified as tCO₂e (est.)
        </div>

      </div>
    </section>
  );
}

