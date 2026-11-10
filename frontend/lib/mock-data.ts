import type {
  Cooperative,
  Farmer,
  Plot,
  CultivationCycle,
  Observation,
  SatelliteObservation,
  FarmerBonus,
  Payment,
  User,
} from "@/types";

// ============================================================================
// 1. Seed Users & Cooperative
// ============================================================================

export const MOCK_USERS: User[] = [
  {
    id: "usr-coop-admin",
    email: "admin@kebbigreenrice.org",
    account_type: "cooperative",
    is_active: true,
    created_at: "2024-03-15T08:00:00Z",
  },
  {
    id: "usr-verifier",
    email: "verifier@africarice-audit.org",
    account_type: "staff",
    is_active: true,
    created_at: "2024-04-01T09:30:00Z",
  },
  {
    id: "usr-farmer-01",
    email: "aminu.bello@kebbigreenrice.org",
    account_type: "farmer",
    is_active: true,
    created_at: "2024-04-10T10:00:00Z",
  },
  {
    id: "usr-farmer-02",
    email: "fatima.usman@kebbigreenrice.org",
    account_type: "farmer",
    is_active: true,
    created_at: "2024-04-10T10:15:00Z",
  },
  {
    id: "usr-farmer-03",
    email: "sanusi.garba@kebbigreenrice.org",
    account_type: "farmer",
    is_active: true,
    created_at: "2024-04-10T10:30:00Z",
  },
  {
    id: "usr-farmer-04",
    email: "balarabe.yusuf@kebbigreenrice.org",
    account_type: "farmer",
    is_active: true,
    created_at: "2024-04-10T10:45:00Z",
  },
  {
    id: "usr-farmer-05",
    email: "zainab.aliyu@kebbigreenrice.org",
    account_type: "farmer",
    is_active: true,
    created_at: "2024-04-10T11:00:00Z",
  },
];

export const MOCK_COOPERATIVE: Cooperative = {
  id: "coop-kebbi-01",
  name: "Kebbi Green Rice Growers Cooperative Union",
  registration_number: "KGG-COOP-2024-NG-049",
  contact_information: {
    email: "info@kebbigreenrice.org",
    phone: "+234 803 123 4567",
    contact_person: "Alhaji Ibrahim Danladi (Union Chairman)",
  },
  address: "Argungu Cluster, Rima River Basin, Kebbi State, Nigeria",
  status: "ACTIVE",
  created_at: "2024-03-15T08:00:00Z",
};

// ============================================================================
// 2. Seed Farmers
// ============================================================================

export const MOCK_FARMERS: Farmer[] = [
  {
    id: "farmer-001",
    user: "usr-farmer-01",
    cooperative: "coop-kebbi-01",
    first_name: "Aminu",
    last_name: "Bello",
    phone_number: "+234 802 345 6789",
    identity_information: {
      id_type: "NIN",
      id_number: "NIN-98765432101",
    },
    registration_status: "REGISTERED",
    verification_status: "VERIFIED",
    created_at: "2024-04-10T10:00:00Z",
  },
  {
    id: "farmer-002",
    user: "usr-farmer-02",
    cooperative: "coop-kebbi-01",
    first_name: "Fatima",
    last_name: "Usman",
    phone_number: "+234 803 456 7890",
    identity_information: {
      id_type: "NIN",
      id_number: "NIN-98765432102",
    },
    registration_status: "REGISTERED",
    verification_status: "VERIFIED",
    created_at: "2024-04-10T10:15:00Z",
  },
  {
    id: "farmer-003",
    user: "usr-farmer-03",
    cooperative: "coop-kebbi-01",
    first_name: "Sanusi",
    last_name: "Garba",
    phone_number: "+234 805 567 8901",
    identity_information: {
      id_type: "VOTER_ID",
      id_number: "VTR-10293847503",
    },
    registration_status: "REGISTERED",
    verification_status: "FLAGGED", // non-compliant continuous flooding
    created_at: "2024-04-10T10:30:00Z",
  },
  {
    id: "farmer-004",
    user: "usr-farmer-04",
    cooperative: "coop-kebbi-01",
    first_name: "Balarabe",
    last_name: "Yusuf",
    phone_number: "+234 807 678 9012",
    identity_information: {
      id_type: "NIN",
      id_number: "NIN-98765432104",
    },
    registration_status: "REGISTERED",
    verification_status: "FLAGGED", // faulty sensor
    created_at: "2024-04-10T10:45:00Z",
  },
  {
    id: "farmer-005",
    user: "usr-farmer-05",
    cooperative: "coop-kebbi-01",
    first_name: "Zainab",
    last_name: "Aliyu",
    phone_number: "+234 809 789 0123",
    identity_information: {
      id_type: "NIN",
      id_number: "NIN-98765432105",
    },
    registration_status: "REGISTERED",
    verification_status: "FLAGGED", // radar discrepancy
    created_at: "2024-04-10T11:00:00Z",
  },
];

