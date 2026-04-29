/**
 * src/data/index.ts
 *
 * Single source of truth for all site content.
 *
 * WHY A DEDICATED DATA FILE?
 * The original prototype embedded data directly in shared.jsx and exposed it
 * via window globals (Object.assign(window, { NICHES, ARTICLES, … })). That
 * pattern only works in a browser SPA. In Astro, data must be importable by
 * both the build-time Astro compiler (Node.js) and client-side React islands.
 * A plain TypeScript module satisfies both environments.
 *
 * HOW IT FLOWS:
 *   1. Astro pages import types + arrays at build time → getStaticPaths, templates
 *   2. React islands receive data as props passed from the Astro page frontmatter
 *   3. No runtime fetching needed — all content is compiled into the static HTML/JS bundle
 */

// ─── NICHE (marketing channel) ───────────────────────────────────────────────

export interface Niche {
  id: string;
  name: string;
  abbr: string;
  color: string; // oklch() foreground color for illustrations / icons
  bg: string;    // oklch() background tint for cards
  count: number; // number of guides in this channel
}

export const NICHES: Niche[] = [
  { id: 'seo',       name: 'SEO',               abbr: 'SE',  color: 'oklch(0.38 0.10 160)', bg: 'oklch(0.93 0.04 160)', count: 48 },
  { id: 'ppc',       name: 'PPC',               abbr: 'PP',  color: 'oklch(0.35 0.09 250)', bg: 'oklch(0.92 0.03 250)', count: 36 },
  { id: 'social',    name: 'Social Media',      abbr: 'SM',  color: 'oklch(0.40 0.12 290)', bg: 'oklch(0.93 0.03 290)', count: 29 },
  { id: 'local',     name: 'Local SEO',         abbr: 'LS',  color: 'oklch(0.42 0.10 50)',  bg: 'oklch(0.94 0.03 50)',  count: 22 },
  { id: 'analytics', name: 'Analytics',         abbr: 'AN',  color: 'oklch(0.40 0.12 220)', bg: 'oklch(0.92 0.03 220)', count: 31 },
  { id: 'content',   name: 'Content Marketing', abbr: 'CM',  color: 'oklch(0.38 0.08 30)',  bg: 'oklch(0.94 0.02 30)',  count: 44 },
  { id: 'email',     name: 'Email Marketing',   abbr: 'EM',  color: 'oklch(0.40 0.10 195)', bg: 'oklch(0.93 0.03 195)', count: 27 },
  { id: 'cro',       name: 'CRO',               abbr: 'CR',  color: 'oklch(0.42 0.12 55)',  bg: 'oklch(0.94 0.03 55)',  count: 19 },
];

// ─── INDUSTRY ────────────────────────────────────────────────────────────────

export interface Industry {
  id: string;
  name: string;
  abbr: string;
  count: number;
}

export const INDUSTRIES: Industry[] = [
  { id: 'saas',         name: 'SaaS',                 abbr: 'SaaS', count: 38 },
  { id: 'ecommerce',    name: 'E-commerce',            abbr: 'EC',   count: 42 },
  { id: 'realestate',   name: 'Real Estate',           abbr: 'RE',   count: 24 },
  { id: 'healthcare',   name: 'Healthcare',            abbr: 'HC',   count: 21 },
  { id: 'fintech',      name: 'Fintech',               abbr: 'FT',   count: 18 },
  { id: 'logistics',    name: 'Logistics',             abbr: 'LG',   count: 15 },
  { id: 'professional', name: 'Professional Services', abbr: 'PS',   count: 26 },
  { id: 'hospitality',  name: 'Hospitality',           abbr: 'HO',   count: 14 },
];

// ─── ARTICLE ─────────────────────────────────────────────────────────────────

export interface Author {
  name: string;
  initials: string;
  role: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: Author;
  date: string;
  updated?: string;
  readTime: string;
  niche: string;      // matches Niche.name
  industry: string;   // matches Industry.name OR 'All Industries'
  tags: string[];
  featured?: boolean;
  imageLabel: string; // two-line label shown in the placeholder illustration area
}

