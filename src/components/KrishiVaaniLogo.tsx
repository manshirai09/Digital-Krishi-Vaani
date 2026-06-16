import React from "react";

interface KrishiVaaniLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const KrishiVaaniLogo: React.FC<KrishiVaaniLogoProps> = ({
  className = "",
  size = 48,
  showText = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`select-none ${className}`}
      aria-label="Digital KrishiVaani Logo"
      id="krishivaani-official-logo"
    >
      <defs>
        {/* Soft, warm sky gradient matching original golden hour sky */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="60%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFF59D" />
        </linearGradient>

        {/* Text curve paths - Top clockwise */}
        <path
          id="textCurveTop"
          d="M 30,100 A 70,70 0 0,1 170,100"
          fill="none"
        />

        {/* Text curve paths - Bottom clockwise (adjusted start/end so bottom text is upright and visible) */}
        <path
          id="textCurveBottom"
          d="M 34,106 A 68,68 0 0,0 166,106"
          fill="none"
        />

        {/* Clip path to restrict scenery to the inner circle */}
        <clipPath id="innerSceneryClip">
          <circle cx="100" cy="100" r="62" />
        </clipPath>

        {/* Reusable single leaf block for flanking wreaths */}
        <g id="single-leaf">
          <path
            d="M 0,0 Q -4,-8 0,-12 Q 4,-8 0,0 Z"
            fill="#6B8E23"
            className="fill-emerald-700 dark:fill-emerald-500"
          />
        </g>
      </defs>

      {/* 2. Outer Circle - Warm Cream Outer Ring Background */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="#FCF9F1"
        stroke="#113F24"
        strokeWidth="3.2"
        className="stroke-emerald-950 dark:stroke-emerald-800 fill-[#FCF9F1] dark:fill-slate-900"
      />
      
      {/* 3. Concentric Inner Circle Frame */}
      <circle
        cx="100"
        cy="100"
        r="91"
        fill="none"
        stroke="#113F24"
        strokeWidth="1.2"
        className="stroke-emerald-950 dark:stroke-emerald-800"
      />

      {/* 4. Brand Text along top curve */}
      <text className="font-display font-extrabold text-[15.5px] tracking-[0.06em] fill-emerald-950 dark:fill-emerald-400">
        <textPath href="#textCurveTop" startOffset="50%" textAnchor="middle">
          DIGITAL KRISHIVAANI
        </textPath>
      </text>

      {/* 5. Sub-tagline curved along bottom */}
      <text className="font-sans font-black text-[10.5px] tracking-[0.14em] fill-emerald-900 dark:fill-emerald-500">
        <textPath href="#textCurveBottom" startOffset="50%" textAnchor="middle">
          FARMER 1ST CHOICE
        </textPath>
      </text>

      {/* 6. Left Wreath Garland (Wheat sprig) */}
      <g transform="translate(42, 134) rotate(-35) scale(0.65)">
        <path d="M 0,25 Q -8,10 -2,-18" fill="none" stroke="#6B8E23" strokeWidth="2.5" className="stroke-emerald-700" />
        <use href="#single-leaf" x="-2" y="-12" transform="rotate(-40, -2, -12)" />
        <use href="#single-leaf" x="-3" y="-2" transform="rotate(-45, -3, -2)" />
        <use href="#single-leaf" x="-3" y="8" transform="rotate(-50, -3, 8)" />
        <use href="#single-leaf" x="2" y="-15" transform="rotate(40, 2, -15)" opacity="0.9" />
        <use href="#single-leaf" x="1.5" y="-5" transform="rotate(45, 1.5, -5)" opacity="0.9" />
        <use href="#single-leaf" x="1.2" y="5" transform="rotate(50, 1.2, 5)" opacity="0.9" />
      </g>

      {/* 7. Right Wreath Garland (Wheat sprig) */}
      <g transform="translate(158, 134) rotate(35) scale(-0.65, 0.65)">
        <path d="M 0,25 Q -8,10 -2,-18" fill="none" stroke="#6B8E23" strokeWidth="2.5" className="stroke-emerald-700" />
        <use href="#single-leaf" x="-2" y="-12" transform="rotate(-40, -2, -12)" />
        <use href="#single-leaf" x="-3" y="-2" transform="rotate(-45, -3, -2)" />
        <use href="#single-leaf" x="-3" y="8" transform="rotate(-50, -3, 8)" />
        <use href="#single-leaf" x="2" y="-15" transform="rotate(40, 2, -15)" opacity="0.9" />
        <use href="#single-leaf" x="1.5" y="-5" transform="rotate(45, 1.5, -5)" opacity="0.9" />
        <use href="#single-leaf" x="1.2" y="5" transform="rotate(50, 1.2, 5)" opacity="0.9" />
      </g>

      {/* 8. Scenery Circle Border & Content */}
      <circle
        cx="100"
        cy="100"
        r="63.5"
        fill="none"
        stroke="#113F24"
        strokeWidth="2.5"
        className="stroke-emerald-950 dark:stroke-emerald-800"
      />

      <g clipPath="url(#innerSceneryClip)">
        {/* Sky Background */}
        <rect x="30" y="30" width="140" height="140" fill="url(#skyGrad)" />

        {/* Sunset vector lines representing natural Punjabi climate */}
        <line x1="40" y1="58" x2="160" y2="58" stroke="#E67E22" strokeWidth="1.2" opacity="0.4" />
        <line x1="50" y1="68" x2="150" y2="68" stroke="#E67E22" strokeWidth="1.2" opacity="0.45" />
        <line x1="60" y1="76" x2="140" y2="76" stroke="#E67E22" strokeWidth="1.2" opacity="0.5" />
        <line x1="75" y1="84" x2="125" y2="84" stroke="#E67E22" strokeWidth="1.2" opacity="0.55" />

        {/* Soft, brilliant rising sun in center of valley */}
        <circle cx="100" cy="85" r="16" fill="#FFFDEF" opacity="0.95" />
        <circle cx="100" cy="85" r="22" fill="#FFF59D" opacity="0.3" />

        {/* Mountains - Majestic vector faceted style */}
        {/* Left Side Mountain peaks */}
        <polygon points="35,115 72,85 92,115" fill="#0E331A" />
        <polygon points="72,85 92,115 55,115" fill="#1C5E33" /> {/* Highlight face */}
        <polygon points="15,115 48,93 68,115" fill="#0C2D17" />
        
        {/* Right Side Mountain peaks */}
        <polygon points="108,115 128,82 165,115" fill="#0B2A15" />
        <polygon points="128,82 142,115 165,115" fill="#174E2A" /> {/* Highlight face */}
        <polygon points="138,115 160,95 185,115" fill="#092412" />

        {/* Small background trees bridging mountains to fields */}
        <ellipse cx="68" cy="112" rx="7" ry="5" fill="#2E7D32" />
        <ellipse cx="78" cy="113" rx="9" ry="6" fill="#1C5E33" />
        <ellipse cx="122" cy="112" rx="7" ry="4" fill="#2E7D32" />
        <ellipse cx="132" cy="113" rx="10" ry="6" fill="#1C5E33" />

        {/* Green Fields: Swirling, perspective sowing line paths */}
        {/* Left Perspective Field rows */}
        <path
          d="M 37,114 Q 55,124 100,120 Q 55,124 37,144 Z"
          fill="#33691E"
        />
        <path
          d="M 37,144 Q 55,152 100,120 Q 60,158 37,175 Z"
          fill="#558B2F"
        />

        {/* Ground center lines with dynamic depth (curving perspectives) */}
        {/* Row 1 */}
        <path
          d="M 100,120 C 85,120 40,125 35,160 C 50,175 90,180 100,180 Z"
          fill="#558B2F"
          className="fill-emerald-800"
        />
        <path
          d="M 100,120 C 90,120 62,125 58,160 C 70,175 93,180 100,180 Z"
          fill="#689F38"
          className="fill-emerald-600"
        />
        <path
          d="M 100,120 C 95,120 80,125 78,160 C 84,175 96,180 100,180 Z"
          fill="#8BC34A"
          className="fill-emerald-450"
        />

        {/* Row 2 (Symmetrical Right side perspective) */}
        <path
          d="M 100,120 C 115,120 160,125 165,160 C 150,175 110,180 100,180 Z"
          fill="#33691E"
          className="fill-emerald-800"
        />
        <path
          d="M 100,120 C 110,120 138,125 142,160 C 130,175 107,180 100,180 Z"
          fill="#689F38"
          className="fill-emerald-600"
        />
        <path
          d="M 100,120 C 105,120 120,125 122,160 C 116,175 104,180 100,180 Z"
          fill="#C0CA33"
          className="fill-emerald-400"
        />

        {/* Detailed texture stripes for crops (wheat-fields perspective arcs) */}
        <path d="M 100,120 Q 80,135 60,178" fill="none" stroke="#DCEDC8" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.8" />
        <path d="M 100,120 Q 90,135 84,179" fill="none" stroke="#DCEDC8" strokeWidth="1" strokeDasharray="2,2" opacity="0.8" />
        <path d="M 100,120 Q 120,135 140,178" fill="none" stroke="#DCEDC8" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.8" />
        <path d="M 100,120 Q 110,135 116,179" fill="none" stroke="#DCEDC8" strokeWidth="1" strokeDasharray="2,2" opacity="0.8" />
      </g>
    </svg>
  );
};

export default KrishiVaaniLogo;