// ============================================================================
// 3. Seed 5 Demo Plots in Kebbi State (Argungu Cluster)
// ============================================================================

export const MOCK_PLOTS: Plot[] = [
  {
    id: "plot-001",
    farm: "Argungu Rice Basin Parcel A1",
    cooperative: "coop-kebbi-01",
    farmer: "farmer-001",
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [4.5215, 12.742],
          [4.5255, 12.7422],
          [4.5252, 12.7385],
          [4.5211, 12.7383],
          [4.5215, 12.742],
        ],
      ],
    },
    calculated_area: 1.85,
    rice_variety: "FARO 44 (Sippi)",
    registration_status: "REGISTERED",
    activity_status: "ACTIVE",
    created_at: "2024-04-12T08:00:00Z",
  },
  {
    id: "plot-002",
    farm: "Argungu Rice Basin Parcel A2",
    cooperative: "coop-kebbi-01",
    farmer: "farmer-002",
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [4.526, 12.7425],
          [4.5302, 12.7428],
          [4.53, 12.739],
          [4.5258, 12.7388],
          [4.526, 12.7425],
        ],
      ],
    },
    calculated_area: 2.1,
    rice_variety: "FARO 52 (Wita 4)",
    registration_status: "REGISTERED",
    activity_status: "ACTIVE",
    created_at: "2024-04-12T08:30:00Z",
  },
  {
    id: "plot-003",
    farm: "Argungu Rice Basin Parcel B1 (Non-compliant)",
    cooperative: "coop-kebbi-01",
    farmer: "farmer-003",
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [4.531, 12.743],
          [4.5348, 12.7432],
          [4.5345, 12.7395],
          [4.5307, 12.7393],
          [4.531, 12.743],
        ],
      ],
    },
    calculated_area: 1.4,
    rice_variety: "FARO 44 (Sippi)",
    registration_status: "REGISTERED",
    activity_status: "ACTIVE",
    created_at: "2024-04-12T09:00:00Z",
  },
  {
    id: "plot-004",
    farm: "Argungu Rice Basin Parcel B2 (Faulty Sensor)",
    cooperative: "coop-kebbi-01",
    farmer: "farmer-004",
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [4.5355, 12.7435],
          [4.5398, 12.7438],
          [4.5395, 12.7401],
          [4.5352, 12.7398],
          [4.5355, 12.7435],
        ],
      ],
    },
    calculated_area: 1.65,
    rice_variety: "FARO 52 (Wita 4)",
    registration_status: "REGISTERED",
    activity_status: "ACTIVE",
    created_at: "2024-04-12T09:30:00Z",
  },
  {
    id: "plot-005",
    farm: "Argungu Rice Basin Parcel C1 (Radar Disagree)",
    cooperative: "coop-kebbi-01",
    farmer: "farmer-005",
    boundary: {
      type: "Polygon",
      coordinates: [
        [
          [4.5405, 12.744],
          [4.5452, 12.7443],
          [4.5448, 12.7405],
          [4.5401, 12.7402],
          [4.5405, 12.744],
        ],
      ],
    },
    calculated_area: 2.3,
    rice_variety: "FARO 44 (Sippi)",
    registration_status: "REGISTERED",
    activity_status: "ACTIVE",
    created_at: "2024-04-12T10:00:00Z",
  },
];

