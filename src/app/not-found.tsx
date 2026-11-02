export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: '36rem',
        margin: 'var(--space-4xl) auto',
        padding: 'var(--space-2xl)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-soft)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--type-h4-size)',
          color: 'var(--color-on-surface)',
        }}
      >
        404 - Page Not Found
      </h2>
      <p style={{ fontSize: 'var(--type-b3-size)', color: 'var(--color-on-surface-variant)' }}>
        The requested resource does not exist in the Domi-fy scaffold.
      </p>
      <a
        href="/"
        style={{
          alignSelf: 'center',
          color: 'var(--color-primary)',
          fontSize: 'var(--type-bt-3-size)',
          fontWeight: 'var(--type-b2-weight)',
        }}
      >
        Return to Home
      </a>
    </div>
  );
}

