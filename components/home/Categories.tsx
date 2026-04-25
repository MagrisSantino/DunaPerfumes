import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { SiteContent } from '@/types';

// Decorative icon palette for each slot (index-based fallback)
const DECOR = [
  { bg: 'from-espresso to-espresso-dark', accent: '#B8935C', pattern: 'oud' },
  { bg: 'from-gold to-gold-dark', accent: '#FBF4E4', pattern: 'sand' },
  { bg: 'from-sand-300 to-sand-500', accent: '#3B3224', pattern: 'floral' },
  { bg: 'from-sand-700 to-espresso-lighter', accent: '#DCC9A5', pattern: 'smoke' },
];

export function Categories({ categories }: { categories: SiteContent['categories'] }) {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="container-duna">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-4">Colecciones</p>
          <h2 className="section-title text-balance">
            {categories.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="italic text-gold">{categories.title.split(' ').slice(-1)}</span>
          </h2>
          <p className="mt-4 text-espresso-lighter">{categories.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.items.map((cat, i) => {
            const d = DECOR[i % DECOR.length];
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className={`group relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${d.bg} text-cream flex flex-col justify-end p-6 transition-all duration-500 hover:shadow-elegant`}
              >
                <CategoryPattern pattern={d.pattern} accent={d.accent} />
                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="text-[10px] tracking-widest3 uppercase text-cream/70 mb-2">Colección</p>
                  <h3 className="font-display text-3xl lg:text-4xl leading-tight mb-3 text-cream">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-cream/80 mb-5 max-w-[220px] leading-relaxed">{cat.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase">
                    Descubrir
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryPattern({ pattern, accent }: { pattern: string; accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay" viewBox="0 0 300 400" aria-hidden>
      <defs>
        <radialGradient id={`cg-${pattern}`} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0" stopColor={accent} stopOpacity="0.6" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#cg-${pattern})`} />
      {pattern === 'oud' && (
        <g stroke={accent} strokeWidth="0.6" fill="none" opacity="0.5">
          <path d="M 0 320 Q 75 280 150 300 T 300 270" />
          <path d="M 0 340 Q 75 300 150 320 T 300 290" />
          <path d="M 0 360 Q 75 320 150 340 T 300 310" />
        </g>
      )}
      {pattern === 'sand' && (
        <g fill={accent} opacity="0.4">
          <circle cx="60" cy="100" r="1.5" />
          <circle cx="200" cy="80" r="1" />
          <circle cx="260" cy="160" r="1.5" />
          <circle cx="90" cy="230" r="1" />
          <circle cx="220" cy="280" r="1.5" />
          <circle cx="40" cy="340" r="1" />
        </g>
      )}
      {pattern === 'floral' && (
        <g stroke={accent} strokeWidth="0.8" fill="none" opacity="0.4">
          <circle cx="250" cy="70" r="18" />
          <circle cx="250" cy="70" r="10" />
          <circle cx="50" cy="140" r="14" />
          <circle cx="280" cy="240" r="20" />
        </g>
      )}
      {pattern === 'smoke' && (
        <g stroke={accent} strokeWidth="1.2" fill="none" opacity="0.3">
          <path d="M 150 400 Q 130 320 150 260 Q 170 200 150 140 Q 130 80 150 20" />
          <path d="M 100 400 Q 80 340 100 280 Q 120 220 100 160" />
          <path d="M 200 400 Q 220 330 200 270 Q 180 210 200 150" />
        </g>
      )}
    </svg>
  );
}
