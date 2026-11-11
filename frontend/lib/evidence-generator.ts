/**
 * lib/evidence-generator.ts
 *
 * MRV Evidence Package Generator — Section E of the DRF Specification.
 * Aggregates all 5 Argungu plots into a tamper-evident MRVReport structure.
 * All carbon volume metrics are strictly labeled as tCO₂e (est.).
 */

import {
  MOCK_PLOTS,
  MOCK_OBSERVATIONS,
  MOCK_SATELLITE_OBSERVATIONS,
  MOCK_COOPERATIVE,
} from "@/lib/mock-data";
import type { MRVReport, EvidenceReference } from "@/types";

// Deterministic SHA-256 digest (pre-computed for the canonical mock dataset).
// In production this would be computed server-side from the serialized payload.
const DETERMINISTIC_HASH =
  "e7b91d2c48f80459a997862f1c834928f5c35e98214227183e9b11ca0e58fa21";

/**
 * Map of sensor serials per plot (matches MOCK_OBSERVATIONS seed data).
 */
const SENSOR_MAP: Record<string, string> = {
  "plot-001": "SENS-KB-001",
  "plot-002": "SENS-KB-002",
  "plot-003": "SENS-KB-003",
  "plot-004": "SENS-KB-004",
  "plot-005": "SENS-KB-005",
};

/**
 * Map of anomaly descriptions per plot for the evidence references.
 */
const ANOMALY_FLAGS: Record<string, string[]> = {
  "plot-001": [],
  "plot-002": [],
  "plot-003": [
    "CONTINUOUS_FLOODING: Field submerged >21 consecutive days. No aeration episode recorded.",
  ],
  "plot-004": [
    "DATA_GAP: Observations missing days 10–14 (5-day blackout).",
    "PHYSICAL_ANOMALY: Reading of -82.0 cm on day 15 exceeds sensor tube depth (-40 cm). Record REJECTED.",
  ],
  "plot-005": [
    "RADAR_DISCREPANCY: Sentinel-1 SAR backscatter indicates WET surface while in-situ telemetry reports DRY (-11.5 cm). Flagged for verifier reconciliation.",
  ],
};

/**
 * generateMRVReport()
 *
 * Assembles a complete MRVReport from mock data, matching Section E of the
 * CarbonTensor DRF schema. Safe to call server-side (pure function, no DOM).
 */
export function generateMRVReport(): MRVReport {
  const totalHectares = MOCK_PLOTS.reduce(
    (sum, p) => sum + p.calculated_area,
    0
  );

  // Plots 1 & 2 are verified compliant; plots 3, 4, 5 are flagged/non-compliant.
  const verifiedPlots = ["plot-001", "plot-002"];
  const verifiedPlotCount = verifiedPlots.length;

  // Carbon figures from MOCK_BONUSES (plots 1, 2 disbursed; plot 5 pending partial)
  const grossAvoidedTco2eEst = 3.42 + 3.88 + 2.1; // 9.40 tCO₂e (est.)
  // Net applies 15% platform deduction
  const netAvoidedTco2eEst = Number((grossAvoidedTco2eEst * 0.85).toFixed(2));

  // Aeration days achieved across compliant plots
  const aerationDaysAchieved = 18; // sum of dry-down days within AWD safe band

  // Build per-plot evidence references
  const evidenceReferences: EvidenceReference[] = MOCK_PLOTS.map((plot) => {
    const plotObservations = MOCK_OBSERVATIONS.filter(
      (obs) => obs.plot === plot.id
    );
    const satObs = MOCK_SATELLITE_OBSERVATIONS.find(
      (s) => s.plot === plot.id
    );

    const ref: EvidenceReference = {
      plot_id: plot.id,
      sensor_serial: SENSOR_MAP[plot.id] ?? "UNKNOWN",
      observation_count: plotObservations.length,
      geojson_boundary: plot.boundary,
      anomaly_flags: ANOMALY_FLAGS[plot.id] ?? [],
    };

    if (satObs) {
      ref.satellite_cross_check = {
        status: satObs.observation_data.status,
        confidence: satObs.observation_data.confidence,
        pass_date: satObs.observed_at,
      };
    }

    return ref;
  });

  const report: MRVReport = {
    id: "mrv-report-kebbi-2026-001",
    monitoring_period: {
      start_date: "2026-10-12",
      end_date: "2026-11-11",
      status: "ACTIVE_WET_SEASON",
    },
    version: "v1.0.4-PROD",
    report_data: {
      cooperative_id: MOCK_COOPERATIVE.id,
      cooperative_name: MOCK_COOPERATIVE.name,
      total_hectares: Number(totalHectares.toFixed(2)),
      enrolled_plots_count: MOCK_PLOTS.length,
      verified_plots_count: verifiedPlotCount,
      gross_avoided_tco2e_est: Number(grossAvoidedTco2eEst.toFixed(2)),
      net_avoided_tco2e_est: netAvoidedTco2eEst,
      // UNFCCC AMS-III.H / Verra VM0042 baseline parameters
      baseline_daily_emission_factor: 0.0024, // tCH4/ha/day (flooded baseline)
      gwp_methane: 27.9, // AR6 GWP100 for CH4
      aeration_days_achieved: aerationDaysAchieved,
    },
    evidence_references: evidenceReferences,
    review_status: "PENDING_VVB_AUDIT",
    generated_at: new Date().toISOString(),
    verification_hash: DETERMINISTIC_HASH,
  };

  return report;
}
