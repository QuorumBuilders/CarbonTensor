"use client";

import { useState } from "react";
import Link from "next/link";
import { PortalShell } from "@/components/shared/PortalShell";
import {
  Coins,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  ShieldCheck,
  Landmark,
  FileCheck,
} from "lucide-react";

interface PayoutRow {
  farmerId: string;
  farmerName: string;
  phone: string;
  nin: string;
  bankAccount: string;
  plotId: string;
  areaHa: number;
  amountNgn: number;
  status: "READY" | "WITHHELD" | "HELD" | "DISBURSED";
  statusReason: string;
}

const INITIAL_PAYOUTS: PayoutRow[] = [
  {
    farmerId: "farmer-001",
    farmerName: "Aminu Bello",
    phone: "+234 802 345 6789",
    nin: "NIN-98765432101",
    bankAccount: "Access Bank •••• 6789",
    plotId: "plot-001",
    areaHa: 1.85,
    amountNgn: 102400,
    status: "READY",
    statusReason: "4 AWD cycles fully verified. 0 violations.",
  },
  {
    farmerId: "farmer-002",
    farmerName: "Fatima Usman",
    phone: "+234 803 456 7890",
    nin: "NIN-98765432102",
    bankAccount: "Access Bank •••• 7890",
    plotId: "plot-002",
    areaHa: 2.1,
    amountNgn: 116200,
    status: "READY",
    statusReason: "3 AWD cycles fully verified. 0 violations.",
  },
  {
    farmerId: "farmer-003",
    farmerName: "Sanusi Garba",
    phone: "+234 805 567 8901",
    nin: "VTR-10293847503",
    bankAccount: "Access Bank •••• 8901",
    plotId: "plot-003",
    areaHa: 1.4,
    amountNgn: 0,
    status: "WITHHELD",
    statusReason: "Continuous flooding violation > 21 days.",
  },
  {
    farmerId: "farmer-004",
    farmerName: "Balarabe Yusuf",
    phone: "+234 807 678 9012",
    nin: "NIN-98765432104",
    bankAccount: "Access Bank •••• 9012",
    plotId: "plot-004",
    areaHa: 1.7,
    amountNgn: 0,
    status: "HELD",
    statusReason: "Hardware anomaly (-82.0cm) pending field audit.",
  },
  {
    farmerId: "farmer-005",
    farmerName: "Zainab Aliyu",
    phone: "+234 809 789 0123",
    nin: "NIN-98765432105",
    bankAccount: "Access Bank •••• 0123",
    plotId: "plot-005",
    areaHa: 1.8,
    amountNgn: 99600,
    status: "READY",
    statusReason: "Field verifier cleared sensor vs Sentinel-1 dispute.",
  },
];

