import { cn } from '@/lib/utils';

// Elegant SVG placeholder for products without uploaded images yet.
// Uses brand-inspired color seed so each card still feels unique.

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const PALETTES = [
  ['#EFE7DC', '#B8935C', '#3B3224'],
  ['#F5EFE6', '#A08C64', '#2D2521'],
  ['#E5D9C6', '#C9A877', '#4A3F37'],
  ['#FBF7F0', '#8B6F3E', '#3B3224'],
  ['#EFE7DC', '#6B5530', '#2D2521'],
];

export function ProductPlaceholder({
  brand,
  model,
  className,
  compact = false,
}: {
  brand: string;
  model?: string;
  className?: string;
  compact?: boolean;
}) {
  const palette = PALETTES[hashCode(brand + (model ?? '')) % PALETTES.length];
  const [bg, accent, dark] = palette;
  return (
    <svg viewBox="0 0 200 260" className={cn('w-full h-full', className)} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={`g-${brand}-${model ?? ''}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg} />
          <stop offset="1" stopColor={accent} stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={`rg-${brand}-${model ?? ''}`} cx="0.5" cy="0.3" r="0.7">
          <stop offset="0" stopColor={accent} stopOpacity="0.28" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="260" fill={`url(#g-${brand}-${model ?? ''})`} />
      <rect width="200" height="260" fill={`url(#rg-${brand}-${model ?? ''})`} />
      {/* Bottle silhouette */}
      <g transform="translate(100 132)">
        <rect x="-8" y="-72" width="16" height="12" rx="2" fill={dark} opacity="0.85" />
        <rect x="-5" y="-60" width="10" height="6" fill={accent} />
        <path
          d="M -30 -54 Q -30 -56 -28 -56 L 28 -56 Q 30 -56 30 -54 L 30 60 Q 30 72 20 72 L -20 72 Q -30 72 -30 60 Z"
          fill={bg}
          stroke={dark}
          strokeWidth="1.6"
          opacity="0.92"
        />
        <path
          d="M -24 -48 Q -24 -50 -22 -50 L 22 -50 Q 24 -50 24 -48 L 24 30 L -24 30 Z"
          fill={accent}
          opacity="0.3"
        />
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontSize="14"
          letterSpacing="3"
          fill={dark}
          opacity="0.85"
        >
          DUNA
        </text>
      </g>
      {!compact && (
        <text
          x="100"
          y="240"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="7"
          letterSpacing="2"
          fill={dark}
          opacity="0.6"
        >
          {brand.toUpperCase()}
        </text>
      )}
    </svg>
  );
}
