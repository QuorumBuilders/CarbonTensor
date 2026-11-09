# TensorCarbon Frontend Architecture

## 1. System Overview
TensorCarbon Frontend is a specialized web interface aggregating Nigerian rice farming cooperatives to monitor, verify, and disburse payouts for avoided methane emissions via Alternate Wetting and Drying (AWD) water management.

The architecture emphasizes:
- **Resilient Data Decoupling**: Dual-mode data fetching with seamless mock-safe fallback adapters for zero-backend standalone demos.
- **Cartographic & Time-Series Precision**: High-density dashboards visualizing water depth sensors, Sentinel-1 radar cross-checks, and cooperative plot boundaries.
- **Strict Brand Design System**: Deterministic color tokens derived from the Forest Green anchor (`#0B4D25`), Accent Orange (`#F15A24`), and Neutral Purple canvas (`#E2DFEA`).

## 2. Technology Stack
- **Framework**: Next.js 16+ (App Router, Turbopack, React 19)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with Brand Token System
- **Icons**: `lucide-react`
- **Utility Libraries**: `clsx`, `tailwind-merge`
- **Data Fetching Layer**: Client HTTP layer with mock fallback adapter (TanStack Query compatible contracts)
- **Package Manager**: `pnpm` exclusively

## 3. Directory Hierarchy
```text
frontend/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root HTML shell & Google Sans font setup
│   ├── page.tsx                # Public brand landing & overview
│   ├── globals.css             # Design tokens, CSS variables, utility classes
│   ├── dashboard/              # Cooperative dashboard & plot views
│   ├── mrv/                    # Verifier MRV audit & radar cross-checks
│   └── payouts/                # Access Bank sandbox payout split view
├── components/                 # Presentation & UI components
│   ├── common/                 # Reusable atomic controls (buttons, badges, pills)
│   ├── layout/                 # Shell, navigation, status bar
│   ├── map/                    # Cartographic plot boundary canvas
│   ├── charts/                 # AWD water table time-series charts
│   └── payouts/                # Payout ledger and breakdown tables
├── lib/                        # Domain logic and utilities
│   ├── api/                    # HTTP client and mock-safe data adapters
│   ├── types/                  # Domain contracts (AWD metrics, plots, payouts)
│   ├── mock/                   # Seeded Nigerian cooperative datasets
│   └── utils.ts                # cn (clsx + tailwind-merge) helper
├── docs/                       # Architecture, agent rules, ADRs, state tracker
│   ├── agent_rules.md
│   ├── architecture.md
│   ├── decisions.md
│   ├── plan.md
│   └── STATE.md
├── public/                     # Static assets (logos, GeoJSON, samples)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 4. Component Boundaries & Mock-Safe Architecture
1. **Presentation Layer**:
   - Pure UI components receiving props, fully decoupled from networking.
   - Reusable semantic status pills (`Success`, `Warning`, `Error`, `Info`).
2. **Client HTTP & Mock Fallback Layer**:
   - Every API client function implements an automatic fallback to seeded mock data if the backend environment variable is absent or unreachable.
   - Ensures standalone demonstrations and verifier audits execute reliably without external infrastructure dependencies.
3. **Data Contracts**:
   - Explicit TypeScript schemas for Rice Cooperatives, Field Plots, Water Table Sensor Feeds, Sentinel-1 Backscatter Readings, and Access Bank Disbursal Batches.

