// Realistic animal illustrations for niche hub pages.
// Upgraded with organic contours, volumetric gradients, and depth shading for dark hero backgrounds.

export const Eagles = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="eagleWingL" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="0.9" />
        <stop offset="100%" stopColor={c} stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="eagleWingR" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="0.9" />
        <stop offset="100%" stopColor={c} stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stopColor={s} stopOpacity="0" />
        <stop offset="100%" stopColor={s} stopOpacity="0.15" />
      </radialGradient>
    </defs>
    
    {/* Global Search / SEO Topology */}
    <circle cx="160" cy="220" r="140" fill="url(#globeGrad)" />
    <path d="M20 220 A140 140 0 0 0 300 220" stroke={s} strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
    <path d="M60 220 A100 100 0 0 0 260 220" stroke={s} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
    <path d="M160 80 L160 300 M110 90 L80 300 M210 90 L240 300" stroke={s} strokeWidth="0.8" opacity="0.2" />
    
    {/* Targeting Reticle */}
    <circle cx="160" cy="115" r="45" stroke={s} strokeWidth="1" opacity="0.15" />
    <path d="M160 60 L160 70 M160 160 L160 170 M105 115 L115 115 M205 115 L215 115" stroke={c} strokeWidth="2" opacity="0.8" />
    
    {/* Majestic Geometric Wings - Left */}
    <path d="M150 120 L110 50 L20 70 L90 135 Z" fill="url(#eagleWingL)" />
    <path d="M145 130 L90 75 L15 105 L80 150 Z" fill="url(#eagleWingL)" opacity="0.7" />
    <path d="M140 140 L80 105 L25 140 L85 165 Z" fill="url(#eagleWingL)" opacity="0.5" />
    {/* Left Wing Sharp Feathers */}
    <path d="M20 70 L10 85 L35 85 Z M15 105 L5 120 L30 120 Z M25 140 L15 155 L40 155 Z" fill={c} opacity="0.8" />

    {/* Majestic Geometric Wings - Right */}
    <path d="M170 120 L210 50 L300 70 L230 135 Z" fill="url(#eagleWingR)" />
    <path d="M175 130 L230 75 L305 105 L240 150 Z" fill="url(#eagleWingR)" opacity="0.7" />
    <path d="M180 140 L240 105 L295 140 L235 165 Z" fill="url(#eagleWingR)" opacity="0.5" />
    {/* Right Wing Sharp Feathers */}
    <path d="M300 70 L310 85 L285 85 Z M305 105 L315 120 L290 120 Z M295 140 L305 155 L280 155 Z" fill={c} opacity="0.8" />

    {/* Dynamic Body & Tail */}
    <path d="M160 110 L180 145 L160 210 L140 145 Z" fill={c} opacity="0.9" />
    <path d="M160 150 L170 195 L160 230 L150 195 Z" fill={s} opacity="0.4" />
    <path d="M140 180 L120 220 L160 205 Z M180 180 L200 220 L160 205 Z" fill={c} opacity="0.6" />

    {/* Head & Piercing Eye */}
    <path d="M150 115 L160 85 L170 115 Z" fill={c} />
    <path d="M155 105 L160 70 L165 105 Z" fill={s} opacity="0.8" />
    <path d="M160 85 L175 95 L160 100 Z" fill="white" opacity="0.9" /> {/* Beak */}
    <circle cx="158" cy="92" r="2" fill="#000" />
  </svg>
);

