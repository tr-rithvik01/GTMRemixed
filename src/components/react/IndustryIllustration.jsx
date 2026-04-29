// Geometric industry illustrations for industry hub pages.
// Each SVG is designed to display on the dark hero background.

const SaaS = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Cloud shape */}
    <path d="M80 165 C80 135 100 115 128 112 C132 95 148 82 168 82 C188 82 205 95 210 112 C230 115 245 130 245 150 C245 170 228 185 208 185 L100 185 C88 185 80 176 80 165Z" fill={s} opacity="0.15" stroke={s} strokeWidth="1.5" />
    {/* Pipeline arrows */}
    <circle cx="88" cy="220" r="16" fill={c} opacity="0.3" />
    <text x="88" y="225" fill="white" fontSize="9" textAnchor="middle" opacity="0.8" fontFamily="monospace">MQL</text>
    <path d="M106 220 L126 220" stroke={s} strokeWidth="2" opacity="0.5" markerEnd="url(#arr)" />
    <circle cx="145" cy="220" r="16" fill={c} opacity="0.4" />
    <text x="145" y="225" fill="white" fontSize="9" textAnchor="middle" opacity="0.8" fontFamily="monospace">SQL</text>
    <path d="M163 220 L183 220" stroke={s} strokeWidth="2" opacity="0.5" />
    <circle cx="202" cy="220" r="16" fill={c} opacity="0.55" />
    <text x="202" y="225" fill="white" fontSize="9" textAnchor="middle" opacity="0.8" fontFamily="monospace">OPP</text>
    <path d="M220 220 L240 220" stroke={s} strokeWidth="2" opacity="0.5" />
    <circle cx="255" cy="220" r="16" fill={c} opacity="0.75" />
    <text x="255" y="225" fill="white" fontSize="8" textAnchor="middle" opacity="0.9" fontFamily="monospace">WON</text>
    {/* Recurve / subscription arrow */}
    <path d="M255 237 Q255 258 160 258 Q65 258 65 220" stroke={s} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.3" strokeLinecap="round" />
    {/* Metrics on cloud */}
    <text x="130" y="145" fill="white" fontSize="11" opacity="0.6" fontFamily="monospace">ARR ↑ 3×</text>
    <text x="130" y="162" fill="white" fontSize="10" opacity="0.4" fontFamily="monospace">Churn ↓ 2.1%</text>
    {/* Server racks suggestion */}
    <rect x="55" y="88" width="38" height="65" rx="4" fill={s} opacity="0.1" />
    <line x1="62" y1="102" x2="86" y2="102" stroke={s} strokeWidth="1" opacity="0.3" />
    <line x1="62" y1="114" x2="86" y2="114" stroke={s} strokeWidth="1" opacity="0.3" />
    <line x1="62" y1="126" x2="86" y2="126" stroke={s} strokeWidth="1" opacity="0.3" />
    <circle cx="83" cy="102" r="3" fill={c} opacity="0.5" />
    <circle cx="83" cy="114" r="3" fill={c} opacity="0.4" />
    <circle cx="83" cy="126" r="3" fill={s} opacity="0.3" />
    {/* Connection lines */}
    <line x1="93" y1="120" x2="115" y2="140" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="248" y1="140" x2="260" y2="112" stroke={s} strokeWidth="1" opacity="0.2" />
  </svg>
);

