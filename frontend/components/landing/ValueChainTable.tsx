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
      actor: "CarbonTensor Platform",
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
            Every participant in the CarbonTensor value chain operates under defined agronomic, verification, and financial boundaries.
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
                <th className="py-3.5 px-4 border-b border-primary-green-700">Output Deliverable</th>
                <th className="py-3.5 px-4 border-b border-primary-green-700">Financial Remuneration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-purple-200 bg-white">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-neutral-purple-50/80 transition-colors ${
                    row.isPrimary ? "bg-primary-green-50/40" : ""
                  }`}
                >
                  <td className="py-4 px-4 font-bold text-primary-green-900 whitespace-nowrap">
                    {row.actor}
                    {row.isPrimary && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-primary-green-200 text-primary-green-900">
                        Primary Producer
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-neutral-purple-700 whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="py-4 px-4 text-xs text-neutral-purple-900 max-w-xs leading-relaxed">
                    {row.responsibility}
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-primary-green-800 max-w-xs leading-relaxed">
                    {row.deliverable}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs font-semibold text-primary-green-900 whitespace-nowrap">
                    {row.remuneration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
