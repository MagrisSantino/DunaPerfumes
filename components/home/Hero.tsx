import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { SiteContent } from '@/types';

export function Hero({ hero }: { hero: SiteContent['hero'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-sand-50 to-sand-100">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grain opacity-70" aria-hidden />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold/10 to-transparent blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-radial from-espresso/5 to-transparent blur-3xl" aria-hidden />

      <div className="container-duna relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream border border-sand-300 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] font-light text-espresso text-balance">
              {hero.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="italic text-gold">{word}</span>
                  ) : (
                    word
                  )}
                  {i < arr.length - 1 && ' '}
                </span>
              ))}
            </h1>

            <p className="text-base md:text-lg text-espresso-lighter leading-relaxed max-w-xl text-pretty">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href={hero.ctaPrimary.href} className="btn-primary group">
                {hero.ctaPrimary.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={hero.ctaSecondary.href} className="btn-ghost">
                {hero.ctaSecondary.label} →
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-sand-200 max-w-lg">
              <Metric value="180+" label="Fragancias" />
              <Metric value="100%" label="Auténticos" />
              <Metric value="★ 4.9" label="Calificación" />
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 relative animate-fade-in">
            {hero.backgroundImage ? (
              <div className="relative aspect-[4/5] overflow-hidden shadow-elegant">
                <Image src={hero.backgroundImage} alt="DUNA Perfumes" fill className="object-cover" priority />
              </div>
            ) : (
              <HeroVisual />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-espresso">{value}</p>
      <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">{label}</p>
    </div>
  );
}

function HeroVisual() {
  // Editorial composition — golden hour bottle with floating aromatic notes
  return (
    <div className="relative aspect-[4/5] select-none">
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EFE7DC" />
            <stop offset="0.6" stopColor="#DCC9A5" />
            <stop offset="1" stopColor="#8B6F3E" />
          </linearGradient>
          <radialGradient id="hero-glow" cx="0.5" cy="0.3" r="0.7">
            <stop offset="0" stopColor="#FBF4E4" stopOpacity="0.9" />
            <stop offset="1" stopColor="#B8935C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bottle-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FBF4E4" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#DCC9A5" stopOpacity="0.85" />
            <stop offset="1" stopColor="#3B3224" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="liquid-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C9A877" />
            <stop offset="1" stopColor="#6B5530" />
          </linearGradient>
        </defs>

        <rect width="400" height="500" fill="url(#hero-bg)" />
        <rect width="400" height="500" fill="url(#hero-glow)" />

        {/* Soft circle behind bottle */}
        <circle cx="200" cy="230" r="140" fill="#FBF4E4" opacity="0.4" />

        {/* Bottle */}
        <g transform="translate(200 260)">
          {/* Cap */}
          <rect x="-26" y="-150" width="52" height="32" rx="4" fill="#3B3224" />
          <rect x="-22" y="-148" width="44" height="6" fill="#B8935C" opacity="0.5" />
          {/* Neck */}
          <rect x="-14" y="-118" width="28" height="16" fill="#2D2521" />
          {/* Body */}
          <path
            d="M -80 -102 Q -80 -106 -76 -106 L 76 -106 Q 80 -106 80 -102 L 80 120 Q 80 140 60 140 L -60 140 Q -80 140 -80 120 Z"
            fill="url(#bottle-g)"
            stroke="#3B3224"
            strokeWidth="2"
          />
          {/* Liquid */}
          <path
            d="M -72 -60 Q -72 -60 -72 -60 L 72 -60 L 72 112 Q 72 132 56 132 L -56 132 Q -72 132 -72 112 Z"
            fill="url(#liquid-g)"
            opacity="0.88"
          />
          {/* Label */}
          <rect x="-50" y="-40" width="100" height="90" fill="#FBF4E4" opacity="0.9" stroke="#B8935C" strokeWidth="0.5" />
          <text
            x="0"
            y="-14"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="26"
            letterSpacing="6"
            fill="#3B3224"
          >
            DUNA
          </text>
          <line x1="-30" y1="-4" x2="30" y2="-4" stroke="#B8935C" strokeWidth="0.6" />
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="6"
            letterSpacing="3"
            fill="#6B5530"
          >
            PERFUMES
          </text>
          <text
            x="0"
            y="30"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="5"
            letterSpacing="2"
            fill="#6B5530"
            opacity="0.7"
          >
            EAU DE PARFUM · 100 ML
          </text>
          {/* Highlight */}
          <path
            d="M -70 -90 Q -70 -90 -66 -90 L -58 -90 L -58 100 Q -58 120 -66 120 L -70 120 Z"
            fill="#FBF4E4"
            opacity="0.3"
          />
        </g>

        {/* Floating aromatic dots */}
        <g opacity="0.6">
          <circle cx="60" cy="80" r="3" fill="#8B6F3E" />
          <circle cx="340" cy="120" r="2" fill="#3B3224" />
          <circle cx="80" cy="180" r="2" fill="#3B3224" />
          <circle cx="320" cy="280" r="3" fill="#B8935C" />
          <circle cx="50" cy="420" r="2" fill="#6B5530" />
          <circle cx="350" cy="440" r="3" fill="#3B3224" />
        </g>
      </svg>

      {/* Corner label */}
      <div className="absolute top-6 right-6 bg-cream/90 backdrop-blur px-3 py-2 shadow-soft">
        <p className="text-[9px] tracking-widest3 uppercase text-espresso-lighter">Edición</p>
        <p className="font-display text-lg leading-none text-espresso">2026</p>
      </div>
      <div className="absolute bottom-6 left-6 bg-espresso text-cream px-4 py-3">
        <p className="text-[9px] tracking-widest3 uppercase opacity-70">Desde</p>
        <p className="font-display text-2xl leading-none">Córdoba</p>
      </div>
    </div>
  );
}
