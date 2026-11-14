import {
  IconCpu,
  IconSatellite,
  IconBuildingCommunity,
  IconCoins,
  IconCircleCheck,
  IconActivity,
  IconRadar,
  IconArrowRight,
} from "@tabler/icons-react";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-card border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconActivity size={14} stroke={1.5} className="text-accent" />
            <span>System Architecture</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            From field water observation
            <br className="hidden sm:inline" /> to bank settlement.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
            CarbonTensor connects ground piezometer measurements, satellite radar cross-checks, and cooperative governance into an auditable data pipeline for carbon registries.
          </p>
        </div>

        {/* Asymmetric 4-Panel Bento Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Card 1: In-Situ IoT Pani Pipe Telemetry (Large Surface - 7 cols) */}
          <div className="lg:col-span-7 rounded-card border border-border bg-background p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  <IconCpu size={15} stroke={1.5} className="text-brand" />
                  <span>Ground Telemetry</span>
                </div>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-brand-muted text-brand border border-brand/30">
                  IN-SITU SENSOR
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-medium text-foreground">
                  Perforated sensor pipes track water depth every 6 hours.
                </h3>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  Solar-powered pressure transducers inside perforated PVC field tubes log exact water table variations relative to the soil surface. Readings transmit via cellular telemetry, capturing natural percolation without requiring manual logbooks or invasive field audits.
                </p>
              </div>

              {/* Inline Telemetry Readout Schematic */}
              <div className="p-4 rounded-control bg-card border border-border space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border text-[11px]">
                  <span>Telemetry Channel: KB-ARG-042</span>
                  <span className="text-brand flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    Transmitting (4G/GSM)
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="p-2 rounded-control bg-muted/50 border border-border">
                    <div className="text-[10px] text-subtle">06:00</div>
                    <div className="text-xs font-medium text-foreground tabular-nums mt-0.5">-4.2 cm</div>
                  </div>
                  <div className="p-2 rounded-control bg-muted/50 border border-border">
                    <div className="text-[10px] text-subtle">12:00</div>
                    <div className="text-xs font-medium text-foreground tabular-nums mt-0.5">-9.8 cm</div>
                  </div>
                  <div className="p-2 rounded-control bg-status-success-bg/50 border border-status-success-fg/30">
                    <div className="text-[10px] text-status-success-fg font-medium">18:00 (AWD)</div>
                    <div className="text-xs font-medium text-status-success-fg tabular-nums mt-0.5">-15.1 cm</div>
                  </div>
                  <div className="p-2 rounded-control bg-muted/50 border border-border">
                    <div className="text-[10px] text-subtle">00:00</div>
                    <div className="text-xs font-medium text-foreground tabular-nums mt-0.5">+4.8 cm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Safe Aeration Threshold: <strong className="font-medium text-foreground tabular-nums">-15.0 cm</strong></span>
              <span className="text-subtle">Reading Cadence: 4x daily</span>
            </div>
          </div>

          {/* Bento Card 2: Sentinel-1 SAR Radar Cross-Check (Medium Surface - 5 cols) */}
          <div className="lg:col-span-5 rounded-card border border-border bg-background p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  <IconSatellite size={15} stroke={1.5} className="text-accent" />
                  <span>Remote Sensing</span>
                </div>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-muted text-foreground border border-border">
                  SENTINEL-1 SAR
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  Satellite radar verifies field inundation from orbit.
                </h3>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  European Space Agency Sentinel-1 Synthetic Aperture Radar (SAR) passes provide independent surface backscatter observations. Comparing satellite moisture signals against ground sensor depth flags continuous submersion violations and tampering anomalies before audit submission.
                </p>
              </div>

              {/* Inline Radar Cross-Check Schematic */}
              <div className="p-4 rounded-control bg-card border border-border space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Pass Orbit:</span>
                  <span className="text-foreground tabular-nums">S1A_IW_GRDH (12-day)</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Polarization:</span>
                  <span className="text-foreground tabular-nums">Dual VV / VH Backscatter</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Tamper Check:</span>
                  <span className="text-brand font-medium flex items-center gap-1">
                    <IconCircleCheck size={13} stroke={1.5} /> Sensor Match Valid
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>12-day pass interval</span>
              <span className="text-subtle">Dual-polarization (VV/VH) check</span>
            </div>
          </div>

          {/* Bento Card 3: Cooperative Cohort Aggregation (Medium Surface - 5 cols) */}
          <div className="lg:col-span-5 rounded-card border border-border bg-background p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  <IconBuildingCommunity size={15} stroke={1.5} className="text-brand" />
                  <span>Union Governance</span>
                </div>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-muted text-foreground border border-border">
                  COOPERATIVE POOL
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  Aggregating 1-hectare parcels into registry-scale cohorts.
                </h3>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  Individual smallholder plots in the Argungu cluster are mapped with GPS boundaries and registered to the cooperative union. Shared irrigation canals, synchronised drainage schedules, and unified roster records eliminate prohibitive individual audit fees.
                </p>
              </div>

              {/* Inline Cohort Metrics */}
              <div className="p-4 rounded-control bg-card border border-border space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Participating Union:</span>
                  <span className="text-foreground font-sans font-medium">Kebbi Rice Growers</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Enrolled Acreage:</span>
                  <span className="tabular-nums font-medium text-brand">3,420 ha (est.)</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Aggregated Smallholders:</span>
                  <span className="tabular-nums font-medium text-foreground">380 Registered Plots</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Kebbi Union</span>
              <span className="text-brand font-medium">3,420 ha enrolled (est.)</span>
            </div>
          </div>

          {/* Bento Card 4: Automated 70/15/15 Revenue Split (Wide Surface - 7 cols) */}
          <div className="lg:col-span-7 rounded-card border border-brand/40 bg-brand-muted/20 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-brand">
                  <IconCoins size={15} stroke={1.5} className="text-brand" />
                  <span>Financial Settlement</span>
                </div>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-border">
                  ACCESS BANK SANDBOX
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-medium text-foreground">
                  Carbon revenues disburse directly to smallholder accounts.
                </h3>
                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  Once independent verifiers approve the seasonal evidence dossier, proceeds flow into an audited escrow account. The contract automatically distributes 70% to verified farmer bank accounts, 15% to the cooperative development fund, and 15% to platform operations via the Access Bank Sandbox.
                </p>
              </div>

              {/* Proportional Split Bar & Micro Allocations */}
              <div className="p-4 rounded-control bg-background border border-border space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                  <span>Escrow Distribution Contract</span>
                  <span className="text-brand font-medium">Verified Settlement</span>
                </div>

                <div className="w-full h-7 rounded-control overflow-hidden flex border border-border bg-muted">
                  <div
                    style={{ width: "70%" }}
                    className="bg-brand flex items-center justify-center text-brand-foreground text-[11px] font-medium px-2"
                  >
                    70% FARMERS
                  </div>
                  <div
                    style={{ width: "15%" }}
                    className="bg-brand/60 flex items-center justify-center text-brand-foreground text-[10px] font-medium border-l border-white/20 px-1"
                  >
                    15% COOP
                  </div>
                  <div
                    style={{ width: "15%" }}
                    className="bg-accent flex items-center justify-center text-accent-foreground text-[10px] font-medium border-l border-white/20 px-1"
                  >
                    15% MRV
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                  <span className="text-brand font-medium">70% Farmer Wallet</span>
                  <span>15% Coop Dev Fund</span>
                  <span>15% MRV Platform</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Transparent smart-contract escrow</span>
              <a
                href="#payout-split"
                className="inline-flex items-center gap-1 text-brand font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control"
              >
                <span>Inspect Payout Economics</span>
                <IconArrowRight size={13} stroke={1.5} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
