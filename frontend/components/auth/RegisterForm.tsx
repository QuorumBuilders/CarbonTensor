"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconUser,
  IconBuildingCommunity,
  IconAlertCircle,
  IconArrowRight,
} from "@tabler/icons-react";
import { api } from "@/lib/api/endpoints";

type AccountType = "farmer" | "cooperative";

export function RegisterForm() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("farmer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Farmer State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [idType, setIdType] = useState<"NIN" | "VOTER_ID">("NIN");
  const [idNumber, setIdNumber] = useState("");
  const [coopAffiliation, setCoopAffiliation] = useState("Kebbi Green Rice Growers Union");
  const [plotArea, setPlotArea] = useState("1.5");
  const [farmerPassword, setFarmerPassword] = useState("");
  const [farmerConfirmPassword, setFarmerConfirmPassword] = useState("");

  // Cooperative State
  const [coopName, setCoopName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [clusterLga, setClusterLga] = useState("Argungu / Rima River Basin");
  const [contactEmail, setContactEmail] = useState("");
  const [coopPhone, setCoopPhone] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [coopPassword, setCoopPassword] = useState("");
  const [coopConfirmPassword, setCoopConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (accountType === "farmer") {
      if (farmerPassword !== farmerConfirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      setLoading(true);
      try {
        await api.auth.registerFarmer({
          account_type: "farmer",
          first_name: firstName,
          last_name: lastName,
          phone_number: farmerPhone,
          identity_information: {
            id_type: idType,
            id_number: idNumber,
          },
          password: farmerPassword,
        });
        router.push("/dashboard");
      } catch {
        setError("Registration could not be completed. Please verify your information.");
      } finally {
        setLoading(false);
      }
    } else {
      if (coopPassword !== coopConfirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      setLoading(true);
      try {
        await api.auth.registerCooperative({
          account_type: "cooperative",
          name: coopName,
          registration_number: regNumber,
          contact_email: contactEmail,
          phone: coopPhone,
          address: clusterLga,
          password: coopPassword,
        });
        router.push("/dashboard");
      } catch {
        setError("Cooperative registration could not be completed.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-muted rounded-control border border-border font-mono text-xs">
        <button
          type="button"
          onClick={() => {
            setAccountType("farmer");
            setError(null);
          }}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-control font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            accountType === "farmer"
              ? "bg-card text-foreground border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <IconUser size={14} stroke={1.5} className="text-brand" />
          <span>Smallholder Farmer</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setAccountType("cooperative");
            setError(null);
          }}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-control font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            accountType === "cooperative"
              ? "bg-card text-foreground border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <IconBuildingCommunity size={14} stroke={1.5} className="text-brand" />
          <span>Cooperative Union</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-status-error-bg text-status-error-fg border border-status-error-fg/30 rounded-control text-xs font-mono flex items-center gap-2">
          <IconAlertCircle size={15} stroke={1.5} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {accountType === "farmer" ? (
          // ==================== Farmer Form Fields ====================
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Aminu"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Bello"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-foreground">
                Mobile Phone (For USSD *384# &amp; SMS)
              </label>
              <input
                type="tel"
                required
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                placeholder="+234 802 345 6789"
                className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  ID Type
                </label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value as "NIN" | "VOTER_ID")}
                  className="w-full h-9 px-2 text-sm rounded-control border border-border bg-background text-foreground focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                >
                  <option value="NIN">NIN</option>
                  <option value="VOTER_ID">Voter ID</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Identity Number (as on Bank Account)
                </label>
                <input
                  type="text"
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="23489102931"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Cooperative Affiliation
                </label>
                <select
                  value={coopAffiliation}
                  onChange={(e) => setCoopAffiliation(e.target.value)}
                  className="w-full h-9 px-2 text-xs rounded-control border border-border bg-background text-foreground focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                >
                  <option value="Kebbi Green Rice Growers Union">Kebbi Green Rice Union</option>
                  <option value="Argungu Rima River Basin Cluster">Argungu Rima Cluster</option>
                  <option value="RIFAN Kebbi State Chapter">RIFAN Kebbi Chapter</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Plot Area Estimate (ha)
                </label>
                <input
                  type="text"
                  required
                  value={plotArea}
                  onChange={(e) => setPlotArea(e.target.value)}
                  placeholder="1.5"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={farmerPassword}
                  onChange={(e) => setFarmerPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={farmerConfirmPassword}
                  onChange={(e) => setFarmerConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
            </div>
          </>
        ) : (
          // ==================== Cooperative Form Fields ====================
          <>
            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-foreground">
                Cooperative Union Name
              </label>
              <input
                type="text"
                required
                value={coopName}
                onChange={(e) => setCoopName(e.target.value)}
                placeholder="Kebbi Green Rice Growers Cooperative Union"
                className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Registration Number (CAC / Ministry)
                </label>
                <input
                  type="text"
                  required
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="KGG-COOP-2024-NG-049"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Operating Cluster &amp; LGA
                </label>
                <input
                  type="text"
                  required
                  value={clusterLga}
                  onChange={(e) => setClusterLga(e.target.value)}
                  placeholder="Argungu / Rima River Basin"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Official Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="admin@kebbigreenrice.org"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Primary Phone
                </label>
                <input
                  type="tel"
                  required
                  value={coopPhone}
                  onChange={(e) => setCoopPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-foreground">
                Access Bank Settlement Account Number
              </label>
              <input
                type="text"
                required
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="0123456789 (Access Bank NGN)"
                className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono tabular-nums"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={coopPassword}
                  onChange={(e) => setCoopPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={coopConfirmPassword}
                  onChange={(e) => setCoopConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-9 px-3 text-sm rounded-control border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-150 font-mono"
                />
              </div>
            </div>
          </>
        )}

        {/* Consent Line */}
        <p className="text-[11px] font-mono text-subtle leading-relaxed pt-1">
          By continuing, you agree to CarbonTensor AWD telemetry monitoring and cooperative dividend rules.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 px-4 rounded-control text-sm font-medium text-brand-foreground bg-brand hover:bg-brand-hover active:bg-brand disabled:opacity-50 transition-colors duration-150 flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span>
            {loading
              ? "Submitting Application..."
              : accountType === "farmer"
              ? "Submit Farmer Registration"
              : "Submit Cooperative Application"}
          </span>
          <IconArrowRight
            size={16}
            stroke={1.5}
            className="group-hover:translate-x-0.5 transition-transform duration-150"
          />
        </button>

        {/* Switch to Login */}
        <div className="pt-3 border-t border-border text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Already registered on CarbonTensor?{" "}
            <Link
              href="/auth/login"
              className="text-brand font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control"
            >
              Sign In to Portal
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