export const ARTICLES: Article[] = [
  {
    id: 1, slug: 'technical-seo-checklist-2026',
    title: 'The 2026 Technical SEO Checklist: 47 Checks That Actually Move the Needle',
    excerpt: 'Most technical SEO checklists recycle the same 12 items. After auditing 400+ sites, we compiled the checks that correlate with measurable ranking gains — ranked by impact.',
    author: { name: 'Maya Chen', initials: 'MC', role: 'Head of SEO' },
    date: 'April 18, 2026', updated: 'April 24, 2026',
    readTime: '14 min', niche: 'SEO', industry: 'All Industries',
    tags: ['technical-seo', 'core-web-vitals', 'crawlability'], featured: true,
    imageLabel: 'Technical SEO audit\nchecklist diagram',
  },
  {
    id: 2, slug: 'google-ads-quality-score-framework',
    title: "Google Ads Quality Score: The Framework That Cut Our Clients' CPC by 40%",
    excerpt: 'Quality Score is a proxy metric, not a target. We reverse-engineered how it actually affects auction eligibility and built a prioritization system for fixing it.',
    author: { name: 'Jordan Walsh', initials: 'JW', role: 'PPC Strategist' },
    date: 'April 14, 2026', readTime: '11 min', niche: 'PPC', industry: 'SaaS',
    tags: ['google-ads', 'quality-score', 'cpc'],
    imageLabel: 'Quality Score\ncomponent breakdown',
  },
  {
    id: 3, slug: 'content-velocity-vs-depth',
    title: 'Content Velocity vs. Content Depth: What 3 Years of Data Taught Us',
    excerpt: 'Publish 5 articles a week or publish one exceptional guide per month? We tracked 6 content programs over 36 months to find out what actually compounds.',
    author: { name: 'Sam Rivera', initials: 'SR', role: 'Content Strategist' },
    date: 'April 10, 2026', readTime: '9 min', niche: 'Content Marketing', industry: 'All Industries',
    tags: ['content-strategy', 'organic-growth', 'editorial'],
    imageLabel: 'Traffic compounding\ncurve chart',
  },
  {
    id: 4, slug: 'local-seo-multi-location',
    title: 'Local SEO for Multi-Location Businesses: A Playbook from 200+ Audits',
    excerpt: 'Managing local SEO at scale is a different problem than single-location SEO. This is the system we use for franchises and multi-location operators.',
    author: { name: 'Alex Park', initials: 'AP', role: 'Local SEO Lead' },
    date: 'April 7, 2026', readTime: '16 min', niche: 'Local SEO', industry: 'Hospitality',
    tags: ['local-seo', 'gbp', 'multi-location'],
    imageLabel: 'Multi-location\nGBP structure map',
  },
  {
    id: 5, slug: 'email-deliverability-2026',
    title: 'Email Deliverability in 2026: The Infrastructure Changes Most Senders Are Ignoring',
    excerpt: "Gmail and Yahoo's sender requirements changed the game. Here's how to audit your sending infrastructure and fix the gaps before they cost you inbox placement.",
    author: { name: 'Priya Sharma', initials: 'PS', role: 'Email Marketing Lead' },
    date: 'April 3, 2026', readTime: '12 min', niche: 'Email Marketing', industry: 'E-commerce',
    tags: ['deliverability', 'dmarc', 'inbox-placement'],
    imageLabel: 'Email authentication\nDNS record diagram',
  },
  {
    id: 6, slug: 'conversion-rate-optimization-saas',
    title: 'SaaS Signup Flow Optimization: 18 Tests, 6 Winners, and What We Learned',
    excerpt: 'We ran 18 A/B tests on SaaS trial signup flows over 8 months. These are the 6 changes that produced statistically significant lifts and the reasoning behind them.',
    author: { name: 'Marcus Lee', initials: 'ML', role: 'CRO Specialist' },
    date: 'March 28, 2026', readTime: '13 min', niche: 'CRO', industry: 'SaaS',
    tags: ['cro', 'ab-testing', 'signup-flow'],
    imageLabel: 'A/B test results\nconversion funnel',
  },
  {
    id: 7, slug: 'ga4-ecommerce-tracking',
    title: 'GA4 E-commerce Tracking: The Complete Setup Guide for 2026',
    excerpt: "GA4's e-commerce implementation has quirks that can silently corrupt your data. This is the implementation guide we wish existed when Google forced the migration.",
    author: { name: 'Maya Chen', initials: 'MC', role: 'Head of SEO' },
    date: 'March 24, 2026', readTime: '18 min', niche: 'Analytics', industry: 'E-commerce',
    tags: ['ga4', 'ecommerce-tracking', 'gtm'],
    imageLabel: 'GA4 event schema\ndata layer diagram',
  },
  {
    id: 8, slug: 'linkedin-b2b-ads',
    title: 'LinkedIn Ads for B2B SaaS: The Targeting Framework That Reduces CAC by 35%',
    excerpt: "LinkedIn's targeting is powerful and expensive. This is how we structure campaigns, bidding, and audience segmentation to make the unit economics work for B2B SaaS.",
    author: { name: 'Jordan Walsh', initials: 'JW', role: 'PPC Strategist' },
    date: 'March 20, 2026', readTime: '10 min', niche: 'PPC', industry: 'SaaS',
    tags: ['linkedin-ads', 'b2b', 'targeting'],
    imageLabel: 'LinkedIn audience\ntargeting matrix',
  },
];

