import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ShopSidebar, ShopMobileFilters } from '@/components/products/ShopFilters';
import { filterAndSort, extractFilterOptions, type ShopQuery } from '@/lib/filters';

export const metadata: Metadata = {
  title: 'Originales',
  description:
    'Fragancias 100% originales con sello de autenticidad — Lattafa, Armaf, Afnan, Xerjoff y más.',
};

export default async function OriginalesPage({
  searchParams,
}: {
  searchParams: ShopQuery;
}) {
  const products = await getProducts();
  const base = products.filter((p) => p.active && p.classification === 'ORIGINAL');
  const visible = filterAndSort(base, { ...searchParams, clasificacion: 'ORIGINAL' });
  const options = extractFilterOptions(base);

  return (
    <section className="pb-24">
      <header className="bg-gradient-to-br from-espresso via-espresso-dark to-espresso text-cream border-b border-espresso py-16 lg:py-20 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20" aria-hidden />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-radial from-gold/20 to-transparent blur-3xl" aria-hidden />
        <div className="container-duna relative">
          <p className="text-[10px] tracking-widest3 uppercase text-gold mb-3">Colección</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream text-balance max-w-3xl">
            Fragancias <span className="italic text-gold">originales</span>
          </h1>
          <p className="mt-5 text-sand-400 max-w-xl text-pretty">
            Las mejores casas perfumeras árabes — todas con sello de autenticidad.
          </p>
        </div>
      </header>
      <div className="container-duna">
        <ShopMobileFilters options={{ ...options, hideClassification: true }} total={visible.length} />
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <ShopSidebar options={{ ...options, hideClassification: true }} />
          </aside>
          <ProductGrid products={visible} />
        </div>
      </div>
    </section>
  );
}
