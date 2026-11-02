# Prompt Log

Evidence record of all prompts sent by the user to the agent for Domi-fy, recorded verbatim with timestamps.

---

## Prompt 1
- **Date/Time:** 2026-10-31T21:22:42+01:00
- **Purpose:** Task 1 token conversion script and CSS generation request

```markdown
You are a senior front-end engineer converting design tokens into CSS for a project called Domi-fy.

## Context (carry forward)
- Files to read first: follow-along.md (section 1 only), AGENTS.md, context/design-system.md, task-01-design-system/tokens/design-tokens.json. Treat them as the only source of truth. If two of them disagree, stop and ask.
- Plain CSS custom properties, light mode only. No Tailwind, no frameworks, no npm installs.
- The token file has sections: color (legacy, ignore), font, effect, primitives, colour roles, typography (duplicate of font, ignore).

## Deliverable (this session only)
A zero-dependency Node script (ES module) at task-01-design-system/scripts/build-tokens.mjs that reads the token file and writes task-01-design-system/css/tokens.css. Do nothing else in this session.

## Requirements
1. Primitives become --primitive-* variables holding 6-digit hex (drop the alpha suffix when it is ff). Follow the naming rules in context/design-system.md.
2. Roles listed in context/design-system.md become --color-* variables emitted as var(--primitive-*) references, never as copied hex. Interface code will use role variables only. Primitive variables may be referenced only inside the role definitions.
3. Type styles from the font section become --type-{style}-size, -line, -weight, -spacing, plus --font-family-base. Convert px to rem (divide by 16) for size and line height. Keep letter spacing in px.
4. Effects become --shadow-soft, --shadow-medium, --shadow-hard as comma-separated box-shadow lists.
5. Add a header comment to the CSS: generated file, do not edit by hand, with the source path.
6. The script exits non-zero and prints the names if any alias is unresolved or any variable name collides.

## Process
First produce an implementation plan as an Artifact and wait for my approval. After approving, run the script. After each step output: ✅ [what was completed].

## Allowed
Create the two files above. Run the script.

## Forbidden
Editing the token file or any file outside task-01-design-system/scripts and task-01-design-system/css. Building any screen or UI. Running git commands. Installing packages. Deleting files.

## Stop and ask before
Overwriting any existing file, making an assumption about a name or value not covered by the files above, or retrying a failed step more than twice.

## Verify
Run the script twice and confirm the second output is identical to the first. Print the counts of primitives, roles, type styles and shadows, and the number of unresolved aliases (expected 0).

## Final report
List every file created or changed, every assumption made, and the verification results. Then audit your work against Requirements and Forbidden and state any deviation.
```

---

## Prompt 2
- **Date/Time:** 2026-10-31T21:33:51+01:00
- **Purpose:** Approval of implementation plan artifact

```markdown
Comments on artifact URI: file:///c%3A/Users/PC/.gemini/antigravity/brain/31d0a179-9dc0-4624-b35a-8e05d6d84145/implementation-plan.md

The user has approved this document.
```

---

## Prompt 3
- **Date/Time:** 2026-10-31T21:55:53+01:00
- **Purpose:** Instruction to create and maintain prompt evidence file

```markdown
Create a prompt.md file where you store every prompt I send to you. Make it a part of the evidence folder
```

---

## Prompt 4
- **Date/Time:** 2026-10-31T22:06:51+01:00
- **Purpose:** Request to build initial static landlord dashboard screen without design system (`index.html`)

