import {
  IconCoins,
  IconBuildingBank,
  IconBuildingCommunity,
  IconCpu,
  IconShieldCheck,
  IconInfoCircle,
} from "@tabler/icons-react";

export function PayoutSplitPreview() {
  return (
    <section
      id="payout-split"
      className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconCoins size={14} stroke={1.5} className="text-accent" />
            <span>Revenue Distribution</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            Transparent carbon proceeds
            <br className="hidden sm:inline" /> settled directly to producer accounts.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
            Revenue models follow smallholder cooperative frameworks. All carbon dividends are conditioned on verified AWD aeration records and disbursed through local banking rails.
          </p>
        </div>

        {/* Main Split Container */}
        <div className="mt-12 rounded-card border border-border bg-card p-6 sm:p-8 lg:p-10 space-y-8">
          
          {/* Top Label & Protocol Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-border">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              Seasonal Cohort Disbursement Model
            </span>
            <span className="text-xs font-mono font-medium text-brand">
              Access Bank Sandbox Settlement • Article 6 Aligned
            </span>
          </div>

          {/* Single Proportional Horizontal Split Bar */}
          <div className="space-y-2">
            <div className="w-full h-10 rounded-control overflow-hidden flex border border-border bg-muted">
              {/* 70% Farmer Share */}
              <div
                style={{ width: "70%" }}
                className="bg-brand flex items-center justify-center text-brand-foreground text-xs font-mono font-medium tracking-wide px-3"
                title="70% Smallholder Farmer Wallets"
              >
                70% FARMERS
              </div>
              {/* 15% Cooperative Development Fund */}
              <div
                style={{ width: "15%" }}
                className="bg-brand/60 flex items-center justify-center text-brand-foreground text-xs font-mono font-medium tracking-wide border-l border-white/20 px-2"
                title="15% Cooperative Development Fund"
              >
                15% COOP
              </div>
              {/* 15% Platform & MRV Operations */}
              <div
                style={{ width: "15%" }}
                className="bg-accent flex items-center justify-center text-accent-foreground text-xs font-mono font-medium tracking-wide border-l border-white/20 px-2"
                title="15% MRV Platform Operations"
              >
                15% MRV
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
              <span className="text-brand font-medium">70% Direct Producer Pass-Through</span>
              <span>15% Union Shared Assets</span>
              <span className="text-accent font-medium">15% Sensor & Radar Ops</span>
            </div>
          </div>

          {/* 3-Column Allocation Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: Farmers (70%) */}
            <div className="rounded-card border border-brand/40 bg-brand-muted/20 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                    <span className="text-xs font-mono font-medium text-brand uppercase">70% Allocation</span>
                  </div>
                  <IconBuildingBank size={16} stroke={1.5} className="text-brand" />
                </div>

                <div>
                  <h3 className="text-base font-medium text-foreground">
                    Smallholder Farmer Wallets
                  </h3>
                  <div className="mt-1 text-xs font-mono font-medium text-brand tabular-nums">
                    ₦58,912,000 (est.) active cohort
                  </div>
                </div>

                <p className="text-xs font-normal text-muted-foreground leading-relaxed">
                  Direct pass-through dividend compensating smallholders for the labor and operational discipline of scheduled water drainage, canal gate management, and pump timing.
                </p>
              </div>

              <div className="pt-3 border-t border-border/80 text-[11px] font-mono text-muted-foreground">
                <span className="text-subtle">Settlement Rail:</span> Direct bank deposit or mobile money via Access Bank Sandbox (Simulated).
              </div>
            </div>

            {/* Column 2: Cooperative (15%) */}
            <div className="rounded-card border border-border bg-background p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand/60" />
                    <span className="text-xs font-mono font-medium text-foreground uppercase">15% Allocation</span>
                  </div>
                  <IconBuildingCommunity size={16} stroke={1.5} className="text-brand" />
                </div>

                <div>
                  <h3 className="text-base font-medium text-foreground">
                    Cooperative Development Fund
                  </h3>
                  <div className="mt-1 text-xs font-mono font-medium text-foreground tabular-nums">
                    ₦12,624,000 (est.)
                  </div>
                </div>

                <p className="text-xs font-normal text-muted-foreground leading-relaxed">
                  Managed by cooperative leadership to procure shared solar irrigation pumps, high-yield certified FARO seed varieties, canal maintenance, and local field agent training.
                </p>
              </div>

              <div className="pt-3 border-t border-border/80 text-[11px] font-mono text-muted-foreground">
                <span className="text-subtle">Settlement Rail:</span> Cooperative union institutional treasury account.
              </div>
            </div>

            {/* Column 3: MRV Operations (15%) */}
            <div className="rounded-card border border-border bg-background p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <span className="text-xs font-mono font-medium text-accent uppercase">15% Allocation</span>
                  </div>
                  <IconCpu size={16} stroke={1.5} className="text-accent" />
                </div>

                <div>
                  <h3 className="text-base font-medium text-foreground">
                    Platform & MRV Operations
                  </h3>
                  <div className="mt-1 text-xs font-mono font-medium text-foreground tabular-nums">
                    ₦12,624,000 (est.)
                  </div>
                </div>

                <p className="text-xs font-normal text-muted-foreground leading-relaxed">
                  Funds continuous in-situ piezometer maintenance, Sentinel-1 satellite imagery ingestion, tamper-evident cryptographic hash generation, and accredited VVB audit fees.
                </p>
              </div>

              <div className="pt-3 border-t border-border/80 text-[11px] font-mono text-muted-foreground">
                <span className="text-subtle">Settlement Rail:</span> CarbonTensor MRV operational pool.
              </div>
            </div>

          </div>

          {/* Accounting Invariant Notice */}
          <div className="pt-4 border-t border-border flex items-start gap-3 text-xs font-mono text-muted-foreground">
            <IconShieldCheck size={16} stroke={1.5} className="text-brand shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-foreground font-medium">Accounting Invariant:</strong> Every NGN payout record links to its corresponding hectare boundary, sensor serial ID, and verified aeration duration. No intermediary broker deductions are permitted.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
