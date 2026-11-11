"use client";

import { useState, useEffect } from "react";
import { Users, Building2, ShieldCheck, PieChart, Info } from "lucide-react";

interface SplitVisualizerProps {
  totalUsd?: number;
  totalNgn?: number;
  isTriggered?: boolean;
}

export function SplitVisualizer({
  totalUsd = 10000,
  totalNgn = 16000000,
  isTriggered = false,
}: SplitVisualizerProps) {
  const [mounted, setMounted] = useState(false);
  const [activeSegment, setActiveSegment] = useState<
    "all" | "farmer" | "coop" | "platform"
  >("all");

  useEffect(() => {
    // Slight tick on mount or when isTriggered changes so transition animates smoothly
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [isTriggered]);

  const farmerUsd = totalUsd * 0.7;
  const farmerNgn = totalNgn * 0.7;

  const coopUsd = totalUsd * 0.15;
  const coopNgn = totalNgn * 0.15;

  const platformUsd = totalUsd * 0.15;
  const platformNgn = totalNgn * 0.15;

  return (
    <div className="bg-white border border-neutral-purple-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-purple-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
              <PieChart className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-neutral-purple-900 tracking-tight">
              Carbon Revenue Allocation Model (70 / 15 / 15 Split)
            </h2>
          </div>
          <p className="text-xs text-neutral-purple-600 mt-1">
            Automated programmatic split protocol distributing voluntary carbon offtaker settlement.
          </p>
        </div>

        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200 self-start sm:self-auto">
          Proposed Allocation (est.)
        </span>
      </div>

      {/* Interactive Horizontal Stacked Bar */}
      <div className="space-y-2">
        <div className="relative h-11 w-full bg-[#F8F7FA] rounded-xl overflow-hidden p-1.5 border border-neutral-purple-200 flex gap-1">
          {/* 70% Farmer Dividends - Base Green #0B4D25 */}
          <div
            onMouseEnter={() => setActiveSegment("farmer")}
            onMouseLeave={() => setActiveSegment("all")}
            style={{
              width: mounted ? "70%" : "0%",
              transition:
                "width 500ms cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 200ms ease",
            }}
            className={`h-full rounded-lg bg-[#0B4D25] text-white flex items-center justify-between px-3 cursor-pointer select-none ${
              activeSegment === "coop" || activeSegment === "platform"
                ? "opacity-60"
                : "opacity-100"
            }`}
            title="70% Smallholder Farmer Pool"
          >
            <span className="text-xs font-bold tracking-tight truncate flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary-green-200" />
              <span>Smallholder Farmers</span>
            </span>
            <span className="font-mono text-xs font-bold tabular-nums">70%</span>
          </div>

          {/* 15% Cooperative Commission - Tertiary Bright Green #3F8851 */}
          <div
            onMouseEnter={() => setActiveSegment("coop")}
            onMouseLeave={() => setActiveSegment("all")}
            style={{
              width: mounted ? "15%" : "0%",
              transition:
                "width 500ms cubic-bezier(0.22, 1, 0.36, 1) 60ms, opacity 200ms ease",
            }}
            className={`h-full rounded-lg bg-[#3F8851] text-white flex items-center justify-between px-2 cursor-pointer select-none ${
              activeSegment === "farmer" || activeSegment === "platform"
                ? "opacity-60"
                : "opacity-100"
            }`}
            title="15% Cooperative Union Commission"
          >
            <span className="text-xs font-bold tracking-tight truncate flex items-center gap-1">
              <Building2 className="w-3 h-3 text-primary-green-100" />
              <span className="hidden md:inline">Cooperative</span>
            </span>
            <span className="font-mono text-xs font-bold tabular-nums">15%</span>
          </div>

          {/* 15% Platform MRV Operations - Secondary Sage #6DAB6C */}
          <div
            onMouseEnter={() => setActiveSegment("platform")}
            onMouseLeave={() => setActiveSegment("all")}
            style={{
              width: mounted ? "15%" : "0%",
              transition:
                "width 500ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, opacity 200ms ease",
            }}
            className={`h-full rounded-lg bg-[#6DAB6C] text-white flex items-center justify-between px-2 cursor-pointer select-none ${
              activeSegment === "farmer" || activeSegment === "coop"
                ? "opacity-60"
                : "opacity-100"
            }`}
            title="15% Platform MRV Operations & Registry Reserve"
          >
            <span className="text-xs font-bold tracking-tight truncate flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-white" />
              <span className="hidden md:inline">Platform</span>
            </span>
            <span className="font-mono text-xs font-bold tabular-nums">15%</span>
          </div>
        </div>
      </div>

      {/* Breakdown Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Segment 1 Card */}
        <div
          onMouseEnter={() => setActiveSegment("farmer")}
          onMouseLeave={() => setActiveSegment("all")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSegment === "farmer"
              ? "bg-primary-green-50/70 border-[#0B4D25] shadow-xs"
              : "bg-[#F8F7FA] border-neutral-purple-200 hover:border-primary-green-400"
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#0B4D25] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B4D25]" />
              <span>Smallholder Farmer Share</span>
            </span>
            <span className="font-mono font-bold text-xs text-[#0B4D25]">
              70%
            </span>
          </div>
          <div className="text-lg font-bold font-mono tabular-nums text-neutral-purple-900">
            ${farmerUsd.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-neutral-purple-500 font-mono tabular-nums">
            ≈ ₦{farmerNgn.toLocaleString()} NGN
          </div>
          <p className="text-[10px] text-neutral-purple-600 mt-2 border-t border-neutral-purple-200/60 pt-1.5">
            Directly credited into verified smallholder bank accounts based on measured AWD drying episodes.
          </p>
        </div>

        {/* Segment 2 Card */}
        <div
          onMouseEnter={() => setActiveSegment("coop")}
          onMouseLeave={() => setActiveSegment("all")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSegment === "coop"
              ? "bg-primary-green-50/70 border-[#3F8851] shadow-xs"
              : "bg-[#F8F7FA] border-neutral-purple-200 hover:border-primary-green-400"
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#3F8851] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F8851]" />
              <span>Cooperative Commission</span>
            </span>
            <span className="font-mono font-bold text-xs text-[#3F8851]">
              15%
            </span>
          </div>
          <div className="text-lg font-bold font-mono tabular-nums text-neutral-purple-900">
            ${coopUsd.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-neutral-purple-500 font-mono tabular-nums">
            ≈ ₦{coopNgn.toLocaleString()} NGN
          </div>
          <p className="text-[10px] text-neutral-purple-600 mt-2 border-t border-neutral-purple-200/60 pt-1.5">
            Union administration, extension officer training, and community solar irrigation maintenance.
          </p>
        </div>

        {/* Segment 3 Card */}
        <div
          onMouseEnter={() => setActiveSegment("platform")}
          onMouseLeave={() => setActiveSegment("all")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSegment === "platform"
              ? "bg-primary-green-50/70 border-[#6DAB6C] shadow-xs"
              : "bg-[#F8F7FA] border-neutral-purple-200 hover:border-primary-green-400"
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#6DAB6C] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6DAB6C]" />
              <span>Platform &amp; MRV Operations</span>
            </span>
            <span className="font-mono font-bold text-xs text-[#6DAB6C]">
              15%
            </span>
          </div>
          <div className="text-lg font-bold font-mono tabular-nums text-neutral-purple-900">
            ${platformUsd.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-neutral-purple-500 font-mono tabular-nums">
            ≈ ₦{platformNgn.toLocaleString()} NGN
          </div>
          <p className="text-[10px] text-neutral-purple-600 mt-2 border-t border-neutral-purple-200/60 pt-1.5">
            Telemetry infrastructure, Sentinel-1 radar pipeline compute, and third-party VVB audit reserve.
          </p>
        </div>
      </div>

      {/* Explanatory Caption */}
      <div className="flex items-center gap-2 text-xs text-neutral-purple-600 bg-[#F8F7FA] p-3 rounded-xl border border-neutral-purple-200">
        <Info className="w-4 h-4 text-primary-green-700 shrink-0" />
        <span>
          Model parameters aligned with cooperative aggregation standards. All split percentages marked as <strong>Proposed Allocation (est.)</strong>.
        </span>
      </div>
    </div>
  );
}

