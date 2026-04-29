// Geometric animal illustrations for niche hub pages.
// Each SVG is designed to display on the dark hero background.

const Eagles = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Radar / search rings */}
    <circle cx="160" cy="140" r="110" stroke={s} strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
    <circle cx="160" cy="140" r="75" stroke={s} strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
    <circle cx="160" cy="140" r="40" stroke={s} strokeWidth="1.5" opacity="0.5" />
    {/* Crosshairs */}
    <line x1="160" y1="30" x2="160" y2="250" stroke={s} strokeWidth="0.8" opacity="0.2" />
    <line x1="50" y1="140" x2="270" y2="140" stroke={s} strokeWidth="0.8" opacity="0.2" />
    {/* Eagle body */}
    <ellipse cx="160" cy="145" rx="22" ry="28" fill={c} opacity="0.9" />
    {/* Wings */}
    <path d="M138 138 C110 118 72 122 50 108 C72 130 108 140 138 148Z" fill={c} opacity="0.85" />
    <path d="M182 138 C210 118 248 122 270 108 C248 130 212 140 182 148Z" fill={c} opacity="0.85" />
    {/* Wing secondary feathers */}
    <path d="M138 138 C115 125 88 132 68 124" stroke={c} strokeWidth="1.5" opacity="0.5" />
    <path d="M182 138 C205 125 232 132 252 124" stroke={c} strokeWidth="1.5" opacity="0.5" />
    {/* Head */}
    <circle cx="160" cy="118" r="18" fill={c} />
    {/* Beak */}
    <path d="M160 118 L175 125 L160 130Z" fill={s} opacity="0.7" />
    {/* Eye */}
    <circle cx="153" cy="114" r="5" fill="white" opacity="0.9" />
    <circle cx="153" cy="114" r="2.5" fill={c} />
    <circle cx="152" cy="113" r="1" fill="white" />
    {/* Tail */}
    <path d="M148 173 L155 195 L160 188 L165 195 L172 173Z" fill={c} opacity="0.7" />
    {/* Altitude lines — trending up */}
    <polyline points="55,220 85,200 115,185 145,165" stroke={s} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="175,165 205,185 235,200 265,220" stroke={s} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Data points */}
    <circle cx="115" cy="185" r="3" fill={s} opacity="0.6" />
    <circle cx="145" cy="165" r="3" fill={s} opacity="0.6" />
    <circle cx="175" cy="165" r="3" fill={s} opacity="0.6" />
    <circle cx="205" cy="185" r="3" fill={s} opacity="0.6" />
  </svg>
);

const Cheetah = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Speed lines */}
    {[60, 80, 100, 120, 140, 160, 180, 200].map((y, i) => (
      <line key={i} x1="20" y1={y} x2={80 + (i % 3) * 20} y2={y} stroke={s} strokeWidth="1.5" opacity={0.1 + i * 0.03} />
    ))}
    {/* Target ROI circle */}
    <circle cx="220" cy="100" r="55" stroke={s} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35" />
    <circle cx="220" cy="100" r="35" stroke={s} strokeWidth="1.5" opacity="0.45" />
    <circle cx="220" cy="100" r="15" fill={c} opacity="0.6" />
    <line x1="220" y1="40" x2="220" y2="160" stroke={s} strokeWidth="0.8" opacity="0.25" />
    <line x1="160" y1="100" x2="280" y2="100" stroke={s} strokeWidth="0.8" opacity="0.25" />
    {/* Cheetah body — sleek horizontal silhouette */}
    <ellipse cx="135" cy="158" rx="60" ry="22" fill={c} opacity="0.9" />
    {/* Head */}
    <ellipse cx="192" cy="148" rx="22" ry="18" fill={c} />
    {/* Ear */}
    <path d="M200 132 L210 118 L218 132Z" fill={c} opacity="0.8" />
    <path d="M180 133 L170 119 L178 133Z" fill={c} opacity="0.8" />
    {/* Snout */}
    <ellipse cx="208" cy="154" rx="12" ry="8" fill={c} opacity="0.8" />
    {/* Eye */}
    <circle cx="197" cy="145" r="5" fill="white" opacity="0.9" />
    <circle cx="197" cy="145" r="2.5" fill={c} />
    <circle cx="196" cy="144" r="1" fill="white" />
    {/* Tear mark */}
    <path d="M196 150 L193 158" stroke={s} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    {/* Legs */}
    <path d="M90 178 L82 215 M110 178 L104 215 M150 180 L142 215 M170 180 L174 215" stroke={c} strokeWidth="8" strokeLinecap="round" opacity="0.85" />
    {/* Tail */}
    <path d="M76 158 C55 148 40 155 28 145" stroke={c} strokeWidth="8" strokeLinecap="round" opacity="0.7" />
    {/* Spots */}
    <circle cx="120" cy="150" r="5" fill={s} opacity="0.25" />
    <circle cx="138" cy="165" r="4" fill={s} opacity="0.25" />
    <circle cx="155" cy="148" r="4" fill={s} opacity="0.25" />
    <circle cx="108" cy="165" r="3.5" fill={s} opacity="0.25" />
  </svg>
);

