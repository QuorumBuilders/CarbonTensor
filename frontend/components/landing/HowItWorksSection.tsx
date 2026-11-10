import { Cpu, Users, ShieldAlert, FileText, Globe, Wallet, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      tag: "Field Telemetry",
      icon: Cpu,
      title: "Sensors log water levels",
      description:
        "Simple IoT sensors installed in perforated field tubes record water depth continuously every 6 hours, logging water drops without manual tampering.",
      badge: "In-Situ Sensor",
      isExternal: false,
    },
    {
      num: "02",
      tag: "Cooperative Intake",
      icon: Users,
      title: "Plots join a cooperative",
      description:
        "Farmers register plot boundaries with their local cooperative, aggregating individual 1-hectare plots into large, contiguous cohorts ready for certification.",
      badge: "Plot Registry",
      isExternal: false,
    },
    {
      num: "03",
      tag: "Automated QA",
      icon: ShieldAlert,
      title: "Checks find problems",
      description:
        "Automated rules and Sentinel-1 radar cross-checks flag missing data, impossible depth spikes, sensor malfunctions, and plots that were never dried.",
      badge: "Radar & Rules",
      isExternal: false,
    },
    {
      num: "04",
      tag: "MRV Assembly",
      icon: FileText,
      title: "Evidence is prepared",
      description:
        "Field telemetry is compiled into registry-ready evidence packages, with methane avoided calculated strictly under IPCC AWD parameters as tCO₂e (est.).",
      badge: "Audit Packet (est.)",
      isExternal: false,
    },
    {
      num: "05",
      tag: "Registry & Market",
      icon: Globe,
      title: "External certification and sale",
      description:
        "Accredited independent verifiers (VVBs) audit the package and carbon registries issue credits. External buyers purchase certified reductions on international markets.",
      badge: "EXTERNAL",
      isExternal: true,
    },
    {
      num: "06",
      tag: "Direct Disbursal",
      icon: Wallet,
      title: "Proceeds are shared",
      description:
        "Carbon proceeds are deposited and automatically split between cooperative operational pools and farmers' individual bank accounts via Access Bank Sandbox.",
      badge: "Bank Disbursal",
      isExternal: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono font-semibold text-primary-green-800 bg-primary-green-50 border border-primary-green-200 mb-3">
            <span>6-Step CarbonTensor Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            From the field to the farmer&apos;s account.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-purple-800 leading-relaxed font-normal">
            A transparent, six-step workflow connecting everyday field water management directly to verified carbon revenue.
          </p>
        </div>

        {/* 6-Node Sequential Workflow Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-150 ${
                  step.isExternal
                    ? "border-accent-orange-300 bg-accent-orange-50/30 hover:border-accent-orange-500 shadow-xs"
                    : "border-neutral-purple-200 bg-white hover:border-primary-green-300 shadow-xs"
                }`}
              >
                <div>
                  {/* Top Bar: Step Number & Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200/80">
                    <span className="font-mono text-xs font-bold text-primary-green-800">
                      NODE {step.num} • {step.tag}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        step.isExternal
                          ? "bg-accent-orange-500 text-white border-accent-orange-600"
                          : "bg-primary-green-50 text-primary-green-800 border-primary-green-200"
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        step.isExternal
                          ? "bg-accent-orange-100 text-accent-orange-700 border border-accent-orange-200"
                          : "bg-primary-green-50 text-primary-green-700 border border-primary-green-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-primary-green-900 leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-neutral-purple-800 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Footer Indicator */}
                <div className="mt-6 pt-3 border-t border-neutral-purple-200/60 flex items-center justify-between text-xs font-mono text-neutral-purple-600">
                  <span>Step {step.num} of 06</span>
                  {step.isExternal && (
                    <span className="text-accent-orange-600 font-bold">Independent Boundary</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Summary Strip */}
        <div className="mt-8 rounded-xl border border-neutral-purple-200 bg-neutral-purple-50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-purple-800">
          <div>
            <strong className="text-primary-green-900 font-sans">Clear Boundary Notice: </strong>
            CarbonTensor handles nodes 01–04 (data ingestion & MRV preparation) and node 06 (payout split). Node 05 is conducted exclusively by independent, third-party accredited registries and verifiers.
          </div>
          <a
            href="#payout-split"
            className="inline-flex items-center gap-1.5 font-bold text-primary-green-700 hover:text-primary-green-900 shrink-0"
          >
            <span>Preview Payout Model</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
