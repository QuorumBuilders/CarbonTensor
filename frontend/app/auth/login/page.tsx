import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | CarbonTensor MRV Portal",
  description:
    "Access real-time AWD water level telemetry, inspect flagged sensor anomalies, and manage seasonal carbon dividend disbursements for the Kebbi State cohort.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to the CarbonTensor MRV Portal"
      subtitle="Access real-time AWD water level telemetry, inspect flagged sensor anomalies, and manage seasonal carbon dividend disbursements for the Kebbi State cohort."
    >
      <LoginForm />
    </AuthLayout>
  );
}
