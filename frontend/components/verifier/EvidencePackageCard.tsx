"use client";

import { useState } from "react";
import {
  FileCheck,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle2,
  Leaf,
  BarChart3,
  MapPin,
  Satellite,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { generateMRVReport } from "@/lib/evidence-generator";

interface EvidencePackageCardProps {
  onPreviewClick: () => void;
  onDownloadClick: () => void;
}

export function EvidencePackageCard({
  onPreviewClick,
  onDownloadClick,
}: EvidencePackageCardProps) {
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const report = generateMRVReport();
  const { report_data: rd } = report;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(report.verification_hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div
      id="evidence-package-card"
      className="bg-white border border-[#E2DFEA] rounded-2xl shadow-xs overflow-hidden"
    >
      {/* Card Header */}
      <div className="bg-[#0B4D25] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary-green-800 border border-primary-green-600">
            <FileCheck className="w-5 h-5 text-primary-green-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-extrabold text-white tracking-tight">
                MRV Evidence Package
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-800 text-primary-green-200 border border-primary-green-600">
                Registry-Ready Evidence Package (External VVB &amp; Registry
                Review)
              </span>
            </div>
            <p className="text-xs text-primary-green-300 mt-0.5">
              Tamper-evident multi-source audit dossier · {report.version} ·{" "}
              {report.monitoring_period.start_date} →{" "}
              {report.monitoring_period.end_date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPreviewClick}
            className="px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-primary-green-800 hover:bg-primary-green-700 border border-primary-green-600 transition-colors inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Preview JSON</span>
          </button>
          <button
            onClick={onDownloadClick}
            className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#0B4D25] bg-white hover:bg-neutral-purple-50 transition-colors inline-flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#0B4D25]" />
            <span>Download Bundle</span>
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* SHA-256 Hash Strip */}
        <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-neutral-purple-600 uppercase tracking-wide block mb-1">
              SHA-256 Tamper-Evident Ledger Digest
            </span>
            <p className="font-mono text-[11px] text-neutral-purple-900 break-all select-all leading-relaxed">
              {report.verification_hash}
            </p>
          </div>
          <button
            onClick={handleCopyHash}
            className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B4D25] hover:text-primary-green-800 transition-colors"
            title="Copy SHA-256 digest"
          >
            {copiedHash ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-green-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 text-neutral-purple-500 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-green-700" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Audited Area
              </span>
            </div>
            <span className="block text-xl font-extrabold font-mono tabular-nums text-neutral-purple-900 leading-none">
              {rd.total_hectares.toFixed(2)}
            </span>
            <span className="text-[11px] text-neutral-purple-500 mt-0.5 block">
              ha · {rd.enrolled_plots_count} plots enrolled
            </span>
          </div>

          <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 text-neutral-purple-500 mb-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#0B4D25]" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Gross Avoided
              </span>
            </div>
            <span className="block text-xl font-extrabold font-mono tabular-nums text-[#0B4D25] leading-none">
              {rd.gross_avoided_tco2e_est.toFixed(2)}
            </span>
            <span className="text-[11px] text-neutral-purple-500 mt-0.5 block">
              tCO₂e (est.) gross
            </span>
          </div>

          <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 text-neutral-purple-500 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F8851]" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Verified Plots
              </span>
            </div>
            <span className="block text-xl font-extrabold font-mono tabular-nums text-neutral-purple-900 leading-none">
              {rd.verified_plots_count}/{rd.enrolled_plots_count}
            </span>
            <span className="text-[11px] text-[#3F8851] font-bold mt-0.5 block">
              {Math.round(
                (rd.verified_plots_count / rd.enrolled_plots_count) * 100
              )}
              % compliant
            </span>
          </div>

          <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 text-neutral-purple-500 mb-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-accent-orange-500" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Net Avoided
              </span>
            </div>
            <span className="block text-xl font-extrabold font-mono tabular-nums text-[#0B4D25] leading-none">
              {rd.net_avoided_tco2e_est.toFixed(2)}
            </span>
            <span className="text-[11px] text-neutral-purple-500 mt-0.5 block">
              tCO₂e (est.) net · 15% platform fee
            </span>
          </div>
        </div>

        {/* Per-plot Evidence Reference Table */}
        <div>
          <span className="text-xs font-bold text-neutral-purple-800 uppercase tracking-wide block mb-2.5">
            Evidence References — Per-Plot
          </span>
          <div className="rounded-xl border border-[#E2DFEA] overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#F8F7FA] border-b border-[#E2DFEA]">
                <tr>
                  <th className="text-left px-3.5 py-2 font-bold text-neutral-purple-700">
                    Plot
                  </th>
                  <th className="text-left px-3.5 py-2 font-bold text-neutral-purple-700">
                    Sensor
                  </th>
                  <th className="text-right px-3.5 py-2 font-bold text-neutral-purple-700">
                    Records
                  </th>
                  <th className="text-left px-3.5 py-2 font-bold text-neutral-purple-700">
                    Satellite
                  </th>
                  <th className="text-left px-3.5 py-2 font-bold text-neutral-purple-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DFEA] bg-white">
                {report.evidence_references.map((ref) => {
                  const hasFlags = ref.anomaly_flags.length > 0;
                  const satStatus = ref.satellite_cross_check?.status ?? "—";
                  const satConfidence = ref.satellite_cross_check?.confidence;
                  return (
                    <tr key={ref.plot_id} className="hover:bg-[#FAFAF9]">
                      <td className="px-3.5 py-2.5 font-mono font-bold text-primary-green-900 uppercase">
                        {ref.plot_id}
                      </td>
                      <td className="px-3.5 py-2.5 font-mono text-neutral-purple-700">
                        {ref.sensor_serial}
                      </td>
                      <td className="px-3.5 py-2.5 text-right tabular-nums font-mono text-neutral-purple-900">
                        {ref.observation_count}
                      </td>
                      <td className="px-3.5 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                            satStatus === "AGREE"
                              ? "text-[#3F8851]"
                              : satStatus === "DISAGREE"
                              ? "text-accent-orange-700"
                              : "text-neutral-purple-400"
                          }`}
                        >
                          <Satellite className="w-3 h-3" />
                          {satStatus === "AGREE"
                            ? `Agree (${((satConfidence ?? 0) * 100).toFixed(0)}%)`
                            : satStatus === "DISAGREE"
                            ? `Disagree (${((satConfidence ?? 0) * 100).toFixed(0)}%)`
                            : "No data"}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5">
                        {hasFlags ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-orange-700">
                            <AlertTriangle className="w-3 h-3" />
                            {ref.anomaly_flags.length} flag
                            {ref.anomaly_flags.length > 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F8851]">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expandable Methodology Parameters Drawer */}
        <div className="border border-[#E2DFEA] rounded-xl overflow-hidden">
          <button
            onClick={() => setMethodologyOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F7FA] hover:bg-neutral-purple-100 transition-colors text-xs font-bold text-neutral-purple-800"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary-green-700" />
              Methodology Parameters — UNFCCC AMS-III.H / Verra VM0042
            </span>
            {methodologyOpen ? (
              <ChevronUp className="w-4 h-4 text-neutral-purple-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neutral-purple-500" />
            )}
          </button>

          {methodologyOpen && (
            <div className="p-4 bg-white space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-lg p-3">
                  <span className="text-[11px] text-neutral-purple-500 block mb-1">
                    Baseline Daily Emission Factor
                  </span>
                  <span className="font-mono font-bold text-neutral-purple-900 tabular-nums">
                    {rd.baseline_daily_emission_factor} tCH₄/ha/day
                  </span>
                  <span className="text-[10px] text-neutral-purple-400 block mt-0.5">
                    Flooded paddy baseline
                  </span>
                </div>
                <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-lg p-3">
                  <span className="text-[11px] text-neutral-purple-500 block mb-1">
                    GWP₁₀₀ Methane (CH₄)
                  </span>
                  <span className="font-mono font-bold text-neutral-purple-900 tabular-nums">
                    {rd.gwp_methane}
                  </span>
                  <span className="text-[10px] text-neutral-purple-400 block mt-0.5">
                    AR6 IPCC 2023
                  </span>
                </div>
                <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-lg p-3">
                  <span className="text-[11px] text-neutral-purple-500 block mb-1">
                    Aeration Days Achieved
                  </span>
                  <span className="font-mono font-bold text-[#0B4D25] tabular-nums">
                    {rd.aeration_days_achieved} days
                  </span>
                  <span className="text-[10px] text-neutral-purple-400 block mt-0.5">
                    AWD dry-down episodes
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-purple-500 leading-relaxed border-t border-[#E2DFEA] pt-3">
                Carbon avoidance estimated under UNFCCC AMS-III.H and Verra
                VM0042 for irrigated lowland rice. All figures marked as
                tCO₂e (est.) and require independent VVB verification before
                registry submission. Satellite layer: Sentinel-1 Radar
                Cross-Check (Sample) — ESA Copernicus Track 142.
              </p>
            </div>
          )}
        </div>

        {/* Review Status Badge */}
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Review Status: {report.review_status.replace(/_/g, " ")}
          </span>
          <span className="text-[11px] text-neutral-purple-400 font-mono tabular-nums">
            Generated:{" "}
            {new Date(report.generated_at).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

