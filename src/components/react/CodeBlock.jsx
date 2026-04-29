/**
 * CodeBlock.jsx — syntax-highlighted code block with copy-to-clipboard.
 *
 * WHY REACT?
 * The copy button needs clipboard access (navigator.clipboard) and transient
 * "Copied!" feedback state. The rest (syntax highlight) could be done in Astro
 * via Shiki, but keeping both features together in one island avoids a hybrid
 * approach that would be harder to maintain.
 *
 * HYDRATION STRATEGY — client:visible:
 * Code blocks are often below the fold in long articles. Deferring to
 * client:visible saves parse/execution time on initial load.
 *
 * SYNTAX HIGHLIGHTING:
 * Currently renders code in a <pre><code> block with a data-lang attribute
 * for CSS-based language labels. You can replace the inner rendering with
 * a Shiki or Prism call if you want token-level highlighting — just wrap
 * the highlighted HTML in dangerouslySetInnerHTML (input is build-time static,
 * not user input, so XSS risk is negligible).
 *
 * PROPS:
 *   code     {string}  — the raw code string
 *   lang     {string}  — language label (e.g. 'javascript', 'bash', 'json')
 *   filename {string?} — optional filename shown in the header tab
 *
 * USAGE:
 *   <CodeBlock client:visible code={snippet} lang="javascript" filename="example.js" />
 */

import { useState, useEffect } from 'react';

/**
 * @param {{ code: string, lang?: string, filename?: string }} props
 */
export default function CodeBlock({ code = '', lang = 'text', filename }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
    }
  }

  return (
    <div className="code-block" data-lang={lang}>
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <div className="code-block-header">
        <span className="code-block-lang">
          {filename ?? lang}
        </span>
        <button
          className={`code-block-copy${copied ? ' code-block-copy--done' : ''}`}
          onClick={copyCode}
          aria-label={copied ? 'Code copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* ── Code body ───────────────────────────────────────────────────── */}
      <pre className="code-block-pre">
        <code className={`code-block-code language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
