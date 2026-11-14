import Link from "next/link";
import { IconActivity, IconShieldCheck, IconArrowLeft } from "@tabler/icons-react";
import { AuthCarousel } from "./AuthCarousel";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground">
      {/* Left Column: Visual & Thematic Carousel (50% on lg screens, hidden on mobile) */}
      <aside className="hidden lg:flex lg:w-1/2 relative min-h-screen">
        <AuthCarousel />
      </aside>

      {/* Right Column: Form Canvas (100% on mobile, 50% on lg) */}
      <main className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-background border-l border-border">
        
        {/* Top Header Row with Logo & Return to Home */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-control bg-brand flex items-center justify-center text-brand-foreground border border-brand/40">
              <IconActivity size={18} stroke={1.5} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg tracking-tight text-foreground group-hover:text-brand transition-colors duration-150">
                CarbonTensor
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-pill bg-brand-muted text-brand border border-brand/30">
                AWD MRV
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control"
          >
            <IconArrowLeft size={14} stroke={1.5} />
            <span>Return to Landing</span>
          </Link>
        </div>

        {/* Center Content: Title, Subtitle, and Form */}
        <div className="py-8 sm:py-10 max-w-lg w-full mx-auto">
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-[1.2]">
              {title}
            </h1>
            <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form Container (Clean 8px card, flat hairline border, no shadow) */}
          <div className="bg-card rounded-card border border-border p-6 sm:p-8">
            {children}
          </div>
        </div>

        {/* Bottom Integrity Notice & Simulated Sandbox Badge */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-1.5">
            <IconShieldCheck size={14} stroke={1.5} className="text-brand shrink-0" />
            <span>Access Bank Sandbox (Simulated Settlement)</span>
          </div>
          <div className="text-subtle">
            <span>© 2026 CarbonTensor • Kebbi State AWD Cohort</span>
          </div>
        </div>

      </main>
    </div>
  );
}
