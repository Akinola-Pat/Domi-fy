# Domi-fy: Product Requirements Document (PRD)

**Document date:** 31 October 2026  
**Status:** Working product source of truth  
**Initial market:** Residential landlords in Lagos State, Nigeria  
**Platform:** Mobile-first responsive web application  
**Product name:** Domi-fy (working name; trademark clearance outstanding)

> **Source-of-truth rule:** This PRD supersedes earlier product notes where they conflict with the decisions recorded here. If another project file conflicts with this document, the coding agent must stop and ask for clarification rather than silently choosing one version. Legal, regulatory and payment-provider assumptions marked as unresolved must not be represented as confirmed capabilities or compliance.

## 1. Product summary

Domi-fy is a mobile-first property portfolio and tenancy management platform for individual and professional landlords. It helps landlords organise multiple residential properties and units, onboard tenants, track annual rent, monitor outstanding and overdue payments, issue electronic rent receipts, collect guarantor documentation and manage maintenance requests.

Tenants receive a separate interface after being invited and onboarded by a landlord. They can view their assigned tenancy information, pay rent in-app, access their rent receipts, submit maintenance requests and provide guarantor information and a signed guarantor undertaking.

The MVP will focus on residential properties in Lagos State. The product may later expand into commercial property management, office-space listings and broader real-estate services.

**Core value:** Give landlords one reliable place to manage their rental portfolios while giving tenants a clear, convenient record of their tenancy, payments and maintenance requests.

**Product name:** Domi-fy is derived from *domus* (home) and “fy”. A company named Domify AI operates in another sector. No Nigerian trademark search has been completed. Name and trademark clearance remain open.

## 2. Users, roles and operating context

### 2.1 Landlord (primary user)
- Owns or is authorised to manage one or more properties and units.
- Creates property and unit profiles, creates leases, invites tenants and supplies accurate rent and tenancy information.
- Uses the portfolio dashboard to monitor collections, outstanding rent, renewal dates, overdue tenancies and maintenance requests.
- Provides a verified bank account for rental settlement.
- Pays the Platform service fee through the agreed deduction from rental proceeds.

The MVP targets individual and professional landlords. Property managers acting for landlords may be considered later; do not assume a separate property-manager role or permissions model in the MVP.

### 2.2 Tenant
- Must be at least 18 years old for the MVP.
- Is invited by a landlord and can access only their own tenancy, payment records, receipts and repair requests.
- Pays the rent assigned to their lease through the integrated payment gateway.
- Provides the required guarantor information and signed undertaking.
- Can report maintenance issues and follow their status.

### 2.3 Guarantor
- Is recorded as part of a tenant's lease onboarding.
- Has no account, login, dashboard or other access to Domi-fy.
- Is not a platform user.
- Provides supporting information and a signed guarantor undertaking as additional security for the landlord in the event of tenant default, property damage or absconding, subject to the terms and enforceability of the undertaking.
- Required information: full name, residential address, phone number, email address, occupation, employer, government-issued identification and relationship to the tenant.
- Guarantor information must be handled as third-party personal data under applicable data-protection requirements.

### 2.4 Platform and technical context
- Responsive web application for desktop and mobile browsers, including Android and iOS browsers. Native mobile applications are out of MVP scope.
- Users may have variable or low-bandwidth mobile connections. Pages and flows must be lightweight and resilient.
- The landlord is the primary user and adoption decision-maker; the tenant interface supports the landlord-tenant workflow.

## 3. Primary product outcome

The critical end-to-end outcome is:

1. A landlord creates a unit and lease, records or requests the tenant's guarantor information, and invites the tenant.
2. The tenant accepts the invitation, confirms they are at least 18, verifies their email and completes the required onboarding information, including guarantor details and the signed undertaking.
3. The tenant pays the annual rent through the payment gateway.
4. The payment provider confirms the transaction through a verified server-side notification.
5. Domi-fy records the payment, issues the next permanent numbered rent receipt and updates the landlord's dashboard.
6. The landlord receives the landlord share through the provider-supported split settlement, and Domi-fy receives its service fee.
7. The tenant can report a repair and track the landlord's status updates.

The dashboard must never mark a payment as paid solely because the tenant returns from a checkout page.

## 4. Scope and release boundaries

### 4.1 MVP scope

**Accounts and access**
- Landlord and tenant accounts.
- Email verification.
- Role-based access enforced on the server.
- Landlord invitation flow for tenant onboarding.
- Tenant age attestation confirming the tenant is 18 or older.

**Property and tenancy records**
- Landlord portfolio containing multiple properties across different locations.
- Property/unit profiles with address, unit label, nickname, annual rent, lease start date and lease end/due date.
- Landlord display name and unit nickname shown in tenant views and receipts where appropriate.
- A lease associated with one landlord, one unit, one tenant and one guarantor record.
- One annual rent payment per lease in the MVP. A new rental year is represented by a new lease. Instalment payments are out of scope.
- A lease cannot become active until the required guarantor record and signed undertaking have been provided and accepted according to the onboarding workflow.

