// Prestige strip showcasing the main Arabic perfume houses carried

const BRANDS = [
  'LATTAFA',
  'ARMAF',
  'AFNAN',
  'AL HARAMAIN',
  'XERJOFF',
  'MAISON ALHAMBRA',
  'BHARARA',
  'RASASI',
  'GISSAH',
  'ORIENTICA',
];

export function BrandsStrip() {
  return (
    <section className="py-10 bg-sand-100 border-y border-sand-200">
      <div className="container-duna">
        <p className="text-center text-[10px] tracking-widest3 uppercase text-espresso-lighter mb-6">
          Las casas que curamos
        </p>
        <div className="overflow-hidden">
          <div className="flex items-center gap-12 lg:gap-16 animate-marquee whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl tracking-widest2 text-espresso-lighter hover:text-gold transition-colors"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
