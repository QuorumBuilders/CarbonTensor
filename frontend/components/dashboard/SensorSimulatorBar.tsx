"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { api, type SensorObservationPayload } from "@/lib/api/endpoints";
import type { Observation } from "@/types";
import {
  Radio,
  Play,
  Pause,
  Send,
  Droplets,
  ArrowDownRight,
  RotateCcw,
  AlertOctagon,
  BatteryCharging,
  Wifi,
} from "lucide-react";

export type SimulationScenario = "dry_down" | "re_flood" | "sensor_fault";

interface SensorSimulatorBarProps {
  activePlotId?: string;
  onObservationCreated?: (observation: Observation) => void;
}

const PLOT_SENSOR_MAP: Record<string, { serial: string; cycle: string; baseWater: number }> = {
  "plot-001": { serial: "SN-AWD-001", cycle: "cycle-001", baseWater: -10.5 },
  "plot-002": { serial: "SN-AWD-002", cycle: "cycle-002", baseWater: -9.0 },
  "plot-003": { serial: "SN-AWD-003", cycle: "cycle-003", baseWater: 4.8 },
  "plot-004": { serial: "SN-AWD-004", cycle: "cycle-004", baseWater: -82.0 },
  "plot-005": { serial: "SN-AWD-005", cycle: "cycle-005", baseWater: -11.5 },
};

