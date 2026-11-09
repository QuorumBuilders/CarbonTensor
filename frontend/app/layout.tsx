import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TensorCarbon | AWD Methane Avoidance & Payout Layer",
  description:
    "Supply-side data and payout layer aggregating Nigerian rice cooperatives to verify methane avoidance from Alternate Wetting and Drying (AWD) farming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-white text-primary-green-900 selection:bg-primary-green-100 selection:text-primary-green-900">
        {children}
      </body>
    </html>
  );
}
