/**
 * ShareBar.jsx — copy-link + social share buttons for article pages.
 *
 * WHY REACT?
 * The "Copy link" button needs to call navigator.clipboard.writeText() and
 * show a transient "Copied!" confirmation state. This requires useState and
 * a timer cleanup via useEffect. Pure Astro can't do this.
 *
 * HYDRATION STRATEGY — client:idle:
 * The share bar is below the article header and typically not in the initial
 * viewport. Deferring to idle saves hydration CPU for more important islands.
 *
 * PROPS:
 *   url   {string} — canonical URL to share (passed from Astro.url.href)
 *   title {string} — article title for Twitter/LinkedIn prefill
 *
 * USAGE (from [slug].astro):
 *   <ShareBar client:idle url={Astro.url.href} title={article.title} />
 */

import { useState, useEffect } from 'react';

/**
 * @param {{ url: string, title: string }} props
 */
export default function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);

  // Auto-reset "Copied!" label after 2 s
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Fallback for browsers that block clipboard API (e.g. HTTP contexts)
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
    }
  }

  const encoded = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
  };

  const shareLinks = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="share-bar" aria-label="Share this article">
      <span className="share-label">Share:</span>

      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          className="share-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
        >
          {s.icon}
        </a>
      ))}

      <button
        className={`share-btn share-btn--copy${copied ? ' share-btn--copied' : ''}`}
        onClick={copyLink}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        aria-pressed={copied}
      >
        {copied ? (
          /* Checkmark */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          /* Link icon */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
        <span className="share-btn-label">{copied ? 'Copied!' : 'Copy link'}</span>
      </button>
    </div>
  );
}
