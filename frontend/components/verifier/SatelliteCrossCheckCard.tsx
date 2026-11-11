"use client";

import { useState } from "react";
import {
  Satellite,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

interface ComparisonPlotData {
  plotId: string;
  farmName: string;
  farmerName: string;
  satellitePassDate: string;
  sarObservationId: string;
  orbit: string;
  sensorDepth: number;
  sensorState: "DRY" | "WET";
  radarState: "DRY" | "WET";
  status: "AGREE" | "DISAGREE";
  confidence: number;
  backscatterDb: string;
  polarization: string;
  diagnosis: string;
}

const COMPARISON_PLOTS: ComparisonPlotData[] = [
  {
    plotId: "plot-005",
    farmName: "Argungu Rice Basin Parcel C1",
    farmerName: "Zainab Aliyu",
    satellitePassDate: "2026-10-28T06:12:00Z",
    sarObservationId: "SAR-S1A-20261028-KB05",
    orbit: "Descending Track 142",
    sensorDepth: -11.5,
    sensorState: "DRY",
    radarState: "WET",
    status: "DISAGREE",
    confidence: 87.4,
    backscatterDb: "-11.2 dB (High Specular)",
    polarization: "VV / VH Dual-Pol",
    diagnosis:
      "Contradiction detected: Ground tube logs aerated dry-down (-11.5 cm), but Sentinel-1 C-band SAR backscatter shows specular reflection indicative of open standing water or surface saturated mud.",
  },
  {
    plotId: "plot-001",
    farmName: "Argungu Rice Basin Parcel A1",
    farmerName: "Aminu Bello",
    satellitePassDate: "2026-10-28T06:12:00Z",
    sarObservationId: "SAR-S1A-20261028-KB01",
    orbit: "Descending Track 142",
    sensorDepth: -12.0,
    sensorState: "DRY",
    radarState: "DRY",
    status: "AGREE",
    confidence: 92.1,
    backscatterDb: "-17.8 dB (Rough Diffuse)",
    polarization: "VV / VH Dual-Pol",
    diagnosis:
      "Full concordance: Ground sensor confirms aerobic drying (-12.0 cm) and Sentinel-1 SAR diffuse volume backscatter confirms non-flooded soil surface.",
  },
];

export function SatelliteCrossCheckCard() {
  const [activePlotIndex, setActivePlotIndex] = useState<number>(0);
  const activePlot = COMPARISON_PLOTS[activePlotIndex];

  return (
    <div
      id="satellite-crosscheck"
      className="bg-white border border-[#E2DFEA] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col space-y-5"
    >
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2DFEA]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-accent-orange-50 text-[#F15A24] border border-accent-orange-200">
              <Satellite className="w-4 h-4 text-[#F15A24]" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-purple-900 tracking-tight">
              Satellite Cross-Check (Sentinel-1 Sample)
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
              Copernicus SAR
            </span>
          </div>
          <p className="text-xs text-neutral-purple-600 max-w-3xl">
            Synthetic Aperture Radar (SAR) backscatter analysis compared against ground sensor aeration telemetry. Radar serves as an independent secondary check.
          </p>
        </div>

        {/* Comparison Plot Toggle Buttons */}
        <div className="flex items-center gap-1.5 bg-[#F8F7FA] p-1 rounded-xl border border-[#E2DFEA] shrink-0">
          {COMPARISON_PLOTS.map((plot, idx) => {
            const isSelected = idx === activePlotIndex;
            const isDiscrepant = plot.status === "DISAGREE";
            return (
              <button
                key={plot.plotId}
                onClick={() => setActivePlotIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#0B4D25] text-white font-bold shadow-xs"
                    : "text-neutral-purple-700 hover:text-neutral-purple-900"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isDiscrepant ? "bg-accent-orange-500" : "bg-[#3F8851]"
                  }`}
                />
                <span>{plot.plotId}</span>
                <span className="text-[10px] opacity-80">({plot.status})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual-Timeline Comparison Widget */}
      <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-4 sm:p-5 space-y-4">
        {/* Pass Metadata Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2DFEA] text-xs">
          <div>
            <span className="font-bold text-neutral-purple-900 text-sm">
              {activePlot.plotId.toUpperCase()} • {activePlot.farmName}
            </span>
            <span className="text-neutral-purple-500 ml-2 font-mono text-[11px]">
              Farmer: {activePlot.farmerName}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-purple-600">
            <span>Pass: {new Date(activePlot.satellitePassDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} 06:12 UTC</span>
            <span>•</span>
            <span className="text-neutral-purple-500">{activePlot.orbit}</span>
          </div>
        </div>

        {/* Side-by-Side Dual-Track Telemetry vs Satellite View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Track 1: Ground In-Situ Piezometer Sensor */}
          <div className="bg-white border border-[#E2DFEA] rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-purple-700 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#3F8851]" />
                <span>Ground In-Situ Telemetry</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EAF3ED] text-[#0B4D25] border border-primary-green-200">
                Piezometer Tube
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900">
                  {activePlot.sensorDepth > 0 ? "+" : ""}
                  {activePlot.sensorDepth.toFixed(1)} cm
                </span>
                <p className="text-[11px] text-neutral-purple-500 mt-0.5">
                  Relative to 0 cm soil surface
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-[#EAF3ED] text-[#0B4D25] border border-primary-green-200">
                  State: {activePlot.sensorState}
                </span>
                <p className="text-[10px] text-neutral-purple-400 mt-1">
                  Safe Aerobic Zone
                </p>
              </div>
            </div>

            {/* Visual Depth Bar */}
            <div className="pt-1">
              <div className="w-full bg-neutral-purple-100 rounded-full h-2 relative overflow-hidden">
                <div
                  className="bg-[#3F8851] h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(10, ((activePlot.sensorDepth + 20) / 30) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-purple-400 font-mono mt-1">
                <span>-20 cm (Dry)</span>
                <span>0 cm (Soil)</span>
                <span>+10 cm (Wet)</span>
              </div>
            </div>
          </div>

          {/* Track 2: Sentinel-1 SAR Radar Observation */}
          <div className="bg-white border border-[#E2DFEA] rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-purple-700 flex items-center gap-1.5">
                <Satellite className="w-4 h-4 text-accent-orange-500" />
                <span>Sentinel-1 SAR Radar Pass</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-accent-orange-50 text-accent-orange-700 border border-accent-orange-200">
                Sample C-Band SAR
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xl font-bold font-mono text-neutral-purple-900">
                  {activePlot.backscatterDb}
                </span>
                <p className="text-[11px] text-neutral-purple-500 mt-0.5">
                  {activePlot.polarization}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-mono font-bold px-2 py-1 rounded-md border ${
                    activePlot.radarState === "WET"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-[#EAF3ED] text-[#0B4D25] border-primary-green-200"
                  }`}
                >
                  State: {activePlot.radarState}
                </span>
                <p className="text-[10px] text-neutral-purple-400 mt-1">
                  Confidence: {activePlot.confidence}%
                </p>
              </div>
            </div>

            {/* Visual Confidence Bar */}
            <div className="pt-1">
              <div className="w-full bg-neutral-purple-100 rounded-full h-2 relative overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all ${
                    activePlot.status === "DISAGREE"
                      ? "bg-accent-orange-500"
                      : "bg-[#3F8851]"
                  }`}
                  style={{ width: `${activePlot.confidence}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-purple-400 font-mono mt-1">
                <span>0% Conf</span>
                <span>{activePlot.confidence}% Backscatter Confidence</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Verdict & Automated Assessment */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E2DFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div
              className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                activePlot.status === "AGREE"
                  ? "bg-primary-green-100 text-[#0B4D25]"
                  : "bg-accent-orange-100 text-accent-orange-700"
              }`}
            >
              {activePlot.status === "AGREE" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-purple-900">
                  Cross-Check Result:
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${
                    activePlot.status === "AGREE"
                      ? "bg-[#EAF3ED] text-[#0B4D25] border-primary-green-300"
                      : "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-300"
                  }`}
                >
                  {activePlot.status} ({activePlot.confidence}% Confidence)
                </span>
              </div>
              <p className="text-xs text-neutral-purple-700 mt-1 leading-relaxed">
                {activePlot.diagnosis}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
            <span className="text-[10px] font-mono text-neutral-purple-400">
              Ref: {activePlot.sarObservationId}
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Ground Truth & Remote Sensing Scientific Notice */}
      <div className="p-3.5 rounded-xl bg-[#F8F7FA] border border-[#E2DFEA] flex items-start gap-2.5 text-xs text-neutral-purple-700">
        <Info className="w-4 h-4 text-primary-green-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-neutral-purple-900">
            Methodology Notice & Ground Truth Limitation:
          </span>
          <p className="leading-relaxed text-neutral-purple-600">
            Sample comparison based on pre-processed Sentinel-1 SAR data. Radar backscatter is an independent macro cross-check and does not claim direct sub-canopy water depth measurement.
          </p>
        </div>
      </div>
    </div>
  );
}
