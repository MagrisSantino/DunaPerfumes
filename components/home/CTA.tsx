import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { SiteContent } from '@/types';

export function CTA({ cta }: { cta: SiteContent['cta'] }) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso-dark to-espresso" aria-hidden />
      <div className="absolute inset-0 bg-grain opacity-40" aria-hidden />
      <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-radial from-gold/20 to-transparent blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-radial from-gold/10 to-transparent blur-3xl" aria-hidden />

      <div className="container-duna relative text-center">
        <p className="text-[10px] tracking-widest3 uppercase text-gold mb-5">DUNA Perfumes</p>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream text-balance max-w-3xl mx-auto leading-[1.05]">
          {cta.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="italic text-gold">{cta.title.split(' ').slice(-1)}</span>
        </h2>
        <p className="mt-6 text-sand-400 text-lg max-w-xl mx-auto">{cta.subtitle}</p>
        <div className="mt-10">
          <Link
            href={cta.ctaHref}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-cream text-sm font-medium tracking-widest uppercase hover:bg-gold-dark transition-colors group"
          >
            {cta.ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
