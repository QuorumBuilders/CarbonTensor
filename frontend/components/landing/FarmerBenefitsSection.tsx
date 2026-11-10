import { Wallet, FileCheck2, Droplets, Info, CheckCircle2 } from "lucide-react";

export function FarmerBenefitsSection() {
  const benefits = [
    {
      icon: Wallet,
      badge: "Direct Earnings",
      title: "Your share of carbon proceeds",
      subtitle: "Payments directly to your bank account.",
      description:
        "Carbon proceeds earned from verified methane reductions are deposited directly into your bank account or cooperative mobile wallet via Access Bank Sandbox. Every transaction is transparently accounted for, with zero hidden intermediary cuts.",
      highlight: "Direct bank disbursal via Access Bank",
    },
    {
      icon: FileCheck2,
      badge: "Simplified Operations",
      title: "Less paperwork",
      subtitle: "Sensors replace repetitive manual field visits.",
      description:
        "In-situ water tubes log water level fluctuations automatically every day. Farmers don't need to fill out tedious paper records or wait for third-party inspectors to conduct invasive, manual field visits before their plots are verified.",
      highlight: "Automated telemetry replaces physical audits",
    },
    {
      icon: Droplets,
      badge: "Agronomic Value",
      title: "Better water use",
      subtitle: "Reduced irrigation cuts pumping costs and protects crops.",
      description:
        "Periodic drainage conserves up to 30% of irrigation water, substantially lowering diesel pump fuel expenses. Healthier aerated root zones support strong tillering and grain filling throughout the growing season.",
      highlight: "Up to 30% irrigation fuel savings",
    },
  ];

  return (
    <section id="benefits" className="py-16 sm:py-20 lg:py-24 bg-neutral-purple-50 border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white text-xs font-semibold text-primary-green-800 mb-3 border border-neutral-purple-200">
            <span className="w-2 h-2 rounded-full bg-primary-green-500" />
            <span>Smallholder Prosperity</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            Built around the farmer.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-purple-800 leading-relaxed font-normal">
            CarbonTensor turns climate-smart water management into tangible economic gains, reduced labor, and lower operational expenses for smallholder rice growers.
          </p>
        </div>

        {/* 3 Benefits Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-neutral-purple-200 bg-white p-6 sm:p-7 shadow-xs hover:border-primary-green-300 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
                      {benefit.badge}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-primary-green-50 border border-primary-green-200 flex items-center justify-center text-primary-green-700">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-5">
                    <h3 className="text-lg sm:text-xl font-bold text-primary-green-900 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-primary-green-700">
                      {benefit.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-neutral-purple-800 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>

                {/* Card Footer Feature Pill */}
                <div className="mt-6 pt-4 border-t border-neutral-purple-200">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary-green-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-green-600 shrink-0" />
                    <span>{benefit.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ghana Citation & Methodology Disclaimer Callout */}
        <div className="mt-10 rounded-xl border border-neutral-purple-300 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-green-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-purple-800 leading-relaxed font-normal">
              <strong className="text-primary-green-900 font-semibold">Agronomic Citation & Field Reality Note: </strong>
              Field studies (including UNDP Ghana, April 2026) report approximately ~30% rice yield improvement alongside substantial water savings under disciplined Alternate Wetting and Drying regimes.
              <span className="block mt-1 text-xs font-mono text-neutral-purple-600">
                Disclaimer: Actual agricultural yield results across Nigerian rice basins (e.g., Kano, Kebbi, Niger) may vary depending on local soil characteristics, hydrology, weather fluctuations, and rice varietal genetics.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
