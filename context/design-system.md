# Design system context (source of truth for the coding agent)

Generated from `task-01-design-system/tokens/design-tokens.json` on 2026-10-30. If this file and the JSON disagree, the JSON wins. Ask before assuming.

## Hard rules for UI code

1. No hardcoded colours, font sizes, line heights, letter spacing, shadows or radii in any component or page. Use the CSS variables below.
2. Interface code uses ROLE variables (`--color-*`) only. Primitive variables (`--primitive-*`) are referenced only inside the file that defines the roles.
3. Light mode only. Dark roles (names ending "- dark") and "fixed" roles in the JSON are ignored for the MVP.
4. The `color` section of the JSON (four old yellow styles: secondary base, secondary 50, secondary 20, secondary 10) is legacy. Ignore it. Do not create variables from it.
5. Plain CSS with custom properties. No Tailwind, no component library, no default palettes.

## Naming rules (token to CSS variable)

- Primitive: lowercase, hue word dropped, tone last. "primary blue - 40" becomes `--primitive-primary-40`. "neutral variant - 90" becomes `--primitive-neutral-variant-90`.
- Role: `--color-` plus the role name in lowercase with spaces as hyphens, taken from the table below. The table is the complete list the MVP may use.
- Type: `--type-{style}-size`, `--type-{style}-line`, `--type-{style}-weight`, `--type-{style}-spacing`, plus `--font-family-base`. Convert px to rem (divide by 16) for size and line height. Letter spacing stays in px as exported.
- Shadow: `--shadow-soft`, `--shadow-medium`, `--shadow-hard`, each a comma-separated `box-shadow` list built from the layers below (x y blur spread colour).

## Colour roles the MVP uses (23)

| Token role | CSS variable | Points at (primitive) | Light hex |
|---|---|---|---|
| primary - light | `--color-primary` | primary blue - 40 | #3941f6 |
| on-primary | `--color-on-primary` | primary blue - 100 | #ffffff |
| primary container | `--color-primary-container` | primary blue - 90 | #e0e0ff |
| on-primary container | `--color-on-primary-container` | primary blue - 10 | #00006f |
| secondary | `--color-secondary` | secondary gold - 40 | #715d00 |
| on-secondary | `--color-on-secondary` | secondary gold - 100 | #ffffff |
| error | `--color-error` | error - 40 | #ba1a1a |
| on-error | `--color-on-error` | error - 100 | #ffffff |
| error container | `--color-error-container` | error - 90 | #ffdad5 |
| on-error container | `--color-on-error-container` | error - 30 | #930009 |
| success | `--color-success` | tertiary green - 40 | #006e0c |
| on-success | `--color-on-success` | tertiary green - 100 | #ffffff |
| warning state | `--color-warning` | warning - 40 | #914d00 |
| on-warning state | `--color-on-warning` | warning - 100 | #ffffff |
| surface | `--color-surface` | neutral - 98 | #fcf8fd |
| on-surface | `--color-on-surface` | neutral - 10 | #1b1b1f |
| surface variant | `--color-surface-variant` | neutral variant - 90 | #e1e0f9 |
| on-surface variant | `--color-on-surface-variant` | neutral variant - 30 | #444559 |
| surface container | `--color-surface-container` | neutral - 95 | #f3eff4 |
| outline | `--color-outline` | neutral variant - 50 | #75758b |
| outline variant | `--color-outline-variant` | neutral variant - 80 | #c5c4dd |
| inverse surface | `--color-inverse-surface` | neutral - 20 | #303034 |
| inverse on-surface | `--color-inverse-on-surface` | neutral - 95 | #f3eff4 |

## Typography (17 styles in the JSON: 13 text, 4 button)

| Style | Family | Weight | Size px | Line px | Line / size | Letter spacing px |
|---|---|---|---|---|---|---|
| h1 headline | Inter | 600 | 48 | 68 | 1.42 | 0 |
| h2 | Inter | 600 | 40 | 56 | 1.40 | 0 |
| h3 | Inter | 600 | 32 | 48 | 1.50 | 0 |
| h4 | Inter | 600 | 28 | 40 | 1.43 | 0 |
| h5 | Inter | 600 | 24 | 36 | 1.50 | 0 |
| b1 | Inter | 400 | 16 | 24 | 1.50 | 0.5 |
| b2 | Inter | 500 | 16 | 24 | 1.50 | 0 |
| b3 | Inter | 400 | 14 | 20 | 1.43 | 0.25 |
| b4 | Inter | 500 | 12 | 16 | 1.33 | 0.4 |
| c1 | Inter | 400 | 12 | 18 | 1.50 | 0 |
| c2 | Inter | 500 | 12 | 18 | 1.50 | 0 |
| c3 | Inter | 500 | 10 | 14 | 1.40 | 0 |
| l1 | Inter | 500 | 12 | 16 | 1.33 | 0 |
| bt 1 | Inter | 600 | 18 | 24 | 1.33 | 0 |
| bt 2 | Inter | 600 | 16 | 20 | 1.25 | 0 |
| bt 3 | Inter | 600 | 14 | 16 | 1.14 | 0 |
| bt 4 | Inter | 600 | 12 | 16 | 1.33 | 0 |

Load Inter with `next/font` (weights 400, 500, 600 only) so the font is self-hosted and light on mobile data.

## Shadows (snapshot of the JSON)

| Style | Layer | X | Y | Blur | Spread | Colour |
|---|---|---|---|---|---|---|
| soft shadow | 1 | 0 | 1 | 3 | 1 | #00000026 |
| soft shadow | 2 | 0 | 1 | 2 | 0 | #0000004d |
| hard shadow | 1 | 0 | 4 | 4 | 0 | #0000004d |
| hard shadow | 2 | 0 | 8 | 12 | 6 | #00000026 |
| medium shadow | 1 | 0 | 1 | 3 | 0 | #0000004d |
| medium shadow | 2 | 0 | 4 | 8 | 3 | #00000026 |

## Known gaps in the token file (do not silently fix, ask)

- No container role exists for warning. Use `--color-warning` and `--color-on-warning` only.
- Shadows are black or grey at the time of generation, not tinted from the primary colour.
- B4, L1 and the four button styles have line height under 1.4 of the size.
- Body letter spacing (0.5, 0.25, 0.4) may equal Material defaults.