const Ecommerce = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Shopping bag */}
    <path d="M100 130 L105 90 L215 90 L220 130Z" fill={s} opacity="0.12" />
    <rect x="100" y="128" width="120" height="90" rx="8" fill={s} opacity="0.15" />
    <path d="M135 90 C135 72 145 60 160 60 C175 60 185 72 185 90" stroke={s} strokeWidth="2.5" opacity="0.4" strokeLinecap="round" fill="none" />
    {/* Cart icon */}
    <circle cx="125" cy="228" r="10" fill={c} opacity="0.6" />
    <circle cx="190" cy="228" r="10" fill={c} opacity="0.6" />
    {/* Product on shelf */}
    <rect x="128" y="148" width="28" height="38" rx="4" fill={c} opacity="0.4" />
    <rect x="164" y="148" width="28" height="38" rx="4" fill={c} opacity="0.3" />
    {/* Price tags */}
    <rect x="115" y="100" width="40" height="16" rx="8" fill={c} opacity="0.3" />
    <rect x="165" y="100" width="40" height="16" rx="8" fill={s} opacity="0.2" />
    <text x="135" y="112" fill="white" fontSize="9" textAnchor="middle" opacity="0.7">$29</text>
    <text x="185" y="112" fill="white" fontSize="9" textAnchor="middle" opacity="0.7">$49</text>
    {/* Conversion funnel side */}
    <path d="M260 70 L295 70 L288 110 L267 110Z" fill={s} opacity="0.12" />
    <path d="M267 110 L288 110 L283 140 L272 140Z" fill={s} opacity="0.15" />
    <path d="M272 140 L283 140 L280 165 L275 165Z" fill={c} opacity="0.3" />
    <text x="277" y="76" fill="white" fontSize="8" opacity="0.4">View</text>
    <text x="277" y="122" fill="white" fontSize="7" opacity="0.4">Cart</text>
    <text x="277" y="155" fill="white" fontSize="7" opacity="0.5">Buy</text>
    {/* Email recovery arrow */}
    <path d="M30 200 Q50 175 80 180" stroke={s} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35" strokeLinecap="round" />
    <text x="22" y="215" fill="white" fontSize="9" opacity="0.4">Cart</text>
    <text x="18" y="227" fill="white" fontSize="9" opacity="0.4">Recovery</text>
    {/* Stars / reviews */}
    {[0,1,2,3,4].map(i => (
      <text key={i} x={30 + i * 14} y="165" fill={c} fontSize="13" opacity="0.5">★</text>
    ))}
  </svg>
);

const RealEstate = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* House */}
    <path d="M110 175 L110 130 L160 95 L210 130 L210 175Z" fill={c} opacity="0.8" />
    <path d="M95 135 L160 88 L225 135" stroke={s} strokeWidth="2" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Door */}
    <rect x="145" y="148" width="30" height="27" rx="3" fill={s} opacity="0.3" />
    {/* Windows */}
    <rect x="118" y="140" width="22" height="18" rx="2" fill="white" opacity="0.2" />
    <rect x="180" y="140" width="22" height="18" rx="2" fill="white" opacity="0.2" />
    {/* Chimney */}
    <rect x="182" y="95" width="14" height="28" fill={c} opacity="0.7" />
    {/* Location pin */}
    <path d="M160 58 C148 58 138 68 138 80 C138 100 160 118 160 118 C160 118 182 100 182 80 C182 68 172 58 160 58Z" fill={s} opacity="0.4" />
    <circle cx="160" cy="79" r="8" fill="white" opacity="0.5" />
    {/* Neighbourhood map grid */}
    <line x1="40" y1="175" x2="280" y2="175" stroke={s} strokeWidth="1" opacity="0.15" />
    <line x1="80" y1="200" x2="80" y2="240" stroke={s} strokeWidth="1" opacity="0.12" />
    <line x1="240" y1="200" x2="240" y2="240" stroke={s} strokeWidth="1" opacity="0.12" />
    <line x1="40" y1="220" x2="280" y2="220" stroke={s} strokeWidth="1" opacity="0.1" />
    {/* Nearby properties */}
    <rect x="42" y="195" width="32" height="25" rx="2" fill={s} opacity="0.1" />
    <path d="M38 198 L58 182 L78 198" stroke={s} strokeWidth="1.5" opacity="0.2" />
    <rect x="246" y="195" width="32" height="25" rx="2" fill={s} opacity="0.1" />
    <path d="M242 198 L262 182 L282 198" stroke={s} strokeWidth="1.5" opacity="0.2" />
    {/* Price appreciation arrow */}
    <polyline points="45,245 85,235 125,225 165,215 205,205 245,195" stroke={c} strokeWidth="2" opacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="245" cy="195" r="4" fill={c} opacity="0.7" />
    {/* Trust badge */}
    <circle cx="265" cy="110" r="25" stroke={s} strokeWidth="1.5" opacity="0.3" fill={s} fillOpacity="0.08" />
    <text x="265" y="106" fill="white" fontSize="10" textAnchor="middle" opacity="0.5">Trust</text>
    <text x="265" y="119" fill="white" fontSize="10" textAnchor="middle" opacity="0.5">Score</text>
  </svg>
);

