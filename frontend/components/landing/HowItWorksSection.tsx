import { Cpu, Users, GitBranch, Calculator, ExternalLink, Wallet, CheckCircle2 } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: Cpu,
      title: "Smart AWD Sensors",
      subtitle: "Plot Water Depth Telemetry",
      description:
        "Field IoT tubes monitor depth logs every 6 hours. Detects when water table recedes between 0cm and -15cm to verify soil aeration intervals.",
      meta: "Sampling interval: 6h • Pani pipe protocol",
      isExternal: false,
    },
    {
      step: "02",
      icon: Users,
      title: "Cooperative Aggregation",
      subtitle: "Polygon Bounds & Farmer Registry",
      description:
        "Individual farmer holdings are mapped into GIS polygon clusters tied to verified cooperative identities, National Identification Numbers (NIN), and bank verification numbers.",
      meta: "12 Nigerian Unions • 3,420 ha geofenced",
      isExternal: false,
    },
    {
      step: "03",
      icon: GitBranch,
      title: "MRV Rule Engine",
      subtitle: "Automated Anomaly Filtering",
      description:
        "Deterministic pipeline filters anomalies: flags plots that never dried below 0cm, detects sudden impossible drainage jumps, and cross-references sensor dropouts.",
      meta: "Sentinel-1 Radar Cross-Check (Sample)",
      isExternal: false,
    },
    {
      step: "04",
      icon: Calculator,
      title: "Estimate & Evidence Pack",
      subtitle: "Methodology-Aligned Calculation",
      description:
        "Quantifies avoided methane against IPCC baseline factors, outputting auditable, cryptographically hashed evidence bundles.",
      meta: "Labeled strictly as: tCO₂e (est.)",
      isExternal: false,
    },
    {
      step: "05",
      icon: ExternalLink,
      title: "External Verifier & Registry",
      subtitle: "Independent VVB Validation",
      description:
        "Evidence packs are exported to accredited third-party validation/verification bodies (VVBs) and standard registries (e.g., Verra VM0042) for issuance.",
      meta: "Dashed Outline: Non-hosted external entity",
      isExternal: true, // MANDATORY HONESTY STYLING: EXTERNAL / NON-HOSTED
    },
    {
      step: "06",
      icon: Wallet,
      title: "Proceeds to Wallets",
      subtitle: "Access Bank Sandbox Rail",
      description:
        "Gross carbon revenue is split automatically: 70% direct to farmer mobile accounts, 15% to cooperative pool, and 15% for MRV platform operations.",
      meta: "Access Bank Sandbox (Simulated)",
      isExternal: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-green-50 text-xs font-semibold text-primary-green-800 mb-3 border border-primary-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-green-600" />
            <span>End-to-End Operational Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight">
            How It Works: From Field Water Sensors to Verified Bank Payouts
          </h2>
          <p className="mt-4 text-base text-neutral-purple-900 leading-relaxed">
            A deterministic six-stage lifecycle that converts field agronomic discipline into verified carbon financial flows for Nigerian farming communities.
          </p>
        </div>

        {/* 6-Step Workflow Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`relative rounded-lg p-6 flex flex-col justify-between transition-all ${
                  item.isExternal
                    ? "border-2 border-dashed border-accent-orange-500 bg-accent-orange-50/30"
                    : "border border-neutral-purple-300 bg-white hover:border-primary-green-500"
                }`}
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-purple-200">
                    <span className="text-xs font-mono font-bold text-neutral-purple-600">
                      STEP {item.step}
                    </span>

                    {item.isExternal ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-accent-orange-500 text-white">
                        EXTERNAL / NON-HOSTED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tensor Layer</span>
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${
                        item.isExternal
                          ? "bg-accent-orange-100 text-accent-orange-700"
                          : "bg-primary-green-100 text-primary-green-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-primary-green-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-purple-600 font-medium">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-neutral-purple-900 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Step Metadata Footer */}
                <div
                  className={`mt-6 pt-3 border-t text-[11px] font-mono ${
                    item.isExternal
                      ? "border-accent-orange-200 text-accent-orange-700 font-semibold"
                      : "border-neutral-purple-200 text-primary-green-800"
                  }`}
                >
                  {item.meta}
                </div>
              </div>
            );
          })}
        </div>

        {/* Honesty Note on External Boundaries */}
        <div className="mt-6 p-4 rounded border border-neutral-purple-300 bg-neutral-purple-50 flex items-center gap-3 text-xs text-neutral-purple-800">
          <span className="font-bold text-accent-orange-600 uppercase tracking-wider text-[11px] shrink-0">
            System Boundary Note:
          </span>
          <span>
            TensorCarbon operates strictly as an aggregation, telemetry audit, and payment orchestration protocol. We do not self-certify carbon credits or act as a credit registry. Certification authority remains with accredited VVBs and internationally recognized registries.
          </span>
        </div>

      </div>
    </section>
  );
}
