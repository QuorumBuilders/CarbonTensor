import {
  IconDeviceMobile,
  IconCoins,
  IconDroplet,
  IconCircleCheck,
  IconInfoCircle,
} from "@tabler/icons-react";

export function FarmerBenefitsSection() {
  const benefits = [
    {
      badge: "Feature Phone Access",
      title: "USSD *384# & SMS Water Alerts",
      subtitle: "No smartphone or internet data required.",
      description:
        "Field telemetry automatically dispatches local language SMS and USSD notifications to basic handsets when a plot reaches the -15 cm safe drainage mark, letting farmers know exactly when to open canal gates.",
      highlight: "USSD *384# interactive farmer prompts",
      icon: IconDeviceMobile,
    },
    {
      badge: "Zero Capital Barrier",
      title: "Zero Upfront Hardware Fee",
      subtitle: "Piezometers deployed via cooperative cohorts.",
      description:
        "Perforated PVC sensor tubes and solar-powered transmitters are provisioned through cooperative aggregation. Farmers incur zero out-of-pocket hardware or calibration costs to join the verified carbon cohort.",
      highlight: "100% cooperative-sponsored hardware",
      icon: IconCoins,
    },
    {
      badge: "Operational Efficiency",
      title: "Up to 30% Irrigation Fuel Savings",
      subtitle: "Reduced pumping lowers seasonal expenses.",
      description:
        "Periodic field drainage significantly decreases diesel pump run-time while enhancing oxygen diffusion to root systems. Documented trials show stronger tillering without grain yield penalties.",
      highlight: "Direct operational expense reduction",
      icon: IconDroplet,
    },
  ];

  return (
    <section
      id="benefits"
      className="py-16 sm:py-20 lg:py-24 bg-card border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconDroplet size={14} stroke={1.5} className="text-accent" />
            <span>Smallholder Economics</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            Tangible agronomic savings
            <br className="hidden sm:inline" /> and direct carbon income.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
            Designed specifically for smallholder rice farmers in Northern Nigeria with zero hardware cost, feature-phone alerts, and automated bank settlements.
          </p>
        </div>

        {/* 3 Benefits Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-card border border-border bg-background p-6 sm:p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-pill bg-muted text-muted-foreground border border-border">
                      {benefit.badge}
                    </span>
                    <div className="w-8 h-8 rounded-control bg-card border border-border flex items-center justify-center text-brand">
                      <Icon size={16} stroke={1.5} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-medium text-foreground leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-xs font-mono text-brand">
                      {benefit.subtitle}
                    </p>
                  </div>

                  <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center gap-2 text-xs font-mono text-brand">
                  <IconCircleCheck size={14} stroke={1.5} className="shrink-0" />
                  <span>{benefit.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Field Reality Disclaimer Callout */}
        <div className="mt-8 rounded-card border border-border bg-muted/40 p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-control bg-card border border-border flex items-center justify-center text-foreground shrink-0 mt-0.5">
              <IconInfoCircle size={18} stroke={1.5} className="text-accent" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">
                Agronomic Field Citation & Local Hydrology Note
              </h3>
              <p className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
                Peer-reviewed research and international field trials across West African river basins confirm up to 30% irrigation water savings under disciplined AWD regimes. Actual yield outcomes in the Kebbi/Argungu cluster depend on local soil permeability, irrigation canal infrastructure, and weather variability.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
