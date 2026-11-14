import {
  IconBook,
  IconArrowRight,
  IconClock,
  IconDroplet,
  IconPlant2,
  IconCoins,
} from "@tabler/icons-react";

export function LearnBasicsSection() {
  const articles = [
    {
      id: "methane-101",
      title: "Paddy Soil Methanogenesis 101",
      subtitle: "Why anaerobic soils produce methane gas.",
      description:
        "Stagnant water tables isolate soil organic matter from atmospheric oxygen, enabling anaerobic methanogens. Periodic aeration restores aerobic respiration.",
      category: "Soil Biology",
      readTime: "4 min read",
      icon: IconDroplet,
      href: "#awd-explainer",
    },
    {
      id: "awd-steps",
      title: "Field Piezometer Operation",
      subtitle: "Pani pipe installation and reading protocol.",
      description:
        "Practical field guide on positioning perforated PVC tubes to -15 cm, checking capillary subsoil moisture, and calibrating daily readings.",
      category: "Field Practical",
      readTime: "5 min read",
      icon: IconPlant2,
      href: "#how-it-works",
    },
    {
      id: "carbon-credit",
      title: "UNFCCC AMS-III.H Methodology",
      subtitle: "Emission factor baselines and registry audits.",
      description:
        "Understand smallholder baseline formulas, satellite cross-validation requirements, and how aggregated cohorts achieve third-party VVB validation.",
      category: "Carbon Economics",
      readTime: "6 min read",
      icon: IconCoins,
      href: "#payout-split",
    },
  ];

  return (
    <section
      id="learn"
      className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconBook size={14} stroke={1.5} className="text-accent" />
            <span>Knowledge Resources</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            Technical documentation
            <br className="hidden sm:inline" /> and field agronomic guides.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed">
            Essential reference materials for cooperative managers, verifiers, and extension officers managing Alternate Wetting and Drying cohorts.
          </p>
        </div>

        {/* 3-Card Knowledge Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <a
                key={article.id}
                href={article.href}
                className="group rounded-card border border-border bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-brand/60 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-pill bg-muted text-muted-foreground border border-border">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-subtle">
                      <IconClock size={12} stroke={1.5} />
                      <span className="tabular-nums">{article.readTime}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-control bg-muted border border-border flex items-center justify-center text-brand mb-3">
                      <Icon size={16} stroke={1.5} />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-foreground group-hover:text-brand transition-colors duration-150">
                      {article.title}
                    </h3>
                    <p className="text-xs font-mono text-brand">
                      {article.subtitle}
                    </p>
                  </div>

                  <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-brand">
                  <span className="inline-flex items-center gap-1">
                    <span>Review Guide</span>
                    <IconArrowRight
                      size={13}
                      stroke={1.5}
                      className="group-hover:translate-x-0.5 transition-transform duration-150"
                    />
                  </span>
                  <span className="text-subtle">#{article.id}</span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
