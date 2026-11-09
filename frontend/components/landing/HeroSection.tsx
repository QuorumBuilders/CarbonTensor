import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section id="platform" className="relative overflow-hidden bg-white pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Climate-Tech Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Impact Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
            
            {/* Small Editorial Category Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded text-xs font-semibold text-primary-green-800 bg-primary-green-50 border border-primary-green-200">
              <span className="w-2 h-2 rounded-full bg-primary-green-500 animate-pulse" />
              <span>Nigerian Rice Cooperative Aggregation</span>
              <span className="text-primary-green-300">/</span>
              <span>Article 6 MRV</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-primary-green-900 leading-[1.12]">
              Methane avoidance data and payout layer for smallholder rice.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-purple-800 leading-relaxed max-w-2xl font-normal">
              Automated water-level monitoring, registry-ready MRV evidence, and direct carbon dividend distribution for Nigerian cooperatives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm sm:text-base font-bold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <span>Enter Cooperative App</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
              <Link
                href="/verifier"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-sm sm:text-base font-medium text-primary-green-800 bg-white border border-neutral-purple-300 hover:border-primary-green-600 hover:text-primary-green-900 hover:bg-primary-green-50/40 transition-all duration-200"
              >
                <FileSearch className="w-4 h-4 text-primary-green-600" />
                <span>Independent Verifier Portal</span>
              </Link>
            </div>

            {/* Micro Validation Pill */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-purple-600 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-green-600 shrink-0" />
              <span>Simulated via Access Bank Sandbox • Metrics labeled tCO₂e (est.)</span>
            </div>

          </div>

          {/* Right Column: Signature Inline SVG AWD Wet/Dry Telemetry Graphic */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-xl border border-neutral-purple-300 bg-primary-green-800 p-4 sm:p-5 shadow-sm overflow-hidden text-white transition-all">
              
              {/* Graphic Header / Telemetry Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-primary-green-700/80 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-green-400 animate-ping" />
                  <span className="font-semibold text-primary-green-100">AWD Hydrologic Cycle</span>
                </div>
                <span className="text-[11px] text-primary-green-300">
                  Dynamic Soil Profile
                </span>
              </div>

              {/* Inline SVG - Spatial Rice Paddy AWD Soil Profile */}
              <div className="mt-3 w-full aspect-[4/3] bg-primary-green-900 rounded-lg border border-primary-green-700/60 relative overflow-hidden">
                <svg
                  viewBox="0 0 500 360"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Alternate Wetting and Drying soil cross section diagram illustrating water table oscillation relative to the -15cm threshold"
                >
                  {/* Atmospheric Top */}
                  <rect x="0" y="0" width="500" height="90" fill="#07381A" />
                  
                  {/* Rice Crop Stems */}
                  <g stroke="#6DAB6C" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
                    <path d="M 50 90 L 45 38 M 50 90 L 52 32 M 50 90 L 60 42" />
                    <path d="M 120 90 L 115 32 M 120 90 L 123 26 M 120 90 L 130 36" />
                    <path d="M 220 90 L 210 30 M 220 90 L 222 24 M 220 90 L 235 34" />
                    <path d="M 330 90 L 322 34 M 330 90 L 333 28 M 330 90 L 345 40" />
                    <path d="M 430 90 L 420 32 M 430 90 L 434 25 M 430 90 L 445 36" />
                  </g>

                  {/* Soil Surface Baseline: 0 cm */}
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#9CC9AB" strokeWidth="2" />
                  <text x="14" y="82" fill="#C9E2D2" fontSize="10" fontFamily="monospace" fontWeight="600">
                    Soil Surface (0 cm Baseline)
                  </text>

                  {/* Soil Cross-Section Background */}
                  <rect x="0" y="90" width="500" height="270" fill="#0B4D25" />

                  {/* Sage Topographic Contour Lines */}
                  <g stroke="#6DAB6C" strokeWidth="1" strokeDasharray="3 3" opacity="0.45">
                    <path d="M 0 130 Q 120 120 250 135 T 500 125" />
                    <path d="M 0 180 Q 140 170 280 185 T 500 175" />
                    <path d="M 0 240 Q 100 245 250 235 T 500 242" />
                    <path d="M 0 300 Q 150 295 300 305 T 500 298" />
                  </g>

                  {/* Safe AWD Threshold (-15 cm line in soil) */}
                  <line x1="0" y1="165" x2="500" y2="165" stroke="#F15A24" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="14" y="159" fill="#FADAD0" fontSize="10" fontFamily="monospace" fontWeight="700">
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
                    <rect x="345" y="58" width="142" height="24" rx="4" fill="#07381A" stroke="#3F8851" strokeWidth="1" />
                    <text x="355" y="74" fill="#C9E2D2" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                      Water Horizon Active
                    </text>
                  </g>

                  {/* 4 Sensor Telemetry Nodes */}
                  {/* Node 1: Kano */}
                  <g transform="translate(80, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-14" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-01
                    </text>
                  </g>

                  {/* Node 2: Wudil */}
                  <g transform="translate(190, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-14" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-02
                    </text>
                  </g>

                  {/* Node 3: Badeggi */}
                  <g transform="translate(310, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-14" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-03
                    </text>
                  </g>

                  {/* Node 4: Argungu */}
                  <g transform="translate(420, 50)">
                    <rect x="8" y="40" width="4" height="150" fill="#296F3B" rx="1" />
                    <circle cx="10" cy="190" r="2" fill="#3F8851" />
                    <circle cx="10" cy="160" r="2" fill="#3F8851" />
                    <circle cx="10" cy="130" r="2" fill="#3F8851" />
                    <rect x="0" y="20" width="20" height="20" rx="3" fill="#07381A" stroke="#3F8851" strokeWidth="2" />
                    <circle cx="10" cy="30" r="4" fill="#3F8851" />
                    <line x1="10" y1="20" x2="10" y2="10" stroke="#3F8851" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2" fill="#F15A24" />
                    <text x="-14" y="10" fill="#EAF3ED" fontSize="8" fontFamily="monospace">
                      TC-04
                    </text>
                  </g>

                  {/* Bottom Sub-Soil Banner */}
                  <rect x="20" y="325" width="460" height="24" rx="3" fill="#07381A" opacity="0.9" />
                  <text x="35" y="341" fill="#9CC9AB" fontSize="9" fontFamily="monospace">
                    Perforated Field Tube • Soil Aeration Interrupts Methanogenesis
                  </text>
                </svg>
              </div>

              {/* Graphic Footer Legend */}
              <div className="grid grid-cols-2 gap-2 pt-3 text-[11px] text-primary-green-200 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-green-400" />
                  <span>4x Field Sensor Nodes</span>
                </div>
                <div className="flex items-center gap-1.5 text-right justify-end">
                  <span className="w-2.5 h-0.5 bg-accent-orange-500" />
                  <span>Safe Limit: -15 cm</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Minimal Editorial Metrics Ribbon */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-neutral-purple-200 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-xs font-mono font-medium text-neutral-purple-600 uppercase tracking-wider">
              Aggregated Cooperatives
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-primary-green-900 tabular-nums">
              12 Unions
            </div>
            <div className="text-xs text-neutral-purple-500 mt-0.5">
              Kano, Niger & Kebbi
            </div>
          </div>

          <div>
            <div className="text-xs font-mono font-medium text-neutral-purple-600 uppercase tracking-wider">
              Paddy Area Monitored
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-primary-green-900 tabular-nums">
              3,420 ha
            </div>
            <div className="text-xs text-neutral-purple-500 mt-0.5">
              Demarcated Plot Polygons
            </div>
          </div>

          <div>
            <div className="text-xs font-mono font-medium text-neutral-purple-600 uppercase tracking-wider">
              Avoided Methane Reduction
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-primary-green-700 tabular-nums">
              18,400 <span className="text-sm font-bold text-primary-green-800">tCO₂e (est.)</span>
            </div>
            <div className="text-xs text-neutral-purple-500 mt-0.5">
              48% CH₄ Abatement vs. Flooding
            </div>
          </div>

          <div>
            <div className="text-xs font-mono font-medium text-neutral-purple-600 uppercase tracking-wider">
              Simulated Farmer Payout Pool
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-accent-orange-600 tabular-nums">
              ₦84.2M <span className="text-xs font-normal text-neutral-purple-500">($52.6K est.)</span>
            </div>
            <div className="text-xs text-neutral-purple-500 mt-0.5">
              Access Bank Sandbox (Simulated)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
