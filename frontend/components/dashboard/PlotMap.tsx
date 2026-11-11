"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MOCK_PLOTS } from "@/lib/mock-data";
import type { Plot } from "@/types";
import {
  enrichPlots,
  type PlotEnriched,
  type PlotComplianceStatus,
} from "@/lib/plot-utils";
import {
  ShieldCheck,
  AlertTriangle,
  Radio,
  Satellite,
  Layers,
  Info,
} from "lucide-react";

export { enrichPlots, type PlotEnriched, type PlotComplianceStatus };

const STATUS_STYLES: Record<
  PlotComplianceStatus,
  {
    pathOptions: {
      color: string;
      fillColor: string;
      fillOpacity: number;
      weight: number;
    };
    badgeClass: string;
    icon: typeof ShieldCheck;
  }
> = {
  COMPLIANT: {
    pathOptions: {
      color: "#3F8851", // Tertiary Green
      fillColor: "#0B4D25", // Base Green
      fillOpacity: 0.35,
      weight: 2,
    },
    badgeClass: "bg-status-success-bg text-status-success-text border-primary-green-300",
    icon: ShieldCheck,
  },
  NON_COMPLIANT: {
    pathOptions: {
      color: "#7A1C18", // Error Red
      fillColor: "#FDF0ED",
      fillOpacity: 0.6,
      weight: 2.5,
    },
    badgeClass: "bg-status-error-bg text-status-error-text border-red-300",
    icon: AlertTriangle,
  },
  SENSOR_FAULT: {
    pathOptions: {
      color: "#7A4D05", // Warning Amber
      fillColor: "#FDF5E6",
      fillOpacity: 0.6,
      weight: 2.5,
    },
    badgeClass: "bg-status-warning-bg text-status-warning-text border-amber-300",
    icon: Radio,
  },
  RADAR_DISCREPANCY: {
    pathOptions: {
      color: "#F15A24", // Accent Orange
      fillColor: "#FDF0EB",
      fillOpacity: 0.6,
      weight: 2.5,
    },
    badgeClass: "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-300",
    icon: Satellite,
  },
};

interface PlotMapProps {
  plots?: Plot[];
  selectedPlotId?: string | null;
  onSelectPlot?: (plotId: string) => void;
}

// Argungu / Kebbi coordinates center
const MAP_CENTER: [number, number] = [12.741, 4.533];