export const Cheetah = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      {/* Sleek metallic gradient for the upper body */}
      <linearGradient id="cheetahGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={s} stopOpacity="1" />
        <stop offset="100%" stopColor={c} stopOpacity="0.3" />
      </linearGradient>
      {/* Digital motion blur for the background */}
      <linearGradient id="motionFade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={s} stopOpacity="0" />
        <stop offset="80%" stopColor={s} stopOpacity="0.4" />
        <stop offset="100%" stopColor={s} stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* PPC Target Grid & Speed Lines */}
    <circle cx="200" cy="120" r="100" stroke={s} strokeWidth="1" strokeDasharray="2 6" opacity="0.15" />
    <circle cx="200" cy="120" r="50" stroke={s} strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />
    <path d="M 0 120 L 320 120 M 200 0 L 200 280" stroke={s} strokeWidth="0.8" opacity="0.1" />
    
    <path d="M 20 150 L 120 150 M 50 170 L 160 170 M 10 130 L 80 130" stroke="url(#motionFade)" strokeWidth="2" strokeLinecap="round" />
    <path d="M 60 90 L 180 90" stroke={c} strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />

    {/* FAR LEGS (Adding depth behind the core body) */}
    <path d="M 85 105 C 65 125, 45 150, 30 155 C 45 160, 65 140, 95 120 Z" fill={c} opacity="0.6" />
    <path d="M 240 120 C 260 145, 290 170, 305 175 C 300 165, 270 135, 250 110 Z" fill={c} opacity="0.6" />

    {/* TWO-TONE CHEETAH: Upper Body (Sleek Gradient Frame) */}
    {/* This forms the head, back, tail, and upper hips */}
    <path d="
      M 265 80
      C 255 75, 245 75, 240 82 
      L 235 90
      C 205 92, 175 92, 125 85
      C 95 80, 80 85, 65 95
      C 40 105, 15 105, 5 105
      C 20 115, 45 115, 60 105
      C 75 115, 95 125, 125 120
      C 155 115, 180 105, 200 110
      C 220 115, 235 125, 245 120
      C 255 110, 260 95, 265 80 Z" 
      fill="url(#cheetahGrad)" />

    {/* TWO-TONE CHEETAH: Lower Body (Deep Muscular Shadow) */}
    {/* This creates the extreme belly tuck, deep chest, and near legs */}
    <path d="
      M 60 105
      C 40 125, 20 145, 10 150
      C 25 155, 45 140, 70 120
      C 95 130, 120 120, 140 115
      C 170 110, 190 135, 215 135
      C 250 155, 285 190, 305 195
      C 310 185, 280 150, 255 120
      C 245 125, 220 115, 200 110
      C 180 105, 155 115, 125 120
      C 95 125, 75 115, 60 105 Z" 
      fill={c} />

    {/* FACIAL DETAILS & AERODYNAMICS */}
    {/* Ear */}
    <path d="M 245 75 L 240 82 L 235 78 Z" fill={c} />
    {/* Snout outline / open jaw simulation */}
    <path d="M 265 80 L 270 85 L 265 92" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 258 92 L 263 88" stroke={c} strokeWidth="1" opacity="0.6" />
    {/* Fierce High-contrast Eye */}
    <circle cx="250" cy="85" r="2.5" fill="white" />
    <circle cx="251" cy="85" r="1.2" fill="#000" />
    {/* Signature Cheetah Tear Line */}
    <path d="M 252 87 C 250 92, 245 97, 240 102" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* DENSE SIGNATURE SPOTS (Mapped organically along the upper body arch) */}
    <ellipse cx="205" cy="92" rx="2.5" ry="4" fill={c} transform="rotate(10 205 92)" />
    <ellipse cx="220" cy="96" rx="2" ry="3.5" fill={c} transform="rotate(15 220 96)" />
    <ellipse cx="185" cy="91" rx="3" ry="5" fill={c} transform="rotate(5 185 91)" />
    <ellipse cx="165" cy="88" rx="3.5" ry="6" fill={c} transform="rotate(0 165 88)" />
    <ellipse cx="145" cy="89" rx="3.5" ry="5" fill={c} transform="rotate(-5 145 89)" />
    <ellipse cx="125" cy="92" rx="4" ry="5" fill={c} transform="rotate(-10 125 92)" />
    <ellipse cx="105" cy="96" rx="3" ry="4" fill={c} transform="rotate(-15 105 96)" />
    <ellipse cx="85" cy="102" rx="2.5" ry="4" fill={c} transform="rotate(-25 85 102)" />
    
    <ellipse cx="190" cy="100" rx="2.5" ry="4" fill={c} transform="rotate(10 190 100)" />
    <ellipse cx="170" cy="98" rx="2.5" ry="4" fill={c} transform="rotate(5 170 98)" />
    <ellipse cx="150" cy="98" rx="2.5" ry="4" fill={c} transform="rotate(0 150 98)" />
    <ellipse cx="130" cy="102" rx="2.5" ry="3" fill={c} transform="rotate(-5 130 102)" />
    <ellipse cx="110" cy="106" rx="2" ry="3" fill={c} transform="rotate(-15 110 106)" />
    
    <circle cx="230" cy="92" r="1.5" fill={c} />
    <circle cx="215" cy="104" r="1.5" fill={c} />
    <ellipse cx="180" cy="106" rx="1.5" ry="2" fill={c} transform="rotate(10 180 106)" />
    
    {/* Tail Base Spots */}
    <ellipse cx="70" cy="105" rx="1.5" ry="2.5" fill={c} transform="rotate(-30 70 105)" />
    <circle cx="55" cy="108" r="1.5" fill={c} />
    <circle cx="40" cy="110" r="1" fill={c} />
  </svg>
);

