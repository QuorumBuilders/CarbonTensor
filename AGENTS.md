# TensorCarbon agent instructions

## Project and scope

- TensorCarbon is an agnostic carbon Measurement, Reporting and Verification (MRV) platform. The initial implementation covers methane avoidance through Alternate Wetting and Drying (AWD) in smallholder rice cultivation.
- This monorepo contains independently maintained `backend/` and `frontend/` applications. The backend follows a modular monolith architecture.
- The MVP manages one carbon project. Do not introduce a `projects` application without an established domain requirement and developer approval.
- AWD is a practice within MRV, not a separate application. Keep business responsibilities in their owning modules; reserve `core` for genuinely shared infrastructure.
- Stay within the requested task. Do not initialize applications, change architecture, add integrations or layers, modify another component, or perform unrelated refactoring without authorization.

## Decision ownership and workflow

The human developer owns architectural and implementation decisions. Agents implement agreed decisions, analyse requirements, identify risks and inconsistencies, recommend alternatives, and explain trade-offs. Challenge questionable decisions explicitly; do not silently replace them or expand scope.

Before every substantial task:

1. Understand the requested outcome and inspect Git status, relevant code, documentation, configuration, and applicable agent instructions.
2. Identify affected components, dependencies, ambiguities, and risks. Preserve existing user changes, including untracked files.
3. Present significant design decisions and requirement changes for approval before implementing them. Continue with already approved decisions; resolve routine, low-risk details using established conventions.
4. Implement the agreed scope, validate it, and report changes, checks actually run, and unresolved issues.

## Requirements and documentation

- Use `docs/api/MVP Data Model and API Contract.md` (**TensorCarbon MVP Data Model & API Contract**) as the initial functional reference. Read the relevant sections before implementation.
- Do not silently change requirements or invent business rules. For missing relationships, contradictions, unclear rules, inadequate constraints, or API inconsistencies, document the source, issue, impact, proposed resolution, and approval status.
- Keep existing agreed requirements, technical implementation decisions, and proposed changes awaiting approval clearly distinguished in documentation and reports.
- `README.md` describes a broader product vision, including multiple projects and candidate integrations. Those descriptions do not expand the agreed single-project MVP scope.
- Frontend demo data, payout examples, simulated integrations, and roadmap items do not establish backend business rules or API contracts.

## Coding and testing

- Prefer straightforward, maintainable code and established framework conventions. Keep responsibilities clear; avoid premature abstractions, unnecessary dependencies, and patterns added for appearance.
- Validate data at appropriate boundaries. Enforce authorization and business rules server-side; use transactions for atomic operations and idempotency for retryable operations where appropriate.
- Preserve historical and audit-relevant records. Handle errors explicitly; do not conceal failures with broad exception handling.
- Write tests for implemented behaviour, important validation and permission boundaries, business invariants, state transitions, and relevant failure paths.
- Run checks appropriate to the change. Report what ran and any limitations; never claim unexecuted tests passed or weaken existing tests to make changes pass.
- Use `uv` for Python dependencies and environments; do not manually maintain a separate `requirements.txt`. Explain why any new dependency is necessary.

## Component instructions and existing conventions

- Follow `backend/AGENTS.md` for backend work. For frontend work, also read `frontend/AGENTS.md` and `frontend/docs/agent_rules.md`; frontend workflows use `pnpm` exclusively.
- Frontend context lives in `frontend/docs/STATE.md`, with architecture, decisions, and plans beside it. Its directory isolation and generated Next.js guidance apply to frontend tasks.
- At instruction setup, `backend/` was empty. A pre-existing, untracked root Python scaffold includes `pyproject.toml`, `.python-version`, and `src/tensor/`; preserve it. It declares Python `>=3.13`, pins `3.13`, and uses `uv_build`. Backend initialization and the relationship to that scaffold remain to be agreed.