// ─── RESOURCE ─────────────────────────────────────────────────────────────────

export interface Resource {
  id: number;
  title: string;
  type: 'Template' | 'Checklist' | 'Guide' | 'Tool';
  desc: string;
  teal: boolean; // controls accent color variant in the original design
}

export const RESOURCES: Resource[] = [
  { id: 1, title: 'Technical SEO Audit Template', type: 'Template', desc: 'A 47-point spreadsheet covering crawlability, Core Web Vitals, structured data, and indexation — with severity scoring built in.', teal: true },
  { id: 2, title: 'Content Brief Framework', type: 'Template', desc: 'The brief structure we use for every article we produce. Includes SERP analysis prompts, entity extraction, and heading hierarchy guidance.', teal: false },
  { id: 3, title: 'PPC Account Structure Checklist', type: 'Checklist', desc: 'Before launching any Google Ads campaign, run through these 34 structural checks to avoid the most expensive beginner mistakes.', teal: true },
  { id: 4, title: 'Email Deliverability Audit Guide', type: 'Guide', desc: 'Step-by-step walkthrough of authenticating your sending domain, checking blacklist status, and diagnosing spam filter triggers.', teal: false },
  { id: 5, title: 'GA4 E-commerce Tracking Spec', type: 'Template', desc: 'A complete Google Tag Manager container and data layer specification for GA4 e-commerce tracking. Import and configure in under an hour.', teal: true },
  { id: 6, title: 'Local SEO Multi-Location Tracker', type: 'Template', desc: 'Track rankings, GBP health, citation consistency, and review velocity across unlimited locations. Built in Google Sheets.', teal: false },
];

// ─── NICHE META (per-channel animal branding) ─────────────────────────────────
// Used on the /niches/[id] hub page hero section.

export interface NicheAnimal {
  name: string;
  tagline: string;
  desc: string;
}

