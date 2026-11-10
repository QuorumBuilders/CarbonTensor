
TensorCarbon — MVP Data Model & API Contract

Status: Initial implementation specification
Backend: Django + Django REST Framework
Database: PostgreSQL + PostGIS
API version: /api/v1/

Field notation:

R — Required.

O — Optional.

G — Generated or managed by the system.

C — Conditionally required.

Fields marked G should not be supplied by ordinary API clients.

1. Data model

A. Shared platform foundation

User

Field

Requirement

id

G

email

R

password

R

account_type

R

is_active

G

created_at

G

account_type: farmer, cooperative, staff.

AuditLog

Field

Requirement

id

G

actor

R

action

R

entity_type

R

entity_id

R

previous_state

O

new_state

O

reason

O

created_at

G

B. Organization & Cooperative Management

Cooperative

Field

Requirement

id

G

name

R

registration_number

O

contact_information

R

address

R

status

G

created_at

G

CooperativeAccess

Field

Requirement

user

R

cooperative

R

CooperativeMembership

Field

Requirement

farmer

R

cooperative

R

membership_proof

R

confirmation_status

G

verification_status

G

start_date

G

end_date

O

CooperativeBankAccount

Field

Requirement

cooperative

R

account_details

R

submission_status

G

submitted_at

G

reviewed_at

O

approved_at

O

Only approved bank details can be used for payouts.

C. Farmer Management

Farmer

Field

Requirement

id

G

user

R

first_name

R

last_name

R

phone_number

R

identity_information

R

registration_status

G

verification_status

G

created_at

G

D. Farm Management

Farm

Field

Requirement

id

G

farmer

R

created_at

G

One farm per farmer.

Plot

Field

Requirement

id

G

farm

R

boundary

R

calculated_area

G

rice_variety

R

registration_status

G

activity_status

G

created_at

G

The boundary is supplied as GPS/GeoJSON data. Area is calculated by the platform.

PlotBoundaryVersion

Field

Requirement

plot

R

boundary

R

area

G

change_reason

R

submitted_by

G

review_status

G

created_at

G

reviewed_at

O

CultivationCycle

Field

Requirement

id

G

plot

R

planting_date

R

rice_variety

R

harvesting_date

O

status

G

cancellation_reason

C

created_at

G

cancellation_reason is required when cancelling an active cycle. harvesting_date is required when completing a cycle. Only one active cycle per plot.

E. MRV Engine

Sensor

Field

Requirement

id

G

serial_number

R

sensor_type

R

manufacturer

O

installation_date

O

operational_status

G

created_at

G

SensorAssignment

Field

Requirement

sensor

R

plot

R

assigned_at

G

unassigned_at

O

Observation

Field

Requirement

id

G

source_type

R

sensor

C

plot

R

cultivation_cycle

R

observed_at

R

received_at

G

water_level

R

raw_payload

O

supporting_photo

O

validation_status

G

rejection_reason

G

created_at

G

For sensor observations, sensor is required. For manual observations, it is omitted. Rejected observations are retained but excluded from the evidence dataset.

SatelliteObservation

Field

Requirement

id

G

plot

R

provider

R

observed_at

R

observation_data

R

processing_status

G

created_at

G

PracticeType

Field

Requirement

id

G

name

R

description

O

active

G

PracticeAdoption

Field

Requirement

id

G

farmer

R

plot

R

cultivation_cycle

O

practice_type

R

adoption_status

R

adoption_date

R

supporting_evidence

O

created_at

G

ProjectInput

Field

Requirement

id

G

name

R

description

O

unit

R

InputDistribution

Field

Requirement

id

G

project_input

R

farmer

R

plot

O

quantity

R

distribution_date

R

intended_use

R

created_at

G

MonitoringPeriod

Field

Requirement

id

G

start_date

R

end_date

R

status

G

MRVReport

Field

Requirement

id

G

monitoring_period

R

version

G

report_data

G

evidence_references

G

review_status

G

generated_at

G

finalized_at

O

Reports are versioned. Previous versions remain preserved.

F. Carbon Credit Management

ExternalProjectRecord

Field

Requirement

id

G

provider

R

external_project_id

R

registration_status

G

methodology_reference

R

external_metadata

O

last_synced_at

O

VerificationRecord

Field

Requirement

id

G

external_project_record

R

external_reference

R

verification_status

G

verification_date

O

report_document

O

external_metadata

O

CreditIssuance

Field

Requirement

id

G

external_project_record

R

issuance_reference

R

quantity

R

unit

R

serial_number_start

R

serial_number_end

R

issuance_date

R

external_metadata

O

CreditTransaction

Field

Requirement

id

G

issuance

R

transaction_type

R

quantity

R

external_reference

R

transaction_date

R

external_metadata

O

CreditRetirement

Field

Requirement

id

G

issuance

R

quantity

R

retirement_reference

R

retirement_date

R

beneficiary

O

external_metadata

O

External registry records are authoritative. Inventory is derived from issuance and subsequent transactions.

G. Financial Management

FarmerBonus

Field

Requirement

