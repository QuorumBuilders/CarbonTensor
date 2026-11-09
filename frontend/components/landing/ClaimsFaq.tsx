import { ShieldAlert } from "lucide-react";

export function ClaimsFaq() {
  const faqs = [
    {
      q: "Is TensorCarbon a Carbon Registry or Accredited Validation/Verification Body (VVB)?",
      a: "No. TensorCarbon is strictly an aggregation and MRV data infrastructure layer. We do not issue carbon credits, nor do we act as a certification standard. We package field water sensor telemetry, cooperative registries, and satellite cross-checks into auditable evidence packs submitted to accredited third-party VVBs (e.g., Verra, Gold Standard) for formal certification.",
      tag: "Scope & Boundaries",
    },
    {
      q: "Why are all carbon metrics labeled as 'tCO₂e (est.)'?",
      a: "In accordance with scientific and carbon accounting integrity, avoided methane can only be modeled based on methodology baseline equations (such as Verra VM0042 / IPCC Tier 2 parameters) until third-party verification and issuance is completed. We never claim forward estimates as minted or tradeable carbon credits.",
      tag: "Carbon Accounting Honesty",
    },
    {
      q: "What does 'Sentinel-1 Radar Cross-Check (Sample)' provide versus field water sensors?",
      a: "Synthetic Aperture Radar (SAR) from the Sentinel-1 satellite constellation penetrates cloud cover and measures surface soil dielectric properties. However, SAR backscatter cannot measure sub-surface water depth beneath a dense rice canopy. Therefore, radar data is used exclusively as an independent macro-sanity check to flag large-scale continuous inundation, while physical perforated Pani pipe sensors provide direct in-situ water table measurement.",
      tag: "Remote Sensing Accuracy",
    },
    {
      q: "What does 'Access Bank Sandbox (Simulated)' mean in the application?",
      a: "All financial disbursal flows and account balances shown in this demonstration environment operate on simulated sandbox API rails modeled after Access Bank's payment routing architecture. Live transfers will occur only after regulatory approval, cooperative charter sign-off, and formal carbon offtake escrow funding.",
      tag: "Banking Integration Status",
    },
    {
      q: "How do smallholder farmers without smartphones interact with the system?",
      a: "Farmers do not require smartphones. Cooperative field lead officers log farm polygons during initial enrollment. During active drying cycles, farmers receive SMS/USSD alerts (*384# gateway) on standard 2G feature phones notifying them when their field reaches the -15cm threshold for re-flooding, and receive direct SMS credit alerts upon dividend disbursement.",
      tag: "Farmer Access & Inclusion",
    },
  ];

  return (
    <section id="claims" className="py-16 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-purple-100 text-xs font-semibold text-neutral-purple-900 mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-accent-orange-600" />
            <span>Integrity Guardrails</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight">
            Claims & Transparency: What We Do and Do Not Claim
          </h2>
          <p className="mt-4 text-base text-neutral-purple-900 leading-relaxed">
            Carbon integrity requires absolute honesty. Below are the precise technical, legal, and operational boundaries governing our data and payout layer.
          </p>
        </div>

        {/* Native <details> Accordion Grid */}
        <div className="mt-10 space-y-4 max-w-4xl">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-lg border border-neutral-purple-300 bg-neutral-purple-50/40 p-5 transition-colors open:bg-white open:border-primary-green-600 open:shadow-xs"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base text-primary-green-900 focus:outline-none">
                <div className="flex items-center gap-3 pr-4">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary-green-100 text-primary-green-800 shrink-0">
                    {faq.tag}
                  </span>
                  <span>{faq.q}</span>
                </div>
                <span className="text-primary-green-700 transition-transform duration-200 group-open:rotate-180 shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>

              <div className="mt-4 pt-3 border-t border-neutral-purple-200 text-sm text-neutral-purple-900 leading-relaxed">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
