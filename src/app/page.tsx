import EnquiryForm from '@/components/EnquiryForm';

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: 'var(--space-max-width)',
        margin: '0 auto',
        padding: 'var(--space-3xl) var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3xl)',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
          textAlign: 'center',
          maxWidth: '48rem',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            alignSelf: 'center',
            fontSize: 'var(--type-c1-size)',
            lineHeight: 'var(--type-c1-line)',
            fontWeight: 'var(--type-c2-weight)',
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-primary-container)',
            padding: 'var(--space-xs) var(--space-md)',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          Residential Property Portfolio Management
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-h2-size)',
            lineHeight: 'var(--type-h2-line)',
            fontWeight: 'var(--type-h2-weight)',
            color: 'var(--color-on-surface)',
          }}
        >
          Predictable rent collections and verifiable tenancy records in Lagos
        </h1>

        <p
          style={{
            fontSize: 'var(--type-b1-size)',
            lineHeight: 'var(--type-b1-line)',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          Domi-fy gives individual and professional landlords a single reliable system to track annual rent, issue immutable sequential receipts, collect verified guarantor undertakings, and handle tenant repairs.
        </p>
      </section>

      {/* Portal Placeholders */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-xl)',
        }}
        aria-label="Portal Access Placeholders"
      >
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--type-h4-size)',
                lineHeight: 'var(--type-h4-line)',
                fontWeight: 'var(--type-h4-weight)',
                color: 'var(--color-on-surface)',
              }}
            >
              Landlord Portal
            </h2>
            <span
              style={{
                fontSize: 'var(--type-c2-size)',
                backgroundColor: 'var(--color-surface-container)',
                color: 'var(--color-on-surface-variant)',
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Scaffold Boundary
            </span>
          </div>
          <p style={{ fontSize: 'var(--type-b3-size)', lineHeight: 'var(--type-b3-line)', color: 'var(--color-on-surface-variant)' }}>
            Monitor collections, overdue lease alerts, immutable payment receipts, and maintenance logs across multiple Lagos properties.
          </p>
          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-sm)' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 'var(--type-bt-3-size)',
                color: 'var(--color-on-surface-variant)',
                cursor: 'not-allowed',
              }}
            >
              &rarr; Authentication boundary (Task 3)
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--type-h4-size)',
                lineHeight: 'var(--type-h4-line)',
                fontWeight: 'var(--type-h4-weight)',
                color: 'var(--color-on-surface)',
              }}
            >
              Tenant Portal
            </h2>
            <span
              style={{
                fontSize: 'var(--type-c2-size)',
                backgroundColor: 'var(--color-surface-container)',
                color: 'var(--color-on-surface-variant)',
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Scaffold Boundary
            </span>
          </div>
          <p style={{ fontSize: 'var(--type-b3-size)', lineHeight: 'var(--type-b3-line)', color: 'var(--color-on-surface-variant)' }}>
            Access verified rental agreements, pay annual rent securely via Paystack test checkout, download receipts, and report repairs.
          </p>
          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-sm)' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 'var(--type-bt-3-size)',
                color: 'var(--color-on-surface-variant)',
                cursor: 'not-allowed',
              }}
            >
              &rarr; Invite-only onboarding (Task 3)
            </span>
          </div>
        </div>
      </section>

      {/* Enquiry Form Shell */}
      <section style={{ maxWidth: '40rem', margin: '0 auto', width: '100%' }}>
        <EnquiryForm />
      </section>
    </div>
  );
}

