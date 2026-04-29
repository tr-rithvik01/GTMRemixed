/**
 * ContactForm.jsx — validated contact form with submission state.
 *
 * WHY REACT?
 * Client-side validation feedback (inline field errors shown on blur),
 * submission state machine (idle → submitting → success/error), and
 * optimistic UI updates all require useState/useEffect.
 *
 * HYDRATION STRATEGY — client:load:
 * Contact page is a destination — users arrive intending to interact.
 * client:load ensures the form is ready immediately without any wait.
 *
 * FORM ENDPOINT:
 * POST to /api/contact — implement as a Cloudflare Worker or Pages Function
 * at functions/api/contact.js. Replace with your preferred backend.
 *
 * VALIDATION:
 * Basic HTML5 constraints (required, type="email") plus JS validation on
 * submit. No external validation library needed for this scope.
 */

import { useState } from 'react';

const INITIAL = { name: '', email: '', company: '', message: '' };
const INITIAL_ERRORS = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [fields, setFields]   = useState(INITIAL);
  const [errors, setErrors]   = useState(INITIAL_ERRORS);
  const [status, setStatus]   = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('');

  function validate() {
    const e = { name: '', email: '', message: '' };
    let valid = true;

    if (!fields.name.trim()) {
      e.name = 'Name is required.';
      valid = false;
    }
    if (!fields.email.trim()) {
      e.email = 'Email is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!fields.message.trim()) {
      e.message = 'Message is required.';
      valid = false;
    } else if (fields.message.trim().length < 20) {
      e.message = 'Message must be at least 20 characters.';
      valid = false;
    }

    setErrors(e);
    return valid;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setStatus('success');
        setFields(INITIAL);
      } else {
        const body = await res.json().catch(() => ({}));
        setErrMsg(body.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrMsg('Network error. Please check your connection.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3>Message sent!</h3>
        <p>Thanks for reaching out. We'll get back to you within 1 business day.</p>
        <button
          className="btn btn-outline"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact GTM Remixed"
    >
      {/* ── Name ──────────────────────────────────────────────────────── */}
      <div className={`form-group${errors.name ? ' form-group--error' : ''}`}>
        <label htmlFor="cf-name" className="form-label">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className="form-input"
          value={fields.name}
          onChange={handleChange}
          required
          autoComplete="name"
          disabled={status === 'submitting'}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
        />
        {errors.name && (
          <p id="cf-name-error" className="form-error" role="alert">{errors.name}</p>
        )}
      </div>

      {/* ── Email ─────────────────────────────────────────────────────── */}
      <div className={`form-group${errors.email ? ' form-group--error' : ''}`}>
        <label htmlFor="cf-email" className="form-label">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className="form-input"
          value={fields.email}
          onChange={handleChange}
          required
          autoComplete="email"
          disabled={status === 'submitting'}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
        />
        {errors.email && (
          <p id="cf-email-error" className="form-error" role="alert">{errors.email}</p>
        )}
      </div>

      {/* ── Company (optional) ────────────────────────────────────────── */}
      <div className="form-group">
        <label htmlFor="cf-company" className="form-label">
          Company <span className="form-label-optional">(optional)</span>
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          className="form-input"
          value={fields.company}
          onChange={handleChange}
          autoComplete="organization"
          disabled={status === 'submitting'}
        />
      </div>

      {/* ── Message ───────────────────────────────────────────────────── */}
      <div className={`form-group${errors.message ? ' form-group--error' : ''}`}>
        <label htmlFor="cf-message" className="form-label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          className="form-textarea"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          placeholder="Tell us about your project or question…"
        />
        {errors.message && (
          <p id="cf-message-error" className="form-error" role="alert">{errors.message}</p>
        )}
      </div>

      {/* ── Submission error ──────────────────────────────────────────── */}
      {status === 'error' && errMsg && (
        <p className="form-error form-error--banner" role="alert" aria-live="assertive">
          {errMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  );
}
