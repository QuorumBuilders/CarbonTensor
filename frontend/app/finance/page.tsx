"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PortalShell } from "@/components/shared/PortalShell";
import { FinanceMetricCards } from "@/components/finance/FinanceMetricCards";
import { SplitVisualizer } from "@/components/finance/SplitVisualizer";
import { PaymentsLedgerTable } from "@/components/finance/PaymentsLedgerTable";
import { TriggerPayoutModal } from "@/components/finance/TriggerPayoutModal";
import {
  Landmark,
  Building2,
  Calendar,
  ShieldCheck,
  Send,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function FinancePage() {
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const handleOpenPayout = () => {
      setIsPayoutModalOpen(true);
    };

    const handlePayoutDisbursed = () => {
      setIsSettled(true);
    };

    window.addEventListener("carbontensor:open-payout-modal", handleOpenPayout);
    window.addEventListener("carbontensor:payout-disbursed", handlePayoutDisbursed);

    return () => {
      window.removeEventListener("carbontensor:open-payout-modal", handleOpenPayout);
      window.removeEventListener("carbontensor:payout-disbursed", handlePayoutDisbursed);
    };
  }, []);

  return (
    <PortalShell
      roleBadge="Disbursement Officer"
      cooperativeName="Kebbi Green Rice Growers Union"
    >
      <div className="space-y-6">
        {/* Finance Header Banner */}
        <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                <Landmark className="w-3.5 h-3.5 text-primary-green-700" />
                <span>Access Bank Sandbox (Simulated)</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-purple-500 font-medium">
                <Building2 className="w-3.5 h-3.5 text-neutral-purple-400" />
                <span>Argungu Cluster Branch • Account #0192847120</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-purple-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-purple-400" />
                <span>2026 Wet Season Carbon Dividend</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-purple-900">
              Smallholder Carbon Dividend Disbursement Portal
            </h1>
            <p className="text-xs sm:text-sm text-neutral-purple-600 max-w-3xl">
              Automated 70/15/15 revenue share settlement directly into smallholder bank accounts via Access Bank Sandbox. Carbon bonuses are strictly conditioned on verified AWD aeration compliance.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#F15A24] hover:bg-[#CE4312] transition-colors shadow-xs"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Simulate Buyer Settlement</span>
            </button>

            <Link
              href="/verifier"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-purple-700 bg-[#F8F7FA] hover:bg-neutral-purple-100 border border-[#E2DFEA] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-primary-green-700" />
              <span>Audit Verifier Dossier</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-purple-700 bg-[#F8F7FA] hover:bg-neutral-purple-100 border border-[#E2DFEA] transition-colors"
            >
              <span>Coop Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Section 1: Financial Metrics Summary Cards */}
        <section aria-label="Financial Metrics Summary">
          <FinanceMetricCards isSettled={isSettled} />
        </section>

        {/* Section 2: 70/15/15 Revenue Split Visualizer */}
        <section aria-label="Revenue Split Model Visualizer">
          <SplitVisualizer isTriggered={isSettled} />
        </section>

        {/* Section 3: Access Bank Sandbox Payments Ledger Table */}
        <section aria-label="Access Bank Sandbox Payments Ledger">
          <PaymentsLedgerTable />
        </section>

        {/* Banking Simulation Footer Note */}
        <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-purple-600">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-primary-green-700 shrink-0" />
            <span>
              All transactions executed on <strong>Access Bank Sandbox (Simulated)</strong> testnet environment. No actual fiat or cryptocurrency transfers occur.
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] shrink-0 text-neutral-purple-500">
            <span>Protocol: Smallholder 70% Direct Pass-Through</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Simulated Carbon Buyer Payment Execution Trigger Modal */}
      <TriggerPayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        onSettlementComplete={() => setIsSettled(true)}
      />
    </PortalShell>
  );
}