export const NICHE_ANIMALS: Record<string, NicheAnimal> = {
  seo:       { name: 'Eagle',       tagline: 'Precision vision. Built to rank.',            desc: 'Like an eagle commanding vast terrain, SEO demands altitude — combining technical precision with content depth to claim positions that compound long after the work is done.' },
  ppc:       { name: 'Cheetah',     tagline: 'Speed. Efficiency. Maximum ROI.',             desc: 'PPC is the cheetah of marketing: explosive acceleration when executed correctly, completely inefficient when not. The difference between 3× ROAS and burning budget is precision.' },
  social:    { name: 'Dolphin',     tagline: 'Intelligent. Connected. Always in motion.',   desc: 'Social media rewards the curious and connected. Like dolphins, the best social strategies navigate complex waters with intelligence, adaptability, and a genuine instinct for community.' },
  local:     { name: 'Bear',        tagline: 'Own your territory. Defend your ground.',     desc: 'Local SEO is about territorial dominance. Know your turf, make yourself impossible to ignore in your market, and protect that ground from competitors who want your customers.' },
  analytics: { name: 'Owl',         tagline: 'See patterns others miss.',                   desc: "Analytics is the owl's gift: clarity in the dark, signal found in noise, and the discipline to act on data when everyone else is guessing. The difference between decisions and hunches." },
  content:   { name: 'Elephant',    tagline: 'Never forgotten. Built to last.',             desc: "Great content marketing has an elephant's memory and patience — building assets that compound for years, creating trust that no ad spend can replicate, outlasting every short-term tactic." },
  email:     { name: 'Hummingbird', tagline: 'Precise. Direct. Always delivered.',          desc: 'Email at its best is like a hummingbird: pinpoint accurate, impossibly efficient, delivering exactly what the recipient needs with zero wasted motion and a 42:1 return on investment.' },
  cro:       { name: 'Chameleon',   tagline: 'Test. Adapt. Convert.',                      desc: "CRO is the chameleon's practice — constant adaptation based on what the environment tells you. The best conversion programs never stop changing in response to data, because the data never lies." },
};

// ─── INDUSTRY META ────────────────────────────────────────────────────────────

export interface IndustryMeta {
  tagline: string;
  desc: string;
}

export const INDUSTRY_META: Record<string, IndustryMeta> = {
  saas:         { tagline: 'Pipeline velocity for recurring revenue.', desc: 'SaaS growth is a compounding machine when every stage of the customer lifecycle — acquisition, activation, retention, expansion — is optimized together. One leaky stage bleeds all the others.' },
  ecommerce:    { tagline: 'Acquisition, retention, and cart recovery.', desc: 'E-commerce marketing lives and dies in the funnel: getting qualified shoppers in, removing friction from the path to purchase, and building the repeat-purchase behavior that turns CAC into a one-time cost.' },
  realestate:   { tagline: 'Local intent, listing authority, and trust.', desc: 'Real estate marketing is a local game with high-stakes decisions. Authority, visibility at the moment of intent, and consistent trust signals across every touchpoint are what separate the agents who dominate a market from those who compete on commission.' },
  healthcare:   { tagline: 'Compliant growth in a regulated vertical.', desc: 'Healthcare marketing requires navigating HIPAA, patient trust, and intense local competition simultaneously. The practices and systems that grow healthcare brands do so within constraints that eliminate shortcuts and reward long-term investment.' },
  fintech:      { tagline: 'Trust, conversion, and CAC discipline.', desc: 'Fintech brands face the hardest conversion problem in marketing: asking people to trust you with their money. Every channel, every message, every touchpoint either builds or destroys that trust — and CAC compounds accordingly.' },
  logistics:    { tagline: 'B2B demand gen that moves freight and closes deals.', desc: 'Logistics marketing operates in long B2B sales cycles, complex buying committees, and a market where trust is earned through operational excellence, not brand awareness. Content and reputation are the only sustainable differentiation.' },
  professional: { tagline: 'Reputation-led growth and referral loops.', desc: 'Professional services firms grow through expertise visibility, reputation compounding, and referral flywheel activation. The firms that grow fastest treat their knowledge as a marketing asset and invest accordingly.' },
  hospitality:  { tagline: 'Direct bookings and loyalty over OTA dependency.', desc: "Hospitality's biggest marketing challenge isn't traffic — it's margin. OTA dependency erodes profitability on every booking. The brands that win build direct relationships, retention programs, and demand channels that make OTAs optional." },
};

// ─── NICHE / INDUSTRY HUE (oklch hue angle for hero backgrounds) ──────────────
// Used to generate dynamic oklch() color strings for niche/industry hub pages.

export const NICHE_HUE: Record<string, number> = {
  seo: 160, ppc: 250, social: 290, local: 50,
  analytics: 220, content: 30, email: 195, cro: 55,
};