const Healthcare = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* ECG / heartbeat line */}
    <polyline points="30,140 70,140 85,100 100,175 115,120 130,155 145,140 290,140" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    {/* Cross / medical symbol */}
    <rect x="145" y="52" width="30" height="80" rx="8" fill={s} opacity="0.25" />
    <rect x="120" y="75" width="80" height="30" rx="8" fill={s} opacity="0.25" />
    {/* Shield for compliance */}
    <path d="M230 185 C230 165 218 145 210 135 C202 145 190 165 190 185 C190 205 202 218 210 218 C218 218 230 205 230 185Z" fill={s} opacity="0.15" stroke={s} strokeWidth="1.5" />
    <text x="210" y="182" fill="white" fontSize="9" textAnchor="middle" opacity="0.5">HIPAA</text>
    <text x="210" y="196" fill="white" fontSize="9" textAnchor="middle" opacity="0.5">Safe</text>
    {/* Patient journey steps */}
    <circle cx="55" cy="215" r="14" fill={c} opacity="0.3" />
    <text x="55" y="219" fill="white" fontSize="8" textAnchor="middle" opacity="0.7">Search</text>
    <path d="M70 215 L88 215" stroke={s} strokeWidth="1.5" opacity="0.4" />
    <circle cx="105" cy="215" r="14" fill={c} opacity="0.4" />
    <text x="105" y="219" fill="white" fontSize="8" textAnchor="middle" opacity="0.7">Book</text>
    <path d="M120 215 L138 215" stroke={s} strokeWidth="1.5" opacity="0.4" />
    <circle cx="155" cy="215" r="14" fill={c} opacity="0.55" />
    <text x="155" y="219" fill="white" fontSize="8" textAnchor="middle" opacity="0.7">Visit</text>
    <path d="M170 215 L188 215" stroke={s} strokeWidth="1.5" opacity="0.4" />
    <circle cx="205" cy="215" r="14" fill={c} opacity="0.7" />
    <text x="205" y="219" fill="white" fontSize="8" textAnchor="middle" opacity="0.8">Trust</text>
    {/* Stars */}
    {[0,1,2,3,4].map(i => (
      <text key={i} x={62 + i*14} y="258" fill={c} fontSize="14" opacity="0.5">★</text>
    ))}
  </svg>
);

const Fintech = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Circuit board lines */}
    <line x1="40" y1="100" x2="100" y2="100" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="100" y1="100" x2="100" y2="60" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="100" y1="60" x2="160" y2="60" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="220" y1="100" x2="280" y2="100" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="220" y1="100" x2="220" y2="60" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="160" y1="60" x2="220" y2="60" stroke={s} strokeWidth="1" opacity="0.2" />
    <circle cx="100" cy="100" r="4" fill={s} opacity="0.3" />
    <circle cx="220" cy="100" r="4" fill={s} opacity="0.3" />
    <circle cx="160" cy="60" r="4" fill={s} opacity="0.3" />
    {/* Credit card */}
    <rect x="72" y="115" width="176" height="110" rx="10" fill={s} opacity="0.12" stroke={s} strokeWidth="1.5" />
    <rect x="72" y="135" width="176" height="25" fill={s} opacity="0.1" />
    {/* Chip */}
    <rect x="92" y="145" width="35" height="28" rx="4" fill={c} opacity="0.4" />
    <line x1="92" y1="152" x2="127" y2="152" stroke={s} strokeWidth="0.8" opacity="0.3" />
    <line x1="92" y1="159" x2="127" y2="159" stroke={s} strokeWidth="0.8" opacity="0.3" />
    <line x1="92" y1="166" x2="127" y2="166" stroke={s} strokeWidth="0.8" opacity="0.3" />
    <line x1="99" y1="145" x2="99" y2="173" stroke={s} strokeWidth="0.8" opacity="0.3" />
    <line x1="110" y1="145" x2="110" y2="173" stroke={s} strokeWidth="0.8" opacity="0.3" />
    <line x1="120" y1="145" x2="120" y2="173" stroke={s} strokeWidth="0.8" opacity="0.3" />
    {/* Card numbers */}
    <text x="92" y="205" fill="white" fontSize="10" opacity="0.4" fontFamily="monospace">**** **** **** 4291</text>
    {/* Trust lock icon */}
    <path d="M225 148 C225 140 230 135 238 135 C246 135 251 140 251 148 L251 155 L225 155Z" stroke={s} strokeWidth="1.5" fill="none" opacity="0.5" />
    <rect x="220" y="153" width="36" height="28" rx="4" fill={s} opacity="0.2" />
    <circle cx="238" cy="167" r="5" fill={c} opacity="0.5" />
    {/* CAC payback curve */}
    <path d="M40 255 C80 255 100 230 130 220 C160 210 190 218 220 215 C250 212 270 210 280 208" stroke={c} strokeWidth="2" opacity="0.6" fill="none" strokeLinecap="round" />
    <text x="45" y="250" fill="white" fontSize="8" opacity="0.4">CAC payback period</text>
  </svg>
);