**Guarantor onboarding**
- Capture all required guarantor details listed in Section 2.3.
- Tenant can enter guarantor information and upload the signed undertaking.
- Landlord can review the submitted details and document before activating the lease.
- Guarantor has no login or direct access.

**Portfolio and rent tracking**
- Dashboard metrics: expected rent, collected rent, outstanding rent, paid leases, due leases and overdue leases.
- Tenant-level and unit-level payment status.
- Payment history and transaction references.
- Upcoming renewal visibility.
- Configurable overdue threshold, defaulting to one calendar month after the rent due date.

**Payments and receipts**
- Paystack integration in test mode for MVP demonstration.
- Server-initiated checkout; card details never pass through or are stored by Domi-fy.
- Provider-supported split settlement: 1.5% of successfully collected gross rent allocated to Domi-fy and 98.5% allocated to the landlord.
- Domi-fy bears payment gateway processing charges. Tenants are not charged a separate gateway processing fee or Domi-fy service fee.
- Payment attempts and failures are recorded.
- Immutable, sequentially numbered electronic rent receipts, issued on behalf of the landlord after verified payment confirmation.
- Receipt shows the gross rent paid, not the landlord's net settlement after the Domi-fy fee.
- Landlord transaction and settlement statement showing gross rent, platform fee, landlord allocation, settlement status and payment reference.

**Maintenance**
- Tenant can report a repair, describe the issue and attach photographs.
- Landlord can review the request and update its status.
- Statuses: Open, Investigation Ongoing, In Progress and Sorted.
- Tenant can see the current status of their own request.

**Notifications**
- Advance rent-renewal reminders.
- Rent due-date reminders.
- Overdue notifications to tenant and landlord.
- Email is the MVP notification channel.
- Scheduled jobs must evaluate due dates and send notifications without duplicate sends. Reminder timing before the due date and the cadence of overdue reminders must be configurable or explicitly set before release; do not invent a statutory schedule.

**Privacy**
- Account deletion request workflow.
- Data retention and deletion rules documented in a retention matrix before implementation of deletion jobs.

**Enquiry form**
- A basic landlord interest/enquiry form that writes to the database may be retained for the marketing-site demonstration and lead capture. It is not a core tenancy workflow.

### 4.2 Deferred from MVP

- Service-charge follow-up and collection. This requires separate business rules, accounting and receipts, and legal review of any applicable statutory requirements. Do not assume that a single six-monthly account is universally required without confirming the applicable law and tenancy arrangement.
- Instalment rent payments. Removed from the MVP.
- Tenants under 18, including parental or guardian authorisation.
- Commercial and business tenants.
- Office-space listings, property marketplace and public listings.
- Property photo galleries beyond photographs attached to maintenance requests.
- In-app chat.
- Tenant screening.
- AI lease question-and-answer features.
- Team accounts and delegated staff permissions.
- Native Android and iOS applications.
- Multi-state legal configuration beyond the initial Lagos launch.

### 4.3 MVP limitations and launch gates

- Initial product scope is residential property management in Lagos State.
- The MVP uses Paystack test mode. Test transactions do not represent live rent collection, live settlement or production readiness.
- Live payments and payouts are not available until payment-provider onboarding, settlement configuration, legal review and regulatory checks are complete.
- The Lagos State Tenancy Law 2011 does not apply uniformly to every location or tenancy. The source PRD identifies Apapa, Ikeja GRA, Ikoyi and Victoria Island as excluded areas. This geographic/legal limitation must be verified by Nigerian counsel and represented accurately in product guidance. Do not assume that every property in Lagos is governed by identical tenancy provisions.
- The product's one-month overdue classification is a platform rule, not a statutory notice period or an eviction trigger.

## 5. Core user flows

### 5.1 Landlord registration and setup
1. Landlord signs up and verifies their email.
2. Landlord completes the required profile information.
3. Landlord submits settlement bank details through the payment provider's supported onboarding flow.
4. Bank account ownership and settlement details are verified before live settlement is enabled.
5. Landlord creates a property and one or more units.

### 5.2 Property, lease and tenant onboarding
1. Landlord creates a unit profile with address, unit label/nickname, annual rent and tenancy dates.
2. Landlord creates a lease and enters the tenant's invitation email.
3. Landlord initiates the tenant invitation.
4. Tenant opens the invitation, confirms they are at least 18, verifies their email and signs in.
5. Tenant reviews the assigned property and lease details.
6. Tenant provides the required guarantor information and uploads the signed guarantor undertaking.
7. Landlord reviews the guarantor information and undertaking.
8. Lease becomes active only when mandatory onboarding requirements are satisfied.

### 5.3 Rent payment and receipt
1. Tenant views the rent amount and due date for their lease.
2. Tenant starts checkout. The amount charged is the agreed rent; no separate platform or gateway processing surcharge is added.
3. The server creates the payment request using the configured payment provider.
4. The provider processes payment and sends a signed webhook.
5. The server verifies the webhook, confirms the transaction with the provider where appropriate, and processes it idempotently.
6. On confirmed success, the system records the payment and applies the 1.5%/98.5% split settlement configuration.
7. Domi-fy bears the gateway processing charge.
8. The system creates the next sequential receipt number for that landlord and generates the landlord-issued receipt for the gross rent amount.
9. The landlord dashboard and tenant payment history update.

