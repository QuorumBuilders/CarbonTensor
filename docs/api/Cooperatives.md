# Cooperative model implementation

Implements section 1.B of [the MVP contract](MVP%20Data%20Model%20and%20API%20Contract.md)
within the existing `cooperatives` application. No endpoints, authentication
changes, Farmer model, payout operations, or database configuration changes
are included.

## Implemented models and fields

All four implemented models use generated, noneditable UUID primary keys,
following the contract's general UUID convention, including records whose
field lists omit `id`.

| Model | Fields and storage |
| --- | --- |
| `Cooperative` | Required `name`: `CharField(255)`; optional `registration_number`: `CharField(255, blank=True)`; required `contact_information`: `JSONField`; required `address`: `TextField`; system-assigned `status`: noneditable `CharField(50)`; generated `created_at`: `DateTimeField(auto_now_add=True)`. |
| `CooperativeAccess` | Required `user`: foreign key to `settings.AUTH_USER_MODEL`; required `cooperative`: lazy foreign key to `Cooperative`. |
| `CooperativeBankAccount` | Required `cooperative`: lazy foreign key to `Cooperative`; required `account_details`: `JSONField`; system-assigned `submission_status`: noneditable `CharField(50)`; generated `submitted_at`: `DateTimeField(auto_now_add=True)`; optional `reviewed_at` and `approved_at`: nullable, noneditable `DateTimeField`s. |
| `CooperativeMembership` | Required `farmer`: lazy foreign key to `farmers.Farmer`; required `cooperative`: lazy foreign key to `cooperatives.Cooperative`; required `membership_proof`: `JSONField`; system-assigned `confirmation_status` and `verification_status`: noneditable `CharField(50)` fields; generated `start_date`: `DateField(auto_now_add=True)`; optional `end_date`: `DateField(null=True, blank=True)`. |

JSON fields have no default or imposed key schema. Required fields use Django's
`blank=False` and `null=False`; optional registration numbers use the empty
string and optional dates/timestamps use `NULL`. Review and approval timestamps are
excluded from ordinary model forms because they record trusted review activity.
Future API serializers must explicitly preserve these input restrictions.

All foreign keys use `PROTECT` to prevent parent deletion from silently erasing
access associations, memberships, or financial submission history. Reverse
relationships are `User.cooperative_accesses`, `Cooperative.accesses`,
`Cooperative.bank_accounts`, `Farmer.cooperative_memberships`, and
`Cooperative.memberships`.

## Constraints and payout rule

- The unique `(user, cooperative)` access constraint prevents duplicate access
  grants while allowing multiple users per cooperative and access to multiple
  cooperatives per user. No account-type permission rule is inferred.
- Database checks reject empty cooperative, bank submission, and membership statuses;
  nonnullable columns also reject `NULL`. Model `clean()` checks these fields
  because Django skips field validation for `editable=False` fields.
- No unique name or registration number, single membership rule, or single
  bank account limit is introduced: the contract does not specify those rules.
  Multiple bank submissions remain representable without overwriting history.
- `CooperativeBankAccount.get_payout_account_details()` raises `ValidationError`
  unless `submission_status` is exactly `approved`. An approval timestamp alone
  does not grant eligibility. Optional timestamps remain optional, including
  for approved records. Future payout code must use this guard or enforce the
  same rule at its write boundary; the model cannot enforce callers' direct
  reads of `account_details` or operations in the unimplemented finance app.

There is no invented initial status, enum, or transition workflow. Trusted code
must assign a nonempty status before validating or saving a record. Django's
ordinary `save()` does not call `full_clean()`; internal write paths must perform
appropriate validation, with the database constraints as additional protection.

## CooperativeMembership implementation decisions

The previously deferred model now references the existing Farmer using
`'farmers.Farmer'`, where `farmers` is the Django application label. Both
relationships are required foreign keys with `PROTECT`, following the existing
historical-record preservation convention. There is no unique farmer,
farmer/cooperative pair, active-membership, overlap, or date-order constraint.
These omissions leave the unspecified membership policies open.

The implementation request authorizes choosing a proof representation without
new storage infrastructure. `membership_proof` uses JSON for supporting data
or document references, consistent with the existing identity/account fields.
The project has no configured upload storage or existing file-field convention.
No file upload, storage provider, required JSON keys, or proof-verification rule
is introduced. Model validation rejects empty proof and non-JSON-serializable
data; it does not verify a document's existence or authenticity.

