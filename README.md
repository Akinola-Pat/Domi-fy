# Domi-fy

## 1. What this is

Domi-fy helps landlords in Lagos who rent out several residential units see which tenants have paid, who owes and who is overdue, and gives each tenant a permanent numbered rent receipt. The one thing that must work: a tenant pays the annual rent online and the landlord's dashboard shows it as paid.

This repository holds five tasks as five top-level folders (one repository, five folders).

## 2. Status

Honest status as of 2 November 2026:

- **Finished:**
  - Product requirements document (`context/PRD.md`), agent rules (`AGENTS.md`), design system context (`context/design-system.md`).
  - **Task 1 (Design System):** Tokens converted to CSS custom properties (`task-01-design-system/css/tokens.css`), reference screens with and without the system (`index.html` and `task-01-design-system/screen/with-system/`), and prompt evidence logs.
  - **Task 2 (Application Scaffold):** Next.js App Router application scaffold, normalized Prisma schema (`prisma/schema.prisma`), Docker Compose for local PostgreSQL and MinIO, server-side Zod validation, S3 storage abstraction, Paystack test boundary, database health check endpoint (`/api/health`), and landlord enquiry form (`/api/enquiry`).
- **Not started:** Tasks 3 to 5 (Full authentication, live payments/settlement, scheduled reminders, account deletion & retention matrix).

## 3. The stack, with reasons

- **Next.js with TypeScript:** Single codebase for the front end and back end, eliminating API drift for a compact MVP.
- **PostgreSQL with Prisma:** Relational data fits leases, receipts, and split settlements. Prisma provides schema validation, migrations, and compile-time type safety.
- **Hand-built authentication architecture:** (Scaffolded boundaries, own sessions table, Argon2id planned for Task 3).
- **Plain CSS custom properties:** Derived strictly from `task-01-design-system/css/tokens.css`. No CSS framework (Tailwind, Bootstrap) to ensure strict design system fidelity.
- **Inter font:** Embedded via design system tokens with clean system UI fallbacks.
- **Zod:** Runtime schema validation at all server boundaries (API routes, environment variables).
- **Private S3-Compatible Object Storage:** MinIO for local development, designed for zero-code migration to Cloudflare R2 in production.
- **Paystack (Test Mode Only):** Local payment gateway interface with 1.5% platform fee split calculation in integer kobo.

## 4. Getting started

### Prerequisites
- Node.js `v20+` or `v24+` and npm
- Docker and Docker Compose (for local PostgreSQL & MinIO)

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Configure environment variables
Copy the example environment file and adjust if necessary:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

### Step 3: Start local database and object storage
```bash
docker compose up -d
```
This spins up:
- PostgreSQL on `localhost:5432` (`domify_user` / `domify_password` / `domify_db`)
- MinIO S3 API on `localhost:9000` and Console on `localhost:9001` (`minioadmin` / `minioadminpassword`)

### Step 4: Generate Prisma Client
```bash
npx prisma generate
```

### Step 5: Propose and apply initial database migration
In compliance with `AGENTS.md` Rule 7 ("Never run database migrations. Propose the migration and stop"), review the proposed migration SQL and apply manually when ready:
```bash
npx prisma migrate dev --name init
```

### Step 6: Seed fictional demo data (optional)
```bash
npx tsx prisma/seed.ts
```

### Step 7: Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application shell.
Health check endpoint: [http://localhost:3000/api/health](http://localhost:3000/api/health).

## 5. Environment variables

Names only, never real secrets. See `.env.example`.

- `DATABASE_URL`: Connection string for PostgreSQL.
- `STORAGE_ENDPOINT`: S3 endpoint URL (`http://localhost:9000` for MinIO).
- `STORAGE_REGION`: S3 region (`auto` for MinIO / Cloudflare R2).
- `STORAGE_ACCESS_KEY_ID`: Storage access key.
- `STORAGE_SECRET_ACCESS_KEY`: Storage secret key.
- `STORAGE_BUCKET_NAME`: Private bucket name (`domify-private-documents`).
- `STORAGE_FORCE_PATH_STYLE`: Must be `true` for MinIO local development.
- `PAYSTACK_SECRET_KEY`: Paystack test secret key (`sk_test_*`).
- `PAYSTACK_PUBLIC_KEY`: Paystack test public key (`pk_test_*`).
- `APP_BASE_URL`: Application host URL for callbacks (`http://localhost:3000`).

## 6. Architecture notes

### 6.1 Property, Unit, and Lease Relationship
- **Property:** Represents a distinct physical building or parcel owned by a landlord. Stores the street address and jurisdiction once (e.g. Lagos).
- **Unit:** Represents an individual rentable space (flat, apartment) within a property. Inherits the property address; stores unit labels, status (VACANT/OCCUPIED), and unit descriptions.
- **Lease:** Binds a Unit to a Tenant for a specific annual period. Contains rent amount in integer kobo, due date, and status. Financial and legal records use `onDelete: Restrict` to prevent accidental cascading deletion.

### 6.2 PostgreSQL and Object Storage Split
- **PostgreSQL:** Stores structured relational records, user credentials hashes, transaction history, immutable receipt numbers, and file metadata (`StoredFile` entity with object keys and content types).
- **Private Object Storage:** Stores binary documents (signed guarantor undertakings, maintenance photographs). Buckets are private; client access is mediated through short-lived presigned URLs generated server-side.

### 6.3 LeaseChunk Placeholder
`LeaseChunk` is a mandatory schema placeholder required by the assessment specification. Its future purpose is intentionally undefined in this initial MVP slice. It contains only an ID and timestamps with zero speculative fields or chunking logic.

## 7. Production launch gates

The following items are mandatory launch gates before any production deployment:

1. **Payment Provider & Legal Split Approval:** Paystack split settlement model, fee deduction rules (1.5% platform fee, Domi-fy bearing gateway fees), and subaccount setups must receive written confirmation from Paystack and Nigerian legal counsel.
2. **Data Protection Compliance (NDPA 2023 & GAID 2025):** Legal review of personal data processing for landlords, tenants, and non-user third-party guarantors. Completion of the Data Retention Matrix and Privacy Notice.
3. **Cloudflare R2 Cross-Border Assessment:** Vendor security due diligence and cross-border data transfer impact assessment before migrating from local MinIO to R2.
4. **Tenancy Document Review:** Legal verification of rent receipt particulars under Lagos Tenancy Law 2011 and enforceability of electronic guarantor undertakings.
5. **Production Infrastructure:** Hosted PostgreSQL with automated backups, verified transactional email provider (Postmark/Resend), and SSL/TLS termination.

## 8. What this deliberately does not do

- No public listings or property marketplace: Landlords invite their existing tenants.
- No instalments: Exactly one annual rent payment per lease.
- No service charges: Separate accounting and statutory receipt requirements are deferred.
- No tenants under 18: Capacity to contract requires separate parental/guardian design.
- No commercial or corporate tenants: Excludes withholding tax complexities.
- No native mobile apps: Mobile-first responsive web application only.
- Test-mode payments only: Zero live money moves.