### 5.4 Renewal, due and overdue management
1. The system uses the lease due date to calculate upcoming renewal and payment status.
2. The tenant receives advance renewal reminders according to the configured reminder schedule.
3. The tenant receives a due-date reminder.
4. If rent remains unpaid after the due date, the lease is outstanding.
5. If rent remains unpaid for the default overdue threshold of one calendar month after the due date, the lease is classified as overdue.
6. Landlords may configure the overdue threshold for their portfolios or leases, subject to product rules established for the MVP.
7. The system notifies the tenant and landlord when the configured overdue threshold is crossed.
8. Notifications are administrative reminders only. They are not statutory notices to quit, demands for possession or authority to evict.

### 5.5 Maintenance request
1. Tenant opens a repair request against their assigned unit.
2. Tenant enters a description and may attach photographs.
3. Landlord receives the request.
4. Landlord reviews it and sets the status to Open, Investigation Ongoing, In Progress or Sorted.
5. Tenant can view the latest status.
6. The system retains the request and status history needed to provide an audit trail.

### 5.6 Account deletion
1. User submits an account deletion request.
2. The system verifies the request and explains that some transaction, receipt, tenancy or legal records may need to be retained for statutory, contractual, security or dispute-resolution purposes.
3. Account access and optional profile data are handled according to the approved retention matrix.
4. Financial records and issued receipts are not deleted or altered merely because an account is closed.
5. The system records the deletion request and its outcome.

## 6. Business rules

- **BR1: Minimum tenant age.** MVP tenants must be at least 18. Record a timestamped age attestation; do not store date of birth.
- **BR2: Annual lease model.** MVP rent is one annual payment per lease. A new rental year is represented by a new lease. Instalments are excluded.
- **BR3: Payment status.** A lease/payment may be Pending, Paid, Failed or Refunded as appropriate to the transaction lifecycle. A lease with rent not paid by its due date is Outstanding.
- **BR4: Overdue threshold.** Default overdue classification occurs when rent remains unpaid one calendar month after the due date. Landlords may configure the threshold. The calculation must use calendar-month arithmetic in the relevant local date/time context, not an arbitrary 30-day approximation. The threshold is a platform status rule and does not replace statutory notices or tenancy-agreement provisions.
- **BR5: Renewal and due reminders.** The system sends advance renewal reminders, due-date reminders and overdue notifications. Reminder timing and repeat cadence must be configurable or explicitly approved as product defaults before release.
- **BR6: Receipt numbering.** Receipt numbers are sequential per landlord, never reused and never edited. A correction is represented by a new linked correction record; the original receipt remains in the audit trail.
- **BR7: Receipt content.** Each rent receipt includes date received; landlord's name and address; tenant's name and address; description and location of the premises; gross rent amount received; and rental period covered. Include a unique receipt number and transaction reference. Any additional statutory fields identified by legal review must be added.
- **BR8: Gross rent on receipt.** The receipt records the full rent paid by the tenant. The 1.5% Domi-fy fee is a deduction from the landlord's proceeds and does not reduce the rent amount paid or the amount shown on the receipt.
- **BR9: Fee allocation.** For each successfully collected rental payment, 1.5% of gross rent is allocated to Domi-fy and 98.5% to the landlord through provider-supported split settlement. The platform bears gateway processing charges separately.
- **BR10: No tenant surcharge.** The tenant is charged the agreed rent only. The platform must not add its service fee or gateway processing charges as a separate tenant payment surcharge.
- **BR11: Payment confirmation.** A receipt and successful payment record are created only after verified server-side payment confirmation, never from the browser redirect alone.
- **BR12: Immutability.** Payment and issued receipt records are append-only. Corrections, reversals and refunds create linked records or status events; they do not erase the original financial event.
- **BR13: Data isolation.** A landlord sees only their own properties, units, leases, tenants, payments and repair requests. A tenant sees only their own lease, payments, receipts and repairs.
- **BR14: Guarantor requirement.** A lease cannot be activated without one complete guarantor record and the required signed undertaking.
- **BR15: Guarantor access.** Guarantors do not receive accounts or access to the application.
- **BR16: Repair statuses.** Permitted statuses are Open, Investigation Ongoing, In Progress and Sorted. Status changes must be attributable to the landlord account and timestamped.
- **BR17: Settlement.** The landlord's allocation is 98.5% of gross rent before any separately authorised statutory adjustments. Gateway charges are borne by Domi-fy and must not reduce the landlord's allocation.
- **BR18: Settlement truthfulness.** A payment must not be described as settled until the payment provider or financial institution confirms settlement.
- **BR19: Rent and tenancy accuracy.** The landlord is responsible for the accuracy of property, tenant, rent, lease-period and due-date information supplied to the platform.
- **BR20: Tax representation.** A rent receipt is evidence of payment and may support tax reporting. Domi-fy must not claim that its receipt automatically constitutes tax-authority approval or satisfies every tax filing requirement.

