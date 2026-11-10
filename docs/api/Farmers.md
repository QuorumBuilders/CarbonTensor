# Farmer model

Implements section 1.C of the [MVP data model contract](MVP%20Data%20Model%20and%20API%20Contract.md)
in `apps.farmers.models.Farmer`. This implementation includes model storage only;
registration and other farmer APIs are not implemented.

| Field | Requirement and storage |
| --- | --- |
| `id` | Generated, noneditable UUID primary key using `uuid.uuid4`. |
| `user` | Required `OneToOneField` to `settings.AUTH_USER_MODEL`; reverse accessor `User.farmer`. |
| `first_name` | Required `CharField(255)`. |
| `last_name` | Required `CharField(255)`. |
| `phone_number` | Required `CharField(50)`; preserves leading zeroes and phone formatting. |
| `identity_information` | Required `JSONField`, without a default or an imposed key schema. |
| `registration_status` | System-managed, noneditable `CharField(50)`; no choices or default. |
| `verification_status` | System-managed, noneditable `CharField(50)`; no choices or default. |
| `created_at` | Generated `DateTimeField(auto_now_add=True)`; unchanged by ordinary updates. Future API timestamps follow ISO 8601. |

Required fields use `blank=False` and `null=False`. Model validation rejects
empty required values and non-JSON-serializable identity information. It does
not establish identity validity. String lengths are storage limits, not phone
or identity format rules; no phone uniqueness or account-type rule is added.

The one-to-one relationship permits at most one Farmer per User, as authorized
by the implementation request. It uses `PROTECT`, following the cooperative
models' convention, so deleting a referenced User cannot erase farmer history.

Both statuses follow the cooperative model's approach: trusted code must assign
nonempty values before validation or persistence. `clean()` rejects missing
statuses; database checks reject empty strings and nonnullable columns reject
`NULL`. No initial status, choices, transitions, or status generator is invented.
Django's `save()` does not call `full_clean()`; future write paths must validate
their inputs. Generated fields are excluded from model forms; future API
serializers must explicitly prevent clients from setting them.

## Contract details awaiting agreement

| Source | Issue and impact | Proposed resolution and approval status |
| --- | --- | --- |
| Contract section 1.C: system-managed statuses | Initial values, allowed states, and transitions are unspecified; registration and review workflows cannot assign a defined lifecycle yet. | Agree these before implementing workflows. Awaiting developer agreement; storage follows the explicitly requested cooperative approach. |
| Contract section 1.C: identity information and phone number | Identity keys and phone formats are unspecified; JSON validation alone cannot verify identity or contact correctness. | Agree payload and format validation before API implementation. Awaiting developer agreement; no schema or format rules introduced. |

## Migration and verification scope

`farmers/0001_initial.py` creates only Farmer and its two status checks. Its
`migrations.swappable_dependency(settings.AUTH_USER_MODEL)` resolves to
`accounts/0001_initial.py` with the current configuration.

Tests follow the existing `SimpleTestCase` convention without database access.
They cover model construction and validation, UUIDs, required fields, the custom
User relation, one-to-one metadata and reverse access, phone/JSON preservation,
status requirements, model-form input restrictions, and timestamp generation.
Temporary process settings select Django's dummy database backend for checks,
tests, and migration consistency verification; production settings are unchanged.
Database persistence, uniqueness enforcement, deletion protection, and status
constraints require later PostgreSQL/PostGIS integration verification. No
migrations are applied as part of this implementation.

Verification on 2026-11-10 through `uv run --offline --frozen --no-sync`:
68 tests passed, including 15 Farmer tests; isolated `check` reported no issues;
`makemigrations --check --dry-run` reported no changes. The migration graph
confirmed the accounts dependency and no conflicts. The check using the
configured PostGIS backend could not start because GDAL was unavailable, so
database integration and applied migration history remain unverified.
