import { Wallet, Building2, Server, HelpCircle, CheckCircle2 } from "lucide-react";

export function PayoutSplitPreview() {
  const sampleBatchTotal = 100_000_000; // ₦100,000,000 sample batch
  const farmerShare = Math.round(sampleBatchTotal * 0.70);
  const coopShare = Math.round(sampleBatchTotal * 0.15);
  const platformShare = Math.round(sampleBatchTotal * 0.15);

  return (
    <section id="payout-split" className="py-16 lg:py-24 bg-neutral-purple-50/50 border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-green-50 text-xs font-semibold text-primary-green-800 mb-3 border border-primary-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange-500" />
            <span>Revenue Economics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight">
            Transparent Payout Architecture: 70% to Farmers
          </h2>
          <p className="mt-4 text-base text-neutral-purple-900 leading-relaxed">
            Directing the lion&apos;s share of carbon value directly to the smallholder producers who maintain AWD field water discipline in the paddies.
          </p>
        </div>

        {/* Stacked Horizontal Bar Container */}
        <div className="mt-10 rounded-lg border border-neutral-purple-300 bg-white p-6 sm:p-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-purple-200 gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-purple-600">
                Gross Revenue Distribution Model
              </span>
              <h3 className="text-lg font-bold text-primary-green-900">
                Automated Smart Contract Split Allocation
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-green-50 border border-primary-green-200 text-xs font-bold text-primary-green-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-green-600" />
              <span>Proposed Estimate • Non-Binding Framework</span>
            </div>
          </div>

          {/* Stacked Bar */}
          <div className="mt-8">
            <div className="w-full h-8 rounded-md overflow-hidden flex border border-neutral-purple-300 bg-neutral-purple-100">
              {/* 70% Farmer Share */}
              <div
                style={{ width: "70%" }}
                className="bg-primary-green-700 hover:bg-primary-green-600 transition-colors flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider"
                title="70% Smallholder Farmer Wallets"
              >
                70% FARMERS
              </div>
              {/* 15% Cooperative Pool */}
              <div
                style={{ width: "15%" }}
                className="bg-primary-green-400 hover:bg-primary-green-300 transition-colors flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider border-l border-white/20"
                title="15% Cooperative Pool"
              >
                15% COOP
              </div>
              {/* 15% Platform & MRV */}
              <div
                style={{ width: "15%" }}
                className="bg-accent-orange-500 hover:bg-accent-orange-600 transition-colors flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider border-l border-white/20"
                title="15% Platform & Telemetry Operations"
              >
                15% MRV
              </div>
            </div>

            {/* Sub-bar Labels */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-neutral-purple-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-primary-green-700 shrink-0" />
                <span>Smallholder Farmer Accounts (70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-primary-green-400 shrink-0" />
                <span>Cooperative Pool Fund (15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-accent-orange-500 shrink-0" />
                <span>MRV & Sensor Operations (15%)</span>
              </div>
            </div>
          </div>

          {/* Numerical Demonstration Table with Tabular Nums */}
          <div className="mt-10 pt-6 border-t border-neutral-purple-200">
            <div className="text-xs font-semibold text-neutral-purple-600 uppercase tracking-wider mb-4">
              Simulated Batch Execution (Sample ₦{sampleBatchTotal.toLocaleString()} Carbon Offtake Tranche)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Box 1: Farmer Wallets */}
              <div className="p-4 rounded border border-primary-green-300 bg-primary-green-50/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-green-800">
                      Farmer Wallets (70%)
                    </span>
                    <Wallet className="w-4 h-4 text-primary-green-700" />
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-primary-green-900 tabular-nums">
                    ₦{farmerShare.toLocaleString()}
                  </div>
                  <p className="mt-2 text-xs text-neutral-purple-800 leading-relaxed">
                    Disbursed directly into registered farmers&apos; individual Access Bank or mobile money accounts.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-primary-green-200 text-[11px] font-mono text-primary-green-700 font-semibold">
                  Zero Intermediary Skimming
                </div>
              </div>

              {/* Box 2: Cooperative Development */}
              <div className="p-4 rounded border border-neutral-purple-300 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-purple-900">
                      Cooperative Pool (15%)
                    </span>
                    <Building2 className="w-4 h-4 text-primary-green-600" />
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-primary-green-800 tabular-nums">
                    ₦{coopShare.toLocaleString()}
                  </div>
                  <p className="mt-2 text-xs text-neutral-purple-800 leading-relaxed">
                    Earmarked for shared solar irrigation pumps, organic fertilizers, and Pani tube maintenance.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-purple-200 text-[11px] font-mono text-neutral-purple-700">
                  Community Asset Building
                </div>
              </div>

              {/* Box 3: Tensor MRV Platform */}
              <div className="p-4 rounded border border-neutral-purple-300 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-purple-900">
                      Tensor MRV & Ops (15%)
                    </span>
                    <Server className="w-4 h-4 text-accent-orange-600" />
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-neutral-purple-900 tabular-nums">
                    ₦{platformShare.toLocaleString()}
                  </div>
                  <p className="mt-2 text-xs text-neutral-purple-800 leading-relaxed">
                    Funds field IoT logger deployments, cellular data telemetry, and satellite SAR auditing.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-purple-200 text-[11px] font-mono text-accent-orange-700 font-semibold">
                  Technology Maintenance
                </div>
              </div>

            </div>
          </div>

          {/* Caveat Footer */}
          <div className="mt-6 pt-4 border-t border-neutral-purple-200 text-xs text-neutral-purple-600 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-neutral-purple-500 shrink-0 mt-0.5" />
            <span>
              Disclaimer: The 70/15/15 ratio represents the pilot governance framework agreed in collaborative cooperative MoUs. Actual final disbursement schedules are governed by buyer offtake contracts and validated by the cooperative general congress.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
