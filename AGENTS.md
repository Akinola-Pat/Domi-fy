# Agent rules for Domi-fy

Read this file first. These rules apply to every task.

## Source of truth

1. Read, in this order, before writing any code: AGENTS.md, context/PRD.md, context/design-system.md, task-01-design-system/tokens/design-tokens.json.
2. These files are the only source of truth. If two of them disagree, stop and ask. Do not assume.
3. Summarise your understanding and wait for approval before building.

## Scope

4. Build only what the current prompt names. During scaffolding that is project setup and a minimal home screen, not the product.
5. No extra pages, utilities, example data, comment blocks or abstractions.
6. Do not install a dependency without saying what it is for and what it replaces.
7. Never run database migrations. Propose the migration and stop.
8. Create all project files inside the repository root. Never create a nested project folder. If a command would, stop and ask.

## Design system

9. No hardcoded colours, font sizes, line heights, letter spacing, shadows or radii. Use the CSS variables defined from context/design-system.md.
10. Interface code uses role variables (`--color-*`) only. Primitives are used only where roles are defined.
11. Light mode only. Ignore the legacy `color` section and any dark or fixed roles.
12. Every button uses the button text styles. Every clickable element has a pointer cursor and visible hover and focus feedback.

## Security (apply from the first line of code)

13. Money is stored as integer kobo. Payment and receipt rows are never updated or deleted.
14. Every query on landlord or tenant data checks ownership, not only that the user is logged in.
15. Validate every request body, route parameter and query string with a schema on the server before any other logic.
16. Secrets live in environment variables only. Never write a real value to any file. `.env` is ignored by git. Names go in `.env.example`.
17. Never report success to the user unless the database write returned a created record. Surface failures honestly.

## Reporting

18. After each step, list every file created or changed and every assumption made. If there were none, say so and say what you checked.
19. Audit your own response against these rules before finishing.
