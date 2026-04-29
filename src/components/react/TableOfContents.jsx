/**
 * TableOfContents.jsx — sticky ToC with active-heading tracking.
 *
 * WHY REACT?
 * The ToC highlights the currently visible heading using IntersectionObserver,
 * which requires useEffect and useRef. It also animates the active-item
 * indicator on scroll. Astro components cannot do this without raw JS.
 *
 * HYDRATION STRATEGY — client:load:
 * Active-heading highlighting should start as soon as the page renders.
 * client:idle would cause a visible flash where no heading is highlighted.
 *
 * PROPS:
 *   headings {Array<{ id: string, text: string, depth: number }>}
 *     Passed from the Astro page frontmatter. Built at build time by parsing
 *     the article's markdown headings (depth 2 = <h2>, depth 3 = <h3>).
 *
 * USAGE (from [slug].astro):
 *   import TableOfContents from '../../components/react/TableOfContents';
 *   <TableOfContents client:load headings={headings} />
 */

import { useState, useEffect } from 'react';

/**
 * @param {{ headings: Array<{ id: string, text: string, depth: number }> }} props
 */
export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('');

  // ── IntersectionObserver — track which heading is visible ─────────────────
  useEffect(() => {
    if (headings.length === 0) return;

    const ids = headings.map((h) => h.id).filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Root margin: trigger when heading enters the top 20% of the viewport
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <h3 className="toc-title">On this page</h3>
      <ol className="toc-list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`toc-item toc-item--depth-${h.depth}${activeId === h.id ? ' toc-item--active' : ''}`}
          >
            <a
              href={`#${h.id}`}
              className="toc-link"
              aria-current={activeId === h.id ? 'location' : undefined}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Update URL hash without triggering a navigation
                  history.pushState(null, '', `#${h.id}`);
                  setActiveId(h.id);
                }
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
