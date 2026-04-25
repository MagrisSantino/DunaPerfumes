import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="py-20 lg:py-28">
      <div className="container-duna">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Selección de la casa</p>
            <h2 className="section-title text-balance">
              Favoritas de <span className="italic text-gold">temporada</span>
            </h2>
            <p className="mt-5 text-espresso-lighter leading-relaxed">
              Las fragancias que más piden nuestros clientes — elegidas por Luz y Rodri.
            </p>
          </div>
          <Link href="/tienda" className="btn-ghost group shrink-0 self-start sm:self-end">
            Ver todo el catálogo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
