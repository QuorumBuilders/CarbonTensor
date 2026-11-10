"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api/endpoints";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quick-fill presets for demo evaluation
  const handleQuickFill = (type: "admin" | "verifier") => {
    setError(null);
    if (type === "admin") {
      setEmail("admin@kebbigreenrice.org");
      setPassword("demo-password-2026");
    } else {
      setEmail("verifier@africarice-audit.org");
      setPassword("demo-password-2026");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.auth.login({ email, password });
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials. Please verify your email or use a demo quick-fill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Demo Quick-Fill Bar */}
      <div className="p-3 bg-primary-green-50/70 border border-primary-green-200 rounded-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-green-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary-green-600" />
            Rapid Judging Presets
          </span>
          <span className="text-xs font-mono text-primary-green-700">1-click demo fill</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("admin")}
            className="text-xs font-medium py-1 px-3 rounded-md bg-white text-primary-green-800 border border-primary-green-300 hover:bg-primary-green-100 hover:border-primary-green-500 transition-colors duration-150"
          >
            [Demo: Cooperative Admin]
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("verifier")}
            className="text-xs font-medium py-1 px-3 rounded-md bg-white text-primary-green-800 border border-primary-green-300 hover:bg-primary-green-100 hover:border-primary-green-500 transition-colors duration-150"
          >
            [Demo: Field Verifier]
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-status-error-bg text-status-error-text border border-status-error-text/20 rounded-md text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-purple-500">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@kebbigreenrice.org"
            className="w-full h-11 pl-10 pr-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-800">
            Password
          </label>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("In sandbox demo mode, please use any password or quick-fill.");
            }}
            className="text-xs font-mono text-accent-orange-600 hover:text-accent-orange-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-purple-500">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 pl-10 pr-10 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-purple-500 hover:text-neutral-purple-800"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-purple-300 text-primary-green-700 focus:ring-primary-green-600"
        />
        <label htmlFor="remember-me" className="ml-2.5 block text-xs font-mono text-neutral-purple-700 select-none">
          Remember session credentials on this device
        </label>
      </div>

      {/* Single Crisp Consent Line */}
      <p className="text-xs text-neutral-purple-600 leading-relaxed font-normal">
        By continuing, you agree to CarbonTensor AWD telemetry monitoring and cooperative dividend rules.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 px-4 rounded-md text-base font-semibold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 disabled:opacity-50 transition-all duration-150 flex items-center justify-center gap-2 shadow-xs hover:shadow-sm"
      >
        <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Switch to Register */}
      <div className="pt-4 border-t border-neutral-purple-200 text-center">
        <p className="text-sm text-neutral-purple-700">
          New to CarbonTensor?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-primary-green-700 hover:text-primary-green-900 hover:underline"
          >
            Register your plot or cooperative
          </Link>
        </p>
      </div>
    </form>
  );
}
