import { PrismaClient, UserRole, UnitStatus, LeaseStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Domi-fy scaffold database with fictional demo records...');

  // Clean existing demo data safely
  await prisma.auditEvent.deleteMany();
  await prisma.storedFile.deleteMany();
  await prisma.paymentAttempt.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.guarantor.deleteMany();
  await prisma.repairRequest.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.session.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Fictional Landlord
  const landlord = await prisma.user.create({
    data: {
      email: 'landlord.fictional@example.com',
      fullName: 'Chief Babatunde Adebayo',
      role: UserRole.LANDLORD,
      passwordHash: 'argon2id_scaffold_placeholder_hash',
      isEmailVerified: true,
    },
  });

  // 2. Create Fictional Property (Address stored on Property once)
  const property = await prisma.property.create({
    data: {
      landlordId: landlord.id,
      propertyName: 'Victoria Garden Court',
      addressLine1: '14 Balarabe Musa Crescent',
      city: 'Victoria Island',
      state: 'Lagos',
      country: 'Nigeria',
      jurisdictionState: 'Lagos',
    },
  });

  // 3. Create Units
  const unit1 = await prisma.unit.create({
    data: {
      propertyId: property.id,
      unitLabel: 'Apartment 3B',
      unitType: '3-Bedroom Residential Flat',
      description: 'Upper floor with balcony and dedicated parking space',
      status: UnitStatus.OCCUPIED,
    },
  });

  await prisma.unit.create({
    data: {
      propertyId: property.id,
      unitLabel: 'Apartment 4A',
      unitType: '2-Bedroom Residential Flat',
      description: 'Corner unit ready for tenancy assignment',
      status: UnitStatus.VACANT,
    },
  });

  // 4. Create Fictional Tenant
  const tenant = await prisma.user.create({
    data: {
      email: 'tenant.fictional@example.com',
      fullName: 'Dr. Folake Adeleke',
      role: UserRole.TENANT,
      passwordHash: 'argon2id_scaffold_placeholder_hash',
      isEmailVerified: true,
    },
  });

  // 5. Create Annual Lease (Integer Kobo: NGN 3,600,000 = 360,000,000 kobo)
  const startDate = new Date('2026-01-01T00:00:00Z');
  const endDate = new Date('2026-12-31T23:59:59Z');
  const dueDate = new Date('2026-01-01T00:00:00Z');

  const lease = await prisma.lease.create({
    data: {
      unitId: unit1.id,
      tenantId: tenant.id,
      rentAmountKobo: 360000000n, // 3.6m Naira in kobo
      currency: 'NGN',
      startDate,
      endDate,
      dueDate,
      leaseStatus: LeaseStatus.ACTIVE,
    },
  });

  // 6. Create Guarantor
  await prisma.guarantor.create({
    data: {
      leaseId: lease.id,
      fullName: 'Mr. Olumide Adeleke',
      phone: '08090000001',
      address: '22 Isaac John Street, Ikeja GRA, Lagos',
      relationship: 'Brother',
    },
  });

  // 7. Create Payment Record (1.5% split calculation)
  // Gross: 3,600,000 NGN = 360,000,000 kobo
  // 1.5% fee = 5,400,000 kobo (54,000 NGN)
  // Landlord share = 354,600,000 kobo (3,546,000 NGN)
  await prisma.payment.create({
    data: {
      leaseId: lease.id,
      grossAmountKobo: 360000000n,
      platformFeeKobo: 5400000n,
      landlordAllocationKobo: 354600000n,
      currency: 'NGN',
      paymentStatus: PaymentStatus.SUCCESSFUL,
      provider: 'PAYSTACK',
      providerReference: 'domify_fictional_ref_001',
      receiptNumber: 1,
    },
  });

  // 8. Create Sample Enquiry
  await prisma.enquiry.create({
    data: {
      fullName: 'Olawale Danladi',
      email: 'olawale.inquiry@example.com',
      phoneNumber: '08020000002',
      message: 'Managing 8 units in Surulere and looking to automate receipts and reminders.',
    },
  });

  console.log('✅ Demo seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failure:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