const Dolphin = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="dolphinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="1" />
        <stop offset="100%" stopColor={c} stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Connection network */}
    {[ [80,60], [240,55], [55,180], [265,175], [160,30] ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="5" fill={s} opacity="0.5" />
    ))}
    <path d="M80 60 L160 30 L240 55 L265 175 L55 180 Z" stroke={s} strokeWidth="1" opacity="0.2" fill="none" />
    
    {/* Waves */}
    <path d="M20 240 Q80 220 160 240 Q240 260 300 240" stroke={s} strokeWidth="2" opacity="0.4" fill="none" />
    
    {/* Dolphin Body - Streamlined realistic curve */}
    <path d="M60 195 C80 150 130 110 180 100 C230 90 260 105 270 115 C250 135 200 145 150 165 C110 180 80 210 60 195Z" fill="url(#dolphinGrad)" />
    
    {/* Dorsal Fin */}
    <path d="M165 105 C170 75 190 65 200 70 C195 90 185 110 175 110Z" fill={c} />
    
    {/* Pectoral Fin */}
    <path d="M185 135 C195 155 185 175 175 180 C170 160 175 145 185 135Z" fill={c} opacity="0.8" />
    
    {/* Snout/Beak */}
    <path d="M265 110 C280 108 295 115 290 120 C280 122 265 120 260 115Z" fill={c} opacity="0.9" />
    
    {/* Tail Flukes */}
    <path d="M65 190 C45 185 30 175 25 180 C35 195 45 205 60 200 C50 215 45 230 55 235 C65 220 75 205 70 195Z" fill="url(#dolphinGrad)" />
    
    {/* Eye */}
    <circle cx="250" cy="108" r="4" fill="white" />
    <circle cx="250" cy="108" r="2" fill="#000" />
    
    {/* Belly Highlight */}
    <path d="M100 170 C130 145 170 130 210 125" stroke="white" strokeWidth="2" opacity="0.2" strokeLinecap="round" fill="none" />
  </svg>
);

