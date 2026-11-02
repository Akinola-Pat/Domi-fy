'use client';

import { useState } from 'react';

interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export default function EnquiryForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to submit enquiry. Please review your details and try again.',
        });
      } else {
        setStatusMessage({
          type: 'success',
          text: 'Thank you for your enquiry. Your submission has been recorded successfully.',
        });
        setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Network error communicating with the server. Please check your connection and retry.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="enquiry"
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2xl)',
        boxShadow: 'var(--shadow-soft)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-h5-size)',
            lineHeight: 'var(--type-h5-line)',
            fontWeight: 'var(--type-h5-weight)',
            letterSpacing: 'var(--type-h5-spacing)',
            color: 'var(--color-on-surface)',
            marginBottom: 'var(--space-xs)',
          }}
        >
          Landlord Interest & Portfolio Onboarding
        </h3>
        <p
          style={{
            fontSize: 'var(--type-c1-size)',
            lineHeight: 'var(--type-c1-line)',
            color: 'var(--color-on-surface-variant)',
          }}
        >
          Submit your portfolio details to request early onboarding for residential properties in Lagos.
        </p>
      </div>

      {statusMessage && (
        <div
          role="alert"
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid',
            borderColor:
              statusMessage.type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
            backgroundColor:
              statusMessage.type === 'success'
                ? 'var(--color-surface)'
                : 'var(--color-error-container)',
            color:
              statusMessage.type === 'success'
                ? 'var(--color-success)'
                : 'var(--color-on-error-container)',
            fontSize: 'var(--type-b3-size)',
            lineHeight: 'var(--type-b3-line)',
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <label
          htmlFor="fullName"
          style={{
            fontSize: 'var(--type-b3-size)',
            lineHeight: 'var(--type-b3-line)',
            fontWeight: 'var(--type-b2-weight)',
            color: 'var(--color-on-surface)',
          }}
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="e.g. Babatunde Adeyemi"
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-b2-size)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-outline-variant)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <label
          htmlFor="email"
          style={{
            fontSize: 'var(--type-b3-size)',
            lineHeight: 'var(--type-b3-line)',
            fontWeight: 'var(--type-b2-weight)',
            color: 'var(--color-on-surface)',
          }}
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. landlord@example.com"
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-b2-size)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-outline-variant)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <label
          htmlFor="phoneNumber"
          style={{
            fontSize: 'var(--type-b3-size)',
            lineHeight: 'var(--type-b3-line)',
            fontWeight: 'var(--type-b2-weight)',
            color: 'var(--color-on-surface)',
          }}
        >
          Phone Number (Optional)
        </label>
        <input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="e.g. 08012345678"
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-b2-size)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-outline-variant)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        <label
          htmlFor="message"
          style={{
            fontSize: 'var(--type-b3-size)',
            lineHeight: 'var(--type-b3-line)',
            fontWeight: 'var(--type-b2-weight)',
            color: 'var(--color-on-surface)',
          }}
        >
          Portfolio Details / Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe property locations, number of residential units, and current management workflow..."
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--type-b2-size)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-outline-variant)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
            resize: 'vertical',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--type-bt-2-size)',
          lineHeight: 'var(--type-bt-2-line)',
          fontWeight: 'var(--type-bt-2-weight)',
          letterSpacing: 'var(--type-bt-2-spacing)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
          border: '1px solid transparent',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-md) var(--space-2xl)',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          marginTop: 'var(--space-sm)',
        }}
      >
        {loading ? 'Submitting Enquiry...' : 'Submit Portfolio Enquiry'}
      </button>
    </form>
  );
}

