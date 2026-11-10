import Link from "next/link";
import { Activity, ShieldCheck, ArrowLeft } from "lucide-react";
import { AuthCarousel } from "./AuthCarousel";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Column: Visual & Thematic Carousel (50% width on lg screens, hidden on mobile) */}
      <aside className="hidden lg:flex lg:w-1/2 relative min-h-screen">
        <AuthCarousel />
      </aside>

      {/* Right Column: Form Canvas (100% on mobile, 50% on lg) */}
      <main className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-neutral-purple-50/60 border-l border-neutral-purple-200">
        
        {/* Top Header Row with Logo & Return to Home */}
        <div className="flex items-center justify-between pb-8 border-b border-neutral-purple-200">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded bg-primary-green-700 flex items-center justify-center text-white shadow-xs">
              <Activity className="w-4 h-4 text-primary-green-100" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-primary-green-900 group-hover:text-primary-green-700 transition-colors duration-150">
                CarbonTensor
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
                AWD MRV Layer
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-purple-700 hover:text-primary-green-800 transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing</span>
          </Link>
        </div>

        {/* Center Content: Title, Subtitle, and Form */}
        <div className="py-8 sm:py-12 max-w-lg w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="mt-2 text-base text-neutral-purple-800 font-normal leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl border border-neutral-purple-200 p-6 sm:p-8 shadow-xs">
            {children}
          </div>
        </div>

        {/* Bottom Integrity Notice & Simulated Sandbox Badge */}
        <div className="pt-6 border-t border-neutral-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-purple-600 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-green-600" />
            <span>Access Bank Sandbox (Simulated Settlement)</span>
          </div>
          <div>
            <span>© 2026 CarbonTensor • Kebbi State AWD Cohort</span>
          </div>
        </div>

      </main>
    </div>
  );
}
