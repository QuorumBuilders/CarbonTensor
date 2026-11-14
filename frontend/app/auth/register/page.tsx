import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Nigerian AWD Carbon Cohort",
  description:
    "Onboard smallholder rice paddies or register your cooperative union to start logging water levels and earning verified carbon revenue.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Register for the Nigerian AWD Carbon Cohort"
      subtitle="Onboard smallholder rice paddies or register your cooperative union to start logging water levels and earning verified carbon revenue."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
