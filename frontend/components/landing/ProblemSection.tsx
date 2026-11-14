import {
  IconUsers,
  IconScale,
  IconAlertTriangle,
  IconCircleCheck,
  IconBuildingCommunity,
} from "@tabler/icons-react";

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-16 sm:py-20 lg:py-24 bg-card border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconScale size={14} stroke={1.5} className="text-accent" />
            <span>Aggregation Economics</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            Cooperative aggregation makes smallholder audits financially viable.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
            The typical rice parcel in Northern Nigeria is 1 to 2 hectares. High individual verification and legal costs make standalone certification impossible without cooperative pooling.
          </p>
        </div>

        {/* Aggregation Economics Comparison Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Standalone 1-2 ha Smallholder (Fails Threshold) */}
          <div className="rounded-card border border-border bg-background p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-status-error-fg">
                  Standalone Smallholder Model
                </span>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-status-error-bg text-status-error-fg border border-border">
                  PROHIBITIVE AUDIT COST
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-lg font-medium text-foreground">
                  Individual parcels cannot absorb registry fees
                </div>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  Third-party verification site visits by accredited VVBs, legal boundary validation, and registry issuance fees routinely cost thousands of dollars per farm—far exceeding the carbon revenue of a 1-hectare paddy.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-control bg-card border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Individual Farm Size:</span>
                  <span className="tabular-nums font-medium text-foreground">1.0 – 2.0 ha</span>
                </div>
                <div className="p-2.5 rounded-control bg-card border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Standalone Audit Visit:</span>
                  <span className="font-medium text-status-error-fg">$3,000 – $8,000 / farm</span>
                </div>
                <div className="p-2.5 rounded-control bg-card border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Economic Feasibility:</span>
                  <span className="font-medium text-status-error-fg">Deficit (Locked Out)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-2 text-xs text-subtle font-mono">
              <IconAlertTriangle size={15} stroke={1.5} className="text-status-error-fg shrink-0" />
              <span>Farmers bear drainage labor with zero dividend eligibility.</span>
            </div>
          </div>

          {/* Card 2: Cooperative Union Aggregation (CarbonTensor Model) */}
          <div className="rounded-card border border-brand/40 bg-brand-muted/20 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-brand">
                  CarbonTensor Cooperative Cohort
                </span>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-border">
                  REGISTRY-SCALE POOLING
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-lg font-medium text-foreground">
                  Bundling contiguous plots into an institutional audit pool
                </div>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  By aggregating hundreds of smallholders under existing cooperative unions like RIFAN, verification costs are distributed across thousands of hectares. Stationary IoT sensors and satellite radar provide verifiable group evidence.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-control bg-card border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Union Aggregated Scale:</span>
                  <span className="tabular-nums font-medium text-brand">380 Plots • 3,420 ha (est.)</span>
                </div>
                <div className="p-2.5 rounded-control bg-card border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">MRV Verification Audit:</span>
                  <span className="font-medium text-foreground">Single Pooled Cohort Audit</span>
                </div>
                <div className="p-2.5 rounded-control bg-card border border-border flex items-center justify-between">
                  <span className="text-muted-foreground">Direct Farmer Dividend:</span>
                  <span className="tabular-nums font-medium text-brand">70% Bank Settlement (NGN)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-2 text-xs text-brand font-mono">
              <IconCircleCheck size={15} stroke={1.5} className="text-brand shrink-0" />
              <span>Full compliance with Article 6 and UNFCCC AMS-III.H rules.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
