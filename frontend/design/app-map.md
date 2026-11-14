# CarbonTensor App Map & State Specification

**Status:** Implementation Specification  
**Derived From:** `frontend/types/index.ts`, `frontend/lib/api/endpoints.ts`, and `docs/api/MVP Data Model and API Contract.md`  

---

## 1. Roles & Permissions Matrix

| Capability / Surface | Cooperative Admin (`cooperative`) | Independent Verifier (`staff`) | Smallholder Farmer (`farmer`) |
| :--- | :---: | :---: | :---: |
| **Public Site Mode (`/`, `/auth/*`)** | View & Authenticate | View & Authenticate | View & Authenticate |
| **Cooperative Dashboard (`/dashboard`)** | **Full Access** (Primary Workspace) | Read-Only Audit View | Read-Only Plot View |
| • *Enroll New Plot Mutation* | **Permitted** (`POST /plots/`) | Denied | Denied |
| • *Sensor Simulator Bar Injection* | **Permitted** (Demo Testing) | **Permitted** (Audit Stress-Testing) | Denied |
| • *View Feature-Phone SMS Modal* | Permitted | Permitted | **Primary Interaction** (`*384#`) |
| **MRV Verifier Portal (`/verifier`)** | Read-Only Overview | **Full Access** (Primary Workspace) | Denied |
| • *Review Anomaly Queue Flags* | View Only | **Permitted** (Approve / Dismiss) | Denied |
| • *Export Audit Dossier (JSON/CSV)* | View | **Permitted** (`MRVReport` Export) | Denied |
| • *Sentinel-1 Radar Cross-Check* | View Summary | **Permitted** (Reconcile SAR) | Denied |
| **Disbursement Portal (`/finance`)** | Read-Only Ledger | Audit View | View Entitled Bonus |
| • *Trigger Simulated Batch Payout* | **Permitted** (Disbursement Action) | Denied (Auditor Separation) | Denied |
| • *View Access Bank Account Ledger* | Permitted (Union Accounts) | Permitted (Verification) | Personal Account Only |

---

## 2. Entities & Field Controls

Every UI control maps directly to the entity's underlying DRF data type:

### 1. `User`
* **List / Detail**: User profile chip in sidebar. Email (text), Account Type (badge), Active status (dot).
* **Create / Edit**: `/auth/register` and `/auth/login` forms.
  * `email` $\to$ Text input (`type="email"`, required).
  * `password` $\to$ Password input with show/hide toggle.
  * `account_type` $\to$ Segmented tab control (`"farmer"` vs `"cooperative"`).
  * `is_active` $\to$ Read-only system boolean.

### 2. `Cooperative`
* **List / Detail**: Header banner and union selector chip.
  * `name` $\to$ Text heading.
  * `registration_number` $\to$ Monospace string (`Geist Mono`).
  * `contact_information` $\to$ Structured phone/email/contact person block.
  * `address` $\to$ Geographic location string.
  * `status` $\to$ Semantic status badge (`ACTIVE`, `PENDING_VERIFICATION`, `SUSPENDED`).
* **Create / Edit**: `/auth/register` (Cooperative Tab).

### 3. `Farmer`
* **List / Detail**: Enrolled plots table farmer column and spotlight card.
  * `first_name`, `last_name` $\to$ Text string.
  * `phone_number` $\to$ Monospace phone string (`+234...`).
  * `identity_information.id_type` $\to$ Select dropdown (`"NIN"`, `"VOTER_ID"`, `"BVN"`).
  * `identity_information.id_number` $\to$ Masked monospace input.
  * `registration_status`, `verification_status` $\to$ Semantic status pills.
* **Create / Edit**: `/auth/register` (Farmer Tab).