const Dolphin = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Connection network */}
    <circle cx="80" cy="60" r="6" fill={s} opacity="0.4" />
    <circle cx="240" cy="55" r="6" fill={s} opacity="0.4" />
    <circle cx="55" cy="180" r="6" fill={s} opacity="0.4" />
    <circle cx="265" cy="175" r="6" fill={s} opacity="0.4" />
    <circle cx="160" cy="30" r="6" fill={s} opacity="0.4" />
    <line x1="80" y1="60" x2="160" y2="30" stroke={s} strokeWidth="1" opacity="0.25" />
    <line x1="160" y1="30" x2="240" y2="55" stroke={s} strokeWidth="1" opacity="0.25" />
    <line x1="80" y1="60" x2="55" y2="180" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="240" y1="55" x2="265" y2="175" stroke={s} strokeWidth="1" opacity="0.2" />
    <line x1="55" y1="180" x2="265" y2="175" stroke={s} strokeWidth="1" opacity="0.15" />
    {/* Leaping arc path */}
    <path d="M45 230 Q160 20 275 230" stroke={s} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.3" />
    {/* Wave at bottom */}
    <path d="M30 248 Q80 230 130 248 Q180 266 230 248 Q280 230 310 248" stroke={s} strokeWidth="1.5" opacity="0.3" />
    <path d="M30 262 Q80 244 130 262 Q180 280 230 262 Q280 244 310 262" stroke={s} strokeWidth="1" opacity="0.15" />
    {/* Dolphin body */}
    <path d="M85 185 C95 155 120 120 160 95 C200 70 240 75 260 90 C240 115 210 130 175 140 C150 148 130 160 125 185 C115 200 95 205 85 185Z" fill={c} opacity="0.9" />
    {/* Fin */}
    <path d="M175 140 C185 110 205 100 215 90 C205 115 195 135 175 140Z" fill={c} />
    {/* Snout */}
    <path d="M258 90 L285 80 L270 100Z" fill={c} opacity="0.85" />
    {/* Eye */}
    <circle cx="248" cy="88" r="7" fill="white" opacity="0.9" />
    <circle cx="248" cy="88" r="3.5" fill={c} />
    <circle cx="247" cy="87" r="1.5" fill="white" />
    {/* Tail fin */}
    <path d="M85 185 L60 175 L70 195 L55 210 L85 195Z" fill={c} opacity="0.8" />
    {/* Belly highlight */}
    <path d="M100 175 C115 155 140 140 165 140" stroke="white" strokeWidth="2" opacity="0.15" strokeLinecap="round" />
  </svg>
);

