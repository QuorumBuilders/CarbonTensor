import Link from "next/link";
import {
  IconActivity,
  IconShieldCheck,
  IconFileCertificate,
  IconBuildingBank,
  IconMapPin,
  IconBrandGithub,
} from "@tabler/icons-react";

export function LandingFooter() {
  return (
    <footer id="about" className="bg-chrome text-brand-foreground border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* 4-Column Structured Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-control bg-brand flex items-center justify-center text-brand-foreground border border-white/20">
                <IconActivity size={18} stroke={1.5} />
              </div>
              <span className="font-medium text-lg tracking-tight text-brand-foreground">
                CarbonTensor
              </span>
            </div>

            <p className="text-xs sm:text-sm text-brand-foreground/70 leading-relaxed font-normal">
              Agnostic digital MRV and climate finance platform for aggregated smallholder rice farming in Nigeria.
            </p>

            <div className="pt-2 text-[11px] font-mono text-brand-foreground/60 space-y-1">
              <div className="flex items-center gap-1.5">
                <IconShieldCheck size={14} stroke={1.5} className="text-brand-muted shrink-0" />
                <span>Access Bank Sandbox (Simulated)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconMapPin size={14} stroke={1.5} className="text-brand-muted shrink-0" />
                <span>Kebbi State AWD Cohort, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Column 1: Monitoring & MRV */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-brand-foreground/80">
              Monitoring & MRV
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-foreground/70">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Cooperative Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard#map"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Leaflet GIS Plot Map
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard#telemetry"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Water Level Telemetry
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard#simulator"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Sensor Ingestion Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Audit & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-brand-foreground/80">
              Audit & Standards
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-foreground/70">
              <li>
                <Link
                  href="/verifier"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Independent Verifier Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/verifier#anomalies"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  DRF Anomaly Queue
                </Link>
              </li>
              <li>
                <Link
                  href="/verifier#radar"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Sentinel-1 Radar Check
                </Link>
              </li>
              <li>
                <Link
                  href="/verifier#dossier"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Cryptographic Audit Dossier
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Finance & Settlements */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-brand-foreground/80">
              Finance & Settlements
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-foreground/70">
              <li>
                <Link
                  href="/finance"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Payout Disbursement Ledger
                </Link>
              </li>
              <li>
                <Link
                  href="/finance#split"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  70/15/15 Revenue Split Model
                </Link>
              </li>
              <li>
                <Link
                  href="/finance#banking"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Access Bank Sandbox Rails
                </Link>
              </li>
              <li>
                <Link
                  href="/design-system"
                  className="hover:text-brand-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  Design System Showcase
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Integrity Notice & Standards Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-brand-foreground/60">
          <div>
            © 2026 CarbonTensor. Kebbi State AWD Cohort, Nigeria. All carbon metrics qualified as <span className="text-brand-foreground font-medium">tCO₂e (est.)</span>.
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <IconFileCertificate size={13} stroke={1.5} className="text-brand-muted" />
              <span>UNFCCC AMS-III.H</span>
            </span>
            <span>•</span>
            <span>Verra VM0042</span>
            <span>•</span>
            <span>ISO 14064-2</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
