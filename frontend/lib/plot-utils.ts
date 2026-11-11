import { MOCK_FARMERS } from "@/lib/mock-data";
import type { Plot } from "@/types";

export type PlotComplianceStatus =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | "SENSOR_FAULT"
  | "RADAR_DISCREPANCY";

export interface PlotEnriched extends Plot {
  farmerName: string;
  farmerPhone: string;
  complianceStatus: PlotComplianceStatus;
  statusLabel: string;
  currentWaterLevel: number;
  waterStatusText: string;
  dryingEpisodeDays: number;
}

export function enrichPlots(plots: Plot[]): PlotEnriched[] {
  const farmerMap = new Map(MOCK_FARMERS.map((f) => [f.id, f]));

  return plots.map((p) => {
    const farmer = p.farmer ? farmerMap.get(p.farmer) : undefined;
    const farmerName = farmer
      ? `${farmer.first_name} ${farmer.last_name}`
      : "Enrolled Farmer";
    const farmerPhone = farmer?.phone_number || "+234 800 000 0000";

    let complianceStatus: PlotComplianceStatus = "COMPLIANT";
    let statusLabel = "AWD Compliant";
    let currentWaterLevel = -12.0;
    let waterStatusText = "Optimal Aeration (-12.0 cm)";
    let dryingEpisodeDays = 5;

    if (p.id === "plot-002") {
      complianceStatus = "COMPLIANT";
      statusLabel = "AWD Compliant";
      currentWaterLevel = -10.5;
      waterStatusText = "Active Drying (-10.5 cm)";
      dryingEpisodeDays = 4;
    } else if (p.id === "plot-003") {
      complianceStatus = "NON_COMPLIANT";
      statusLabel = "Continuous Flooding Violation";
      currentWaterLevel = 4.8;
      waterStatusText = "Submerged > 21 Days (+4.8 cm)";
      dryingEpisodeDays = 0;
    } else if (p.id === "plot-004") {
      complianceStatus = "SENSOR_FAULT";
      statusLabel = "Sensor Hardware Fault";
      currentWaterLevel = -82.0;
      waterStatusText = "Signal Out of Bounds (-82.0 cm)";
      dryingEpisodeDays = 0;
    } else if (p.id === "plot-005") {
      complianceStatus = "RADAR_DISCREPANCY";
      statusLabel = "Radar Moisture Discrepancy";
      currentWaterLevel = -11.5;
      waterStatusText = "Sensor -11.5cm / Sentinel-1 WET";
      dryingEpisodeDays = 3;
    }

    return {
      ...p,
      farmerName,
      farmerPhone,
      complianceStatus,
      statusLabel,
      currentWaterLevel,
      waterStatusText,
      dryingEpisodeDays,
    };
  });
}

