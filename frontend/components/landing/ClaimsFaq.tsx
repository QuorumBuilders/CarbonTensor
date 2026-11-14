"use client";

import { useState } from "react";
import { IconShieldCheck, IconChevronDown } from "@tabler/icons-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Does CarbonTensor issue or trade carbon credits directly?",
    a: "No. CarbonTensor is a digital MRV data infrastructure layer, not a carbon registry or brokerage. We aggregate ground sensor telemetry, process remote-sensing data, and assemble verifiable evidence dossiers. Official validation, credit issuance, and registry listing remain under the authority of accredited independent bodies (VVBs) and recognized registries like Verra and Gold Standard.",
  },
  {
    q: "How does satellite radar cross-check ground sensor readings?",
    a: "We ingest Synthetic Aperture Radar (SAR) backscatter data from the European Space Agency's Sentinel-1 satellite constellation. Radar wavelengths penetrate cloud cover and reflect differently off standing surface water versus drained soil. This provides an objective, external check on field conditions to identify sensor tube tampering, reporting blackouts, or continuous flooding violations.",
  },
  {
    q: "How does Alternate Wetting and Drying (AWD) affect rice yield?",
    a: "Peer-reviewed agronomic research conducted by AfricaRice and the International Rice Research Institute (IRRI) demonstrates that draining fields down to a maximum depth of -15 cm before re-flooding preserves optimal root-zone soil moisture. AWD does not reduce harvest yields when managed correctly and reduces irrigation diesel pumping expenses by up to 30%.",
  },
  {
    q: "How are payments disbursed to rural farmers without smartphones?",
    a: "Farmers do not require smartphones or internet connectivity to participate. Cooperative field agents conduct initial GPS plot onboarding, and stationary in-situ sensors transmit water telemetry automatically. Farmers receive water schedule reminders and payout confirmation alerts over basic feature phones using SMS and USSD (*384#). Dividend distributions transfer directly to registered bank accounts or mobile wallets via Access Bank rails.",
  },
  {
    q: "Why are all monetary and carbon metrics marked as estimates?",
    a: "Carbon accounting rules prohibit claiming certified carbon assets before third-party verification and formal registry issuance. Until an independent VVB completes the field audit for a given cultivation cycle, all carbon avoidance figures are strictly marked as tCO₂e (est.) and all payout figures reflect simulated or modeled values.",
  },
];

export function ClaimsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-24 bg-card border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-muted text-xs font-mono font-medium text-foreground border border-border">
            <IconShieldCheck size={14} stroke={1.5} className="text-accent" />
            <span>Operational Boundaries</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2]">
            Scientific standards, governance
            <br /> and platform responsibilities.
          </h2>

          <p className="text-base sm:text-lg font-normal text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Rigorous carbon accounting requires transparent separation between digital telemetry collection, independent third-party audit, and regulatory credit issuance.
          </p>
        </div>

        {/* Calm Divider-Based FAQ Accordion (max-w-3xl) */}
        <div className="mt-12 max-w-3xl mx-auto border-t border-border">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const itemId = `faq-item-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={item.q}
                className="border-b border-border transition-colors duration-150"
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={itemId}
                  onClick={() => toggleItem(index)}
                  className="w-full py-5 flex items-center justify-between text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control group"
                >
                  <span className="text-base sm:text-lg font-medium text-foreground group-hover:text-brand transition-colors duration-150">
                    {item.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-control bg-muted flex items-center justify-center text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand bg-brand-muted" : ""
                    }`}
                  >
                    <IconChevronDown size={16} stroke={1.5} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={itemId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-5 pr-8 text-sm sm:text-base font-normal text-muted-foreground leading-relaxed animate-in fade-in duration-150"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
