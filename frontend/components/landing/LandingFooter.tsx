import Link from "next/link";
import { Activity, ShieldCheck, Mail, MapPin } from "lucide-react";

export function LandingFooter() {
  return (
    <footer id="about" className="bg-primary-green-900 text-white border-t border-primary-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-primary-green-800/80">

          {/* Brand & Track Indicator */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary-green-700 flex items-center justify-center text-white">
                <Activity className="w-5 h-5 text-primary-green-100" />
              </div>
              <span className="font-extrabold text-xl text-white">
                CarbonTensor
              </span>
            </div>
            <p className="text-sm text-primary-green-200 leading-relaxed font-normal">
              Supply-side data and payout layer aggregating Nigerian rice cooperatives to verify methane avoidance from Alternate Wetting and Drying (AWD) farming.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 text-xs font-mono text-primary-green-300">
              <span className="w-2 h-2 rounded-full bg-primary-green-400" />
              <span>Access Youth Tech Forge 2026</span>
            </div>
          </div>

          {/* Get Started Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-primary-green-300 font-bold">
              Get Started
            </span>
            <Link href="/auth/register" className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150">
              Register your plot
            </Link>
            <Link href="/auth/register" className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150">
              For cooperatives
            </Link>
            <Link href="/auth/login" className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150">
              For verifiers
            </Link>
          </div>

          {/* Contact Us Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-primary-green-300 font-bold">
              Contact Us
            </span>
            <a
              href="mailto:teamtensorcs@gmail.com"
              className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-primary-green-400 shrink-0" />
              <span>teamtensorcs@gmail.com</span>
            </a>
            <div className="text-sm text-primary-green-200 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-green-400 shrink-0" />
              <span>Nigeria</span>
            </div>
          </div>

          {/* About Column */}
          <div className="flex flex-col gap-2.5" id="white-paper">
            <span className="text-xs font-mono uppercase tracking-wider text-primary-green-300 font-bold">
              About
            </span>
            <a href="#about" className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150">
              Our team
            </a>
            <a href="#white-paper" className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150">
              White paper
            </a>
            <a href="#privacy" className="text-sm text-primary-green-100 hover:text-white transition-colors duration-150">
              Privacy Policy
            </a>
          </div>

        </div>

        {/* Bottom Integrity Notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary-green-300 font-mono">
          <div>
            © 2026 CarbonTensor. Built for Nigerian Agricultural Cooperatives. All carbon metrics qualified as <strong className="text-white">tCO₂e (est.)</strong>.
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
