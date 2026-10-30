# Domi-fy: Product Requirements Document

Version: 0.2 (draft for Akinola to edit into his own words)
Date: 30 October 2026
This file is the product source of truth for the coding agent. If another file disagrees, ask.

## 1. Summary

Domi-fy is a mobile-first web app for landlords in Lagos who rent out several residential units. A landlord creates unit profiles, onboards tenants by invitation, and sees at a glance who has paid, who owes and who is overdue. Tenants pay the annual rent in the app and keep a permanent, numbered receipt. Tenants can also report repairs.

Name: Domi-fy, from the Latin domus (home) plus "fy". Note: a company called Domify AI exists in another sector (regulatory software). No Nigerian trademark search has been done.

## 2. Users

- Landlord (primary user, default, change if you disagree): uses the app weekly, owns the portfolio, decides adoption.
- Tenant: 18 or older. Uses the app when paying rent, for receipts and for repair reports.
- Guarantor: one stored record per lease (name, phone, relationship). No login. The purpose is for you to state in the business brief.
- Platform: responsive web app, mobile first, Android and iOS browsers. Not native apps.
- Connection: users are on variable mobile data. Pages must be light.

## 3. The one thing that must work

A landlord invites a tenant to a unit. The tenant pays the annual rent online. The landlord's dashboard shows it as paid, and the tenant holds a permanent numbered receipt.

## 4. Scope

In the MVP:
- Landlord and tenant accounts with email verification
- Unit profiles (address, unit label, nickname, annual rent, lease dates), personalised with the landlord's display name and unit nicknames on tenant views and receipts
- Tenant onboarding by landlord invite
- Guarantor record per lease
- Portfolio dashboard: expected, collected, outstanding, paid, due, overdue
- One annual rent payment per lease in Paystack test mode; the tenant pays the processing fee as a separate line
- Settlement to the landlord's account through a Paystack subaccount (test mode)
- Immutable numbered receipts
- Repair requests with status (open, in progress, resolved)
- Overdue reminder email through a scheduled job
- Account deletion request

Later phases (decided out of the MVP because only hours remain):
- Service charge follow-up (needs separate receipts and a six-monthly account under the Lagos law)
- Instalments (removed entirely)
- Tenants under 18 with parental authorisation
- Business and office tenants, listings and marketplace, photos, chat, tenant screening, AI lease Q&A, team accounts, native apps

Limitations to state: Lagos only. Apapa, Ikeja GRA, Ikoyi and Victoria Island are exempt from the Lagos Tenancy Law 2011, so legal assumptions may not apply there. Payments are test mode only. Live payouts are not available.

## 5. Core flows

1. Landlord signs up, verifies email, adds settlement bank details.
2. Landlord creates a unit profile and a lease, adds a guarantor record, invites the tenant by email.
3. Tenant opens the invite, confirms they are 18 or older, verifies email, logs in.
4. Tenant sees the lease and the amount due, pays through checkout, sees the fee as a separate line.
5. A verified payment confirmation creates the payment record and the receipt. The dashboard updates.
6. Tenant reports a repair. Landlord updates its status.
7. Rent unpaid more than 7 days after the due date triggers a reminder to tenant and landlord.

## 6. Business rules

- BR1: Tenants must be 18 or older, recorded as a timestamped attestation. No date of birth is stored.
- BR2: Rent is one annual payment per lease. A new year is a new lease.
- BR3: A payment is overdue when unpaid more than 7 days after its due date.
- BR4: Receipt numbers are sequential per landlord, never reused, never edited. A correction is a new record.
- BR5: A receipt states: date received, names and addresses of landlord and tenant, the premises, the rent amount, and the period covered. The processing fee is shown separately and is not part of the rent amount.
- BR6: The tenant pays the processing fee. The server calculates it.
- BR7: A receipt is created only from a verified payment confirmation, never from the browser redirect.
- BR8: A landlord sees only their own units, leases, tenants and payments. A tenant sees only their own lease, payments and repairs.
- BR9: A lease cannot be activated without one guarantor record.

## 7. Security and privacy requirements (each testable)

