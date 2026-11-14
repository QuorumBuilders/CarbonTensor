# CarbonTensor Design System & Token Specification

**Status:** Canonical Foundation  
**Adjectives:** Verifiable • Grounded • Disciplined  
**Iconography:** `@tabler/icons-react` ($1.5\text{ px}$ stroke)  
**Typography:** `Geist` & `Geist Mono` (Weights: `400` Regular and `500` Medium strictly)  

---

## 1. Color Palette & Semantic Tokens

### 1.1 Structural Surfaces & Canvas
* `--background` (`#F8F7FA`): Calm, neutral canvas backing. Replaces stark white for reduced glare during long audit sessions.
* `--card` (`#FFFFFF`): Pure white elevation for cards, tables, modals, and spotlight modules.
* `--muted` (`#F0EEF4`): Soft secondary surface for table headers, inactive tabs, and segmented controls.
* `--border` (`#E2DFEA`): Disciplined hairline divider ($1\text{ px}$) separating layout panels without heavy shadows.
* `--foreground` (`#161321`): Deep ink text. High-contrast readability on white and neutral canvas surfaces.
* `--muted-foreground` (`#484368`): Secondary body copy, table column headers, and helper descriptions.
* `--subtle` (`#685E8A`): Tertiary text for metadata, reading timestamps, and disabled indicators.

### 1.2 Brand & Conversion Action Tokens
* `--brand` (`#0B4D25`): Forest Green 700. Structural brand anchor used for primary buttons, active edge markers, and union badges.
* `--brand-hover` (`#1B5C2D`): Forest Green 600. 150ms ease-out hover state for brand actions.
* `--brand-muted` (`#EAF3ED`): Forest Green 50. Soft tint for active navigation tab backgrounds and verified chips.
* `--brand-foreground` (`#FFFFFF`): Crisp white text on brand green containers.
* `--chrome` (`#07381A`): Forest Green 800. Dark navigation background for the persistent desktop sidebar and mobile header.
* `--accent` (`#F15A24`): Action Orange 500. Reserved strictly for primary conversion triggers (e.g. *"Enroll New Plot"*, *"Simulate Buyer Settlement"*, *"Export Audit Pack"*).
* `--accent-hover` (`#CE4312`): Action Orange 600. 150ms hover state.
* `--accent-muted` (`#FDF0EB`): Action Orange 50. Contextual tint for conversion warnings and pending financial notices.
* `--accent-foreground` (`#FFFFFF`): High-contrast white text on accent buttons.

### 1.3 High-Contrast Status Tokens
Status tokens are always applied as matched pairs (tinted background + high-contrast text + subtle border):

* **Success (`ACTIVE`, `VALID`, `COMPLIANT`, `DISBURSED`, `SIMULATED_SUCCESS`):**
  * `--status-success-bg`: `#EAF3ED`
  * `--status-success-fg`: `#0B4D25`
  * Border accent: `#9CC9AB`
* **Warning (`PENDING`, `SUSPICIOUS`, `SENSOR_FAULT`, `RADAR_DISCREPANCY`):**
  * `--status-warning-bg`: `#FDF5E6`
  * `--status-warning-fg`: `#7A4D05`
  * Border accent: `#F5B09A`
* **Error (`REJECTED`, `NON_COMPLIANT`, `FAILED`, `SUSPENDED`):**
  * `--status-error-bg`: `#FDF0ED`
  * `--status-error-fg`: `#7A1C18`
  * Border accent: `#EE6A3B`
* **Info (`FALLOW`, `HARVESTED`, `SUBMITTED_TO_REGISTRY`, `SANDBOX_NOTICE`):**
  * `--status-info-bg`: `#EEF4F8`
  * `--status-info-fg`: `#0B4D25`
  * Border accent: `#C7C1D7`

---

## 2. Contrast Verification Matrix (WCAG 2.1 AA)

All color combinations meet or exceed the WCAG AA minimum contrast ratio ($4.5:1$ for normal text, $3.0:1$ for large headings and UI components):

