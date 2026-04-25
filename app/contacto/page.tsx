import type { Metadata } from 'next';
import { MessageCircle, Instagram, Mail, MapPin, Clock } from 'lucide-react';
import { getContent, getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactanos por WhatsApp, Instagram o email. Estamos en Córdoba, Argentina.',
};

export default async function ContactoPage() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  const c = content.contact;

  return (
    <article className="pb-20">
      <header className="bg-gradient-to-br from-sand-50 via-cream to-sand-100 py-20 lg:py-24 border-b border-sand-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50" aria-hidden />
        <div className="container-duna relative max-w-3xl">
          <p className="eyebrow mb-3">Escribinos</p>
          <h1 className="section-title text-balance">
            {c.title.split(' ')[0]}{' '}
            <span className="italic text-gold">{c.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mt-5 text-espresso-lighter text-lg max-w-xl text-pretty">{c.subtitle}</p>
        </div>
      </header>

      <section className="container-duna py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info */}
          <div className="space-y-6">
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              primary={c.whatsapp}
              description="La forma más rápida de pedir asesoramiento o hacer un pedido."
              href={`https://wa.me/${settings.whatsappRaw}`}
              cta="Escribir por WhatsApp"
              featured
            />
            <ContactCard
              icon={Instagram}
              label="Instagram"
              primary={c.instagram}
              description="Seguinos para novedades, lanzamientos y recomendaciones."
              href={`https://www.instagram.com/${settings.instagramHandle}`}
              cta="Ir a Instagram"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              primary={c.email}
              description="Para consultas mayoristas, regalos corporativos o prensa."
              href={`mailto:${c.email}`}
              cta="Enviar email"
            />
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <InfoCard icon={MapPin} label="Ubicación" value={c.location} />
              <InfoCard icon={Clock} label="Horario" value={c.hours} />
            </div>
          </div>

          {/* Form */}
          <form
            action={`https://wa.me/${settings.whatsappRaw}`}
            method="get"
            target="_blank"
            rel="noreferrer"
            className="bg-cream border border-sand-200 p-6 md:p-8 space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl text-espresso">Escribinos un mensaje</h2>
              <p className="text-sm text-espresso-lighter">Te responderemos por WhatsApp.</p>
            </div>

            <label className="block">
              <span className="label-duna">Nombre</span>
              <input name="nombre" className="input-duna" placeholder="Tu nombre" required />
            </label>
            <label className="block">
              <span className="label-duna">Asunto</span>
              <select name="asunto" className="input-duna">
                <option>Consulta general</option>
                <option>Recomendación de fragancia</option>
                <option>Estado de pedido</option>
                <option>Envíos</option>
                <option>Otro</option>
              </select>
            </label>
            <label className="block">
              <span className="label-duna">Mensaje</span>
              <textarea
                name="text"
                className="input-duna min-h-[140px] resize-y"
                placeholder="Contanos en qué podemos ayudarte..."
                required
              />
            </label>
            <button type="submit" className="btn-primary w-full">
              <MessageCircle className="w-4 h-4" />
              Enviar por WhatsApp
            </button>
            <p className="text-xs text-espresso-lighter text-center">
              Respondemos generalmente dentro de las 2 horas en nuestro horario de atención.
            </p>
          </form>
        </div>
      </section>
    </article>
  );
}

function ContactCard({
  icon: Icon,
  label,
  primary,
  description,
  href,
  cta,
  featured,
}: {
  icon: typeof Mail;
  label: string;
  primary: string;
  description: string;
  href: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`block p-6 md:p-7 border transition-all ${
        featured
          ? 'bg-espresso text-cream border-espresso hover:bg-espresso-dark'
          : 'bg-cream border-sand-200 hover:border-gold'
      }`}
    >
      <div className="flex items-start gap-5">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${featured ? 'bg-gold text-cream' : 'bg-gold/15 text-gold'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className={`text-[10px] tracking-widest3 uppercase ${featured ? 'text-gold' : 'text-gold'}`}>{label}</p>
          <p className={`font-display text-2xl ${featured ? 'text-cream' : 'text-espresso'}`}>{primary}</p>
          <p className={`text-sm mt-2 ${featured ? 'text-sand-400' : 'text-espresso-lighter'}`}>{description}</p>
          <p className={`text-xs tracking-widest uppercase mt-3 ${featured ? 'text-gold' : 'text-espresso'}`}>
            {cta} →
          </p>
        </div>
      </div>
    </a>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="p-5 bg-sand-50 border border-sand-200">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-4 h-4 text-gold" />
        <p className="text-[10px] tracking-widest3 uppercase text-espresso-lighter">{label}</p>
      </div>
      <p className="font-medium text-espresso">{value}</p>
    </div>
  );
}
