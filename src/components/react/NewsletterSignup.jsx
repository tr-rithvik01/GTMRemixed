/**
 * NewsletterSignup.jsx — inline newsletter signup block used mid-page.
 *
 * WHY REACT?
 * Same reason as HeroEmailForm: the loading/success/error states require
 * client-side useState. This variant includes a first-name field and is styled
 * as a standalone card block for use at the bottom of the homepage and article pages.
 *
 * HYDRATION STRATEGY — client:idle:
 * This block appears below the fold. client:idle waits until the browser
 * finishes loading critical JS (NavBar, HeroCanvas) before hydrating this form.
 * Users can still see the pre-rendered HTML placeholder; hydration is invisible.
 *
 * USAGE (from an .astro page):
 *   import NewsletterSignup from '../components/react/NewsletterSignup';
 *   <NewsletterSignup client:idle />
 */

import { useState } from 'react';

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail]         = useState('');
  const [status, setStatus]       = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errMsg, setErrMsg]       = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setErrMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
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

  return (
    <div className="newsletter-box">
      {status === 'success' ? (
        /* ── Success state ──────────────────────────────────────────────── */
        <div className="newsletter-success" role="status" aria-live="polite">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h3 className="newsletter-success-title">Welcome aboard!</h3>
          <p className="newsletter-success-body">
            {firstName ? `Hey ${firstName}, you're` : "You're"} all set.
            Check your inbox to confirm your subscription.
          </p>
        </div>
      ) : (
        /* ── Default / error state ──────────────────────────────────────── */
        <>
          <div className="newsletter-header">
            <h2 className="newsletter-title">GTM strategies in your inbox</h2>
            <p className="newsletter-subtitle">
              Join 12,000+ B2B marketers. One email per week — actionable
              frameworks, tool breakdowns, and case studies.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Subscribe to the GTM Remixed newsletter"
          >
            <div className="newsletter-fields">
              <div className="newsletter-field">
                <label htmlFor="nl-firstname" className="sr-only">First name</label>
                <input
                  id="nl-firstname"
                  type="text"
                  className="form-input"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  disabled={status === 'submitting'}
                />
              </div>

              <div className="newsletter-field newsletter-field--grow">
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  className="form-input"
                  placeholder="Work email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={status === 'submitting'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'nl-error' : undefined}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'submitting' || !email.trim()}
                aria-busy={status === 'submitting'}
              >
                {status === 'submitting' ? 'Subscribing…' : 'Subscribe →'}
              </button>
            </div>

            {status === 'error' && (
              <p
                id="nl-error"
                className="form-error"
                role="alert"
                aria-live="assertive"
              >
                {errMsg}
              </p>
            )}

            <p className="newsletter-legal">
              By subscribing you agree to our{' '}
              <a href="/privacy" className="link">Privacy Policy</a>.
              Unsubscribe at any time.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