const Bear = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="bearGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor={c} stopOpacity="1" />
        <stop offset="100%" stopColor={c} stopOpacity="0.5" />
      </radialGradient>
    </defs>
    {/* Map grid */}
    {[0, 1, 2, 3].map(i => (
      <line key={`h${i}`} x1="30" y1={80 + i * 55} x2="290" y2={80 + i * 55} stroke={s} strokeWidth="1" opacity="0.15" />
    ))}
    {[0, 1, 2, 3, 4].map(i => (
      <line key={`v${i}`} x1={50 + i * 55} y1="60" x2={50 + i * 55} y2="260" stroke={s} strokeWidth="1" opacity="0.15" />
    ))}
    
    {/* Bear Head - Anatomical shape instead of circle */}
    <path d="M100 150 C100 110 130 90 160 90 C190 90 220 110 220 150 C220 190 195 215 160 215 C125 215 100 190 100 150Z" fill="url(#bearGrad)" />
    
    {/* Fluffy Cheeks / Neck bulk */}
    <path d="M105 160 C85 180 100 220 130 210 C140 225 180 225 190 210 C220 220 235 180 215 160Z" fill={c} opacity="0.8" />
    
    {/* Ears */}
    <path d="M110 110 C95 90 115 70 130 85 C125 95 120 105 110 110Z" fill={c} />
    <path d="M210 110 C225 90 205 70 190 85 C195 95 200 105 210 110Z" fill={c} />
    
    {/* Muzzle */}
    <path d="M135 165 C135 145 185 145 185 165 C185 195 135 195 135 165Z" fill={s} opacity="0.4" />
    
    {/* Nose */}
    <path d="M150 160 C150 155 170 155 170 160 C170 170 150 170 150 160Z" fill="#111" opacity="0.8" />
    
    {/* Eyes */}
    <circle cx="140" cy="140" r="5" fill="white" />
    <circle cx="140" cy="140" r="2.5" fill="#000" />
    <circle cx="180" cy="140" r="5" fill="white" />
    <circle cx="180" cy="140" r="2.5" fill="#000" />
    
    {/* Territory rings */}
    <circle cx="160" cy="155" r="85" stroke={s} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" fill="none" />
  </svg>
);

const Owl = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="owlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="1" />
        <stop offset="100%" stopColor={c} stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Bar chart / Night cityscape */}
    {[ [58,170,50], [82,145,75], [106,130,90], [196,138,82], [220,150,70], [244,172,48] ].map(([x, y, h], i) => (
      <rect key={i} x={x} y={y} width="18" height={h} rx="2" fill={s} opacity="0.2" />
    ))}
    <polyline points="67,170 91,145 115,130 160,118 205,138 229,150 253,172" stroke={s} strokeWidth="2" opacity="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Owl Body - Plump, realistic curve */}
    <path d="M120 150 C100 190 120 230 160 230 C200 230 220 190 200 150 Z" fill="url(#owlGrad)" />
    
    {/* Wings folded */}
    <path d="M120 150 C95 180 105 220 130 225 C115 200 125 170 140 155 Z" fill={c} opacity="0.7" />
    <path d="M200 150 C225 180 215 220 190 225 C205 200 195 170 180 155 Z" fill={c} opacity="0.7" />
    
    {/* Head & Facial Disc (Heart shape) */}
    <path d="M115 110 C115 75 205 75 205 110 C205 140 160 150 160 150 C160 150 115 140 115 110Z" fill="url(#owlGrad)" />
    <path d="M120 110 C120 85 160 95 160 115 C160 95 200 85 200 110 C200 135 160 145 160 145 C160 145 120 135 120 110Z" fill={s} opacity="0.3" />
    
    {/* Ear Tufts */}
    <path d="M125 85 C115 70 120 60 135 70 Z" fill={c} />
    <path d="M195 85 C205 70 200 60 185 70 Z" fill={c} />
    
    {/* Large Eyes */}
    <circle cx="142" cy="112" r="14" fill="white" />
    <circle cx="142" cy="112" r="8" fill={c} />
    <circle cx="142" cy="112" r="4" fill="#000" />
    <circle cx="178" cy="112" r="14" fill="white" />
    <circle cx="178" cy="112" r="8" fill={c} />
    <circle cx="178" cy="112" r="4" fill="#000" />
    
    {/* Beak */}
    <path d="M156 125 L164 125 L160 138 Z" fill={s} opacity="0.8" />
    
    {/* Talons */}
    <path d="M140 230 C135 240 145 245 145 230 M150 230 C145 240 155 245 155 230 M165 230 C160 240 170 245 170 230 M175 230 C170 240 180 245 180 230" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const Elephant = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="elephantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="1" />
        <stop offset="100%" stopColor={c} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Document Stacks */}
    <rect x="35" y="140" width="50" height="70" rx="3" fill={s} opacity="0.15" />
    <rect x="40" y="130" width="50" height="70" rx="3" fill={s} opacity="0.2" />
    <rect x="230" y="130" width="50" height="70" rx="3" fill={s} opacity="0.2" />
    <path d="M200 80 C220 70 240 75 255 65" stroke={s} strokeWidth="2" opacity="0.5" fill="none" />
    
    {/* Massive Body */}
    <path d="M110 160 C90 200 120 240 160 240 C200 240 230 200 210 160 Z" fill="url(#elephantGrad)" opacity="0.9" />
    
    {/* Large African Ears - Folded & realistic */}
    <path d="M140 100 C80 80 60 140 90 170 C105 185 130 160 140 140 Z" fill={c} opacity="0.85" />
    <path d="M180 100 C240 80 260 140 230 170 C215 185 190 160 180 140 Z" fill={c} opacity="0.85" />
    
    {/* Head shape with domed crown */}
    <path d="M130 120 C130 80 190 80 190 120 C190 150 175 160 160 160 C145 160 130 150 130 120Z" fill="url(#elephantGrad)" />
    
    {/* Sweeping Trunk with wrinkles */}
    <path d="M145 150 C145 190 120 220 125 240 C130 250 145 250 150 240 C155 220 170 190 170 150 Z" fill={c} />
    <line x1="140" y1="180" x2="165" y2="180" stroke={s} strokeWidth="1" opacity="0.4" />
    <line x1="135" y1="200" x2="158" y2="200" stroke={s} strokeWidth="1" opacity="0.4" />
    <line x1="130" y1="220" x2="152" y2="220" stroke={s} strokeWidth="1" opacity="0.4" />
    
    {/* Tusks */}
    <path d="M135 155 C120 170 105 180 95 180 C110 185 125 175 140 165 Z" fill="white" opacity="0.7" />
    <path d="M185 155 C200 170 215 180 225 180 C210 185 195 175 180 165 Z" fill="white" opacity="0.7" />
    
    {/* Small wise eyes */}
    <circle cx="145" cy="125" r="3" fill="#111" />
    <circle cx="175" cy="125" r="3" fill="#111" />
  </svg>
);

