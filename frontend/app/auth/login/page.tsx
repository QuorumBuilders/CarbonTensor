import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | AgriTensor Portal",
  description: "Sign in to access your Nigerian rice cooperative AWD MRV telemetry and carbon dividend portal.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome to AgriTensor"
      subtitle="Sign in to your cooperative or verifier account to access real-time AWD telemetry, soil sensor checks, and carbon dividend ledgers."
    >
      <LoginForm />
    </AuthLayout>
  );
}
