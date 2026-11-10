import type { ApiResponse, ApiError } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  mockFallback?: () => Promise<unknown> | unknown;
}

export class ApiClient {
  private static getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      const session = localStorage.getItem("carbontensor_session");
      if (!session) return null;
      const parsed = JSON.parse(session);
      return parsed.token || null;
    } catch {
      return null;
    }
  }

  private static shouldUseMock(): boolean {
    // Explicit override via environment variable
    if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") return true;
    if (process.env.NEXT_PUBLIC_USE_MOCK_API === "false") return false;
    // Default to true in client development when backend is not running
    return true;
  }

  static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, mockFallback, ...fetchOptions } = options;

    // Fast path: if explicitly configured to use mock data and a fallback is provided
    if (this.shouldUseMock() && mockFallback) {
      const mockResult = await mockFallback();
      return {
        data: mockResult as T,
        meta: { source: "mock-fixture", timestamp: new Date().toISOString() },
      };
    }

    // Build URL with query params
    let url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes("?") ? "&" : "?") + queryString;
      }
    }

    // Default headers with auth
    const token = this.getStoredToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        let errorData: ApiError;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            error: {
              code: `HTTP_${response.status}`,
              message: response.statusText || "An API error occurred",
            },
          };
        }
        throw errorData;
      }

      const json = await response.json();
      // If server already wrapped in DRF envelope
      if (json && typeof json === "object" && "data" in json) {
        return json as ApiResponse<T>;
      }
      return { data: json as T };
    } catch (err) {
      // If network fails (e.g. backend not running) and a mock fallback is available, fallback gracefully
      if (mockFallback) {
        const fallbackData = await mockFallback();
        return {
          data: fallbackData as T,
          meta: { source: "network-error-fallback", timestamp: new Date().toISOString() },
        };
      }
      throw err;
    }
  }

  static async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  static async post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}
