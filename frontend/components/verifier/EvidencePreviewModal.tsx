"use client";

import { useState } from "react";
import {
  X,
  Copy,
  CheckCircle2,
  Download,
  FileJson,
  Lock,
} from "lucide-react";
import {
  generateMRVReport,
  downloadMRVReportJSON,
} from "@/lib/evidence-generator";

interface EvidencePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
}

export function EvidencePreviewModal({
  isOpen,
  onClose,
  onDownload,
}: EvidencePreviewModalProps) {
  const [copiedJson, setCopiedJson] = useState(false);

  const report = generateMRVReport();
  const jsonPayload = JSON.stringify(report, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonPayload);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownload = () => {
    downloadMRVReportJSON(report);
    onDownload?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#E2DFEA] rounded-2xl max-w-3xl w-full shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2DFEA] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-green-50 border border-primary-green-200">
              <FileJson className="w-5 h-5 text-[#0B4D25]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-neutral-purple-900 tracking-tight">
                  MRV Evidence Package — JSON Payload Preview
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                  {report.version}
                </span>
              </div>
              <p className="text-xs text-neutral-purple-500 mt-0.5 flex items-center gap-1">
                <Lock className="w-3 h-3 text-primary-green-700" />
                <span className="font-mono truncate max-w-xs">
                  {report.verification_hash.slice(0, 24)}…
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-purple-400 hover:text-neutral-purple-700 hover:bg-[#F8F7FA] transition-colors"
            aria-label="Close JSON preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* JSON Viewer */}
        <div className="flex-1 overflow-hidden rounded-b-none">
          <div className="bg-neutral-900 h-full overflow-auto">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
              <span className="text-xs font-mono text-neutral-400">
                CarbonTensor-Evidence-Package-Kebbi-2026.json
              </span>
              <span className="text-[11px] text-neutral-500 font-mono tabular-nums">
                {(new Blob([jsonPayload]).size / 1024).toFixed(1)} KB
              </span>
            </div>
            <pre className="text-neutral-100 font-mono text-xs leading-relaxed p-5 overflow-auto whitespace-pre-wrap break-words">
              {jsonPayload}
            </pre>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[#E2DFEA] bg-[#F8F7FA] rounded-b-2xl shrink-0">
          <button
            onClick={handleCopyJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-purple-800 bg-white hover:bg-neutral-purple-50 border border-[#E2DFEA] transition-colors"
          >
            {copiedJson ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F8851]" />
                <span>JSON Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-purple-700 hover:bg-neutral-purple-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0B4D25] hover:bg-primary-green-800 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Bundle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