// ============================================================================
// 4. Seed Active Cultivation Cycles
// ============================================================================

export const MOCK_CYCLES: CultivationCycle[] = [
  {
    id: "cycle-001",
    plot: "plot-001",
    planting_date: "2026-09-15T00:00:00Z",
    rice_variety: "FARO 44 (Sippi)",
    status: "IN_PROGRESS",
  },
  {
    id: "cycle-002",
    plot: "plot-002",
    planting_date: "2026-09-18T00:00:00Z",
    rice_variety: "FARO 52 (Wita 4)",
    status: "IN_PROGRESS",
  },
  {
    id: "cycle-003",
    plot: "plot-003",
    planting_date: "2026-09-20T00:00:00Z",
    rice_variety: "FARO 44 (Sippi)",
    status: "IN_PROGRESS",
  },
  {
    id: "cycle-004",
    plot: "plot-004",
    planting_date: "2026-09-22T00:00:00Z",
    rice_variety: "FARO 52 (Wita 4)",
    status: "IN_PROGRESS",
  },
  {
    id: "cycle-005",
    plot: "plot-005",
    planting_date: "2026-09-25T00:00:00Z",
    rice_variety: "FARO 44 (Sippi)",
    status: "IN_PROGRESS",
  },
];

// ============================================================================
// 5. 30-Day Simulated Water Level Time Series (Deterministic generator)
// ============================================================================

function generate30DayObservations(): Observation[] {
  const observations: Observation[] = [];
  const baseTime = new Date("2026-10-12T00:00:00Z").getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let day = 0; day < 30; day++) {
    const timestamp = new Date(baseTime + day * dayMs).toISOString();

    // Plot 1: Compliant AWD (Oscillates between +4cm and -14cm over ~7-day cycle)
    const cycleDayP1 = day % 8;
    let waterP1 = 4.0;
    if (cycleDayP1 >= 1 && cycleDayP1 <= 5) {
      waterP1 = Number((4.0 - cycleDayP1 * 3.6).toFixed(1)); // drops to -14.0cm
    } else if (cycleDayP1 === 6) {
      waterP1 = 3.5; // re-flooded
    }
    observations.push({
      id: `obs-p1-d${day}`,
      source_type: "IOT_PIEZOMETER",
      sensor: "SENS-KB-001",
      plot: "plot-001",
      cultivation_cycle: "cycle-001",
      observed_at: timestamp,
      water_level: waterP1,
      validation_status: "VALID",
    });

    // Plot 2: Compliant AWD (Oscillates smoothly with offset cycle)
    const cycleDayP2 = (day + 3) % 9;
    let waterP2 = 4.2;
    if (cycleDayP2 >= 1 && cycleDayP2 <= 6) {
      waterP2 = Number((4.2 - cycleDayP2 * 3.0).toFixed(1)); // drops to -13.8cm
    } else if (cycleDayP2 === 7) {
      waterP2 = 4.0; // re-flooded
    }
    observations.push({
      id: `obs-p2-d${day}`,
      source_type: "IOT_PIEZOMETER",
      sensor: "SENS-KB-002",
      plot: "plot-002",
      cultivation_cycle: "cycle-002",
      observed_at: timestamp,
      water_level: waterP2,
      validation_status: "VALID",
    });

    // Plot 3: Non-compliant (Continuously flooded > 0cm for 25+ days; never dried)
    const waterP3 = Number((4.5 + Math.sin(day) * 1.5).toFixed(1)); // always +3.0cm to +6.0cm
    observations.push({
      id: `obs-p3-d${day}`,
      source_type: "IOT_PIEZOMETER",
      sensor: "SENS-KB-003",
      plot: "plot-003",
      cultivation_cycle: "cycle-003",
      observed_at: timestamp,
      water_level: waterP3,
      validation_status: "SUSPICIOUS",
      rejection_reason: "Failed AWD check: field submerged continuously for > 21 days with 0 drying episodes.",
    });

    // Plot 4: Faulty sensor (Days 10-14 missing/gap; Day 15 impossible reading of -82.0cm)
    if (day < 10 || day > 14) {
      let waterP4 = Number((2.0 - (day % 6) * 2.5).toFixed(1));
      let statusP4: "VALID" | "SUSPICIOUS" | "REJECTED" = "VALID";
      let reasonP4: string | undefined = undefined;

      if (day === 15) {
        waterP4 = -82.0; // Impossible reading
        statusP4 = "REJECTED";
        reasonP4 = "Physical anomaly detected: water reading (-82.0 cm) exceeds maximum piezometer tube depth (-40 cm).";
      }

      observations.push({
        id: `obs-p4-d${day}`,
        source_type: "IOT_PIEZOMETER",
        sensor: "SENS-KB-004",
        plot: "plot-004",
        cultivation_cycle: "cycle-004",
        observed_at: timestamp,
        water_level: waterP4,
        validation_status: statusP4,
        rejection_reason: reasonP4,
      });
    }

    // Plot 5: Borderline plot (Sensor reports DRY -11.5cm, but Sentinel-1 flags WET)
    const cycleDayP5 = (day + 1) % 7;
    const waterP5 = cycleDayP5 < 3 ? 3.0 : -11.5;
    observations.push({
      id: `obs-p5-d${day}`,
      source_type: "IOT_PIEZOMETER",
      sensor: "SENS-KB-005",
      plot: "plot-005",
      cultivation_cycle: "cycle-005",
      observed_at: timestamp,
      water_level: waterP5,
      validation_status: day >= 20 ? "SUSPICIOUS" : "VALID",
      rejection_reason: day >= 20 ? "Satellite SAR surface radar contradicts in-situ telemetry." : undefined,
    });
  }

  return observations;
}

