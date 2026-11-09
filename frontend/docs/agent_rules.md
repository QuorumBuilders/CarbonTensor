# TensorCarbon Frontend Agent Rules

## 1. Directory Lock & Environment Boundaries
- **Strict Directory Isolation**: Operate strictly within `~/Documents/tensor/frontend/` (`frontend/`).
- **Forbidden Traversal**: Never navigate outside (`cd ..`), inspect, edit, or touch any `backend/` directory or parent repository files outside `frontend/`.
- **Package Manager Invariant**: Use `pnpm` exclusively. Never run `npm` or `yarn`.

## 2. Token & Context Efficiency
- Do not scan the entire directory tree on subsequent tasks.
- Rely strictly on `docs/STATE.md` and `docs/agent_rules.md` for context, active task state, and constraints.
- Read `docs/architecture.md` and `docs/decisions.md` when designing interfaces, components, or state boundaries.

## 3. Brand Tokens & Design Architecture
- **Primary Green Scale (Anchor #0B4D25 = 700)**:
  - Base green for ground layers, containers, and structural chrome.
  - Secondary Sage (300 / `#6DAB6C`): Delimited paths, grid lines, spatial demarcations.
  - Tertiary Bright (400 / `#3F8851`): Network nodes, active indicators, live sensor status.
- **Accent Orange Scale (Anchor #F15A24 = 500)**:
  - Base orange strictly reserved for primary conversion actions and key triggers.
  - High-contrast text (600 / `#CE4312`) for critical alerts and emphasis on light backgrounds.
- **Neutral Purple Scale (Anchor #E2DFEA = 200)**:
  - Base canvas panels, subtle hairline borders, and elevation cards.
  - **Rule**: NEVER use Neutral Purple as a primary button background.
- **Cartographic Map Layering**:
  - Map boundaries and rice paddy plots must use cartographic green shading, clear plot borders, and high-legibility spatial overlays.
- **Typography & Numbers**:
  - `Google Sans` with fallback to `system-ui, -apple-system, sans-serif`.
  - Always apply `.tabular-nums` (`font-variant-numeric: tabular-nums`) to dates, carbon metrics, currency values, sensor readings, and coordinate grids.

## 4. Anti-Slop Ban List
- **NO generic gradient blobs**: No decorative blur circles (`backdrop-blur-3xl`, `bg-gradient-to-r from-pink-500 to-indigo-500`).
- **NO glassmorphism**: Use solid canvas backgrounds with crisp 1px borders from the Neutral Purple scale (`#E2DFEA`).
- **NO emoji icons**: Use `lucide-react` icons exclusively with consistent stroke widths (e.g. 1.5px or 1.75px).
- **NO bouncing springs / gratuitous physics**: Use standard, purposeful CSS transitions (`ease-out`, 150ms-250ms).
- **NO raw un-derived hex codes**: All colors in markup and styles must use semantic Tailwind tokens or defined CSS custom properties.
- **NO generic illustrations**: Use purposeful technical charts, satellite radar maps, and tabular ledger interfaces.

## 5. Strict Honesty Copy Rules
- **No buzzwords**: Ban terms like "revolutionize", "cutting-edge", "game-changing", "disrupt", "seamless".
- **Carbon accounting clarity**: Carbon tonnage must ALWAYS be labeled as `tCO₂e (est.)`. Never present estimated avoided methane as certified credits without qualification.
- **Banking simulation labeling**: Payout interfaces and transaction references must explicitly state `Access Bank Sandbox (Simulated)`.
- **Remote sensing caveats**: Satellite verification overlays must clearly state `Sentinel-1 Radar Cross-Check (Sample)`.

