"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { MOCK_OBSERVATIONS, MOCK_PLOTS } from "@/lib/mock-data";
import type { Observation } from "@/types";

interface WaterLevelChartProps {
  selectedPlotId?: string;
  onSelectPlot?: (plotId: string) => void;
  observations?: Observation[];
}

interface ChartDataPoint {
  dateKey: string;
  dateLabel: string;
  dateFull: string;
  water_level: number | null;
  statusNote: string;
  validationStatus?: string;
  rejectionReason?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataPoint;
    value: number | null;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    if (data.water_level === null || data.water_level === undefined) {
      return (
        <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3 shadow-md text-xs font-sans">
          <div className="font-semibold text-neutral-purple-900 font-mono tabular-nums">
            {data.dateFull}
          </div>
          <div className="text-accent-orange-600 font-semibold mt-1">
            Data Gap (Missing In-situ Telemetry)
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#F8F7FA] border border-[#E2DFEA] rounded-xl p-3 shadow-md text-xs font-sans min-w-[200px]">
        <div className="text-[11px] text-neutral-purple-600 font-mono tabular-nums">
          {data.dateFull}
        </div>
        <div className="text-base font-bold text-neutral-purple-900 font-mono tabular-nums mt-0.5">
          {data.water_level > 0 ? "+" : ""}
          {data.water_level.toFixed(1)} cm
        </div>
        <div className="text-[11px] text-neutral-purple-700 mt-1 font-medium flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              data.water_level > 0
                ? "bg-blue-500"
                : data.water_level < -40
                ? "bg-accent-orange-600"
                : "bg-[#3F8851]"
            }`}
          />
          <span>{data.statusNote}</span>
        </div>
        {data.rejectionReason && (
          <div className="text-[10px] text-accent-orange-700 bg-accent-orange-50 rounded p-1.5 mt-2 border border-accent-orange-200 leading-snug">
            {data.rejectionReason}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function WaterLevelChart({
  selectedPlotId = "plot-001",
  onSelectPlot,
  observations = MOCK_OBSERVATIONS,
}: WaterLevelChartProps) {
  const [internalPlotId, setInternalPlotId] = useState<string>(selectedPlotId);

  const activePlotId = onSelectPlot ? selectedPlotId : internalPlotId;

  const handlePlotChange = (plotId: string) => {
    if (onSelectPlot) {
      onSelectPlot(plotId);
    } else {
      setInternalPlotId(plotId);
    }
  };

  // Build 30-day continuous timeline from 2026-10-12 to 2026-11-10
  const chartData = useMemo(() => {
    const plotObs = observations.filter((o) => o.plot === activePlotId);
    const obsByDay = new Map<string, Observation>();

    // Map by date string YYYY-MM-DD
    plotObs.forEach((obs) => {
      const dateKey = obs.observed_at.slice(0, 10);
      obsByDay.set(dateKey, obs);
    });

    const baseTime = new Date("2026-10-12T00:00:00Z").getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const points: ChartDataPoint[] = [];

    for (let i = 0; i < 30; i++) {
      const dateObj = new Date(baseTime + i * dayMs);
      const dateKey = dateObj.toISOString().slice(0, 10);
      const obs = obsByDay.get(dateKey);

      const dateLabel = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
      const dateFull = dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });

      if (obs) {
        let note = "Aerobic Safe Zone";
        if (obs.water_level > 0) {
          note = "Submerged / Flooded";
        } else if (obs.water_level < -15 && obs.water_level >= -40) {
          note = "Deep Dry-Down / Re-flood Due";
        } else if (obs.water_level < -40) {
          note = "Sensor Out-of-Bounds Anomaly";
        }

        points.push({
          dateKey,
          dateLabel,
          dateFull,
          water_level: obs.water_level,
          statusNote: note,
          validationStatus: obs.validation_status,
          rejectionReason: obs.rejection_reason,
        });
      } else {
        // Data gap: Water level is null so connectNulls={false} draws a broken line gap
        points.push({
          dateKey,
          dateLabel,
          dateFull,
          water_level: null,
          statusNote: "Missing Telemetry Gap",
        });
      }
    }

    return points;
  }, [observations, activePlotId]);

  const activePlot = MOCK_PLOTS.find((p) => p.id === activePlotId) || MOCK_PLOTS[0];

  // Dynamic Y domain to comfortably show the -82cm physical sensor fault without breaking bounds
  const hasExtremeAnomaly = chartData.some(
    (d) => d.water_level !== null && d.water_level < -25
  );
  const yDomain: [number, number] = hasExtremeAnomaly ? [-90, 10] : [-25, 10];
  const yTicks = hasExtremeAnomaly
    ? [-85, -60, -40, -25, -15, -5, 0, 5, 10]
    : [-25, -20, -15, -10, -5, 0, 5, 10];

  return (
    <div className="bg-white border border-[#E2DFEA] rounded-2xl p-5 shadow-xs flex flex-col space-y-4">
      {/* Header & Plot Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2DFEA]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-neutral-purple-900 tracking-tight">
              AWD Water-Level Time Series
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
              30-Day In-situ Telemetry
            </span>
          </div>
          <p className="text-xs text-neutral-purple-600 mt-0.5">
            {activePlot.farm} • {activePlot.rice_variety} (Piezometer relative to 0 cm soil surface).
          </p>
        </div>

        {/* Plot Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#F8F7FA] p-1 rounded-xl border border-[#E2DFEA] overflow-x-auto">
          {MOCK_PLOTS.map((plot) => {
            const isSelected = plot.id === activePlotId;
            return (
              <button
                key={plot.id}
                onClick={() => handlePlotChange(plot.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors shrink-0 ${
                  isSelected
                    ? "bg-[#0B4D25] text-white font-bold shadow-xs"
                    : "text-neutral-purple-700 hover:text-neutral-purple-900 hover:bg-[#E2DFEA]/50"
                }`}
              >
                {plot.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2DFEA" vertical={false} />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "#685E8A", fontSize: 11 }}
              tickLine={{ stroke: "#E2DFEA" }}
              axisLine={{ stroke: "#E2DFEA" }}
              interval="preserveStartEnd"
              className="tabular-nums"
            />
            <YAxis
              domain={yDomain}
              ticks={yTicks}
              tick={{ fill: "#685E8A", fontSize: 11 }}
              tickLine={{ stroke: "#E2DFEA" }}
              axisLine={{ stroke: "#E2DFEA" }}
              tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${v} cm`}
              className="tabular-nums"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="water_level"
              stroke="#3F8851"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#3F8851", stroke: "#FFFFFF", strokeWidth: 1 }}
              activeDot={{ r: 5, fill: "#0B4D25", stroke: "#FFFFFF", strokeWidth: 2 }}
              connectNulls={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
