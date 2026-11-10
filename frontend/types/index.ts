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
// Financial Entities: Access Bank Sandbox Payouts
// ==========================================

export interface FarmerBonus {
  id: string;
  farmer: string;
  farmer_name: string;
  cooperative: string;
  cultivation_cycle: string;
  plot: string;
  carbon_avoided_tco2e_est: number; // strict tCO2e (est.) per honesty rules
  gross_amount_ngn: number;
  farmer_net_ngn: number; // 70% farmer share
  cooperative_fee_ngn: number; // 15% cooperative share
  platform_fee_ngn: number; // 15% platform/verifier share
  calculation_date: string;
  status: "PENDING" | "APPROVED" | "DISBURSED" | "FAILED";
}

export interface Payment {
  id: string;
  bonus: string;
  recipient_farmer: string;
  account_number: string;
  bank_name: string;
  transaction_reference: string;
  amount_ngn: number;
  disbursed_at: string;
  status: "SIMULATED_SUCCESS" | "PENDING" | "FAILED";
  simulation_environment: "Access Bank Sandbox (Simulated)";
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