export function SensorSimulatorBar({
  activePlotId = "plot-001",
  onObservationCreated,
}: SensorSimulatorBarProps) {
  const [scenario, setScenario] = useState<SimulationScenario>("dry_down");
  const [isStreaming, setIsStreaming] = useState(false);
  const [prevPlotId, setPrevPlotId] = useState(activePlotId);
  const [currentSimWater, setCurrentSimWater] = useState<number>(() => {
    return PLOT_SENSOR_MAP[activePlotId]?.baseWater ?? -10.5;
  });

  if (prevPlotId !== activePlotId) {
    setPrevPlotId(activePlotId);
    setCurrentSimWater(PLOT_SENSOR_MAP[activePlotId]?.baseWater ?? -10.5);
  }

  const [lastInjected, setLastInjected] = useState<{
    time: string;
    waterLevel: number;
    status: "VALID" | "SUSPICIOUS" | "REJECTED";
  } | null>(null);
  const [isInjecting, setIsInjecting] = useState(false);

  // Telemetry Injection Core
  const handleInjectReading = useCallback(async (customScenario?: SimulationScenario) => {
    setIsInjecting(true);
    const activeScenario = customScenario || scenario;
    const config = PLOT_SENSOR_MAP[activePlotId] || {
      serial: `SN-AWD-${activePlotId.replace("plot-", "")}`,
      cycle: `cycle-${activePlotId.replace("plot-", "")}`,
      baseWater: -10.0,
    };

    let nextWater: number;
    if (activeScenario === "dry_down") {
      // Simulate normal dry-down: decrements water level by 1.5 cm towards -14 cm
      nextWater = Number(Math.max(-14.0, currentSimWater - 1.5).toFixed(1));
    } else if (activeScenario === "re_flood") {
      // Simulate irrigation re-flood: bumps water level back to +4 cm
      nextWater = 4.0;
    } else {
      // Simulate physical sensor fault: injects out-of-range -82.0 cm
      nextWater = -82.0;
    }

    setCurrentSimWater(nextWater);

    const payload: SensorObservationPayload = {
      sensor_serial_number: config.serial,
      plot_id: activePlotId,
      cultivation_cycle_id: config.cycle,
      observed_at: new Date().toISOString(),
      water_level: nextWater,
      raw_payload: {
        battery_v: 3.72,
        rssi: -68,
      },
    };

    try {
      const response = await api.observations.createSensorObservation(payload);
      if (response.data) {
        setLastInjected({
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          waterLevel: response.data.water_level,
          status: response.data.validation_status,
        });
        onObservationCreated?.(response.data);
      }
    } catch (e) {
      console.error("Simulation ingestion failed", e);
    } finally {
      setIsInjecting(false);
    }
  }, [activePlotId, currentSimWater, onObservationCreated, scenario]);

  // Auto-Simulation Streaming Interval (2s)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStreaming) {
      timerRef.current = setInterval(() => {
        handleInjectReading();
      }, 2000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStreaming, handleInjectReading]);

  // Support external trigger event (e.g., from DemoController)
  useEffect(() => {
    const handleCustomTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ plotId?: string; scenario?: SimulationScenario }>;
      if (customEvent.detail?.scenario) {
        handleInjectReading(customEvent.detail.scenario);
      } else {
        handleInjectReading();
      }
    };

    window.addEventListener("carbontensor:simulator-tick", handleCustomTrigger);
    return () => {
      window.removeEventListener("carbontensor:simulator-tick", handleCustomTrigger);
    };
  }, [handleInjectReading]);

  const activeSensorConfig = PLOT_SENSOR_MAP[activePlotId] || {
    serial: `SN-AWD-001`,
    cycle: `cycle-001`,
    baseWater: -10.5,
  };

  return (
    <div className="bg-white border border-[#E2DFEA] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
      {/* Control Bar Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2DFEA]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary-green-50 text-[#0B4D25] border border-primary-green-200">
            <Radio className="w-4 h-4 text-[#0B4D25]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-purple-900 tracking-tight">
                In-situ Telemetry Simulator
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-purple-100 text-neutral-purple-800 border border-neutral-purple-200">
                DRF Ingestion Schema
              </span>
            </div>
            <p className="text-xs text-neutral-purple-600 mt-0.5">
              Target Plot: <span className="font-mono font-bold text-[#0B4D25]">{activePlotId}</span> • Sensor:{" "}
              <span className="font-mono font-bold text-neutral-purple-900">{activeSensorConfig.serial}</span>
            </p>
          </div>
        </div>

        {/* Live Stream Status Indicator (Static dot, no infinite pulse) & Auto Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F7FA] border border-[#E2DFEA]">
            {isStreaming ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-[#3F8851] shrink-0" />
                <span className="text-[11px] font-bold text-[#0B4D25] font-mono tabular-nums">
                  LIVE (2s Stream)
                </span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-purple-400 shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-purple-600 font-mono">
                  STREAM PAUSED
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border ${isStreaming
                ? "bg-neutral-purple-100 hover:bg-neutral-purple-200 text-neutral-purple-900 border-neutral-purple-300"
                : "bg-primary-green-50 hover:bg-primary-green-100 text-[#0B4D25] border-primary-green-200"
              }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Auto-Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Stream Live Telemetry</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulator Controls & Scenario Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        {/* Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-neutral-purple-700">Scenario:</span>

          <button
            onClick={() => setScenario("dry_down")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors border ${scenario === "dry_down"
                ? "bg-[#0B4D25] text-white border-[#0B4D25] font-bold shadow-xs"
                : "bg-white hover:bg-[#F8F7FA] text-neutral-purple-800 border-[#E2DFEA]"
              }`}
          >
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Normal Dry-Down (-1.5cm)</span>
          </button>

          <button
            onClick={() => setScenario("re_flood")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors border ${scenario === "re_flood"
                ? "bg-[#0B4D25] text-white border-[#0B4D25] font-bold shadow-xs"
                : "bg-white hover:bg-[#F8F7FA] text-neutral-purple-800 border-[#E2DFEA]"
              }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Irrigation Re-flood (+4.0cm)</span>
          </button>

          <button
            onClick={() => setScenario("sensor_fault")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors border ${scenario === "sensor_fault"
                ? "bg-accent-orange-600 text-white border-accent-orange-700 font-bold shadow-xs"
                : "bg-white hover:bg-[#F8F7FA] text-accent-orange-700 border-[#E2DFEA]"
              }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-accent-orange-500" />
            <span>Sensor Fault (-82.0cm)</span>
          </button>
        </div>

        {/* Primary Action Button: Inject Sensor Reading */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleInjectReading()}
            disabled={isInjecting}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#F15A24] hover:bg-[#CE4312] active:bg-[#A2310B] transition-colors shadow-xs inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isInjecting ? "Transmitting..." : "Inject Sensor Reading"}</span>
          </button>
        </div>
      </div>

      {/* Telemetry Status Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#F8F7FA] rounded-xl px-3.5 py-2.5 border border-[#E2DFEA]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-neutral-purple-700">
            <Droplets className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulated Level:</span>
            <span className="font-bold tabular-nums text-neutral-purple-900">
              {currentSimWater > 0 ? "+" : ""}
              {currentSimWater.toFixed(1)} cm
            </span>
          </div>

          <div className="flex items-center gap-1 text-neutral-purple-500 font-mono text-[11px]">
            <BatteryCharging className="w-3.5 h-3.5 text-[#3F8851]" />
            <span>3.72V</span>
          </div>

          <div className="flex items-center gap-1 text-neutral-purple-500 font-mono text-[11px]">
            <Wifi className="w-3.5 h-3.5 text-[#3F8851]" />
            <span>-68 dBm</span>
          </div>
        </div>

        {lastInjected && (
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-neutral-purple-500">Last Telemetry Packet:</span>
            <span className="tabular-nums font-semibold text-neutral-purple-900">
              {lastInjected.time}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded font-bold ${lastInjected.status === "VALID"
                  ? "bg-primary-green-50 text-[#0B4D25] border border-primary-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
                }`}
            >
              {lastInjected.waterLevel > 0 ? "+" : ""}
              {lastInjected.waterLevel.toFixed(1)} cm ({lastInjected.status})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
