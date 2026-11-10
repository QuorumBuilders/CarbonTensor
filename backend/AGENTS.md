# CarbonTensor backend instructions

These instructions supplement the repository root `AGENTS.md` for work within `backend/`.

## Architecture and ownership

Use Python, Django, Django REST Framework (DRF), PostgreSQL, PostGIS, and `uv` in a modular monolith. Follow Django application conventions; do not introduce additional architectural layers without approval.

| Application | Responsibilities |
| --- | --- |
| `accounts` | Custom User model, authentication, and account management. |
| `cooperatives` | Cooperative entities and cooperative-specific business rules. |
| `farmers` | Farmer entities and farmer-specific business rules; distinct from cooperatives and user accounts. |
| `farms` | Farms, plots, geographical boundaries, and cultivation cycles. |
| `mrv` | Agricultural practices, including AWD, observations, evidence, monitoring, and MRV reports. |
| `carbon` | External registry records, verification records, issuance, and credit transactions. |
| `finance` | Bonuses, commissions, payments, and expenses. |
| `core` | Genuinely shared infrastructure; not a home for unassigned business logic. |

Keep cross-application relationships explicit and business rules in their owning application. Do not create separate `awd` or `projects` applications for the initial MVP.

## Python and environment management

- Use `uv` to manage environments and dependencies and `uv run` to execute Python tooling. Maintain dependencies in the agreed `pyproject.toml` and use `uv.lock` for reproducibility once initialized; do not maintain a separate `requirements.txt`.
- Before initialization, agree how the backend uses or relates to the existing root Python scaffold, its Python version, and the uv project/workspace layout. Do not silently move or replace that scaffold.
- Follow PEP 8 and existing formatting conventions, use clear names, and add type hints where useful. Use the standard library or existing stack before proposing another dependency.
- Keep secrets and environment-specific configuration out of source control. Use Django settings for configuration; do not hardcode credentials.

## Django and DRF organization

- Start with conventional application files: `models.py`, `serializers.py`, `views.py`, `urls.py`, and `tests.py` or `tests/`. Split into focused packages only when size or responsibility warrants it; preserve conventional import paths.
- Models own persistence and domain constraints. Serializers define explicit API fields, input validation, and representation; do not expose fields implicitly or allow clients to set protected ownership or state fields.
- Keep views focused on request handling, authorization, and coordinating operations. Use DRF generic views or viewsets where they fit; avoid duplicating framework behaviour or burying reusable business rules in views.
- Keep application routes in application `urls.py` files and compose them through the Django project URL configuration. Use the contracted `/api/v1/` prefix, paths, and methods.
- Define the custom User in `accounts` and configure `AUTH_USER_MODEL` before initial migrations. Reference it through `settings.AUTH_USER_MODEL` in relationships and `get_user_model()` at runtime.

## Database and migrations

- Use PostgreSQL with the PostGIS backend and GeoDjango fields for agreed spatial data. Validate geometry, coordinates, units, and SRID against agreed requirements; do not assume unspecified spatial conventions.
- Express relationships, nullability, uniqueness, indexes, and deletion behaviour deliberately. Enforce important invariants with database constraints where appropriate; preserve audit-relevant history when choosing deletion rules.
- Include migrations with schema changes and inspect generated operations and their data impact. Do not rewrite applied migrations or erase data to resolve migration conflicts.
- Use historical models in data migrations and respect migration dependencies. Assess existing data, defaults, and backfills before introducing restrictive constraints.
- Run migration consistency checks and relevant tests when models or migrations change. Use PostgreSQL/PostGIS for checks involving spatial behaviour, database constraints, or concurrency.

## Validation and safe operations

- Validate API input in serializers and enforce business invariants at all relevant write boundaries, including internal operations. Django `save()` does not automatically call `full_clean()`.
- Enforce authentication and authorization server-side. Scope querysets and check permissions for lists, detail access, creation, updates, and deletion; DRF object permissions alone do not cover every path.
- Use `transaction.atomic()` when related writes must succeed together. Use database constraints and locking where concurrent operations could violate an invariant.
- Sensor ingestion and payment operations must be idempotent under the contract. Design other retryable operations for idempotency where appropriate; obtain agreement on deduplication keys and duplicate-request semantics.
- Preserve evidence provenance, historical records, and traceability of carbon and financial operations. Keep estimated reductions, verified reductions, and issued credits distinct.
- Catch specific expected exceptions and return appropriate API errors. Do not substitute mock success for failed persistence or external operations.

## Tests and API contract

- Follow existing test conventions once established. Otherwise use Django test cases and DRF API test helpers; add another test dependency only with a demonstrated need.
- Test observable behaviour, validation, authorization, cross-record invariants, transitions, atomicity, relevant retries, and failure paths. Use transactional tests when actual transaction or concurrency behaviour matters; mock external services at their boundaries.
- Run tests through `uv run` from the agreed project context. Report executed commands and results, including unavailable database services or other blockers.
- Read `docs/api/MVP Data Model and API Contract.md` from the repository root. Match agreed relationships, fields, methods, payloads, permissions, and response envelopes; resolve unspecified status codes and error details before depending on them.
- Follow its UUID primary keys, ISO 8601 timestamps, appropriate decimal values for money and measurements, GeoJSON boundaries, collection pagination, `data`/`meta` success envelope, and `error` envelope. Enforce required, optional, conditional, and system-managed field classifications.
- Preserve the contracted invariants: one farm per farmer, one active cultivation cycle per plot, conditional completion/cancellation fields, and approved cooperative bank details for payouts. Retain rejected observations outside the evidence dataset and preserve previous report and boundary versions.
- External registry records are authoritative; derive inventory from issuance and subsequent transactions. Keep simulations explicit and follow the contract's demonstration and integration priorities without treating them as authorization to implement every phase.
- Document contract issues and proposed resolutions as required by the root instructions; get approval for substantive deviations. Do not derive roles, payout formulas, methodologies, or integration requirements from frontend demonstrations.

## Contract questions awaiting approval

These are observations about the initial contract, not approved changes:

- Profile and boundary request/review endpoints do not fully specify request persistence or approval transitions. Proposed resolution: define their records, lifecycle, and permissions before implementing those workflows.
- Most state values and transitions, the role/object permission matrix, pagination details, spatial SRID/area units, and idempotency keys are unspecified. Proposed resolution: agree these details for each affected feature rather than invent defaults.
- The contract does not explicitly link verification records to MRV reports or payments to bonus/commission obligations. Proposed resolution: review whether explicit relationships are required for traceability before implementing those flows.
- Methodology-specific reporting requirements remain unverified in the contract. Obtain an approved methodology specification before implementing those calculations or reports.
