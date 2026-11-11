"use client";

import { useState } from "react";
import type { Plot } from "@/types";
import { enrichPlots, type PlotEnriched, type PlotComplianceStatus } from "@/lib/plot-utils";
import {
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Satellite,
  Eye,
  Plus,
  ArrowUpDown,
  Droplets,
  ExternalLink,
} from "lucide-react";
import { TableSkeleton, TableEmptyState } from "@/components/shared/TableSkeleton";

interface PlotsTableProps {
  plots: Plot[];
  selectedPlotId?: string | null;
  onSelectPlot?: (plotId: string) => void;
  onOpenRegisterModal?: () => void;
  flashingPlotId?: string | null;
  waterLevelOverrides?: Record<string, number>;
  isLoading?: boolean;
}

const STATUS_CONFIG: Record<
  PlotComplianceStatus,
  {
    label: string;
    badgeClass: string;
    icon: typeof ShieldCheck;
  }
> = {
  COMPLIANT: {
    label: "AWD Compliant",
    badgeClass: "bg-status-success-bg text-status-success-text border-primary-green-300",
    icon: ShieldCheck,
  },
  NON_COMPLIANT: {
    label: "Flooding Violation",
    badgeClass: "bg-status-error-bg text-status-error-text border-red-300",
    icon: AlertTriangle,
  },
  SENSOR_FAULT: {
    label: "Sensor Anomaly",
    badgeClass: "bg-status-warning-bg text-status-warning-text border-amber-300",
    icon: Radio,
  },
  RADAR_DISCREPANCY: {
    label: "Radar Discrepancy",
    badgeClass: "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-300",
    icon: Satellite,
  },
};

function MiniSparkline({ plotId, level }: { plotId: string; level: number }) {
  let points = "0,14 10,12 20,8 30,16 40,10";
  let stroke = "#3F8851";

  if (level < -40) {
    points = "0,6 10,8 20,10 30,12 40,22";
    stroke = "#F15A24";
  } else if (level > 0) {
    points = "0,6 10,5 20,6 30,5 40,5";
    stroke = "#2563EB";
  } else if (plotId === "plot-001") {
    points = "0,4 10,10 20,16 30,20 40,17";
  } else if (plotId === "plot-002") {
    points = "0,5 10,11 20,15 30,18 40,16";
  }

  return (
    <svg className="w-9 h-5 shrink-0 overflow-visible" viewBox="0 0 40 24">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle
        cx="40"
        cy={level < -40 ? 22 : level > 0 ? 5 : 17}
        r="2.5"
        fill={stroke}
      />
    </svg>
  );
}

