/**
 * ReadingProgress.jsx — scroll-based reading progress indicator.
 *
 * WHY REACT?
 * Requires a scroll event listener and real-time style updates. Cannot be done
 * in static Astro without raw inline <script> tags (which would bypass Astro's
 * module system). As a small island it adds negligible JS weight.
 *
 * HYDRATION STRATEGY — client:load:
 * Must hydrate immediately on article pages so progress tracking starts from
 * the top. client:idle would miss any scrolling that happens before idle fires.
 *
 * HOW IT WORKS:
 * The `#reading-progress` div is rendered in Layout.astro and styled in
 * global.css (position: fixed, top: 0, height: 3px, background: accent color).
 * This component drives its `width` via the CSS custom property --progress.
 * We update the DOM directly (not via React state) to avoid React re-renders
 * on every scroll event — 60 fps updates via direct style mutation.
 *
 * USAGE:
 *   <ReadingProgress client:load />
 *   (placed anywhere in the article page — it works on the shared DOM element)
 */

import { useEffect } from 'react';

export default function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      // Direct DOM mutation is intentional — bypassing React state avoids
      // scheduling a re-render on every scroll frame.
      // The CSS uses `width: 0%` with a transition — set width directly.
      bar.style.width = `${pct}%`;
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // initialise on mount

    return () => window.removeEventListener('scroll', update);
  }, []);

  // This component only drives the existing DOM bar; it renders nothing itself.
  return null;
}
