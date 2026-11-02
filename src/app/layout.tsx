import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Domi-fy | Tenancy & Property Portfolio Management',
  description: 'Digital property portfolio and residential tenancy management platform for landlords and tenants in Lagos, Nigeria.',
  openGraph: {
    title: 'Domi-fy | Tenancy & Property Portfolio Management',
    description: 'Organise residential portfolios, track annual rent, verify receipts, and coordinate maintenance with verifiable audit trails.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Domi-fy',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-outline-variant)',
            padding: 'var(--space-lg) var(--space-xl)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--space-max-width)',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2xl)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--type-h5-size)',
                  lineHeight: 'var(--type-h5-line)',
                  fontWeight: 'var(--type-h5-weight)',
                  letterSpacing: 'var(--type-h5-spacing)',
                  color: 'var(--color-primary)',
                }}
              >
                Domi-fy
              </span>
              <nav style={{ display: 'flex', gap: 'var(--space-lg)' }} aria-label="Portal Navigation">
                <a
                  href="/#enquiry"
                  style={{
                    fontSize: 'var(--type-b3-size)',
                    lineHeight: 'var(--type-b3-line)',
                    fontWeight: 'var(--type-b2-weight)',
                  }}
                >
                  Landlord Enquiry
                </a>
              </nav>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <span
                style={{
                  fontSize: 'var(--type-c1-size)',
                  lineHeight: 'var(--type-c1-line)',
                  fontWeight: 'var(--type-c2-weight)',
                  color: 'var(--color-on-surface-variant)',
                  backgroundColor: 'var(--color-surface-container)',
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                }}
              >
                Lagos MVP
              </span>
            </div>
          </div>
        </header>

        <main style={{ flex: 1 }}>{children}</main>

        <footer
          style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-outline-variant)',
            padding: 'var(--space-2xl) var(--space-xl)',
            marginTop: 'var(--space-4xl)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--space-max-width)',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              fontSize: 'var(--type-c1-size)',
              lineHeight: 'var(--type-c1-line)',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            <p>
              &copy; {new Date().getFullYear()} Domi-fy. Residential property and tenancy management platform. Lagos State, Nigeria.
            </p>
            <p style={{ fontSize: 'var(--type-c3-size)', lineHeight: 'var(--type-c3-line)' }}>
              Compliance Notice: Platform overdue classifications and reminders are internal administrative procedures, not statutory notices to quit. Designed in accordance with Nigeria Data Protection Act 2023 principles.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

