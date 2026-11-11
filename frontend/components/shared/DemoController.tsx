"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export interface DemoStep {
  id: number;
  label: string;
  shortTitle: string;
  description: string;
  href: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    label: "Coop Overview",
    shortTitle: "Overview",
    description: "Monitor union hectares, enrolled plots, and avoided tCO₂e (est.) pool.",
    href: "/dashboard",
  },
  {
    id: 2,
    label: "Sensor Stream",
    shortTitle: "Telemetry",
    description: "Inspect live IoT water tube telemetry oscillating through AWD cycles.",
    href: "/dashboard",
  },
  {
    id: 3,
    label: "Catch Anomaly",
    shortTitle: "Anomalies",
    description: "Detect continuous flooding violation on Plot 3 and sensor fault on Plot 4.",
    href: "/dashboard",
  },
  {
    id: 4,
    label: "Satellite Radar",
    shortTitle: "Radar",
    description: "Sentinel-1 cross-check surface moisture vs local piezometer data.",
    href: "/verifier",
  },
  {
    id: 5,
    label: "Export Evidence",
    shortTitle: "Audit Pack",
    description: "Compile tamper-evident MRV verification dossier for Verra/Gold Standard.",
    href: "/verifier",
  },
  {
    id: 6,
    label: "Execute Payout",
    shortTitle: "Payout",
    description: "Disburse simulated 70% smallholder carbon bonus via Access Bank Sandbox.",
    href: "/finance",
  },
];

export function DemoController() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (pathname.startsWith("/verifier")) return 3; // step 4 or 5
    if (pathname.startsWith("/finance")) return 5; // step 6
    return 0; // step 1
  });

  const activeStep = DEMO_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = DEMO_STEPS[nextIndex];
      if (nextStep.href !== pathname) {
        router.push(nextStep.href);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      const prevStep = DEMO_STEPS[prevIndex];
      if (prevStep.href !== pathname) {
        router.push(prevStep.href);
      }
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
    const step = DEMO_STEPS[index];
    if (step.href !== pathname) {
      router.push(step.href);
    }
  };

  return (
    <aside
      aria-label="Interactive Demo Presentation Controller"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl transition-all duration-200"
    >
      <div className="bg-primary-green-900/95 backdrop-blur-md text-white border border-primary-green-700 rounded-2xl shadow-2xl p-3 sm:p-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-accent-orange-500 animate-pulse" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-orange-400" />
              <span className="text-xs font-bold tracking-wide uppercase text-primary-green-200">
                Live Demo Storyline
              </span>
            </div>
            <span className="text-xs text-primary-green-300 font-mono tabular-nums">
              Step {currentStepIndex + 1} of {DEMO_STEPS.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md text-primary-green-300 hover:text-white hover:bg-primary-green-800 transition-colors"
              title={isMinimized ? "Expand Demo Controller" : "Minimize Demo Controller"}
              aria-label={isMinimized ? "Expand Demo Controller" : "Minimize Demo Controller"}
            >
              {isMinimized ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Body */}
        {!isMinimized && (
          <div className="mt-3 space-y-3 pt-2 border-t border-primary-green-800">
            {/* Step Selector Pills */}
            <div className="grid grid-cols-6 gap-1.5">
              {DEMO_STEPS.map((step, idx) => {
                const isSelected = idx === currentStepIndex;
                const isPast = idx < currentStepIndex;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(idx)}
                    className={`px-1.5 py-1.5 rounded-lg text-center transition-all duration-150 flex flex-col items-center gap-0.5 border ${
                      isSelected
                        ? "bg-accent-orange-500 border-accent-orange-400 text-white font-bold shadow-xs scale-102"
                        : isPast
                        ? "bg-primary-green-800/80 border-primary-green-700 text-primary-green-200 hover:bg-primary-green-800 hover:text-white"
                        : "bg-primary-green-950/50 border-primary-green-800/60 text-primary-green-400 hover:bg-primary-green-800 hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] font-mono tabular-nums leading-none">
                      0{step.id}
                    </span>
                    <span className="text-[11px] font-medium truncate w-full leading-tight">
                      {step.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Step Description & Actions */}
            <div className="flex items-center justify-between gap-3 bg-primary-green-950/60 rounded-xl p-2.5 border border-primary-green-800">
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-accent-orange-400">
                    {activeStep.label}
                  </span>
                  <Link
                    href={activeStep.href}
                    className="text-[11px] text-primary-green-300 hover:text-white inline-flex items-center gap-0.5 transition-colors"
                  >
                    <span>{activeStep.href}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <p className="text-xs text-primary-green-100 line-clamp-1 mt-0.5">
                  {activeStep.description}
                </p>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="p-1.5 rounded-lg bg-primary-green-800 hover:bg-primary-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                  title="Previous Step"
                  aria-label="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStepIndex === DEMO_STEPS.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-accent-orange-500 hover:bg-accent-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors shadow-xs"
                  title="Next Step"
                  aria-label="Next Step"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