export const INDUSTRY_HUE: Record<string, number> = {
  saas: 250, ecommerce: 160, realestate: 50, healthcare: 195,
  fintech: 220, logistics: 30, professional: 290, hospitality: 55,
};

// ─── INDUSTRY DISPLAY HELPERS ─────────────────────────────────────────────────

export const INDUSTRY_ICONS: Record<string, string> = {
  saas: '☁️', ecommerce: '🛍', realestate: '🏠', healthcare: '🩺',
  fintech: '💳', logistics: '🚛', professional: '💼', hospitality: '🏨',
};

export const INDUSTRY_COLORS: Record<string, { bg: string; color: string }> = {
  saas:         { bg: 'oklch(0.92 0.03 250)', color: 'oklch(0.35 0.09 250)' },
  ecommerce:    { bg: 'oklch(0.93 0.04 160)', color: 'oklch(0.38 0.10 160)' },
  realestate:   { bg: 'oklch(0.94 0.03 50)',  color: 'oklch(0.42 0.10 50)'  },
  healthcare:   { bg: 'oklch(0.93 0.03 195)', color: 'oklch(0.40 0.10 195)' },
  fintech:      { bg: 'oklch(0.92 0.03 220)', color: 'oklch(0.40 0.12 220)' },
  logistics:    { bg: 'oklch(0.94 0.02 30)',  color: 'oklch(0.38 0.08 30)'  },
  professional: { bg: 'oklch(0.93 0.03 290)', color: 'oklch(0.40 0.12 290)' },
  hospitality:  { bg: 'oklch(0.94 0.03 55)',  color: 'oklch(0.42 0.12 55)'  },
};

// ─── NICHE SUB-TOPICS (hub page topic navigator) ─────────────────────────────

export interface NicheTopic {
  label: string;
  slug: string;
}

export const NICHE_TOPICS: Record<string, NicheTopic[]> = {
  seo: [
    { label: 'Technical SEO',      slug: 'technical-seo' },
    { label: 'On-Page Optimization', slug: 'on-page' },
    { label: 'Link Building',      slug: 'link-building' },
    { label: 'Core Web Vitals',    slug: 'core-web-vitals' },
    { label: 'Keyword Research',   slug: 'keyword-research' },
    { label: 'Schema Markup',      slug: 'schema' },
    { label: 'Crawl & Indexation', slug: 'crawl-indexation' },
    { label: 'Content Strategy',   slug: 'content-strategy' },
  ],
  ppc: [
    { label: 'Google Ads',         slug: 'google-ads' },
    { label: 'LinkedIn Ads',       slug: 'linkedin-ads' },
    { label: 'Facebook Ads',       slug: 'facebook-ads' },
    { label: 'Bidding Strategy',   slug: 'bidding' },
    { label: 'Quality Score',      slug: 'quality-score' },
    { label: 'Conversion Tracking', slug: 'conversion-tracking' },
    { label: 'Display & Retargeting', slug: 'retargeting' },
    { label: 'Shopping Ads',       slug: 'shopping-ads' },
  ],
  social: [
    { label: 'Content Strategy',   slug: 'content-strategy' },
    { label: 'Paid Social',        slug: 'paid-social' },
    { label: 'Community Building', slug: 'community' },
    { label: 'LinkedIn B2B',       slug: 'linkedin-b2b' },
    { label: 'Video & Reels',      slug: 'video' },
    { label: 'Analytics & Reporting', slug: 'analytics' },
    { label: 'Social Listening',   slug: 'social-listening' },
    { label: 'Influencer',         slug: 'influencer' },
  ],
  local: [
    { label: 'GBP Optimization',   slug: 'gbp' },
    { label: 'Citation Building',  slug: 'citations' },
    { label: 'Review Management',  slug: 'reviews' },
    { label: 'Local Content',      slug: 'local-content' },
    { label: 'Map Pack',           slug: 'map-pack' },
    { label: 'Local Link Building', slug: 'local-links' },
    { label: 'NAP Consistency',    slug: 'nap' },
    { label: 'Schema for Local',   slug: 'local-schema' },
  ],
  analytics: [
    { label: 'GA4 Setup',          slug: 'ga4' },
    { label: 'GTM Implementation', slug: 'gtm' },
    { label: 'Dashboard Design',   slug: 'dashboards' },
    { label: 'Attribution Modeling', slug: 'attribution' },
    { label: 'A/B Testing',        slug: 'ab-testing' },
    { label: 'Data Layer',         slug: 'data-layer' },
    { label: 'Session Recording',  slug: 'session-recording' },
    { label: 'Reporting',          slug: 'reporting' },
  ],
  content: [
    { label: 'Content Strategy',   slug: 'strategy' },
    { label: 'SEO Writing',        slug: 'seo-writing' },
    { label: 'Pillar Content',     slug: 'pillar-content' },
    { label: 'Content Ops',        slug: 'content-ops' },
    { label: 'Distribution',       slug: 'distribution' },
    { label: 'Repurposing',        slug: 'repurposing' },
    { label: 'Thought Leadership', slug: 'thought-leadership' },
    { label: 'Podcast & Video',    slug: 'podcast-video' },
  ],
  email: [
    { label: 'List Building',      slug: 'list-building' },
    { label: 'Deliverability',     slug: 'deliverability' },
    { label: 'Automation',         slug: 'automation' },
    { label: 'Segmentation',       slug: 'segmentation' },
    { label: 'Email Copy',         slug: 'copy' },
    { label: 'Subject Lines',      slug: 'subject-lines' },
    { label: 'Design',             slug: 'design' },
    { label: 'Analytics',          slug: 'analytics' },
  ],
  cro: [
    { label: 'A/B Testing',        slug: 'ab-testing' },
    { label: 'Landing Pages',      slug: 'landing-pages' },
    { label: 'Heatmaps',           slug: 'heatmaps' },
    { label: 'Form Optimization',  slug: 'forms' },
    { label: 'Checkout Flow',      slug: 'checkout' },
    { label: 'Mobile UX',          slug: 'mobile-ux' },
    { label: 'Trust Signals',      slug: 'trust-signals' },
    { label: 'Personalization',    slug: 'personalization' },
  ],
};

