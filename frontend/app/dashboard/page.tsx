"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { PortalShell } from "@/components/shared/PortalShell";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { PlotMapWrapper } from "@/components/dashboard/PlotMapWrapper";
import { PlotsTable } from "@/components/dashboard/PlotsTable";
import { PlotSpotlightCard } from "@/components/dashboard/PlotSpotlightCard";
import { RegisterPlotModal } from "@/components/dashboard/RegisterPlotModal";
import { WaterLevelChart } from "@/components/dashboard/WaterLevelChart";
import { SensorSimulatorBar } from "@/components/dashboard/SensorSimulatorBar";
import { enrichPlots, type PlotEnriched } from "@/lib/plot-utils";
import { MOCK_PLOTS, MOCK_OBSERVATIONS } from "@/lib/mock-data";
import { api, subscribeToObservations } from "@/lib/api/endpoints";
import type { Plot, Observation } from "@/types";
import {
  MapPin,
  Plus,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const [plots, setPlots] = useState<Plot[]>(MOCK_PLOTS);
  const [selectedPlotId, setSelectedPlotId] = useState<string>("plot-001");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [observations, setObservations] = useState<Observation[]>(MOCK_OBSERVATIONS);
  const [flashingPlotId, setFlashingPlotId] = useState<string | null>(null);
  const [waterLevelOverrides, setWaterLevelOverrides] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadPlots() {
      try {
        const response = await api.plots.list();
        if (response.data && response.data.length > 0) {
          setPlots(response.data);
        }
      } catch {
        // Fallback already handled in api client
      }
    }
    loadPlots();
  }, []);

  // Real-time telemetry ingestion handler
  const handleObservationCreated = useCallback((newObs: Observation) => {
    setObservations((prev) => [...prev, newObs]);
    setWaterLevelOverrides((prev) => ({
      ...prev,
      [newObs.plot]: newObs.water_level,
    }));
    setFlashingPlotId(newObs.plot);
    setTimeout(() => {
      setFlashingPlotId(null);
    }, 650);
  }, []);

  // Subscribe to in-memory DRF mutations and custom dispatch events
  useEffect(() => {
    const unsubscribe = subscribeToObservations((newObs) => {
      handleObservationCreated(newObs);
    });

    const handleSelectPlotEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ plotId: string }>;
      if (customEvent.detail?.plotId) {
        setSelectedPlotId(customEvent.detail.plotId);
      }
    };
    window.addEventListener("carbontensor:select-plot", handleSelectPlotEvent);

    return () => {
      unsubscribe();
      window.removeEventListener("carbontensor:select-plot", handleSelectPlotEvent);
    };
  }, [handleObservationCreated]);

  const enrichedPlots = enrichPlots(plots);
  const baseSelectedPlot: PlotEnriched =
    enrichedPlots.find((p) => p.id === selectedPlotId) || enrichedPlots[0];

  // Dynamically reflect live telemetry on the spotlight card
  const selectedPlot: PlotEnriched = useMemo(() => {
    const overridden = waterLevelOverrides[selectedPlotId];
    if (overridden === undefined) return baseSelectedPlot;

    let waterStatusText = baseSelectedPlot.waterStatusText;
    if (overridden < -40) {
      waterStatusText = `Sensor Fault Anomaly (${overridden.toFixed(1)} cm)`;
    } else if (overridden > 0) {
      waterStatusText = `Submerged / Flooded (+${overridden.toFixed(1)} cm)`;
    } else {
      waterStatusText = `Safe AWD Drying (${overridden.toFixed(1)} cm)`;
    }

    return {
      ...baseSelectedPlot,
      currentWaterLevel: overridden,
      waterStatusText,
    };
  }, [baseSelectedPlot, selectedPlotId, waterLevelOverrides]);

  const handlePlotRegistered = (newPlot: Plot) => {
    setPlots((prev) => [newPlot, ...prev]);
    setSelectedPlotId(newPlot.id);
  };

  return (
    <PortalShell
      cooperativeName="Kebbi Green Rice Growers Union"
      roleBadge="Cooperative Admin"
    >
      <div className="space-y-6">
        {/* Union Overview Banner */}
        <div className="bg-white border border-neutral-purple-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
                <Building2 className="w-3.5 h-3.5 text-primary-green-700" />
                <span>Union Hub • KGG-COOP-2024-NG-049</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-purple-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-neutral-purple-400" />
                <span>Argungu Cluster, Kebbi State, Nigeria</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-purple-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-purple-400" />
                <span>2026 Wet Season Cycle</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-purple-900">
              Kebbi Green Rice Growers Cooperative Union
            </h1>
            <p className="text-xs sm:text-sm text-neutral-purple-600 max-w-2xl">
              Scalable Alternate Wetting and Drying (AWD) MRV verification layer. Monitoring in-situ piezometers, cross-checking Sentinel-1 SAR moisture, and distributing carbon dividends to smallholders.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll New Plot</span>
            </button>

            <Link
              href="/verifier"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-primary-green-800 bg-white hover:bg-primary-green-50 border border-neutral-purple-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-primary-green-700" />
              <span>MRV Verifier</span>
            </Link>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <MetricCards />

        {/* Interactive Field Telemetry Ingestion Simulator */}
        <section aria-label="Field Telemetry Transmission Simulator">
          <SensorSimulatorBar
            activePlotId={selectedPlotId}
            onObservationCreated={handleObservationCreated}
          />
        </section>

        {/* Spatial Map & Spotlight Inspection 2-Column Grid */}
        <section
          aria-label="Spatial Paddy Monitoring and Sensor Telemetry"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Map Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <PlotMapWrapper
              plots={plots}
              selectedPlotId={selectedPlotId}
              onSelectPlot={(id) => setSelectedPlotId(id)}
            />
          </div>

          {/* Inspection Spotlight Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <PlotSpotlightCard plot={selectedPlot} />
          </div>
        </section>

        {/* 30-Day In-situ AWD Water-Level Time Series Chart */}
        <section id="water-chart" aria-label="AWD Water Level Time Series Telemetry">
          <WaterLevelChart
            selectedPlotId={selectedPlotId}
            onSelectPlot={(id) => setSelectedPlotId(id)}
            observations={observations}
          />
        </section>

        {/* Enrolled Plots Roster Table */}
        <section aria-label="Enrolled Plots Ledger" id="plots">
          <PlotsTable
            plots={plots}
            selectedPlotId={selectedPlotId}
            onSelectPlot={(id) => setSelectedPlotId(id)}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            flashingPlotId={flashingPlotId}
            waterLevelOverrides={waterLevelOverrides}
          />
        </section>
      </div>

      {/* Modal Dialog: Enroll Plot */}
      <RegisterPlotModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onPlotRegistered={handlePlotRegistered}
      />
    </PortalShell>
  );
}
