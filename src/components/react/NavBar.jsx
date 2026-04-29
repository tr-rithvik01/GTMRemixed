import { useState, useEffect, useRef, useCallback } from 'react';
import { NICHES, INDUSTRIES, ARTICLES } from '../../data/index';

// ── Navigation helper ─────────────────────────────────────────────────────────

function nav(type, data) {
  const routes = {
    home: '/', blog: '/blog', resources: '/resources',
    contact: '/contact', about: '/about',
    niche: data?.id ? `/niches/${data.id}` : '/niches',
    industry: data?.id ? `/industries/${data.id}` : '/industries',
    article: data?.slug ? `/blog/${data.slug}` : '/blog',
  };
  window.location.href = routes[type] ?? '/';
}

// ── Channel SVG Illustrations ─────────────────────────────────────────────────

function ChannelImage({ niche }) {
  const imgs = {
    seo: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.93 0.04 160)" />
        <rect x="20" y="24" width="140" height="22" rx="11" fill="white" stroke="oklch(0.70 0.06 160)" strokeWidth="1.5" />
        <circle cx="37" cy="35" r="7" fill="none" stroke="oklch(0.45 0.10 160)" strokeWidth="1.8" />
        <line x1="42" y1="40" x2="46" y2="44" stroke="oklch(0.45 0.10 160)" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="170" y="48" width="14" height="36" rx="3" fill="oklch(0.55 0.12 160)" opacity="0.5" />
        <rect x="188" y="34" width="14" height="50" rx="3" fill="oklch(0.42 0.10 160)" opacity="0.75" />
        <rect x="206" y="22" width="14" height="62" rx="3" fill="oklch(0.38 0.10 160)" />
        <rect x="20" y="54" width="120" height="5" rx="2.5" fill="oklch(0.38 0.10 160)" opacity="0.9" />
        <rect x="20" y="63" width="90" height="4" rx="2" fill="oklch(0.70 0.06 160)" opacity="0.7" />
        <rect x="20" y="73" width="105" height="4" rx="2" fill="oklch(0.70 0.06 160)" opacity="0.5" />
        <rect x="20" y="83" width="75" height="4" rx="2" fill="oklch(0.70 0.06 160)" opacity="0.35" />
      </svg>
    ),
    ppc: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.92 0.03 250)" />
        <rect x="20" y="18" width="26" height="14" rx="3" fill="oklch(0.35 0.09 250)" />
        <text x="33" y="28" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="8" fontWeight="700">Ad</text>
        <polyline points="20,75 55,60 90,65 125,42 160,50 195,28 220,30" fill="none" stroke="oklch(0.35 0.09 250)" strokeWidth="2.5" strokeLinejoin="round" />
        {[[55, 60], [125, 42], [195, 28]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="oklch(0.35 0.09 250)" strokeWidth="2" />
        ))}
        <rect x="155" y="18" width="68" height="20" rx="4" fill="white" stroke="oklch(0.70 0.05 250)" strokeWidth="1.2" />
        <text x="189" y="31" textAnchor="middle" fill="oklch(0.35 0.09 250)" fontFamily="monospace" fontSize="9" fontWeight="700">$4.20 CPC</text>
      </svg>
    ),
    social: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.93 0.03 290)" />
        <line x1="80" y1="50" x2="120" y2="32" stroke="oklch(0.55 0.10 290)" strokeWidth="1.5" opacity="0.6" />
        <line x1="80" y1="50" x2="140" y2="65" stroke="oklch(0.55 0.10 290)" strokeWidth="1.5" opacity="0.6" />
        <line x1="120" y1="32" x2="160" y2="22" stroke="oklch(0.55 0.10 290)" strokeWidth="1.5" opacity="0.6" />
        <line x1="120" y1="32" x2="140" y2="65" stroke="oklch(0.55 0.10 290)" strokeWidth="1.5" opacity="0.4" />
        <line x1="140" y1="65" x2="175" y2="72" stroke="oklch(0.55 0.10 290)" strokeWidth="1.5" opacity="0.5" />
        <line x1="160" y1="22" x2="200" y2="38" stroke="oklch(0.55 0.10 290)" strokeWidth="1.5" opacity="0.5" />
        {[[80, 50, 12], [120, 32, 9], [140, 65, 10], [160, 22, 8], [200, 38, 7], [175, 72, 7]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="oklch(0.40 0.12 290)" opacity={1 - i * 0.1} />
        ))}
        <rect x="18" y="18" width="46" height="16" rx="4" fill="white" stroke="oklch(0.75 0.05 290)" strokeWidth="1" />
        <text x="41" y="29" textAnchor="middle" fill="oklch(0.40 0.12 290)" fontFamily="monospace" fontSize="8" fontWeight="700">↑ 12.4K</text>
        <rect x="18" y="40" width="46" height="16" rx="4" fill="white" stroke="oklch(0.75 0.05 290)" strokeWidth="1" />
        <text x="41" y="51" textAnchor="middle" fill="oklch(0.40 0.12 290)" fontFamily="monospace" fontSize="8" fontWeight="700">4.8% ER</text>
      </svg>
    ),
    local: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.94 0.03 50)" />
        <line x1="0" y1="33" x2="240" y2="33" stroke="oklch(0.80 0.05 50)" strokeWidth="0.8" opacity="0.6" />
        <line x1="0" y1="66" x2="240" y2="66" stroke="oklch(0.80 0.05 50)" strokeWidth="0.8" opacity="0.6" />
        <line x1="80" y1="0" x2="80" y2="100" stroke="oklch(0.80 0.05 50)" strokeWidth="0.8" opacity="0.6" />
        <line x1="160" y1="0" x2="160" y2="100" stroke="oklch(0.80 0.05 50)" strokeWidth="0.8" opacity="0.6" />
        <ellipse cx="120" cy="88" rx="12" ry="4" fill="oklch(0.42 0.10 50)" opacity="0.2" />
        <path d="M120 20 C108 20 100 30 100 40 C100 55 120 72 120 72 C120 72 140 55 140 40 C140 30 132 20 120 20Z" fill="oklch(0.42 0.10 50)" />
        <circle cx="120" cy="40" r="8" fill="white" />
        {[60, 75, 90, 105, 120].map((x, i) => (
          <text key={i} x={x} y="16" fill="oklch(0.60 0.14 55)" fontSize="10">★</text>
        ))}
      </svg>
    ),
    analytics: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.92 0.03 220)" />
        <path d="M30 15 L90 15 L78 38 L42 38Z" fill="oklch(0.40 0.12 220)" opacity="0.9" />
        <path d="M42 42 L78 42 L70 60 L50 60Z" fill="oklch(0.40 0.12 220)" opacity="0.7" />
        <path d="M50 64 L70 64 L64 80 L56 80Z" fill="oklch(0.40 0.12 220)" opacity="0.5" />
        <text x="100" y="30" fill="oklch(0.40 0.12 220)" fontFamily="monospace" fontSize="9">100%  Visits</text>
        <text x="100" y="52" fill="oklch(0.40 0.12 220)" fontFamily="monospace" fontSize="9">42%   Engaged</text>
        <text x="100" y="74" fill="oklch(0.40 0.12 220)" fontFamily="monospace" fontSize="9">11%   Converted</text>
        <rect x="168" y="14" width="56" height="22" rx="5" fill="oklch(0.40 0.12 220)" />
        <text x="196" y="22" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="7" fontWeight="700">ROAS</text>
        <text x="196" y="32" textAnchor="middle" fill="oklch(0.82 0.06 220)" fontFamily="monospace" fontSize="10" fontWeight="700">4.2×</text>
      </svg>
    ),
    content: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.94 0.02 30)" />
        <rect x="28" y="12" width="72" height="78" rx="5" fill="white" stroke="oklch(0.80 0.05 30)" strokeWidth="1.2" />
        <rect x="36" y="22" width="56" height="5" rx="2.5" fill="oklch(0.38 0.08 30)" opacity="0.9" />
        <rect x="36" y="32" width="48" height="3.5" rx="1.75" fill="oklch(0.70 0.05 30)" opacity="0.8" />
        <rect x="36" y="40" width="52" height="3.5" rx="1.75" fill="oklch(0.70 0.05 30)" opacity="0.6" />
        <rect x="36" y="48" width="44" height="3.5" rx="1.75" fill="oklch(0.70 0.05 30)" opacity="0.5" />
        <rect x="36" y="58" width="56" height="3.5" rx="1.75" fill="oklch(0.70 0.05 30)" opacity="0.4" />
        <polyline points="115,82 138,68 158,58 178,45 198,35 218,20" fill="none" stroke="oklch(0.38 0.08 30)" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="115" y1="16" x2="115" y2="84" stroke="oklch(0.78 0.04 30)" strokeWidth="1" />
        <line x1="115" y1="84" x2="220" y2="84" stroke="oklch(0.78 0.04 30)" strokeWidth="1" />
        <text x="165" y="14" textAnchor="middle" fill="oklch(0.38 0.08 30)" fontFamily="monospace" fontSize="8" fontWeight="700">Organic Traffic</text>
      </svg>
    ),
    email: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.93 0.03 195)" />
        <rect x="30" y="25" width="85" height="55" rx="5" fill="white" stroke="oklch(0.60 0.08 195)" strokeWidth="1.5" />
        <polyline points="30,25 72.5,55 115,25" fill="none" stroke="oklch(0.60 0.08 195)" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="175" cy="52" r="28" fill="none" stroke="oklch(0.86 0.04 195)" strokeWidth="8" />
        <circle cx="175" cy="52" r="28" fill="none" stroke="oklch(0.40 0.10 195)" strokeWidth="8"
          strokeDasharray="105 71" strokeDashoffset="35" strokeLinecap="round" />
        <text x="175" y="49" textAnchor="middle" fill="oklch(0.30 0.09 195)" fontFamily="monospace" fontSize="11" fontWeight="700">42%</text>
        <text x="175" y="62" textAnchor="middle" fill="oklch(0.55 0.07 195)" fontFamily="monospace" fontSize="7">Open rate</text>
        <rect x="44" y="50" width="45" height="4" rx="2" fill="oklch(0.78 0.05 195)" opacity="0.7" />
        <rect x="44" y="59" width="35" height="4" rx="2" fill="oklch(0.78 0.05 195)" opacity="0.5" />
      </svg>
    ),
    cro: (
      <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="240" height="100" fill="oklch(0.94 0.03 55)" />
        <rect x="20" y="20" width="80" height="62" rx="6" fill="white" stroke="oklch(0.72 0.07 55)" strokeWidth="1.5" />
        <rect x="20" y="20" width="80" height="18" rx="6" fill="oklch(0.72 0.07 55)" />
        <rect x="20" y="26" width="80" height="12" rx="0" fill="oklch(0.72 0.07 55)" />
        <text x="60" y="32" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="9" fontWeight="700">Variant A</text>
        <rect x="30" y="58" width="60" height="16" rx="4" fill="oklch(0.42 0.12 55)" />
        <text x="60" y="70" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="8" fontWeight="700">Sign Up →</text>
        <text x="114" y="55" textAnchor="middle" fill="oklch(0.55 0.10 55)" fontSize="16" fontWeight="700">↔</text>
        <rect x="136" y="20" width="80" height="62" rx="6" fill="white" stroke="oklch(0.42 0.12 55)" strokeWidth="2" />
        <rect x="136" y="20" width="80" height="18" rx="6" fill="oklch(0.42 0.12 55)" />
        <rect x="136" y="26" width="80" height="12" rx="0" fill="oklch(0.42 0.12 55)" />
        <text x="176" y="32" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="9" fontWeight="700">Variant B ✓</text>
        <rect x="146" y="58" width="60" height="16" rx="4" fill="oklch(0.42 0.12 55)" />
        <text x="176" y="70" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="8" fontWeight="700">Try Free →</text>
        <rect x="148" y="6" width="56" height="12" rx="4" fill="oklch(0.42 0.12 55)" />
        <text x="176" y="15" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="8" fontWeight="700">+31% CVR</text>
      </svg>
    ),
  };
  return imgs[niche] || (
    <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="240" height="100" fill="var(--bg-3)" />
    </svg>
  );
}

