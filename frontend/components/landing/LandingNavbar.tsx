import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-none border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-primary-green-700 flex items-center justify-center text-white">
                <Activity className="w-5 h-5 text-primary-green-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-primary-green-900 group-hover:text-primary-green-700 transition-colors">
                  TensorCarbon
                </span>
                <span className="text-[11px] font-medium text-primary-green-600 tracking-wide uppercase">
                  AWD Aggregation & MRV Layer
                </span>
              </div>
            </Link>

            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-primary-green-800 bg-primary-green-50 border border-primary-green-200 rounded">
              <ShieldCheck className="w-3 h-3 text-primary-green-600" />
              Access Bank Sandbox (Simulated)
            </span>
          </div>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-purple-900">
            <a
              href="#problem"
              className="hover:text-primary-green-700 transition-colors"
            >
              Problem
            </a>
            <a
              href="#how-it-works"
              className="hover:text-primary-green-700 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#value-chain"
              className="hover:text-primary-green-700 transition-colors"
            >
              Value Chain
            </a>
            <a
              href="#payout-split"
              className="hover:text-primary-green-700 transition-colors"
            >
              Payout Split
            </a>
            <a
              href="#roadmap"
              className="hover:text-primary-green-700 transition-colors"
            >
              Roadmap
            </a>
            <a
              href="#claims"
              className="hover:text-primary-green-700 transition-colors"
            >
              Transparency FAQ
            </a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-sm font-bold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-colors shadow-sm"
            >
              <span>View Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
