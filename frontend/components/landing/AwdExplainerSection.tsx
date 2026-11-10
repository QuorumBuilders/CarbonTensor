import { Droplets, ArrowDown, RefreshCw, Lightbulb, CheckCircle2 } from "lucide-react";

export function AwdExplainerSection() {
  const steps = [
    {
      number: "1",
      name: "Flood",
      heading: "Water the field as usual.",
      description:
        "At early crop establishment, the field is flooded with approximately 5 cm of standing water to support root growth and suppress weeds.",
      waterLevel: "+5 cm",
      waterState: "Standing water",
      icon: Droplets,
    },
    {
      number: "2",
      name: "Dry",
      heading: "Let the water level drop for a few days.",
      description:
        "Irrigation is paused. The water level recedes naturally through percolation and evaporation until it reaches 15 cm below the soil surface.",
      waterLevel: "-15 cm",
      waterState: "Soil aerated",
      icon: ArrowDown,
    },
    {
      number: "3",
      name: "Re-flood",
      heading: "Water the field again, then repeat.",
      description:
        "When the pani pipe sensor confirms -15 cm, the field is re-flooded to shallow depth. The cycle repeats until the rice flowering stage.",
      waterLevel: "+5 cm",
      waterState: "Cycle reset",
      icon: RefreshCw,
    },
  ];

  return (
    <section id="awd-explainer" className="py-16 lg:py-24 bg-neutral-purple-50 border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white text-xs font-semibold text-primary-green-800 mb-3 border border-neutral-purple-200">
            <span className="w-2 h-2 rounded-full bg-primary-green-500" />
            <span>Agronomic Practice Explained</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            Alternate Wetting and Drying (AWD): dry the field, avoid the methane.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-purple-800 leading-relaxed font-normal">
            AWD means the field is not kept flooded all the time. It is drained for a period, then watered again.
          </p>
        </div>

        {/* 3 Step Sequence Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="rounded-xl border border-neutral-purple-200 bg-white p-6 sm:p-7 shadow-xs hover:border-primary-green-300 transition-colors duration-150 flex flex-col justify-between relative"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary-green-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {step.number}
                      </span>
                      <span className="font-bold text-sm uppercase tracking-wider text-primary-green-800 font-mono">
                        Step {step.number}: {step.name}
                      </span>
                    </span>

                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary-green-50 text-primary-green-800 border border-primary-green-200 tabular-nums">
                      {step.waterLevel}
                    </span>
                  </div>

                  {/* Icon & Heading */}
                  <div className="mt-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-green-50 border border-primary-green-200 flex items-center justify-center text-primary-green-700 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-green-900 leading-snug">
                      {step.heading}
                    </h3>
                  </div>

                  {/* Detail Text */}
                  <p className="mt-4 text-sm text-neutral-purple-800 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Status Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-purple-200 flex items-center justify-between text-xs font-mono text-neutral-purple-700">
                  <span>Soil condition:</span>
                  <span className="font-semibold text-primary-green-800">{step.waterState}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why it works Callout Banner */}
        <div className="mt-10 rounded-xl border border-primary-green-200 bg-primary-green-50/80 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-green-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lightbulb className="w-6 h-6 text-primary-green-100" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-primary-green-900">
                Why it works: Less time under water means less methane.
              </h3>
              <p className="mt-1 text-sm text-primary-green-800 leading-relaxed">
                Methane is produced only when soils remain strictly anaerobic (deprived of oxygen). When farmers let the water drop to -15 cm, oxygen penetrates the topsoil and shuts off the methanogen bacteria. Rice roots still have access to capillary moisture in the subsoil, maintaining grain yield while cutting methane emissions by up to 50%.
              </p>
            </div>

            <div className="sm:self-center shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold bg-white text-primary-green-900 border border-primary-green-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-primary-green-600" />
                Preserves Crop Yield
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
