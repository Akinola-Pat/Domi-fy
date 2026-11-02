'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled scaffold error:', error);
  }, [error]);

  return (
    <div
      style={{
        maxWidth: '36rem',
        margin: 'var(--space-4xl) auto',
        padding: 'var(--space-2xl)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-error)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-soft)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--type-h5-size)',
          color: 'var(--color-error)',
        }}
      >
        An unexpected error occurred
      </h2>
      <p style={{ fontSize: 'var(--type-b3-size)', color: 'var(--color-on-surface-variant)' }}>
        A system failure interrupted this view. Details have been logged securely.
      </p>
      <button
        onClick={() => reset()}
        style={{
          alignSelf: 'flex-start',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
          fontSize: 'var(--type-bt-3-size)',
          padding: 'var(--space-sm) var(--space-lg)',
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}

