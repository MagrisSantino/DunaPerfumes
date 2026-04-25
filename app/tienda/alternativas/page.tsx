import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ShopSidebar, ShopMobileFilters } from '@/components/products/ShopFilters';
import { filterAndSort, extractFilterOptions, type ShopQuery } from '@/lib/filters';

export const metadata: Metadata = {
  title: 'Alternativas',
  description:
    'Fragancias árabes alternativas de alta persistencia con excelente relación calidad-precio.',
};

export default async function AlternativasPage({
  searchParams,
}: {
  searchParams: ShopQuery;
}) {
  const products = await getProducts();
  const base = products.filter((p) => p.active && p.classification === 'ALTERNATIVA');
  const visible = filterAndSort(base, { ...searchParams, clasificacion: 'ALTERNATIVA' });
  const options = extractFilterOptions(base);

  return (
    <section className="pb-24">
      <header className="bg-gradient-to-br from-gold via-gold-dark to-espresso text-cream border-b border-sand-200 py-16 lg:py-20 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-30" aria-hidden />
        <div className="container-duna relative">
          <p className="text-[10px] tracking-widest3 uppercase text-cream/70 mb-3">Colección</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream text-balance max-w-3xl">
            Fragancias <span className="italic">alternativas</span>
          </h1>
          <p className="mt-5 text-cream/90 max-w-xl text-pretty">
            Alta persistencia, gran calidad, precio accesible. Ideales para empezar en la perfumería árabe.
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
