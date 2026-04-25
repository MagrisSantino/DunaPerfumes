import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { getContent, getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Respuestas a las dudas más comunes sobre fragancias, envíos, pagos y más.',
};

export default async function PreguntasPage() {
  const [content, settings] = await Promise.all([getContent(), getSettings()]);

  return (
    <article className="pb-24">
      <header className="bg-gradient-to-br from-sand-50 via-cream to-sand-100 py-20 lg:py-24 border-b border-sand-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50" aria-hidden />
        <div className="container-duna relative max-w-3xl">
          <p className="eyebrow mb-3">Te ayudamos</p>
          <h1 className="section-title text-balance">
            Preguntas <span className="italic text-gold">frecuentes</span>
          </h1>
          <p className="mt-5 text-espresso-lighter text-lg max-w-xl text-pretty">
            Las respuestas a lo que más nos consultan. Si no está acá, escribinos.
          </p>
        </div>
      </header>

      <section className="container-duna py-14">
        <div className="max-w-3xl mx-auto space-y-4">
          {content.faq.map((f, i) => (
            <details key={i} open={i < 2} className="bg-cream border border-sand-200 group">
              <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer list-none">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <h3 className="font-display text-xl text-espresso">{f.q}</h3>
                </div>
                <span className="text-gold text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <div className="px-6 pb-6 pl-[60px]">
                <p className="text-espresso-lighter leading-relaxed text-pretty">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-sand-200">
        <div className="container-duna max-w-xl text-center">
          <h2 className="font-display text-3xl text-espresso mb-3">
            No encontraste tu <span className="italic text-gold">respuesta?</span>
          </h2>
          <p className="text-espresso-lighter mb-6">
            Escribinos por WhatsApp — te respondemos al instante.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${settings.whatsappRaw}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Consultar por WhatsApp
            </a>
            <Link href="/contacto" className="btn-secondary">Otras formas de contacto</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
