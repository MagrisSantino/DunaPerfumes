import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { SiteContent } from '@/types';

export function Story({ story }: { story: SiteContent['story'] }) {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-sand-50 to-cream overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-60" aria-hidden />
      <div className="container-duna relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden shadow-elegant">
              {story.image ? (
                <Image src={story.image} alt="DUNA Perfumes" fill className="object-cover" />
              ) : (
                <StoryVisual />
              )}
            </div>
            {/* Badge card */}
            <div className="absolute -bottom-6 -right-4 lg:right-0 bg-cream p-5 shadow-elegant border border-sand-200 max-w-[220px]">
              <p className="text-[10px] tracking-widest3 uppercase text-gold mb-2">Desde 2024</p>
              <p className="font-display text-2xl text-espresso leading-tight">Curaduría de aromas árabes</p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 space-y-6">
            <p className="eyebrow">{story.eyebrow}</p>
            <h2 className="section-title text-balance">
              {story.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="italic text-gold">{story.title.split(' ').slice(-1)}</span>
            </h2>
            <div className="space-y-4 text-espresso-lighter leading-relaxed text-pretty">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="font-display text-2xl text-gold italic pt-2">{story.signature}</p>
            <div className="pt-4">
              <Link href="/nosotros" className="btn-secondary group">
                Conocer nuestra historia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryVisual() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="story-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFE7DC" />
          <stop offset="1" stopColor="#8B6F3E" />
        </linearGradient>
        <radialGradient id="story-glow" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#FBF4E4" stopOpacity="0.8" />
          <stop offset="1" stopColor="#3B3224" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#story-bg)" />
      <rect width="400" height="500" fill="url(#story-glow)" />

      {/* Three bottles in a row */}
      <g transform="translate(110 280)">
        <rect x="-12" y="-130" width="24" height="18" rx="3" fill="#2D2521" />
        <rect x="-6" y="-112" width="12" height="8" fill="#6B5530" />
        <path d="M -40 -104 Q -40 -108 -36 -108 L 36 -108 Q 40 -108 40 -104 L 40 90 Q 40 108 26 108 L -26 108 Q -40 108 -40 90 Z"
          fill="#FBF4E4" opacity="0.95" stroke="#3B3224" strokeWidth="1.5" />
        <path d="M -32 -88 L 32 -88 L 32 70 L -32 70 Z" fill="#B8935C" opacity="0.5" />
        <text x="0" y="10" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" letterSpacing="2" fill="#3B3224">DUNA</text>
      </g>

      <g transform="translate(200 240)">
        <rect x="-14" y="-150" width="28" height="20" rx="3" fill="#3B3224" />
        <rect x="-7" y="-130" width="14" height="10" fill="#8B6F3E" />
        <path d="M -46 -120 Q -46 -124 -42 -124 L 42 -124 Q 46 -124 46 -120 L 46 110 Q 46 130 30 130 L -30 130 Q -46 130 -46 110 Z"
          fill="#EFE7DC" opacity="0.95" stroke="#3B3224" strokeWidth="1.5" />
        <path d="M -38 -100 L 38 -100 L 38 90 L -38 90 Z" fill="#6B5530" opacity="0.55" />
        <text x="0" y="15" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="16" letterSpacing="3" fill="#3B3224">DUNA</text>
      </g>

      <g transform="translate(290 280)">
        <rect x="-12" y="-130" width="24" height="18" rx="3" fill="#2D2521" />
        <rect x="-6" y="-112" width="12" height="8" fill="#6B5530" />
        <path d="M -40 -104 Q -40 -108 -36 -108 L 36 -108 Q 40 -108 40 -104 L 40 90 Q 40 108 26 108 L -26 108 Q -40 108 -40 90 Z"
          fill="#DCC9A5" opacity="0.95" stroke="#3B3224" strokeWidth="1.5" />
        <path d="M -32 -88 L 32 -88 L 32 70 L -32 70 Z" fill="#2D2521" opacity="0.35" />
        <text x="0" y="10" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" letterSpacing="2" fill="#3B3224">DUNA</text>
      </g>
    </svg>
  );
}
