/**
 * HeroEmailForm.jsx — email capture form in the hero section.
 *
 * WHY REACT (not .astro)?
 * This form has three UI states — idle, submitting, and success — which require
 * useState. Astro components can't hold client-side state, so any interactivity
 * must live in a React island.
 *
 * HYDRATION STRATEGY — client:load:
 * The form is above the fold and the first interactive element users see.
 * client:load hydrates it immediately so there's no delay when users tab to
 * the email field or submit the form.
 *
 * FORM SUBMISSION:
 * Currently uses a fetch() POST to /api/subscribe — replace the URL with your
 * actual email provider (ConvertKit, Beehiiv, Mailchimp, etc.) or a Cloudflare
 * Worker endpoint. The optimistic "success" state shows immediately on 2xx.
 */

import { useState } from 'react';

export default function HeroEmailForm() {
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setErrMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const body = await res.json().catch(() => ({}));
        setErrMsg(body.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="hero-form-success" role="status" aria-live="polite">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p>
          <strong>You're in!</strong> Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form
      className="hero-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Subscribe to GTM Remixed newsletter"
    >
      <div className="hero-form-row">
        <label htmlFor="hero-email" className="sr-only">
          Email address
        </label>
        <input
          id="hero-email"
          type="email"
          className="hero-input"
          placeholder="Enter your work email…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={status === 'submitting'}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'hero-form-error' : undefined}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'submitting' || !email.trim()}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? 'Joining…' : 'Get free guides →'}
        </button>
      </div>

      {/* Error message — only rendered on error, announced to screen readers via aria-live */}
      {status === 'error' && (
        <p
          id="hero-form-error"
          className="hero-form-error"
          role="alert"
          aria-live="assertive"
        >
          {errMsg}
        </p>
      )}

      <p className="hero-form-footnote">
        No spam. Unsubscribe at any time.
      </p>
    </form>
  );
}
