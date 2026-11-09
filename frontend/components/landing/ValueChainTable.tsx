export function ValueChainTable() {
  const rows = [
    {
      actor: "Smallholder Rice Farmers",
      category: "Value Creator",
      action: "Field Water Management",
      responsibility: "Installs perforated Pani pipes; manually regulates irrigation to let water table drop to -15cm AWD threshold during vegetative cycle.",
      deliverable: "Physical aeration of paddy soil, directly abating methane emissions.",
      remuneration: "70% Carbon Dividend (Disbursed directly via Access Bank Sandbox / Mobile Wallets).",
      isPrimary: true,
    },
    {
      actor: "Rice Cooperative Unions",
      category: "Aggregator & Support",
      action: "Cluster Administration",
      responsibility: "Maintains member biometric records, polygon plot boundary GPS demarcations, and provides localized training.",
      deliverable: "Aggregated, verified smallholder cohorts (minimum 250 contiguous hectares per cluster).",
      remuneration: "15% Cooperative Development Pool (Reinvested in community solar pumps and seed stock).",
      isPrimary: false,
    },
    {
      actor: "TensorCarbon Platform",
      category: "Data & MRV Layer",
      action: "Automated Data Ingestion",
      responsibility: "Validates field sensor telemetry, executes anomaly detection algorithms, runs Sentinel-1 radar cross-checks.",
      deliverable: "Hashed, methodology-aligned digital Evidence Packages tagged tCO₂e (est.).",
      remuneration: "15% Platform & Telemetry Operations Fee.",
      isPrimary: false,
    },
    {
      actor: "External VVBs & Carbon Registries",
      category: "Independent Auditor (External)",
      action: "Certification & Issuance",
      responsibility: "Accredited third-party verification bodies (e.g. Verra VM0042 / Gold Standard) audit telemetry packages.",
      deliverable: "Officially certified carbon credits on external public registry.",
      remuneration: "Statutory registry audit fees (covered prior to net distribution).",
      isPrimary: false,
    },
    {
      actor: "Sovereign & Corporate Buyers",
      category: "Carbon Capital",
      action: "Offtake & Retirement",
      responsibility: "Purchases high-permanence Article 6 and voluntary methane avoidance credits to meet verified net-zero targets.",
      deliverable: "Capital injection into carbon settlement escrow.",
      remuneration: "Retired compliance certificates and verifiable ESG impact receipts.",
      isPrimary: false,
    },
  ];

  return (
    <section id="value-chain" className="py-16 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-purple-100 text-xs font-semibold text-neutral-purple-900 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-green-700" />
            <span>Economic Alignment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight">
            Who Creates, Who Verifies, Who Pays
          </h2>
          <p className="mt-4 text-base text-neutral-purple-900 leading-relaxed">
            Every participant in the TensorCarbon value chain operates under defined agronomic, verification, and financial boundaries.
          </p>
        </div>

        {/* Dense Spatial Table */}
        <div className="mt-10 overflow-x-auto rounded-lg border border-neutral-purple-300">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-primary-green-800 text-white font-medium text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 border-b border-primary-green-700">Stakeholder</th>
                <th className="py-3.5 px-4 border-b border-primary-green-700">Role & Category</th>
                <th className="py-3.5 px-4 border-b border-primary-green-700">Verification Responsibility</th>
                <th className="py-3.5 px-4 border-b border-primary-green-700">Auditable Deliverable</th>
                <th className="py-3.5 px-4 border-b border-primary-green-700">Economic Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-purple-200 bg-white">
              {rows.map((row) => (
                <tr
                  key={row.actor}
                  className={`hover:bg-primary-green-50/40 transition-colors ${
                    row.isPrimary ? "bg-primary-green-50/20" : ""
                  }`}
                >
                  <td className="py-4 px-4 font-bold text-primary-green-900 align-top">
                    {row.actor}
                    {row.isPrimary && (
                      <span className="block mt-1 text-[10px] uppercase tracking-wide font-extrabold text-accent-orange-600">
                        Primary Value Origin
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 align-top">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-neutral-purple-100 text-neutral-purple-800 border border-neutral-purple-200">
                      {row.category}
                    </span>
                    <span className="block mt-1 text-xs text-neutral-purple-600 font-medium">
                      {row.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-neutral-purple-900 align-top max-w-xs leading-relaxed">
                    {row.responsibility}
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-primary-green-800 align-top max-w-xs">
                    {row.deliverable}
                  </td>
                  <td className="py-4 px-4 text-xs font-semibold text-primary-green-900 align-top max-w-xs">
                    {row.remuneration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote on Payout Cadence */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-purple-600 font-mono">
          <span>* Payout Structure: 40% Seasonal Advance (Post-Sensor Audit) + 60% Registry Issuance Dividend.</span>
          <span className="font-semibold text-primary-green-800">Settled via: Access Bank Sandbox (Simulated)</span>
        </div>

      </div>
    </section>
  );
}
