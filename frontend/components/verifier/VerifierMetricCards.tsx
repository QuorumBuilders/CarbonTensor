"use client";

import {
  Layers,
  ShieldCheck,
  AlertOctagon,
  Satellite,
  Coins,
  Info,
} from "lucide-react";

interface VerifierMetricCardsProps {
  totalPlots?: number;
  verifiedPlots?: number;
  flaggedPlots?: number;
  sarPasses?: number;
  estimatedTonnage?: number;
}

export function VerifierMetricCards({
  totalPlots = 5,
  verifiedPlots = 3,
  flaggedPlots = 2,
  sarPasses = 1,
  estimatedTonnage = 18400,
}: VerifierMetricCardsProps) {
  const cards = [
    {
      id: "total-plots",
      title: "Total Monitored Plots",
      value: `${totalPlots} Plots`,
      subtitle: "Argungu Cluster Enrolled",
      badge: "100% In-Situ",
      badgeClass: "bg-primary-green-50 text-[#0B4D25] border-primary-green-200",
      icon: Layers,
      iconBg: "bg-primary-green-50 text-[#0B4D25] border-primary-green-200",
    },
    {
      id: "verified-plots",
      title: "Clean AWD Verified",
      value: `${verifiedPlots} Plots`,
      subtitle: "Compliant Aeration Cycles",
      badge: "60% Pool Verified",
      badgeClass: "bg-[#EAF3ED] text-[#0B4D25] border-primary-green-200",
      icon: ShieldCheck,
      iconBg: "bg-primary-green-100 text-[#0B4D25] border-primary-green-300",
    },
    {
      id: "flagged-anomalies",
      title: "Flagged MRV Anomalies",
      value: `${flaggedPlots} Plots`,
      subtitle: "1 Flooding • 1 Sensor Fault",
      badge: "Action Required",
      badgeClass: "bg-[#FDF0ED] text-[#7A1C18] border-red-200",
      icon: AlertOctagon,
      iconBg: "bg-red-50 text-red-700 border-red-200",
    },
    {
      id: "satellite-passes",
      title: "Sentinel-1 SAR Passes",
      value: `${sarPasses} Sample Pass`,
      subtitle: "1 Contradiction Detected",
      badge: "Sample Radar",
      badgeClass: "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-200",
      icon: Satellite,
      iconBg: "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-200",
    },
    {
      id: "audited-carbon",
      title: "Estimated Audited Carbon",
      value: `${estimatedTonnage.toLocaleString()} tCO₂e (est.)`,
      subtitle: "UNFCCC AMS-III.H Math",
      badge: "Verified Pool",
      badgeClass: "bg-primary-green-50 text-[#0B4D25] border-primary-green-200",
      icon: Coins,
      iconBg: "bg-primary-green-50 text-[#0B4D25] border-primary-green-200",
      hasInfo: true,
      infoText: "Avoided methane emissions estimated using AMS-III.H methodology. Not certified credits.",
    },
  ];

  return (
    <section aria-label="Verifier MRV Audit Executive Metrics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white border border-[#E2DFEA] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all hover:border-primary-green-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 pb-2">
                <span className="text-xs font-semibold text-neutral-purple-600 truncate">
                  {card.title}
                </span>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${card.iconBg}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Metric Body */}
              <div className="mt-2 space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-neutral-purple-900 tracking-tight flex items-center gap-1.5 flex-wrap">
                  <span>{card.value}</span>
                  {card.hasInfo && (
                    <span
                      title={card.infoText}
                      className="cursor-help text-neutral-purple-400 hover:text-neutral-purple-600"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-purple-500 font-medium truncate">
                  {card.subtitle}
                </p>
              </div>

              {/* Status Badge Footer */}
              <div className="mt-3 pt-2.5 border-t border-neutral-purple-100 flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${card.badgeClass}`}
                >
                  {card.badge}
                </span>
                <span className="text-[10px] font-mono text-neutral-purple-400">
                  Argungu 2026
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
