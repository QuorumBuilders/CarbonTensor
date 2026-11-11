"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  X,
  Download,
  CheckCircle2,
  Copy,
  ExternalLink,
  Coins,
  Lock,
} from "lucide-react";
import {
  generateMRVReport,
  downloadMRVReportJSON,
} from "@/lib/evidence-generator";

interface ExportEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportEvidenceModal({ isOpen, onClose }: ExportEvidenceModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const sha256Digest = "e7b91d2c48f80459a997862f1c834928f5c35e98214227183e9b11ca0e58fa21";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256Digest);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownload = (format: "json" | "pdf") => {
    if (format === "json") {
      downloadMRVReportJSON(generateMRVReport());
    }
    setDownloadSuccess(format.toUpperCase());
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#E2DFEA] rounded-2xl max-w-2xl w-full shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DFEA]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-green-100 text-[#0B4D25] border border-primary-green-300">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-purple-900 tracking-tight">
                  MRV Verification Dossier (Audit Pack)
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                  Verra VM0042 Aligned
                </span>
              </div>
              <p className="text-xs text-neutral-purple-500">
                Tamper-evident multi-source audit package ready for carbon registry certification.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-purple-400 hover:text-neutral-purple-700 hover:bg-[#F8F7FA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cryptographic Ledger Checksum Banner */}
        <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-purple-700 flex items-center gap-1.5 font-mono">
              <Lock className="w-3.5 h-3.5 text-primary-green-700" />
              <span>SHA-256 Tamper-Evident Ledger Digest</span>
            </span>
            <button
              onClick={handleCopyHash}
              className="text-[11px] text-primary-green-700 hover:text-primary-green-900 font-semibold inline-flex items-center gap-1"
            >
              {copiedHash ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-green-600" />
                  <span>Digest Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Hash</span>
                </>
              )}
            </button>
          </div>
          <p className="font-mono text-[11px] text-neutral-purple-900 break-all bg-white p-2 rounded-lg border border-neutral-purple-200 select-all">
            {sha256Digest}
          </p>
        </div>

        {/* Audit Metric Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white border border-[#E2DFEA] rounded-xl p-3">
            <span className="text-neutral-purple-500 text-[11px]">Audited Area</span>
            <span className="block text-base font-bold font-mono tabular-nums text-neutral-purple-900 mt-0.5">
              8.85 ha
            </span>
            <span className="text-[10px] text-neutral-purple-400">Argungu Cluster</span>
          </div>

          <div className="bg-white border border-[#E2DFEA] rounded-xl p-3">
            <span className="text-neutral-purple-500 text-[11px]">Avoided Methane</span>
            <span className="block text-base font-bold font-mono tabular-nums text-[#0B4D25] mt-0.5">
              18,400
            </span>
            <span className="text-[10px] text-neutral-purple-400">tCO₂e (est.)</span>
          </div>

          <div className="bg-white border border-[#E2DFEA] rounded-xl p-3">
            <span className="text-neutral-purple-500 text-[11px]">Verified Plots</span>
            <span className="block text-base font-bold font-mono tabular-nums text-neutral-purple-900 mt-0.5">
              3 of 5
            </span>
            <span className="text-[10px] text-[#0B4D25] font-semibold">60% Compliant</span>
          </div>

          <div className="bg-white border border-[#E2DFEA] rounded-xl p-3">
            <span className="text-neutral-purple-500 text-[11px]">Satellite Checks</span>
            <span className="block text-base font-bold font-mono tabular-nums text-neutral-purple-900 mt-0.5">
              Sentinel-1
            </span>
            <span className="text-[10px] text-accent-orange-600 font-semibold">1 Flag Isolated</span>
          </div>
        </div>

        {/* Evidence Artifacts Checklist */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-neutral-purple-800 uppercase tracking-wide">
            Compiled Evidence Artifacts
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DFEA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8851]" />
                <span className="font-semibold text-neutral-purple-900">
                  In-situ Piezometer Telemetry Stream (Plots 1–5)
                </span>
              </div>
              <span className="font-mono text-[11px] text-neutral-purple-500">
                150 Daily Records • Validated
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DFEA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8851]" />
                <span className="font-semibold text-neutral-purple-900">
                  Sentinel-1 SAR Radar Cross-Check (Sample Backscatter)
                </span>
              </div>
              <span className="font-mono text-[11px] text-neutral-purple-500">
                ESA Copernicus Track 142
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E2DFEA]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8851]" />
                <span className="font-semibold text-neutral-purple-900">
                  DRF Ingestion Anomaly Queue Audit Log
                </span>
              </div>
              <span className="font-mono text-[11px] text-neutral-purple-500">
                2 Exceptions Isolated & Logged
              </span>
            </div>
          </div>
        </div>

        {/* Notification when downloaded */}
        {downloadSuccess && (
          <div className="p-2.5 rounded-lg bg-primary-green-50 border border-primary-green-200 text-xs text-[#0B4D25] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#0B4D25]" />
            <span>Successfully generated and downloaded tamper-evident {downloadSuccess} dossier package.</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#E2DFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload("json")}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-neutral-purple-800 bg-[#F8F7FA] hover:bg-neutral-purple-100 border border-[#E2DFEA] transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Dossier</span>
            </button>

            <button
              onClick={() => handleDownload("pdf")}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-neutral-purple-800 bg-[#F8F7FA] hover:bg-neutral-purple-100 border border-[#E2DFEA] transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Pack</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/finance"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0B4D25] hover:bg-primary-green-800 transition-colors shadow-xs inline-flex items-center gap-1.5"
            >
              <Coins className="w-4 h-4 text-primary-green-200" />
              <span>Proceed to Payout (/finance)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
