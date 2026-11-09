import { Calendar } from "lucide-react";

export function RoadmapSection() {
  const milestones = [
    {
      quarter: "Q1 2026",
      phase: "Phase 1: Cooperative Onboarding & Baseline Mapping",
      status: "Active Execution",
      badgeColor: "bg-primary-green-100 text-primary-green-800 border-primary-green-300",
      description:
        "Execution of initial bilateral MoUs with 12 rice farming unions in Kano (Wudil/Kura) and Niger (Badeggi). Polygon geofencing of 3,420 ha of continuous paddies and farmer baseline surveys.",
      deliverable: "Cooperative Charters & Verified Plot GIS GeoJSON Registries",
    },
    {
      quarter: "Q2 2026",
      phase: "Phase 2: NCCC Concept Note & Article 6 Alignment",
      status: "In Review",
      badgeColor: "bg-neutral-purple-100 text-neutral-purple-900 border-neutral-purple-300",
      description:
        "Submission of technical project design concept note to Nigeria's National Council on Climate Change (NCCC). Establishing corresponding adjustment protocols under Paris Agreement Article 6.2/6.4.",
      deliverable: "Host Country Letter of Endorsement & Article 6 Framework",
    },
    {
      quarter: "Q3 2026",
      phase: "Phase 3: 250-Plot IoT Telemetry Pilot & Access Bank Sandbox",
      status: "Scheduled",
      badgeColor: "bg-neutral-purple-100 text-neutral-purple-900 border-neutral-purple-300",
      description:
        "Deployment of 250 solar-powered perforated Pani tube sensors with GSM telemetry across representative pilot plots. End-to-end integration with Access Bank Sandbox to simulate automated seasonal farmer disbursements.",
      deliverable: "Continuous Depth Telemetry Stream & API Disbursal Proofs",
    },
    {
      quarter: "Q4 2026",
      phase: "Phase 4: Independent VVB Audit & Registry Submission",
      status: "Target",
      badgeColor: "bg-neutral-purple-100 text-neutral-purple-900 border-neutral-purple-300",
      description:
        "Engagement of an accredited Validation/Verification Body (VVB) to audit first-season telemetry data packages under Verra VM0042 methodology for voluntary methane credit issuance.",
      deliverable: "Formal Third-Party Audit Pack & Registry Filing (External)",
    },
  ];

  return (
    <section id="roadmap" className="py-16 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-purple-100 text-xs font-semibold text-neutral-purple-900 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-green-700" />
            <span>Deployment Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight">
            Realistic Execution Timeline: 2026 Field Validation
          </h2>
          <p className="mt-4 text-base text-neutral-purple-900 leading-relaxed">
            Our staged roadmap focuses on institutional alignment with Nigerian sovereign climate bodies, grassroots farmer adoption, and verified telemetry infrastructure.
          </p>
        </div>

        {/* Milestone Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item) => (
            <div
              key={item.quarter}
              className="rounded-lg border border-neutral-purple-300 bg-white p-6 flex flex-col justify-between hover:border-primary-green-600 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-purple-200">
                  <span className="text-sm font-extrabold font-mono text-primary-green-900">
                    {item.quarter}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${item.badgeColor}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-bold text-primary-green-900 leading-snug">
                  {item.phase}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs text-neutral-purple-900 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Deliverable Footer */}
              <div className="mt-6 pt-3 border-t border-neutral-purple-200">
                <span className="block text-[10px] font-mono text-neutral-purple-500 uppercase tracking-wider">
                  Target Deliverable
                </span>
                <span className="mt-1 block text-xs font-semibold text-primary-green-800">
                  {item.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-4 rounded-lg border border-primary-green-300 bg-primary-green-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-primary-green-900">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-green-700 shrink-0" />
            <span>
              <strong>Regulatory Track:</strong> Aligned with Nigeria&apos;s Nationally Determined Contribution (NDC) methane abatement targets for wet-cultivated agriculture.
            </span>
          </div>
          <a
            href="#claims"
            className="font-bold text-primary-green-800 hover:text-primary-green-900 underline whitespace-nowrap"
          >
            Read Claims Transparency FAQ →
          </a>
        </div>

      </div>
    </section>
  );
}