const Logistics = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Route map */}
    <circle cx="60" cy="80" r="10" fill={c} opacity="0.5" />
    <circle cx="260" cy="200" r="10" fill={c} opacity="0.7" />
    <circle cx="160" cy="130" r="8" fill={c} opacity="0.4" />
    <circle cx="240" cy="80" r="8" fill={s} opacity="0.35" />
    <circle cx="80" cy="190" r="8" fill={s} opacity="0.3" />
    {/* Route lines */}
    <path d="M68 82 C100 90 140 110 155 128" stroke={s} strokeWidth="1.5" opacity="0.35" strokeDasharray="5 4" />
    <path d="M168 132 C185 138 220 155 252 196" stroke={c} strokeWidth="2" opacity="0.5" />
    <path d="M68 82 C80 60 200 62 238 78" stroke={s} strokeWidth="1.5" opacity="0.25" strokeDasharray="5 4" />
    <path d="M87 190 C105 170 140 150 155 132" stroke={s} strokeWidth="1.5" opacity="0.25" strokeDasharray="5 4" />
    {/* Truck */}
    <rect x="120" y="220" width="80" height="35" rx="4" fill={c} opacity="0.7" />
    <rect x="196" y="224" width="35" height="28" rx="4" fill={c} opacity="0.6" />
    <path d="M197 225 L228 225 L228 248 L197 248" stroke={s} strokeWidth="1" opacity="0.3" />
    <line x1="215" y1="225" x2="215" y2="248" stroke={s} strokeWidth="1" opacity="0.3" />
    <circle cx="140" cy="258" r="10" fill={s} opacity="0.35" />
    <circle cx="140" cy="258" r="5" fill="white" opacity="0.2" />
    <circle cx="205" cy="258" r="10" fill={s} opacity="0.35" />
    <circle cx="205" cy="258" r="5" fill="white" opacity="0.2" />
    {/* Cargo box */}
    <rect x="130" y="226" width="30" height="27" rx="2" fill={s} opacity="0.2" />
    <line x1="130" y1="238" x2="160" y2="238" stroke={s} strokeWidth="1" opacity="0.3" />
    <line x1="145" y1="226" x2="145" y2="253" stroke={s} strokeWidth="1" opacity="0.3" />
    {/* Pipeline metrics */}
    <rect x="32" y="118" width="50" height="80" rx="4" fill={s} opacity="0.08" />
    <text x="57" y="140" fill="white" fontSize="9" textAnchor="middle" opacity="0.5">Deals</text>
    <rect x="38" y="148" width="38" height="8" rx="2" fill={c} opacity="0.2" />
    <rect x="38" y="161" width="28" height="8" rx="2" fill={c} opacity="0.25" />
    <rect x="38" y="174" width="20" height="8" rx="2" fill={c} opacity="0.3" />
    <rect x="38" y="187" width="14" height="8" rx="2" fill={c} opacity="0.4" />
  </svg>
);

const Professional = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Org chart */}
    <circle cx="160" cy="55" r="22" fill={c} opacity="0.5" />
    <text x="160" y="59" fill="white" fontSize="9" textAnchor="middle" opacity="0.8">Expert</text>
    {/* Level 2 */}
    <line x1="160" y1="77" x2="90" y2="112" stroke={s} strokeWidth="1.5" opacity="0.3" />
    <line x1="160" y1="77" x2="230" y2="112" stroke={s} strokeWidth="1.5" opacity="0.3" />
    <circle cx="90" cy="125" r="18" fill={c} opacity="0.4" />
    <circle cx="230" cy="125" r="18" fill={c} opacity="0.4" />
    <text x="90" y="129" fill="white" fontSize="8" textAnchor="middle" opacity="0.7">Client</text>
    <text x="230" y="129" fill="white" fontSize="8" textAnchor="middle" opacity="0.7">Client</text>
    {/* Level 3 */}
    <line x1="90" y1="143" x2="55" y2="172" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="90" y1="143" x2="125" y2="172" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="230" y1="143" x2="195" y2="172" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="230" y1="143" x2="265" y2="172" stroke={s} strokeWidth="1" opacity="0.2" />
    <circle cx="55" cy="182" r="14" fill={c} opacity="0.3" />
    <circle cx="125" cy="182" r="14" fill={c} opacity="0.3" />
    <circle cx="195" cy="182" r="14" fill={c} opacity="0.3" />
    <circle cx="265" cy="182" r="14" fill={c} opacity="0.3" />
    {/* Referral arrow looping back */}
    <path d="M265 196 Q280 225 250 240 Q210 258 160 250 Q110 242 75 225 Q45 210 55 196" stroke={s} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35" fill="none" />
    <text x="160" y="265" fill="white" fontSize="9" textAnchor="middle" opacity="0.4">Referral flywheel</text>
    {/* Thought bubble / content */}
    <path d="M160 35 C155 25 145 20 148 15" stroke={s} strokeWidth="1" opacity="0.25" />
    <circle cx="148" cy="12" r="4" fill={s} opacity="0.2" />
    <circle cx="143" cy="7" r="3" fill={s} opacity="0.15" />
    <circle cx="138" cy="3" r="2" fill={s} opacity="0.1" />
  </svg>
);