## 7. Functional requirements and acceptance criteria

### 7.1 Landlord portfolio
- Landlord can create, view and update their own property and unit profiles.
- A landlord can manage multiple properties in different locations and multiple units within a property.
- A unit cannot be assigned to another landlord without an explicit ownership/management transfer process, which is outside MVP unless separately specified.
- Dashboard totals reconcile with underlying payment and lease records.
- Expected, collected and outstanding amounts are calculated from active lease records and confirmed payments, not browser-side values.

**Acceptance:** Create two landlords, multiple properties and units for each. Confirm each dashboard shows only its owner's data and totals reconcile with the database.

### 7.2 Tenant invitation and onboarding
- Landlord can invite a tenant to a specific unit and lease by email.
- Invitation tokens are random, single-use, expiring and stored securely.
- Tenant must verify email and attest to being 18 or older.
- Tenant can submit all required guarantor details and upload a signed undertaking.
- Landlord can review the submission before lease activation.

**Acceptance:** An expired, used or invalid invitation cannot activate a tenant. A lease missing required guarantor information or undertaking cannot become active.

### 7.3 Payments
- Checkout is initiated server-side.
- Payment amount is derived from the active lease on the server, not trusted from client input.
- MVP uses Paystack test mode.
- Payment configuration allocates 1.5% to Domi-fy and 98.5% to the landlord.
- Gateway processing charges are borne by Domi-fy.
- No gateway fee or platform fee is added to the tenant's amount due.
- Payment attempts, provider references, outcomes and failure reasons are recorded.
- Webhook processing is signature-verified and idempotent.

**Acceptance:** A successful test payment creates one payment record and one receipt only, updates the dashboard and records the correct split. Replaying the same webhook does not create duplicate payments, receipts or fee allocations. A failed or unverified payment does not create a receipt or mark the lease paid.

### 7.4 Receipts
- Receipt numbers are sequential per landlord and unique.
- Receipt is generated only after verified payment success.
- Receipt contains all required information in BR7 and displays gross rent.
- Receipt is available to the relevant tenant and landlord.
- Issued receipts cannot be edited or deleted through normal application operations.

**Acceptance:** Two successful payments for one landlord receive consecutive numbers. A second landlord has an independent sequence. Concurrent successful payments cannot produce duplicate receipt numbers.

### 7.5 Maintenance
- Tenant can submit a repair request for their assigned unit, with description and optional photographs.
- Landlord can view and update only repair requests within their portfolio.
- Tenant can see their own request and current status.
- Status changes are timestamped and retained.

**Acceptance:** Tenant A cannot read Tenant B's repair request. A landlord cannot update a repair request belonging to another landlord.

### 7.6 Notifications
- System sends advance renewal, due-date and overdue emails.
- Overdue classification follows BR4.
- Notification jobs are idempotent and record send attempts and outcomes.
- A paid lease is not sent an overdue reminder for the same paid period.
- Notification failures are logged and eligible for controlled retry.

**Acceptance:** Automated tests cover dates before due date, due date, one day after due date, the configured overdue threshold, a paid lease and a changed landlord threshold. No duplicate reminder is sent for the same event and recipient.

### 7.7 Account deletion and retention
- User can request account deletion.
- System applies the approved retention matrix.
- Records that must be retained are preserved, access is restricted where appropriate, and optional data is deleted or anonymised where legally permissible.
- Guarantor data is not treated as freely erasable solely because the guarantor never created an account.

**Acceptance:** A deletion request does not delete issued receipts, payment audit records or other records subject to an approved retention obligation. The request and action taken are auditable.

## 8. Security and privacy requirements

Each requirement must be testable.