```markdown
You are a front-end developer building one static screen from scratch.

## Deliverable
One file: index.html in the current workspace folder (inline CSS, no JavaScript, no frameworks, no external files, fonts or images). Work only inside this folder.

## Screen: landlord dashboard (one static page)
Mobile first (375px wide), also correct at 1440px. Sample data only, no real people.
- Top bar: product name "Domi-fy" and landlord name "Adeyemi Properties".
- Page heading: "Portfolio overview".
- Three summary cards: "Expected this year" ₦5,500,000, "Collected" ₦1,800,000, "Outstanding" ₦3,700,000.
- Section heading: "Units".
- Three unit rows, each with unit name, tenant, amount and a status chip:
  Ikeja, Flat 2A | Mrs Okafor | ₦1,800,000 | Paid
  Yaba, Flat 5 | Mr Bello | ₦2,200,000 | Due in 12 days
  Surulere, Flat 1 | Ms Eze | ₦1,500,000 | Overdue 9 days
- A primary button "Invite tenant" and a text link "View receipts".
- A small caption: "Last updated 31 October 2026".

## Styling
Choose the colours, fonts, sizes, spacing and shadows yourself. The look should feel serious, secure and trustworthy, because housing and money are involved. Mobile first.

## Process
First output a short plan as an Artifact and wait for my approval. After approving, build the page. After each step output: ✅ [what was completed].

## Forbidden
Opening or reading any file outside this folder. Installing packages. Running git commands. Adding any section, feature or script not in the screen spec.

## Verify
Use the browser agent to check the page at 375px and 1440px. Fix any overflow or unreadable text.

## Final report
List the file created, the hex colours, fonts and font sizes you chose, and any assumptions.
```

---

## Prompt 5
- **Date/Time:** 2026-10-31T22:10:20+01:00
- **Purpose:** Approval of static dashboard plan artifact

```markdown
Comments on artifact URI: file:///c%3A/Users/PC/.gemini/antigravity/brain/31d0a179-9dc0-4624-b35a-8e05d6d84145/screen-without-system-plan.md

The user has approved this document.
```


---

## Prompt 6
- **Date/Time:** 2026-10-31T22:20:00+01:00 (approx.)
- **Purpose:** Request to build static landlord dashboard with design system tokens

```markdown
You are a front-end developer building one static screen with an existing design system.

## Read first (the only source of truth)
AGENTS.md, context/design-system.md, task-01-design-system/css/tokens.css. If they disagree, stop and ask.

## Deliverable
Two files only, in task-01-design-system/screen/with-system/: index.html and screen.css. index.html links ../../css/tokens.css and screen.css. No JavaScript, frameworks, external files, fonts or images.

## Screen: landlord dashboard (one static page)
Mobile first (375px wide), also correct at 1440px. Sample data only, no real people.
- Top bar: product name "Domi-fy" and landlord name "Adeyemi Properties".
- Page heading: "Portfolio overview".
- Three summary cards: "Expected this year" ₦5,500,000, "Collected" ₦1,800,000, "Outstanding" ₦3,700,000.
- Section heading: "Units".
- Three unit rows, each with unit name, tenant, amount and a status chip:
  Ikeja, Flat 2A | Mrs Okafor | ₦1,800,000 | Paid
  Yaba, Flat 5 | Mr Bello | ₦2,200,000 | Due in 12 days
  Surulere, Flat 1 | Ms Eze | ₦1,500,000 | Overdue 9 days
- A primary button "Invite tenant" and a text link "View receipts".
- A small caption: "Last updated 31 October 2026".

## Rules
1. No hardcoded colours, font sizes, line heights, letter spacing or shadows in either file. Use only variables from tokens.css.
2. Colours: role variables (--color-*) only. Never use --primitive-* variables.
3. Text: use --font-family-base and the --type-* variables (size, line, weight, spacing) of the style that fits each element best.
4. Cards use the --shadow-* variables. Status chips: success for Paid, warning for Due, error for Overdue, each with its matching on-colour role.
5. Spacing and corner radius are not in the token file. Declare a small set of rem values as custom properties at the top of screen.css, use only those, and list them as an assumption.

## Process
First output a short plan as an Artifact and wait for my approval. After approving, build. After each step output: ✅ [what was completed].

## Forbidden
Editing tokens.css or any existing file. Creating files outside task-01-design-system/screen/with-system/. Installing packages. Running git commands.

## Stop and ask before
Using any value not defined in tokens.css, other than the spacing and radius values from rule 5.

## Verify
Use the browser agent to check at 375px and 1440px. Search both files for hex, rgb( and hsl( values and confirm there are none.

## Final report
List the files created, the spacing and radius values, and every assumption. Then audit the work against Rules 1 to 5 and state any deviation.
```