const Bear = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Map grid */}
    {[0, 1, 2, 3].map(i => (
      <line key={`h${i}`} x1="30" y1={80 + i * 55} x2="290" y2={80 + i * 55} stroke={s} strokeWidth="0.8" opacity="0.12" />
    ))}
    {[0, 1, 2, 3, 4].map(i => (
      <line key={`v${i}`} x1={50 + i * 55} y1="60" x2={50 + i * 55} y2="260" stroke={s} strokeWidth="0.8" opacity="0.12" />
    ))}
    {/* Location pin */}
    <path d="M160 40 C140 40 124 56 124 76 C124 104 160 140 160 140 C160 140 196 104 196 76 C196 56 180 40 160 40Z" fill={c} opacity="0.25" />
    <circle cx="160" cy="76" r="16" fill={c} opacity="0.4" />
    {/* Bear head */}
    <circle cx="160" cy="155" r="52" fill={c} opacity="0.95" />
    {/* Ears */}
    <circle cx="118" cy="112" r="20" fill={c} />
    <circle cx="118" cy="112" r="12" fill={s} opacity="0.3" />
    <circle cx="202" cy="112" r="20" fill={c} />
    <circle cx="202" cy="112" r="12" fill={s} opacity="0.3" />
    {/* Snout */}
    <ellipse cx="160" cy="170" rx="26" ry="20" fill={s} opacity="0.25" />
    {/* Nose */}
    <ellipse cx="160" cy="162" rx="10" ry="7" fill={s} opacity="0.5" />
    {/* Eyes */}
    <circle cx="143" cy="148" r="8" fill="white" opacity="0.9" />
    <circle cx="143" cy="148" r="4" fill={c} />
    <circle cx="141" cy="146" r="1.5" fill="white" />
    <circle cx="177" cy="148" r="8" fill="white" opacity="0.9" />
    <circle cx="177" cy="148" r="4" fill={c} />
    <circle cx="175" cy="146" r="1.5" fill="white" />
    {/* Mouth */}
    <path d="M152 175 Q160 182 168 175" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    {/* Territory rings */}
    <circle cx="160" cy="155" r="70" stroke={s} strokeWidth="1" strokeDasharray="4 6" opacity="0.2" />
    <circle cx="160" cy="155" r="90" stroke={s} strokeWidth="1" strokeDasharray="4 8" opacity="0.12" />
  </svg>
);