id

G

farmer

R

amount

R

currency

R

status

G

calculation_reference

R

created_at

G

CooperativeCommission

Field

Requirement

id

G

cooperative

R

amount

R

currency

R

status

G

calculation_reference

R

created_at

G

Payment

Field

Requirement

id

G

beneficiary_type

R

beneficiary_id

R

amount

R

currency

R

payment_provider

R

provider_reference

O

status

G

initiated_at

G

completed_at

O

ProjectExpense

Field

Requirement

id

G

description

R

category

R

amount

R

currency

R

expense_date

R

supporting_document

O

2. API contract

All endpoints use /api/v1/.

Authentication

Method

Endpoint

Request fields

POST

/auth/token/

email R, password R

POST

/auth/token/refresh/

refresh R

GET

/auth/me/

No request body

Farmer Management

Method

Endpoint

Request fields

POST

/farmers/registrations/

email R, password R, first_name R, last_name R, phone_number R, identity_information R

GET

/farmers/me/

No request body

GET

/farmers/me/registration-status/

No request body

PATCH

/farmers/me/change-requests/

Changed profile fields R; reason R

Cooperative Management

Method

Endpoint

Request fields

POST

/cooperatives/registrations/

email R, password R, name R, contact_information R, address R, registration_number O

GET

/cooperatives/me/

No request body

POST

/cooperatives/me/profile-submissions/

Changed profile fields R; reason R

POST

/cooperatives/me/bank-account-submissions/

account_details R

GET

/cooperatives/me/members/

No request body

POST

/cooperatives/me/membership-confirmations/

farmer_id R, confirmation R

Farm Management

Method

Endpoint

Request fields

GET

/farms/me/

No request body

GET

/farms/me/plots/

No request body

POST

/farms/me/plots/

boundary R, rice_variety R

GET

/plots/{id}/

No request body

POST

/plots/{id}/boundary-change-requests/

boundary R, reason R

POST

/plots/{id}/deactivation/

reason R

POST

/plots/{id}/reactivation-requests/

reason R

GET

/plots/{id}/cycles/

No request body

POST

/plots/{id}/cycles/

planting_date R, rice_variety R

POST

/cycles/{id}/completion/

harvesting_date R

POST

/cycles/{id}/cancellation/

reason R

MRV Engine

Method

Endpoint

Request fields

POST

/mrv/ingestion/sensor-observations/

sensor_serial_number R, plot_id R, cultivation_cycle_id R, observed_at R, water_level R, raw_payload O

POST

/mrv/manual-observations/

plot_id R, cultivation_cycle_id R, observed_at R, water_level R, supporting_photo O

GET

/mrv/plots/{id}/observations/

No request body

GET

/mrv/cycles/{id}/monitoring/

No request body

GET

/mrv/practices/

No request body

POST

/mrv/practice-adoptions/

plot_id R, practice_type_id R, adoption_status R, adoption_date R, cultivation_cycle_id O, supporting_evidence O

GET

/mrv/input-distributions/

No request body

GET

/mrv/reports/

No request body

GET

/mrv/reports/{id}/

No request body

Carbon Credit Management

Method

Endpoint

Request fields

GET

/carbon/project-record/

No request body

GET

/carbon/verifications/

No request body

GET

/carbon/issuances/

No request body

GET

/carbon/transactions/

No request body

GET

/carbon/retirements/

No request body

POST

/carbon/integrations/{provider}/sync/

external_project_id R

The synchronization endpoint is restricted to authorized staff or system processes.

Financial Management

Method

Endpoint

Request fields

GET

/finance/farmer-bonuses/

No request body

GET

/finance/cooperative-commissions/

No request body

GET

/finance/payments/

No request body

GET

/finance/payments/{id}/

No request body

GET

/finance/expenses/

No request body

Financial creation and approval endpoints are staff/system-controlled.

3. API conventions

Success response

{
  "data": {
    "id": "uuid",
    "status": "approved"
  },
  "meta": {}
}

Error response

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "details": {
      "planting_date": ["This field is required."]
    }
  }
}

General rules

UUID primary keys.

ISO 8601 timestamps.

Decimal values for money and measurements where appropriate.

GeoJSON for plot boundaries.

Pagination for collection endpoints.

Server-side authorization.

Explicit state transitions.

Idempotent sensor ingestion and payment operations.

Historical records must be preserved.

4. Implementation priorities

First: Core demonstration

Authentication and permissions.

Farmer and cooperative registration.

Farm, plot and cultivation-cycle management.

Simulated sensor ingestion.

Observation validation and evidence separation.

MRV report generation.

Second: Supporting demonstration

Sustainable practice adoption.

Project input distribution.

Simulated carbon-credit tracking.

Farmer bonuses and cooperative commissions.

Third: Integration readiness

Real sensor integration.

Satellite/GIS integration.

Registry APIs.

Payment provider integration.


Implementation note: Required/optional classifications are the initial API contract. Server-generated values, conditional requirements and provider-specific fields must be enforced in serializers and business services. Methodology-specific reporting requirements still need verification.