// ── GTMGods podcast data ──────────────────────────────────────────────────────

const GTMGODS_EXPERTS = [
  { id: 1, initials: 'SC', name: 'Sarah Chen', title: 'VP Growth · Shopify', ep: 'EP 41', episode: 'How We 3×\'d Organic Traffic in 8 Months', gain: 'The exact content cadence and internal linking system that compounded organic growth without increasing headcount.', duration: '54 min', color: 'oklch(0.38 0.10 160)', bg: 'oklch(0.93 0.04 160)' },
  { id: 2, initials: 'MW', name: 'Marcus Webb', title: 'CMO · Rippling', ep: 'EP 38', episode: 'Rebuilding Paid Acquisition from Scratch', gain: 'Why they paused all PPC spend for 6 weeks — and what the rebuild revealed about unit economics and channel fit.', duration: '47 min', color: 'oklch(0.35 0.09 250)', bg: 'oklch(0.92 0.03 250)' },
  { id: 3, initials: 'PN', name: 'Priya Nair', title: 'Head of SEO · Zillow', ep: 'EP 35', episode: 'Local SEO at 100M+ Page Scale', gain: 'Automating local content and GBP signals across millions of listings without triggering quality penalties.', duration: '61 min', color: 'oklch(0.42 0.10 50)', bg: 'oklch(0.94 0.03 50)' },
  { id: 4, initials: 'JO', name: 'James Okafor', title: 'Growth Lead · Oscar Health', ep: 'EP 33', episode: 'Marketing in a Compliance-Heavy Industry', gain: 'Building aggressive growth programs within strict regulatory constraints — the frameworks that made it possible.', duration: '38 min', color: 'oklch(0.40 0.10 195)', bg: 'oklch(0.93 0.03 195)' },
  { id: 5, initials: 'EV', name: 'Elena Vasquez', title: 'CRO Director · Klarna', ep: 'EP 29', episode: 'The Psychology Behind Our Checkout Redesign', gain: 'The behavioral triggers that reduced cart abandonment by 28% — and why most CRO teams are optimizing the wrong step.', duration: '52 min', color: 'oklch(0.40 0.12 220)', bg: 'oklch(0.92 0.03 220)' },
  { id: 6, initials: 'TA', name: 'Tom Ashford', title: 'Dir. Marketing · Marriott', ep: 'EP 26', episode: 'Building Loyalty in the Post-OTA World', gain: 'How direct booking campaigns outperformed OTA traffic 4× — and the email program that kept guests from going back.', duration: '45 min', color: 'oklch(0.42 0.12 55)', bg: 'oklch(0.94 0.03 55)' },
  { id: 7, initials: 'RK', name: 'Raj Kapoor', title: 'CMO · Flexport', ep: 'EP 22', episode: 'Demand Gen in B2B Logistics: What Actually Moves Deals', gain: 'Why content marketing outperformed events and paid for enterprise pipeline — with the attribution data to prove it.', duration: '43 min', color: 'oklch(0.38 0.08 30)', bg: 'oklch(0.94 0.02 30)' },
];

