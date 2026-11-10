# CarbonTensor

A digital platform for managing aggregated smallholder rice farming projects, implementing Alternate Wetting and Drying (AWD), monitoring methane avoidance, and managing carbon-credit revenue and farmer bonus distributions.

The platform provides an integrated system for farmer onboarding, agricultural project management, digital Measurement, Reporting and Verification (MRV), and carbon-credit financial management.

Product naming and retained technical identifiers are documented in
[Project Naming](docs/Project%20Naming.md).

## Overview

Traditional rice cultivation under continuous flooding produces methane emissions. Alternate Wetting and Drying (AWD) reduces these emissions by periodically draining rice fields and allowing the soil to dry before reflooding.

The platform digitizes the operational and financial infrastructure required to implement AWD across geographically distributed smallholder farms.

It connects farmers, cooperatives, field agents, project administrators, MRV operations, and carbon-credit project management within one system.

### Core capabilities

- **Farmer management:** Register farmers, maintain farmer profiles, associate farmers with cooperatives, and manage their participation in AWD projects.
- **Farm and plot management:** Register agricultural plots, capture geographical coordinates, record farm characteristics, and associate plots with participating farmers.
- **AWD monitoring:** Record field water conditions, wetting and drying cycles, field inspections, and supporting evidence.
- **Digital MRV engine:** Process field observations, validate submitted evidence, integrate remote-sensing data, and maintain an auditable record of project activities.
- **Carbon credit management:** Track emission reductions, estimated carbon credits, verification progress, issuance, and carbon credit inventory.
- **Farmer bonus payouts:** Calculate eligible farmer and cooperative bonuses, manage payout allocations, track payment status, and maintain transaction records.
- **Project administration:** Manage projects, cooperatives, field agents, reporting periods, and operational activities.

## System Architecture

The project is organized as a monorepo containing independently maintained backend and frontend applications.

```text
CarbonTensor/
│
├── backend/
│   ├── ...
│   └── README.md
│
├── frontend/
│   ├── ...
│   └── README.md
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── mrv/
│
├── .gitignore
└── README.md
```

### Backend

Responsible for the platform's business logic, data management, APIs, authentication, and integrations.

Primary responsibilities:

- User authentication and authorization.
- Farmer, cooperative, and field agent management.
- Agricultural project and farm/plot registration.
- AWD activity and field observation management.
- MRV evidence ingestion and validation.
- Emission reduction and carbon credit calculations.
- Bonus allocation and payout management.
- External service integrations.
- Audit trails and operational reporting.

### Frontend

Provides the user-facing interfaces for the different participants in the carbon project.

Primary interfaces:

- Project administration dashboard.
- Farmer and cooperative management.
- Farm and plot registration.
- Field agent operations and AWD monitoring.
- MRV monitoring and reporting.
- Carbon credit management.
- Farmer bonus and payout management.

The frontend communicates with the backend through its APIs.

## Core System Modules

### 1. Farmer and Agricultural Project Management

The platform supports an aggregated smallholder farming model.

Farmers can be registered individually or through participating cooperatives.

The registration and management process covers:

- Farmer profiles and contact information.
- Cooperative membership.
- Farm and plot ownership or operational association.
- Plot geographical coordinates and boundaries.
- Agricultural characteristics.
- Project enrollment and participation status.

A farmer may have multiple agricultural plots, while a plot must be associated with the relevant agricultural project and participation records.

### 2. Digital MRV Engine

The MRV engine manages the collection and processing of evidence used to establish methane avoidance from AWD implementation.

**Field data collection**

Field agents collect and submit:

- GPS-tagged field observations.
- Timestamped photographs of water-gauge tubes.
- Field water-level observations.
- Wetting and drying records.
- Field inspection reports.

**Remote sensing integration**

The platform is designed to incorporate satellite-derived information, particularly Sentinel-1 Synthetic Aperture Radar (SAR) data.

This supports remote assessment of field moisture conditions and provides an additional evidence source alongside ground observations.

**Evidence processing**

The MRV engine is responsible for:

- Evidence ingestion and storage.
- Data validation and consistency checks.
- Field observation tracking.
- Satellite data integration.
- Detection of missing or inconsistent evidence.
- Aggregation of project-level monitoring data.
- Audit trails and verification reporting.

The engine should maintain traceability between individual farms, field observations, monitoring periods, and aggregated project results.

### 3. Carbon Credit Management

This module manages the carbon-credit lifecycle associated with AWD projects.

Its responsibilities include:

- Establishing project emission baselines.
- Tracking project emission reductions.
- Applying the relevant approved carbon methodology.
- Aggregating emission reduction estimates.
- Tracking validation and verification status.
- Recording registry submissions and credit issuance.
- Maintaining issued credit inventories.
- Tracking credit sales and revenue.

