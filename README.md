# Domi-fy

## 1. What this is

Domi-fy helps landlords in Lagos who rent out several residential units see which tenants have paid, who owes and who is overdue, and gives each tenant a permanent numbered rent receipt. The one thing that must work: a tenant pays the annual rent online and the landlord's dashboard shows it as paid.

This repository holds five tasks as five top-level folders (one repository, five folders).

## 2. Status

Honest status as of 31 October 2026:

- Finished: product requirements document (`context/PRD.md`), agent rules (`AGENTS.md`), design system context (`context/design-system.md`).
- Half done: Task 1. The design system exists in Figma and is exported to `task-01-design-system/tokens/design-tokens.json`. The agent conversion to CSS, the screen built with the system, the evidence and the written documents are not done.
- Not started: Tasks 2 to 5. There is no application code in this repository yet and nothing to run.

## 3. The stack, with reasons (planned, not installed yet)

- Next.js with TypeScript: one codebase for the front end and back end, which suits a small web app MVP.
- PostgreSQL with Prisma: relational data fits rent, leases and receipts, and Prisma gives migrations and a database inspector.
- Hand-built authentication (own sessions table, Argon2id): the assessment grades these mechanics and a library would hide them.
- Plain CSS custom properties from the design tokens: no framework palette can override the design system.
- Paystack in test mode: local payment provider with split payments to landlords.

## 4. Getting started

There is nothing to run yet. This section will be filled with exact commands once the Task 2 scaffold exists and someone who has never seen the project has followed it.

## 5. Environment variables

Names only, never values. See `.env.example`.

- `DATABASE_URL`: connection string for the PostgreSQL database (Task 2).
- `SESSION_SECRET`: signs and protects session handling (Task 4, planned).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`: sending verification and reminder emails (Task 4, planned).
- `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`: Paystack test mode keys (planned).
- `APP_BASE_URL`: the base URL used in links and payment callbacks (planned).

## 6. What this deliberately does not do

- No listings or marketplace: landlords bring their own tenants by invitation, which avoids fake listings and a cold start.
- No instalments: one annual payment per lease keeps receipts and the overdue rule simple.
- No service charges yet: the Lagos Tenancy Law needs separate receipts for them, which doubles the receipt logic.
- No tenants under 18: capacity to contract and consent for minors need a separate, careful design.
- No office or business tenants: they usually withhold tax on rent, which changes the payment maths.
- No native mobile apps: the app is a mobile-first web app, which keeps the assessment focused on browser behaviour.
- Test-mode payments only. No real money moves and live payouts are not available.
- Lagos only. Apapa, Ikeja GRA, Ikoyi and Victoria Island are exempt from the Lagos Tenancy Law 2011, so legal assumptions may not apply there.

## 7. Known defects

Real defects found so far, all in `task-01-design-system/tokens/design-tokens.json`:

- The `color` section still holds four legacy yellow styles (secondary base, secondary 50, secondary 20, secondary 10) that are not part of the current palette. They are ignored by `context/design-system.md`.
- The three shadow styles are black or grey, not tinted from the primary colour.
- Styles b4, l1 and the four button styles have a line height below 1.4 times the font size.
- Body letter spacing values (0.5, 0.25, 0.4) may be Material defaults and have not been judged by eye.
- The file contains 62 colour roles including dark and fixed roles that the MVP does not use. Only 23 are listed for use in `context/design-system.md`.
- The type scale has 17 styles (13 text, 4 button) rather than the 15 the brief describes.