- **SR1: Password storage.** Hash passwords with Argon2id (preferred) or bcrypt using an appropriately secure configuration. Never store plaintext passwords.
- **SR2: Session security.** Generate cryptographically random session tokens, store only token hashes, and deliver tokens in secure, HttpOnly and appropriately SameSite cookies. Rotate and expire sessions safely.
- **SR3: Ownership checks.** Every server-side query involving landlord or tenant data must enforce record ownership and role permissions, not merely rely on authentication. Test direct requests with another user's IDs.
- **SR4: Role enforcement.** Landlord-only routes and actions must check the role on the server. A tenant pasting a landlord URL or calling a landlord endpoint directly must be refused.
- **SR5: Server validation.** Validate all input on the server using schemas. Client-side validation is supplementary only.
- **SR6: Rate limiting.** Apply rate limits to signup, login, email verification, invitation acceptance and password reset.
- **SR7: Payment webhooks.** Verify provider webhook signatures using the provider's current documented method and raw request body. Process events idempotently using provider transaction references.
- **SR8: Financial precision.** Store monetary values as integer kobo. Do not use floating-point arithmetic for money.
- **SR9: Financial immutability.** Payment events and issued receipts are append-only. Refunds, reversals and corrections are represented by linked records or events.
- **SR10: Secrets.** Store API keys, webhook secrets, database credentials and other secrets in environment variables or an approved secret manager. Never commit secrets to the repository or its history.
- **SR11: Bank information.** Send landlord bank details to the payment provider for subaccount/recipient setup. Domi-fy should retain only the provider reference, bank name and last four digits where sufficient. Do not store full bank credentials unnecessarily.
- **SR12: Transport security.** HTTPS everywhere in deployed environments. Secure cookies and appropriate security headers are required.
- **SR13: File security.** Validate uploaded guarantor documents and repair photographs by type and size; use safe storage, access controls and non-public object access. Do not trust file extensions or client MIME types.
- **SR14: Audit trail.** Record security-sensitive actions, payment state changes, receipt issuance, guarantor review and repair status changes with actor and timestamp.
- **SR15: Data minimisation.** Collect only information needed for tenancy administration, payment, guarantor documentation, maintenance and legal obligations.
- **SR16: Privacy compliance.** Design processing, notices, access controls, retention and deletion in line with the Nigeria Data Protection Act 2023 and applicable guidance. Obtain legal review of lawful basis, notices, processor arrangements and data-subject rights.
- **SR17: Third-party data.** Guarantors do not have accounts but their personal information and signed undertaking are processed. Provide appropriate notice and establish a lawful basis for collection and retention.
- **SR18: Access to receipts.** Receipts contain landlord and tenant names and addresses. Restrict access to the relevant parties and authorised platform operations personnel.
- **SR19: Breach response.** Define a security incident and personal-data breach response process before live launch.

**Retention conflict to resolve:** Payment records and receipts may need to be retained for legal, tax, accounting or dispute purposes, while users may request erasure. Guarantors are third parties who may not have signed up. Task 5 must produce a documented retention matrix defining record categories, purpose, retention period, legal basis, deletion/anonymisation approach and access restrictions. Do not implement blanket cascading deletion of financial or tenancy records.

## 9. Payments design

### 9.1 Commercial model
- Domi-fy charges landlords a service fee of **1.5% of successfully collected gross rent**.
- The payment provider's supported split-settlement arrangement allocates **98.5% to the landlord** and **1.5% to Domi-fy**.
- Domi-fy bears payment gateway processing charges separately.
- The tenant pays the agreed rental amount only. No separate Domi-fy service fee or gateway processing surcharge is added to the tenant's checkout amount.
- The landlord's rent receipt records the gross rent paid by the tenant, not the net landlord settlement.
- The landlord's dashboard and settlement statement show gross rent, 1.5% platform fee, 98.5% landlord allocation, gateway costs borne by Domi-fy where available, and settlement status.
- The 1.5% rate is the agreed initial rate. It should be configurable centrally so the business can change pricing through a properly notified and legally reviewed process.

### 9.2 MVP provider and flow
- Paystack test mode for MVP.
- Checkout is initiated by the server.
- Card details never touch Domi-fy servers or database.
- Use provider-supported split payments/subaccounts, subject to confirmation that the selected configuration supports the agreed allocation and platform-borne gateway charges.
- One verified landlord settlement destination per landlord in the MVP.
- Verify landlord bank details before enabling live settlement. Paystack's responsibility for incorrect beneficiary details and the exact verification process must be confirmed against current provider documentation.
- Live payouts are out of MVP scope until provider onboarding, regulatory review and legal approval are complete.

### 9.3 Fee calculation and accounting
- Platform fee = gross rent received × 1.5%, calculated server-side in integer kobo using a documented rounding rule.
- Landlord allocation = gross rent received − platform fee.
- Gateway processing charges are an expense of Domi-fy and must not be deducted from the landlord's 98.5% allocation.
- Any VAT or other tax applicable to the platform's service fee must be treated according to confirmed tax advice and provider settlement capability. Whether the published 1.5% is VAT-inclusive or VAT-exclusive remains an open commercial/legal decision and must be resolved before live launch.
- Do not hard-code a gateway fee formula from an unverified source. Confirm current provider pricing, applicable taxes, caps, payment-channel differences and split-settlement behaviour at implementation.
- A ₦2,000,000 rent payment illustrates the agreed allocation: ₦30,000 platform fee and ₦1,970,000 landlord allocation, with gateway costs borne separately by Domi-fy. This example excludes any unresolved tax treatment of the platform fee.

### 9.4 Payment integrity and exceptions
- Verify webhook signatures using the payment provider's current official documentation. The original note identifies HMAC-SHA512 over the raw body and the `x-paystack-signature` header; confirm these details against current Paystack documentation before implementation rather than relying on third-party SDK notes.
- Confirm payment status server-to-server where supported.
- Idempotency key: provider transaction reference, with appropriate unique database constraint.
- Record payment attempts, failures and provider responses without storing sensitive card data.
- Large multi-million-naira card transactions may be affected by issuer, channel or bank limits. This remains an unverified risk; log failures and provide clear retry/support guidance without promising a specific cause.
- Handle duplicate payment, delayed webhook, failed settlement, refund, chargeback and reversal scenarios.
- A provider checkout success page is not proof of payment.
- The regulatory position of the platform's payment facilitation and split-settlement model must be reviewed by Nigerian counsel and the selected provider before live launch. Do not launch live collection until the required structure, licences/partner arrangements and approvals are confirmed.