The platform should distinguish between estimated emission reductions, verified emission reductions, and officially issued carbon credits.

Potential methodology and registry pathways include:

- Gold Standard – Digital Rice Emission Avoidance Methodology (DREAM).
- Verra – applicable rice methane avoidance methodologies, subject to eligibility and approval.

Carbon calculations must be methodology-driven, with applicable Global Warming Potential (GWP) values and other methodological parameters explicitly versioned.

### 4. Farmer Bonus and Payout Management

This module manages the financial distribution of carbon project proceeds to participating farmers and cooperatives.

Its responsibilities include:

- Defining project-specific bonus allocation rules.
- Calculating farmer eligibility and bonus amounts.
- Aggregating cooperative-level allocations.
- Tracking approved payout obligations.
- Recording payment transactions.
- Tracking successful, pending, and failed payouts.
- Maintaining financial histories and reconciliation records.

The system should maintain a clear distinction between:

- Carbon credit revenue received by the project.
- Project operational and administrative deductions.
- Cooperative allocations.
- Individual farmer bonus entitlements.
- Actual amounts disbursed.

Payout calculations should be traceable to their underlying allocation rules and financial transactions.

## External Integrations

The platform is designed to support integrations with external agricultural, geospatial, MRV, registry, and financial systems.

| Category            | Potential integration | Purpose                               |
| ------------------- | --------------------- | ------------------------------------- |
| Satellite data      | Sentinel-1            | Radar-based field moisture monitoring |
| Geospatial data     | GIS services          | Farm mapping and spatial analysis     |
| MRV infrastructure  | Carbonfuture MRV+     | External MRV capabilities             |
| Carbon standards    | Gold Standard         | Methodology and registry processes    |
| Carbon standards    | Verra                 | Alternative registry pathway          |
| Carbon marketplaces | Xpansiv CBL           | Carbon credit market access           |
| Financial services  | Payment providers     | Farmer and cooperative payouts        |

These are candidate integrations. Their availability, API access, commercial terms, and technical compatibility must be established before implementation.

## Key Operational Workflow

The intended project lifecycle is:

1. **Project setup:** Create an agricultural carbon project and configure its operational parameters.
2. **Cooperative onboarding:** Register participating cooperatives and establish project participation arrangements.
3. **Farmer registration:** Register farmers and associate them with their cooperatives.
4. **Farm registration:** Capture farm and plot information, including geographical boundaries.
5. **Project enrollment:** Enroll eligible farms into the AWD project.
6. **AWD implementation:** Record AWD activities and field observations through field agents.
7. **MRV processing:** Collect, validate, and aggregate ground observations and remote-sensing evidence.
8. **Emission reduction assessment:** Calculate emission reductions using the applicable carbon methodology.
9. **Verification and issuance:** Track independent verification and carbon registry issuance.
10. **Revenue management:** Record carbon credit sales and project revenue.
11. **Bonus allocation:** Calculate eligible farmer and cooperative bonuses.
12. **Payout execution:** Process payments and reconcile completed transactions.

## Design Principles

- **Modular architecture:** Farmer management, MRV, carbon accounting, and financial management should remain independently maintainable modules.
- **Data traceability:** Carbon calculations and financial allocations must be traceable to their underlying records.
- **Evidence integrity:** Field observations and supporting evidence should retain their original timestamps, geographical context, and audit history.
- **Methodology-driven calculations:** Emission reduction calculations should be configurable and tied to specific methodology versions.
- **Financial accountability:** Every allocation and payout should have a traceable transaction history.
- **Integration flexibility:** External satellite providers, registries, marketplaces, and payment providers should be replaceable without redesigning the core platform.
- **Scalability:** The platform should support expansion across multiple cooperatives, projects, geographical regions, and participating farmers.

## Project Context

The initial implementation is intended for smallholder rice farming in Nigeria, with potential expansion across West Africa.

The operational model draws on two reference frameworks:

- **AgriCapture:** Digital agricultural data infrastructure and automated MRV for rice methane avoidance.
- **Ghana AWD National Blueprint:** Cooperative-based smallholder implementation and the Article 6.2 framework.

The proposed Nigerian deployment considers collaboration with rice cooperatives such as the Rice Farmers Association of Nigeria (RIFAN), field agents, and relevant national climate authorities.

## Development Status

This repository represents the software development foundation for the proposed AWD carbon aggregation platform.

Specific implementation status, supported integrations, carbon methodologies, and deployment instructions should be documented as the respective components are developed and validated.