export const Hummingbird = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="bodyGrad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="1" />
        <stop offset="60%" stopColor={c} stopOpacity="0.8" />
        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="bellyGrad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
        <stop offset="100%" stopColor="white" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={s} stopOpacity="0.4" />
        <stop offset="100%" stopColor={s} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="wingMotion" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={c} stopOpacity="0.8" />
        <stop offset="100%" stopColor={c} stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Background Tech/Email Grid */}
    <path d="M20 240 L140 270 L300 220" stroke={s} strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
    <path d="M60 200 L120 230 L260 170" stroke={s} strokeWidth="1" opacity="0.15" />
    
    {/* Delivery Target / Nectar Node */}
    <circle cx="260" cy="90" r="45" fill="url(#targetGlow)" />
    <circle cx="260" cy="90" r="12" stroke={s} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
    <circle cx="260" cy="90" r="3" fill={s} />
    <path d="M260 40 L260 140 M210 90 L310 90" stroke={s} strokeWidth="1" opacity="0.2" />

    {/* Rapid Wings - Layered overlapping arrays mimicking motion blur */}
    {/* Far Wing */}
    <path d="M150 135 L60 80 L100 65 Z" fill="url(#wingMotion)" opacity="0.4" />
    <path d="M150 135 L50 95 L90 75 Z" fill={c} opacity="0.3" />
    <path d="M150 135 L45 110 L85 90 Z" fill={s} opacity="0.3" />
    
    {/* Near Wing */}
    <path d="M145 145 C110 110 50 110 30 115 C70 135 120 155 145 145 Z" fill="url(#wingMotion)" opacity="0.6" />
    <path d="M145 145 L40 130 L90 140 Z" fill={c} opacity="0.7" />
    <path d="M145 145 L45 145 L100 155 Z" fill={s} opacity="0.5" />
    
    {/* Feather Blades for Near Wing */}
    <path d="M140 140 L35 120 L40 125 Z M140 140 L45 135 L50 140 Z M140 140 L60 150 L65 155 Z" fill={c} opacity="0.8" />

    {/* Flared Tail Feathers (matching the pointed downward angle) */}
    <path d="M95 175 L40 225 L75 190 Z" fill={c} opacity="0.9" />
    <path d="M95 175 L30 210 L65 180 Z" fill="url(#bodyGrad)" />
    <path d="M95 175 L55 235 L85 200 Z" fill={s} opacity="0.5" />

    {/* Core Body - Much plumper, arched back and fuller belly */}
    <path d="M85 180 C110 135 165 125 185 135 C175 185 120 205 85 180 Z" fill="url(#bodyGrad)" />
    
    {/* White Belly Under-layer */}
    <path d="M95 180 C125 160 160 150 175 140 C155 180 125 195 95 180 Z" fill="url(#bellyGrad)" />

    {/* Head - Rounder and larger to match the body */}
    <path d="M175 130 C170 100 205 105 210 120 C215 135 195 150 175 130 Z" fill={c} />
    
    {/* Textured Gorget (Throat Patch) - Shifted to match the new larger chest */}
    <path d="M185 135 L195 150 L205 130 Z" fill={s} opacity="0.9" />
    <path d="M188 145 L198 160 L203 140 Z" fill={s} opacity="0.7" />
    <path d="M178 130 L188 142 L193 125 Z" fill={s} />

    {/* Shorter Beak - Accurately proportioned, pointing at the target but not touching it */}
    <path d="M205 116 L240 104 L205 122 Z" fill={c} opacity="0.95" />
    <path d="M205 119 L240 104" stroke={s} strokeWidth="0.5" opacity="0.8" />

    {/* High-contrast Eye & Brow */}
    <circle cx="195" cy="115" r="4.5" fill="white" />
    <circle cx="196" cy="115" r="2.5" fill="#000" />
    <circle cx="197" cy="114" r="1" fill="white" />
    <path d="M185 110 C190 108 195 110 198 114" stroke={s} strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Tiny Tucked Feet - Moved down to the new belly line */}
    <path d="M130 190 L125 200 L130 202 M140 185 L135 195 L140 197" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
  </svg>
);

