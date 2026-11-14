import {
  IconDroplet,
  IconDropletOff,
  IconPlant,
  IconFlame,
  IconCircleCheck,
  IconAlertTriangle,
  IconRefresh,
  IconArrowDown,
  IconInfoCircle,
} from "@tabler/icons-react";

export function AwdExplainerSection() {
  const steps = [
    {
      step: "01",
      title: "Shallow Flood",
      level: "+5.0 cm",
      condition: "Standing Water",
      description:
        "Field is flooded to shallow depth during early crop establishment to support root anchorage and suppress competing weeds.",
      icon: IconDroplet,
    },
    {
      step: "02",
      title: "Controlled Aeration",
      level: "-15.0 cm",
      condition: "Pani Pipe Threshold",
      description:
        "Irrigation is paused. Water recedes via natural percolation until the perforated field pipe confirms root-zone oxygenation.",
      icon: IconArrowDown,
    },
    {
      step: "03",
      title: "Timed Re-flood",
      level: "+5.0 cm",
      condition: "Cycle Reset",
      description:
        "IoT telemetry triggers an automated cooperative irrigation alert before root moisture stress, resetting the verified cycle.",
      icon: IconRefresh,
    },
  ];

  return (
    <section
      id="awd-explainer"
      className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconPlant size={14} stroke={1.5} className="text-accent" />
            <span>Agronomic Method</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            Aerating paddy soil stops methane formation
            <br className="hidden sm:inline" /> without reducing rice yield.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
            Continuous flooding keeps paddy soil in an oxygen-depleted state where microbes release methane gas. Alternate Wetting and Drying (AWD) breaks this cycle through planned field drainage down to the root zone.
          </p>
        </div>

        {/* Side-by-Side Agronomic Comparison */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Continuous Flooding (Baseline) */}
          <div className="rounded-card border border-border bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-error-fg" />
                  <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                    Continuous Flooding (Baseline)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-status-error-bg text-status-error-fg border border-border">
                  ANAEROBIC STATE
                </span>
              </div>

              {/* Water Level Gauge Schematic */}
              <div className="p-4 rounded-control bg-background border border-border space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Field Water Table</span>
                  <span className="tabular-nums font-medium text-status-error-fg">
                    +5.0 cm (Submerged)
                  </span>
                </div>
                {/* Visual Depth Bar */}
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="h-6 rounded-control bg-status-error-bg/60 border border-status-error-fg/30 flex items-center justify-between px-3 text-status-error-fg">
                    <span>+5.0 cm Standing Flood</span>
                    <span className="tabular-nums">+5 cm</span>
                  </div>
                  <div className="flex items-center justify-between px-1 text-[10px] text-subtle">
                    <span>Soil Surface Reference</span>
                    <span className="tabular-nums">0 cm</span>
                  </div>
                  <div className="h-8 rounded-control bg-muted/60 border border-border flex items-center justify-between px-3 text-muted-foreground">
                    <span>Subsoil Layer (Oxygen blocked)</span>
                    <span className="text-status-error-fg flex items-center gap-1">
                      <IconFlame size={12} stroke={1.5} /> CH₄ Formed
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">
                  Biological Condition: Anaerobic decomposition
                </div>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  Stagnant floodwater prevents atmospheric oxygen from reaching topsoil organic matter, triggering constant methane (CH₄) gas release from methanogenic bacteria.
                </p>
              </div>

              <div className="space-y-2 pt-1 border-t border-border text-xs font-mono">
                <div className="flex items-center justify-between py-1 text-muted-foreground">
                  <span>Irrigation Expense:</span>
                  <span className="text-status-error-fg font-medium">Excess diesel pumping</span>
                </div>
                <div className="flex items-center justify-between py-1 text-muted-foreground">
                  <span>Carbon Credit Status:</span>
                  <span className="text-status-error-fg font-medium">0% (Ineligible)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-2 text-xs text-subtle font-mono">
              <IconAlertTriangle size={15} stroke={1.5} className="text-status-error-fg shrink-0" />
              <span>Accounts for ~10% of global agricultural methane emissions.</span>
            </div>
          </div>

          {/* Card 2: Safe AWD Aeration (Verified Practice) */}
          <div className="rounded-card border border-brand/40 bg-brand-muted/20 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                  <span className="text-xs font-mono font-medium uppercase tracking-wider text-foreground">
                    Safe AWD Aeration (Verified)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-border">
                  AEROBIC ROOT ZONE
                </span>
              </div>

              {/* Water Level Gauge Schematic */}
              <div className="p-4 rounded-control bg-background border border-border space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Field Water Table</span>
                  <span className="tabular-nums font-medium text-brand">
                    -15.0 cm (Subsurface)
                  </span>
                </div>
                {/* Visual Depth Bar */}
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="h-6 rounded-control bg-brand-muted/40 border border-brand/30 flex items-center justify-between px-3 text-brand">
                    <span>Oxygen Diffusing into Topsoil</span>
                    <span className="tabular-nums text-foreground">Aerated</span>
                  </div>
                  <div className="flex items-center justify-between px-1 text-[10px] text-subtle">
                    <span>Soil Surface Reference</span>
                    <span className="tabular-nums">0 cm</span>
                  </div>
                  <div className="h-8 rounded-control bg-status-success-bg/40 border border-status-success-fg/30 flex items-center justify-between px-3 text-status-success-fg">
                    <span>Percolated Water Table</span>
                    <span className="tabular-nums font-medium">-15.0 cm threshold</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">
                  Biological Condition: Oxygenated root zone
                </div>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  The water table recedes through natural percolation and evaporation to -15 cm below ground, halting methanogenesis while protecting vital root capillary moisture.
                </p>
              </div>

              <div className="space-y-2 pt-1 border-t border-border text-xs font-mono">
                <div className="flex items-center justify-between py-1 text-muted-foreground">
                  <span>Irrigation Expense:</span>
                  <span className="text-brand font-medium">-30% fuel & water pump usage</span>
                </div>
                <div className="flex items-center justify-between py-1 text-muted-foreground">
                  <span>Carbon Credit Status:</span>
                  <span className="text-brand font-medium">Eligible (AMS-III.H certified)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-2 text-xs text-brand font-mono">
              <IconCircleCheck size={15} stroke={1.5} className="text-brand shrink-0" />
              <span>30% to 50% verified reduction in net seasonal methane emissions.</span>
            </div>
          </div>

        </div>

        {/* Rotational 3-Step Sequence */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-card border border-border bg-card p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-subtle">
                    Phase {item.step}
                  </span>
                  <span className="font-mono text-xs font-medium px-2 py-0.5 rounded-pill bg-muted border border-border text-foreground tabular-nums">
                    {item.level}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-control bg-muted border border-border flex items-center justify-center text-foreground shrink-0">
                    <Icon size={16} stroke={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      {item.condition}
                    </p>
                  </div>
                </div>

                <p className="text-xs font-normal text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Biological Invariant Callout Banner */}
        <div className="mt-8 rounded-card border border-border bg-muted/40 p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-control bg-card border border-border flex items-center justify-center text-foreground shrink-0 mt-0.5">
              <IconInfoCircle size={18} stroke={1.5} className="text-accent" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">
                The Agronomic Invariant: Why rice yield does not decrease
              </h3>
              <p className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
                Methanogenic bacteria cannot survive in the presence of oxygen, shutting down methane creation during the dry phase. Rice roots easily reach capillary water held in the subsoil below 15 cm. Agronomic trials consistently confirm equal or improved grain yields alongside stronger root anchorage.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