## 10. Data model and database constraints

The original design sets a ceiling of ten tables and identifies these entities:

1. `users`
2. `sessions`
3. `units`
4. `leases`
5. `guarantors`
6. `payments`
7. `payment_attempts`
8. `repair_requests`
9. `lease_chunks`
10. `enquiries`

Retain this ten-entity planning constraint unless a necessary technical or compliance requirement is identified and approved. Define columns, relations, indexes, constraints and deletion behaviour during schema design.

**Important schema decisions:**
- `users` must support landlord and tenant roles without allowing role escalation.
- `units` must belong to a landlord and support multiple properties/units across locations. If a separate `properties` entity is needed to model multiple units under one building/property correctly, raise this as an explicit schema change because it affects the ten-table ceiling.
- `leases` link landlord, unit and tenant, hold rent amount, rental period, due date, status and configurable overdue threshold where appropriate.
- `guarantors` store the required guarantor details and secure reference to the signed undertaking. Define access and retention controls.
- `payments` store gross rent, platform fee, landlord allocation, currency, provider, provider reference, status and relevant timestamps. Gateway charges are borne by Domi-fy and should be recorded in a way that supports platform accounting without reducing landlord allocation.
- `payment_attempts` retain failed and incomplete attempts and provider references.
- `repair_requests` retain description, secure photo references, status, timestamps and status history or an approved audit mechanism.
- `sessions` store hashed session tokens and expiry/revocation information.
- `enquiries` supports the marketing/landlord-interest form only.
- `lease_chunks` is retained in the source entity list but its purpose is not defined. Instalments have been removed from the MVP. Do not implement instalment functionality or invent a use for this table; clarify whether it is a required placeholder, remove it from the schema, or document its eventual purpose before Task 4.

All money values must be integer kobo. Use database constraints for uniqueness, ownership relationships, valid states and idempotency. Define foreign-key deletion rules deliberately; do not cascade-delete financial records, receipts or legally required documents.

## 11. Technology stack

Planned stack remains:

- **Next.js App Router with TypeScript:** single codebase for frontend and backend.
- **PostgreSQL with Prisma:** relational database, migrations and Prisma Studio for inspection.
- **Hand-built authentication:** own sessions table, Argon2id password hashing and hashed session cookie. No authentication library for the MVP because the learning assessment evaluates these mechanics.
- **Plain CSS:** custom properties derived from the design tokens. Do not introduce Tailwind or an unapproved default palette.
- **Typography:** Inter via `next/font`, weights 400, 500 and 600.
- **Payments:** Paystack test mode.
- **Validation:** Zod or an equivalent schema validation approach; the original build plan specifies Zod.
- **Email:** a transactional email provider to be selected and configured for verification, invitations and reminders.
- **Scheduled jobs:** reliable scheduled execution for renewal, due and overdue reminders.

**Open infrastructure decision:** Choose local PostgreSQL or a free hosted PostgreSQL service for development. Record the decision and ensure the environment can run migrations consistently.

## 12. Non-functional requirements

### Performance and connectivity
- Mobile-first and responsive.
- Target initial page transfer of approximately 300 KB or less where practical; measure and document exceptions.
- No autoplay media.
- One font family.
- Keep primary landlord and tenant workflows usable on variable mobile data.
- Use pagination or progressive loading for large portfolios and transaction histories.

### Accessibility
- WCAG 2.2 AA is the preferred target; at minimum retain the original WCAG AA contrast requirement.
- Visible keyboard focus.
- Semantic labels and accessible validation messages.
- Keyboard-operable forms and controls.
- Test with a real screen reader.
- Verify colour contrast against `colour-roles.md`.

### Reliability and usability
- Clear loading, empty, success and error states.
- Prevent duplicate payment submission and duplicate receipt creation.
- Do not lose user-entered form data unnecessarily when a network request fails.
- Use clear dates, currency formatting in Nigerian naira and explicit payment status labels.
- Interface should feel serious, secure and trustworthy. Housing and rent payments are high-consequence activities.

### Maintainability
- Typed interfaces and validated server boundaries.
- Database migrations committed to source control.
- Automated tests for core business rules, access control, payment webhook handling and receipt numbering.
- Structured logs that exclude passwords, tokens, full identity numbers and other unnecessary sensitive data.

## 13. Build plan by task

Retain the original task sequence while applying the updated requirements.

### Task 1: Design system
- Create the design system in Figma.
- Add design tokens to the repository.
- Convert tokens into CSS custom properties.
- Build one representative screen with and without the system to validate the implementation.
- Check colour roles and WCAG contrast in `colour-roles.md`.

### Task 2: Application scaffold
- Scaffold the Next.js application and database connection.
- Build a minimal home screen and marketing page.
- Build the landlord enquiry form and persist submissions.
- Add page metadata and Open Graph tags.
- Configure logs.
- Use a feature branch and pull request workflow.
- Decide local versus hosted PostgreSQL.

