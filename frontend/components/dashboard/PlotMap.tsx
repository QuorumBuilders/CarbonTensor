"use client";

import { useState, Fragment } from "react";
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker } from "react-leaflet";
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

let mapContainerCount = 0;

export function PlotMap({
  plots = MOCK_PLOTS,
  selectedPlotId,
  onSelectPlot,
}: PlotMapProps) {
  // Fresh container key per component mount prevents "Map container is being reused"
  // when navigating across client routes in Next.js SPA transitions.
  const [containerKey] = useState(() => `map-canvas-v${++mapContainerCount}`);
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

  // Argungu / Kebbi coordinates center
  const mapCenter: [number, number] = [12.741, 4.533];

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

      {/* Leaflet Map Canvas */}
      <div className="relative flex-1 w-full min-h-0">
        <MapContainer
          key={containerKey}
          center={mapCenter}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          {/* CartoDB Voyager Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {filteredPlots.map((plot) => {
            const coords = plot.boundary.coordinates[0].map(
              ([lng, lat]) => [lat, lng] as [number, number]
            );
            const style = STATUS_STYLES[plot.complianceStatus];
            const isSelected = selectedPlotId === plot.id;

            // Centroid approx for marker
            const centerLat = coords.reduce((acc, c) => acc + c[0], 0) / coords.length;
            const centerLng = coords.reduce((acc, c) => acc + c[1], 0) / coords.length;

            return (
              <Fragment key={plot.id}>
                <Polygon
                  positions={coords}
                  pathOptions={{
                    ...style.pathOptions,
                    weight: isSelected ? 4 : style.pathOptions.weight,
                    color: isSelected ? "#F15A24" : style.pathOptions.color,
                  }}
                  eventHandlers={{
                    click: () => onSelectPlot?.(plot.id),
                  }}
                >
                  <Popup className="carbontensor-map-popup">
                    <div className="p-1 space-y-2 max-w-xs text-neutral-purple-900">
                      <div className="flex items-center justify-between gap-2 border-b border-neutral-purple-200 pb-1.5">
                        <span className="font-mono font-bold text-xs text-primary-green-900">
                          {plot.id.toUpperCase()}
                        </span>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${style.badgeClass}`}
                        >
                          {plot.statusLabel}
                        </span>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-purple-500">Farmer:</span>
                          <span className="font-semibold">{plot.farmerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-purple-500">Rice Variety:</span>
                          <span className="font-medium">{plot.rice_variety}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-purple-500">Area:</span>
                          <span className="font-bold tabular-nums">
                            {plot.calculated_area.toFixed(2)} ha
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-purple-500">Live Water:</span>
                          <span className="font-mono font-bold tabular-nums">
                            {plot.currentWaterLevel > 0 ? "+" : ""}
                            {plot.currentWaterLevel.toFixed(1)} cm
                          </span>
                        </div>
                      </div>

                      {plot.complianceStatus === "NON_COMPLIANT" && (
                        <div className="p-1.5 bg-status-error-bg rounded text-[11px] text-status-error-text leading-tight">
                          Continuous submersion exceeds 21 days limit. Methane avoidance dividend withheld.
                        </div>
                      )}

                      {plot.complianceStatus === "RADAR_DISCREPANCY" && (
                        <div className="p-1.5 bg-accent-orange-50 rounded text-[11px] text-accent-orange-700 leading-tight">
                          Sentinel-1 Radar flags wet standing water while sensor reports dry. Flagged for verifier review.
                        </div>
                      )}

                      <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-purple-500">
                        <span>AWD Drying: {plot.dryingEpisodeDays} days</span>
                        <button
                          onClick={() => onSelectPlot?.(plot.id)}
                          className="text-primary-green-700 font-bold hover:underline"
                        >
                          View Telemetry &rarr;
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Polygon>

                {/* Plot Centroid Sensor Marker */}
                <CircleMarker
                  center={[centerLat, centerLng]}
                  radius={4}
                  pathOptions={{
                    color: style.pathOptions.color,
                    fillColor: "#FFFFFF",
                    fillOpacity: 1,
                    weight: 2,
                  }}
                />
              </Fragment>
            );
          })}
        </MapContainer>

        {/* Satellite Honesty Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-1000 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-neutral-purple-200/90 shadow-xs flex items-center gap-1.5 text-[11px] text-neutral-purple-700 max-w-sm">
          <Satellite className="w-3.5 h-3.5 text-primary-green-600 shrink-0" />
          <span>
            Sentinel-1 Radar Cross-Check (Sample) • European Space Agency Copernicus
          </span>
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-3 right-3 z-1000 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-neutral-purple-200/90 shadow-xs space-y-1 text-[11px]">
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