export const INDUSTRY_TOPICS: Record<string, NicheTopic[]> = {
  saas: [
    { label: 'Product-Led Growth', slug: 'plg' },
    { label: 'Paid Acquisition',   slug: 'paid' },
    { label: 'Content Marketing',  slug: 'content' },
    { label: 'Email Nurture',      slug: 'email' },
    { label: 'SEO',                slug: 'seo' },
    { label: 'Churn Reduction',    slug: 'churn' },
    { label: 'Partnership',        slug: 'partnership' },
    { label: 'Freemium Strategy',  slug: 'freemium' },
  ],
  ecommerce: [
    { label: 'Shopping Ads',       slug: 'shopping-ads' },
    { label: 'Email Recovery',     slug: 'email-recovery' },
    { label: 'Social Commerce',    slug: 'social-commerce' },
    { label: 'SEO',                slug: 'seo' },
    { label: 'CRO',                slug: 'cro' },
    { label: 'Loyalty Programs',   slug: 'loyalty' },
    { label: 'Influencer',         slug: 'influencer' },
    { label: 'Marketplace',        slug: 'marketplace' },
  ],
  realestate: [
    { label: 'Local SEO',          slug: 'local-seo' },
    { label: 'Listing Optimization', slug: 'listings' },
    { label: 'Google Ads',         slug: 'google-ads' },
    { label: 'Content Marketing',  slug: 'content' },
    { label: 'Email Campaigns',    slug: 'email' },
    { label: 'Social Media',       slug: 'social' },
    { label: 'Review Strategy',    slug: 'reviews' },
    { label: 'Video Marketing',    slug: 'video' },
  ],
  healthcare: [
    { label: 'HIPAA Marketing',    slug: 'hipaa' },
    { label: 'Local SEO',          slug: 'local-seo' },
    { label: 'Google Ads',         slug: 'google-ads' },
    { label: 'Content Strategy',   slug: 'content' },
    { label: 'Patient Reviews',    slug: 'reviews' },
    { label: 'Email',              slug: 'email' },
    { label: 'Social Media',       slug: 'social' },
    { label: 'Reputation',         slug: 'reputation' },
  ],
  fintech: [
    { label: 'Trust Building',     slug: 'trust' },
    { label: 'SEO',                slug: 'seo' },
    { label: 'Paid Acquisition',   slug: 'paid' },
    { label: 'Content Marketing',  slug: 'content' },
    { label: 'Email',              slug: 'email' },
    { label: 'Referral Programs',  slug: 'referral' },
    { label: 'Compliance',         slug: 'compliance' },
    { label: 'Analytics',          slug: 'analytics' },
  ],
  logistics: [
    { label: 'Content Marketing',  slug: 'content' },
    { label: 'SEO',                slug: 'seo' },
    { label: 'Account-Based',      slug: 'abm' },
    { label: 'Email',              slug: 'email' },
    { label: 'LinkedIn',           slug: 'linkedin' },
    { label: 'Case Studies',       slug: 'case-studies' },
    { label: 'Events',             slug: 'events' },
    { label: 'Partnerships',       slug: 'partnerships' },
  ],
  professional: [
    { label: 'Thought Leadership', slug: 'thought-leadership' },
    { label: 'SEO',                slug: 'seo' },
    { label: 'Referral Programs',  slug: 'referral' },
    { label: 'Email',              slug: 'email' },
    { label: 'LinkedIn',           slug: 'linkedin' },
    { label: 'Content Marketing',  slug: 'content' },
    { label: 'Webinars',           slug: 'webinars' },
    { label: 'Awards & PR',        slug: 'awards-pr' },
  ],
  hospitality: [
    { label: 'Direct Bookings',    slug: 'direct-bookings' },
    { label: 'Email Marketing',    slug: 'email' },
    { label: 'Social Media',       slug: 'social' },
    { label: 'Local SEO',          slug: 'local-seo' },
    { label: 'Google Ads',         slug: 'paid' },
    { label: 'Review Management',  slug: 'reviews' },
    { label: 'Loyalty Programs',   slug: 'loyalty' },
    { label: 'OTA Strategy',       slug: 'ota' },
  ],
};

