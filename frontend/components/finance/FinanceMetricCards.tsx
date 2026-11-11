"use client";

import {
  Landmark,
  Users,
  Building2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface FinanceMetricCardsProps {
  totalInflowUsd?: number;
  totalInflowNgn?: number;
  isSettled?: boolean;
}

export function FinanceMetricCards({
  totalInflowUsd = 10000,
  totalInflowNgn = 16000000,
  isSettled = false,
}: FinanceMetricCardsProps) {
  const farmerPoolUsd = totalInflowUsd * 0.7;
  const farmerPoolNgn = totalInflowNgn * 0.7;

  const coopCommissionUsd = totalInflowUsd * 0.15;
  const coopCommissionNgn = totalInflowNgn * 0.15;

  const platformReserveUsd = totalInflowUsd * 0.15;
  const platformReserveNgn = totalInflowNgn * 0.15;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Simulated Buyer Inflow */}
      <div className="bg-white border border-neutral-purple-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-neutral-purple-600">
              Simulated Buyer Inflow
            </span>
            <div className="p-2 rounded-xl bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900 mt-1">
            ${totalInflowUsd.toLocaleString()}{" "}
            <span className="text-sm font-normal text-neutral-purple-500">
              USD
            </span>
          </div>
          <div className="text-xs text-neutral-purple-500 font-mono tabular-nums mt-0.5">
            ≈ ₦{totalInflowNgn.toLocaleString()} NGN (est.)
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-purple-100 flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
            Access Bank Sandbox (Simulated)
          </span>
          <span className="text-[11px] font-semibold text-[#0B4D25] flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>Offtaker Escrow</span>
          </span>
        </div>
      </div>

      {/* Card 2: Smallholder Farmer Pool */}
      <div className="bg-white border border-neutral-purple-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-neutral-purple-600">
              Smallholder Farmer Pool
            </span>
            <div className="p-2 rounded-xl bg-primary-green-100 text-[#0B4D25] border border-primary-green-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0B4D25] mt-1">
            ${farmerPoolUsd.toLocaleString()}{" "}
            <span className="text-sm font-normal text-neutral-purple-500">
              USD
            </span>
          </div>
          <div className="text-xs text-neutral-purple-500 font-mono tabular-nums mt-0.5">
            ≈ ₦{farmerPoolNgn.toLocaleString()} NGN
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-purple-100 flex items-center justify-between">
          <span className="text-[11px] text-neutral-purple-500">
            Proposed Allocation (est.)
          </span>
          <span className="text-xs font-mono font-bold text-[#0B4D25] bg-primary-green-50 px-2 py-0.5 rounded-md border border-primary-green-200">
            70% Direct
          </span>
        </div>
      </div>

      {/* Card 3: Cooperative Commission */}
      <div className="bg-white border border-neutral-purple-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-neutral-purple-600">
              Cooperative Commission
            </span>
            <div className="p-2 rounded-xl bg-primary-green-50 text-[#3F8851] border border-primary-green-200">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900 mt-1">
            ${coopCommissionUsd.toLocaleString()}{" "}
            <span className="text-sm font-normal text-neutral-purple-500">
              USD
            </span>
          </div>
          <div className="text-xs text-neutral-purple-500 font-mono tabular-nums mt-0.5">
            ≈ ₦{coopCommissionNgn.toLocaleString()} NGN
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-purple-100 flex items-center justify-between">
          <span className="text-[11px] text-neutral-purple-500">
            Union Fee (est.)
          </span>
          <span className="text-xs font-mono font-bold text-[#3F8851] bg-[#F8F7FA] px-2 py-0.5 rounded-md border border-neutral-purple-200">
            15% Union
          </span>
        </div>
      </div>

      {/* Card 4: MRV & Platform Reserve */}
      <div className="bg-white border border-neutral-purple-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-neutral-purple-600">
              MRV &amp; Platform Reserve
            </span>
            <div className="p-2 rounded-xl bg-neutral-purple-100 text-neutral-purple-700 border border-neutral-purple-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-purple-900 mt-1">
            ${platformReserveUsd.toLocaleString()}{" "}
            <span className="text-sm font-normal text-neutral-purple-500">
              USD
            </span>
          </div>
          <div className="text-xs text-neutral-purple-500 font-mono tabular-nums mt-0.5">
            ≈ ₦{platformReserveNgn.toLocaleString()} NGN
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-purple-100 flex items-center justify-between">
          <span className="text-[11px] text-neutral-purple-500">
            Audit &amp; Ops (est.)
          </span>
          <span className="text-xs font-mono font-bold text-neutral-purple-700 bg-[#F8F7FA] px-2 py-0.5 rounded-md border border-neutral-purple-200">
            {isSettled ? "15% Retained" : "15% Allocated"}
          </span>
        </div>
      </div>
    </div>
  );
}
