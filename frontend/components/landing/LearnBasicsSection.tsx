import { BookOpen, ArrowRight, Clock, Sprout, Droplets, Coins, FileCheck2, Leaf } from "lucide-react";

export function LearnBasicsSection() {
  const articles = [
    {
      id: "methane-101",
      title: "Rice and methane 101",
      subtitle: "Why flooded fields release methane.",
      description:
        "Learn why stagnant floodwater prevents oxygen from penetrating paddy soils, how anaerobic bacteria produce methane gas, and how periodic drying stops the process.",
      category: "Soil Biology",
      readTime: "4 min read",
      icon: Droplets,
      href: "#problem",
    },
    {
      id: "awd-steps",
      title: "What is AWD and how do you do it?",
      subtitle: "The steps, in plain language.",
      description:
        "A practical field walkthrough on installing perforated pani pipes, monitoring the -15 cm water line, and timing irrigation cycles without reducing paddy yield.",
      category: "Field Practical",
      readTime: "5 min read",
      icon: Sprout,
      href: "#awd-explainer",
    },
    {
      id: "carbon-credit",
      title: "What is a carbon credit?",
      subtitle: "Who creates it, who checks it, who pays.",
      description:
        "Follow the path of verified methane reduction from a smallholder cooperative to accredited independent VVBs, international registries, and corporate buyers.",
      category: "Carbon Economics",
      readTime: "6 min read",
      icon: Coins,
      href: "#payout-split",
    },
    {
      id: "farm-management",
      title: "Water and farm management basics",
      subtitle: "Scheduling irrigation and keeping simple field records.",
      description:
        "How cooperative clusters manage shared irrigation canals, allocate water days, and maintain straightforward digital plot logs that pass audit requirements.",
      category: "Cooperative Ops",
      readTime: "4 min read",
      icon: FileCheck2,
      href: "#how-it-works",
    },
    {
      id: "climate-friendly",
      title: "Climate-friendly farm practices",
      subtitle: "Straw handling, fertilizer timing and more.",
      description:
        "Beyond water depth: managing post-harvest crop residue without open burning, timing urea applications, and improving organic soil health across seasons.",
      category: "Agronomy",
      readTime: "5 min read",
      icon: Leaf,
      href: "#benefits",
    },
  ];

  return (
    <section id="learn" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-purple-100 text-xs font-semibold text-neutral-purple-900 mb-3 border border-neutral-purple-200">
            <BookOpen className="w-3.5 h-3.5 text-primary-green-700" />
            <span>Educational Knowledge Base</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-green-900 tracking-tight leading-tight">
            Learn the basics.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-purple-800 leading-relaxed font-normal">
            Straightforward, practical guides for farmers, cooperative leaders, and agronomists on rice decarbonization, water stewardship, and carbon credits.
          </p>
        </div>

        {/* 5-Card Article Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <a
                key={article.id}
                href={article.href}
                className="group rounded-xl border border-neutral-purple-200 bg-white p-6 sm:p-7 shadow-xs hover:border-primary-green-400 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-purple-200">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-purple-600">
                      <Clock className="w-3 h-3 text-neutral-purple-500" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-purple-50 border border-neutral-purple-200 flex items-center justify-center text-primary-green-700 group-hover:bg-primary-green-50 group-hover:border-primary-green-300 transition-colors duration-150 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-green-900 leading-snug group-hover:text-primary-green-700 transition-colors duration-150">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-primary-green-800">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-sm text-neutral-purple-800 leading-relaxed font-normal">
                    {article.description}
                  </p>
                </div>

                {/* Read More Transition Action */}
                <div className="mt-6 pt-4 border-t border-neutral-purple-200 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-primary-green-700 group-hover:text-primary-green-900 transition-colors duration-150">
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-150" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-purple-500">
                    Article #{article.id}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

