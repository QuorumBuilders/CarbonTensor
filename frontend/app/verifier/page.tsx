"use client";

import Link from "next/link";
import { PortalShell } from "@/components/shared/PortalShell";
import { VerifierMetricCards } from "@/components/verifier/VerifierMetricCards";
import { AnomalyQueueTable } from "@/components/verifier/AnomalyQueueTable";
import { SatelliteCrossCheckCard } from "@/components/verifier/SatelliteCrossCheckCard";
import {
  ShieldCheck,
  Building2,
  Calendar,
  FileCheck,
  Coins,
  Satellite,
  ArrowRight,
} from "lucide-react";

export default function VerifierPortalPage() {
  return (
    <PortalShell
      roleBadge="Field Verifier"
      cooperativeName="Kebbi Green Rice Growers Union"
    >
      <div className="space-y-6">
        {/* Verifier Portal Header Banner */}
        <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-green-700" />
                <span>Auditor Portal • ISO 14064-2 Aligned</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-purple-500 font-medium">
                <Building2 className="w-3.5 h-3.5 text-neutral-purple-400" />
                <span>Kebbi State Cluster • Argungu Rima Basin</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-purple-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-purple-400" />
                <span>2026 Wet Season MRV Cycle</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-purple-900">
              Independent Verifier MRV Audit Portal
            </h1>
            <p className="text-xs sm:text-sm text-neutral-purple-600 max-w-3xl">
              Independent multi-source MRV audit ledger verifying smallholder Alternate Wetting and Drying (AWD) compliance. Evaluating in-situ piezometer aeration against Sentinel-1 Synthetic Aperture Radar (SAR) macro observations before carbon bonus disbursement.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-purple-700 bg-[#F8F7FA] hover:bg-neutral-purple-100 border border-[#E2DFEA] transition-colors"
            >
              <span>Coop Dashboard</span>
            </Link>

            <Link
              href="/finance"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0B4D25] hover:bg-primary-green-800 transition-colors shadow-xs"
            >
              <Coins className="w-4 h-4 text-primary-green-200" />
              <span>Review Payout Pool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Section 1: Executive Anomaly & Audit Metric Cards */}
        <VerifierMetricCards />

        {/* Section 2: MRV Anomaly Flag Queue (DRF Ingestion Rejections) */}
        <section aria-label="MRV Anomaly Flag Queue">
          <AnomalyQueueTable />
        </section>

        {/* Section 3: Sentinel-1 SAR Radar Cross-Check Dual-Timeline Component */}
        <section aria-label="Remote Sensing Sentinel-1 Radar Cross-Check">
          <SatelliteCrossCheckCard />
        </section>

        {/* Methodology Standards Ledger Footnote */}
        <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-purple-600">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-primary-green-700 shrink-0" />
            <span>
              Carbon credit baseline calculated under <strong>UNFCCC AMS-III.H</strong> & <strong>Verra VM0042</strong> methodology guidelines for flooded rice systems.
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] shrink-0 text-neutral-purple-500">
            <Satellite className="w-3.5 h-3.5 text-accent-orange-500" />
            <span>Sentinel-1 Radar Cross-Check (Sample)</span>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

