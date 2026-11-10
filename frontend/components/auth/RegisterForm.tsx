"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, UserCheck, Building2, AlertCircle } from "lucide-react";
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
  const [farmerPassword, setFarmerPassword] = useState("");
  const [farmerConfirmPassword, setFarmerConfirmPassword] = useState("");

  // Cooperative State
  const [coopName, setCoopName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [coopPhone, setCoopPhone] = useState("");
  const [coopAddress, setCoopAddress] = useState("");
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
        setError("Registration could not be completed. Please check your information.");
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
          address: coopAddress,
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
    <div className="space-y-6">
      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-purple-100 rounded-lg border border-neutral-purple-200">
        <button
          type="button"
          onClick={() => {
            setAccountType("farmer");
            setError(null);
          }}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-semibold transition-all duration-150 ${
            accountType === "farmer"
              ? "bg-white text-primary-green-900 shadow-xs border border-neutral-purple-200"
              : "text-neutral-purple-700 hover:text-neutral-purple-900"
          }`}
        >
          <UserCheck className="w-4 h-4 text-primary-green-700" />
          <span>[Join as Farmer]</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setAccountType("cooperative");
            setError(null);
          }}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-semibold transition-all duration-150 ${
            accountType === "cooperative"
              ? "bg-white text-primary-green-900 shadow-xs border border-neutral-purple-200"
              : "text-neutral-purple-700 hover:text-neutral-purple-900"
          }`}
        >
          <Building2 className="w-4 h-4 text-primary-green-700" />
          <span>[Register Cooperative]</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-status-error-bg text-status-error-text border border-status-error-text/20 rounded-md text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {accountType === "farmer" ? (
          // ==================== Farmer Form Fields ====================
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Aminu"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Bello"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                placeholder="+234 802 345 6789"
                className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  ID Type
                </label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value as "NIN" | "VOTER_ID")}
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                >
                  <option value="NIN">NIN</option>
                  <option value="VOTER_ID">Voter ID</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Identity Number
                </label>
                <input
                  type="text"
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="NIN-98765432101"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={farmerPassword}
                  onChange={(e) => setFarmerPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={farmerConfirmPassword}
                  onChange={(e) => setFarmerConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
            </div>
          </>
        ) : (
          // ==================== Cooperative Form Fields ====================
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                Cooperative Union Name
              </label>
              <input
                type="text"
                required
                value={coopName}
                onChange={(e) => setCoopName(e.target.value)}
                placeholder="Kebbi Green Rice Growers Cooperative Union"
                className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="KGG-COOP-2024-NG-049"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  value={coopPhone}
                  onChange={(e) => setCoopPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                Official Contact Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="info@kebbigreenrice.org"
                className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                Cooperative Head Office Address
              </label>
              <input
                type="text"
                required
                value={coopAddress}
                onChange={(e) => setCoopAddress(e.target.value)}
                placeholder="Argungu Cluster, Rima River Basin, Kebbi State, Nigeria"
                className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={coopPassword}
                  onChange={(e) => setCoopPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={coopConfirmPassword}
                  onChange={(e) => setCoopConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 text-base rounded-md border border-neutral-purple-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-orange-500 focus:ring-1 focus:ring-accent-orange-500 transition-colors duration-150"
                />
              </div>
            </div>
          </>
        )}

        {/* Single Crisp Consent Line */}
        <p className="text-xs text-neutral-purple-600 leading-relaxed font-normal pt-1">
          By continuing, you agree to CarbonTensor AWD telemetry monitoring and cooperative dividend rules.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 px-4 rounded-md text-base font-semibold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 disabled:opacity-50 transition-all duration-150 flex items-center justify-center gap-2 shadow-xs hover:shadow-sm"
        >
          <span>{loading ? "Creating Account..." : "Create Account"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Switch to Login */}
        <div className="pt-4 border-t border-neutral-purple-200 text-center">
          <p className="text-sm text-neutral-purple-700">
            Already registered on CarbonTensor?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-primary-green-700 hover:text-primary-green-900 hover:underline"
            >
              Sign In to Portal
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
