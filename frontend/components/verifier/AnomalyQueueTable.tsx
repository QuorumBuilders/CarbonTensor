"use client";

import { useState } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  Eye,
  Radio,
  X,
  CheckCircle2,
  Phone,
  User,
  ArrowRight,
} from "lucide-react";

export type AnomalySeverity = "CRITICAL" | "WARNING";
export type AnomalyFilter = "ALL" | "CRITICAL" | "WARNING";

export interface AnomalyItem {
  id: string;
  plotId: string;
  farmerName: string;
  farmerPhone: string;
  riceVariety: string;
  flagReason: string;
  severity: AnomalySeverity;
  telemetrySource: string;
  detectedAt: string;
  waterLevel: number;
  status: "ACTIVE" | "UNDER_REVIEW" | "RESOLVED";
  recommendedAction: string;
}

const SEED_ANOMALIES: AnomalyItem[] = [
  {
    id: "anom-001",
    plotId: "plot-004",
    farmerName: "Balarabe Yusuf",
    farmerPhone: "+234 807 678 9012",
    riceVariety: "FARO 52 (Wita 4)",
    flagReason:
      "Impossible Telemetry: Sensor logged -82.0 cm exceeding physical piezometer tube depth limit (-40.0 cm).",
    severity: "CRITICAL",
    telemetrySource: "Sensor SN-AWD-004",
    detectedAt: "2026-10-27T08:15:00Z",
    waterLevel: -82.0,
    status: "ACTIVE",
    recommendedAction: "Dispatch Argungu Cluster field technician to inspect piezometer hardware and recalibrate sensor probe.",
  },
  {
    id: "anom-002",
    plotId: "plot-003",
    farmerName: "Sanusi Garba",
    farmerPhone: "+234 805 567 8901",
    riceVariety: "FARO 44 (Sippi)",
    flagReason:
      "Continuous Flooding Violation: Zero dry episodes across 25 days. Submerged constantly at +4.8 cm.",
    severity: "WARNING",
    telemetrySource: "Piezometer SN-AWD-003",
    detectedAt: "2026-10-25T11:42:00Z",
    waterLevel: 4.8,
    status: "ACTIVE",
    recommendedAction: "Issue non-compliance notice to farmer and request cooperative water gate closure to initiate AWD aeration cycle.",
  },
];

interface AnomalyQueueTableProps {
  onInspectPlot?: (plotId: string) => void;
}

