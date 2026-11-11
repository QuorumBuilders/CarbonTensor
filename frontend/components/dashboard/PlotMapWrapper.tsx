"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { Plot } from "@/types";
import { MapPin, Loader2 } from "lucide-react";

interface PlotMapProps {
  plots?: Plot[];
  selectedPlotId?: string | null;
  onSelectPlot?: (plotId: string) => void;
}

function MapSkeleton() {
  return (
    <div
      aria-label="Loading Agricultural Basin Boundary Map"
      className="w-full h-[520px] rounded-xl border border-neutral-purple-200 bg-neutral-purple-50 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#E2DFEA_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      <div className="z-10 flex flex-col items-center gap-3 p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary-green-50 border border-primary-green-200 flex items-center justify-center text-primary-green-700 shadow-xs animate-pulse">
          <MapPin className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-neutral-purple-900">
            <Loader2 className="w-4 h-4 text-primary-green-700 animate-spin" />
            <span>Initializing Argungu Basin GIS Layer</span>
          </div>
          <p className="text-xs text-neutral-purple-500 max-w-sm">
            Rendering high-precision AWD plot polygons and sensor telemetry coordinates...
          </p>
        </div>
      </div>
    </div>
  );
}

const DynamicPlotMap = dynamic(
  () => import("./PlotMap").then((mod) => mod.PlotMap),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

export function PlotMapWrapper(props: PlotMapProps) {
  // Stable instance key: generated once on first render, never changes.
  // This prevents React from remounting the Leaflet container on SPA navigation
  // while still giving Leaflet a stable DOM node to attach to.
  const instanceKeyRef = useRef<string | null>(null);
  if (instanceKeyRef.current === null) {
    instanceKeyRef.current = "argungu-basin-map-singleton";
  }
  return <DynamicPlotMap key={instanceKeyRef.current} {...props} />;
}
