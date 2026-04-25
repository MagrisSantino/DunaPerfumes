import type { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ShopSidebar, ShopMobileFilters } from '@/components/products/ShopFilters';
import { filterAndSort, extractFilterOptions, type ShopQuery } from '@/lib/filters';

export const metadata: Metadata = {
  title: 'Tienda',
  description:
    'Explorá toda la colección DUNA — perfumes árabes originales y alternativas seleccionadas.',
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: ShopQuery;
}) {
  const products = await getProducts();
  const visible = filterAndSort(products, searchParams);
  const options = extractFilterOptions(products.filter((p) => p.active));

  return (
    <section className="pb-24">
      <PageHeader
        title="Toda la colección"
        subtitle="Desde los clásicos que no pueden faltar hasta los imprescindibles del momento."
      />
      <div className="container-duna">
        <ShopMobileFilters options={options} total={visible.length} />
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <ShopSidebar options={options} />
          </aside>
          <ProductGrid products={visible} />
        </div>
      </div>
    </section>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="bg-gradient-to-br from-sand-50 via-cream to-sand-100 border-b border-sand-200 py-16 lg:py-20 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-60" aria-hidden />
      <div className="container-duna relative">
        <p className="eyebrow mb-3">Tienda DUNA</p>
        <h1 className="section-title text-balance max-w-3xl">
          {title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="italic text-gold">{title.split(' ').slice(-1)}</span>
        </h1>
        <p className="mt-5 text-espresso-lighter max-w-xl text-pretty">{subtitle}</p>
      </div>
    </header>
  );
}
