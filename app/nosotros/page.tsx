import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Sparkles, Compass, Leaf } from 'lucide-react';
import { getContent, getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Nuestra historia',
  description:
    'Conocé DUNA Perfumes — Luz y Rodri, una pasión compartida por la perfumería árabe que dejó huella en Córdoba.',
};

export default async function NosotrosPage() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  const about = content.about;

  return (
    <article className="pb-20">
      {/* Hero */}
      <header className="bg-gradient-to-br from-sand-50 via-cream to-sand-100 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50" aria-hidden />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-radial from-gold/15 to-transparent blur-3xl" aria-hidden />
        <div className="container-duna relative text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-4">DUNA — Luz & Rodri</p>
          <h1 className="section-title text-balance">
            {about.title.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="italic text-gold">{about.title.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="mt-6 text-lg text-espresso-lighter max-w-xl mx-auto text-pretty">
            {about.subtitle}
          </p>
        </div>
      </header>

      {/* Image strip */}
      <section className="container-duna -mt-8 mb-16">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div className="aspect-[3/4] bg-gradient-to-br from-espresso to-espresso-dark relative overflow-hidden">
            <PortraitSVG tone="dark" text="Luz" />
          </div>
          <div className="aspect-[3/4] bg-gradient-to-br from-gold to-gold-dark relative overflow-hidden -mt-4 md:-mt-10">
            <PortraitSVG tone="gold" text="DUNA" />
          </div>
          <div className="aspect-[3/4] bg-gradient-to-br from-sand-500 to-espresso-lighter relative overflow-hidden">
            <PortraitSVG tone="sand" text="Rodri" />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="container-duna">
        <div className="max-w-3xl mx-auto space-y-14 lg:space-y-20">
          {about.sections.map((s, i) => (
            <div key={i} className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
              <div className="text-center md:text-left">
                <span className="font-display text-6xl md:text-7xl font-light text-gold/40 tabular-nums">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">{s.title}</h2>
                <p className="text-espresso-lighter leading-relaxed text-pretty">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24 mt-16 bg-espresso text-cream">
        <div className="container-duna">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[10px] tracking-widest3 uppercase text-gold mb-3">Nuestros valores</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Con qué nos <span className="italic text-gold">comprometemos</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={Heart}
              title="Curaduría honesta"
              body="Solo recomendamos lo que probamos y usaríamos. Nunca empujamos algo que no va con vos."
            />
            <ValueCard
              icon={Sparkles}
              title="Autenticidad"
              body="Nuestros originales llegan con sello de la casa perfumera. Sin atajos, sin falsificaciones."
            />
            <ValueCard
              icon={Compass}
              title="Asesoramiento real"
              body="Te acompañamos antes, durante y después de la compra. Dudas, recambios, regalos."
            />
            <ValueCard
              icon={Leaf}
              title="Cuidado del detalle"
              body="Empaques, envíos y atención pensados para que cada pedido se sienta especial."
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      {about.mission && (
        <section className="py-20 text-center">
          <div className="container-duna max-w-3xl">
            <p className="eyebrow mb-4">Nuestra misión</p>
            <p className="font-display text-3xl md:text-4xl text-espresso italic leading-relaxed text-balance">
              &ldquo;{about.mission}&rdquo;
            </p>
            <p className="text-gold mt-6 text-lg italic">— Luz &amp; Rodri</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-duna py-12">
        <div className="bg-sand-50 border border-sand-200 p-10 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">
            ¿Listo para encontrar <span className="italic text-gold">tu esencia?</span>
          </h2>
          <p className="text-espresso-lighter mb-8 max-w-md mx-auto">
            Empezá a explorar nuestra selección o escribinos para recomendaciones personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tienda" className="btn-primary">Ver colección</Link>
            <a
              href={`https://wa.me/${settings.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Asesorate por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

function ValueCard({ icon: Icon, title, body }: { icon: typeof Heart; title: string; body: string }) {
  return (
    <div className="p-6 border border-sand-800 hover:border-gold transition-colors">
      <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <h3 className="font-display text-xl text-cream mb-2">{title}</h3>
      <p className="text-sm text-sand-400 leading-relaxed">{body}</p>
    </div>
  );
}

function PortraitSVG({ tone, text }: { tone: 'dark' | 'gold' | 'sand'; text: string }) {
  const palettes = {
    dark: { bg: '#3B3224', accent: '#B8935C', fg: '#FBF4E4' },
    gold: { bg: '#8B6F3E', accent: '#FBF4E4', fg: '#FBF4E4' },
    sand: { bg: '#A08C64', accent: '#3B3224', fg: '#FBF4E4' },
  };
  const p = palettes[tone];
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id={`pg-${tone}`} cx="0.5" cy="0.4" r="0.8">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.5" />
          <stop offset="1" stopColor={p.bg} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill={p.bg} />
      <rect width="300" height="400" fill={`url(#pg-${tone})`} />
      {/* Silhouette */}
      <g transform="translate(150 280)">
        <circle cx="0" cy="-120" r="56" fill={p.accent} opacity="0.35" />
        <path
          d="M -110 150 Q -110 30 -65 -30 Q -30 -70 0 -70 Q 30 -70 65 -30 Q 110 30 110 150 Z"
          fill={p.accent}
          opacity="0.4"
        />
      </g>
      <text
        x="150"
        y="360"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="28"
        letterSpacing="8"
        fill={p.fg}
      >
        {text.toUpperCase()}
      </text>
    </svg>
  );
}