// ── Industry colors ───────────────────────────────────────────────────────────

const INDUSTRY_COLORS = {
  saas:         { bg: 'oklch(0.92 0.03 250)', color: 'oklch(0.35 0.09 250)' },
  ecommerce:    { bg: 'oklch(0.93 0.04 160)', color: 'oklch(0.38 0.10 160)' },
  realestate:   { bg: 'oklch(0.94 0.03 50)',  color: 'oklch(0.42 0.10 50)'  },
  healthcare:   { bg: 'oklch(0.93 0.03 195)', color: 'oklch(0.40 0.10 195)' },
  fintech:      { bg: 'oklch(0.92 0.03 220)', color: 'oklch(0.40 0.12 220)' },
  logistics:    { bg: 'oklch(0.94 0.02 30)',  color: 'oklch(0.38 0.08 30)'  },
  professional: { bg: 'oklch(0.93 0.03 290)', color: 'oklch(0.40 0.12 290)' },
  hospitality:  { bg: 'oklch(0.94 0.03 55)',  color: 'oklch(0.42 0.12 55)'  },
};

const INDUSTRY_ICONS = {
  saas: '⚙️', ecommerce: '🛒', realestate: '🏠', healthcare: '🩺',
  fintech: '💳', logistics: '🚚', professional: '💼', hospitality: '🏨',
};