### 4. `Plot`
* **List / Detail**: Leaflet cartographic map polygon, spotlight inspector, and roster table.
  * `id` $\to$ Monospace badge (`plot-001`).
  * `farm` $\to$ Cluster string (e.g. *"Argungu Rice Basin Parcel D1"*).
  * `boundary` $\to$ Interactive Leaflet GeoJSON polygon canvas + coordinate array reader.
  * `calculated_area` $\to$ Number input with `tabular-nums` formatting ($1.75\text{ ha}$).
  * `rice_variety` $\to$ Combobox select (`"FARO 44 (Sippi)"`, `"FARO 52"`, `"Jebba Local"`).
  * `registration_status`, `activity_status` $\to$ Semantic badges.
* **Create / Edit**: `RegisterPlotModal` dialog (`POST /plots/`).

### 5. `CultivationCycle`
* **List / Detail**: Water-level chart timeline reference band.
  * `planting_date` $\to$ Native HTML5 Date picker (`YYYY-MM-DD`).
  * `harvesting_date` $\to$ Date picker (optional).
  * `rice_variety` $\to$ Select dropdown.
  * `status` $\to$ Segmented control (`IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
  * `cancellation_reason` $\to$ Textarea (conditional).

### 6. `Observation` (Field Water Depth Telemetry)
* **List / Detail**: 30-Day Recharts time-series point and real-time simulator feed.
  * `source_type` $\to$ Badge (`IOT_PIEZOMETER`, `MANUAL_PANI_PIPE`, `HYBRID`).
  * `sensor` $\to$ Monospace serial code (`SENS-KB-001`).
  * `observed_at` $\to$ Formatted date/time (`MMM DD, YYYY HH:mm UTC`).
  * `water_level` $\to$ Numeric slider or stepped number input with cm unit ($-15.0\text{ cm}$).
  * `validation_status` $\to$ Status pill (`VALID`, `SUSPICIOUS`, `REJECTED`).
  * `rejection_reason` $\to$ Monospace alert callout.
* **Create / Edit**: `SensorSimulatorBar` (`POST /observations/sensor-ingest/`).

### 7. `SatelliteObservation` (Sentinel-1 SAR Radar)
* **List / Detail**: Verifier radar cross-check card dual-timeline.
  * `provider` $\to$ Monospace label (`Sentinel-1 SAR`).
  * `observed_at` $\to$ Date string of satellite pass.
  * `observation_data.status` $\to$ Status pill (`AGREE` vs `DISAGREE`).
  * `observation_data.confidence` $\to$ Percentage meter with `tabular-nums` ($94.2\%$).
  * `observation_data.radar_state` vs `sensor_state` $\to$ Dual state pill comparison (`WET` vs `DRY`).

### 8. `FarmerBonus`
* **List / Detail**: Payout breakdown cards and ledger.
  * `farmer_name` $\to$ Text string.
  * `amount` $\to$ Monospace currency string ($52,600\text{ USD}$ / $\text{₦}84.16\text{M}$).
  * `carbon_avoided_tco2e_est` $\to$ Qualified metric ($3.42\text{ tCO}_2\text{e (est.)}$).
  * `status` $\to$ Semantic badge (`PENDING`, `APPROVED`, `DISBURSED`, `FAILED`).
  * `calculation_reference` $\to$ Monospace calculation ID.

### 9. `CooperativeCommission`
* **List / Detail**: 15% cooperative fund card in `/finance`.
  * `cooperative_name` $\to$ Text string.
  * `amount` $\to$ Monospace currency ($11,271.43\text{ USD}$ / $\text{₦}18.03\text{M}$).
  * `status` $\to$ Semantic badge (`PENDING`, `APPROVED`, `DISBURSED`).

### 10. `Payment`
* **List / Detail**: Access Bank Sandbox payments ledger table.
  * `beneficiary_name` $\to$ Text string with beneficiary type badge (`farmer` vs `cooperative`).
  * `bank_name` $\to$ Monospace bank identifier (*"Access Bank Plc"*).
  * `account_number` $\to$ Masked monospace account number (*"0192••••20"*).
  * `amount` $\to$ NGN formatted currency with `tabular-nums` ($\text{₦}2,740,000$).
  * `payment_provider` $\to$ Sandbox badge (*"Access Bank Sandbox (Simulated)"*).
  * `provider_reference` $\to$ Monospace transaction reference (*"ACB-SBX-2026-0891"*).
  * `status` $\to$ Status pill (`PENDING`, `COMPLETED`, `FAILED`, `SIMULATED_SUCCESS`).
  * `initiated_at`, `completed_at` $\to$ Monospace timestamp.
* **Create / Edit**: `TriggerPayoutModal` (`POST /finance/payments/disburse-batch/`).

### 11. `MRVReport`
* **List / Detail**: Verifier registry-ready evidence package card and preview modal.
  * `id` $\to$ Monospace digest (`mrv-kebbi-2026-cycle1`).
  * `monitoring_period` $\to$ Date range tag (*"Oct 01, 2026 – Oct 31, 2026"*).
  * `report_data` $\to$ Aggregated metrics grid (Hectares, Enrolled, Verified, Net $\text{tCO}_2\text{e (est.)}$).
  * `review_status` $\to$ Status pill (`PENDING_VVB_AUDIT`, `FINALIZED`, `SUBMITTED_TO_REGISTRY`).
  * `verification_hash` $\to$ SHA-256 cryptographic hexadecimal hash string.
* **Create / Edit**: Client assembly via `generateMRVReport()` and export modal.

### 12. `EvidenceReference`
* **List / Detail**: Sub-array inside MRV report modal and anomaly queue.
  * `plot_id` $\to$ Plot link.
  * `sensor_serial` $\to$ Monospace code.
  * `observation_count` $\to$ Numeric integer.
  * `anomaly_flags` $\to$ Array of warning callouts.

---

## 3. Status Enums $\to$ Semantic Token Map

Every status enum maps deterministically to one of the 4 high-contrast paired token classes:

```
--status-success:   bg: #EAF3ED  |  text: #0B4D25  (Border: #9CC9AB)
--status-warning:   bg: #FDF5E6  |  text: #7A4D05  (Border: #F5B09A)
--status-error:     bg: #FDF0ED  |  text: #7A1C18  (Border: #EE6A3B)
--status-info:      bg: #EEF4F8  |  text: #0B4D25  (Border: #C7C1D7)
```

| Entity & Enum Field | Enum Value | Semantic Token Class | Display Label |
| :--- | :--- | :--- | :--- |
| **`Cooperative.status`** | `ACTIVE` | `--status-success` | Active Union |
| | `PENDING_VERIFICATION` | `--status-warning` | Pending Audit |
| | `SUSPENDED` | `--status-error` | Suspended |
| **`Farmer.registration_status`** | `REGISTERED` | `--status-success` | Enrolled |
| | `PENDING` | `--status-warning` | Pending Verification |
| | `REJECTED` | `--status-error` | Rejected |
| **`Farmer.verification_status`** | `VERIFIED` | `--status-success` | Identity Verified |
| | `UNVERIFIED` | `--status-warning` | Unverified |
| | `FLAGGED` | `--status-error` | Audit Flagged |
| **`Plot.registration_status`** | `REGISTERED` | `--status-success` | Survey Verified |
| | `PENDING_SURVEY` | `--status-warning` | Boundary Survey Pending |
| | `REJECTED` | `--status-error` | Rejected |
| **`Plot.activity_status`** | `ACTIVE` | `--status-success` | Actively Farmed |
| | `FALLOW` | `--status-info` | Fallow Season |
| | `HARVESTED` | `--status-info` | Harvest Completed |
| **`Observation.validation_status`** | `VALID` | `--status-success` | Telemetry Validated |
| | `SUSPICIOUS` | `--status-warning` | Rapid Fluctuation |
| | `REJECTED` | `--status-error` | Physical Tube Anomaly |
| **`SatelliteObservation.status`** | `AGREE` | `--status-success` | In-Situ & SAR Agree |
| | `DISAGREE` | `--status-warning` | Radar Discrepancy |
| **`FarmerBonus.status`** | `DISBURSED` | `--status-success` | Disbursed (Bank) |
| | `APPROVED` | `--status-success` | Approved for Payout |
| | `PENDING` | `--status-warning` | Awaiting Audit Sign-off |
| | `FAILED` | `--status-error` | Transfer Failed |
| **`Payment.status`** | `COMPLETED` | `--status-success` | Settled (Access Bank) |
| | `SIMULATED_SUCCESS` | `--status-success` | Sandbox Success |
| | `PENDING` | `--status-warning` | Processing Batch |
| | `FAILED` | `--status-error` | Settlement Rejected |
| **`MRVReport.review_status`** | `FINALIZED` | `--status-success` | Registry Certified |
| | `SUBMITTED_TO_REGISTRY`| `--status-info` | Under Registry Review |
| | `PENDING_VVB_AUDIT` | `--status-warning` | Awaiting VVB Audit |
| **Plot AWD Compliance (Derived)** | `COMPLIANT` | `--status-success` | AWD Compliant (Aerated) |
| | `SENSOR_FAULT` | `--status-warning` | Sensor Anomaly ($-82\text{ cm}$) |
| | `RADAR_DISCREPANCY` | `--status-warning` | Radar Discrepancy |
| | `NON_COMPLIANT` | `--status-error` | Flooding Violation ($>21\text{d}$) |

---

## 4. Endpoint Contract & Gap List

### 4.1 Screen-to-Endpoint Mapping

| Screen / Component | Operation | Endpoint | Parameters & Notes |
| :--- | :--- | :--- | :--- |
| **Auth Login (`/auth/login`)** | Mutation | `POST /auth/login/` | Payload: `{ email, password }` $\to$ Returns JWT session |
| **Auth Register (`/auth/register`)**| Mutation | `POST /auth/register/farmer/`<br>`POST /auth/register/cooperative/` | Create account and return session |
| **Session Header & Sidebar** | Fetch | `GET /auth/me/` | Retrieves active user and role |
| **Dashboard Plots Table (`/dashboard`)** | List | `GET /plots/` | Returns plots array (filter by search, status) |
| **Dashboard Map Canvas (`/dashboard`)** | List | `GET /plots/` | GeoJSON polygon boundaries |
| **Register Plot Modal (`/dashboard`)** | Mutation | `POST /plots/` | Payload: `{ farm, boundary, calculated_area, rice_variety }` |
| **Water Level Chart (`/dashboard`)** | List | `GET /observations/?plot=:id` | Filter observations by selected `plot_id` |
| **Sensor Simulator Bar (`/dashboard`)** | Mutation / Stream | `POST /observations/sensor-ingest/` | Custom payload; broadcasts event to subscribers |
| **Verifier Anomaly Queue (`/verifier`)**| List | `GET /observations/` | Filter: `validation_status=REJECTED` |
| **Verifier Satellite Check (`/verifier`)**| List | `GET /satellite-observations/` | SAR radar vs in-situ comparison list |
| **Finance Payments Ledger (`/finance`)**| List | `GET /finance/payments/` | Filter by `beneficiary_type`, search by name |
| **Finance Split Cards (`/finance`)** | List | `GET /finance/farmer-bonuses/`<br>`GET /finance/cooperative-commissions/` | Aggregated entitlement figures |
| **Trigger Batch Payout (`/finance`)** | Mutation | `POST /finance/payments/disburse-batch/` | Disburses pending payments; fires update event |

### 4.2 Explicit Backend Gap List (Flagged as **"needs backend"**)

The following 6 endpoints are missing, misaligned, or handled purely in client mock memory:

1. **`GET /farmers/`** $\to$ **`[needs backend]`**:
   * *Gap*: No API endpoint exists in `endpoints.ts` to list or search registered farmers. The frontend currently relies on a static `MOCK_FARMERS` array in [`lib/plot-utils.ts`](file:///c:/Users/USER%20PC/Documents/tensor/frontend/lib/plot-utils.ts).
   * *Impact*: Plot enrollment cannot query server-side farmers dynamically.
2. **`GET /cultivation-cycles/`** $\to$ **`[needs backend]`**:
   * *Gap*: No API endpoint exists to retrieve planting dates, cycle duration, or harvest status.
   * *Impact*: Chart season bands and 30-day monitoring ranges are synthesized client-side.
3. **`GET /mrv-reports/` & `POST /mrv-reports/generate/`** $\to$ **`[needs backend]`**:
   * *Gap*: Evidence package assembly and verification hashing take place in browser memory ([`lib/evidence-generator.ts`](file:///c:/Users/USER%20PC/Documents/tensor/frontend/lib/evidence-generator.ts)).
   * *Impact*: VVB audit dossiers cannot be fetched from or persisted to an immutable database audit ledger.
4. **Duplicate Finance Endpoint Paths** $\to$ **`[needs backend]`**:
   * *Gap*: `endpoints.ts` exposes redundant routes: `api.bonuses.list()` calling `/farmer-bonuses/` alongside `api.finance.farmerBonuses.list()` calling `/finance/farmer-bonuses/`. Same for `/payments/` vs `/finance/payments/`.
   * *Impact*: Frontend must unify around the canonical `/finance/*` namespace.
5. **`/api/v1/` Route Prefix Alignment** $\to$ **`[needs backend]`**:
   * *Gap*: Backend documentation specifies `/api/v1/...`, while `endpoints.ts` paths omit the prefix, requiring `NEXT_PUBLIC_API_URL` to include it.
   * *Impact*: Inconsistent endpoint resolution in staging environments.
6. **`POST /auth/token/refresh/`** $\to$ **`[needs backend]`**:
   * *Gap*: No JWT token refresh endpoint or session renewal mechanism exists. Tokens are stored in `localStorage` without expiry tracking.
   * *Impact*: Inability to test true token expiration or automatic silent refresh.

---

## 5. Designed States, UX Flows & Navigation Architecture

### 5.1 The 4 Designed States Per View

| View Surface | 1. Loading State | 2. Empty State | 3. Error State (With Retry) | 4. Populated State (+ Realtime / Stale) |
| :--- | :--- | :--- | :--- | :--- |
| **Plots Table (`/dashboard`)** | 4-row, 7-column pulsing skeleton matching table geometry | "No plots found matching filter" + "Reset Filters" CTA | "Failed to load plots ledger" + inline `Retry` button | Populated rows + green flash highlight on live telemetry ingestion |
| **Plot Map Canvas (`/dashboard`)** | Map frame with animated skeleton loader and pulse outline | "No polygon boundaries available" + "Enroll Plot" CTA | "Map tiles or boundary fetch failed" + `Reload Map` CTA | Interactive GeoJSON polygons with compliance stroke fill and popups |
| **Water Level Chart (`/dashboard`)**| Chart canvas skeleton with pulsing axis lines | "No sensor observations recorded for selected plot" | "Telemetry data stream error" + `Retry Fetch` button | Interactive SVG line chart with hover tooltips and $-15\text{ cm}$ threshold band |
| **Anomaly Queue (`/verifier`)** | 3-row, 7-column table skeleton | "Zero flagged anomalies. All plots AWD compliant." | "Failed to query anomaly queue" + `Retry` button | Flagged rows with severity dots, rejection reasons, and audit action triggers |
| **Payments Ledger (`/finance`)** | 4-row, 8-column table skeleton | "No settlement transactions matching filter" + "Reset Filter" | "Failed to load payments ledger" + `Retry` button | Transaction rows with NGN currency, status pills, and sandbox simulation notes |

### 5.2 Mutation Confirmation & Toast Behavior
* **Triggering Actions**: Every mutation (`POST /plots/`, `POST /observations/sensor-ingest/`, `POST /finance/payments/disburse-batch/`) provides immediate visual feedback:
  * Buttons enter a busy state: text shifts to *"Transmitting..."* or *"Disbursing..."* with an inline spinner; button is disabled.
  * On success: Modal closes, the relevant table or chart immediately updates via optimistic or refreshed state, and a clean, non-floating inline banner or top toast confirms completion:
    * *Plot Enrolled*: *"Plot KGG-006 successfully registered and associated with Kebbi Union."*
    * *Telemetry Ingested*: *"Water reading (-12.5 cm) recorded for SENS-KB-001. Chart updated."*
    * *Payout Disbursed*: *"Access Bank Sandbox settlement complete. ₦84,160,000 disbursed across 5 accounts."*
  * On failure: Modal remains open; error banner highlights invalid fields with specific DRF error messages without clearing user input.

### 5.3 4 Primary End-to-End User Flows (One Primary Action Per Screen)

1. **Flow 1: New Plot Enrollment (Cooperative Admin)**
   * *Screen*: `/dashboard` $\to$ Primary Action: **"Enroll New Plot"** (Orange CTA in banner).
   * *Steps*: Click button $\to$ `RegisterPlotModal` opens $\to$ Enter parcel name, area, rice variety, farmer ID $\to$ Submit $\to$ Modal closes $\to$ New plot prepends to table, map zooms to coordinates, and spotlight highlights the new plot.
2. **Flow 2: Field Telemetry Injection & Verification (Field Agent / Auditor)**
   * *Screen*: `/dashboard` $\to$ Primary Action: **"Simulate Transmission"** (Sensor simulator bar).
   * *Steps*: Select active plot $\to$ Choose preset (*"Safe Drying -12cm"* vs *"Submerged Violation +5cm"* vs *"Sensor Fault -82cm"*) $\to$ Click *"Transmit Reading"* $\to$ Bar pulses $\to$ Table row flashes with green highlight $\to$ Water level chart plots the new data point instantly.
3. **Flow 3: Anomaly Investigation & MRV Pack Export (Independent Verifier)**
   * *Screen*: `/verifier` $\to$ Primary Action: **"Export Audit Pack"** (Banner action).
   * *Steps*: Review flagged anomalies (Plot 3 flooding violation, Plot 4 sensor fault) $\to$ Review Sentinel-1 SAR cross-check $\to$ Click *"Export Audit Pack"* $\to$ `ExportEvidenceModal` displays SHA-256 hash and ISO 14064-2 compliance details $\to$ Download verified JSON dossier.
4. **Flow 4: Smallholder Dividend Batch Disbursement (Disbursement Officer)**
   * *Screen*: `/finance` $\to$ Primary Action: **"Simulate Buyer Settlement"** (Orange CTA in banner).
   * *Steps*: Inspect 70/15/15 revenue split visualizer $\to$ Click *"Simulate Buyer Settlement"* $\to$ `TriggerPayoutModal` confirms $52,600\text{ USD}$ buyer escrow deposit $\to$ Click *"Confirm Disbursal"* $\to$ Ledger updates all pending payments to `SIMULATED_SUCCESS` with green highlight $\to$ Farmer USSD notification automatically prompts.

### 5.4 Navigation Cap & Mobile Usability
* **Navigation Item Cap**: Strictly capped at **$\le 7$ top-level items** to prevent cognitive overload. Current structure has exactly **3 core application routes**:
  1. Cooperative Dashboard (`/dashboard`)
  2. MRV Verifier Audit (`/verifier`)
  3. Finance & Payouts (`/finance`)
  *(Plus direct links to public overview and role switcher).*
* **Mobile Viewport ($\le 640\text{ px}$)**:
  * Top mobile header ($56\text{ px}$) with brand identity and hamburger trigger.
  * Off-canvas slide-out drawer providing $\ge 44\text{ px}$ touch targets for all navigation items.
  * Floating demo controller docks neatly at the bottom with a compact collapsible pill.

### 5.5 Authentication & Session Expiry Handling
* **Session Storage**: Current mock token and persona context are stored in `localStorage` under `carbontensor_session`.
* **Expiry Simulation**: When an API request encounters a 401 Unauthorized or mock expiration, the app:
  1. Clears `carbontensor_session`.
  2. Retains the intended destination URL as a `?redirect=` parameter.
  3. Transitions smoothly to `/auth/login` with an inline alert: *"Your session has expired. Please sign in to continue."*
  4. Provides instant single-click demo persona buttons to immediately re-authenticate without typing credentials.