- SR1: Passwords hashed with Argon2id (or bcrypt). Session tokens random, stored hashed, sent in a secure cookie.
- SR2: Every server query on landlord or tenant data checks ownership, not only login. Test: landlord A cannot read landlord B's data by changing an ID.
- SR3: Landlord-only routes check the role on the server. A tenant pasting a landlord URL is refused.
- SR4: All input is validated on the server with a schema.
- SR5: Rate limits on login, signup, verification and password reset.
- SR6: Payment webhooks verified by signature and idempotent by transaction reference.
- SR7: Money stored as integer kobo. Payment and receipt rows are never updated or deleted.
- SR8: Secrets live in environment variables only, never in the repository or its history.
- SR9: Landlord bank details go to Paystack to create a subaccount. Domi-fy stores only the subaccount code, bank name and last four digits.
- SR10: HTTPS everywhere.
- Privacy: receipts must carry names and addresses, and guarantors are third parties who never signed up. Both conflict with erasure. The Task 5 retention matrix must resolve this.

## 8. Payments design

- Paystack, test mode. Checkout started by the server. Card data never touches Domi-fy.
- Settlement: Paystack split payments with a subaccount per landlord. Paystack says it is not liable for payouts to a wrong account, so verify bank details first.
- Fee: local fee is 1.5% + N100, capped at N2,000 (paystack.com/pricing). VAT on fees is reported by one secondary source and is unverified. Confirm the exact calculation at build time.
- Large amounts: card payments of multi-million naira may fail because of bank limits (unverified). Failures are logged in payment attempts.
- Webhook signature: HMAC-SHA512 over the raw body, header x-paystack-signature (from third-party SDK docs, confirm at docs.paystack.com).
- The regulatory position of collecting rent for landlords is unconfirmed. Get advice before going live.

## 9. Data (entities only, you design columns on paper in Task 4)

Ceiling of ten tables: users, sessions, units, leases, guarantors, payments, payment attempts, repair requests, lease chunks (must exist even if unused), and enquiries (Task 2 only: a landlord interest form that proves the app can store data).

## 10. Stack (planned)

- Next.js (App Router) with TypeScript: one codebase for front and back end, matches the course recommendation for a web app MVP.
- PostgreSQL with Prisma: relational data with migrations and a database inspector (Prisma Studio).
- Hand-built authentication: own sessions table, Argon2id, hashed cookie. The assessment grades these mechanics, so no auth library.
- Plain CSS with custom properties from the design tokens. No Tailwind, so no default palettes sneak in.
- Inter loaded with next/font, weights 400, 500, 600.
- Paystack test mode for payments.
- Open decision for Task 2 step one: local PostgreSQL or a free hosted PostgreSQL.

## 11. Non-functional requirements

- Mobile first and responsive. Proposed budget (you set it): first load under about 300 KB transferred, no autoplay media, one font family.
- Accessibility: WCAG AA contrast (checked in colour-roles.md), visible keyboard focus, tested with a real screen reader.
- Interface feel: serious, secure, trustworthy. Housing is a serious matter and money moves in the app.

## 12. Build plan by task

- Task 1: design system in Figma, tokens in the repo, CSS conversion by the agent, one screen with and without the system.
- Task 2: scaffold with a minimal home screen and a marketing page, an enquiry form that writes to the database, head tags and Open Graph, logs, branch and pull request.
- Task 3: one auth page (login and signup in one), invite code field, four kinds of validation, accessibility audit, direct request bypass.
- Task 4: schema, migrations, hashing, Zod, rate limiting, breach check, email verification, payment tables, Paystack if time allows.
- Task 5: sessions, gating, deletion with scheduled job, retention matrix, landlord-only route, interview, handbook.

## 13. Demo script (success criteria)

1. Landlord creates a unit and invites a tenant.
2. Tenant accepts and pays in test mode.
3. Receipt appears with the next number in the landlord's sequence.
4. Dashboard shows paid.
5. A second landlord cannot see any of it, shown by a direct request.
6. A tenant pasting a landlord URL is refused.
7. Tenant reports a repair and sees its status change.
8. An unpaid unit becomes overdue after 7 days and sends a reminder.

## 14. Risks and unverified assumptions

- Crowded market (Dwellrs, OurProperty.ng, Shelta, Keejo, Dom App, SmallSmall, Kwaba). Differentiation is unproven.
- Landlords may resist traceable rent records. Unvalidated. Needs a real landlord interview.
- Legal points come from the 2011 Lagos law text and are not legal advice. Whether an app-generated receipt is accepted for rent relief under the Nigeria Tax Act 2025 is unknown. Never claim tax approval.
- Minors as tenants were removed because of capacity to contract, consent and data issues. Verify before reintroducing.

## 15. Decisions applied in this version

- Primary user: landlord (default).
- Tenants 18 or older only.
- Guarantor kept as a simple record, purpose to be written by you.
- Service charges moved to a later phase.
- Instalments removed.
- Responsive web app, not native.
- Personalisation means landlord name and unit nicknames, not theming.
- Name: Domi-fy, hyphen decision still open.
