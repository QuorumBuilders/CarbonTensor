import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, FileSearch } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-neutral-purple-200 pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Context Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded border border-primary-green-200 bg-primary-green-50 text-xs font-semibold text-primary-green-800">
              <span className="w-2 h-2 rounded-full bg-primary-green-500 animate-pulse" />
              <span>Nigerian Rice Cooperative Aggregation Layer</span>
              <span className="text-primary-green-300">|</span>
              <span className="text-primary-green-700">Article 6 & MRV Aligned</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-green-900 leading-[1.15]">
              Scalable Methane Avoidance for Smallholder Rice Cooperatives.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-neutral-purple-900 leading-relaxed max-w-2xl">
              Aggregating Nigerian rice farmers practicing Alternate Wetting and Drying (AWD), validating water-level sensor telemetry, and routing carbon dividends directly to farmer wallets.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-base font-bold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-colors shadow-sm"
              >
                <span>View Cooperative Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/verifier"
                className="inline-flex items-center gap-2 px-5 py-3 rounded text-base font-medium text-primary-green-800 bg-white border border-neutral-purple-300 hover:border-primary-green-600 hover:text-primary-green-900 hover:bg-primary-green-50/50 transition-colors"
              >
                <FileSearch className="w-4 h-4 text-primary-green-600" />
                <span>Independent Verifier Audit</span>
              </Link>
            </div>

            {/* Direct Verification Disclaimer Tag */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs text-neutral-purple-600 font-mono">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-green-600" />
                Metrics labeled: <strong className="text-primary-green-800">tCO₂e (est.)</strong>
              </span>
              <span className="text-neutral-purple-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-accent-orange-600" />
                Payout rail: <strong className="text-primary-green-800">Access Bank Sandbox (Simulated)</strong>
              </span>
            </div>

          </div>

          {/* Right Column: Signature Inline SVG AWD Wet/Dry Dynamic Graphic */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-lg border border-neutral-purple-300 bg-primary-green-800 p-4 shadow-sm overflow-hidden text-white">
              
              {/* Graphic Header / Telemetry Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-primary-green-700/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-green-400 animate-ping" />
                  <span className="font-semibold text-primary-green-100">Live AWD Telemetry Loop</span>
                </div>
                <span className="font-mono text-[11px] text-primary-green-300 tabular-nums">
                  Paddy Field Cross-Section (8-12s cycle)
                </span>
              </div>

              {/* Inline SVG - Spatial Rice Paddy AWD Soil Profile */}
              <div className="mt-2 w-full aspect-[4/3] bg-primary-green-900 rounded border border-primary-green-700/60 relative overflow-hidden">
                <svg
                  viewBox="0 0 500 360"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Alternate Wetting and Drying cross section diagram illustrating water table oscillation relative to the -15cm threshold"
                >
                  {/* Sky/Ambient Top */}
                  <rect x="0" y="0" width="500" height="90" fill="#07381A" />
                  
                  {/* Rice Stems & Foliage Row */}
                  <g stroke="#6DAB6C" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
                    <path d="M 50 90 L 45 40 M 50 90 L 52 35 M 50 90 L 60 45" />
                    <path d="M 120 90 L 115 32 M 120 90 L 123 28 M 120 90 L 130 38" />
                    <path d="M 220 90 L 210 30 M 220 90 L 222 25 M 220 90 L 235 35" />
                    <path d="M 330 90 L 322 36 M 330 90 L 333 30 M 330 90 L 345 42" />
                    <path d="M 430 90 L 420 34 M 430 90 L 434 26 M 430 90 L 445 38" />
                  </g>

                  {/* Soil Surface Baseline: 0 cm */}
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#9CC9AB" strokeWidth="2" />
                  <text x="12" y="82" fill="#C9E2D2" fontSize="10" fontFamily="monospace" fontWeight="600">
                    Soil Surface (0 cm Baseline)
                  </text>

                  {/* Soil Cross-Section Background */}
                  <rect x="0" y="90" width="500" height="270" fill="#0B4D25" />

                  {/* Sage Topographic Contour Lines */}
                  <g stroke="#6DAB6C" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
                    <path d="M 0 130 Q 120 120 250 135 T 500 125" />
                    <path d="M 0 180 Q 140 170 280 185 T 500 175" />
                    <path d="M 0 240 Q 100 245 250 235 T 500 242" />
                    <path d="M 0 300 Q 150 295 300 305 T 500 298" />
                  </g>

                  {/* Safe AWD Threshold (-15 cm line in soil) */}
                  <line x1="0" y1="165" x2="500" y2="165" stroke="#F15A24" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="12" y="160" fill="#FADAD0" fontSize="10" fontFamily="monospace" fontWeight="700">
                    Safe AWD Drying Limit (-15 cm Threshold)
                  </text>

                  {/* Oscillating Water Table Body & Horizon */}
                  <g className="animate-awd-oscillate">
                    <path
                      d="M 0 75 Q 125 70 250 78 T 500 74 L 500 360 L 0 360 Z"
                      fill="#3F8851"
                      fillOpacity="0.25"
                    />
                    <path
                      d="M 0 75 Q 125 70 250 78 T 500 74"
                      stroke="#9CC9AB"
                      strokeWidth="2.5"
                    />
                    <rect x="360" y="60" width="130" height="22" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="1" />
                    <text x="368" y="75" fill="#C9E2D2" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      Water Level Dynamic
                    </text>
                  </g>

                  {/* 4 Tertiary Bright Green (#3F8851) Sensor Nodes with Field Tubes */}
                  
                  {/* Node 1: Kano West */}
                  <g transform="translate(80, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-15" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-01 [KN]
                    </text>
                  </g>

                  {/* Node 2: Wudil Cluster */}
                  <g transform="translate(190, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-15" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-02 [WD]
                    </text>
                  </g>

                  {/* Node 3: Badeggi Basin */}
                  <g transform="translate(310, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-15" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-03 [NG]
                    </text>
                  </g>

                  {/* Node 4: Argungu Sector */}
                  <g transform="translate(420, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-15" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-04 [KB]
                    </text>
                  </g>

                  {/* Sub-Soil Strata Callout */}
                  <rect x="20" y="325" width="460" height="24" rx="3" fill="#07381A" opacity="0.9" />
                  <text x="35" y="341" fill="#9CC9AB" fontSize="9" fontFamily="monospace">
                    Perforated Pani Pipe Array • Aerobic Aeration Breaks Methane (CH₄) Generation
                  </text>
                </svg>
              </div>

              {/* Graphic Footer Legend */}
              <div className="grid grid-cols-2 gap-2 pt-3 text-[11px] text-primary-green-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-green-400" />
                  <span>4x Field IoT Tube Telemetry</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="w-2.5 h-0.5 bg-accent-orange-500" />
                  <span>Safe Dry Line: -15 cm</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Spatial Grid Metric Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-purple-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-purple-600 uppercase tracking-wider">
              Aggregated Cooperatives
            </span>
            <span className="mt-1 text-2xl lg:text-3xl font-extrabold text-primary-green-900 tabular-nums">
              12 Unions
            </span>
            <span className="text-xs text-neutral-purple-500 mt-0.5">
              Kano, Niger & Kebbi Rice Basins
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-purple-600 uppercase tracking-wider">
              Monitored Paddy Area
            </span>
            <span className="mt-1 text-2xl lg:text-3xl font-extrabold text-primary-green-900 tabular-nums">
              3,420 ha
            </span>
            <span className="text-xs text-neutral-purple-500 mt-0.5">
              GPS Polygon Plot Demarcations
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-purple-600 uppercase tracking-wider">
              Avoided Methane Reduction
            </span>
            <span className="mt-1 text-2xl lg:text-3xl font-extrabold text-primary-green-700 tabular-nums">
              18,400 <span className="text-sm font-bold text-primary-green-800">tCO₂e (est.)</span>
            </span>
            <span className="text-xs text-neutral-purple-500 mt-0.5">
              48% CH₄ Abatement vs. Flooding
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-purple-600 uppercase tracking-wider">
              Simulated Farmer Payout Pool
            </span>
            <span className="mt-1 text-2xl lg:text-3xl font-extrabold text-accent-orange-600 tabular-nums">
              ₦84.2M <span className="text-xs text-neutral-purple-500">($52.6K est.)</span>
            </span>
            <span className="text-xs text-neutral-purple-500 mt-0.5">
              Access Bank Sandbox (Simulated)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
