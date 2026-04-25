import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Store, Clock, MapPin, ShieldCheck, PackageCheck } from 'lucide-react';
import { getContent, getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Envíos y retiros',
  description:
    'Enviamos a todo el país y tenemos envío gratis en zonas seleccionadas de Córdoba.',
};

export default async function EnviosPage() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);
  const s = content.shipping;

  return (
    <article className="pb-20">
      <header className="bg-gradient-to-br from-sand-50 via-cream to-sand-100 py-20 lg:py-24 border-b border-sand-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50" aria-hidden />
        <div className="container-duna relative max-w-3xl">
          <p className="eyebrow mb-3">Información útil</p>
          <h1 className="section-title text-balance">
            {s.title.split(' ')[0]}{' '}
            <span className="italic text-gold">{s.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mt-5 text-espresso-lighter text-lg max-w-xl text-pretty">{s.subtitle}</p>
        </div>
      </header>

      {/* Highlights */}
      <section className="container-duna py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Highlight icon={Truck} title="Envío gratis" body="En zonas seleccionadas de Córdoba Capital." />
          <Highlight icon={Store} title="Retiro sin cargo" body="Coordinamos punto de retiro en Córdoba." />
          <Highlight icon={Clock} title="Preparación 24–48h" body="Tu pedido se prepara en días hábiles." />
        </div>
      </section>

      {/* Details */}
      <section className="container-duna pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {s.sections.map((sec, i) => (
            <details
              key={i}
              open={i === 0}
              className="bg-cream border border-sand-200 group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h3 className="font-display text-2xl text-espresso">{sec.title}</h3>
                <span className="text-gold text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-espresso-lighter leading-relaxed text-pretty">{sec.body}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-espresso text-cream py-20">
        <div className="container-duna">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[10px] tracking-widest3 uppercase text-gold mb-3">Paso a paso</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Cómo <span className="italic text-gold">funciona</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <ProcessStep n={1} icon={PackageCheck} title="Realizás tu pedido" body="Elegís en la web y confirmás datos de envío." />
            <ProcessStep n={2} icon={ShieldCheck} title="Coordinamos" body="Te escribimos por WhatsApp para confirmar pago y envío." />
            <ProcessStep n={3} icon={Clock} title="Preparamos" body="En 24–48hs hábiles preparamos con dedicación cada pedido." />
            <ProcessStep n={4} icon={MapPin} title="Te llega" body="Lo despachamos o coordinamos retiro. ¡Listo!" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container-duna max-w-xl">
          <h2 className="font-display text-3xl text-espresso mb-4">¿Dudas puntuales?</h2>
          <p className="text-espresso-lighter mb-6">
            Escribinos por WhatsApp y te respondemos al toque con la info de tu zona.
          </p>
          <a
            href={`https://wa.me/${settings.whatsappRaw}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </article>
  );
}

function Highlight({ icon: Icon, title, body }: { icon: typeof Truck; title: string; body: string }) {
  return (
    <div className="p-6 border border-sand-200 bg-cream hover:border-gold transition-colors">
      <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <h3 className="font-display text-xl text-espresso mb-2">{title}</h3>
      <p className="text-sm text-espresso-lighter">{body}</p>
    </div>
  );
}

function ProcessStep({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: number;
  icon: typeof Truck;
  title: string;
  body: string;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-espresso font-medium">
          {n}
        </div>
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <h3 className="font-display text-xl text-cream mb-2">{title}</h3>
      <p className="text-sm text-sand-400 leading-relaxed">{body}</p>
    </div>
  );
}
