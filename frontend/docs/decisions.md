# Architectural Decision Records (ADRs)

## ADR-01: Next.js App Router with pnpm
- **Context**: The frontend requires rapid compilation, strong TypeScript typing, server-side rendering capability for landing documentation, and high-performance client routing for interactive spatial dashboards.
- **Decision**: Adopt Next.js 16+ App Router with React 19 and Turbopack. Enforce `pnpm` exclusively as the package manager across all developer workflows and CI scripts.
- **Consequences**: Fast builds, native route handlers, standard modular component tree, and guaranteed reproducible package resolution.

## ADR-02: Strict Emerald/Forest Green Brand Color System with 50–900 Tonal Scale
- **Context**: Visual identity needs to convey environmental fidelity, agricultural spatial data, and institutional trust for financial payouts without generic software gradients or ungrounded aesthetics.
- **Decision**: Implement a disciplined 3-axis token scale:
  1. *Primary Green Scale*: Grounded around `#0B4D25` (700) for chrome, ground containers, and vegetation depth.
  2. *Accent Orange Scale*: Anchored at `#F15A24` (500) strictly for primary conversion actions.
  3. *Neutral Purple Scale*: Anchored at `#E2DFEA` (200) for structural surfaces and hairline borders (never primary button background).
  4. *Semantic Status Tokens*: Hardcoded, high-contrast paired backgrounds and typography for Success, Warning, Error, and Info.
- **Consequences**: Cohesive visual hierarchy across maps, sensor charts, and payout tables with zero arbitrary hex values in component code.

## ADR-03: Conventional Commits with Atomic PR Chunks
- **Context**: Project development proceeds in rapid micro-increments requiring clear traceability and seamless review handoffs.
- **Decision**: Structure the delivery into 10 sequential micro-PRs following the Conventional Commits standard (`feat:`, `chore:`, `fix:`, `docs:`, `style:`).
- **Consequences**: Every PR represents an isolated, compilable deliverable with zero regressions and clean Git history.

## ADR-04: Non-Overclaiming UI Copy Guardrails
- **Context**: Methane mitigation in agricultural MRV (Measurement, Reporting, and Verification) and carbon finance requires legal and scientific accuracy. Overclaiming unverified credits damages verifier credibility.
- **Decision**: Enforce strict terminology invariants across all UI strings:
  - All carbon tonnage metrics must be explicitly qualified as `tCO₂e (est.)`.
  - All banking integrations must be explicitly qualified as `Access Bank Sandbox (Simulated)`.
  - All satellite radar comparisons must be explicitly qualified as `Sentinel-1 Radar Cross-Check (Sample)`.
  - Total ban on generic promotional jargon ("revolutionize", "cutting-edge", "game-changing").
- **Consequences**: Trustworthy, institutional-grade product presentation suited for verification bodies, cooperative managers, and carbon buyers.