const Owl = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Grid lines */}
    <line x1="40" y1="220" x2="280" y2="220" stroke={s} strokeWidth="1" opacity="0.25" />
    <line x1="40" y1="180" x2="280" y2="180" stroke={s} strokeWidth="0.8" opacity="0.15" />
    <line x1="40" y1="140" x2="280" y2="140" stroke={s} strokeWidth="0.8" opacity="0.15" />
    {/* Bar chart columns as feathers */}
    <rect x="58" y="170" width="18" height="50" rx="3" fill={s} opacity="0.2" />
    <rect x="82" y="145" width="18" height="75" rx="3" fill={s} opacity="0.25" />
    <rect x="106" y="130" width="18" height="90" rx="3" fill={s} opacity="0.3" />
    <rect x="196" y="138" width="18" height="82" rx="3" fill={s} opacity="0.3" />
    <rect x="220" y="150" width="18" height="70" rx="3" fill={s} opacity="0.25" />
    <rect x="244" y="172" width="18" height="48" rx="3" fill={s} opacity="0.2" />
    {/* Trend line */}
    <polyline points="67,170 91,145 115,130 160,118 205,138 229,150 253,172" stroke={c} strokeWidth="2" opacity="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Owl body */}
    <ellipse cx="160" cy="175" rx="38" ry="48" fill={c} opacity="0.9" />
    {/* Wings */}
    <path d="M122 175 C100 165 85 175 75 195 C92 185 112 180 122 185Z" fill={c} opacity="0.8" />
    <path d="M198 175 C220 165 235 175 245 195 C228 185 208 180 198 185Z" fill={c} opacity="0.8" />
    {/* Head */}
    <circle cx="160" cy="133" r="38" fill={c} />
    {/* Ear tufts */}
    <path d="M141 100 L135 80 L150 96Z" fill={c} />
    <path d="M179 100 L185 80 L170 96Z" fill={c} />
    {/* Facial disc */}
    <ellipse cx="160" cy="135" rx="34" ry="32" stroke={s} strokeWidth="1.5" opacity="0.3" />
    {/* Eyes — data chart circles */}
    <circle cx="145" cy="130" r="16" fill="white" opacity="0.95" />
    <circle cx="145" cy="130" r="10" fill={c} />
    <circle cx="145" cy="130" r="5" fill={s} opacity="0.8" />
    <circle cx="143" cy="128" r="2" fill="white" />
    <circle cx="175" cy="130" r="16" fill="white" opacity="0.95" />
    <circle cx="175" cy="130" r="10" fill={c} />
    <circle cx="175" cy="130" r="5" fill={s} opacity="0.8" />
    <circle cx="173" cy="128" r="2" fill="white" />
    {/* Beak */}
    <path d="M152 140 L160 152 L168 140Z" fill={s} opacity="0.5" />
    {/* Feet */}
    <path d="M148 220 L138 238 M155 222 L150 240 M165 222 L170 240 M172 220 L182 238" stroke={c} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const Elephant = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Document stacks */}
    <rect x="30" y="150" width="55" height="75" rx="4" fill={s} opacity="0.12" />
    <rect x="35" y="140" width="55" height="75" rx="4" fill={s} opacity="0.15" />
    <rect x="40" y="130" width="55" height="75" rx="4" fill={s} opacity="0.18" />
    <line x1="48" y1="148" x2="87" y2="148" stroke={s} strokeWidth="1.5" opacity="0.3" />
    <line x1="48" y1="158" x2="87" y2="158" stroke={s} strokeWidth="1.5" opacity="0.25" />
    <line x1="48" y1="168" x2="75" y2="168" stroke={s} strokeWidth="1.5" opacity="0.2" />
    <rect x="235" y="140" width="55" height="75" rx="4" fill={s} opacity="0.12" />
    <rect x="230" y="130" width="55" height="75" rx="4" fill={s} opacity="0.15" />
    <line x1="238" y1="148" x2="277" y2="148" stroke={s} strokeWidth="1.5" opacity="0.3" />
    <line x1="238" y1="158" x2="277" y2="158" stroke={s} strokeWidth="1.5" opacity="0.25" />
    <line x1="238" y1="168" x2="265" y2="168" stroke={s} strokeWidth="1.5" opacity="0.2" />
    {/* Elephant body */}
    <ellipse cx="160" cy="185" rx="68" ry="55" fill={c} opacity="0.9" />
    {/* Head */}
    <circle cx="160" cy="125" r="50" fill={c} />
    {/* Ears */}
    <ellipse cx="105" cy="125" rx="32" ry="42" fill={c} opacity="0.8" />
    <ellipse cx="105" cy="125" rx="22" ry="30" fill={s} opacity="0.15" />
    <ellipse cx="215" cy="125" rx="32" ry="42" fill={c} opacity="0.8" />
    <ellipse cx="215" cy="125" rx="22" ry="30" fill={s} opacity="0.15" />
    {/* Trunk */}
    <path d="M138 155 C130 170 118 185 115 205 C112 220 120 230 130 228 C138 226 140 215 140 205 C140 195 145 182 150 175" stroke={c} strokeWidth="20" strokeLinecap="round" fill="none" opacity="0.9" />
    {/* Tusk */}
    <path d="M138 158 C128 168 118 178 108 182" stroke={s} strokeWidth="5" strokeLinecap="round" opacity="0.4" />
    {/* Eyes */}
    <circle cx="145" cy="115" r="9" fill="white" opacity="0.9" />
    <circle cx="145" cy="115" r="5" fill={c} />
    <circle cx="143" cy="113" r="2" fill="white" />
    <circle cx="175" cy="115" r="9" fill="white" opacity="0.9" />
    <circle cx="175" cy="115" r="5" fill={c} />
    <circle cx="173" cy="113" r="2" fill="white" />
    {/* Legs */}
    <rect x="120" y="228" width="22" height="40" rx="8" fill={c} opacity="0.85" />
    <rect x="148" y="230" width="22" height="38" rx="8" fill={c} opacity="0.85" />
    <rect x="178" y="228" width="22" height="40" rx="8" fill={c} opacity="0.85" />
    {/* Compounding arrow */}
    <path d="M200 80 C220 70 240 75 255 65" stroke={s} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <path d="M248 58 L258 65 L248 72" stroke={s} strokeWidth="2" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hummingbird = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Email envelope */}
    <rect x="55" y="180" width="155" height="85" rx="6" fill={s} opacity="0.12" />
    <path d="M55 186 L132 235 L210 186" stroke={s} strokeWidth="1.5" opacity="0.3" />
    <line x1="55" y1="265" x2="210" y2="265" stroke={s} strokeWidth="1" opacity="0.15" />
    {/* Envelope opening lines */}
    <line x1="75" y1="200" x2="120" y2="200" stroke={s} strokeWidth="1.5" opacity="0.2" />
    <line x1="75" y1="215" x2="115" y2="215" stroke={s} strokeWidth="1.5" opacity="0.2" />
    {/* Motion blur lines behind bird */}
    <path d="M30 138 L75 138" stroke={s} strokeWidth="2" opacity="0.15" strokeLinecap="round" />
    <path d="M35 148 L72 148" stroke={s} strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
    <path d="M40 128 L70 128" stroke={s} strokeWidth="1" opacity="0.1" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="120" cy="138" rx="42" ry="15" fill={c} opacity="0.95" />
    {/* Head */}
    <circle cx="157" cy="134" r="18" fill={c} />
    {/* Beak */}
    <path d="M172 130 L215 120 L172 138Z" fill={c} opacity="0.85" />
    {/* Eye */}
    <circle cx="162" cy="129" r="6" fill="white" opacity="0.9" />
    <circle cx="162" cy="129" r="3" fill={c} />
    <circle cx="161" cy="128" r="1.2" fill="white" />
    {/* Upper wing (blurred) */}
    <path d="M118 125 C110 95 130 65 160 55 C145 75 128 100 122 125Z" fill={c} opacity="0.55" />
    <path d="M118 125 C108 92 125 60 155 48 C138 70 125 97 122 125Z" fill={s} opacity="0.3" />
    {/* Lower wing */}
    <path d="M118 152 C108 175 125 200 150 208 C135 190 122 170 120 152Z" fill={c} opacity="0.45" />
    {/* Tail */}
    <path d="M78 135 L50 125 L60 140 L45 152 L78 142Z" fill={c} opacity="0.8" />
    {/* Flower/target the hummingbird hovers near */}
    <circle cx="248" cy="100" r="22" stroke={s} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.35" />
    <circle cx="248" cy="100" r="10" fill={c} opacity="0.3" />
    <circle cx="248" cy="100" r="4" fill={s} opacity="0.5" />
    {/* Delivery checkmark */}
    <path d="M235 245 L245 255 L268 232" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
  </svg>
);

