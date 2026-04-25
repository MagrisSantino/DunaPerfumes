import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Compré el 9AM Dive y me sorprendió la persistencia. Atención de diez, Luz y Rodri te asesoran re bien.',
    name: 'Camila R.',
    city: 'Nueva Córdoba',
  },
  {
    quote:
      'Encontré el Yara que buscaba hace meses. Llegó al día siguiente, impecable presentación.',
    name: 'Martina A.',
    city: 'Villa Allende',
  },
  {
    quote:
      'El Khamrah es otro nivel. Durá todo el día y recibo cumplidos en todos lados. Ya pedí la segunda fragancia.',
    name: 'Juan Pablo G.',
    city: 'Alta Córdoba',
  },
];

export function TestimonialStrip() {
  return (
    <section className="py-20 lg:py-24 bg-sand-50">
      <div className="container-duna">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-3">Voces que huelen DUNA</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-espresso">
            Lo que dicen <span className="italic text-gold">nuestros clientes</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="bg-cream p-7 border border-sand-200 relative hover:shadow-elegant transition-shadow"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <blockquote className="text-espresso leading-relaxed mb-5 text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="font-medium text-espresso">{t.name}</p>
                <p className="text-xs text-espresso-lighter">{t.city}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
