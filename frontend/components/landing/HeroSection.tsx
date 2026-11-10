import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PhotoCard {
  id: string;
  title: string;
  location: string;
  badge: string;
  caption: string;
  renderGraphic: () => React.ReactNode;
}

const photoCards: PhotoCard[] = [
  {
    id: "pani-pipe",
    title: "Pani pipe water sensor",
    location: "Kano River Scheme",
    badge: "Field Telemetry",
    caption: "Perforated field tube logs water drop to the safe -15 cm depth limit before re-flooding.",
    renderGraphic: () => (
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Field water sensor measuring soil water table depth">
        <rect width="400" height="250" fill="#07381A" />
        {/* Soil Layer */}
        <rect y="70" width="400" height="180" fill="#0B4D25" />
        {/* Soil Baseline */}
        <line x1="0" y1="70" x2="400" y2="70" stroke="#9CC9AB" strokeWidth="2" />
        <text x="16" y="60" fill="#C9E2D2" fontSize="11" fontFamily="monospace" fontWeight="600">Soil Surface (0 cm)</text>
        {/* Safe AWD Threshold (-15cm) */}
        <line x1="0" y1="140" x2="400" y2="140" stroke="#F15A24" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="16" y="132" fill="#FADAD0" fontSize="10" fontFamily="monospace" fontWeight="700">Safe AWD Threshold (-15 cm)</text>
        {/* Pani Pipe Tube */}
        <rect x="220" y="30" width="36" height="180" rx="3" fill="#296F3B" stroke="#6DAB6C" strokeWidth="2" />
        {/* Tube perforations */}
        <circle cx="238" cy="90" r="3" fill="#07381A" />
        <circle cx="238" cy="115" r="3" fill="#07381A" />
        <circle cx="238" cy="140" r="3" fill="#07381A" />
        <circle cx="238" cy="165" r="3" fill="#07381A" />
        <circle cx="238" cy="190" r="3" fill="#07381A" />
        {/* Water Level in pipe */}
        <rect x="224" y="130" width="28" height="76" rx="2" fill="#3F8851" fillOpacity="0.75" />
        <line x1="220" y1="130" x2="256" y2="130" stroke="#EAF3ED" strokeWidth="2" />
        {/* Sensor Cap */}
        <rect x="216" y="22" width="44" height="14" rx="2" fill="#03200E" stroke="#3F8851" strokeWidth="1.5" />
        <circle cx="238" cy="29" r="3" fill="#F15A24" />
        {/* Telemetry Tag */}
        <rect x="270" y="115" width="112" height="30" rx="4" fill="#03200E" stroke="#3F8851" strokeWidth="1" />
        <text x="280" y="134" fill="#EAF3ED" fontSize="11" fontFamily="monospace" fontWeight="bold" className="tabular-nums">-14.2 cm</text>
      </svg>
    ),
  },
  {
    id: "cooperative-plots",
    title: "Aggregated cooperative plots",
    location: "Kebbi Rice Belt",
    badge: "Plot Registry",
    caption: "Smallholder paddies mapped into cooperative clusters for shared water scheduling.",
    renderGraphic: () => (
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rice paddy plot grid mapped by cooperative">
        <rect width="400" height="250" fill="#07381A" />
        {/* Cartographic Rice Paddy Cells */}
        <rect x="30" y="30" width="155" height="85" rx="4" fill="#0B4D25" stroke="#6DAB6C" strokeWidth="1.5" />
        <rect x="215" y="30" width="155" height="85" rx="4" fill="#1B5C2D" stroke="#6DAB6C" strokeWidth="1.5" />
        <rect x="30" y="135" width="155" height="85" rx="4" fill="#1B5C2D" stroke="#6DAB6C" strokeWidth="1.5" />
        <rect x="215" y="135" width="155" height="85" rx="4" fill="#0B4D25" stroke="#6DAB6C" strokeWidth="1.5" />
        {/* Irrigation Canal Dividing Path */}
        <line x1="200" y1="20" x2="200" y2="230" stroke="#3F8851" strokeWidth="4" strokeDasharray="6 4" />
        {/* Plot ID tags */}
        <text x="44" y="55" fill="#EAF3ED" fontSize="11" fontFamily="monospace" fontWeight="bold">Plot KB-01</text>
        <text x="44" y="75" fill="#9CC9AB" fontSize="9" fontFamily="monospace">AWD Status: DRYING</text>
        <text x="229" y="55" fill="#EAF3ED" fontSize="11" fontFamily="monospace" fontWeight="bold">Plot KB-02</text>
        <text x="229" y="75" fill="#9CC9AB" fontSize="9" fontFamily="monospace">AWD Status: FLOODED</text>
        <text x="44" y="160" fill="#EAF3ED" fontSize="11" fontFamily="monospace" fontWeight="bold">Plot KB-03</text>
        <text x="44" y="180" fill="#9CC9AB" fontSize="9" fontFamily="monospace">AWD Status: DRYING</text>
        <text x="229" y="160" fill="#EAF3ED" fontSize="11" fontFamily="monospace" fontWeight="bold">Plot KB-04</text>
        <text x="229" y="180" fill="#9CC9AB" fontSize="9" fontFamily="monospace">AWD Status: DRYING</text>
      </svg>
    ),
  },
  {
    id: "field-aeration",
    title: "Aeration & drainage phase",
    location: "Niger River Basin",
    badge: "Methane Avoidance",
    caption: "Periodic drying lets atmospheric oxygen reach roots, halting methane-producing bacteria.",
    renderGraphic: () => (
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Soil aeration diagram illustrating aerobic soil preventing methane formation">
        <rect width="400" height="250" fill="#07381A" />
        {/* Oxygen Flow Arrows */}
        <g stroke="#6DAB6C" strokeWidth="2" strokeLinecap="round">
          <path d="M 80 20 L 80 60 M 75 50 L 80 60 L 85 50" />
          <path d="M 200 15 L 200 55 M 195 45 L 200 55 L 205 45" />
          <path d="M 320 20 L 320 60 M 315 50 L 320 60 L 325 50" />
        </g>
        <text x="140" y="32" fill="#C9E2D2" fontSize="10" fontFamily="monospace" fontWeight="bold">Atmospheric O₂ Ingress</text>
        {/* Aerated Top Soil */}
        <rect y="70" width="400" height="70" fill="#1B5C2D" />
        <text x="20" y="105" fill="#EAF3ED" fontSize="12" fontFamily="monospace" fontWeight="bold">Aerobic Zone (O₂ Rich)</text>
        <text x="20" y="122" fill="#9CC9AB" fontSize="9" fontFamily="monospace">Methanogenesis Inactive • 0 Methane</text>
        {/* Deep Soil */}
        <rect y="140" width="400" height="110" fill="#0B4D25" />
        <text x="20" y="175" fill="#C9E2D2" fontSize="11" fontFamily="monospace">Root System Anchored & Healthy</text>
        {/* Rice Roots */}
        <path d="M 120 70 Q 110 120 100 160 M 120 70 Q 130 110 140 155" stroke="#9CC9AB" strokeWidth="1.5" />
        <path d="M 260 70 Q 250 115 240 160 M 260 70 Q 275 120 280 165" stroke="#9CC9AB" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "water-reflood",
    title: "Controlled re-flooding",
    location: "Hadejia Valley, Jigawa",
    badge: "Water Saving",
    caption: "Controlled inlet watering restores shallow 5 cm water table, cutting irrigation costs.",
    renderGraphic: () => (
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Irrigation canal re-flooding rice field under AWD regime">
        <rect width="400" height="250" fill="#07381A" />
        {/* Canal Bed */}
        <rect y="60" width="400" height="190" fill="#0B4D25" />
        {/* Water Layer */}
        <rect y="60" width="400" height="50" fill="#3F8851" fillOpacity="0.4" />
        <line x1="0" y1="60" x2="400" y2="60" stroke="#6DAB6C" strokeWidth="2" />
        <text x="20" y="50" fill="#EAF3ED" fontSize="11" fontFamily="monospace" fontWeight="bold">+5 cm Water Level</text>
        {/* Water Gate */}
        <rect x="170" y="20" width="60" height="130" rx="3" fill="#03200E" stroke="#3F8851" strokeWidth="2" />
        <rect x="185" y="80" width="30" height="40" fill="#1B5C2D" />
        {/* Controlled Flow lines */}
        <path d="M 190 130 Q 200 150 190 180" stroke="#9CC9AB" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M 210 130 Q 200 150 210 180" stroke="#9CC9AB" strokeWidth="2" strokeDasharray="3 3" />
        <text x="245" y="95" fill="#EAF3ED" fontSize="10" fontFamily="monospace" fontWeight="bold">Sluice Gate Regulated</text>
        <text x="245" y="112" fill="#9CC9AB" fontSize="9" fontFamily="monospace">~30% Irrigation Savings</text>
      </svg>
    ),
  },
  {
    id: "mrv-evidence",
    title: "Verified MRV audit package",
    location: "Wushishi Basin, Niger",
    badge: "Registry Evidence",
    caption: "Sensor logs cross-checked with radar surface moisture before export to registry.",
    renderGraphic: () => (
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital MRV audit package graph with satellite cross-check">
        <rect width="400" height="250" fill="#07381A" />
        {/* Radar Map Grid Overlay */}
        <g stroke="#1B5C2D" strokeWidth="1">
          <line x1="40" y1="30" x2="360" y2="30" />
          <line x1="40" y1="80" x2="360" y2="80" />
          <line x1="40" y1="130" x2="360" y2="130" />
          <line x1="40" y1="180" x2="360" y2="180" />
          <line x1="120" y1="20" x2="120" y2="190" />
          <line x1="200" y1="20" x2="200" y2="190" />
          <line x1="280" y1="20" x2="280" y2="190" />
        </g>
        {/* Telemetry Waveform */}
        <path d="M 40 60 L 90 60 L 120 150 L 180 150 L 220 60 L 270 60 L 310 150 L 360 150" stroke="#6DAB6C" strokeWidth="2.5" fill="none" />
        {/* Sentinel-1 Cross-Check Dots */}
        <circle cx="150" cy="150" r="4" fill="#F15A24" />
        <circle cx="245" cy="60" r="4" fill="#F15A24" />
        <circle cx="335" cy="150" r="4" fill="#F15A24" />
        {/* Badge Banner */}
        <rect x="40" y="198" width="320" height="32" rx="4" fill="#03200E" stroke="#3F8851" strokeWidth="1" />
        <text x="56" y="218" fill="#EAF3ED" fontSize="10.5" fontFamily="monospace" fontWeight="bold">Sentinel-1 Radar Cross-Check: PASS (98.4%)</text>
      </svg>
    ),
  },
];

export function HeroSection() {
  const duplicatedCards = [...photoCards, ...photoCards];

  return (
    <section id="platform" className="relative overflow-hidden bg-white pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Farmer-First Copy */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Context Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded text-xs font-semibold text-primary-green-800 bg-primary-green-50 border border-primary-green-200">
              <span className="w-2 h-2 rounded-full bg-primary-green-500" />
              <span>Nigerian Rice Cooperatives</span>
              <span className="text-primary-green-300">•</span>
              <span>AWD Methane Avoidance</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-primary-green-900 leading-[1.12]">
              Get paid for farming with AWD
            </h1>

            {/* Subline */}
            <p className="text-lg sm:text-xl text-primary-green-800 font-semibold leading-snug">
              AgriTensor helps Nigerian rice cooperatives measure water use, show methane reduction and share carbon proceeds with farmers.
            </p>

            {/* Narrative */}
            <p className="text-sm sm:text-base text-neutral-purple-800 leading-relaxed font-normal">
              AgriTensor helps rice cooperatives in Nigeria turn better water management into verified evidence and fair payouts. With a farmer-first approach, we work alongside cooperatives, independent verifiers and carbon registries to make climate-friendly farming pay.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#problem"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm sm:text-base font-bold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-all duration-150 shadow-xs hover:shadow-sm"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-sm sm:text-base font-semibold text-primary-green-900 bg-white border border-neutral-purple-300 hover:border-primary-green-600 hover:bg-primary-green-50 transition-all duration-150"
              >
                <span>Register cooperative plot</span>
              </Link>
            </div>

            {/* Micro Validation Line */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-purple-600 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-green-600 shrink-0" />
              <span>Access Bank Sandbox (Simulated) • Carbon metrics qualified as tCO₂e (est.)</span>
            </div>

          </div>

          {/* Right Column: Infinite Photo Card Carousel */}
          <div className="lg:col-span-6 w-full overflow-hidden">
            <div className="rounded-xl border border-neutral-purple-200 bg-neutral-purple-50 p-4 sm:p-5">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-purple-200 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-green-500 animate-pulse" />
                  <span className="font-semibold text-primary-green-900">AWD Field Operations Gallery</span>
                </div>
                <span className="text-neutral-purple-600 text-[11px]">Pause on hover</span>
              </div>

              {/* Infinite Scrolling Track */}
              <div className="overflow-hidden -mx-2 px-2 py-1">
                <div className="animate-marquee gap-4">
                  {duplicatedCards.map((card, idx) => (
                    <article
                      key={`${card.id}-${idx}`}
                      className="w-[280px] sm:w-[320px] shrink-0 rounded-xl border border-neutral-purple-200 bg-white overflow-hidden shadow-xs hover:border-primary-green-400 transition-colors duration-150"
                    >
                      {/* 16:10 Visual Slot */}
                      <div className="aspect-[16/10] bg-primary-green-900 relative overflow-hidden">
                        {card.renderGraphic()}
                      </div>

                      {/* Clean Caption Slot */}
                      <div className="p-3.5 flex flex-col gap-1.5 bg-white">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
                            {card.badge}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-purple-600 truncate">
                            {card.location}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-primary-green-900 leading-snug">
                          {card.title}
                        </h3>

                        <p className="text-xs text-neutral-purple-700 leading-relaxed font-normal">
                          {card.caption}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Bottom Carousel Indicator Note */}
              <div className="pt-3 mt-3 border-t border-neutral-purple-200 flex items-center justify-between text-[11px] font-mono text-neutral-purple-600">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-green-600" />
                  Continuous Field Monitoring
                </span>
                <span>5 Cooperative Sites</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
