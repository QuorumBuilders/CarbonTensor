# Product Requirements Document (PRD): CarbonTensor Unslop Refactor

**Status:** Approved for Implementation  
**Modes:** Both (Site Mode + App Mode)  
**Target Platform:** Next.js 16+ App Router, TypeScript, Tailwind CSS v4, Tabler Icons, Geist Typography  
**Target Deployment:** Standalone zero-backend demo with resilient DRF mock fallback  

---

## 1. Executive Summary & Problem Space

**CarbonTensor** is an institutional digital Measurement, Reporting, and Verification (MRV) and climate finance platform that aggregates Nigerian smallholder rice farming cooperatives to measure Alternate Wetting and Drying (AWD) water management, verify avoided methane emissions, and automate carbon dividend distributions.

### Target Audience & Personas
1. **Cooperative Administrators (`account_type: "cooperative"`)**: Union managers (e.g. Kebbi Green Rice Growers Union / RIFAN) who aggregate hundreds of 1–2 hectare smallholder paddies into registered cohorts, monitor daily water schedules, verify live water table depth against AWD rules, and review collective dividend pools.
2. **Independent Verifiers / Auditors (`account_type: "staff"`)**: Accredited Validation and Verification Bodies (VVBs like AfricaRice or Bureau Veritas) conducting rigorous MRV audits against UNFCCC AMS-III.H and Verra VM0042 standards by reconciling in-situ piezometers against Sentinel-1 SAR satellite radar observations.
3. **Smallholder Farmers (`account_type: "farmer"`)**: Smallholders in the Argungu Rima River Basin who follow drainage schedules, receive feature-phone SMS/USSD alerts (`*384#`), and receive 70% direct dividend pass-through into local bank accounts in Nigerian Naira (NGN).

---

## 2. Modes & Scope

The application encompasses two deeply integrated modes:
* **Site Mode**: Public brand landing page (`/`) and authentication entry points (`/auth/login`, `/auth/register`) designed to explain AWD agronomy, show verifiable data architecture, and eliminate marketing slop.
* **App Mode**: Authenticated multi-role operating environment (`/dashboard`, `/verifier`, `/finance`) featuring cartographic GIS maps, high-density sensor telemetry, anomaly audit dossiers, and Access Bank sandbox payment execution.

---

## 3. Must-Haves (Core Requirements)

### 3.1 Site Mode (`/`, `/auth/login`, `/auth/register`)
* **Centered Product Hero with Peeking Interface**:
  * Replace the generic "text left, carousel right" split with a strong centered headline hierarchy ($\le 2$ lines) and a realistic peeking product surface (interactive preview of the AWD water depth monitor and live cooperative status).
  * Eliminate the $10.6\text{ MB}$ uncompressed PNG carousel; replace with responsive, compressed WebP imagery ($<180\text{ KB}$ each).
* **AWD Agronomic Water-Level Explainer**:
  * Visual, technical breakdown of the AWD cycle contrasting $-15\text{ cm}$ safe root-zone aeration (methanogenesis halted) against $+5\text{ cm}$ shallow flood re-irrigation.
* **Bento Solution Architecture**:
  * Replace the 6 identical gradient-icon feature cards with an asymmetric, content-dense bento grid reflecting real data flow: In-Situ IoT Piezometers $\to$ Cooperative Roster Aggregation $\to$ Dual Sentinel-1 SAR Cross-Check $\to$ Tamper-Evident Evidence Packaging $\to$ Direct Bank Pass-Through.
* **70/15/15 Payout Split Preview**:
  * Single, clean horizontal stacked distribution bar (70% Smallholder Farmers, 15% Cooperative Development Fund, 15% MRV Platform Operations) with plain-text qualification.
* **Calm Divider-Based Governance & Boundaries FAQ**:
  * Clean, border-separated accordion detailing registry boundaries, satellite SAR limitations, and simulated banking rails (no hype, no AI clichés).
* **Focused Authentication Screens**:
  * Streamlined login and registration forms with instant demo persona presets (Cooperative Admin, Verifier, Farmer), eliminating floating hover-shadows and glassmorphism.

