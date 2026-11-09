import { Cpu, Satellite, FileCheck, Wallet } from "lucide-react";

export function HowItWorksSection() {
  const pillars = [
    {
      num: "01",
      tag: "Automated Telemetry",
      icon: Cpu,
      title: "Field Piezometer Logging",
      description:
        "Field piezometer sensors log water level intervals without manual record tampering.",
      detail: "In-situ depth readings taken every 6 hours inside perforated field tubes.",
      badge: "Edge IoT",
      isExternal: false,
    },
    {
      num: "02",
      tag: "Digital MRV & Radar",
      icon: Satellite,
      title: "SAR Cross-Validation",
      description:
        "Rule engine calculates wet/dry cycles with a Sentinel-1 SAR satellite cross-check.",
      detail: "Detects continuous inundation and cross-references sensor dropouts.",
      badge: "Sentinel-1 SAR",
      isExternal: false,
    },
    {
      num: "03",
      tag: "Registry Evidence",
      icon: FileCheck,
      title: "VVB-Ready Audit Packages",
      description:
        "Formats auditable emission reduction packages for accredited independent VVBs.",
      detail: "IPCC Tier 2 & Verra VM0042 methodology parameters tagged tCO₂e (est.).",
      badge: "External Registry",
      isExternal: true, // Badged External Registry
    },
    {
      num: "04",
      tag: "Direct Disbursal",
      icon: Wallet,
      title: "Automated Bank Split",
      description:
        "Carbon proceeds routed directly to cooperative pools and farmer accounts via Access Bank Sandbox.",
      detail: "Direct mobile money and bank account credits with simulated API proofs.",
      badge: "Access Bank Sandbox",
      isExternal: false,
    },
  ];

  return (
    <section id="mrv-engine" className="py-16 sm:py-20 lg:py-24 bg-neutral-purple-50/40 border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono font-semibold text-primary-green-800 bg-primary-green-50 border border-primary-green-200 mb-3">
            <span>Architecture Pillars</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            An auditable, end-to-end data pipeline from paddy to payment.
          </h2>
          <p className="mt-3 text-base text-neutral-purple-800 leading-relaxed font-normal">
            Four interconnected infrastructure layers delivering continuous verification without costly manual field audits.
          </p>
        </div>

        {/* 4-Card Interactive Pillar Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative rounded-xl border border-neutral-purple-200 bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary-green-300 hover:shadow-sm"
              >
                <div>
                  {/* Card Top: Number & Tag */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-100">
                    <span className="font-mono text-sm font-bold text-primary-green-800">
                      {pillar.num} / {pillar.tag}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        pillar.isExternal
                          ? "bg-accent-orange-50 text-accent-orange-700 border-accent-orange-300"
                          : "bg-neutral-purple-50 text-neutral-purple-700 border-neutral-purple-200"
                      }`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-green-50 flex items-center justify-center text-primary-green-800 group-hover:bg-primary-green-700 group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-primary-green-900">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Main Concise Description */}
                  <p className="mt-4 text-sm text-neutral-purple-900 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Sub-Detail Footer */}
                <div className="mt-6 pt-3 border-t border-neutral-purple-100 text-xs text-neutral-purple-600 font-mono">
                  {pillar.detail}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