export function AnomalyQueueTable({ onInspectPlot }: AnomalyQueueTableProps) {
  const [items, setItems] = useState<AnomalyItem[]>(SEED_ANOMALIES);
  const [filter, setFilter] = useState<AnomalyFilter>("ALL");
  const [inspectingItem, setInspectingItem] = useState<AnomalyItem | null>(null);

  const criticalCount = items.filter((i) => i.severity === "CRITICAL").length;
  const warningCount = items.filter((i) => i.severity === "WARNING").length;

  const filteredItems = items.filter((item) => {
    if (filter === "CRITICAL") return item.severity === "CRITICAL";
    if (filter === "WARNING") return item.severity === "WARNING";
    return true;
  });

  const handleResolve = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "RESOLVED" } : item
      )
    );
    if (inspectingItem && inspectingItem.id === id) {
      setInspectingItem((prev) => (prev ? { ...prev, status: "RESOLVED" } : null));
    }
  };

  const handleMarkReview = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "UNDER_REVIEW" } : item
      )
    );
    if (inspectingItem && inspectingItem.id === id) {
      setInspectingItem((prev) => (prev ? { ...prev, status: "UNDER_REVIEW" } : null));
    }
  };

  return (
    <div className="bg-white border border-[#E2DFEA] rounded-2xl shadow-xs overflow-hidden">
      {/* Table Header & Interactive Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E2DFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-neutral-purple-900 tracking-tight">
              MRV Anomaly Flag Queue
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">
              Rejected DRF Observations
            </span>
          </div>
          <p className="text-xs text-neutral-purple-600 mt-0.5">
            Real-time validation queue flagging AWD continuous flooding violations and out-of-range sensor failures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#F8F7FA] p-1 rounded-xl border border-[#E2DFEA]">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "ALL"
                ? "bg-[#0B4D25] text-white shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            All Flags ({items.length})
          </button>

          <button
            onClick={() => setFilter("CRITICAL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              filter === "CRITICAL"
                ? "bg-red-700 text-white shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>Critical ({criticalCount})</span>
          </button>

          <button
            onClick={() => setFilter("WARNING")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              filter === "WARNING"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Warnings ({warningCount})</span>
          </button>
        </div>
      </div>

      {/* Anomaly Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-purple-800">
          <thead className="bg-[#F8F7FA] border-b border-[#E2DFEA] text-[11px] font-bold text-neutral-purple-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Plot ID</th>
              <th className="py-3 px-4">Farmer Name</th>
              <th className="py-3 px-4">Flag Reason</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Telemetry Source</th>
              <th className="py-3 px-4">Detected At</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-purple-100">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-neutral-purple-500">
                  No anomaly flags currently match the active filter.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isCritical = item.severity === "CRITICAL";

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F8F7FA]/70 transition-colors duration-120"
                  >
                    {/* Plot ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-purple-900">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isCritical ? "bg-red-600" : "bg-amber-500"
                          }`}
                        />
                        <span>{item.plotId}</span>
                      </div>
                    </td>

                    {/* Farmer Name & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-purple-900">
                        {item.farmerName}
                      </div>
                      <div className="text-[11px] text-neutral-purple-500 font-mono">
                        {item.farmerPhone}
                      </div>
                    </td>

                    {/* Flag Reason */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="text-xs text-neutral-purple-800 font-medium line-clamp-2">
                        {item.flagReason}
                      </p>
                      <span className="text-[10px] font-mono text-neutral-purple-500">
                        Logged Depth:{" "}
                        <strong className="text-neutral-purple-900 tabular-nums">
                          {item.waterLevel > 0 ? "+" : ""}
                          {item.waterLevel.toFixed(1)} cm
                        </strong>
                      </span>
                    </td>

                    {/* Severity Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isCritical ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FDF0ED] text-[#7A1C18] border border-red-200">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          <span>CRITICAL</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FDF5E6] text-[#7A4D05] border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>WARNING</span>
                        </span>
                      )}
                    </td>

                    {/* Telemetry Source */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-purple-700">
                        <Radio className="w-3.5 h-3.5 text-primary-green-600" />
                        <span>{item.telemetrySource}</span>
                      </div>
                    </td>

                    {/* Detected At */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono tabular-nums text-[11px] text-neutral-purple-600">
                      {new Date(item.detectedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      <span className="text-neutral-purple-400">
                        {new Date(item.detectedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </span>
                    </td>

                    {/* Action: Inspect Plot */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setInspectingItem(item);
                          onInspectPlot?.(item.plotId);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-green-800 bg-primary-green-50 hover:bg-primary-green-100 border border-primary-green-200 transition-colors shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-primary-green-700" />
                        <span>Inspect Plot</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-over Inspection Modal */}
      {inspectingItem && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E2DFEA] rounded-2xl max-w-lg w-full shadow-2xl p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2DFEA]">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-xl border ${
                    inspectingItem.severity === "CRITICAL"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {inspectingItem.severity === "CRITICAL" ? (
                    <AlertOctagon className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-purple-900">
                    Plot Anomaly Inspection: {inspectingItem.plotId.toUpperCase()}
                  </h3>
                  <p className="text-xs text-neutral-purple-500 font-mono">
                    {inspectingItem.telemetrySource}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectingItem(null)}
                className="p-1 rounded-lg text-neutral-purple-400 hover:text-neutral-purple-700 hover:bg-[#F8F7FA] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Farmer & Plot Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F8F7FA] p-3 rounded-xl border border-[#E2DFEA]">
              <div>
                <span className="text-neutral-purple-500 font-medium flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Farmer
                </span>
                <span className="font-bold text-neutral-purple-900 mt-0.5 block">
                  {inspectingItem.farmerName}
                </span>
              </div>
              <div>
                <span className="text-neutral-purple-500 font-medium flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Contact
                </span>
                <span className="font-mono font-semibold text-neutral-purple-800 mt-0.5 block">
                  {inspectingItem.farmerPhone}
                </span>
              </div>
              <div>
                <span className="text-neutral-purple-500 font-medium">Cultivated Variety</span>
                <span className="font-medium text-neutral-purple-900 mt-0.5 block">
                  {inspectingItem.riceVariety}
                </span>
              </div>
              <div>
                <span className="text-neutral-purple-500 font-medium">Recorded Depth</span>
                <span className="font-mono font-bold text-red-700 mt-0.5 block tabular-nums">
                  {inspectingItem.waterLevel > 0 ? "+" : ""}
                  {inspectingItem.waterLevel.toFixed(1)} cm
                </span>
              </div>
            </div>

            {/* Violation Diagnosis */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-purple-800 uppercase tracking-wide">
                Automated MRV Diagnosis
              </label>
              <div className="p-3 rounded-xl bg-[#FDF0ED] border border-red-200 text-xs text-[#7A1C18] leading-relaxed">
                {inspectingItem.flagReason}
              </div>
            </div>

            {/* Recommended Protocol Action */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-purple-800 uppercase tracking-wide">
                Recommended Remediation Protocol
              </label>
              <div className="p-3 rounded-xl bg-primary-green-50 border border-primary-green-200 text-xs text-[#0B4D25] leading-relaxed flex items-start gap-2">
                <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-primary-green-700" />
                <span>{inspectingItem.recommendedAction}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#E2DFEA]">
              <span className="text-[11px] font-mono text-neutral-purple-500">
                Status:{" "}
                <strong className="text-neutral-purple-900 uppercase">
                  {inspectingItem.status}
                </strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkReview(inspectingItem.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-purple-700 hover:text-neutral-purple-900 bg-neutral-purple-100 hover:bg-neutral-purple-200 transition-colors"
                >
                  Mark Under Review
                </button>

                <button
                  onClick={() => handleResolve(inspectingItem.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-primary-green-700 hover:bg-primary-green-800 transition-colors inline-flex items-center gap-1 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolve & Clear Flag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