export function PlotsTable({
  plots,
  selectedPlotId,
  onSelectPlot,
  onOpenRegisterModal,
  flashingPlotId,
  waterLevelOverrides,
  isLoading = false,
}: PlotsTableProps) {
  const enrichedPlots = enrichPlots(plots);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<keyof PlotEnriched>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof PlotEnriched) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredPlots = enrichedPlots
    .filter((plot) => {
      const matchesSearch =
        plot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plot.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plot.rice_variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plot.farm.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || plot.complianceStatus === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  return (
    <div className="w-full bg-white border border-neutral-purple-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-4 sm:p-5 border-b border-neutral-purple-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-purple-900">
              Cooperative Enrolled Plots Roster
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary-green-50 text-primary-green-800 border border-primary-green-200 tabular-nums">
              {filteredPlots.length} Plots
            </span>
          </div>
          <p className="text-xs text-neutral-purple-500 mt-0.5">
            Monitor AWD water oscillations, piezometer telemetry health, and cultivation cycle status.
          </p>
        </div>

        {/* Action Button & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search farmer or plot..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-900 placeholder:text-neutral-purple-400 focus:outline-hidden focus:border-primary-green-600 focus:ring-1 focus:ring-primary-green-600"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative flex items-center">
            <Filter className="w-3.5 h-3.5 text-neutral-purple-400 absolute left-2.5 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-8 pr-7 py-1.5 text-xs rounded-lg border border-neutral-purple-200 bg-white text-neutral-purple-800 font-medium focus:outline-hidden focus:border-primary-green-600 appearance-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="COMPLIANT">AWD Compliant</option>
              <option value="NON_COMPLIANT">Flooding Violations</option>
              <option value="SENSOR_FAULT">Sensor Faults</option>
              <option value="RADAR_DISCREPANCY">Radar Discrepancies</option>
            </select>
          </div>

          {/* Enroll Plot CTA Modal Trigger */}
          {onOpenRegisterModal && (
            <button
              onClick={onOpenRegisterModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Plot</span>
            </button>
          )}
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-purple-50/80 border-b border-neutral-purple-200/90 text-[11px] font-bold text-neutral-purple-600 uppercase tracking-wider">
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("id")}
                  className="flex items-center gap-1 hover:text-neutral-purple-900 font-bold"
                >
                  <span>Plot ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("farmerName")}
                  className="flex items-center gap-1 hover:text-neutral-purple-900 font-bold"
                >
                  <span>Farmer & Phone</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">Rice Variety</th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("calculated_area")}
                  className="flex items-center gap-1 hover:text-neutral-purple-900 font-bold"
                >
                  <span>Area (ha)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort("currentWaterLevel")}
                  className="flex items-center gap-1 hover:text-neutral-purple-900 font-bold"
                >
                  <span>Water Level (cm)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4">Cycle & Compliance Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-purple-100 text-xs text-neutral-purple-900">
            {isLoading ? (
              <TableSkeleton rows={4} columns={7} />
            ) : filteredPlots.length === 0 ? (
              <TableEmptyState
                colSpan={7}
                icon={Search}
                title="No enrolled plots matching filter"
                description="No paddy plots match your current search query or compliance filter."
                resetAction={() => {
                  setSearchTerm("");
                  setStatusFilter("ALL");
                }}
                resetLabel="Reset Plot Filters"
              />
            ) : (
              filteredPlots.map((plot) => {
                const isSelected = selectedPlotId === plot.id;
                const isFlashing = flashingPlotId === plot.id;
                const statusCfg = STATUS_CONFIG[plot.complianceStatus];
                const StatusIcon = statusCfg.icon;

                const overriddenLevel = waterLevelOverrides?.[plot.id];
                const effectiveWaterLevel =
                  overriddenLevel !== undefined ? overriddenLevel : plot.currentWaterLevel;

                let effectiveStatusText = plot.waterStatusText;
                if (overriddenLevel !== undefined) {
                  if (effectiveWaterLevel < -40) {
                    effectiveStatusText = `Sensor Fault Anomaly (${effectiveWaterLevel.toFixed(1)} cm)`;
                  } else if (effectiveWaterLevel > 0) {
                    effectiveStatusText = `Submerged / Flooded (+${effectiveWaterLevel.toFixed(1)} cm)`;
                  } else {
                    effectiveStatusText = `Safe AWD Drying (${effectiveWaterLevel.toFixed(1)} cm)`;
                  }
                }

                return (
                  <tr
                    key={plot.id}
                    onClick={() => onSelectPlot?.(plot.id)}
                    className={`cursor-pointer transition-colors duration-120 ${
                      isFlashing ? "animate-telemetry-flash " : ""
                    }${
                      isSelected
                        ? "bg-primary-green-50/70 border-l-4 border-l-primary-green-700"
                        : "hover:bg-neutral-purple-50/60"
                    }`}
                  >
                    {/* Plot ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-green-900">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary-green-600" />
                        <span>{plot.id}</span>
                      </div>
                    </td>

                    {/* Farmer Name & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-purple-900">
                        {plot.farmerName}
                      </div>
                      <div className="text-[11px] text-neutral-purple-500 font-mono">
                        {plot.farmerPhone}
                      </div>
                    </td>

                    {/* Rice Variety */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-purple-100 text-neutral-purple-800">
                        {plot.rice_variety}
                      </span>
                    </td>

                    {/* Calculated Area */}
                    <td className="py-3.5 px-4 font-bold tabular-nums text-neutral-purple-900">
                      {plot.calculated_area.toFixed(2)} ha
                    </td>

                    {/* Latest Water Level & Sparkline */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <MiniSparkline plotId={plot.id} level={effectiveWaterLevel} />
                        <div>
                          <div className="flex items-center gap-1.5 font-mono tabular-nums font-semibold">
                            <Droplets
                              className={`w-3.5 h-3.5 ${
                                effectiveWaterLevel > 0
                                  ? "text-blue-500"
                                  : effectiveWaterLevel < -40
                                  ? "text-amber-600"
                                  : "text-primary-green-600"
                              }`}
                            />
                            <span
                              className={
                                effectiveWaterLevel < -40
                                  ? "text-amber-700 font-bold"
                                  : effectiveWaterLevel > 0
                                  ? "text-blue-700"
                                  : "text-primary-green-800"
                              }
                            >
                              {effectiveWaterLevel > 0 ? "+" : ""}
                              {effectiveWaterLevel.toFixed(1)} cm
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-purple-500 mt-0.5">
                            {effectiveStatusText}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Compliance Status Pill */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusCfg.badgeClass}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusCfg.label}</span>
                        </span>
                        <span className="text-[10px] text-neutral-purple-500 font-mono">
                          Cycle: Day {plot.dryingEpisodeDays * 3 + 2} / Active
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPlot?.(plot.id);
                          }}
                          className="px-2.5 py-1 rounded text-xs font-semibold text-primary-green-800 bg-primary-green-50 hover:bg-primary-green-100 border border-primary-green-200 transition-colors inline-flex items-center gap-1"
                          title="Focus Plot on Map & Telemetry"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Focus</span>
                        </button>
                        <a
                          href={`#telemetry-${plot.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPlot?.(plot.id);
                          }}
                          className="p-1 text-neutral-purple-400 hover:text-neutral-purple-700 transition-colors"
                          title="View Raw Telemetry"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count indicator */}
      <div className="p-3 bg-neutral-purple-50/50 border-t border-neutral-purple-200/70 flex items-center justify-between text-xs text-neutral-purple-500">
        <span>
          Showing <strong className="text-neutral-purple-800 tabular-nums">{filteredPlots.length}</strong> of{" "}
          <strong className="text-neutral-purple-800 tabular-nums">{enrichedPlots.length}</strong> enrolled cooperative plots
        </span>
        <span className="text-[11px]">
          Data synchronized with Kebbi Green Rice Growers Union Registry
        </span>
      </div>
    </div>
  );
}