export function PlotMap({
  plots = MOCK_PLOTS,
  selectedPlotId,
  onSelectPlot,
}: PlotMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const enrichedPlots = enrichPlots(plots);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredPlots = enrichedPlots.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLIANT") return p.complianceStatus === "COMPLIANT";
    if (filter === "NON_COMPLIANT") return p.complianceStatus === "NON_COMPLIANT";
    if (filter === "ANOMALY")
      return p.complianceStatus === "SENSOR_FAULT" || p.complianceStatus === "RADAR_DISCREPANCY";
    return true;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const container = mapContainerRef.current;

    // Guaranteed lifecycle safety: Remove existing instance and clean up container ID
    // This permanently prevents Leaflet's "Map container is being reused by another instance" error
    // during fast route navigation in Next.js SPA transitions.
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    if ((container as unknown as { _leaflet_id?: number })._leaflet_id) {
      delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
    }

    const map = L.map(container, {
      center: MAP_CENTER,
      zoom: 14,
      scrollWheelZoom: false,
    });

    // CartoDB Voyager Tile Layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);

    filteredPlots.forEach((plot) => {
      const coords = plot.boundary.coordinates[0].map(
        ([lng, lat]) => [lat, lng] as [number, number]
      );
      const style = STATUS_STYLES[plot.complianceStatus];
      const isSelected = selectedPlotId === plot.id;

      const polygon = L.polygon(coords, {
        color: isSelected ? "#F15A24" : style.pathOptions.color,
        fillColor: style.pathOptions.fillColor,
        fillOpacity: style.pathOptions.fillOpacity,
        weight: isSelected ? 4 : style.pathOptions.weight,
      });

      polygon.on("click", () => {
        onSelectPlot?.(plot.id);
      });

      const warningHtml =
        plot.complianceStatus === "NON_COMPLIANT"
          ? `<div style="padding:6px;background:#FDF0ED;border-radius:6px;font-size:11px;color:#7A1C18;line-height:1.2;margin-bottom:6px;">Continuous submersion exceeds 21 days limit. Methane avoidance dividend withheld.</div>`
          : plot.complianceStatus === "RADAR_DISCREPANCY"
          ? `<div style="padding:6px;background:#FDF0EB;border-radius:6px;font-size:11px;color:#CE4312;line-height:1.2;margin-bottom:6px;">Sentinel-1 Radar flags wet standing water while sensor reports dry. Flagged for verifier review.</div>`
          : "";

      const statusBadgeStyle =
        plot.complianceStatus === "COMPLIANT"
          ? "background:#EAF3ED;color:#0B4D25;border-color:#6DAB6C;"
          : plot.complianceStatus === "NON_COMPLIANT"
          ? "background:#FDF0ED;color:#7A1C18;border-color:#FCA5A5;"
          : plot.complianceStatus === "SENSOR_FAULT"
          ? "background:#FDF5E6;color:#7A4D05;border-color:#FCD34D;"
          : "background:#FDF0EB;color:#CE4312;border-color:#FDBA74;";

      const popupHtml = `
        <div style="padding:2px;max-width:240px;color:#2D253B;font-family:inherit;">
          <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E2DFEA;padding-bottom:6px;margin-bottom:6px;">
            <span style="font-family:monospace;font-weight:bold;font-size:12px;color:#0B4D25;">${plot.id.toUpperCase()}</span>
            <span style="display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;border:1px solid;${statusBadgeStyle}">
              ${plot.statusLabel}
            </span>
          </div>

          <div style="font-size:11px;line-height:1.6;margin-bottom:6px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:#787287;">Farmer:</span><strong>${plot.farmerName}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#787287;">Rice Variety:</span><span>${plot.rice_variety}</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#787287;">Area:</span><strong style="font-variant-numeric:tabular-nums;">${plot.calculated_area.toFixed(2)} ha</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#787287;">Live Water:</span><strong style="font-family:monospace;font-variant-numeric:tabular-nums;">${plot.currentWaterLevel > 0 ? "+" : ""}${plot.currentWaterLevel.toFixed(1)} cm</strong></div>
          </div>

          ${warningHtml}

          <div style="padding-top:4px;display:flex;align-items:center;justify-content:space-between;font-size:10px;color:#787287;border-top:1px solid #F0EEF5;">
            <span>AWD Drying: ${plot.dryingEpisodeDays} days</span>
            <span style="color:#0B4D25;font-weight:bold;">Select Plot &rarr;</span>
          </div>
        </div>
      `;

      polygon.bindPopup(popupHtml, { className: "carbontensor-map-popup" });
      polygon.addTo(layerGroup);

      // Centroid Marker
      const centerLat = coords.reduce((acc, c) => acc + c[0], 0) / coords.length;
      const centerLng = coords.reduce((acc, c) => acc + c[1], 0) / coords.length;

      const marker = L.circleMarker([centerLat, centerLng], {
        radius: 4,
        color: style.pathOptions.color,
        fillColor: "#FFFFFF",
        fillOpacity: 1,
        weight: 2,
      });
      marker.addTo(layerGroup);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      if ((container as unknown as { _leaflet_id?: number })._leaflet_id) {
        delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
      }
    };
  }, [filteredPlots, selectedPlotId, onSelectPlot]);

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-neutral-purple-200 shadow-xs bg-neutral-purple-50 flex flex-col">
      {/* Top Map Control Bar */}
      <div className="z-10 bg-white/95 backdrop-blur-xs px-4 py-2.5 border-b border-neutral-purple-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary-green-700 flex items-center justify-center text-white">
            <Layers className="w-3 h-3" />
          </div>
          <div>
            <span className="font-bold text-neutral-purple-900">
              Argungu Rice Basin Cluster
            </span>
            <span className="ml-2 text-neutral-purple-500 font-mono text-[11px]">
              12.741° N, 4.533° E
            </span>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1 bg-neutral-purple-100 p-0.5 rounded-lg">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              filter === "ALL"
                ? "bg-white text-primary-green-900 shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            All ({enrichedPlots.length})
          </button>
          <button
            onClick={() => setFilter("COMPLIANT")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              filter === "COMPLIANT"
                ? "bg-white text-primary-green-800 shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            Compliant
          </button>
          <button
            onClick={() => setFilter("NON_COMPLIANT")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              filter === "NON_COMPLIANT"
                ? "bg-white text-status-error-text shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            Violations
          </button>
          <button
            onClick={() => setFilter("ANOMALY")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              filter === "ANOMALY"
                ? "bg-white text-status-warning-text shadow-xs"
                : "text-neutral-purple-600 hover:text-neutral-purple-900"
            }`}
          >
            Anomalies
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas Div with Ref */}
      <div className="relative flex-1 w-full min-h-0">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Satellite Honesty Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-neutral-purple-200/90 shadow-xs flex items-center gap-1.5 text-[11px] text-neutral-purple-700 max-w-sm">
          <Satellite className="w-3.5 h-3.5 text-primary-green-600 shrink-0" />
          <span>
            Sentinel-1 Radar Cross-Check (Sample) • European Space Agency Copernicus
          </span>
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-neutral-purple-200/90 shadow-xs space-y-1 text-[11px]">
          <div className="font-bold text-neutral-purple-900 flex items-center gap-1 pb-1 border-b border-neutral-purple-100">
            <Info className="w-3 h-3 text-neutral-purple-500" />
            <span>Map Legend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-primary-green-700 border border-primary-green-500 inline-block" />
            <span className="text-neutral-purple-700">AWD Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-100 border border-red-700 inline-block" />
            <span className="text-neutral-purple-700">Flooding Violation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-700 inline-block" />
            <span className="text-neutral-purple-700">Sensor Fault</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-orange-100 border border-orange-600 inline-block" />
            <span className="text-neutral-purple-700">Radar Discrepancy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