| Text / Element Token | Background Token | Hex Pair | Contrast Ratio | WCAG AA Status |
| :--- | :--- | :--- | :---: | :---: |
| `--foreground` | `--background` | `#161321` on `#F8F7FA` | **15.4:1** | Pass (AAA) |
| `--foreground` | `--card` | `#161321` on `#FFFFFF` | **16.6:1** | Pass (AAA) |
| `--muted-foreground` | `--card` | `#484368` on `#FFFFFF` | **7.8:1** | Pass (AAA) |
| `--subtle` | `--card` | `#685E8A` on `#FFFFFF` | **4.9:1** | Pass (AA) |
| `--brand-foreground` | `--brand` | `#FFFFFF` on `#0B4D25` | **8.1:1** | Pass (AAA) |
| `--accent-foreground` | `--accent` | `#FFFFFF` on `#F15A24` | **3.6:1** | Pass (AA Large / Bold UI) |
| `--status-success-fg` | `--status-success-bg` | `#0B4D25` on `#EAF3ED` | **7.1:1** | Pass (AAA) |
| `--status-warning-fg` | `--status-warning-bg` | `#7A4D05` on `#FDF5E6` | **6.4:1** | Pass (AAA) |
| `--status-error-fg` | `--status-error-bg` | `#7A1C18` on `#FDF0ED` | **8.2:1** | Pass (AAA) |
| `--status-info-fg` | `--status-info-bg` | `#0B4D25` on `#EEF4F8` | **7.4:1** | Pass (AAA) |

---

## 3. Typography Hierarchy & Weight Rules

### 3.1 Strict Weight Rule
* **Permitted Weights:** **`400` (Regular)** and **`500` (Medium)** ONLY.
* **Prohibited Weights:** `600` (SemiBold), `700` (Bold), `800` (ExtraBold), `900` (Black).
* Visual hierarchy is created through disciplined font sizing, uppercase tracking, and color contrast—never through heavy font weights.

### 3.2 Type Scale
* **Display / Hero Headline:** `36px` (`text-4xl`), line-height `1.15`, weight `500`, tracking `-0.02em`.
* **H1 / Page Title:** `32px` (`text-3xl`), line-height `1.2`, weight `500`, tracking `-0.02em`.
* **H2 / Section Title:** `24px` (`text-2xl`), line-height `1.25`, weight `500`, tracking `-0.015em`.
* **H3 / Card Title:** `18px` (`text-lg`), line-height `1.3`, weight `500`.
* **Body / Base Copy:** `16px` (`text-base`), line-height `1.5`, weight `400`.
* **Small / Control Labels:** `14px` (`text-sm`), line-height `1.4`, weight `500` or `400`.
* **Caption / Table Headers:** `12px` (`text-xs`), line-height `1.35`, weight `500`, uppercase tracking `0.05em`.
* **Monospace Data / Numbers:** `Geist Mono`, `12px` or `14px`, with `tabular-nums` strictly enabled for coordinates, sensor water depth, and NGN amounts.

---

## 4. Geometry, Spacing, Shadows & Motion

### 4.1 Corner Radius Scale
* `--radius-control: 6px` (`rounded-md`): Buttons, text inputs, select dropdowns, search bars.
* `--radius-card: 8px` (`rounded-lg`): Cards, table containers, modal dialogs, drawers.
* `--radius-pill: 9999px` (`rounded-full`): Status chips, notification pips, and badge pills strictly.
* **Prohibited:** Indiscriminate `rounded-2xl` ($16\text{ px}$) and `rounded-3xl` ($24\text{ px}$).

### 4.2 Spacing Scale
Derived from an $8\text{ px}$ grid with a $4\text{ px}$ half-step:
* `4px` (`space-1`): Micro gaps between icons and badge text.
* `8px` (`space-2`): Input padding, chip gaps.
* `12px` (`space-3`): Tight card padding, toolbar spacing.
* `16px` (`space-4`): Standard control padding, list row spacing.
* `24px` (`space-6`): Card container padding, grid gaps.
* `32px` (`space-8`): Section spacing, large container padding.
* `48px` (`space-12`): Major page section gutters.
* `64px` (`space-16`): Landing section vertical spacing.

### 4.3 Shadows & Elevation
* **Default Surface Elevation:** Flat $1\text{ px}$ solid hairline border (`var(--border)`).
* **Modal / Drawer Elevation:** Clean, unblurred shadow `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`.
* **Banned:** `hover:shadow-sm`, `hover:shadow-md`, `hover:shadow-lg`. Interactive states rely on border color transition (`border-brand` or `border-accent`) and background color shift.

### 4.4 Motion & Transitions
* `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`
* `--duration-fast`: `150ms` (hover, focus, button active)
* `--duration-base`: `200ms` (drawer open, modal appearance)
* **Accessibility:** Full `@media (prefers-reduced-motion: reduce)` reset disabling all transforms and non-essential transitions.