export const MOCK_OBSERVATIONS: Observation[] = generate30DayObservations();

// ============================================================================
// 6. Satellite Observations (Sentinel-1 SAR)
// ============================================================================

export const MOCK_SATELLITE_OBSERVATIONS: SatelliteObservation[] = [
  {
    id: "sat-obs-001",
    plot: "plot-001",
    provider: "Sentinel-1 SAR",
    observed_at: "2026-10-28T06:12:00Z",
    observation_data: {
      status: "AGREE",
      confidence: 0.96,
      radar_state: "DRY",
      sensor_state: "DRY",
    },
  },
  {
    id: "sat-obs-002",
    plot: "plot-002",
    provider: "Sentinel-1 SAR",
    observed_at: "2026-10-28T06:12:00Z",
    observation_data: {
      status: "AGREE",
      confidence: 0.94,
      radar_state: "WET",
      sensor_state: "WET",
    },
  },
  {
    id: "sat-obs-003",
    plot: "plot-003",
    provider: "Sentinel-1 SAR",
    observed_at: "2026-10-28T06:12:00Z",
    observation_data: {
      status: "AGREE",
      confidence: 0.98,
      radar_state: "WET",
      sensor_state: "WET", // Both agree it is submerged and never dried
    },
  },
  {
    id: "sat-obs-004",
    plot: "plot-004",
    provider: "Sentinel-1 SAR",
    observed_at: "2026-10-28T06:12:00Z",
    observation_data: {
      status: "DISAGREE",
      confidence: 0.88,
      radar_state: "WET",
      sensor_state: "DRY",
    },
  },
  {
    id: "sat-obs-005",
    plot: "plot-005",
    provider: "Sentinel-1 SAR",
    observed_at: "2026-10-28T06:12:00Z",
    observation_data: {
      status: "DISAGREE", // Disagree case specified in instructions
      confidence: 0.92,
      radar_state: "WET",
      sensor_state: "DRY",
    },
  },
];

// ============================================================================
// 7. Initial Financial Ledger: 70% Farmer / 15% Cooperative / 15% Platform Split
// ============================================================================

