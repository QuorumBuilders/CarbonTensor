import { AlertTriangle, Droplets, Scale, Check, ArrowRight, ShieldCheck } from "lucide-react";

export function ProblemSection() {
  return (
    <section id="problem" className="py-16 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-purple-100 text-xs font-semibold text-neutral-purple-900 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange-500" />
            <span>The Climate & Agronomic Problem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight">
            Flooded rice produces 12% of global agricultural methane. Smallholders cannot afford individual carbon audits.
          </h2>
          <p className="mt-4 text-base text-neutral-purple-900 leading-relaxed">
            Continuous anaerobic flooding denies oxygen to paddy soil, allowing methanogenic archaea to generate massive volumes of methane gas. Alternate Wetting and Drying (AWD) solves the biology, but fragmented smallholder plots make individual verification financially impossible.
          </p>
        </div>

        {/* Comparative Architecture Grid (The Agronomic & Verification Gap) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Conventional Flooding Practice */}
          <div className="rounded-lg border border-neutral-purple-300 bg-neutral-purple-50 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200">
                <span className="text-xs font-bold uppercase tracking-wider text-status-error-text">
                  Conventional Baseline
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-status-error-bg text-status-error-text border border-status-error-text/20">
                  Continuous Submersion
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-primary-green-900">
                Anaerobic Decomposition & Unmeasured Emissions
              </h3>

              <ul className="mt-6 space-y-4 text-sm text-neutral-purple-900">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-status-error-bg text-status-error-text shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-primary-green-900">Sustained Anaerobic Soil:</strong> Paddy is submerged under 5–10cm of water for 90+ consecutive days, triggering continuous methane generation.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-status-error-bg text-status-error-text shrink-0 mt-0.5">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-primary-green-900">Water Depletion:</strong> Smallholder farmers over-irrigate by up to 35%, increasing diesel fuel pump expenditure without agronomic yield gains.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-status-error-bg text-status-error-text shrink-0 mt-0.5">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-primary-green-900">Prohibitive Verification Friction:</strong> Average farm size in Northern Nigeria is 1.4 hectares. Single-plot auditor site visits cost more than the value of the carbon offset generated.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-purple-200 flex items-center justify-between text-xs font-mono text-neutral-purple-700">
              <span>Status: High Methane Footprint</span>
              <span>Auditor Cost: Deficit</span>
            </div>
          </div>

          {/* Card 2: TensorCarbon AWD Cooperative Aggregation */}
          <div className="rounded-lg border-2 border-primary-green-600 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-primary-green-100">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-green-700">
                  TensorCarbon Aggregation Solution
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary-green-50 text-primary-green-800 border border-primary-green-300">
                  AWD Water Layer + Cooperative MRV
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-primary-green-900">
                Aerobic Drainage Cycles & Collective Verification
              </h3>

              <ul className="mt-6 space-y-4 text-sm text-neutral-purple-900">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-primary-green-50 text-primary-green-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-primary-green-900">Soil Oxygenation:</strong> Water table naturally recedes to -15cm, introducing oxygen into root zones and breaking methanogenesis while preserving paddy yields.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-primary-green-50 text-primary-green-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-primary-green-900">Continuous Perforated Field Tubes:</strong> Low-cost field sensors monitor water level cycles automatically, eliminating physical inspector overhead.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-primary-green-50 text-primary-green-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-primary-green-900">Cooperative Union Aggregation:</strong> Hundreds of adjacent smallholders are grouped into single contiguous polygon cohorts, making external VVB auditing cost-effective.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-primary-green-100 flex items-center justify-between text-xs font-mono text-primary-green-800">
              <span className="font-semibold text-primary-green-700">Emissions: -48% tCO₂e (est.)</span>
              <span className="font-semibold text-accent-orange-600">Direct Farmer Payout Enabled</span>
            </div>
          </div>

        </div>

        {/* Structural Thesis Box */}
        <div className="mt-8 rounded-lg border border-neutral-purple-300 bg-neutral-purple-100/70 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary-green-700 shrink-0" />
            <p className="text-sm font-medium text-neutral-purple-900">
              <strong className="text-primary-green-900">Core Architecture Thesis:</strong> Individual smallholders cannot bear the fixed transaction costs of carbon accreditation. By bundling thousands of farm plots through established Nigerian agricultural cooperatives, TensorCarbon creates institutional-grade, bankable data batches.
            </p>
          </div>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green-800 hover:text-primary-green-900 underline whitespace-nowrap"
          >
            <span>Review Data Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