const Chameleon = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* A/B split divider */}
    <line x1="160" y1="30" x2="160" y2="260" stroke={s} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
    <rect x="40" y="50" width="100" height="16" rx="8" fill={s} opacity="0.12" />
    <rect x="180" y="50" width="100" height="16" rx="8" fill={c} opacity="0.3" />
    <text x="90" y="63" fill="white" fontSize="9" textAnchor="middle" opacity="0.4" fontFamily="monospace">A</text>
    <text x="230" y="63" fill="white" fontSize="9" textAnchor="middle" opacity="0.6" fontFamily="monospace">B</text>
    {/* Conversion funnel */}
    <path d="M55 90 L265 90 L220 130 L100 130Z" fill={s} opacity="0.1" />
    <path d="M100 130 L220 130 L195 165 L125 165Z" fill={s} opacity="0.12" />
    <path d="M125 165 L195 165 L178 200 L142 200Z" fill={s} opacity="0.15" />
    <path d="M142 200 L178 200 L168 230 L152 230Z" fill={c} opacity="0.3" />
    {/* Chameleon body */}
    <path d="M85 165 C95 150 115 140 140 138 C165 136 185 140 200 155 C210 165 212 178 205 190 C195 205 175 210 155 208 C130 205 110 198 98 185 C88 175 82 173 85 165Z" fill={c} opacity="0.9" />
    {/* Head */}
    <path d="M200 155 C218 148 235 148 248 155 C260 162 262 175 252 183 C240 192 220 192 205 185 C193 178 190 167 200 155Z" fill={c} />
    {/* Casque / helmet ridge */}
    <path d="M210 148 C218 135 235 132 248 140 L248 155 C235 148 218 148 210 155Z" fill={c} opacity="0.8" />
    {/* Eye — spiral / data */}
    <circle cx="238" cy="168" r="14" fill="white" opacity="0.9" />
    <circle cx="238" cy="168" r="9" fill={c} />
    <circle cx="238" cy="168" r="5" fill={s} opacity="0.7" />
    <circle cx="236" cy="166" r="2" fill="white" />
    {/* Turret eye ring */}
    <circle cx="238" cy="168" r="14" stroke={s} strokeWidth="1" opacity="0.4" />
    {/* Tongue */}
    <path d="M252 172 C268 172 280 168 288 165" stroke={c} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    <circle cx="290" cy="164" r="5" fill={s} opacity="0.6" />
    {/* Spiral tail */}
    <path d="M85 172 C72 172 62 180 60 192 C58 204 66 212 78 212 C90 212 96 204 94 194 C92 186 84 182 78 185" stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85" />
    {/* Legs */}
    <path d="M120 205 L112 235 M145 208 L142 238 M165 208 L168 238 M185 202 L190 232" stroke={c} strokeWidth="7" strokeLinecap="round" opacity="0.8" />
    {/* Test tube */}
    <rect x="265" y="210" width="14" height="40" rx="7" fill={s} opacity="0.3" />
    <path d="M265 230 L279 230" stroke={s} strokeWidth="1" opacity="0.4" />
    <circle cx="272" cy="244" r="5" fill={c} opacity="0.5" />
  </svg>
);