### Task 3: Authentication and onboarding foundation
- Build login and signup flows, with invite-code handling.
- Implement landlord and tenant roles.
- Add email verification and server-side validation.
- Include age attestation for tenants.
- Implement rate limiting and direct-request bypass tests.
- Complete an accessibility audit of the authentication flow.

### Task 4: Data model and core services
- Design the schema and resolve the `properties` versus `units` modelling question and `lease_chunks` purpose.
- Create migrations and constraints.
- Implement password/session hashing, Zod validation, rate limiting and breach checks.
- Implement email verification and invitation records/logic.
- Implement guarantor information and signed-document handling.
- Implement payment and payment-attempt records.
- Integrate Paystack test mode if time allows, including verified webhooks and idempotency.
- Implement immutable receipt numbering and generation.
- Implement dashboard calculations, repair requests and status tracking.

### Task 5: Access control, privacy and operational readiness
- Implement sessions, role gating and ownership checks.
- Implement account deletion requests and scheduled processing only after the retention matrix is approved.
- Complete the retention matrix, including tenant, landlord, guarantor, payment and receipt data.
- Test landlord-only routes and direct request bypass.
- Conduct a landlord interview to validate demand and willingness to use traceable rent records.
- Prepare a concise operational handbook.
- Document unresolved legal, payment-provider and production-launch gates.

## 14. Demo script and MVP success criteria

A successful MVP demonstration must show:

1. Landlord A creates a property/unit and lease.
2. Landlord A invites a tenant.
3. Tenant accepts the invitation, verifies email, attests to being 18 or older and submits guarantor details with a signed undertaking.
4. Landlord reviews the guarantor submission and activates the lease.
5. Tenant makes a successful Paystack test-mode rent payment.
6. Server verifies the payment and creates exactly one payment record.
7. The next receipt number in Landlord A's sequence is issued, showing gross rent and the required receipt details.
8. The payment record and landlord dashboard show the lease as paid.
9. The settlement breakdown shows 98.5% landlord allocation and 1.5% platform allocation; gateway costs are borne by Domi-fy and are not charged to the tenant or deducted from the landlord allocation.
10. A second landlord cannot see Landlord A's properties, tenants, leases, payments or repairs, including through a direct request with altered IDs.
11. A tenant who pastes a landlord-only URL or calls a landlord-only endpoint is refused.
12. Tenant reports a repair with a description and photograph; landlord changes its status and tenant sees the update.
13. An unpaid lease becomes outstanding after its due date and overdue after the configured threshold, defaulting to one calendar month; the scheduled job sends the appropriate reminder without duplicates.
14. A failed or unverified payment does not create a receipt or mark the lease paid.
15. A repeated webhook does not duplicate the payment, receipt or split allocation.

MVP test-mode success does not establish readiness for live payment collection or settlement.

## 15. Risks, assumptions and unresolved decisions

### Product and market risks
- The market includes products such as Dwellrs, OurProperty.ng, Shelta, Keejo, Dom App, SmallSmall and Kwaba. Differentiation and market demand remain unvalidated.
- Landlords may resist traceable rental records or platform-mediated collection. Validate this through interviews with Lagos landlords.
- The product must make landlord onboarding and tenant payment simple enough to overcome informal processes and low-bandwidth constraints.

### Legal and regulatory risks
- The Lagos State Tenancy Law 2011 does not apply uniformly across all locations and tenancy types. The original source identifies Apapa, Ikeja GRA, Ikoyi and Victoria Island as excluded areas. Obtain legal confirmation of the precise geographical scope and applicable law before relying on these exclusions.
- The one-calendar-month overdue threshold is a Domi-fy operational classification, not a statutory definition or eviction notice. Statutory notice requirements and possession procedures must remain separate.
- The platform-generated rent receipt should contain the applicable statutory receipt particulars. Whether it is sufficient evidence for a particular tax relief or tax filing must not be claimed without tax/legal confirmation.
- The Nigeria Tax Act 2025 and applicable tax administration requirements must be reviewed for the receipt fields, landlord reporting and platform fee treatment. Do not describe a receipt as FIRS-approved or tax-authority-approved.
- Guarantor undertakings must be properly drafted, signed and retained. Merely collecting guarantor details does not establish an enforceable guarantee.
- The Nigeria Data Protection Act 2023 applies to personal information processed about landlords, tenants and guarantors. Complete a privacy and retention review.
- The regulatory treatment of payment facilitation and split settlement for rental payments is unconfirmed. Obtain advice from Nigerian counsel and written confirmation from the chosen payment provider before live launch.

### Payment and technical assumptions
- Paystack test mode is the MVP provider configuration; live payouts are not available in the MVP.
- Confirm the current Paystack split-settlement capabilities, subaccount requirements, settlement timing, supported channels, webhook signature procedure and fee treatment against official documentation at build time.
- The original source's proposed Paystack local fee of 1.5% + ₦100 capped at ₦2,000 is superseded as a tenant charge. Domi-fy bears gateway processing charges. Do not hard-code that fee formula as a tenant charge.
- The platform's 1.5% fee and landlord's 98.5% allocation are agreed commercial terms. Confirm whether the 1.5% is VAT-inclusive or VAT-exclusive before live launch.
- Large card transactions may fail because of issuer or channel limits; this remains unverified.
- The platform must not hold or control funds outside the provider-supported, legally approved settlement arrangement.

