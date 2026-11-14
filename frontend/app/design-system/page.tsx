"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconLeaf,
  IconDroplet,
  IconArrowRight,
  IconCheck,
  IconAlertTriangle,
  IconAlertOctagon,
  IconInfoCircle,
  IconRefresh,
  IconDeviceAnalytics,
  IconPlus,
  IconTrash,
  IconSearch,
  IconAdjustmentsHorizontal,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconX,
  IconSatellite,
  IconBuildingCommunity,
} from "@tabler/icons-react";

export default function DesignSystemPage() {
  // State for interactive showcase controls
  const [activeTab, setActiveTab] = useState<"cooperative" | "verifier" | "finance">("cooperative");
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isSidebarRailCollapsed, setIsSidebarRailCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string>("plot-001");
  const [selectAll, setSelectAll] = useState(false);
  const [textInputValue, setTextInputValue] = useState("FARO 44 (Sippi)");
  const [textErrorValue, setTextErrorValue] = useState("SENS-FAULT-INVALID");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased pb-24">
      {/* Top Header Bar */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-control bg-brand flex items-center justify-center text-brand-foreground">
              <IconLeaf size={18} stroke={1.5} />
            </div>
            <div>
              <span className="font-medium text-base tracking-tight text-foreground">
                CarbonTensor
              </span>
              <span className="ml-2 text-xs font-mono font-medium px-2 py-0.5 rounded-pill bg-brand-muted text-brand border border-border">
                Design System v2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-fast"
            >
              Public Site
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-fast"
            >
              Coop Dashboard
            </Link>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-mono font-medium text-subtle">
              Geist 400/500 • Tabler 1.5
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* Intro Banner */}
        <section className="space-y-3 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill text-xs font-mono font-medium bg-brand-muted text-brand border border-border">
            <span>Canonical Token & Component Specification</span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            Design System & Component Showcase
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
            The tokens and components CarbonTensor is built from — all visual changes happen here first.
          </p>
        </section>

        {/* 1. Color & Status Tokens */}
        <section id="colors" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              01 • Palettes
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              Color & Status Tokens
            </h2>
            <p className="text-sm text-muted-foreground">
              Disciplined forest green chrome, conversion action orange, calm neutral purple canvas, and verified WCAG AA status pairs.
            </p>
          </div>

          <div className="space-y-6">
            {/* Brand & Accent Row */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Brand & Action Tokens
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="rounded-card border border-border bg-card p-3 space-y-2">
                  <div className="h-12 w-full rounded-control bg-brand border border-border flex items-center justify-center text-brand-foreground text-xs font-mono font-medium">
                    #0B4D25
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">--brand</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Forest Green 700</div>
                    <div className="text-[10px] text-subtle font-mono mt-0.5">Ratio: 8.1:1 (AAA)</div>
                  </div>
                </div>

                <div className="rounded-card border border-border bg-card p-3 space-y-2">
                  <div className="h-12 w-full rounded-control bg-brand-hover border border-border flex items-center justify-center text-brand-foreground text-xs font-mono font-medium">
                    #1B5C2D
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">--brand-hover</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Green 600 Hover</div>
                    <div className="text-[10px] text-subtle font-mono mt-0.5">Action hover state</div>
                  </div>
                </div>

                <div className="rounded-card border border-border bg-card p-3 space-y-2">
                  <div className="h-12 w-full rounded-control bg-brand-muted border border-border flex items-center justify-center text-brand text-xs font-mono font-medium">
                    #EAF3ED
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">--brand-muted</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Green 50 Tint</div>
                    <div className="text-[10px] text-subtle font-mono mt-0.5">Active tabs & pills</div>
                  </div>
                </div>

                <div className="rounded-card border border-border bg-card p-3 space-y-2">
                  <div className="h-12 w-full rounded-control bg-chrome border border-border flex items-center justify-center text-brand-foreground text-xs font-mono font-medium">
                    #07381A
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">--chrome</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Green 800 Ground</div>
                    <div className="text-[10px] text-subtle font-mono mt-0.5">Sidebar & top bar</div>
                  </div>
                </div>

                <div className="rounded-card border border-border bg-card p-3 space-y-2">
                  <div className="h-12 w-full rounded-control bg-accent border border-border flex items-center justify-center text-accent-foreground text-xs font-mono font-medium">
                    #F15A24
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">--accent</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Action Orange 500</div>
                    <div className="text-[10px] text-subtle font-mono mt-0.5">Ratio: 3.6:1 (AA Lg)</div>
                  </div>
                </div>

                <div className="rounded-card border border-border bg-card p-3 space-y-2">
                  <div className="h-12 w-full rounded-control bg-accent-muted border border-border flex items-center justify-center text-accent text-xs font-mono font-medium">
                    #FDF0EB
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">--accent-muted</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Orange 50 Tint</div>
                    <div className="text-[10px] text-subtle font-mono mt-0.5">Discrepancy pills</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas Neutrals Row */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Calm Structural Neutrals
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-background border border-border" />
                  <div className="text-xs font-medium text-foreground">--background</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#F8F7FA</div>
                </div>
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-card border border-border" />
                  <div className="text-xs font-medium text-foreground">--card</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#FFFFFF</div>
                </div>
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-muted border border-border" />
                  <div className="text-xs font-medium text-foreground">--muted</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#F0EEF4</div>
                </div>
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-border" />
                  <div className="text-xs font-medium text-foreground">--border</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#E2DFEA</div>
                </div>
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-foreground" />
                  <div className="text-xs font-medium text-foreground">--foreground</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#161321 (16.6:1)</div>
                </div>
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-muted-foreground" />
                  <div className="text-xs font-medium text-foreground">--muted-foreground</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#484368 (7.8:1)</div>
                </div>
                <div className="rounded-card border border-border bg-card p-3 space-y-1.5">
                  <div className="h-10 w-full rounded-control bg-subtle" />
                  <div className="text-xs font-medium text-foreground">--subtle</div>
                  <div className="text-[10px] text-muted-foreground font-mono">#685E8A (4.9:1)</div>
                </div>
              </div>
            </div>

            {/* High-Contrast Status Pairs */}
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Semantic Status Pairs (High-Contrast Tokens)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="rounded-card border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-muted-foreground">Status: Success</span>
                    <span className="text-[11px] font-mono text-subtle">7.1:1 (AAA)</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-pill bg-status-success-bg text-status-success-fg border border-border flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <IconCheck size={14} stroke={1.5} />
                      AWD COMPLIANT
                    </span>
                    <span className="text-[10px] font-mono">VALID</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Applied to verified dry-downs, settled disbursements, and active cooperative unions.
                  </p>
                </div>

                <div className="rounded-card border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-muted-foreground">Status: Warning</span>
                    <span className="text-[11px] font-mono text-subtle">6.4:1 (AAA)</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-pill bg-status-warning-bg text-status-warning-fg border border-border flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <IconAlertTriangle size={14} stroke={1.5} />
                      SENSOR FAULT
                    </span>
                    <span className="text-[10px] font-mono">SUSPICIOUS</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Applied to telemetry fluctuations, pending VVB audits, and radar moisture discrepancies.
                  </p>
                </div>

                <div className="rounded-card border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-muted-foreground">Status: Error</span>
                    <span className="text-[11px] font-mono text-subtle">8.2:1 (AAA)</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-pill bg-status-error-bg text-status-error-fg border border-border flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <IconAlertOctagon size={14} stroke={1.5} />
                      FLOODING VIOLATION
                    </span>
                    <span className="text-[10px] font-mono">REJECTED</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Applied to continuous submersion exceeding 21 days, failed banking payouts, and rejected data.
                  </p>
                </div>

                <div className="rounded-card border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-muted-foreground">Status: Info</span>
                    <span className="text-[11px] font-mono text-subtle">7.4:1 (AAA)</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-pill bg-status-info-bg text-status-info-fg border border-border flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <IconInfoCircle size={14} stroke={1.5} />
                      SAR RADAR CHECK
                    </span>
                    <span className="text-[10px] font-mono">SAMPLE</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Applied to Sentinel-1 satellite radar cross-checks and Access Bank sandbox simulation notices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Typography & Tabular Figures */}
        <section id="typography" className="space-y-6 pt-6 border-t border-border">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              02 • Typography
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              Geist Scale & Tabular Numeric Precision
            </h2>
            <p className="text-sm text-muted-foreground">
              Weights strictly limited to 400 (Regular) and 500 (Medium). Monospace with tabular numerals to prevent layout jitter on decimal telemetry and currencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Type Scale Showcase (7 cols) */}
            <div className="lg:col-span-7 rounded-card border border-border bg-card p-6 space-y-5">
              <div className="pb-3 border-b border-border flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-muted-foreground">Type Hierarchy</span>
                <span className="text-xs font-mono text-subtle">Weights 400 & 500 strictly</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-muted-foreground">Display • 36px • Weight 500</div>
                  <div className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                    Scalable AWD MRV Verification
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-muted-foreground">H1 • 30px • Weight 500</div>
                  <div className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                    Kebbi Rice Farming Union Cohort
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-muted-foreground">H2 • 24px • Weight 500</div>
                  <div className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                    Independent Verifier Anomaly Queue
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-muted-foreground">H3 • 18px • Weight 500</div>
                  <div className="text-lg font-medium text-foreground">
                    Access Bank Sandbox Settlement Ledger
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-muted-foreground">Body • 15px • Weight 400</div>
                  <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                    Perforated Pani pipes installed across contiguous smallholder paddies record water level drawdowns to -15 cm, verifying soil aeration without manual tampering.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-muted-foreground">Caption / Microcopy • 12px • Weight 500</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-subtle">
                    Argungu Cluster • Rima River Basin • 2026 Wet Season Cycle
                  </div>
                </div>
              </div>
            </div>

            {/* Tabular Data Showcase (5 cols) */}
            <div className="lg:col-span-5 rounded-card border border-border bg-card p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-muted-foreground">Geist Mono Data Tokens</span>
                  <span className="text-xs font-mono text-brand">tabular-nums</span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Aeration Level:</span>
                    <span className="tabular-nums font-medium text-brand text-sm">-15.4 cm</span>
                  </div>
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Flooding Violation:</span>
                    <span className="tabular-nums font-medium text-status-error-fg text-sm">+4.8 cm</span>
                  </div>
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Total Enrolled Area:</span>
                    <span className="tabular-nums font-medium text-foreground text-sm">3,420.00 ha</span>
                  </div>
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Avoided Methane:</span>
                    <span className="tabular-nums font-medium text-foreground text-sm">18,400.00 tCO₂e (est.)</span>
                  </div>
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Smallholder Dividend:</span>
                    <span className="tabular-nums font-medium text-foreground text-sm">₦58,912,000.00</span>
                  </div>
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Piezometer Serial:</span>
                    <span className="font-medium text-subtle">SENS-KB-001</span>
                  </div>
                  <div className="p-3 rounded-control bg-background border border-border flex items-center justify-between">
                    <span className="text-muted-foreground">Audit Hash:</span>
                    <span className="font-medium text-subtle text-[11px] truncate max-w-[180px]">e7b91d...58fa21</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-[11px] text-muted-foreground font-mono">
                Tabular numeric alignment ensures zero horizontal jitter during real-time streaming updates.
              </div>
            </div>
          </div>
        </section>

        {/* 3. Spacing & Radius */}
        <section id="geometry" className="space-y-6 pt-6 border-t border-border">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              03 • Geometry
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              Corner Radius & Spacing Foundation
            </h2>
            <p className="text-sm text-muted-foreground">
              Crisp 6px control radius, 8px container radius, and 9999px status pill constraint. Zero ungrounded rounded-2xl cards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-card border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-medium text-foreground">--radius-control: 6px</span>
                <span className="text-muted-foreground">rounded-md</span>
              </div>
              <div className="h-16 rounded-control bg-muted border border-border flex items-center justify-center text-xs font-mono text-muted-foreground">
                Buttons, Text Inputs, Dropdowns
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Applied to all interactive inputs, search fields, and action buttons to align with Tabler icon geometry.
              </p>
            </div>

            <div className="rounded-card border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-medium text-foreground">--radius-card: 8px</span>
                <span className="text-muted-foreground">rounded-lg</span>
              </div>
              <div className="h-16 rounded-card bg-muted border border-border flex items-center justify-center text-xs font-mono text-muted-foreground">
                Cards, Data Tables, Modals
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Applied to all surface panels, data containers, and modal dialogs. Clean, disciplined, non-circular corners.
              </p>
            </div>

            <div className="rounded-card border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-medium text-foreground">--radius-pill: 9999px</span>
                <span className="text-muted-foreground">rounded-full</span>
              </div>
              <div className="h-16 flex items-center justify-center">
                <div className="px-4 py-2 rounded-pill bg-brand-muted border border-border text-xs font-mono font-medium text-brand">
                  Status Pills & Filter Chips Only
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Restricted strictly to status tags and notification pips. Never applied to primary buttons or cards.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Buttons & Micro-Interactions */}
        <section id="buttons" className="space-y-6 pt-6 border-t border-border">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              04 • Interactive Actions
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              Buttons & Micro-Interactions
            </h2>
            <p className="text-sm text-muted-foreground">
              Tabler icons (1.5px stroke), subtle icon hover slide (`translate-x-0.5`), visible keyboard focus rings (`focus-visible:ring-2`), and zero hover shadows.
            </p>
          </div>

          <div className="rounded-card border border-border bg-card p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Primary Brand Button */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Primary Brand</span>
                <button
                  type="button"
                  className="group w-full h-10 px-4 rounded-control text-xs font-medium text-brand-foreground bg-brand hover:bg-brand-hover active:bg-brand transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span>View Dashboard</span>
                  <IconArrowRight size={15} stroke={1.5} className="group-hover:translate-x-0.5 transition-transform duration-fast" />
                </button>
              </div>

              {/* Conversion Accent Button */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Conversion Accent</span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group w-full h-10 px-4 rounded-control text-xs font-medium text-accent-foreground bg-accent hover:bg-accent-hover active:bg-accent transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <IconPlus size={15} stroke={1.5} />
                  <span>Enroll New Plot</span>
                </button>
              </div>

              {/* Secondary Muted Button */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Secondary Muted</span>
                <button
                  type="button"
                  className="w-full h-10 px-4 rounded-control text-xs font-medium text-foreground bg-muted hover:bg-border active:bg-muted transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  <IconDeviceAnalytics size={15} stroke={1.5} className="text-muted-foreground" />
                  <span>Inspect Sensor</span>
                </button>
              </div>

              {/* Outline Neutral Button */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Outline Neutral</span>
                <button
                  type="button"
                  className="w-full h-10 px-4 rounded-control text-xs font-medium text-foreground bg-card border border-border hover:bg-background hover:border-foreground/30 active:bg-card transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                  <IconRefresh size={15} stroke={1.5} className="text-muted-foreground" />
                  <span>Refresh Telemetry</span>
                </button>
              </div>

              {/* Destructive Action Button */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Destructive</span>
                <button
                  type="button"
                  className="w-full h-10 px-4 rounded-control text-xs font-medium text-status-error-fg bg-status-error-bg border border-border hover:bg-status-error-bg/80 transition-colors duration-fast flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-error-fg focus-visible:ring-offset-2"
                >
                  <IconTrash size={15} stroke={1.5} />
                  <span>Deactivate Plot</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Interactive Invariants: Zero hover:shadow-*. Explicit focus-visible ring on all triggers.</span>
              <span className="text-brand">Tabler Stroke: 1.5px constant</span>
            </div>
          </div>
        </section>

        {/* 5. Form Controls & Segmented Tabs */}
        <section id="forms" className="space-y-6 pt-6 border-t border-border">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              05 • Inputs & Controls
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              Form Controls & Segmented Tabs
            </h2>
            <p className="text-sm text-muted-foreground">
              Labels always positioned above inputs, crisp 6px radius, inline error states with specific error messages, and tactile switch toggles.
            </p>
          </div>

          <div className="rounded-card border border-border bg-card p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Text Input with Leading Icon */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Rice Variety (Combobox Input)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <IconLeaf size={16} stroke={1.5} />
                  </div>
                  <input
                    type="text"
                    value={textInputValue}
                    onChange={(e) => setTextInputValue(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 text-xs font-normal rounded-control border border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand transition-colors duration-fast"
                    placeholder="Enter certified seed variety..."
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">FARO varieties recommended for Kebbi irrigated AWD.</p>
              </div>

              {/* Select Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Piezometer Ingestion Status
                </label>
                <select className="w-full h-10 px-3 text-xs font-normal rounded-control border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand transition-colors duration-fast">
                  <option value="ALL">All Validated Readings (120/120)</option>
                  <option value="AERATED">Aerated Threshold (-15 cm)</option>
                  <option value="SUBMERGED">Submerged Re-flooding (+5 cm)</option>
                  <option value="ANOMALY">Flagged Sensor Anomalies</option>
                </select>
                <p className="text-[11px] text-muted-foreground">Telemetry queries filter hydrostatic depth.</p>
              </div>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Cycle Planting Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-06-15"
                  className="w-full h-10 px-3 text-xs font-mono font-normal rounded-control border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand transition-colors duration-fast"
                />
                <p className="text-[11px] text-muted-foreground">Start of 2026 wet season aeration cycle.</p>
              </div>

              {/* Input with Inline Error State */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Sensor Serial Code (Error State)
                </label>
                <input
                  type="text"
                  value={textErrorValue}
                  onChange={(e) => setTextErrorValue(e.target.value)}
                  className="w-full h-10 px-3 text-xs font-mono font-normal rounded-control border border-status-error-fg bg-status-error-bg/30 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-error-fg transition-colors duration-fast"
                />
                <div className="flex items-center gap-1.5 text-[11px] text-status-error-fg">
                  <IconAlertOctagon size={13} stroke={1.5} />
                  <span>Invalid format. Must match SENS-KB-[0-9]{'{3}'}.</span>
                </div>
              </div>

              {/* Tactile Switch Toggle */}
              <div className="space-y-2">
                <span className="block text-xs font-medium text-foreground">
                  Automated SAR Cross-Check Feed
                </span>
                <div className="flex items-center justify-between p-3 rounded-control border border-border bg-background">
                  <div className="space-y-0.5">
                    <span className="text-xs font-medium text-foreground">Sentinel-1 Sync</span>
                    <span className="block text-[11px] text-muted-foreground">Poll 12-day orbital pass</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isSwitchOn}
                    onClick={() => setIsSwitchOn(!isSwitchOn)}
                    className={`w-11 h-6 rounded-pill transition-colors duration-fast p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      isSwitchOn ? "bg-brand" : "bg-border"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-pill bg-card shadow-xs transition-transform duration-fast ${
                        isSwitchOn ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Segmented Control Tabs */}
              <div className="space-y-2">
                <span className="block text-xs font-medium text-foreground">
                  Active Persona Switcher
                </span>
                <div className="p-1 rounded-control border border-border bg-background grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("cooperative")}
                    className={`h-8 rounded-[4px] text-xs font-medium transition-colors duration-fast ${
                      activeTab === "cooperative"
                        ? "bg-card text-foreground border border-border shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Cooperative
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("verifier")}
                    className={`h-8 rounded-[4px] text-xs font-medium transition-colors duration-fast ${
                      activeTab === "verifier"
                        ? "bg-card text-foreground border border-border shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Verifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("finance")}
                    className={`h-8 rounded-[4px] text-xs font-medium transition-colors duration-fast ${
                      activeTab === "finance"
                        ? "bg-card text-foreground border border-border shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Finance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. App Mode Primitives & All 4 Data States */}
        <section id="app-primitives" className="space-y-6 pt-6 border-t border-border">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              06 • App Primitives & States
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              App Mode Primitives & The 4 Designed Data States
            </h2>
            <p className="text-sm text-muted-foreground">
              Collapsible sidebar navigation rail with active edge markers, sticky-header data table, and a side-by-side showcase of Loading, Empty, Error, and Populated states.
            </p>
          </div>

          {/* Sub-Showcase A: Sidebar Rail & Sticky Data Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sidebar Rail Preview (4 cols) */}
            <div className="lg:col-span-4 rounded-card border border-border bg-chrome text-brand-foreground p-4 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-control bg-brand flex items-center justify-center text-brand-foreground">
                      <IconLeaf size={16} stroke={1.5} />
                    </div>
                    {!isSidebarRailCollapsed && (
                      <span className="text-xs font-medium tracking-tight">CarbonTensor Rail</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSidebarRailCollapsed(!isSidebarRailCollapsed)}
                    className="p-1 rounded-control text-brand-muted hover:text-brand-foreground hover:bg-brand/30 transition-colors"
                    title={isSidebarRailCollapsed ? "Expand Rail" : "Collapse Rail"}
                  >
                    {isSidebarRailCollapsed ? (
                      <IconLayoutSidebarLeftExpand size={16} stroke={1.5} />
                    ) : (
                      <IconLayoutSidebarLeftCollapse size={16} stroke={1.5} />
                    )}
                  </button>
                </div>

                {/* Navigation Items with 3px Brand Edge Marker */}
                <nav className="space-y-1">
                  <div className="relative flex items-center gap-2.5 px-3 py-2 rounded-control bg-brand/40 text-brand-foreground text-xs font-medium">
                    {/* Active Edge Marker */}
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-pill bg-brand-muted" />
                    <IconBuildingCommunity size={16} stroke={1.5} className="shrink-0" />
                    {!isSidebarRailCollapsed && <span>Cooperative Hub</span>}
                  </div>

                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-control text-brand-muted hover:text-brand-foreground hover:bg-brand/20 text-xs font-normal transition-colors">
                    <IconSatellite size={16} stroke={1.5} className="shrink-0 text-brand-muted" />
                    {!isSidebarRailCollapsed && <span>MRV Verifier</span>}
                  </div>

                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-control text-brand-muted hover:text-brand-foreground hover:bg-brand/20 text-xs font-normal transition-colors">
                    <IconDroplet size={16} stroke={1.5} className="shrink-0 text-brand-muted" />
                    {!isSidebarRailCollapsed && <span>Finance & Payouts</span>}
                  </div>
                </nav>
              </div>

              <div className="pt-3 border-t border-border/20 text-[11px] font-mono text-brand-muted">
                {!isSidebarRailCollapsed && <span>Kebbi Cluster • 3 Core Routes</span>}
              </div>
            </div>

            {/* Sticky Table Preview (8 cols) */}
            <div className="lg:col-span-8 rounded-card border border-border bg-card overflow-hidden flex flex-col justify-between">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">Sticky Header Table Preview</span>
                  <span className="text-[11px] font-mono text-muted-foreground">(Bulk Select & Hover)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Argungu"
                      className="h-8 pl-7 pr-3 text-xs font-normal rounded-control border border-border bg-background text-foreground w-36"
                    />
                    <IconSearch size={13} stroke={1.5} className="absolute left-2.5 top-2.5 text-muted-foreground" />
                  </div>
                  <button
                    type="button"
                    className="h-8 px-2.5 rounded-control border border-border bg-background text-xs font-medium text-muted-foreground flex items-center gap-1.5"
                  >
                    <IconAdjustmentsHorizontal size={14} stroke={1.5} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto max-h-56">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-muted sticky top-0 z-10 text-muted-foreground font-medium text-[11px] uppercase tracking-wider border-b border-border">
                    <tr>
                      <th className="py-2 px-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => setSelectAll(e.target.checked)}
                          className="rounded-control border-border text-brand focus-visible:ring-2 focus-visible:ring-brand"
                        />
                      </th>
                      <th className="py-2 px-3">Plot Code</th>
                      <th className="py-2 px-3">Farmer</th>
                      <th className="py-2 px-3">Water Depth</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { id: "plot-001", farmer: "Aminu Bello", depth: "-12.5 cm", status: "AWD COMPLIANT", type: "success" },
                      { id: "plot-002", farmer: "Fatima Usman", depth: "-10.0 cm", status: "AWD COMPLIANT", type: "success" },
                      { id: "plot-003", farmer: "Sanusi Garba", depth: "+4.8 cm", status: "FLOODING VIOLATION", type: "error" },
                      { id: "plot-004", farmer: "Balarabe Yusuf", depth: "-82.0 cm", status: "SENSOR FAULT", type: "warning" },
                    ].map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedRowId(row.id)}
                        className={`transition-colors duration-fast cursor-pointer ${
                          selectedRowId === row.id
                            ? "bg-brand-muted/40"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <input
                            type="checkbox"
                            checked={selectAll || selectedRowId === row.id}
                            onChange={() => setSelectedRowId(row.id)}
                            className="rounded-control border-border text-brand focus-visible:ring-2 focus-visible:ring-brand"
                          />
                        </td>
                        <td className="py-2.5 px-3 font-mono font-medium text-foreground">{row.id}</td>
                        <td className="py-2.5 px-3 font-normal text-muted-foreground">{row.farmer}</td>
                        <td className="py-2.5 px-3 font-mono tabular-nums font-medium text-foreground">{row.depth}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium border border-border ${
                              row.type === "success"
                                ? "bg-status-success-bg text-status-success-fg"
                                : row.type === "error"
                                ? "bg-status-error-bg text-status-error-fg"
                                : "bg-status-warning-bg text-status-warning-fg"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-t border-border bg-background text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                <span>Selected: {selectedRowId} (Argungu Rima Basin)</span>
                <span>4 Plots Displayed</span>
              </div>
            </div>
          </div>

          {/* Sub-Showcase B: All 4 Designed Data States (Side-by-Side) */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              Side-by-Side: The 4 Designed Data States
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* State 1: Loading Skeleton */}
              <div className="rounded-card border border-border bg-card p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-mono font-medium text-foreground">1 • Loading State</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Skeleton</span>
                </div>
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-muted rounded-control w-3/4" />
                  <div className="h-3 bg-muted rounded-control w-full" />
                  <div className="h-14 bg-muted rounded-control w-full" />
                  <div className="h-8 bg-muted rounded-control w-2/3" />
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">
                  Loading plots ledger from Kebbi cluster...
                </p>
              </div>

              {/* State 2: Actionable Empty State */}
              <div className="rounded-card border border-border bg-card p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-mono font-medium text-foreground">2 • Empty State</span>
                    <span className="text-[10px] font-mono text-muted-foreground">Actionable CTA</span>
                  </div>
                  <div className="pt-3 text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-control bg-muted flex items-center justify-center text-muted-foreground">
                      <IconSearch size={18} stroke={1.5} />
                    </div>
                    <div className="text-xs font-medium text-foreground">No plots match filter</div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      No parcels found in active search query. Reset filters to view union plots.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full h-8 px-3 rounded-control text-xs font-medium text-brand bg-brand-muted border border-border hover:bg-brand-muted/70 transition-colors"
                >
                  Reset Plot Filters
                </button>
              </div>

              {/* State 3: Error State with Retry Button */}
              <div className="rounded-card border border-border bg-card p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-mono font-medium text-foreground">3 • Error State</span>
                    <span className="text-[10px] font-mono text-status-error-fg">Retry Button</span>
                  </div>
                  <div className="pt-3 text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-control bg-status-error-bg flex items-center justify-center text-status-error-fg">
                      <IconAlertOctagon size={18} stroke={1.5} />
                    </div>
                    <div className="text-xs font-medium text-foreground">Telemetry Stream Failed</div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      API endpoint /observations/ timed out. The session may have expired.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full h-8 px-3 rounded-control text-xs font-medium text-status-error-fg bg-status-error-bg border border-border hover:bg-status-error-bg/70 transition-colors flex items-center justify-center gap-1.5"
                >
                  <IconRefresh size={14} stroke={1.5} />
                  <span>Retry Connection</span>
                </button>
              </div>

              {/* State 4: Populated State with Live / Stale Indicator */}
              <div className="rounded-card border border-border bg-card p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-mono font-medium text-foreground">4 • Populated</span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-brand">
                      <span className="w-2 h-2 rounded-pill bg-brand animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>
                  <div className="pt-2 space-y-2 font-mono">
                    <div className="text-xs text-muted-foreground">Plot: plot-001 • SENS-KB-001</div>
                    <div className="text-xl font-medium text-brand tabular-nums">-12.5 cm</div>
                    <div className="text-[11px] text-subtle">Safe AWD Aeration Active (Day 5)</div>
                  </div>
                </div>
                <div className="p-2 rounded-control bg-background border border-border text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                  <span>Synced: 12m ago</span>
                  <span className="text-brand">In-Situ Piezometer</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Clean Modal Dialog Preview (No Backdrop Blur Clutter) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 transition-opacity"
        >
          <div className="w-full max-w-md rounded-card border border-border bg-card p-6 shadow-xl space-y-5 animate-in fade-in duration-fast">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-control bg-accent-muted text-accent flex items-center justify-center">
                  <IconPlus size={16} stroke={1.5} />
                </div>
                <h3 className="text-base font-medium text-foreground">Enroll New Paddy Plot</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-control text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close dialog"
              >
                <IconX size={16} stroke={1.5} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-foreground">Parcel Name</label>
                <input
                  type="text"
                  defaultValue="Argungu Basin Parcel D6"
                  className="w-full h-9 px-3 text-xs rounded-control border border-border bg-card text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-foreground">Area (Hectares)</label>
                  <input
                    type="number"
                    defaultValue="1.85"
                    step="0.01"
                    className="w-full h-9 px-3 text-xs font-mono tabular-nums rounded-control border border-border bg-card text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-foreground">Rice Variety</label>
                  <input
                    type="text"
                    defaultValue="FARO 44"
                    className="w-full h-9 px-3 text-xs rounded-control border border-border bg-card text-foreground"
                  />
                </div>
              </div>

              <div className="p-3 rounded-control bg-background border border-border text-xs text-muted-foreground space-y-1">
                <div className="font-medium text-foreground">Cooperative Association</div>
                <div>Enrolling under: Kebbi Green Rice Growers Union</div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-control text-xs font-medium text-foreground bg-card border border-border hover:bg-background transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-control text-xs font-medium text-accent-foreground bg-accent hover:bg-accent-hover transition-colors"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
