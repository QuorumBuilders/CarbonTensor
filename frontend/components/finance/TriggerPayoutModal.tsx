"use client";

import { useState } from "react";
import {
  X,
  Landmark,
  Building2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { disburseBatchPayments } from "@/lib/api/endpoints";

interface TriggerPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettlementComplete?: () => void;
}

type TransitStep = "idle" | "authorizing" | "calculating" | "disbursing" | "completed";

export function TriggerPayoutModal({
  isOpen,
  onClose,
  onSettlementComplete,
}: TriggerPayoutModalProps) {
  const [step, setStep] = useState<TransitStep>("idle");

  if (!isOpen) return null;

  const handleExecuteSettlement = async () => {
    setStep("authorizing");

    // Stage 1: Authorizing off-taker wire transfer (250ms)
    setTimeout(() => {
      setStep("calculating");

      // Stage 2: Calculating 70/15/15 smart contract split (250ms)
      setTimeout(() => {
        setStep("disbursing");

        // Stage 3: Disbursing batch transfers to Access Bank accounts (250ms)
        setTimeout(async () => {
          try {
            await disburseBatchPayments();
          } catch {
            // Mock fallback handled internally
          }

          setStep("completed");
          onSettlementComplete?.();

          // Graceful close after completion display
          setTimeout(() => {
            setStep("idle");
            onClose();
          }, 800);
        }, 250);
      }, 250);
    }, 250);
  };

  const isProcessing = step !== "idle" && step !== "completed";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl border border-neutral-purple-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B4D25] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-green-800 border border-primary-green-600">
              <Landmark className="w-5 h-5 text-primary-green-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight text-white">
                  Execute Offtaker Carbon Settlement
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-green-800 text-primary-green-200 border border-primary-green-600">
                  Simulated
                </span>
              </div>
              <p className="text-xs text-primary-green-300">
                Simulate inbound enterprise buyer funds clearing via Access Bank Sandbox.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-primary-green-300 hover:text-white hover:bg-primary-green-800 transition-colors disabled:opacity-40"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Offtaker Parameters Form */}
          <div className="space-y-3">
            {/* Field 1: External Buyer */}
            <div className="bg-[#F8F7FA] p-3 rounded-xl border border-neutral-purple-200 space-y-1">
              <div className="flex items-center justify-between text-neutral-purple-500 text-[11px] font-semibold">
                <span>External Offtaker / Carbon Buyer</span>
                <span className="font-mono text-[10px] text-primary-green-700">
                  VERIFIED BUYER
                </span>
              </div>
              <div className="flex items-center gap-2 font-bold text-neutral-purple-900 text-sm">
                <Building2 className="w-4 h-4 text-primary-green-700 shrink-0" />
                <span>Global Energy Transition Fund (ESG Portfolio)</span>
              </div>
              <p className="text-[10px] text-neutral-purple-500 font-mono">
                Corporate / Sovereign Offtaker (Simulated) • Escrow Ref #ESC-2026-AFR
              </p>
            </div>

            {/* Field 2: Credit Volume Purchased */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8F7FA] p-3 rounded-xl border border-neutral-purple-200 space-y-1">
                <span className="text-[11px] font-semibold text-neutral-purple-500 block">
                  Credit Volume Purchased
                </span>
                <div className="text-base font-bold font-mono tabular-nums text-neutral-purple-900 flex items-center gap-1">
                  <FileCheck className="w-4 h-4 text-[#3F8851]" />
                  <span>357</span>
                  <span className="text-xs font-normal text-neutral-purple-500">
                    tCO₂e (est.)
                  </span>
                </div>
                <span className="text-[10px] text-neutral-purple-400 block font-mono">
                  Argungu Basin 2026 Batch
                </span>
              </div>

              {/* Field 3: Settlement Amount */}
              <div className="bg-[#F8F7FA] p-3 rounded-xl border border-neutral-purple-200 space-y-1">
                <span className="text-[11px] font-semibold text-neutral-purple-500 block">
                  Settlement Amount
                </span>
                <div className="text-base font-bold font-mono tabular-nums text-[#0B4D25] flex items-center gap-0.5">
                  <DollarSign className="w-4 h-4 text-[#0B4D25]" />
                  <span>10,000.00</span>
                  <span className="text-xs font-normal text-neutral-purple-500">
                    USD
                  </span>
                </div>
                <span className="text-[10px] text-neutral-purple-500 font-mono tabular-nums block">
                  ≈ ₦16,000,000 NGN (₦1,600/$)
                </span>
              </div>
            </div>

            {/* Field 4: Target Sandbox */}
            <div className="bg-white p-3 rounded-xl border border-neutral-purple-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-neutral-purple-700">
                  Target Clearing Sandbox
                </span>
                <p className="text-[10px] text-neutral-purple-500 font-mono">
                  Access Bank Sandbox API (V2.1-Nigeria)
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
                Connected
              </span>
            </div>
          </div>

          {/* Processing State Stepper */}
          {step !== "idle" && (
            <div className="p-3.5 bg-primary-green-50 border border-primary-green-200 rounded-xl space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B4D25]">
                {step === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-[#3F8851]" />
                ) : (
                  <Loader2 className="w-4 h-4 text-[#0B4D25] animate-spin" />
                )}
                <span>
                  {step === "authorizing" && "Authorizing off-taker wire transfer..."}
                  {step === "calculating" && "Calculating 70/15/15 smart contract split..."}
                  {step === "disbursing" && "Disbursing batch transfers to Access Bank accounts..."}
                  {step === "completed" && "Sandbox Settlement Executed Successfully!"}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-primary-green-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0B4D25] h-full transition-all duration-200 ease-out"
                  style={{
                    width:
                      step === "authorizing"
                        ? "33%"
                        : step === "calculating"
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>
            </div>
          )}

          {/* Environmental Honesty Notice */}
          <div className="p-3 rounded-xl bg-[#F8F7FA] border border-neutral-purple-200 flex items-start gap-2 text-[11px] text-neutral-purple-600">
            <ShieldCheck className="w-4 h-4 text-primary-green-700 shrink-0 mt-0.5" />
            <span>
              All transactions executed on <strong>Access Bank Sandbox (Simulated)</strong>. Simulates multi-party split execution for independent verification review. No real fiat is transacted.
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#F8F7FA] px-6 py-4 border-t border-neutral-purple-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-purple-700 hover:bg-neutral-purple-100 transition-colors disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            onClick={handleExecuteSettlement}
            disabled={isProcessing || step === "completed"}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#F15A24] hover:bg-[#CE4312] disabled:opacity-50 transition-colors shadow-xs"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Simulating Settlement...</span>
              </>
            ) : step === "completed" ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Settlement Complete</span>
              </>
            ) : (
              <>
                <span>Execute Sandbox Settlement</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