// ─── CHANNEL TAGLINES (home page NichesSection) ────────────────────────────────

export const CHANNEL_TAGLINES: Record<string, string> = {
  seo:       'Rank, crawl, convert. The full technical stack.',
  ppc:       'Spend less. Win more auctions. Prove ROI.',
  social:    'Algorithms, audiences, and engagement loops.',
  local:     'Own the map. Win the neighbourhood.',
  analytics: 'Turn data into decisions that move numbers.',
  content:   'Build the content engine that compounds.',
  email:     'Deliverability, copy, and automation at scale.',
  cro:       'Test everything. Keep what wins.',
};

// ─── INDUSTRY META FOR HOME PAGE (IndustriesSection) ─────────────────────────

export interface IndustryCardMeta {
  tagline: string;
  color: string;
  bg: string;
}

export const IND_META: Record<string, IndustryCardMeta> = {
  saas:         { tagline: 'Pipeline velocity for recurring revenue',   color: 'oklch(0.35 0.09 250)', bg: 'oklch(0.92 0.03 250)' },
  ecommerce:    { tagline: 'Acquisition, retention, and cart recovery', color: 'oklch(0.38 0.10 160)', bg: 'oklch(0.93 0.04 160)' },
  realestate:   { tagline: 'Local intent and listing authority',        color: 'oklch(0.42 0.10 50)',  bg: 'oklch(0.94 0.03 50)'  },
  healthcare:   { tagline: 'Compliant growth for regulated verticals',  color: 'oklch(0.40 0.10 195)', bg: 'oklch(0.93 0.03 195)' },
  fintech:      { tagline: 'Trust, conversion, and CAC discipline',     color: 'oklch(0.40 0.12 220)', bg: 'oklch(0.92 0.03 220)' },
  logistics:    { tagline: 'B2B demand generation that moves freight',  color: 'oklch(0.38 0.08 30)',  bg: 'oklch(0.94 0.02 30)'  },
  professional: { tagline: 'Reputation-led growth and referral loops',  color: 'oklch(0.40 0.12 290)', bg: 'oklch(0.93 0.03 290)' },
  hospitality:  { tagline: 'Direct bookings over OTA dependency',       color: 'oklch(0.42 0.12 55)',  bg: 'oklch(0.94 0.03 55)'  },
};

