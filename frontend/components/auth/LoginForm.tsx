"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";
import { api } from "@/lib/api/endpoints";
import { DEMO_PERSONAS, setStoredSession } from "@/lib/mock-data";
import type { PersonaRole } from "@/types";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PersonaRole>("cooperative");

  // Quick-fill presets for demo evaluation
  const handleQuickFill = (role: PersonaRole) => {
    setError(null);
    setSelectedPersona(role);
    const persona = DEMO_PERSONAS[role];
    setEmail(persona.email);
    setPassword("demo-password-2026");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const emailLower = email.toLowerCase();
      let effectiveRole: PersonaRole = selectedPersona;
      if (
        emailLower.includes("verifier") ||
        emailLower.includes("audit") ||
        emailLower.includes("staff")
      ) {
        effectiveRole = "staff";
      } else if (
        emailLower.includes("usman") ||
        emailLower.includes("farmer") ||
        emailLower.includes("argungu")
      ) {
        effectiveRole = "farmer";
      } else if (emailLower.includes("coop") || emailLower.includes("admin")) {
        effectiveRole = "cooperative";
      }

      setStoredSession(effectiveRole);

      try {
        await api.auth.login({ email, password });
      } catch {
        // Mock fallback session
      }

      const destination = DEMO_PERSONAS[effectiveRole].destination;
      router.push(destination);
    } catch {
      setError("Invalid credentials. Please verify your email or select a demo preset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Demo Fast Presets Bar */}
      <div className="p-3 bg-muted/60 border border-border rounded-control space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span className="font-medium text-foreground flex items-center gap-1.5">
            <IconCheck size={14} stroke={1.5} className="text-brand" />
            Evaluation Presets
          </span>
          <span className="text-subtle">1-click demo fill</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickFill("cooperative")}
            className={`text-xs font-mono font-medium py-1.5 px-2 rounded-control border text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              selectedPersona === "cooperative" && email === DEMO_PERSONAS.cooperative.email
                ? "bg-brand text-brand-foreground border-brand"
                : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            [Coop Admin]
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("staff")}
            className={`text-xs font-mono font-medium py-1.5 px-2 rounded-control border text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              selectedPersona === "staff" && email === DEMO_PERSONAS.staff.email
                ? "bg-brand text-brand-foreground border-brand"
                : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            [Field Verifier]
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("farmer")}
            className={`text-xs font-mono font-medium py-1.5 px-2 rounded-control border text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              selectedPersona === "farmer" && email === DEMO_PERSONAS.farmer.email
                ? "bg-brand text-brand-foreground border-brand"
                : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            [Farmer Wallet]
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-status-error-bg text-status-error-fg border border-status-error-fg/30 rounded-control text-xs font-mono flex items-center gap-2">
          <IconAlertCircle size={15} stroke={1.5} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-mono font-medium text-foreground">
          Work or Cooperative Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <IconMail size={16} stroke={1.5} />
          </div>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@kebbigreenrice.org"
            className="w-full h-10 pl-9 pr-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-xs font-mono font-medium text-foreground">
            Password
          </label>
          <button
            type="button"
            onClick={() => alert("In sandbox demo mode, any password or quick-fill button will authenticate.")}
            className="text-xs font-mono text-muted-foreground hover:text-brand focus-visible:outline-none focus-visible:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <IconLock size={16} stroke={1.5} />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full h-10 pl-9 pr-9 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground focus-visible:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <IconEyeOff size={16} stroke={1.5} /> : <IconEye size={16} stroke={1.5} />}
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
          className="h-4 w-4 rounded-control border-border text-brand focus:ring-brand"
        />
        <label htmlFor="remember-me" className="ml-2 block text-xs font-mono text-muted-foreground select-none">
          Keep me signed in for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 px-4 rounded-control text-sm font-medium text-brand-foreground bg-brand hover:bg-brand-hover active:bg-brand disabled:opacity-50 transition-colors duration-150 flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
        <IconArrowRight
          size={16}
          stroke={1.5}
          className="group-hover:translate-x-0.5 transition-transform duration-150"
        />
      </button>

      {/* Switch to Register */}
      <div className="pt-3 border-t border-border text-center">
        <p className="text-xs font-mono text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-brand font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control"
          >
            Register a cooperative plot
          </Link>
        </p>
      </div>
    </form>
  );
}