const Chameleon = ({ c, s }) => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="chamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={c} stopOpacity="1" />
        <stop offset="100%" stopColor={s} stopOpacity="0.8" />
      </linearGradient>
    </defs>
    {/* A/B Testing Background */}
    <line x1="160" y1="30" x2="160" y2="260" stroke={s} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
    
    {/* Chameleon Body - Arched back, sagging belly */}
    <path d="M90 160 C90 130 150 120 190 140 C210 150 210 180 190 195 C150 215 100 200 90 160 Z" fill="url(#chamGrad)" />
    
    {/* Head & Casque (Helmet ridge) */}
    <path d="M185 150 C210 140 240 145 245 160 C250 175 220 190 195 185 Z" fill={c} />
    <path d="M190 150 C205 110 235 130 240 155 Z" fill="url(#chamGrad)" opacity="0.9" />
    
    {/* Serrated Back Ridge */}
    <path d="M100 142 L110 135 L120 140 L130 132 L140 138 L150 130 L160 136 L170 132 L180 140" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Turret Eye */}
    <circle cx="225" cy="165" r="12" fill={c} stroke={s} strokeWidth="2" opacity="0.9" />
    <circle cx="228" cy="165" r="4" fill="#111" />
    <circle cx="229" cy="164" r="1.5" fill="white" />
    
    {/* Prehensile Coiled Tail */}
    <path d="M95 170 C60 170 45 200 65 215 C85 230 110 210 100 195 C90 180 75 190 80 200 C85 210 95 205 90 195" stroke="url(#chamGrad)" strokeWidth="10" fill="none" strokeLinecap="round" />
    
    {/* Articulated Legs & Grasping Feet */}
    <path d="M120 195 L110 220 L125 225 M170 190 L180 220 L165 225" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    
    {/* Darting Tongue */}
    <path d="M245 170 Q270 165 290 165" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="292" cy="165" r="4" fill={s} opacity="0.8" />
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