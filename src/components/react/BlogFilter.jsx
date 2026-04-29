/**
 * BlogFilter.jsx — client-side article filtering, sorting, and pagination.
 *
 * WHY REACT?
 * Filtering by channel/industry, sorting, and paginating articles requires
 * state that updates on every user interaction. Doing this server-side would
 * need full-page reloads or a search API. A React island gives instant feedback
 * while the page itself is still statically pre-rendered.
 *
 * HYDRATION STRATEGY — client:load:
 * The blog index is a utility page users come to specifically to browse. Having
 * the filter instantly interactive (not deferred) is worth the slightly earlier
 * hydration cost.
 *
 * DATA FLOW:
 *   1. src/pages/blog/index.astro imports ARTICLES, NICHES, INDUSTRIES from data/index.ts
 *   2. It passes them as props to <BlogFilter client:load articles={ARTICLES} …>
 *   3. BlogFilter holds filter/sort/page state and renders the filtered subset
 *   4. No network requests — all data is in the JS bundle (compiled at build time)
 *
 * PROPS:
 *   articles   {Article[]}  — full ARTICLES array from src/data/index.ts
 *   niches     {Niche[]}    — for channel filter chips
 *   industries {Industry[]} — for industry filter chips
 */

import { useState, useMemo } from 'react';

const PAGE_SIZE = 9;

/**
 * @param {{
 *   articles: import('../../data/index').Article[],
 *   niches: import('../../data/index').Niche[],
 *   industries: import('../../data/index').Industry[],
 * }} props
 */
export default function BlogFilter({ articles = [], niches = [], industries = [] }) {
  const [channel,  setChannel]  = useState('');  // niche id or ''
  const [industry, setIndustry] = useState('');  // industry id or ''
  const [sort,     setSort]     = useState('recent'); // 'recent' | 'popular'
  const [page,     setPage]     = useState(1);

  // ── Derived filtered + sorted list ─────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...articles];

    // article.niche is a display name like "SEO", "PPC" — Niche.name not Niche.id.
    // article.industry is a single string like "SaaS" or "All Industries".
    if (channel) {
      const nicheName = niches.find((n) => n.id === channel)?.name ?? channel;
      list = list.filter((a) => a.niche === nicheName);
    }
    if (industry) {
      const indName = industries.find((i) => i.id === industry)?.name ?? industry;
      list = list.filter((a) => a.industry === indName);
    }

    if (sort === 'popular') {
      // readTime is a string like "14 min" — parse the leading number for sorting.
      list.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
    } else {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [articles, channel, industry, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage() { setPage(1); }

  function setChannelAndReset(val)  { setChannel(val);  setIndustry(''); resetPage(); }
  function setIndustryAndReset(val) { setIndustry(val); setChannel('');  resetPage(); }

  return (
    <div className="blog-filter-root">
      {/* ── Filter row ──────────────────────────────────────────────────── */}
      <div className="filter-row">
        {/* Channel chips */}
        <div className="filter-group" role="group" aria-label="Filter by channel">
          <button
            className={`filter-chip${!channel ? ' filter-chip--active' : ''}`}
            onClick={() => setChannelAndReset('')}
            aria-pressed={!channel}
          >
            All channels
          </button>
          {niches.map((n) => (
            <button
              key={n.id}
              className={`filter-chip${channel === n.id ? ' filter-chip--active' : ''}`}
              onClick={() => setChannelAndReset(n.id)}
              aria-pressed={channel === n.id}
            >
              {n.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="filter-sort">
          <label htmlFor="blog-sort" className="sr-only">Sort articles</label>
          <select
            id="blog-sort"
            className="filter-select"
            value={sort}
            onChange={(e) => { setSort(e.target.value); resetPage(); }}
          >
            <option value="recent">Most recent</option>
            <option value="popular">Most popular</option>
          </select>
        </div>
      </div>

      {/* Industry sub-filter (appears after a channel is selected) */}
      {channel && industries.length > 0 && (
        <div className="filter-row filter-row--secondary" role="group" aria-label="Filter by industry">
          <button
            className={`filter-chip filter-chip--sm${!industry ? ' filter-chip--active' : ''}`}
            onClick={() => setIndustryAndReset('')}
            aria-pressed={!industry}
          >
            All industries
          </button>
          {industries.map((i) => (
            <button
              key={i.id}
              className={`filter-chip filter-chip--sm${industry === i.id ? ' filter-chip--active' : ''}`}
              onClick={() => setIndustryAndReset(i.id)}
              aria-pressed={industry === i.id}
            >
              {i.name}
            </button>
          ))}
        </div>
      )}

      {/* ── Results count ───────────────────────────────────────────────── */}
      <p className="filter-results-count" aria-live="polite">
        {filtered.length === 0
          ? 'No articles match your filters.'
          : `Showing ${pageItems.length} of ${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
      </p>

      {/* ── Article grid ────────────────────────────────────────────────── */}
      {pageItems.length > 0 ? (
        <div className="articles-grid">
          {pageItems.map((article) => (
            <ArticleCardInline key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="filter-empty">
          <p>No articles found for these filters. Try broadening your selection.</p>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => { setChannel(''); setIndustry(''); resetPage(); }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Pagination ──────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Article pages">
          <button
            className="pagination-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ← Previous
          </button>

          <span className="pagination-info" aria-current="page">
            Page {page} of {totalPages}
          </span>

          <button
            className="pagination-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}

// ─── Inline ArticleCard ───────────────────────────────────────────────────────
/**
 * Inline card component — used only within BlogFilter so it's in the same
 * React tree and shares the component bundle. For standalone use on static
 * pages, use the Astro component src/components/astro/ArticleCard.astro instead.
 */
function ArticleCardInline({ article }) {
  // article.date is already human-readable like "April 18, 2026"
  const date = article.date;

  return (
    <article className="article-card">
      <div className="article-card-img-wrap">
        <div
          className="article-card-img-placeholder"
          aria-hidden="true"
          style={{ background: `linear-gradient(135deg, oklch(0.88 0.06 250), oklch(0.82 0.10 280))` }}
        />
      </div>

      <div className="article-card-body">
        {article.niche && (
          <span className="tag tag--niche">{article.niche.toUpperCase()}</span>
        )}

        <h3 className="article-card-title">
          <a href={`/blog/${article.slug}`} className="article-card-link">
            {article.title}
          </a>
        </h3>

        <p className="article-card-excerpt">{article.excerpt}</p>

        <div className="article-card-meta">
          <span>{date}</span>
          {article.readTime && (
            <span className="article-card-read-time">{article.readTime} read</span>
          )}
        </div>
      </div>
    </article>
  );
}