### 3.2 App Mode (`/dashboard`, `/verifier`, `/finance`)
* **Role-Tailored Dashboard Layouts**:
  * Break the repetitive "banner + 4 metric cards + 2 charts" layout template. Design differentiated workspaces tailored to role tasks:
    * **Cooperative Hub (`/dashboard`)**: Map-first cartographic view paired with plot inspection spotlight, 30-day water-level chart, live telemetry simulator, and enrolled plots roster.
    * **Verifier Audit Portal (`/verifier`)**: Anomaly-queue-first view prioritizing DRF sensor rejection flags, multi-source Sentinel-1 SAR radar cross-check timeline, and JSON audit pack export.
    * **Disbursement Portal (`/finance`)**: Ledger-first view with 70/15/15 revenue split visualizer, Access Bank sandbox payments ledger, and batch settlement triggers.
* **Collapsible Custom Sidebar Navigation**:
  * Persistent desktop sidebar with clean collapsed ($80\text{ px}$) and expanded ($256\text{ px}$) states, active edge marker (`--brand` $3\text{ px}$ indicator), role badge, and fast persona switcher. Mobile drawer with accessible backdrop and $\ge 44\text{ px}$ touch targets.
* **Leaflet GIS Plot Boundary Map**:
  * Interactive vector polygon map with crisp compliance-state styling, click-to-spotlight inspection, and compact tabular tooltip overlays.
* **Recharts 30-Day AWD Water Level Time-Series**:
  * Telemetry chart plotting daily water fluctuations against the critical $-15\text{ cm}$ threshold line and $+5\text{ cm}$ re-flooding band.
* **Live IoT Sensor Simulator Bar**:
  * In-browser transmission toolbar allowing operators and evaluators to inject custom or randomized water levels (normal drying, submerged flooding, sensor fault anomaly) and witness instant reactive updates across charts and tables.
* **Feature-Phone Farmer SMS & USSD Modal (`*384#`)**:
  * Rural feature-phone simulation demonstrating how smallholders without smartphones receive water scheduling alerts and dividend payout notifications.
* **Access Bank Sandbox Payment Ledger**:
  * Comprehensive transaction table detailing farmer beneficiary names, bank account numbers, NGN dividend amounts, and sandbox settlement statuses.
* **Complete 4-State Data Architecture**:
  * Every single data view (plots table, payments ledger, anomaly queue, metrics, charts) must explicitly render all 4 states:
    1. **Loading**: Structured, pulsing skeleton matching exact component geometry.
    2. **Empty**: Context-specific empty state with clear headline, explanation, and primary action CTA.
    3. **Error**: High-visibility error container with error code, explanation, and an actionable retry button.
    4. **Populated**: High-density data table or chart with real-time ingestion flash and subtle heartbeat status indicator.

---

## 4. Nice-to-Haves

* **Keyboard-Accessible Modals & Drawers**: Native ESC key listeners, autofocus on first input, and accessible ARIA modal dialog markup without bulky dependencies.
* **Tamper-Evident Audit Dossier Export**: One-click download of verified MRV packages as formatted JSON and CSV datasets.
* **Offline / Stale Telemetry Indicator**: Subtle status pill notifying the user if simulated sensor transmissions have halted or if data is older than 6 hours.

---

## 5. Non-Goals (Out of Scope)

* **Multi-Project Backend Management**: Scope strictly limited to one project (Kebbi State rice cluster). No introduction of a generic multi-tenant `projects/` service.
* **Direct Blockchain or Token Speculation**: Carbon credits are strictly recorded as verified $\text{tCO}_2\text{e (est.)}$ metric tonnes. No crypto tokens, NFTs, or decentralized exchange mechanics.
* **Live Commercial Fiat Movement**: All financial transactions remain strictly within the simulated Access Bank Sandbox environment.

---

## 6. Functional & Non-Functional Requirements

