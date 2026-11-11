"use client";

import {
  MapPin,
  Radio,
  Flame,
  Coins,
  TrendingUp,
  Info,
} from "lucide-react";

export interface MetricSummary {
  enrolledAreaHa?: number;
  activePlotsCount?: number;
  totalPlotsCount?: number;
  estimatedAvoidedMethane?: number; // in tCO2e
  farmerPoolUsd?: number;
  farmerPoolNgn?: number;
}

interface MetricCardsProps {
  metrics?: MetricSummary;
}

export function MetricCards({
  metrics = {
    enrolledAreaHa: 3420,
    activePlotsCount: 5,
    totalPlotsCount: 380,
    estimatedAvoidedMethane: 18400,
    farmerPoolUsd: 52600,
    farmerPoolNgn: 84160000,
  },
}: MetricCardsProps) {
  const cards = [
    {
      id: "enrolled-area",
      title: "Total Enrolled Area",
      value: `${metrics.enrolledAreaHa?.toLocaleString() ?? "3,420"} ha`,
      badge: "Kebbi Basin",
      badgeClass: "bg-primary-green-50 text-primary-green-800 border-primary-green-200",
      icon: MapPin,
      iconColor: "text-primary-green-700 bg-primary-green-100",
      changeText: "+420 ha vs baseline",
      changePositive: true,
      subtext: "Across 12 cluster zones in Rima River Basin",
    },
    {
      id: "monitored-plots",
      title: "Monitored Plots",
      value: `${metrics.activePlotsCount ?? 5} Plots`,
      badge: "Real-time Telemetry",
      badgeClass: "bg-status-success-bg text-status-success-text border-primary-green-200",
      icon: Radio,
      iconColor: "text-primary-green-600 bg-primary-green-50",
      changeText: "380 plots aggregated in union",
      changePositive: true,
      subtext: "5 live IoT piezometers active in pilot cluster",
    },
    {
      id: "avoided-methane",
      title: "Estimated Avoided Methane",
      value: `${metrics.estimatedAvoidedMethane?.toLocaleString() ?? "18,400"} tCO₂e (est.)`,
      badge: "AMS-III.H AWD",
      badgeClass: "bg-primary-green-50 text-primary-green-800 border-primary-green-200",
      icon: Flame,
      iconColor: "text-accent-orange-600 bg-accent-orange-50",
      changeText: "32% CH₄ emissions reduction",
      changePositive: true,
      subtext: "Calculated via verified dry-down episode index",
      honestyNotice: "UNFCCC AMS-III.H parameters. Estimated volume pending independent verification audit.",
    },
    {
      id: "farmer-dividend-pool",
      title: "Accrued Farmer Pool",
      value: `$${metrics.farmerPoolUsd?.toLocaleString() ?? "52,600"} USD`,
      badge: "70% Smallholder Split",
      badgeClass: "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-200",
      icon: Coins,
      iconColor: "text-accent-orange-600 bg-accent-orange-50",
      changeText: `₦${((metrics.farmerPoolNgn ?? 84160000) / 1000000).toFixed(1)}M est. equiv.`,
      changePositive: true,
      subtext: "Direct dividend allocation via Access Bank Sandbox (Simulated)",
      honestyNotice: "Access Bank Sandbox (Simulated). Disbursed post-issuance upon verifier sign-off.",
    },
  ];

  return (
    <section aria-label="Executive Performance Metrics" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white border border-neutral-purple-200/90 rounded-xl p-5 shadow-xs hover:border-primary-green-300 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                {/* Header row: Title + Icon */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold tracking-wide uppercase text-neutral-purple-600">
                    {card.title}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${card.iconColor}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Main Metric Value */}
                <div className="mt-2.5">
                  <div className="text-2xl font-bold tracking-tight text-neutral-purple-900 tabular-nums">
                    {card.value}
                  </div>
                  {card.badge && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${card.badgeClass}`}
                      >
                        {card.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer details: Trend / Subtext */}
              <div className="mt-4 pt-3 border-t border-neutral-purple-100/80 text-xs">
                <div className="flex items-center gap-1.5 text-primary-green-700 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{card.changeText}</span>
                </div>
                <p className="mt-1 text-neutral-purple-500 text-[11px] leading-tight">
                  {card.subtext}
                </p>
                {card.honestyNotice && (
                  <div className="mt-2 flex items-start gap-1 text-[10px] text-neutral-purple-500 bg-neutral-purple-50 rounded p-1.5 border border-neutral-purple-100">
                    <Info className="w-3 h-3 text-neutral-purple-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{card.honestyNotice}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

