import Link from "next/link";
import { Activity, ShieldCheck } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-primary-green-900 text-white border-t border-primary-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-primary-green-800/80">
          
          {/* Brand Identity */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary-green-700 flex items-center justify-center text-white">
                <Activity className="w-5 h-5 text-primary-green-100" />
              </div>
              <span className="font-extrabold text-xl text-white">
                TensorCarbon
              </span>
            </div>
            <p className="text-sm text-primary-green-200 max-w-sm leading-relaxed font-normal">
              Supply-side data and payout layer aggregating Nigerian rice cooperatives to verify methane avoidance from Alternate Wetting and Drying (AWD) farming.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 text-xs font-mono text-primary-green-300">
              <span className="w-2 h-2 rounded-full bg-primary-green-400" />
              <span>Access Youth Tech Forge 2026 — Sustainability & Climate-Linked Finance Track</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-primary-green-300 font-bold">
              Architecture
            </span>
            <a href="#platform" className="text-sm text-primary-green-100 hover:text-white transition-colors">
              Platform Overview
            </a>
            <a href="#mrv-engine" className="text-sm text-primary-green-100 hover:text-white transition-colors">
              MRV Engine Pillars
            </a>
            <a href="#payout-split" className="text-sm text-primary-green-100 hover:text-white transition-colors">
              Revenue Split Model
            </a>
            <a href="#governance" className="text-sm text-primary-green-100 hover:text-white transition-colors">
              Governance Boundaries
            </a>
          </div>

          {/* Prototype Systems & Environments */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-primary-green-300 font-bold">
              Environments & Auditing
            </span>
            <Link href="/dashboard" className="text-sm text-primary-green-100 hover:text-white transition-colors">
              Enter Cooperative App
            </Link>
            <Link href="/verifier" className="text-sm text-primary-green-100 hover:text-white transition-colors">
              Independent Verifier Portal
            </Link>
            <span className="text-xs text-primary-green-300 pt-2 font-mono">
              Basins: Kano, Niger & Kebbi
            </span>
            <span className="text-xs text-primary-green-300 font-mono">
              Protocol: Verra VM0042 / IPCC AWD
            </span>
          </div>

        </div>

        {/* Bottom Integrity Notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary-green-300 font-mono">
          <div>
            © 2026 TensorCarbon. Built for Nigerian Agricultural Cooperatives. All carbon metrics qualified as <strong className="text-white">tCO₂e (est.)</strong>.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-primary-green-200">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-green-400" />
              Access Bank Sandbox (Simulated)
            </span>
            <span>•</span>
            <span>Sentinel-1 Radar Cross-Check (Sample)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