const Hospitality = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Hotel building */}
    <rect x="90" y="100" width="140" height="140" rx="4" fill={s} opacity="0.12" stroke={s} strokeWidth="1.5" />
    {/* Roof / pediment */}
    <path d="M80 102 L160 62 L240 102" stroke={s} strokeWidth="2" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Windows grid */}
    {[0,1,2,3].map(row => (
      [0,1,2].map(col => (
        <rect key={`${row}-${col}`} x={105 + col*38} y={115 + row*32} width="24" height="20" rx="2" fill="white" opacity={0.05 + Math.random() * 0.15} />
      ))
    ))}
    {/* Door */}
    <rect x="145" y="205" width="30" height="35" rx="3" fill={c} opacity="0.35" />
    <circle cx="171" cy="222" r="3" fill="white" opacity="0.4" />
    {/* Flag */}
    <line x1="160" y1="62" x2="160" y2="42" stroke={s} strokeWidth="1.5" opacity="0.4" />
    <path d="M160 42 L180 48 L160 55Z" fill={c} opacity="0.5" />
    {/* OTA crossed out */}
    <rect x="32" y="170" width="45" height="30" rx="4" fill={s} opacity="0.1" />
    <text x="54" y="189" fill="white" fontSize="9" textAnchor="middle" opacity="0.4">OTA</text>
    <line x1="32" y1="170" x2="77" y2="200" stroke="red" strokeWidth="2" opacity="0.35" />
    <line x1="77" y1="170" x2="32" y2="200" stroke="red" strokeWidth="2" opacity="0.35" />
    {/* Direct booking arrow */}
    <path d="M82 185 C95 185 105 178 115 175" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <text x="118" y="178" fill="white" fontSize="8" opacity="0.5">Direct</text>
    {/* Stars / loyalty */}
    {[0,1,2,3,4].map(i => (
      <text key={i} x={96 + i * 26} y="258" fill={c} fontSize="16" opacity="0.5">★</text>
    ))}
    {/* Email loyalty card */}
    <rect x="240" y="165" width="55" height="38" rx="6" fill={s} opacity="0.15" stroke={s} strokeWidth="1" />
    <text x="267" y="183" fill="white" fontSize="8" textAnchor="middle" opacity="0.5">Loyalty</text>
    <text x="267" y="196" fill="white" fontSize="8" textAnchor="middle" opacity="0.5">Member</text>
  </svg>
);

const ILLUSTRATIONS = {
  saas:         SaaS,
  ecommerce:    Ecommerce,
  realestate:   RealEstate,
  healthcare:   Healthcare,
  fintech:      Fintech,
  logistics:    Logistics,
  professional: Professional,
  hospitality:  Hospitality,
};

const ACCENT_COLORS = {
  saas:         { c: 'oklch(0.58 0.18 250)', s: 'oklch(0.72 0.14 250)' },
  ecommerce:    { c: 'oklch(0.62 0.18 160)', s: 'oklch(0.75 0.14 160)' },
  realestate:   { c: 'oklch(0.62 0.18 50)',  s: 'oklch(0.76 0.14 50)'  },
  healthcare:   { c: 'oklch(0.60 0.18 195)', s: 'oklch(0.74 0.14 195)' },
  fintech:      { c: 'oklch(0.60 0.18 220)', s: 'oklch(0.74 0.14 220)' },
  logistics:    { c: 'oklch(0.62 0.16 30)',  s: 'oklch(0.76 0.12 30)'  },
  professional: { c: 'oklch(0.60 0.20 290)', s: 'oklch(0.74 0.15 290)' },
  hospitality:  { c: 'oklch(0.62 0.20 55)',  s: 'oklch(0.78 0.16 55)'  },
};

export default function IndustryIllustration({ id }) {
  const Illustration = ILLUSTRATIONS[id];
  const colors = ACCENT_COLORS[id] ?? { c: 'oklch(0.60 0.18 250)', s: 'oklch(0.74 0.14 250)' };
  if (!Illustration) return null;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Illustration c={colors.c} s={colors.s} />
    </div>
  );
}
