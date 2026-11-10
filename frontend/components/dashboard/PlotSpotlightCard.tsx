"use client";

import Link from "next/link";
import type { PlotEnriched } from "./PlotMap";
import {
  Radio,
  Satellite,
  Coins,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Battery,
  Wifi,
  Clock,
  Sparkles,
} from "lucide-react";

interface PlotSpotlightCardProps {
  plot: PlotEnriched;
}

export function PlotSpotlightCard({ plot }: PlotSpotlightCardProps) {
  const isCompliant = plot.complianceStatus === "COMPLIANT";
  const isViolation = plot.complianceStatus === "NON_COMPLIANT";
  const isFault = plot.complianceStatus === "SENSOR_FAULT";
  const isRadarConflict = plot.complianceStatus === "RADAR_DISCREPANCY";

  // Calculated estimates for selected plot
  const estimatedAvoidedMethane = (plot.calculated_area * 5.2).toFixed(1);
  const estimatedDividendNgn = Math.round(plot.calculated_area * 78000).toLocaleString();

  return (
    <div className="bg-white border border-neutral-purple-200 rounded-xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 border-b border-neutral-purple-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-green-100 border border-primary-green-300 flex items-center justify-center text-primary-green-800 font-mono font-bold text-xs">
              {plot.id.split("-")[1] || "01"}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-sm text-neutral-purple-900">
                  {plot.id.toUpperCase()}
                </span>
                <span className="text-xs text-neutral-purple-500 font-medium">
                  • {plot.rice_variety}
                </span>
              </div>
              <p className="text-xs font-semibold text-primary-green-800">
                {plot.farmerName}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${
              isCompliant
                ? "bg-status-success-bg text-status-success-text border-primary-green-300"
                : isViolation
                ? "bg-status-error-bg text-status-error-text border-red-300"
                : isFault
                ? "bg-status-warning-bg text-status-warning-text border-amber-300"
                : "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-300"
            }`}
          >
            {isCompliant ? (
              <ShieldCheck className="w-3 h-3" />
            ) : (
              <AlertTriangle className="w-3 h-3" />
            )}
            <span>{plot.statusLabel}</span>
          </span>
        </div>

        {/* Real-time Telemetry Section */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-purple-700 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-primary-green-600" />
              <span>In-Situ Piezometer Water Level</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-purple-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>12m ago</span>
            </span>
          </div>

          {/* Water Level Visual Dial */}
          <div className="bg-neutral-purple-50 rounded-xl p-3 border border-neutral-purple-100 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900">
                {plot.currentWaterLevel > 0 ? "+" : ""}
                {plot.currentWaterLevel.toFixed(1)}{" "}
                <span className="text-sm font-normal text-neutral-purple-500">cm</span>
              </div>
              <p className="text-xs text-neutral-purple-600 font-medium mt-0.5">
                {plot.waterStatusText}
              </p>
            </div>

            <div className="text-right text-[11px] space-y-1 text-neutral-purple-500">
              <div className="flex items-center justify-end gap-1">
                <Battery className="w-3.5 h-3.5 text-primary-green-700" />
                <span className="font-mono tabular-nums">94%</span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <Wifi className="w-3.5 h-3.5 text-primary-green-700" />
                <span className="font-mono tabular-nums">-68 dBm</span>
              </div>
            </div>
          </div>

          {/* AWD Threshold Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-neutral-purple-500 font-mono">
              <span>Dry Threshold (-15 cm)</span>
              <span>Soil (0 cm)</span>
              <span>Flooded (+5 cm)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-neutral-purple-200 overflow-hidden relative">
              {/* Safe AWD range indicator */}
              <div className="absolute left-[20%] right-[50%] h-full bg-primary-green-300 opacity-60" />
              {/* Pointer indicator */}
              <div
                className="absolute top-0 bottom-0 w-2 rounded-full bg-primary-green-700 shadow-xs transition-all duration-300"
                style={{
                  left: `${Math.min(
                    Math.max(((plot.currentWaterLevel + 25) / 35) * 100, 5),
                    95
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Remote Sensing Cross-Check */}
        <div className="mt-4 p-3 rounded-lg border border-neutral-purple-100 bg-neutral-purple-50/50 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-neutral-purple-800">
              <Satellite className="w-3.5 h-3.5 text-primary-green-700" />
              <span>Sentinel-1 Radar Cross-Check (Sample)</span>
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                isRadarConflict
                  ? "bg-red-100 text-red-800"
                  : "bg-primary-green-100 text-primary-green-800"
              }`}
            >
              {isRadarConflict ? "DISCREPANCY" : "CONCORDANT"}
            </span>
          </div>
          <p className="text-[11px] text-neutral-purple-600 leading-relaxed">
            {isRadarConflict
              ? "SAR backscatter detects standing surface water (-14.2 dB), contradicting piezometer dry reading. Recommended for verifier field inspection."
              : isViolation
              ? "SAR backscatter confirms saturated ponding across paddy (-11.8 dB). Continuous flooding confirmed."
              : "SAR backscatter indicates rough, aerated soil surface (-18.6 dB). In concord with in-situ AWD aeration tube."}
          </p>
        </div>

        {/* Carbon & Payout Projections */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-primary-green-50/80 border border-primary-green-200">
            <span className="text-[11px] text-primary-green-800 font-medium">
              Avoided CH₄
            </span>
            <div className="font-bold text-sm text-primary-green-900 font-mono tabular-nums mt-0.5">
              {estimatedAvoidedMethane} tCO₂e (est.)
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-accent-orange-50/80 border border-accent-orange-200">
            <span className="text-[11px] text-accent-orange-800 font-medium flex items-center gap-1">
              <Coins className="w-3 h-3 text-accent-orange-600" />
              <span>Farmer Share (70%)</span>
            </span>
            <div className="font-bold text-sm text-accent-orange-900 font-mono tabular-nums mt-0.5">
              ₦{estimatedDividendNgn} est.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-5 pt-3 border-t border-neutral-purple-100">
        <Link
          href={`/verifier?plot=${plot.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-primary-green-800 bg-primary-green-50 hover:bg-primary-green-100 border border-primary-green-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary-green-700" />
          <span>Audit MRV Dossier in Verifier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
