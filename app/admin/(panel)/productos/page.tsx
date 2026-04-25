import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getProducts } from '@/lib/db';
import { ProductsTable } from './ProductsTable';

export default async function AdminProductosPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-espresso-lighter">
            {products.length} productos · {products.filter((p) => p.active).length} activos ·{' '}
            {products.filter((p) => p.stock === 0 && p.active).length} sin stock
          </p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary">
          <Plus className="w-4 h-4" />
          Nuevo producto
        </Link>
      </header>

      <ProductsTable products={products} />
    </div>
  );
}
