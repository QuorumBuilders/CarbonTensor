"use client";

import { useState, useEffect } from "react";
import { TableSkeleton, TableEmptyState } from "@/components/shared/TableSkeleton";
import {
  Landmark,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Building2,
  ShieldCheck,
  Search,
} from "lucide-react";
import type { Payment } from "@/types";
import { MOCK_PAYMENTS } from "@/lib/mock-data";

interface PaymentsLedgerTableProps {
  initialPayments?: Payment[];
  onDisbursementComplete?: () => void;
}

export function PaymentsLedgerTable({
  initialPayments = MOCK_PAYMENTS,
}: PaymentsLedgerTableProps) {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [filter, setFilter] = useState<"ALL" | "farmer" | "cooperative">("ALL");
  const [search, setSearch] = useState("");
  const [isRefetching, setIsRefetching] = useState(false);
  const [recentlyUpdatedIds, setRecentlyUpdatedIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const handleDisbursed = (event: Event) => {
      const customEvent = event as CustomEvent<{ payments?: Payment[] }>;
      if (customEvent.detail?.payments) {
        const updatedList = customEvent.detail.payments;
        const newCompletedIds = new Set<string>();

        updatedList.forEach((p) => {
          if (p.status === "COMPLETED" || p.status === "SIMULATED_SUCCESS") {
            newCompletedIds.add(p.id);
          }
        });

        setPayments([...updatedList]);
        setRecentlyUpdatedIds(newCompletedIds);

        // Remove flash highlight after 1200ms
        setTimeout(() => {
          setRecentlyUpdatedIds(new Set());
        }, 1200);
      } else {
        // Fallback: transition all pending to completed
        const now = new Date().toISOString();
        const updatedIds = new Set<string>();

        setPayments((prev) =>
          prev.map((p) => {
            if (p.status === "PENDING") {
              updatedIds.add(p.id);
              return {
                ...p,
                status: "COMPLETED",
                completed_at: now,
              };
            }
            return p;
          })
        );

        setRecentlyUpdatedIds(updatedIds);
        setTimeout(() => {
          setRecentlyUpdatedIds(new Set());
        }, 1200);
      }
    };

    window.addEventListener("carbontensor:payout-disbursed", handleDisbursed);
    return () => {
      window.removeEventListener("carbontensor:payout-disbursed", handleDisbursed);
    };
  }, []);

  const handleFilterChange = (newFilter: "ALL" | "farmer" | "cooperative") => {
    setIsRefetching(true);
    setFilter(newFilter);
    setTimeout(() => setIsRefetching(false), 200);
  };

  const filteredPayments = payments.filter((p) => {
    const matchesRole = filter === "ALL" || p.beneficiary_type === filter;
    const matchesSearch =
      search === "" ||
      p.beneficiary_name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.account_number.includes(search);
    return matchesRole && matchesSearch;
  });

  return (
    <div
      id="payments-ledger-table"
      className="bg-white border border-neutral-purple-200 rounded-2xl shadow-xs overflow-hidden"
    >
      {/* Table Header Strip */}
      <div className="p-4 sm:p-5 border-b border-neutral-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-neutral-purple-900 tracking-tight">
              Access Bank Sandbox Settlement Ledger
            </h2>
          </div>
          <p className="text-xs text-neutral-purple-600 mt-0.5">
            Real-time multi-party disbursement ledger mapped to Access Bank account coordinates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-[#F8F7FA] p-1 rounded-lg border border-neutral-purple-200 text-xs">
            <button
              type="button"
              onClick={() => handleFilterChange("ALL")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                filter === "ALL"
                  ? "bg-[#0B4D25] text-white shadow-2xs"
                  : "text-neutral-purple-600 hover:text-neutral-purple-900"
              }`}
            >
              All ({payments.length})
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange("farmer")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                filter === "farmer"
                  ? "bg-[#0B4D25] text-white shadow-2xs"
                  : "text-neutral-purple-600 hover:text-neutral-purple-900"
              }`}
            >
              Farmers (70%)
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange("cooperative")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                filter === "cooperative"
                  ? "bg-[#0B4D25] text-white shadow-2xs"
                  : "text-neutral-purple-600 hover:text-neutral-purple-900"
              }`}
            >
              Cooperative & MRV
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-purple-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search beneficiary..."
              className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 placeholder:text-neutral-purple-400 focus:outline-hidden focus:border-[#0B4D25] w-36 sm:w-44"
            />
          </div>

          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200 flex items-center gap-1">
            <Landmark className="w-3 h-3" />
            <span>Sandbox</span>
          </span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-purple-800">
          <thead className="bg-[#F8F7FA] border-b border-neutral-purple-200 text-[11px] font-bold text-neutral-purple-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Beneficiary Name</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Account Details</th>
              <th className="py-3 px-4">Gross Amount</th>
              <th className="py-3 px-4">Provider Ref</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-purple-100">
            {isRefetching ? (
              <TableSkeleton rows={4} columns={8} />
            ) : filteredPayments.length === 0 ? (
              <TableEmptyState
                colSpan={8}
                icon={Search}
                title="No settlement transactions matching filter"
                description="No Access Bank sandbox payments match your current query or category filter."
                resetAction={() => {
                  setSearch("");
                  setFilter("ALL");
                }}
                resetLabel="Reset Ledger Filter"
              />
            ) : (
              filteredPayments.map((row) => {
              const isCompleted =
                row.status === "COMPLETED" || row.status === "SIMULATED_SUCCESS";
              const isPending = row.status === "PENDING";
              const isFailed = row.status === "FAILED";
              const isHighlighted = recentlyUpdatedIds.has(row.id);

              return (
                <tr
                  key={row.id}
                  className={`transition-colors duration-500 ${
                    isHighlighted
                      ? "bg-[#C9E2D2]/60 animate-in fade-in"
                      : "hover:bg-[#F8F7FA]/70"
                  }`}
                >
                  {/* Transaction ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-primary-green-900 text-xs">
                    {row.id}
                  </td>

                  {/* Beneficiary Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-neutral-purple-900">
                      {row.beneficiary_name}
                    </div>
                    <div className="text-[10px] text-neutral-purple-400 font-mono">
                      {row.beneficiary_id}
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-purple-700">
                      {row.beneficiary_type === "farmer" ? (
                        <>
                          <User className="w-3 h-3 text-[#0B4D25]" />
                          <span>Farmer</span>
                        </>
                      ) : row.beneficiary_id.includes("mrv") ? (
                        <>
                          <ShieldCheck className="w-3 h-3 text-neutral-purple-500" />
                          <span>MRV Platform</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="w-3 h-3 text-[#3F8851]" />
                          <span>Cooperative</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Account Details */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-purple-700">
                    <div className="font-semibold">{row.bank_name}</div>
                    <div className="text-neutral-purple-400">{row.account_number}</div>
                  </td>

                  {/* Gross Amount */}
                  <td className="py-3.5 px-4 font-mono tabular-nums">
                    <div className="font-bold text-sm text-[#0B4D25]">
                      ${row.amount.toLocaleString()} USD
                    </div>
                    <div className="text-[11px] text-neutral-purple-500">
                      ≈ ₦{(row.amount_ngn ?? row.amount * 1600).toLocaleString()} NGN
                    </div>
                  </td>

                  {/* Provider Ref */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-purple-600 select-all">
                    {row.provider_reference}
                  </td>

                  {/* Status Pill */}
                  <td className="py-3.5 px-4">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EAF3ED] text-[#0B4D25] border border-primary-green-200">
                        <CheckCircle2 className="w-3 h-3 text-[#0B4D25]" />
                        <span>COMPLETED</span>
                      </span>
                    ) : isPending ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FDF5E6] text-[#7A4D05] border border-amber-300">
                        <Clock className="w-3 h-3 text-[#7A4D05]" />
                        <span>PENDING</span>
                      </span>
                    ) : isFailed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <AlertCircle className="w-3 h-3" />
                        <span>FAILED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-purple-100 text-neutral-purple-700">
                        <span>{row.status}</span>
                      </span>
                    )}
                  </td>

                  {/* Timestamp */}
                  <td className="py-3.5 px-4 text-right font-mono text-[11px] text-neutral-purple-500 tabular-nums">
                    {row.completed_at ? (
                      <div>
                        <span>
                          {new Date(row.completed_at).toISOString().slice(0, 10)}
                        </span>
                        <div className="text-[10px] text-primary-green-700 font-semibold">
                          Settled
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span>
                          {new Date(row.initiated_at).toISOString().slice(0, 10)}
                        </span>
                        <div className="text-[10px] text-[#7A4D05] font-semibold">
                          Initiated
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-3.5 bg-[#F8F7FA] border-t border-neutral-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-purple-600">
        <span className="font-mono text-[11px]">
          Showing {payments.length} batch ledger records • ISO 20022 clearing simulator
        </span>
        <div className="flex items-center gap-4 font-mono font-bold text-xs tabular-nums text-neutral-purple-900">
          <span>
            Total Settled: $
            {payments
              .filter((p) => p.status === "COMPLETED" || p.status === "SIMULATED_SUCCESS")
              .reduce((sum, p) => sum + p.amount, 0)
              .toLocaleString()}{" "}
            USD
          </span>
        </div>
      </div>
    </div>
  );
}

