import { cn } from '@/lib/utils';

type Variant = 'dark' | 'light' | 'mono';

export function Logo({
  className,
  variant = 'dark',
  withText = true,
}: {
  className?: string;
  variant?: Variant;
  withText?: boolean;
}) {
  const stroke = variant === 'light' ? '#F5EFE6' : '#2D2521';
  const accent = variant === 'light' ? '#C9A877' : '#8B6F3E';
  return (
    <div className={cn('flex items-center gap-3 shrink-0', className)} aria-label="DUNA Perfumes">
      <svg viewBox="0 0 100 100" className="w-10 h-10" aria-hidden>
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Stylised drop/pebble */}
        <path
          d="M50 8 C72 10 90 32 88 56 C86 78 68 92 48 90 C28 88 12 72 12 50 C12 30 28 10 50 8 Z"
          fill="url(#logo-grad)"
          stroke={stroke}
          strokeWidth="1.2"
        />
        {/* Inner "D" */}
        <path
          d="M36 30 L36 70 L52 70 C64 70 70 62 70 50 C70 38 64 30 52 30 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="14" r="1.6" fill={accent} />
      </svg>
      {withText && (
        <div className="leading-none">
          <span
            className={cn(
              'block font-display text-2xl font-light tracking-[0.28em]',
              variant === 'light' ? 'text-cream' : 'text-espresso',
            )}
          >
            DUNA
          </span>
          <span
            className={cn(
              'block text-[9px] font-sans font-medium tracking-[0.5em] mt-0.5',
              variant === 'light' ? 'text-sand-300' : 'text-espresso-lighter',
            )}
          >
            PERFUMES
          </span>
        </div>
      )}
    </div>
  );
}
