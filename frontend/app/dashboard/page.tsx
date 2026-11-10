"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/shared/AppHeader";
import { DemoController } from "@/components/shared/DemoController";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { PlotMapWrapper } from "@/components/dashboard/PlotMapWrapper";
import { PlotsTable } from "@/components/dashboard/PlotsTable";
import { PlotSpotlightCard } from "@/components/dashboard/PlotSpotlightCard";
import { RegisterPlotModal } from "@/components/dashboard/RegisterPlotModal";
import { enrichPlots, type PlotEnriched } from "@/components/dashboard/PlotMap";
import { MOCK_PLOTS } from "@/lib/mock-data";
import { api } from "@/lib/api/endpoints";
import type { Plot } from "@/types";
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

  const enrichedPlots = enrichPlots(plots);
  const selectedPlot: PlotEnriched =
    enrichedPlots.find((p) => p.id === selectedPlotId) || enrichedPlots[0];

  const handlePlotRegistered = (newPlot: Plot) => {
    setPlots((prev) => [newPlot, ...prev]);
    setSelectedPlotId(newPlot.id);
  };

  return (
    <div className="min-h-screen bg-neutral-purple-50/50 flex flex-col font-sans pb-28">
      {/* Universal Portal Top Navigation */}
      <AppHeader
        cooperativeName="Kebbi Green Rice Growers Union"
        roleBadge="Cooperative Admin"
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
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

        {/* Enrolled Plots Roster Table */}
        <section aria-label="Enrolled Plots Ledger" id="plots">
          <PlotsTable
            plots={plots}
            selectedPlotId={selectedPlotId}
            onSelectPlot={(id) => setSelectedPlotId(id)}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          />
        </section>
      </main>

      {/* Modal Dialog: Enroll Plot */}
      <RegisterPlotModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onPlotRegistered={handlePlotRegistered}
      />

      {/* Sticky Presentation Controller */}
      <DemoController />
    </div>
  );
}