export const MOCK_BONUSES: FarmerBonus[] = [
  {
    id: "bon-2026-001",
    farmer: "farmer-001",
    farmer_name: "Aminu Bello",
    cooperative: "coop-kebbi-01",
    cultivation_cycle: "cycle-001",
    plot: "plot-001",
    carbon_avoided_tco2e_est: 3.42, // strict tCO2e (est.)
    gross_amount_ngn: 245000,
    farmer_net_ngn: 171500, // 70%
    cooperative_fee_ngn: 36750, // 15%
    platform_fee_ngn: 36750, // 15%
    calculation_date: "2026-10-30T14:00:00Z",
    status: "DISBURSED",
  },
  {
    id: "bon-2026-002",
    farmer: "farmer-002",
    farmer_name: "Fatima Usman",
    cooperative: "coop-kebbi-01",
    cultivation_cycle: "cycle-002",
    plot: "plot-002",
    carbon_avoided_tco2e_est: 3.88, // strict tCO2e (est.)
    gross_amount_ngn: 278000,
    farmer_net_ngn: 194600, // 70%
    cooperative_fee_ngn: 41700, // 15%
    platform_fee_ngn: 41700, // 15%
    calculation_date: "2026-10-30T14:00:00Z",
    status: "DISBURSED",
  },
  {
    id: "bon-2026-003",
    farmer: "farmer-003",
    farmer_name: "Sanusi Garba",
    cooperative: "coop-kebbi-01",
    cultivation_cycle: "cycle-003",
    plot: "plot-003",
    carbon_avoided_tco2e_est: 0.0, // Non-compliant: 0 tCO2e
    gross_amount_ngn: 0,
    farmer_net_ngn: 0,
    cooperative_fee_ngn: 0,
    platform_fee_ngn: 0,
    calculation_date: "2026-10-30T14:00:00Z",
    status: "FAILED",
  },
  {
    id: "bon-2026-004",
    farmer: "farmer-004",
    farmer_name: "Balarabe Yusuf",
    cooperative: "coop-kebbi-01",
    cultivation_cycle: "cycle-004",
    plot: "plot-004",
    carbon_avoided_tco2e_est: 0.0, // Sensor anomaly
    gross_amount_ngn: 0,
    farmer_net_ngn: 0,
    cooperative_fee_ngn: 0,
    platform_fee_ngn: 0,
    calculation_date: "2026-10-30T14:00:00Z",
    status: "FAILED",
  },
  {
    id: "bon-2026-005",
    farmer: "farmer-005",
    farmer_name: "Zainab Aliyu",
    cooperative: "coop-kebbi-01",
    cultivation_cycle: "cycle-005",
    plot: "plot-005",
    carbon_avoided_tco2e_est: 2.1,
    gross_amount_ngn: 150000,
    farmer_net_ngn: 105000,
    cooperative_fee_ngn: 22500,
    platform_fee_ngn: 22500,
    calculation_date: "2026-10-30T14:00:00Z",
    status: "PENDING", // Pending verifier reconciliation
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-sbx-001",
    bonus: "bon-2026-001",
    recipient_farmer: "farmer-001",
    account_number: "0048192831",
    bank_name: "Access Bank Nigeria",
    transaction_reference: "ACC-SBX-2026-NG-88912",
    amount_ngn: 171500,
    disbursed_at: "2026-10-31T09:15:22Z",
    status: "SIMULATED_SUCCESS",
    simulation_environment: "Access Bank Sandbox (Simulated)",
  },
  {
    id: "pay-sbx-002",
    bonus: "bon-2026-002",
    recipient_farmer: "farmer-002",
    account_number: "0059281722",
    bank_name: "Access Bank Nigeria",
    transaction_reference: "ACC-SBX-2026-NG-88913",
    amount_ngn: 194600,
    disbursed_at: "2026-10-31T09:15:45Z",
    status: "SIMULATED_SUCCESS",
    simulation_environment: "Access Bank Sandbox (Simulated)",
  },
];