const NICHE_ID_MAP = {
  'SEO': 'seo', 'PPC': 'ppc', 'Social Media': 'social', 'Local SEO': 'local',
  'Analytics': 'analytics', 'Content Marketing': 'content', 'Email Marketing': 'email', 'CRO': 'cro',
};

// ── Search Overlay ────────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef(null);

  const results = query.length > 1
    ? ARTICLES.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.niche.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); setFocused(0); }
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setFocused(f => Math.min(f + 1, results.length - 1));
      if (e.key === 'ArrowUp') setFocused(f => Math.max(f - 1, 0));
      if (e.key === 'Enter' && results[focused]) {
        window.location.href = `/blog/${results[focused].slug}`;
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results.length, focused, onClose]);

  const trending = ARTICLES.slice(0, 3);

  return (
    <div
      className={`search-overlay${open ? ' open' : ''}`}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true" aria-label="Search"
    >
      <div className="search-box">
        <div className="search-input-row">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="var(--text-3)" strokeWidth="1.6" />
            <path d="M13 13l3 3" stroke="var(--text-3)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search guides, niches, topics..."
            value={query}
            onChange={e => { setQuery(e.target.value); setFocused(0); }}
            aria-label="Search"
          />
          {query && (
            <button className="icon-btn" onClick={() => setQuery('')} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="var(--text-3)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ fontSize: 12 }}>Esc</button>
        </div>

        {query.length > 1 ? (
          <div className="search-results" role="listbox">
            {results.length === 0
              ? <div className="search-empty">No results for "<strong>{query}</strong>"</div>
              : results.map((a, i) => (
                <div
                  key={a.id}
                  className={`search-result-item${i === focused ? ' focused' : ''}`}
                  role="option" aria-selected={i === focused}
                  onClick={() => { window.location.href = `/blog/${a.slug}`; onClose(); }}
                >
                  <span className="search-result-tag" style={{ background: 'var(--bg-3)', color: 'var(--text-2)' }}>{a.niche}</span>
                  <div>
                    <div className="search-result-title">{a.title}</div>
                    <div className="search-result-meta">{a.author.name} · {a.readTime} read</div>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="search-results">
            <div style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Trending</div>
            {trending.map(a => (
              <div key={a.id} className="search-result-item" onClick={() => { window.location.href = `/blog/${a.slug}`; onClose(); }}>
                <span className="search-result-tag" style={{ background: 'var(--bg-3)', color: 'var(--text-3)' }}>{a.niche}</span>
                <div>
                  <div className="search-result-title">{a.title}</div>
                  <div className="search-result-meta">{a.author.name} · {a.readTime} read</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="search-footer">
          <span><kbd className="search-kbd">↑↓</kbd> navigate</span>
          <span><kbd className="search-kbd">Enter</kbd> select</span>
          <span><kbd className="search-kbd">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

// ── Channels mega menu ────────────────────────────────────────────────────────

function NichesMegaMenu({ open, onClose, stayOpen, closeMenu }) {
  const featured = ARTICLES[0];
  return (
    <div className={`mega-menu-fw${open ? ' open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu} role="menu">
      <div className="mega-inner">
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div className="mega-section-label">Marketing Channels</div>
            <div className="channel-grid">
              {NICHES.map(n => (
                <a key={n.id} href={`/niches/${n.id}`} className="channel-card" onClick={onClose}>
                  <div className="channel-card-img">
                    <ChannelImage niche={n.id} />
                  </div>
                  <div className="channel-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="channel-card-name">{n.name}</div>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 8, fontWeight: 800, color: 'white', letterSpacing: '0.02em' }}>{n.abbr}</span>
                      </div>
                    </div>
                    <div className="channel-card-count">{n.count} guides</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mega-vdivider" aria-hidden="true" />

          <div style={{ width: 240, flexShrink: 0 }}>
            <div className="mega-section-label">Featured Guide</div>
            <a href={`/blog/${featured.slug}`} onClick={onClose}
              style={{ display: 'block', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', textDecoration: 'none', background: 'var(--bg)', transition: 'box-shadow var(--tr)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ height: 130, overflow: 'hidden' }}>
                <ChannelImage niche={NICHE_ID_MAP[featured.niche] || 'seo'} />
              </div>
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>{featured.niche} · Featured</div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.35, color: 'var(--text-1)' }}>{featured.title}</div>
                <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-3)' }}>{featured.readTime} read · {featured.author.name}</div>
              </div>
            </a>

            <div style={{ marginTop: 16 }}>
              <div className="mega-section-label" style={{ marginBottom: 10 }}>Quick Links</div>
              {[{ href: '/blog', label: 'All Guides →' }, { href: '/resources', label: 'Tools & Templates →' }].map(({ href, label }) => (
                <a key={href} href={href} onClick={onClose}
                  style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', padding: '6px 0', borderBottom: '1px solid var(--border)', transition: 'color var(--tr)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Industries mega menu ──────────────────────────────────────────────────────

function IndustriesMegaMenu({ open, onClose, stayOpen, closeMenu }) {
  const spotlightArticles = ARTICLES.filter(a => a.industry !== 'All Industries').slice(0, 3);
  const scrollRef = useRef(null);
  const scrollBy = (dir) => { if (scrollRef.current) scrollRef.current.scrollLeft += dir * 220; };

  return (
    <div className={`mega-menu-fw${open ? ' open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu} role="menu">
      <div className="mega-inner">
        <div style={{ display: 'flex', gap: 32 }}>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="mega-section-label">Browse by Industry</div>
            <div className="industries-grid">
              {INDUSTRIES.map(ind => {
                const col = INDUSTRY_COLORS[ind.id] || { bg: 'var(--bg-2)', color: 'var(--text-2)' };
                return (
                  <a key={ind.id} href={`/industries/${ind.id}`} className="industry-row" onClick={onClose}>
                    <div className="industry-icon-box" style={{ background: col.bg }}>
                      <span>{INDUSTRY_ICONS[ind.id] || '🏢'}</span>
                    </div>
                    <div>
                      <div className="industry-row-name">{ind.name}</div>
                      <div className="industry-row-count">{ind.count} guides</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* GTMGods podcast carousel */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="3" fill="white" />
                      <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M8 14a6 6 0 0 1-6-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>GTMGods — Experts in Industry</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>Conversations with practitioners who built the playbooks</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  {[-1, 1].map(dir => (
                    <button key={dir} onClick={() => scrollBy(dir)}
                      style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', transition: 'all var(--tr)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--border-s)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d={dir < 0 ? 'M6 2L2 5l4 3' : 'M4 2l4 3-4 3'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div ref={scrollRef} style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none', paddingBottom: 2 }}>
                {GTMGODS_EXPERTS.map(expert => (
                  <a key={expert.id} href="/resources"
                    style={{ flexShrink: 0, width: 210, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'hidden', cursor: 'pointer', transition: 'all var(--tr)', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--sh-sm)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--border-s)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    onClick={onClose}
                  >
                    <div style={{ padding: '10px 12px', background: expert.bg, display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: expert.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(255,255,255,0.35)' }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>{expert.initials}</span>
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>{expert.name}</div>
                        <div style={{ fontSize: 10.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{expert.title}</div>
                      </div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: expert.color, background: 'white', padding: '2px 5px', borderRadius: 3, flexShrink: 0 }}>{expert.ep}</div>
                    </div>
                    <div style={{ padding: '10px 12px 12px' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3, marginBottom: 6 }}>{expert.episode}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{expert.gain}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: 'var(--text-3)' }}>
                          <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" /><path d="M5.5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                          {expert.duration}
                        </span>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: expert.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="7" height="8" viewBox="0 0 9 10" fill="none"><path d="M1.5 1.5l6 3.5-6 3.5V1.5Z" fill="white" /></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mega-vdivider" aria-hidden="true" />

          <div style={{ width: 280, flexShrink: 0 }}>
            <div className="mega-section-label">Editorial Spotlight</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {spotlightArticles.map(a => (
                <a key={a.id} href={`/blog/${a.slug}`} onClick={onClose}
                  style={{ display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 'var(--r-lg)', border: '1px solid transparent', transition: 'all var(--tr)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                >
                  <div style={{ width: 56, height: 44, borderRadius: 'var(--r)', overflow: 'hidden', flexShrink: 0 }}>
                    <ChannelImage niche={NICHE_ID_MAP[a.niche] || 'seo'} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.35, color: 'var(--text-1)', marginBottom: 3 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{a.industry} · {a.readTime}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: 14, background: 'var(--bg-2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>Not sure where to start?</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 10 }}>Take our 2-minute quiz to find the right channel for your business.</div>
              <a href="/contact" className="btn btn-primary btn-sm" onClick={onClose} style={{ fontSize: 12, padding: '6px 14px' }}>Take the Quiz</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Blog mega menu ────────────────────────────────────────────────────────────

function BlogMegaMenu({ open, onClose, stayOpen, closeMenu }) {
  const recent = ARTICLES.slice(0, 3);
  return (
    <div className={`mega-menu-fw${open ? ' open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu} role="menu">
      <div className="mega-inner">
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div className="mega-section-label">Recent Articles</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {recent.map(a => (
                <a key={a.id} href={`/blog/${a.slug}`} className="blog-mega-article" onClick={onClose}>
                  <div className="blog-mega-thumb">
                    <ChannelImage niche={NICHE_ID_MAP[a.niche] || 'seo'} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)' }}>{a.niche}</div>
                  <div className="blog-mega-title">{a.title}</div>
                  <div className="blog-mega-meta">{a.author.name} · {a.readTime} read</div>
                </a>
              ))}
            </div>
          </div>

          <div className="mega-vdivider" aria-hidden="true" />

          <div style={{ width: 200, flexShrink: 0 }}>
            <div className="mega-section-label">Browse by Topic</div>
            {NICHES.map(n => (
              <a key={n.id} href={`/niches/${n.id}`} onClick={onClose}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--r)', marginBottom: 2, transition: 'background var(--tr)', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)', flex: 1 }}>{n.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{n.count}</span>
              </a>
            ))}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <a href="/blog" onClick={onClose} style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>View all articles →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Resources mega menu ───────────────────────────────────────────────────────

function ResourcesMegaMenu({ open, onClose, stayOpen, closeMenu }) {
  const resources = [
    { icon: '📋', label: 'Playbooks', bg: 'oklch(0.92 0.03 250)', desc: 'Step-by-step growth systems', count: 24 },
    { icon: '🧰', label: 'Toolkits', bg: 'oklch(0.93 0.04 160)', desc: 'Curated software stacks by channel', count: 18 },
    { icon: '📊', label: 'Templates', bg: 'oklch(0.94 0.03 55)', desc: 'Ready-to-use reporting frameworks', count: 31 },
    { icon: '🎙️', label: 'Podcast', bg: 'oklch(0.93 0.03 290)', desc: 'Weekly GTM interviews', count: 68 },
    { icon: '📹', label: 'Videos', bg: 'oklch(0.93 0.03 195)', desc: 'Tutorial walkthroughs & teardowns', count: 42 },
    { icon: '📖', label: 'Glossary', bg: 'oklch(0.94 0.02 30)', desc: '500+ GTM terms defined', count: 512 },
  ];

  const downloads = [
    { title: 'SEO Audit Checklist 2026', tag: 'PDF', color: 'oklch(0.93 0.04 160)' },
    { title: 'PPC Budget Calculator', tag: 'Sheet', color: 'oklch(0.92 0.03 250)' },
    { title: 'Email Deliverability Audit', tag: 'PDF', color: 'oklch(0.93 0.03 195)' },
  ];

  return (
    <div className={`mega-menu-fw${open ? ' open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu} role="menu">
      <div className="mega-inner">
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div className="mega-section-label">Resource Library</div>
            <div className="resources-mega-grid">
              {resources.map(r => (
                <a key={r.label} href="/resources" className="resource-mega-card" onClick={onClose}>
                  <div className="resource-mega-icon" style={{ background: r.bg }}>
                    <span style={{ fontSize: 17 }}>{r.icon}</span>
                  </div>
                  <div className="resource-mega-title">
                    {r.label} <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-3)' }}>({r.count})</span>
                  </div>
                  <div className="resource-mega-desc">{r.desc}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="mega-vdivider" aria-hidden="true" />

          <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="mega-section-label">Free Downloads</div>
            {downloads.map(item => (
              <a key={item.title} href="/resources" onClick={onClose}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg)', transition: 'all var(--tr)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--sh-sm)'; e.currentTarget.style.borderColor = 'var(--border-s)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 6, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>⬇️</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Free · {item.tag}</div>
                </div>
              </a>
            ))}
            <div style={{ marginTop: 4, padding: 14, background: 'var(--brand)', borderRadius: 'var(--r-lg)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>Weekly Intelligence</div>
              <div style={{ fontSize: 12, color: 'oklch(0.72 0.04 258)', lineHeight: 1.5, marginBottom: 10 }}>GTM insights delivered every Tuesday.</div>
              <a href="/" onClick={onClose} className="btn btn-sm" style={{ background: 'white', color: 'var(--brand)', fontSize: 12 }}>Subscribe Free</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main NavBar ───────────────────────────────────────────────────────────────

export default function NavBar({ currentPath }) {
  const [megaMenu, setMegaMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const closeTimer = useRef(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') ?? 'light');
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setMegaMenu(null); setMobileOpen(false); setSearchOpen(false); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('gs-theme', next); } catch (_) {}
  }, [theme]);

  const openMenu = (name) => { clearTimeout(closeTimer.current); setMegaMenu(name); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setMegaMenu(null), 180); };
  const stayOpen = () => clearTimeout(closeTimer.current);
  const closeNow = () => { clearTimeout(closeTimer.current); setMegaMenu(null); };

  const isActive = (prefix) => currentPath.startsWith(prefix);

  const sharedMenuProps = { onClose: closeNow, stayOpen, closeMenu };

  const navItems = [
    { key: 'niches',     label: 'Channels',   prefix: '/niches' },
    { key: 'industries', label: 'Industries',  prefix: '/industries' },
    { key: 'blog',       label: 'Blog',        prefix: '/blog' },
    { key: 'resources',  label: 'Resources',   prefix: '/resources' },
  ];

  return (
    <>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <NichesMegaMenu     open={megaMenu === 'niches'}     {...sharedMenuProps} />
      <IndustriesMegaMenu open={megaMenu === 'industries'} {...sharedMenuProps} />
      <BlogMegaMenu       open={megaMenu === 'blog'}       {...sharedMenuProps} />
      <ResourcesMegaMenu  open={megaMenu === 'resources'}  {...sharedMenuProps} />

      <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="navbar-inner">
          {/* Logo */}
          <a href="/" className="navbar-logo" aria-label="GTM Remixed — home">
            <div className="navbar-logo-mark" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 12L6 7l3 3 5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            GTM Remixed
          </a>

          {/* Desktop nav */}
          <nav className="navbar-nav" aria-label="Main navigation">
            {navItems.map(({ key, label, prefix }) => (
              <div key={key} className="nav-item" onMouseEnter={() => openMenu(key)} onMouseLeave={closeMenu}>
                <div
                  className={`nav-link${megaMenu === key || isActive(prefix) ? ' open active' : ''}`}
                  role="button" tabIndex={0} aria-haspopup="true" aria-expanded={megaMenu === key}
                  onKeyDown={e => e.key === 'Enter' && openMenu(key)}
                >
                  {label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
            <a href="/about" className={`nav-link${isActive('/about') ? ' active' : ''}`}>About</a>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search (Ctrl+K)" title="Search (⌘K)">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 12l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? (
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8.5 1v2M8.5 14v2M1 8.5h2M14 8.5h2M3.22 3.22l1.41 1.41M12.37 12.37l1.41 1.41M3.22 13.78l1.41-1.41M12.37 4.63l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M14.5 10.5A6.5 6.5 0 0 1 6.5 2.5a6.5 6.5 0 1 0 8 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <a href="/contact" className="btn btn-primary btn-sm" style={{ marginLeft: 4 }}>Get in Touch</a>

            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className="mobile-drawer" aria-label="Mobile navigation">
          <div className="mobile-drawer-inner">
            <section className="mobile-section">
              <h3 className="mobile-section-heading">Channels</h3>
              <ul className="mobile-link-list">
                {NICHES.map(n => <li key={n.id}><a href={`/niches/${n.id}`} className="mobile-link">{n.name}</a></li>)}
              </ul>
            </section>
            <section className="mobile-section">
              <h3 className="mobile-section-heading">Industries</h3>
              <ul className="mobile-link-list">
                {INDUSTRIES.map(i => <li key={i.id}><a href={`/industries/${i.id}`} className="mobile-link">{i.name}</a></li>)}
              </ul>
            </section>
            <section className="mobile-section">
              <ul className="mobile-link-list">
                <li><a href="/blog" className="mobile-link">Blog</a></li>
                <li><a href="/resources" className="mobile-link">Resources</a></li>
                <li><a href="/about" className="mobile-link">About</a></li>
                <li><a href="/contact" className="mobile-link">Contact</a></li>
              </ul>
            </section>
            <a href="/contact" className="btn btn-primary">Get in Touch</a>
          </div>
        </nav>
      )}
    </>
  );
}
