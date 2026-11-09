import { ShieldAlert, Database, Satellite, Landmark } from "lucide-react";

export function ClaimsFaq() {
  const boundaries = [
    {
      icon: Database,
      title: "Supply-Side Infrastructure",
      badge: "Registry Boundary",
      description:
        "We do not operate a proprietary carbon exchange; credits are certified and issued by recognized registries.",
      note: "Formal credit issuance remains with accredited independent VVBs and external standard registries.",
    },
    {
      icon: Satellite,
      title: "Radar Cross-Check",
      badge: "Verification Caveat",
      description:
        "Satellite radar is deployed as an independent secondary check, not an unverified canopy penetration claim.",
      note: "Sentinel-1 SAR surface backscatter confirms macro-inundation to validate in-situ field sensor telemetry.",
    },
    {
      icon: Landmark,
      title: "Sandbox Settlement",
      badge: "Financial Simulation",
      description:
        "Payout simulations execute through the Access Bank Sandbox environment.",
      note: "Demonstration funds and account rails model automated API transfers ahead of commercial escrow launch.",
    },
  ];

  return (
    <section id="governance" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono font-semibold text-accent-orange-700 bg-accent-orange-50 border border-accent-orange-200 mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-accent-orange-600" />
            <span>Governance & Scientific Integrity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            Institutional Transparency & Operational Boundaries
          </h2>
          <p className="mt-3 text-base text-neutral-purple-800 leading-relaxed font-normal">
            Rigorous carbon MRV requires explicit distinctions between telemetry data aggregation and third-party credit certification.
          </p>
        </div>

        {/* 3 Governance Boundary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {boundaries.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-purple-200 bg-neutral-purple-50/30 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-primary-green-300 hover:bg-white hover:shadow-xs"
              >
                <div>
                  {/* Card Top Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200/60">
                    <div className="w-8 h-8 rounded-lg bg-primary-green-100/70 flex items-center justify-center text-primary-green-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-neutral-purple-200 text-neutral-purple-700">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-lg font-bold text-primary-green-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-purple-900 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Sub-note */}
                <div className="mt-6 pt-3 border-t border-neutral-purple-200/60 text-xs font-mono text-neutral-purple-600 leading-relaxed">
                  {item.note}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
