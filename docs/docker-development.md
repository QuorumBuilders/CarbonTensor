# Docker development environment

The root Compose project runs exactly three services: the Next.js frontend, the
Django backend, and PostgreSQL 17 with PostGIS 3.5. Source directories are bind
mounted for development. Frontend dependencies and Next.js build output use
named volumes so the Windows host does not replace Linux container artifacts.

## Configure and start

The Compose defaults are usable for local development. To customize credentials
or ports, copy `.env.example` to `.env` and replace its placeholder values.
The `.env` file is ignored by Git and is not copied into either image.

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Run in the background with `docker compose up --build --detach`.

The local endpoints are:

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8000>

PostgreSQL is intentionally not published to the host, avoiding conflicts with
an existing local database and reducing exposure. Inside Compose, Django
connects to `db:5432`. Browser API requests use `/api/v1` on the frontend origin
and are proxied by Next.js to the backend. Server-side Next.js requests use
`http://backend:8000/api/v1` directly.

Next.js removes a browser URL's trailing slash with an HTTP 308 redirect. The
rewrite destination adds the slash required by Django, so the redirected GET or
POST reaches its endpoint. Omitting the upstream slash causes a 308/301 loop for
GET requests and, with Django debug mode enabled, a 500 for POST requests.

The frontend's existing mock-safe mode remains enabled by default. Set
`NEXT_PUBLIC_USE_MOCK_API=false` in `.env` when exercising live endpoints.

To disable mock mode for verification without editing an existing environment
file, run this in PowerShell:

```powershell
$env:NEXT_PUBLIC_USE_MOCK_API = 'false'
docker compose up --detach --no-deps --no-build --pull never frontend
```

Compose recreates only the frontend if its environment changed, reusing the
existing image and volumes. A normal stop/start preserves that container's
environment; `restart` alone does not apply changed Compose environment values.
Set the override again, or put it in `.env`, before a later `up` if needed.

The existing frontend adapters can still return demo data after HTTP or network
errors when mock mode is false. Check browser network responses and Django logs
to verify transport. API mismatches and fallback behavior are deferred to the
separate frontend/backend consolidation work; a demo login is not evidence of
successful Django authentication.

## Routine commands

Stop and remove containers and the Compose network while retaining all named
volumes:

```powershell
docker compose down
```

Stop containers without removing them:

```powershell
docker compose stop
```

Restart stopped containers:

```powershell
docker compose start
```

Rebuild every application image or one service after dependency changes:

```powershell
docker compose build
docker compose build frontend
docker compose build backend
docker compose up --detach
```

Inspect status and logs:

```powershell
docker compose ps
docker compose logs --follow
docker compose logs --follow frontend
docker compose logs --follow backend
docker compose logs --follow db
```

## Database and migrations

PostgreSQL data is stored in the `postgres_data` named volume and survives
`stop`, `start`, `restart`, and ordinary `down` operations. Migrations are not
run automatically. Inspect them with:

```powershell
docker compose exec backend uv run --no-sync python manage.py showmigrations
```

Apply migrations only when intentionally updating the local schema:

```powershell
docker compose exec backend uv run --no-sync python manage.py migrate
```

To inspect PostGIS directly:

```powershell
docker compose exec db psql -U tensorcarbon -d tensorcarbon -c "SELECT PostGIS_Full_Version();"
```

`docker compose down --volumes` intentionally deletes the PostgreSQL data and
frontend dependency/build volumes. Do not use it as the normal shutdown command.

## Development checks

```powershell
docker compose exec backend uv run --no-sync python manage.py check --database default
docker compose exec backend uv run --no-sync python manage.py test
docker compose exec frontend pnpm lint
docker compose exec frontend pnpm exec tsc --noEmit --incremental false
```

## Verification record: 2026-11-11

Verification reused the existing images. All three containers and named volumes
were present initially; the containers were stopped. The database and backend
containers were reused, and only the frontend container was recreated to set
mock mode to false. Host free space was checked before proceeding (about
10.5 GiB initially and 6.7 GiB before the persistence check). No image builds,
migrations, test-data writes, or volume removals were performed.

### Passed

| Check | Observed result |
| --- | --- |
| Service startup and continued operation | All three services healthy before and after a normal stop/start cycle; each service was started and checked sequentially. |
| PostGIS | PostgreSQL 17.5 and PostGIS 3.5.2; `PostGIS_Full_Version()` succeeded. |
| Django native GIS | GDAL 3.6.2, GEOS 3.11.1, and `libproj.so.25` loaded. Geometry operations, EPSG:4326 to EPSG:3857 conversion, and coordinate round-trip assertions passed. |
| Django and database checks | `uv run --no-sync python manage.py check --database default` passed; a Django database query also returned the PostGIS version. |
| Migration inspection | `showmigrations --plan` reported 22 unapplied migrations. No migrations were applied. |
| Existing backend tests | All 83 tests passed. The suite skipped database setup and mocks persistence, so it does not demonstrate database-backed business behavior. |
| Frontend lint and types | `pnpm lint` and `pnpm exec tsc --noEmit --incremental false` passed. Targeted config lint and TypeScript checks also passed after the proxy fix and temporary-probe cleanup. |
| Compose configuration | `docker compose config --quiet` passed. |
| Live browser transport | Chrome 157, on both loopback origins, received Django's expected 401 for unauthenticated `/auth/me/` and 400 for an empty `/auth/token/` POST through Next.js. Matching request markers appeared in Django logs. The POST remained a POST across the single 308 redirect. |
| Existing browser API client | With mock mode false, the login form sent a real same-origin POST through Next.js to Django. Its existing endpoint mismatch returned 404; this was transport evidence, not successful login. |
| Server-side Next.js client | A temporary Route Handler called the existing `ApiClient` without a mock fallback. Network diagnostics recorded `http://backend:8000/api/v1/auth/me/`, and Django returned 401 with a matching log marker. The probe and its generated route types were removed. |
| Database persistence | Normal `compose stop` followed by sequential `compose start` preserved all three container IDs and the original `carbontensor_postgres_data` volume, created at `2026-11-11T01:19:39Z`. PostgreSQL's start time changed; cluster/database/extension identities, table list, and the SHA-256 of all 8,500 `spatial_ref_sys` rows remained identical. |

The running frontend retains `NEXT_PUBLIC_USE_MOCK_API=false`. The Compose
default remains true. No Django migration table or application tables existed
before or after the persistence check; it compared existing PostGIS data.

### Failed

- Corrected configuration failure: browser GETs looped between Next.js 308 and
  Django 301 responses, and POSTs returned Django 500. Adding the upstream
  trailing slash resolved both; a single Next.js 308 remains expected.
- Deferred application failure: the existing login adapter calls
  `/auth/login/`, while Django and the contract expose `/auth/token/`. The
  adapter returned demo data after Django's 404, even with mock mode false.
  This known discrepancy was left for the separate consolidation work.

### Blocked

Successful application authentication and complete frontend/backend integration
remain blocked by the deferred API alignment and the intentionally unapplied
application schema. No business logic or API contracts were changed.

### Untested

- Successful authenticated workflows and database-backed business writes.
- Fresh image rebuilds, production builds, and deployment.
- Automatic frontend hot-reload reliability on the Windows bind mount;
  temporary route changes required a frontend restart during verification.