`start_date` uses Django's `DateField(auto_now_add=True)`: the calendar date is
generated on the first save and preserved on ordinary updates. This is a
storage implementation decision under the requested generated-date requirement,
not a confirmation or verification transition. It is excluded from model forms,
as are the UUID and both statuses. `end_date` is optional and stored as `NULL`
when omitted. Dates have day precision (`YYYY-MM-DD`), with no time component.
Future membership workflows must define effective-date semantics before relying
on insertion as a confirmation or approval event.

## Contract decisions still outstanding

These are documented gaps, not changes to agreed business requirements.

| Source | Issue and impact | Proposed resolution | Approval status |
| --- | --- | --- | --- |
| Section 1.B: system statuses | Allowed values, initial states, and transitions are unspecified. Autonomous onboarding/review workflows cannot be implemented from this section. | Agree lifecycle values and transitions before implementing workflows; current storage requires a trusted system-assigned value and recognizes only the explicitly required payout approval marker. | Workflow decisions awaiting developer agreement; model storage implemented within the directly authorized task. |
| Section 1.B: contact information, account details, membership proof | Payload schemas are unspecified. Required JSON storage validates serializability, not bank/contact correctness or membership proof authenticity. | Agree payload validation and any upload requirements before implementing API inputs. | Membership JSON representation chosen under the explicit implementation request; schemas and upload workflows await developer agreement. |
| Section 1.B: membership and bank review | Membership cardinality, rejoining/history policy, timestamp ordering, and bank replacement/revocation rules are unspecified. Additional uniqueness or lifecycle checks could reject valid future workflows. | Define these rules before introducing further constraints or review operations. | Awaiting developer agreement; no such constraints implemented. |
| Section 1.B: membership dates | The contract marks `start_date` as generated without defining an effective-start event. A creation date alone does not establish confirmation or verification. | Current storage generates the date at insertion; define effective-date semantics before membership workflows. | Generated-date implementation is within the requested scope; workflow semantics await developer agreement. |

## Migration and verification scope

The initial cooperatives migration contains only the three independent models
and their constraints, with a swappable dependency on the configured User model.
The next migration, `cooperatives/0002_cooperativemembership.py`, creates only
CooperativeMembership and its two nonempty-status checks. It depends on both
`cooperatives/0001_initial.py` and `farmers/0001_initial.py`, so both referenced
tables precede membership creation. Migrations are generated and inspected,
never applied as part of this task.

Tests follow the existing accounts approach: `SimpleTestCase` prevents database
queries. They exercise required data, JSON validation, system input exclusion,
UUID and date/timestamp generation, resolved relationship metadata, and payout
eligibility. Uniqueness, deletion protection, and database checks are inspected
as model/schema declarations; their actual database enforcement remains to be
verified with PostgreSQL/PostGIS. Temporary process settings use Django's dummy
database backend for tests, checks, and migration generation without modifying
the configured PostgreSQL/PostGIS settings. Membership tests additionally cover
proof validation, optional end dates, both status-check declarations, and the
migration graph's dependency ordering without querying a database. The start-date
test verifies that insertion replaces a supplied date and that updates preserve
a historical date rather than resetting it to today.

Verification on 2026-11-10, executed through `uv run --offline --frozen --no-sync`
with the temporary process settings described above:

- `makemigrations cooperatives`: reproduced `0002_cooperativemembership.py` in a
  temporary migration module containing the existing cooperative initial
  migration. Its output matches the draft except for the generation timestamp;
  the existing migration files were preserved. Inspected its single model
  operation and both initial-migration dependencies.
- `check`: no issues, none silenced.
- `test --verbosity 2`: 83 tests passed, including 15 membership tests and the
  68 existing tests; setup of the unused default database was skipped. The
  migration graph test confirmed dependency ordering and no conflicts.
- `makemigrations --check --dry-run`: no changes detected.
- `git diff --check`: passed.

No migrations were applied and no database integration tests were run. The
check using the configured PostGIS backend was rerun and failed during Django
setup because the GDAL library is unavailable. It could not reach the database;
database enforcement and applied migration history remain unverified.
