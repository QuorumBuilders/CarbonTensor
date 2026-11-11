"use client";

import { useState, useEffect } from "react";
import {
  X,
  Smartphone,
  MessageSquare,
  Hash,
  Signal,
  BatteryMedium,
  CheckCircle2,
  Info,
  PhoneCall,
  PhoneOff,
} from "lucide-react";

interface UssdMockModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "sms" | "ussd";
}

export function UssdMockModal({
  isOpen,
  onClose,
  defaultTab = "sms",
}: UssdMockModalProps) {
  const [selectedTab, setSelectedTab] = useState<"sms" | "ussd" | null>(null);
  const [ussdSelection, setUssdSelection] = useState<number | null>(null);
  const [ussdInput, setUssdInput] = useState<string>("");

  const activeTab = selectedTab ?? defaultTab;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleKeyPress = (num: string) => {
    if (activeTab === "ussd") {
      if (num === "0") {
        setUssdSelection(null);
        setUssdInput("");
      } else if (num === "1" || num === "2" || num === "3") {
        setUssdSelection(parseInt(num, 10));
        setUssdInput(num);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ussd-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-neutral-purple-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Top Chrome Header */}
        <div className="bg-[#0B4D25] text-white px-5 py-4 flex items-center justify-between border-b border-primary-green-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-green-600 border border-primary-green-400 flex items-center justify-center text-white shrink-0">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="ussd-modal-title" className="text-sm font-bold tracking-tight">
                  Farmer Notification Interface
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent-orange-500/20 text-accent-orange-300 border border-accent-orange-400/40">
                  Roadmap Feature-Phone SMS Alert (Mock)
                </span>
              </div>
              <p className="text-[11px] text-primary-green-200">
                Smallholder Rice Farmer In-Field Advisory & Payout Channel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-primary-green-200 hover:text-white hover:bg-primary-green-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Context Banner */}
        <div className="bg-primary-green-50/70 border-b border-primary-green-200/80 p-3.5 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-primary-green-700 shrink-0 mt-0.5" />
          <p className="text-xs text-primary-green-900 leading-relaxed">
            <strong>Roadmap Context:</strong> Smallholder rice farmers in Northern Nigeria lack continuous smartphone data. In production, dividend confirmations and drying schedules are routed via carrier USSD and SMS gateways.
          </p>
        </div>

        {/* Tab Switcher: SMS vs USSD */}
        <div className="px-5 pt-4 flex items-center gap-2 border-b border-neutral-purple-200 bg-neutral-purple-50/50">
          <button
            type="button"
            onClick={() => {
              setSelectedTab("sms");
              setUssdSelection(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === "sms"
                ? "border-accent-orange-500 text-accent-orange-600 bg-white rounded-t-lg shadow-2xs"
                : "border-transparent text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Incoming SMS Message</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("ussd")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === "ussd"
                ? "border-accent-orange-500 text-accent-orange-600 bg-white rounded-t-lg shadow-2xs"
                : "border-transparent text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Interactive USSD Menu (*384*22#)</span>
          </button>
        </div>

        {/* Phone Body Simulation Canvas */}
        <div className="p-6 bg-neutral-100 flex justify-center items-center">
          {/* Feature Phone Physical Chassis */}
          <div className="relative w-72 bg-[#1C1F1D] border-4 border-[#2D332F] rounded-[38px] p-3.5 shadow-xl flex flex-col items-center">
            {/* Top Antenna Stub (Subtle Nokia/Transsion silhouette) */}
            <div className="absolute -top-3 right-6 w-3.5 h-3 bg-[#2D332F] rounded-t-xs" />

            {/* Earpiece Grill */}
            <div className="w-10 h-1.5 bg-[#3B423D] rounded-full mb-3" />

            {/* Phone Screen Bezel & LCD */}
            <div className="w-full bg-[#111412] p-2 rounded-xl border-2 border-[#3B423D] shadow-inner mb-3">
              {/* LCD Status Header Bar */}
              <div className="bg-[#B9CEAF] text-[#142312] px-2 py-0.5 rounded-t font-mono text-[9px] flex items-center justify-between border-b border-[#9FB794]">
                <div className="flex items-center gap-1">
                  <Signal className="w-2.5 h-2.5" />
                  <span>MTN-NG</span>
                </div>
                <span className="font-bold tabular-nums">09:14 AM</span>
                <BatteryMedium className="w-3 h-3" />
              </div>

              {/* LCD Content Display (Monochrome Green High-Contrast LCD) */}
              <div className="bg-[#C6DCBC] text-[#142312] p-2.5 rounded-b min-h-[175px] font-mono text-[11px] leading-snug select-none flex flex-col justify-between">
                {activeTab === "sms" ? (
                  /* Incoming SMS Screen View */
                  <div className="space-y-1 whitespace-pre-wrap">
                    <div className="text-[10px] font-bold pb-1 mb-1 border-b border-[#9FB794] text-[#0A1709] flex items-center justify-between">
                      <span>SMS (1 New Msg)</span>
                      <span className="text-[9px]">11-Nov</span>
                    </div>
                    <div className="text-[#0E1D0C] font-semibold">
                      [ ACCESS BANK ALERT ]
                    </div>
                    <div className="tabular-nums text-[10.5px]">
                      Acct: •••• 4821
                    </div>
                    <div className="tabular-nums font-bold text-[#0A1709]">
                      CR: NGN 45,000.00
                    </div>
                    <div className="text-[10px] text-[#142312]">
                      Desc: CarbonTensor AWD Dividend / Plot-001 (Usman Bello)
                    </div>
                    <div className="tabular-nums text-[10.5px]">
                      Bal: NGN 68,450.00
                    </div>
                    <div className="tabular-nums text-[10px]">
                      Date: 11-Nov-2026 09:14 AM
                    </div>
                    <div className="text-[9.5px]">
                      Ref: ACC-SBX-00921-X
                    </div>
                    <div className="text-[9.5px] italic pt-1 border-t border-[#A8C29C] text-[#142312]">
                      Note: 4 dry cycles verified. Avoided methane bonus disbursed.
                    </div>
                  </div>
                ) : (
                  /* USSD Menu Interactive Screen View */
                  <div className="flex flex-col justify-between h-full">
                    {ussdSelection === null ? (
                      <div>
                        <div className="text-[10px] font-bold pb-1 mb-1 border-b border-[#9FB794] text-[#0A1709]">
                          CarbonTensor *384*22#
                        </div>
                        <div className="space-y-1 text-[10.5px]">
                          <div>1. Check AWD Status</div>
                          <div>2. Accrued Carbon Bal</div>
                          <div>3. Request Field Agent</div>
                        </div>
                        <div className="mt-3 pt-1 border-t border-[#9FB794] text-[9.5px] text-[#2C4427]">
                          Press 1, 2, or 3 on keypad
                        </div>
                      </div>
                    ) : ussdSelection === 1 ? (
                      <div>
                        <div className="text-[10px] font-bold pb-1 mb-1 border-b border-[#9FB794] text-[#0A1709]">
                          [Plot 001 Telemetry]
                        </div>
                        <div className="space-y-0.5 text-[10px]">
                          <div>Water: -12.4 cm (Safe)</div>
                          <div>Dry Phase: 5 days</div>
                          <div>Next flood: In 48h</div>
                          <div className="font-bold text-[#0B4D25] pt-1">Status: COMPLIANT</div>
                        </div>
                        <div className="mt-2 text-[9px] border-t border-[#9FB794] pt-1">
                          Press 0 for Main Menu
                        </div>
                      </div>
                    ) : ussdSelection === 2 ? (
                      <div>
                        <div className="text-[10px] font-bold pb-1 mb-1 border-b border-[#9FB794] text-[#0A1709]">
                          [Carbon Balance]
                        </div>
                        <div className="space-y-0.5 text-[10px]">
                          <div>Avoided: 12.8 tCO₂e (est.)</div>
                          <div className="font-bold">Bonus: ₦45,000.00</div>
                          <div>Status: Disbursed</div>
                          <div className="text-[9px]">Ref: ACC-SBX-00921-X</div>
                        </div>
                        <div className="mt-2 text-[9px] border-t border-[#9FB794] pt-1">
                          Press 0 for Main Menu
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-[10px] font-bold pb-1 mb-1 border-b border-[#9FB794] text-[#0A1709]">
                          [Field Agent Request]
                        </div>
                        <div className="space-y-0.5 text-[10px]">
                          <div>Agent: Ibrahim Danladi</div>
                          <div>Cluster: Argungu South</div>
                          <div>Scheduled: Tomorrow 10am</div>
                          <div className="text-[9px]">Ref: REQ-9812-OK</div>
                        </div>
                        <div className="mt-2 text-[9px] border-t border-[#9FB794] pt-1">
                          Press 0 for Main Menu
                        </div>
                      </div>
                    )}

                    {ussdInput && (
                      <div className="text-[9px] text-right font-bold text-[#0A1709]">
                        Input: {ussdInput}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Feature Phone Soft Navigation Keys */}
            <div className="w-full grid grid-cols-3 gap-1.5 mb-2 px-1">
              <button
                type="button"
                onClick={() => {
                  if (activeTab === "ussd" && ussdSelection !== null) {
                    setUssdSelection(null);
                    setUssdInput("");
                  }
                }}
                className="h-6 bg-[#323834] active:bg-[#4A524C] rounded text-[9px] text-[#A6B2A8] font-bold flex items-center justify-center border border-[#444C46] shadow-xs"
              >
                Back
              </button>
              <div className="h-6 bg-[#262B28] rounded-full border border-[#3B423D] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#181C1A]" />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (activeTab === "ussd") {
                    setUssdSelection(1);
                  }
                }}
                className="h-6 bg-[#323834] active:bg-[#4A524C] rounded text-[9px] text-[#A6B2A8] font-bold flex items-center justify-center border border-[#444C46] shadow-xs"
              >
                Select
              </button>
            </div>

            {/* Call / End Buttons */}
            <div className="w-full grid grid-cols-2 gap-2 mb-2 px-1">
              <button
                type="button"
                onClick={() => setSelectedTab("ussd")}
                className="h-7 bg-[#1F4A2B] hover:bg-[#286037] active:bg-[#16351F] text-white rounded-md flex items-center justify-center border border-[#2D663B] shadow-xs"
                title="Dial USSD"
              >
                <PhoneCall className="w-3.5 h-3.5 text-green-300" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setUssdSelection(null);
                  setUssdInput("");
                }}
                className="h-7 bg-[#541D1D] hover:bg-[#6D2626] active:bg-[#3D1414] text-white rounded-md flex items-center justify-center border border-[#6E2A2A] shadow-xs"
                title="End Call"
              >
                <PhoneOff className="w-3.5 h-3.5 text-red-300" />
              </button>
            </div>

            {/* Numeric 3x4 Keypad */}
            <div className="w-full grid grid-cols-3 gap-1 px-1">
              {[
                { label: "1", sub: "" },
                { label: "2", sub: "abc" },
                { label: "3", sub: "def" },
                { label: "4", sub: "ghi" },
                { label: "5", sub: "jkl" },
                { label: "6", sub: "mno" },
                { label: "7", sub: "pqrs" },
                { label: "8", sub: "tuv" },
                { label: "9", sub: "wxyz" },
                { label: "*", sub: "" },
                { label: "0", sub: "+" },
                { label: "#", sub: "" },
              ].map((k) => (
                <button
                  key={k.label}
                  type="button"
                  onClick={() => handleKeyPress(k.label)}
                  className="h-7 bg-[#272D29] hover:bg-[#333A35] active:bg-[#1E2320] text-neutral-200 rounded text-[11px] font-mono font-bold flex flex-col items-center justify-center border border-[#38403B] shadow-2xs leading-none"
                >
                  <span>{k.label}</span>
                  {k.sub && (
                    <span className="text-[7px] text-neutral-400 uppercase">
                      {k.sub}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-white border-t border-neutral-purple-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-purple-600 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-primary-green-600" />
            <span>Demonstrates last-mile equity without requiring smartphones in rural paddies.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-primary-green-700 hover:bg-primary-green-800 text-white font-semibold shadow-xs transition-colors"
          >
            Close Notification View
          </button>
        </div>
      </div>
    </div>
  );
}