// ─── GTMGODS PODCAST EXPERTS ──────────────────────────────────────────────────
// Displayed in the Industries mega menu carousel and on the Resources page.

export interface GtmExpert {
  id: number;
  initials: string;
  name: string;
  title: string;
  industry: string;
  episode: string;
  gain: string;
  duration: string;
  ep: string;
  color: string;
  bg: string;
}

export const GTMGODS_EXPERTS: GtmExpert[] = [
  { id: 1, initials: 'SC', name: 'Sarah Chen',    title: 'VP Growth · Shopify',      industry: 'E-commerce', episode: "How We 3×'d Organic Traffic in 8 Months",         gain: 'The exact content cadence and internal linking system that compounded organic growth without increasing headcount.', duration: '54 min', ep: 'EP 41', color: 'oklch(0.38 0.10 160)', bg: 'oklch(0.93 0.04 160)' },
  { id: 2, initials: 'MW', name: 'Marcus Webb',   title: 'CMO · Rippling',           industry: 'SaaS',       episode: 'Rebuilding Paid Acquisition from Scratch',            gain: 'Why they paused all PPC spend for 6 weeks — and what the rebuild revealed about unit economics and channel fit.', duration: '47 min', ep: 'EP 38', color: 'oklch(0.35 0.09 250)', bg: 'oklch(0.92 0.03 250)' },
  { id: 3, initials: 'PN', name: 'Priya Nair',    title: 'Head of SEO · Zillow',     industry: 'Real Estate', episode: 'Local SEO at 100M+ Page Scale',                    gain: 'Automating local content and GBP signals across millions of listings without triggering quality penalties.', duration: '61 min', ep: 'EP 35', color: 'oklch(0.42 0.10 50)',  bg: 'oklch(0.94 0.03 50)'  },
  { id: 4, initials: 'JO', name: 'James Okafor',  title: 'Growth Lead · Oscar Health',industry: 'Healthcare', episode: 'Marketing in a Compliance-Heavy Industry',           gain: 'Building aggressive growth programs within strict regulatory constraints — the frameworks that made it possible.', duration: '38 min', ep: 'EP 33', color: 'oklch(0.40 0.10 195)', bg: 'oklch(0.93 0.03 195)' },
  { id: 5, initials: 'EV', name: 'Elena Vasquez', title: 'CRO Director · Klarna',    industry: 'Fintech',    episode: 'The Psychology Behind Our Checkout Redesign',        gain: 'The behavioral triggers that reduced cart abandonment by 28% — and why most CRO teams are optimizing the wrong step.', duration: '52 min', ep: 'EP 29', color: 'oklch(0.40 0.12 220)', bg: 'oklch(0.92 0.03 220)' },
  { id: 6, initials: 'TA', name: 'Tom Ashford',   title: 'Dir. Marketing · Marriott',industry: 'Hospitality', episode: 'Building Loyalty in the Post-OTA World',            gain: 'How direct booking campaigns outperformed OTA traffic 4× — and the email program that kept guests from going back.', duration: '45 min', ep: 'EP 26', color: 'oklch(0.42 0.12 55)',  bg: 'oklch(0.94 0.03 55)'  },
  { id: 7, initials: 'RK', name: 'Raj Kapoor',    title: 'CMO · Flexport',           industry: 'Logistics',  episode: 'Demand Gen in B2B Logistics: What Actually Moves Deals', gain: 'Why content marketing outperformed events and paid for enterprise pipeline — with the attribution data to prove it.', duration: '43 min', ep: 'EP 22', color: 'oklch(0.38 0.08 30)',  bg: 'oklch(0.94 0.02 30)'  },
];
