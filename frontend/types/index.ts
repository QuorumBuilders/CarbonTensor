import type { Polygon } from "geojson";

// ==========================================
// Standard API v1 Response Envelopes
// ==========================================

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// ==========================================
// Domain Entities (Strict snake_case DRF Models)
// ==========================================

export type AccountType = "farmer" | "cooperative" | "staff";

export interface User {
  id: string;
  email: string;
  account_type: AccountType;
  is_active: boolean;
  created_at: string;
}

export interface Cooperative {
  id: string;
  name: string;
  registration_number: string;
  contact_information: {
    email: string;
    phone: string;
    contact_person?: string;
  };
  address: string;
  status: "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED";
  created_at: string;
}

export interface Farmer {
  id: string;
  user: string;
  cooperative?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  identity_information: {
    id_type: "NIN" | "VOTER_ID" | "BVN";
    id_number: string;
  };
  registration_status: "REGISTERED" | "PENDING" | "REJECTED";
  verification_status: "VERIFIED" | "UNVERIFIED" | "FLAGGED";
  created_at: string;
}

export interface Plot {
  id: string;
  farm: string;
  cooperative?: string;
  farmer?: string;
  boundary: Polygon;
  calculated_area: number; // in hectares
  rice_variety: string;
  registration_status: "REGISTERED" | "PENDING_SURVEY" | "REJECTED";
  activity_status: "ACTIVE" | "FALLOW" | "HARVESTED";
  created_at: string;
}

export interface CultivationCycle {
  id: string;
  plot: string;
  planting_date: string;
  harvesting_date?: string;
  rice_variety: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  cancellation_reason?: string;
}

export interface Observation {
  id: string;
  source_type: "IOT_PIEZOMETER" | "MANUAL_PANI_PIPE" | "HYBRID";
  sensor?: string;
  plot: string;
  cultivation_cycle: string;
  observed_at: string;
  water_level: number; // in cm, relative to soil surface (0cm)
  validation_status: "VALID" | "SUSPICIOUS" | "REJECTED";
  rejection_reason?: string;
}

export interface SatelliteObservation {
  id: string;
  plot: string;
  provider: "Sentinel-1 SAR" | "Landsat-8" | "PlanetScope";
  observed_at: string;
  observation_data: {
    status: "AGREE" | "DISAGREE";
    confidence: number;
    radar_state: "WET" | "DRY";
    sensor_state: "WET" | "DRY";
  };
}

// ==========================================
// Financial Entities: Access Bank Sandbox Payouts (Section G DRF Models)
// ==========================================

export interface FarmerBonus {
  id: string;
  farmer: string; // UUID of farmer
  farmer_name: string;
  plot_id: string;
  amount: number;
  currency: string; // "USD" & "NGN"
  status: "PENDING" | "APPROVED" | "DISBURSED" | "FAILED";
  calculation_reference: string;
  created_at: string;
  // Backward compatibility fields
  plot?: string;
  cooperative?: string;
  cultivation_cycle?: string;
  carbon_avoided_tco2e_est?: number; // strict tCO2e (est.) per honesty rules
  gross_amount_ngn?: number;
  farmer_net_ngn?: number; // 70% farmer share
  cooperative_fee_ngn?: number; // 15% cooperative share
  platform_fee_ngn?: number; // 15% platform/verifier share
  calculation_date?: string;
}

export interface CooperativeCommission {
  id: string;
  cooperative: string; // UUID of cooperative
  cooperative_name: string;
  amount: number;
  currency: string;
  status: "PENDING" | "APPROVED" | "DISBURSED";
  calculation_reference: string;
  created_at: string;
}

export interface Payment {
  id: string;
  beneficiary_type: "farmer" | "cooperative";
  beneficiary_id: string;
  beneficiary_name: string;
  bank_name: string;
  account_number: string;
  amount: number;
  currency: string;
  payment_provider: string; // "Access Bank Sandbox"
  provider_reference: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "SIMULATED_SUCCESS";
  initiated_at: string;
  completed_at?: string;
  // Backward compatibility fields
  bonus?: string;
  recipient_farmer?: string;
  transaction_reference?: string;
  amount_ngn?: number;
  disbursed_at?: string;
  simulation_environment?: "Access Bank Sandbox (Simulated)";
}

// ==========================================
// Auth & Session Models
// ==========================================

export interface AuthSession {
  token: string;
  user: User;
  cooperative?: Cooperative;
  farmer?: Farmer;
}

export type PersonaRole = "cooperative" | "staff" | "farmer";

export interface MockUserSession {
  role: PersonaRole;
  name: string;
  organization: string;
  token: string;
  user?: User;
  cooperative?: Cooperative;
  farmer?: Farmer;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface FarmerRegisterPayload {
  account_type: "farmer";
  first_name: string;
  last_name: string;
  phone_number: string;
  identity_information: {
    id_type: "NIN" | "VOTER_ID";
    id_number: string;
  };
  password: string;
  cooperative_id?: string;
}

export interface CooperativeRegisterPayload {
  account_type: "cooperative";
  name: string;
  registration_number: string;
  contact_email: string;
  phone: string;
  address: string;
  password: string;
}

// ==========================================
// MRV Evidence Package — Section E (DRF Schema)
// ==========================================

export interface EvidenceReference {
  plot_id: string;
  sensor_serial: string;
  observation_count: number;
  geojson_boundary: object;
  anomaly_flags: string[];
  satellite_cross_check?: {
    status: string;
    confidence: number;
    pass_date: string;
  };
}

export interface MRVReport {
  id: string;
  monitoring_period: {
    start_date: string;
    end_date: string;
    status: string;
  };
  version: string;
  report_data: {
    cooperative_id: string;
    cooperative_name: string;
    total_hectares: number;
    enrolled_plots_count: number;
    verified_plots_count: number;
    gross_avoided_tco2e_est: number;
    net_avoided_tco2e_est: number;
    baseline_daily_emission_factor: number;
    gwp_methane: number;
    aeration_days_achieved: number;
  };
  evidence_references: EvidenceReference[];
  review_status: "PENDING_VVB_AUDIT" | "FINALIZED" | "SUBMITTED_TO_REGISTRY";
  generated_at: string;
  verification_hash: string;
}