### 6.1 Accessibility & Usability (WCAG 2.1 AA)
* **Contrast Ratios**: Minimum 4.5:1 for body copy and 3:1 for large headings and active UI controls against their respective backgrounds.
* **Keyboard Focus Rings**: Strict `focus-visible:ring-2 focus-visible:ring-primary-green-600 focus-visible:ring-offset-2` on all buttons, links, inputs, and tabs. Total elimination of stripped outlines (`focus:outline-none` / `focus:outline-hidden` without replacement).
* **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`, disabling marquee scrolls, oscillation keyframes, and telemetry pulse flashes.
* **Touch Targets**: Minimum $44 \times 44\text{ px}$ hit targets on mobile viewports for all buttons, menu toggles, and table action triggers.

### 6.2 Data Integrity & Typographic Standards
* **Tabular Figures**: Enforce `tabular-nums` on all hectares (ha), carbon volumes ($\text{tCO}_2\text{e}$), water levels (cm), and currency figures (NGN/USD) to eliminate jitter and misalignment.
* **Scientific & Financial Honesty Qualification**:
  * All carbon figures must be explicitly labeled as `tCO₂e (est.)`.
  * All banking integrations must be explicitly labeled as `Access Bank Sandbox (Simulated)`.
  * All satellite radar observations must be qualified as `Sentinel-1 Radar Cross-Check (Sample)`.
* **Zero AI Cliché Copy**: Complete ban on marketing fluff: *"revolutionize"*, *"unlock"*, *"seamless"*, *"lightning fast"*, *"game-changing"*. Headlines $\le 2$ lines; subtitles $\le 3$ lines.

---

## 7. Visual Foundation & Design Tokens

### 7.1 Reference Adjectives
> **Verifiable • Grounded • Disciplined**

### 7.2 Color System & Semantic Tokens (Strict Hex Mapping)
* **Primary Brand Green**:
  * Base Anchor: `#0B4D25` (Green 700 — structural chrome, primary navigation, base containers)
  * Hover: `#1B5C2D` (Green 600)
  * Tint / Surface: `#EAF3ED` (Green 50 — contextual badges, active state fill)
  * Deep Ground: `#07381A` (Green 800 — dark sidebar background)
  * Text Contrast: `#03200E` (Green 900)
* **Secondary Action Accent (Conversion & Critical Triggers)**:
  * Base Action: `#F15A24` (Orange 500 — primary CTA buttons, batch payout trigger)
  * Hover: `#CE4312` (Orange 600)
  * Tint: `#FDF0EB` (Orange 50)
* **Calm Structural Neutrals**:
  * Canvas Background: `#F8F7FA` (Neutral 50 — page body canvas)
  * Card / Panel Surface: `#FFFFFF`
  * Muted Fill: `#F0EEF4` (Neutral 100)
  * Hairline Border: `#E2DFEA` (Neutral 200 — clean non-invasive structural dividers)
  * Primary Text Foreground: `#161321` (Neutral 900)
  * Muted Text Foreground: `#484368` (Neutral 700)
  * Subtle Meta Text: `#685E8A` (Neutral 500)
* **Semantic Status Token Pairs (High-Contrast Background + Foreground)**:
  * **Success** (AWD Compliant, Settled, Agreed): Background `#EAF3ED` / Text `#0B4D25`
  * **Warning** (Dry Threshold Approaching, Sensor Jitter): Background `#FDF5E6` / Text `#7A4D05`
  * **Error** (Flooding Violation, Sensor Fault Out-of-Bounds): Background `#FDF0ED` / Text `#7A1C18`
  * **Info / Radar** (Sentinel-1 SAR Sample, Sandbox Notice): Background `#EEF4F8` / Text `#0B4D25`

### 7.3 Typography
* **Primary Font**: `Geist` (loaded via `next/font/google`).
* **Strict Weight Restriction**: Weights **`400` (Regular)** and **`500` (Medium)** ONLY. Zero use of `font-semibold` (600), `font-bold` (700), or `font-extrabold` (800). Hierarchy is achieved via disciplined size stepping ($11\text{ px}$, $13\text{ px}$, $15\text{ px}$, $18\text{ px}$, $24\text{ px}$, $32\text{ px}$), letter tracking, and foreground/muted contrast.
* **Monospace Font**: `Geist Mono` for all GPS coordinates, sensor serial IDs, dates, transaction hashes, and numerical tables.

### 7.4 Corner Geometry & Iconography
* **Corner Radius Strategy**:
  * Controls & Inputs: `rounded-md` ($6\text{ px}$)
  * Cards, Tables & Dialogs: `rounded-lg` ($8\text{ px}$)
  * Status Pills & Notification Dots: `rounded-full` ($9999\text{ px}$) strictly
  * Elimination of arbitrary `rounded-2xl` and `rounded-3xl` cards.
* **Iconography**:
  * Library: `@tabler/icons-react` with unified $1.5\text{ px}$ stroke.
  * Direct corner geometry alignment with the $6\text{ px}$–$8\text{ px}$ technical aesthetic. Zero emojis in UI buttons or badges.
