export function PayoutSplitPreview() {
  return (
    <section id="payout-split" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono font-semibold text-primary-green-800 bg-primary-green-50 border border-primary-green-200 mb-3">
            <span>Economic Structure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            Predictable, transparent revenue distribution.
          </h2>
          <p className="mt-3 text-base text-neutral-purple-800 leading-relaxed font-normal">
            Model parameters aligned with Article 6 smallholder cooperative frameworks. All figures marked est.
          </p>
        </div>

        {/* Sleek Single Horizontal Split Bar Container */}
        <div className="mt-10 rounded-xl border border-neutral-purple-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">

          {/* Top Label */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-purple-100">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-purple-600">
              Disbursement Allocation
            </span>
            <span className="text-xs font-mono font-medium text-primary-green-800">
              Access Bank Sandbox Settlement • Automated Split
            </span>
          </div>

          {/* Sleek Single Horizontal Bar */}
          <div className="mt-6">
            <div className="w-full h-11 rounded-lg overflow-hidden flex border border-neutral-purple-200 bg-neutral-purple-100 shadow-inner">
              {/* 70% Farmer Share */}
              <div
                style={{ width: "70%" }}
                className="bg-primary-green-700 hover:bg-primary-green-600 transition-colors flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider px-2"
                title="70% Smallholder Farmer Wallets"
              >
                70% FARMERS
              </div>
              {/* 15% Cooperative Development Fund */}
              <div
                style={{ width: "15%" }}
                className="bg-primary-green-400 hover:bg-primary-green-500 transition-colors flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider border-l border-white/20 px-2"
                title="15% Cooperative Development Fund"
              >
                15% COOP
              </div>
              {/* 15% Platform & MRV Operations */}
              <div
                style={{ width: "15%" }}
                className="bg-accent-orange-500 hover:bg-accent-orange-600 transition-colors flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider border-l border-white/20 px-2"
                title="15% Platform & MRV Operations"
              >
                15% MRV
              </div>
            </div>
          </div>

          {/* 3-Column Clean Card Breakdown */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">

            <div className="rounded-lg border border-neutral-purple-200 bg-neutral-purple-50/40 p-5 transition-colors hover:border-primary-green-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-green-700" />
                <span className="text-2xl font-extrabold text-primary-green-900 tabular-nums">70%</span>
              </div>
              <div className="mt-2 text-base font-bold text-primary-green-900">
                Smallholder Farmer Wallets
              </div>
              <p className="mt-1 text-sm text-neutral-purple-700 leading-relaxed font-normal">
                Direct seasonal disbursements to verified producer bank or mobile money accounts.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-purple-200 bg-neutral-purple-50/40 p-5 transition-colors hover:border-primary-green-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-green-400" />
                <span className="text-2xl font-extrabold text-primary-green-900 tabular-nums">15%</span>
              </div>
              <div className="mt-2 text-base font-bold text-primary-green-900">
                Cooperative Development Fund
              </div>
              <p className="mt-1 text-sm text-neutral-purple-700 leading-relaxed font-normal">
                Shared solar water pumps, high-yield certified seed stocks, and union governance.
              </p>
            </div>

            <div className="rounded-lg border border-neutral-purple-200 bg-neutral-purple-50/40 p-5 transition-colors hover:border-primary-green-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-orange-500" />
                <span className="text-2xl font-extrabold text-primary-green-900 tabular-nums">15%</span>
              </div>
              <div className="mt-2 text-base font-bold text-primary-green-900">
                Platform & MRV Operations
              </div>
              <p className="mt-1 text-sm text-neutral-purple-700 leading-relaxed font-normal">
                Continuous IoT field sensor maintenance, satellite telemetry feeds, and audit compilation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
