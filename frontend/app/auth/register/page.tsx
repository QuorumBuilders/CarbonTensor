import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register Account | CarbonTensor",
  description: "Register your smallholder rice plot or cooperative union for verified AWD carbon finance in Nigeria.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Join the AWD MRV Network"
      subtitle="Register your rice farming plot or onboard your cooperative union to start measuring water levels and earning verified carbon dividends."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
