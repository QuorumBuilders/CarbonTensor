import { ApiClient } from "./client";
import {
  MOCK_USERS,
  MOCK_COOPERATIVE,
  MOCK_FARMERS,
  MOCK_PLOTS,
  MOCK_OBSERVATIONS,
  MOCK_SATELLITE_OBSERVATIONS,
  MOCK_BONUSES,
  MOCK_PAYMENTS,
} from "@/lib/mock-data";
import type {
  ApiResponse,
  AuthSession,
  LoginPayload,
  FarmerRegisterPayload,
  CooperativeRegisterPayload,
  Cooperative,
  Plot,
  Observation,
  SatelliteObservation,
  FarmerBonus,
  Payment,
  Farmer,
} from "@/types";

export const api = {
  auth: {
    login: async (credentials: LoginPayload): Promise<ApiResponse<AuthSession>> => {
      return ApiClient.post<AuthSession>("/auth/login/", credentials, {
        mockFallback: () => {
          // Check demo accounts
          const emailLower = credentials.email.toLowerCase();
          const matchedUser = MOCK_USERS.find((u) => u.email.toLowerCase() === emailLower) || {
            id: "usr-demo-custom",
            email: credentials.email,
            account_type: credentials.email.includes("farmer") ? "farmer" : "cooperative",
            is_active: true,
            created_at: new Date().toISOString(),
          };

          const session: AuthSession = {
            token: "demo-jwt-token-agritensor-sandbox",
            user: matchedUser,
            cooperative: MOCK_COOPERATIVE,
            farmer: matchedUser.account_type === "farmer" ? MOCK_FARMERS[0] : undefined,
          };

          if (typeof window !== "undefined") {
            localStorage.setItem("agritensor_session", JSON.stringify(session));
          }

          return session;
        },
      });
    },

    registerFarmer: async (payload: FarmerRegisterPayload): Promise<ApiResponse<AuthSession>> => {
      return ApiClient.post<AuthSession>("/auth/register/farmer/", payload, {
        mockFallback: () => {
          const newFarmer: Farmer = {
            id: `farmer-${Date.now()}`,
            user: `usr-${Date.now()}`,
            cooperative: payload.cooperative_id || "coop-kebbi-01",
            first_name: payload.first_name,
            last_name: payload.last_name,
            phone_number: payload.phone_number,
            identity_information: payload.identity_information,
            registration_status: "REGISTERED",
            verification_status: "VERIFIED",
            created_at: new Date().toISOString(),
          };

          const session: AuthSession = {
            token: `demo-jwt-farmer-${Date.now()}`,
            user: {
              id: newFarmer.user,
              email: `${payload.first_name.toLowerCase()}.${payload.last_name.toLowerCase()}@farm.ng`,
              account_type: "farmer",
              is_active: true,
              created_at: new Date().toISOString(),
            },
            cooperative: MOCK_COOPERATIVE,
            farmer: newFarmer,
          };

          if (typeof window !== "undefined") {
            localStorage.setItem("agritensor_session", JSON.stringify(session));
          }

          return session;
        },
      });
    },

    registerCooperative: async (payload: CooperativeRegisterPayload): Promise<ApiResponse<AuthSession>> => {
      return ApiClient.post<AuthSession>("/auth/register/cooperative/", payload, {
        mockFallback: () => {
          const newCoop: Cooperative = {
            id: `coop-${Date.now()}`,
            name: payload.name,
            registration_number: payload.registration_number,
            contact_information: {
              email: payload.contact_email,
              phone: payload.phone,
            },
            address: payload.address,
            status: "ACTIVE",
            created_at: new Date().toISOString(),
          };

          const session: AuthSession = {
            token: `demo-jwt-coop-${Date.now()}`,
            user: {
              id: `usr-coop-${Date.now()}`,
              email: payload.contact_email,
              account_type: "cooperative",
              is_active: true,
              created_at: new Date().toISOString(),
            },
            cooperative: newCoop,
          };

          if (typeof window !== "undefined") {
            localStorage.setItem("agritensor_session", JSON.stringify(session));
          }

          return session;
        },
      });
    },

    me: async (): Promise<ApiResponse<AuthSession | null>> => {
      return ApiClient.get<AuthSession | null>("/auth/me/", {
        mockFallback: () => {
          if (typeof window === "undefined") return null;
          const stored = localStorage.getItem("agritensor_session");
          if (!stored) {
            // Default demo cooperative admin session for fast judging exploration
            const defaultSession: AuthSession = {
              token: "demo-jwt-token-agritensor-sandbox",
              user: MOCK_USERS[0],
              cooperative: MOCK_COOPERATIVE,
            };
            return defaultSession;
          }
          return JSON.parse(stored);
        },
      });
    },

    logout: async (): Promise<void> => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("agritensor_session");
      }
    },
  },

  cooperatives: {
    get: async (id: string): Promise<ApiResponse<Cooperative>> => {
      return ApiClient.get<Cooperative>(`/cooperatives/${id}/`, {
        mockFallback: () => MOCK_COOPERATIVE,
      });
    },
  },

  plots: {
    list: async (): Promise<ApiResponse<Plot[]>> => {
      return ApiClient.get<Plot[]>("/plots/", {
        mockFallback: () => MOCK_PLOTS,
      });
    },
    get: async (id: string): Promise<ApiResponse<Plot | undefined>> => {
      return ApiClient.get<Plot | undefined>(`/plots/${id}/`, {
        mockFallback: () => MOCK_PLOTS.find((p) => p.id === id),
      });
    },
  },

  observations: {
    list: async (plotId?: string): Promise<ApiResponse<Observation[]>> => {
      return ApiClient.get<Observation[]>("/observations/", {
        params: plotId ? { plot: plotId } : undefined,
        mockFallback: () => {
          if (plotId) {
            return MOCK_OBSERVATIONS.filter((o) => o.plot === plotId);
          }
          return MOCK_OBSERVATIONS;
        },
      });
    },
  },

  satellite: {
    list: async (plotId?: string): Promise<ApiResponse<SatelliteObservation[]>> => {
      return ApiClient.get<SatelliteObservation[]>("/satellite-observations/", {
        params: plotId ? { plot: plotId } : undefined,
        mockFallback: () => {
          if (plotId) {
            return MOCK_SATELLITE_OBSERVATIONS.filter((s) => s.plot === plotId);
          }
          return MOCK_SATELLITE_OBSERVATIONS;
        },
      });
    },
  },

  bonuses: {
    list: async (): Promise<ApiResponse<FarmerBonus[]>> => {
      return ApiClient.get<FarmerBonus[]>("/farmer-bonuses/", {
        mockFallback: () => MOCK_BONUSES,
      });
    },
  },

  payments: {
    list: async (): Promise<ApiResponse<Payment[]>> => {
      return ApiClient.get<Payment[]>("/payments/", {
        mockFallback: () => MOCK_PAYMENTS,
      });
    },
  },
};
