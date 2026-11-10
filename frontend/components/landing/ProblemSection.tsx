import { Droplets, CircleDollarSign, Users, AlertTriangle } from "lucide-react";

export function ProblemSection() {
  const problemCards = [
    {
      step: "01",
      tag: "Anaerobic Decomposition",
      icon: Droplets,
      title: "Flooded fields release methane",
      description:
        "When rice paddies stay continuously flooded with water, oxygen cannot penetrate the soil. Microorganisms known as methanogens thrive in this anaerobic environment, breaking down organic matter and releasing potent methane (CH₄) gas directly into the atmosphere.",
      takeaway: "Continuous submersion drives ~12% of global ag methane.",
    },
    {
      step: "02",
      tag: "Unrewarded Practice",
      icon: CircleDollarSign,
      title: "Farmers control the water, but are not paid for it",
      description:
        "Smallholders make the daily effort to open bunds, fuel pumps, and manage water. Alternate Wetting and Drying (AWD) cuts methane significantly, yet farmers bear the operational risks and labor without receiving any share of carbon proceeds.",
      takeaway: "No financial mechanism currently rewards water stewardship.",
    },
    {
      step: "03",
      tag: "Auditing Friction",
      icon: Users,
      title: "One farm is too small to certify",
      description:
        "The average smallholder plot in Northern Nigeria is 1 to 2 hectares. Individual verification site visits, legal audits, and registry fees cost thousands of dollars per farm. Aggregating plots into cooperatives is the only way to make certification financially viable.",
      takeaway: "Cooperative aggregation unlocks institutional registry scale.",
    },
  ];

  return (
    <section id="problem" className="py-16 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-purple-100 text-xs font-semibold text-neutral-purple-900 mb-3 border border-neutral-purple-200">
            <AlertTriangle className="w-3.5 h-3.5 text-accent-orange-500" />
            <span>The Challenge in Smallholder Rice</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            Flooded fields from Nigerian rice farms contribute to climate change.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-purple-800 leading-relaxed font-normal">
            Continuous flooding in paddy fields creates anaerobic conditions that produce methane. Smallholder farmers manage the water daily, but high individual certification costs have kept carbon rewards out of reach.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problemCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                className="rounded-xl border border-neutral-purple-200 bg-white p-6 sm:p-7 shadow-xs hover:border-primary-green-300 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-purple-100 text-neutral-purple-800">
                      {card.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-purple-500">
                      {card.step}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-green-50 border border-primary-green-200 flex items-center justify-center text-primary-green-700 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-green-900 leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  {/* Narrative Body */}
                  <p className="mt-4 text-sm text-neutral-purple-800 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Key Takeaway */}
                <div className="mt-6 pt-4 border-t border-neutral-purple-200">
                  <div className="text-xs font-mono text-primary-green-800 bg-primary-green-50/60 p-2.5 rounded border border-primary-green-100">
                    <span className="font-bold">Fact: </span>
                    {card.takeaway}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