const ILLUSTRATIONS = {
  seo:       Eagles,
  ppc:       Cheetah,
  social:    Dolphin,
  local:     Bear,
  analytics: Owl,
  content:   Elephant,
  email:     Hummingbird,
  cro:       Chameleon,
};

// oklch-based hue accent colors (vibrant, works on dark backgrounds)
const ACCENT_COLORS = {
  seo:       { c: 'oklch(0.62 0.18 160)', s: 'oklch(0.75 0.14 160)' },
  ppc:       { c: 'oklch(0.58 0.18 250)', s: 'oklch(0.72 0.14 250)' },
  social:    { c: 'oklch(0.60 0.20 290)', s: 'oklch(0.74 0.15 290)' },
  local:     { c: 'oklch(0.62 0.18 50)',  s: 'oklch(0.76 0.14 50)'  },
  analytics: { c: 'oklch(0.60 0.18 220)', s: 'oklch(0.74 0.14 220)' },
  content:   { c: 'oklch(0.62 0.16 30)',  s: 'oklch(0.76 0.12 30)'  },
  email:     { c: 'oklch(0.60 0.18 195)', s: 'oklch(0.74 0.14 195)' },
  cro:       { c: 'oklch(0.62 0.20 55)',  s: 'oklch(0.78 0.16 55)'  },
};

export default function AnimalIllustration({ id }) {
  const Illustration = ILLUSTRATIONS[id];
  const colors = ACCENT_COLORS[id] ?? { c: 'oklch(0.60 0.18 250)', s: 'oklch(0.74 0.14 250)' };
  if (!Illustration) return null;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Illustration c={colors.c} s={colors.s} />
    </div>
  );
}
