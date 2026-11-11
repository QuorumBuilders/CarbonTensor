import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarbonTensor | Scalable AWD Methane Avoidance & Payout Layer",
  description:
    "Aggregating Nigerian rice cooperatives to verify AWD water cycles, package registry-ready MRV evidence, and disburse carbon dividends to smallholders.",
  keywords: [
    "CarbonTensor",
    "AWD",
    "Methane Avoidance",
    "Carbon MRV",
    "Rice Farming",
    "Nigeria",
    "Climate Finance",
  ],
  openGraph: {
    title: "CarbonTensor — AWD Methane Avoidance Layer",
    description:
      "Supply-side data and payout infrastructure for Nigerian rice cooperatives.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans bg-white text-primary-green-900 selection:bg-primary-green-100 selection:text-primary-green-900">
        {children}
      </body>
    </html>
  );
}
