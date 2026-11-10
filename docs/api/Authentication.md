# Authentication implementation

Implements the authentication section and response envelopes of
`MVP Data Model and API Contract.md`, together with the authentication task's
explicit requirements. The existing accounts User model remains unchanged.

| Method | Endpoint | Request | Success `data` |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/token/` | `email`, `password` | `access`, `refresh` |
| POST | `/api/v1/auth/token/refresh/` | `refresh` | `access` |
| GET | `/api/v1/auth/me/` | Bearer access token | `id`, `email`, `account_type`, `is_active`, `created_at` |

Successful responses contain `data` and an empty `meta` object. Errors contain
`error.code`, `error.message`, and `error.details`. Error codes use uppercase
DRF/Simple JWT codes; serializer field errors use `VALIDATION_ERROR`. Invalid
credentials, invalid tokens, and unauthenticated requests return HTTP 401;
missing required fields return HTTP 400. DRF's authentication challenge header
is preserved.

Simple JWT provides credential authentication, token signing and validation,
and active-user checks. Its defaults apply: access tokens last five minutes,
refresh tokens last one day, refresh tokens are not rotated, and no blacklist
application or custom claims are added. API authentication uses
`Authorization: Bearer <access>`. The signing key follows Django's environment
configured `SECRET_KEY` through Simple JWT's default settings.

Reusable `IsFarmer`, `IsCooperative`, and `IsStaff` permissions require an
authenticated user with the corresponding `account_type`. Django's `is_staff`
and `is_superuser` flags do not grant another account type's permissions.
These classes do not define resource ownership rules.

## Implementation issue and resolution

- Source: Simple JWT 5.5.1 `TokenRefreshSerializer.validate()` performs a user
  lookup without handling `User.DoesNotExist`.
- Issue and impact: a valid refresh token belonging to a deleted user would
  produce an unhandled server error.
- Resolution: the accounts refresh serializer catches that specific exception
  and returns HTTP 401 with `NO_ACTIVE_ACCOUNT`, while delegating other
  refresh behavior to Simple JWT.
- Approval status: implemented as a routine error-handling fix within the
  directly authorized authentication scope; no business requirement changes.

## Verification scope

Accounts tests use Django `SimpleTestCase` and DRF `APISimpleTestCase`, following
the existing tests' PostgreSQL-independent approach. Only user persistence
lookups are mocked; Django password authentication, JWT signing and validation,
URL routing, views, serializers, and permissions execute normally. Temporary
process settings disable database access for local tests and system checks.
No configured PostgreSQL/PostGIS settings or migrations are changed.

These checks do not establish database integration behavior. PostgreSQL/PostGIS
integration verification remains separate.