---

## Prompt 7
- **Date/Time:** 2026-10-31T22:22:00+01:00 (approx.)
- **Purpose:** Approval of design-system dashboard plan artifact

```markdown
Comments on artifact URI: file:///c%3A/Users/PC/.gemini/antigravity/brain/31d0a179-9dc0-4624-b35a-8e05d6d84145/screen-with-system-plan.md

The user has approved this document.
```

---

## Prompt 8
- **Date/Time:** 2026-10-31T23:00:00+01:00 (approx.)
- **Purpose:** Question about typography style used for page heading

```markdown
Which typography style did you use for the page heading?
```

---

## Prompt 9
- **Date/Time:** 2026-11-02T05:30:00+01:00 (approx.)
- **Purpose:** Task 2 — Full MVP scaffold specification (10 sections)

```markdown
You are the senior full-stack engineer responsible for scaffolding the Domi-fy MVP. Work inside the repository already open in the IDE.
1. Read before changing anything
1. Inspect the complete repository, including its package manifest, lockfile, existing source tree, configuration, documentation, environment files and current Git status.
2. Read PRD.md and Business-Brief.md in full. Treat PRD.md as the product source of truth. Use the Business Brief for business context.
3. Identify the existing framework, package manager, conventions and any work already completed. Do not replace working code or introduce a new stack simply because you prefer it.
4. If either document is missing, report that fact and proceed only with requirements that are unambiguous from the other available source. If repository code materially conflicts with the PRD, describe the conflict and preserve existing work until the conflict is resolved.
5. Before editing, provide a concise implementation plan listing the files/directories to create or change and any dependencies you propose to add. Then execute the plan without waiting for approval unless a genuine blocking ambiguity or destructive change is involved.
2. Product and architecture constraints
Build the application scaffold only. Do not attempt to complete all product features in this task.

Use the existing repository stack where already established. If the repository is genuinely empty, follow the PRD's planned stack:
- Next.js App Router and TypeScript.
- PostgreSQL as the persistent system of record.
- Prisma for schema, migrations and database access.
- Plain CSS and CSS custom properties. Do not add Tailwind.
- Inter through next/font where compatible with the existing Next.js version.
- Zod for server-boundary validation.
- Hand-built authentication architecture is planned; scaffold the boundaries and data model, but do not claim production-ready authentication unless fully implemented and tested.
- Private S3-compatible object storage. Use MinIO for local development and keep the adapter compatible with Cloudflare R2 for a future production deployment.
- Paystack remains test-mode only. Do not enable live collection, live settlement or real payouts.
Do not invent a different framework, ORM, database, authentication provider, CSS framework or payment provider without first identifying a concrete incompatibility and explaining it.
3. Required database foundation
Create a clean, normalised Prisma schema and initial migration for the core records required by the PRD. At minimum, include:
- User
- Session
- Property
- Unit
- Lease
- Guarantor
- Payment
- PaymentAttempt
- RepairRequest
- StoredFile
- LeaseChunk
- Enquiry
Add a narrowly scoped AuditEvent or equivalent only if needed to support the PRD's audit requirements. Add other supporting models only where there is a clear requirement. Do not impose a ten-table ceiling.
Data modelling rules
- Property and Unit must be separate entities. One property belongs to one landlord and can contain multiple units. Each unit belongs to exactly one property.
- Store the property's physical address and structured location/jurisdiction data once on Property. Do not duplicate the full property address or jurisdiction fields on every Unit.
- Put unit-specific labels, type, description and status on Unit.
- Put rent amount, currency, rental period, due date and lease status on Lease, not on Property or Unit.
- A lease attaches to one unit and one tenant, with the relevant landlord/property relationship enforceable through the data model.
- Store all money as integer kobo. Never use floating-point values for currency.
- Preserve payment and receipt audit integrity. Do not design cascading deletes that erase financial records or legally required evidence.
- Store file metadata and object keys in PostgreSQL. Store file binaries in private object storage.
- LeaseChunk is mandatory even though its future purpose is intentionally undefined. Create only a minimal placeholder model/table with an ID and timestamps, plus a clear schema comment. Do not add embeddings, retrieval, chunking logic, instalment relationships or speculative fields.
- Add sensible primary keys, foreign keys, unique constraints, indexes and timestamps. Avoid redundant columns and duplicated facts.
- Keep jurisdiction rule configuration extensible, but do not hard-code legal advice or unverified location exclusions into executable rules.
4. Backend storage foundation
- PostgreSQL is the structured-data system of record.
- Create a private object-storage abstraction using the S3-compatible API.
- Configure MinIO for local development through environment variables and a local Docker Compose service if the repository does not already have an equivalent setup.
- Make the adapter compatible with Cloudflare R2 configuration for later production use. R2 is the provisional production target; do not add GCS or Azure adapters.
5. Application shell
- A working Next.js project that builds without errors (npm run build exits zero).
- A root layout with the product name, a placeholder navigation header, and a copyright footer.
- A marketing landing page at / with a hero, a brief product description, and a working server-validated enquiry form.
- A health-check route at /api/health that pings the database and returns its status.
- An authenticated landlord portal section (empty placeholder pages behind an auth boundary).
- An authenticated tenant portal section (same pattern).
- Load Inter via next/font where compatible with the installed Next.js version.
- Mobile-first responsive structure.
6. Business-rule boundaries
For each of the following, scaffold only the module boundary, types and a clear code comment explaining the future logic. Do not implement the full rule:
- Paystack split calculation (platform-fee split in integer kobo, with a test-mode guard).
- Rent-reminder schedule (three-month, two-month, one-month, fourteen-day, due-date, seven-day-overdue, one-month-overdue stages).
- Webhook signature verification (HMAC-SHA-512 of the raw body against the Paystack secret).
7. Security from the first line
- Validate every request body, route parameter and query string with a Zod schema on the server before any other logic.
- Money stored as integer kobo; payment and receipt rows are never updated or deleted.
- Secrets in environment variables only. .env is gitignored. Provide .env.example with placeholder names.
- No localStorage for tokens or secrets.
- No accidental cascade deletes on financial records.
- Owner-scoped queries: every data-access helper that touches landlord or tenant data must include an ownership check, not only an authentication check.
8. README and local-development setup
- A clear README.md (rewrite or extend the existing one) with:
  - Project purpose, one-paragraph summary.
  - Prerequisites (Node version, Docker for PostgreSQL and MinIO).
  - Exact commands to install, generate the Prisma client, run migrations (when approved), seed and start.
  - Architecture overview (directories, key modules, database, storage).
  - Contribution and branching conventions if stated in the repo; otherwise omit.
9. Quality gates (run these and report results)
- npm run build must exit zero.
- prisma validate must pass.
- prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script must produce valid SQL.
- Search the source tree for accidental localStorage usage and report any hits.
- Search the source tree for floating-point currency (Float type in Prisma, parseFloat or .toFixed on money values) and report any hits.
10. Reporting
- Deliver a final summary listing:
  - What was inspected and what was already present.
  - Files created or changed and why.
  - Dependencies added and the reason for each.
  - Database entities and their relationships.
  - Local services and exact commands to run them.
  - Every test, lint, type-check, migration-diff and build result.
  - Known gaps (features not built, launch gates not met).
  - Any conflict between the PRD and the assessment prompt, and how it was resolved.
```

---

## Prompt 10
- **Date/Time:** 2026-11-02T06:10:00+01:00 (approx.)
- **Purpose:** Approval of Task 2 scaffold plan artifact

```markdown
Comments on artifact URI: file:///c%3A/Users/PC/.gemini/antigravity/brain/31d0a179-9dc0-4624-b35a-8e05d6d84145/task-02-scaffold-plan.md

The user has approved this document.
```

---

## Prompt 11
- **Date/Time:** 2026-11-02T08:09:00+01:00 (approx.)
- **Purpose:** Instruction to continue the ongoing scaffold task after session break

```markdown
continue the ongoing task
```