### Decisions still required
1. Confirm whether the 1.5% service fee is VAT-inclusive or VAT-exclusive.
2. Confirm the payment provider's exact split configuration and whether it can ensure gateway costs are borne by Domi-fy without reducing the landlord's 98.5%.
3. Confirm the legally appropriate payment-facilitation structure and any required licence or regulated-provider arrangement.
4. Confirm the precise legal/geographical applicability of Lagos tenancy legislation for supported locations.
5. Approve the advance-renewal reminder timing and overdue reminder cadence.
6. Decide whether the schema requires a separate `properties` table in addition to `units`.
7. Decide whether `lease_chunks` is a required placeholder or should be removed from the MVP schema.
8. Confirm the email delivery provider and secure file-storage provider.
9. Complete the data-retention matrix and privacy notices.
10. Complete Nigerian legal review of the tenancy receipt, guarantor undertaking, landlord terms and tenant terms.

## 16. Decisions applied in this version

- Primary user: landlord.
- Initial market: individual and professional residential landlords in Lagos State.
- Multiple properties, units and tenants per landlord, across locations.
- Tenant age: 18 or older for MVP, recorded through timestamped attestation without storing date of birth.
- Tenant onboarding: landlord invitation, tenant email verification and guarantor submission.
- Guarantor: full required details and signed undertaking; no account or app access.
- Rent: one annual payment per lease; a new rental year is a new lease.
- Instalments: removed from MVP.
- Overdue: one calendar month after due date by default, configurable by landlord; not a statutory notice.
- Payments: Paystack test mode for MVP; live payments and payouts deferred pending approval.
- Platform service fee: 1.5% of successfully collected gross rent.
- Split: 98.5% landlord allocation and 1.5% platform allocation.
- Gateway processing charges: borne by Domi-fy, not passed to tenant and not deducted from landlord's allocation.
- Receipt: immutable, sequential per landlord, issued only after verified payment; displays gross rent and required receipt particulars.
- Repairs: tenant description and photographs; landlord-managed statuses Open, Investigation Ongoing, In Progress and Sorted.
- Notifications: advance renewal, due-date and overdue reminders by email.
- Service charges: deferred.
- Commercial property and office listings: future phase.
- Responsive web app, not native apps.
- Personalisation: landlord display name and unit nicknames, not custom theming.
- Planned stack: Next.js, TypeScript, PostgreSQL, Prisma, hand-built authentication, Argon2id, plain CSS, Inter and Paystack test mode.
- Product name: Domi-fy; trademark clearance and final hyphen styling remain open.

---

**End of PRD.**

## 16. Assessment build slice and proposed resolutions (added 31 October 2026, pending Akinola's approval)

This section does not remove anything above. It says what the coding agent builds first, because the assessment submission closes at midnight on 1 November 2026. Everything else in this PRD stays the product vision and is built later.

### 16.1 Build order for the assessment

- Task 1: design system, tokens converted to CSS custom properties, one screen with and without the system.
- Task 2: scaffold, minimal home screen, marketing page with head tags and Open Graph, the landlord enquiry form writing to the database, logs, branch and pull request. Nothing from sections 5 to 9 is built in Task 2.
- Task 3 onward: only if time remains, and only in the order of section 13.

### 16.2 Proposed resolutions of the open decisions in section 15

1. `lease_chunks` is a required table. The assessment (Task 4) requires a table for "the chunks for your retrieval system, whether or not you build retrieval yet". Keep it as a placeholder for future lease-agreement search. It is unrelated to instalments. Do not build retrieval.
2. `properties` versus `units`: keep `units` only. A unit carries its own address and a `property_name` text field that groups units into a portfolio. This keeps the ten-table ceiling. Revisit only if grouping logic becomes necessary.
3. Guarantor data: for the first build, store full name, phone number, residential address and relationship to the tenant only. Do not store a government-issued ID number or image, occupation or employer until a retention rule and lawful basis exist (SR15, SR16, SR17). The signed undertaking upload is deferred for the same reason.
4. File uploads (guarantor undertaking, repair photographs) need object storage and malware and type checks (SR13). No storage service is selected. Defer uploads until a storage decision is recorded; repair requests are text only in the first build.
5. Overdue threshold and reminder timing: a single constant (one calendar month for overdue, fixed reminder offsets) in the first build. Landlord configuration is deferred.
6. Fee model check: with the 1.5% platform fee and the platform bearing Paystack's fee, the platform margin is positive once annual rent is above roughly N133,000, because Paystack's published local fee is capped at N2,000 while 1.5% keeps growing. VAT treatment is unresolved, so this is indicative only. Confirm in the Paystack documentation that a subaccount percentage charge of 1.5% with the main account as fee bearer produces this split before relying on it.