export default function FinancePage() {
  const [payouts, setPayouts] = useState<PayoutRow[]>(INITIAL_PAYOUTS);
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [disbursedSuccess, setDisbursedSuccess] = useState(false);

  const totalPayable = payouts
    .filter((p) => p.status === "READY" || p.status === "DISBURSED")
    .reduce((sum, p) => sum + p.amountNgn, 0);

  const handleExecuteDisbursement = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      setPayouts((prev) =>
        prev.map((p) => (p.status === "READY" ? { ...p, status: "DISBURSED" } : p))
      );
      setIsDisbursing(false);
      setDisbursedSuccess(true);
    }, 1200);
  };

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
              Smallholder Carbon Dividend Disbursement
            </h1>
            <p className="text-xs sm:text-sm text-neutral-purple-600 max-w-3xl">
              Automated 70% revenue share distribution directly into smallholder bank accounts via Access Bank Sandbox. Dividends are strictly conditioned on verified AWD aeration compliance.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/verifier"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-purple-700 bg-[#F8F7FA] hover:bg-neutral-purple-100 border border-[#E2DFEA] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-primary-green-700" />
              <span>Audit Verifier Dossier</span>
            </Link>

            <button
              onClick={handleExecuteDisbursement}
              disabled={isDisbursing || disbursedSuccess}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0B4D25] hover:bg-primary-green-800 disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4 text-primary-green-200" />
              <span>{isDisbursing ? "Disbursing..." : disbursedSuccess ? "Disbursed Successfully" : "Execute Batch Payout"}</span>
            </button>
          </div>
        </div>

        {/* Success Transaction Confirmation Banner */}
        {disbursedSuccess && (
          <div className="bg-[#EAF3ED] border border-primary-green-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#0B4D25] animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-primary-green-700 shrink-0" />
              <div>
                <span className="font-bold text-sm block">
                  Simulated Batch Payout Completed Successfully
                </span>
                <span className="text-[11px] text-neutral-purple-600">
                  Transaction Reference: <strong>TXN-ACC-KEBBI-2026-098231</strong> • Access Bank Sandbox API (Simulated)
                </span>
              </div>
            </div>
            <span className="font-mono font-bold text-base tabular-nums">
              ₦{totalPayable.toLocaleString()} NGN
            </span>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-neutral-purple-600">
                Audited Carbon Pool
              </span>
              <div className="p-2 rounded-xl bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900 mt-1">
              18,400 <span className="text-sm font-normal text-neutral-purple-500">tCO₂e (est.)</span>
            </div>
            <p className="text-[11px] text-neutral-purple-500 mt-1">
              Argungu Cluster 2026 Verified
            </p>
          </div>

          <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-neutral-purple-600">
                Gross Carbon Value
              </span>
              <div className="p-2 rounded-xl bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900 mt-1">
              ₦454,570 <span className="text-sm font-normal text-neutral-purple-500">NGN (Sim.)</span>
            </div>
            <p className="text-[11px] text-neutral-purple-500 mt-1">
              Simulated voluntary carbon credit pool
            </p>
          </div>

          <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-neutral-purple-600">
                Smallholder 70% Share
              </span>
              <div className="p-2 rounded-xl bg-[#EAF3ED] text-[#0B4D25] border border-primary-green-200">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-[#0B4D25] mt-1">
              ₦{totalPayable.toLocaleString()} <span className="text-sm font-normal text-neutral-purple-500">NGN (Sim.)</span>
            </div>
            <p className="text-[11px] text-neutral-purple-500 mt-1">
              Eligible compliant smallholders
            </p>
          </div>

          <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-neutral-purple-600">
                Withheld Non-Compliant
              </span>
              <div className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-200">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-red-700 mt-1">
              2 Plots <span className="text-sm font-normal text-neutral-purple-500">Withheld</span>
            </div>
            <p className="text-[11px] text-neutral-purple-500 mt-1">
              Plot 3 (Flooding) & Plot 4 (Fault)
            </p>
          </div>
        </div>

        {/* Smallholder Payout Roster Table */}
        <div className="bg-white border border-[#E2DFEA] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E2DFEA] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-purple-900 tracking-tight">
                Farmer Carbon Dividend Ledger
              </h2>
              <p className="text-xs text-neutral-purple-600 mt-0.5">
                Direct settlement roster mapped to National Identity Number (NIN) and verified Access Bank accounts.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
              Access Bank Sandbox (Simulated)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-purple-800">
              <thead className="bg-[#F8F7FA] border-b border-[#E2DFEA] text-[11px] font-bold text-neutral-purple-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Farmer & NIN</th>
                  <th className="py-3 px-4">Target Plot</th>
                  <th className="py-3 px-4">Hectares</th>
                  <th className="py-3 px-4">Bank Account</th>
                  <th className="py-3 px-4">Net Dividend</th>
                  <th className="py-3 px-4">Compliance Status</th>
                  <th className="py-3 px-4 text-right">Disbursement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-purple-100">
                {payouts.map((row) => {
                  const isWithheld = row.status === "WITHHELD";
                  const isHeld = row.status === "HELD";
                  const isDisbursed = row.status === "DISBURSED";

                  return (
                    <tr key={row.farmerId} className="hover:bg-[#F8F7FA]/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-purple-900">
                          {row.farmerName}
                        </div>
                        <div className="text-[11px] text-neutral-purple-500 font-mono">
                          {row.nin}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#0B4D25]">
                        {row.plotId}
                      </td>

                      <td className="py-3.5 px-4 font-mono tabular-nums font-semibold">
                        {row.areaHa.toFixed(2)} ha
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-purple-700">
                        {row.bankAccount}
                      </td>

                      <td className="py-3.5 px-4 font-mono tabular-nums font-bold text-sm">
                        {row.amountNgn > 0 ? (
                          <span className="text-[#0B4D25]">
                            ₦{row.amountNgn.toLocaleString()} NGN
                          </span>
                        ) : (
                          <span className="text-neutral-purple-400">₦0 NGN</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="text-[11px] text-neutral-purple-700 leading-tight">
                          {row.statusReason}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {isDisbursed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EAF3ED] text-[#0B4D25] border border-primary-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Paid (Simulated)</span>
                          </span>
                        ) : isWithheld ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Withheld</span>
                          </span>
                        ) : isHeld ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Triage Hold</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Ready to Pay</span>
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
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

