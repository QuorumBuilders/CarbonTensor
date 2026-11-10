import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PhotoCard {
  id: string;
  title: string;
  location: string;
  badge: string;
  caption: string;
  image: string;
}

const photoCards: PhotoCard[] = [
  {
    id: "farm-1",
    title: "Field water monitoring tube",
    location: "Kano River Irrigation Scheme",
    badge: "In-Situ Sensor",
    caption: "Perforated field tube logs water table drop to safe -15 cm threshold before re-flooding.",
    image: "/images/farm1.png",
  },
  {
    id: "farm-2",
    title: "Aggregated cooperative plots",
    location: "Kebbi Rice Farming Belt",
    badge: "Plot Registry",
    caption: "Smallholder paddies mapped into cooperative cohorts for synchronized water control.",
    image: "/images/farm2.png",
  },
  {
    id: "farm-3",
    title: "Soil drainage & aeration",
    location: "Niger River Basin",
    badge: "AWD Drying Cycle",
    caption: "Aerating the soil lets oxygen reach roots, breaking anaerobic methane formation.",
    image: "/images/farm3.png",
  },
  {
    id: "farm-4",
    title: "Controlled canal re-flooding",
    location: "Hadejia Valley, Jigawa",
    badge: "Water Saving",
    caption: "Irrigation restored to shallow 5 cm standing water, conserving up to 30% water volume.",
    image: "/images/farm4.png",
  },
  {
    id: "farm-5",
    title: "Smallholder cooperative governance",
    location: "Wushishi Cooperative, Niger",
    badge: "Farmer Governance",
    caption: "Cooperative members reviewing water schedules and automated carbon dividend allocations.",
    image: "/images/farm5.png",
  },
  {
    id: "farm-6",
    title: "Pre-harvest rice field",
    location: "Kadawa Irrigation Scheme",
    badge: "Yield & Carbon",
    caption: "Healthy tillering and grain filling achieved under disciplined wetting and drying cycles.",
    image: "/images/farm6.png",
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
              CarbonTensor helps Nigerian rice cooperatives measure water use, show methane reduction and share carbon proceeds with farmers.
            </p>

            {/* Narrative */}
            <p className="text-base text-neutral-purple-800 leading-relaxed font-normal">
              CarbonTensor helps rice cooperatives in Nigeria turn better water management into verified evidence and fair payouts. With a farmer-first approach, we work alongside cooperatives, independent verifiers and carbon registries to make climate-friendly farming pay.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#problem"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-all duration-150 shadow-xs hover:shadow-sm"
              >
                <span>Learn more</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-primary-green-900 bg-white border border-neutral-purple-300 hover:border-primary-green-600 hover:bg-primary-green-50 transition-all duration-150"
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
                      {/* 16:10 Visual Photo Slot */}
                      <div className="aspect-[16/10] bg-primary-green-900 relative overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 280px, 320px"
                        />
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
                <span>6 Cooperative Sites</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
