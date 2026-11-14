"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconArrowRight,
  IconShieldCheck,
  IconDroplet,
  IconCheck,
  IconSatellite,
  IconBuildingCommunity,
} from "@tabler/icons-react";

export function HeroSection() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden bg-background pt-14 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 border-b border-border"
    >
      {/* Subtle Structural Grid Background with Soft Radial Brand Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(11,77,37,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Hero Content Block */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          
          {/* Context Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-mono font-medium text-brand bg-brand-muted border border-border">
            <span className="w-1.5 h-1.5 rounded-pill bg-brand animate-pulse" />
            <span>Kebbi Rice Basin</span>
            <span className="text-subtle">•</span>
            <span>Alternate Wetting and Drying (AWD)</span>
          </div>

          {/* Headline (2 Lines Max, Weights 400 & 500 Only) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
            Measure paddy water levels.  
            <span className="block text-brand">Verify methane reduction for seasonal dividends.</span>
          </h1>

          {/* Subtitle (3 Lines Max) */}
          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            CarbonTensor helps Nigerian rice cooperatives log water table depth, package auditable MRV evidence for carbon registries, and distribute proceeds directly to smallholder bank accounts.
          </p>

          {/* Action Buttons (6px Radius, Focus Rings, No Hover Shadows) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="group w-full sm:w-auto h-11 px-6 rounded-control text-xs font-medium text-brand-foreground bg-brand hover:bg-brand-hover active:bg-brand transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span>View Cooperative Dashboard</span>
              <IconArrowRight
                size={15}
                stroke={1.5}
                className="group-hover:translate-x-0.5 transition-transform duration-fast"
              />
            </Link>

            <a
              href="#awd-explainer"
              className="w-full sm:w-auto h-11 px-6 rounded-control text-xs font-medium text-foreground bg-card border border-border hover:bg-muted active:bg-card transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span>Explore Agronomic Evidence</span>
            </a>
          </div>

          {/* Micro Validation Line */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-subtle pt-2">
            <IconShieldCheck size={15} stroke={1.5} className="text-brand shrink-0" />
            <span>Access Bank Sandbox (Simulated) • Carbon reductions qualified as tCO₂e (est.)</span>
          </div>

        </div>

        {/* Peeking Product Interface Preview Anchored from Bottom */}
        <div className="mt-12 sm:mt-16 relative">
          
          {/* Main Elevated Glass-Free Interface Surface */}
          <div className="rounded-card border border-border bg-card p-4 sm:p-6 shadow-sm max-w-5xl mx-auto overflow-hidden">
            
            {/* Top Workspace Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-border text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-pill bg-brand animate-pulse" />
                <span className="font-medium text-foreground">
                  Kebbi Green Rice Growers Union • Live Cluster Telemetry
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-pill bg-brand-muted text-brand border border-border text-[10px]">
                  Argungu Basin D1
                </span>
              </div>
              <div className="flex items-center gap-3 text-subtle text-[11px]">
                <span className="flex items-center gap-1 text-brand">
                  <IconCheck size={14} stroke={1.5} />
                  AMS-III.H Compliant
                </span>
                <span>Sentinel-1 Sync: Validated</span>
              </div>
            </div>

            {/* Split Product Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Live AWD Depth Card (5 Cols) */}
              <div className="lg:col-span-5 rounded-control border border-border bg-background p-4 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
                      Live In-Situ Telemetry
                    </span>
                    <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-border">
                      AWD COMPLIANT
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono tabular-nums font-medium text-brand">
                        -15.4 cm
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">water table</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Subsurface aeration verified. Soil oxygen levels halting methane generation.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-border text-xs font-mono">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <IconDroplet size={14} stroke={1.5} className="text-brand" />
                      Threshold Line:
                    </span>
                    <span className="tabular-nums font-medium text-foreground">-15.0 cm (Safe Aeration)</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <IconSatellite size={14} stroke={1.5} className="text-accent" />
                      Sentinel-1 Radar:
                    </span>
                    <span className="font-medium text-foreground">AGREE (94.2% confidence)</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <IconBuildingCommunity size={14} stroke={1.5} className="text-brand" />
                      Farmer Share:
                    </span>
                    <span className="tabular-nums font-medium text-foreground">70% Direct Pass-Through</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Agronomic Field Strip Preview (7 Cols) */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-3">
                
                <div className="group rounded-control border border-border bg-card overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <Image
                      src="/images/farm1.webp"
                      alt="Field water tube in Kano River Basin"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-base"
                      sizes="(max-width: 768px) 33vw, 220px"
                    />
                  </div>
                  <div className="p-2.5 bg-card border-t border-border space-y-0.5">
                    <div className="text-[10px] font-mono text-brand uppercase font-medium">Pani Pipe</div>
                    <div className="text-xs font-medium text-foreground truncate">In-Situ Sensor</div>
                    <div className="text-[11px] text-muted-foreground truncate">Perforated monitoring tube</div>
                  </div>
                </div>

                <div className="group rounded-control border border-border bg-card overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <Image
                      src="/images/farm2.webp"
                      alt="Aggregated smallholder plots in Kebbi State"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-base"
                      sizes="(max-width: 768px) 33vw, 220px"
                    />
                  </div>
                  <div className="p-2.5 bg-card border-t border-border space-y-0.5">
                    <div className="text-[10px] font-mono text-brand uppercase font-medium">GIS Cohort</div>
                    <div className="text-xs font-medium text-foreground truncate">Mapped Plots</div>
                    <div className="text-[11px] text-muted-foreground truncate">Aggregated parcel boundary</div>
                  </div>
                </div>

                <div className="group rounded-control border border-border bg-card overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <Image
                      src="/images/farm3.webp"
                      alt="Aerated soil drainage during AWD cycle"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-base"
                      sizes="(max-width: 768px) 33vw, 220px"
                    />
                  </div>
                  <div className="p-2.5 bg-card border-t border-border space-y-0.5">
                    <div className="text-[10px] font-mono text-brand uppercase font-medium">Aeration</div>
                    <div className="text-xs font-medium text-foreground truncate">Soil Drainage</div>
                    <div className="text-[11px] text-muted-foreground truncate">Halting methanogenesis</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Surface Qualification Pill */}
            <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-subtle">
              <span>Argungu Basin Cohort: 5 Monitored Pilot Parcels • 380 Aggregated Members</span>
              <span>All metric reductions modeled as tCO₂e (est.)</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
