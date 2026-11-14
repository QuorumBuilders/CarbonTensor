# Section Copy: App Mode Microcopy & Data State Patterns

Standardized system strings for loading skeletons, actionable empty states, error retry screens, stale telemetry banners, confirmation dialogs, and mutation toasts.

---

## 1. Loading Messages (Skeleton Overlays & Status)

* **Plots Roster:** `Loading enrolled plots ledger from Kebbi cluster...`
* **Water Level Chart:** `Retrieving 30-day piezometer telemetry points...`
* **Map Boundaries:** `Rendering cartographic plot boundaries and sensor status...`
* **Anomaly Queue:** `Scanning DRF observation logs for physical anomalies...`
* **Payments Ledger:** `Querying Access Bank sandbox settlement transactions...`
* **Evidence Package:** `Verifying cryptographic SHA-256 evidence package digest...`

---

## 2. Empty States (With Specific Next Action CTAs)

### Plots Table (Zero Plots or Filter Mismatch)
* **Title:** No enrolled plots match your filter
* **Description:** No agricultural parcels match your search query or selected compliance filter. Try clearing your filters or enroll a new paddy parcel.
* **Primary CTA:** `Reset Filters`
* **Secondary CTA:** `Enroll New Plot`

### Anomaly Flag Queue (Clean Audit State)
* **Title:** Zero flagged telemetry anomalies
* **Description:** All active piezometers and satellite passes meet AWD aeration guidelines. No continuous flooding violations or physical sensor tube errors detected.
* **Primary CTA:** `Run Automated Cross-Check`

### Payments Ledger (No Transactions)
* **Title:** No settlement records found
* **Description:** No seasonal carbon dividend distributions have been recorded for this beneficiary category.
* **Primary CTA:** `Reset Filter`
* **Secondary CTA:** `Simulate Buyer Settlement`

### Water Level Telemetry (New Plot Without Readings)
* **Title:** No water depth telemetry recorded
* **Description:** This plot was recently registered. The in-situ sensor has not yet transmitted its initial 6-hour hydrostatic pressure reading.
* **Primary CTA:** `Transmit Simulated Reading`

---

## 3. Error States (With Specific Retry Actions)

### Network Connection or DRF API Error
* **Title:** Unable to connect to telemetry service
* **Description:** Could not retrieve live field observation data from the API endpoint. The service may be temporarily unreachable or the auth token has expired.
* **Action Button:** `Retry Connection`
* **Secondary Action:** `Switch to Local Mock Data`

### Map Boundary Tile Failure
* **Title:** Cartographic layer unavailable
* **Description:** Failed to render GeoJSON plot boundaries. Satellite map tiles could not be fetched from the tile server.
* **Action Button:** `Reload GIS Map`

### Evidence Assembly Error
* **Title:** Evidence package verification failed
* **Description:** The cryptographic SHA-256 hash does not match the signed field observation payload. Telemetry records may be incomplete or corrupted.
* **Action Button:** `Recompile Evidence Dossier`

---

## 4. Realtime, Stale Telemetry & Simulation Warnings

* **Live Transmission Active:** `Live Telemetry Ingestion Active • 4x Daily Cadence`
* **Stale Telemetry Notice:** `Telemetry delayed. Last hydrostatic reading received 8 hours ago. Showing cached observation.`
* **Radar Discrepancy Alert:** `Flagged: In-situ sensor reports -11.5 cm (DRY) but Sentinel-1 SAR backscatter indicates surface water (WET). Pending verifier reconciliation.`
* **Sandbox Environment Notice:** `Access Bank Sandbox (Simulated). No fiat or cryptocurrency transfers occur in this testnet environment.`

---

## 5. Destructive & Critical Confirmation Dialogs

### Batch Dividend Payout Confirmation
* **Heading:** Confirm Batch Dividend Disbursement
* **Body:** You are about to initiate automated settlement of **₦84,160,000 (est.)** across 5 smallholder and cooperative accounts via the Access Bank Sandbox. All carbon bonus payments will be marked as settled.
* **Confirm Button:** `Execute Settlement Batch`
* **Cancel Button:** `Cancel`

### Plot Deregistration Confirmation
* **Heading:** Deactivate Plot Participation
* **Body:** Deactivating Plot **plot-003** will halt automated AWD monitoring and exclude this parcel from the current seasonal carbon dividend pool.
* **Confirm Button:** `Confirm Deactivation`
* **Cancel Button:** `Keep Active`

---

## 6. Feedback Toasts & Mutation Alerts

* **Plot Enrolled:** `Plot successfully registered and added to the Kebbi cooperative roster.`
* **Telemetry Reading Transmitted:** `Water level observation (-12.5 cm) recorded. Chart updated.`
* **Batch Disbursed:** `Batch settlement complete. 5 Access Bank Sandbox payments successfully processed.`
* **Audit Pack Exported:** `MRV evidence dossier (ISO 14064-2) compiled and downloaded.`
* **Session Expired:** `Your session has expired. Please sign in to continue.`
